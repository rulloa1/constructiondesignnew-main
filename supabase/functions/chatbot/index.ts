import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";
import { z } from "https://deno.land/x/zod@v3.22.4/mod.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

// Define validation schema for lead data
const LeadSchema = z.object({
  name: z.string().trim().min(1, "Name is required").max(100, "Name too long"),
  email: z.string().trim().email("Invalid email format").max(255, "Email too long"),
  phone: z.string().trim().max(20, "Phone number too long").optional().nullable(),
  project_type: z.enum(['Residential', 'Commercial', 'Hospitality', 'Other']).optional().nullable(),
  budget_range: z.enum(['Under $50k', '$50k-$100k', '$100k-$250k', '$250k+', 'Undecided']).optional().nullable(),
  message: z.string().trim().max(5000, "Message too long").optional().nullable()
});

// Limit conversation history to last 50 messages to prevent unbounded growth
const MAX_CONVERSATION_MESSAGES = 50;

// Enhanced rate limiting configuration
const RATE_LIMIT = 5; // reduced from 10 to 5 requests per window
const RATE_WINDOW_MS = 60000; // 1 minute window
const CONVERSATION_LIMIT = 3; // Max 3 new conversations per hour per IP
const CONVERSATION_WINDOW_MS = 60 * 60 * 1000; // 1 hour

const rateLimitMap = new Map<string, number[]>();
const conversationMap = new Map<string, number[]>();

// Clean up old entries periodically to prevent memory leak
setInterval(() => {
  const now = Date.now();
  for (const [ip, timestamps] of rateLimitMap.entries()) {
    const recentRequests = timestamps.filter(t => now - t < RATE_WINDOW_MS);
    if (recentRequests.length === 0) {
      rateLimitMap.delete(ip);
    } else {
      rateLimitMap.set(ip, recentRequests);
    }
  }
  for (const [ip, timestamps] of conversationMap.entries()) {
    const recentTimestamps = timestamps.filter(t => now - t < CONVERSATION_WINDOW_MS);
    if (recentTimestamps.length === 0) {
      conversationMap.delete(ip);
    } else {
      conversationMap.set(ip, recentTimestamps);
    }
  }
}, RATE_WINDOW_MS);

function checkRateLimit(ip: string): boolean {
  const now = Date.now();
  const userRequests = rateLimitMap.get(ip) || [];
  
  // Remove old requests outside the time window
  const recentRequests = userRequests.filter(
    timestamp => now - timestamp < RATE_WINDOW_MS
  );
  
  if (recentRequests.length >= RATE_LIMIT) {
    console.warn(`Rate limit exceeded for IP: ${ip}`);
    return false; // Rate limit exceeded
  }
  
  recentRequests.push(now);
  rateLimitMap.set(ip, recentRequests);
  return true;
}

function checkConversationLimit(ip: string, hasLeadId: boolean): boolean {
  // If they already have a leadId, they're continuing an existing conversation
  if (hasLeadId) {
    return true;
  }
  
  const now = Date.now();
  const timestamps = conversationMap.get(ip) || [];
  
  // Filter out old timestamps
  const recentTimestamps = timestamps.filter(t => now - t < CONVERSATION_WINDOW_MS);
  
  if (recentTimestamps.length >= CONVERSATION_LIMIT) {
    console.warn(`Conversation limit exceeded for IP: ${ip}`);
    return false;
  }
  
  // Add current timestamp for new conversation
  recentTimestamps.push(now);
  conversationMap.set(ip, recentTimestamps);
  
  return true;
}

function getClientIP(req: Request): string {
  // Try to get real IP from headers (for proxies/load balancers)
  const forwardedFor = req.headers.get('x-forwarded-for');
  if (forwardedFor) {
    return forwardedFor.split(',')[0].trim();
  }
  
  const realIP = req.headers.get('x-real-ip');
  if (realIP) {
    return realIP;
  }
  
  // Fallback to a default if no IP found
  return 'unknown';
}

serve(async (req) => {
  if (req.method === "OPTIONS") return new Response(null, { headers: corsHeaders });

  // Check rate limit before processing
  const clientIP = getClientIP(req);
  if (!checkRateLimit(clientIP)) {
    console.error(`Rate limit exceeded for IP: ${clientIP}`);
    return new Response(
      JSON.stringify({ 
        error: "Too many requests. Please wait a moment and try again.",
        retryAfter: Math.ceil(RATE_WINDOW_MS / 1000) // seconds
      }), 
      {
        status: 429,
        headers: { 
          ...corsHeaders, 
          "Content-Type": "application/json",
          "Retry-After": String(Math.ceil(RATE_WINDOW_MS / 1000))
        },
      }
    );
  }

  try {
    const { messages, leadId } = await req.json();
    
    // Check conversation limit for new conversations
    if (!checkConversationLimit(clientIP, !!leadId)) {
      console.error(`Conversation limit exceeded for IP: ${clientIP}`);
      return new Response(
        JSON.stringify({ 
          error: "Too many new conversations. Please continue your existing conversation or try again later.",
        }), 
        {
          status: 429,
          headers: { 
            ...corsHeaders, 
            "Content-Type": "application/json",
          },
        }
      );
    }
    
    // Validate messages input
    if (!Array.isArray(messages) || messages.length === 0) {
      return new Response(JSON.stringify({ error: "Invalid messages format" }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }
    
    // Limit messages array to prevent abuse
    if (messages.length > 100) {
      return new Response(JSON.stringify({ error: "Too many messages in request" }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }
    
    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    if (!LOVABLE_API_KEY) throw new Error("LOVABLE_API_KEY is not configured");

    const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
    const supabaseKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
    const supabase = createClient(supabaseUrl, supabaseKey);

    const systemPrompt = `You are a helpful assistant for Michael Chandler, a professional interior designer with over a decade of experience. Your role is to:

1. Welcome visitors warmly and professionally
2. Learn about their project needs (residential, commercial, hospitality, etc.)
3. Gather their contact information: name, email, phone (optional)
4. Ask about their budget range: Under $50k, $50k-$100k, $100k-$250k, $250k+, Undecided
5. Understand their project timeline and specific requirements
6. Be conversational and engaging, not robotic

Keep responses concise (2-3 sentences). Ask one question at a time. When you have gathered name, email, and project details, let them know Michael will be in touch soon.

IMPORTANT: When you have collected the user's information, respond with a JSON object in this exact format at the END of your message after your conversational response:
LEAD_DATA: {"name": "John Doe", "email": "john@example.com", "phone": "555-0100", "project_type": "Residential", "budget_range": "$50k-$100k", "message": "Looking to redesign living room"}

Only include the LEAD_DATA when you have at least name and email.`;

    console.log(`Processing request - IP: ${clientIP}, LeadID: ${leadId || 'new'}, Messages: ${messages.length}`);
    const response = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${LOVABLE_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "google/gemini-2.5-flash",
        messages: [
          { role: "system", content: systemPrompt },
          ...messages,
        ],
      }),
    });

    if (!response.ok) {
      if (response.status === 429) {
        return new Response(JSON.stringify({ error: "Rate limits exceeded, please try again later." }), {
          status: 429,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
      if (response.status === 402) {
        return new Response(JSON.stringify({ error: "Payment required." }), {
          status: 402,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
      const errorText = await response.text();
      console.error("AI gateway error:", response.status, errorText);
      return new Response(JSON.stringify({ error: "AI gateway error" }), {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const data = await response.json();
    const assistantMessage = data.choices[0].message.content;

    // Check if lead data is present
    let leadData: any = null;
    let cleanMessage = assistantMessage;
    
    if (assistantMessage.includes("LEAD_DATA:")) {
      const parts = assistantMessage.split("LEAD_DATA:");
      cleanMessage = parts[0].trim();
      try {
        const rawLeadData = JSON.parse(parts[1].trim());
        
        // Validate lead data using zod schema
        const validationResult = LeadSchema.safeParse(rawLeadData);
        
        if (!validationResult.success) {
          console.error("Lead data validation failed:", validationResult.error.issues);
          // Don't save invalid data, but continue with the conversation
          return new Response(
            JSON.stringify({ 
              message: cleanMessage,
              leadData: null 
            }),
            {
              headers: { ...corsHeaders, "Content-Type": "application/json" },
            }
          );
        }
        
        const validatedData = validationResult.data;
        
        // Limit conversation history to last 50 messages
        const limitedMessages = messages.slice(-MAX_CONVERSATION_MESSAGES);
        
        // Save or update lead in database with validated data
        const leadInfo = {
          name: validatedData.name,
          email: validatedData.email,
          phone: validatedData.phone || null,
          project_type: validatedData.project_type || null,
          budget_range: validatedData.budget_range || null,
          message: validatedData.message || null,
          conversation_history: limitedMessages,
          updated_at: new Date().toISOString(),
        };

        if (leadId) {
          const { error: updateError } = await supabase
            .from("client_leads")
            .update(leadInfo)
            .eq("id", leadId);
            
          if (updateError) {
            console.error("Error updating lead:", updateError);
          }
          leadData = { ...validatedData, id: leadId };
        } else {
          const { data: newLead, error: insertError } = await supabase
            .from("client_leads")
            .insert([leadInfo])
            .select()
            .single();
          
          if (insertError) {
            console.error("Error inserting lead:", insertError);
          } else if (newLead) {
            leadData = { ...validatedData, id: newLead.id };
          }
        }
      } catch (e) {
        console.error("Error parsing or saving lead data:", e);
        // Don't expose internal errors to client
      }
    }

    return new Response(
      JSON.stringify({ 
        message: cleanMessage,
        leadData: leadData 
      }),
      {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      }
    );
  } catch (e) {
    console.error("chatbot error:", e);
    return new Response(
      JSON.stringify({ error: e instanceof Error ? e.message : "Unknown error" }),
      {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      }
    );
  }
});
