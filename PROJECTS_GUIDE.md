# 📋 How to Update Projects

## 📁 File Location
All projects are managed in: **`src/data/projects.ts`**

## 📸 Image Location
All project images should be placed in: **`src/assets/projects/`**

---

## ✏️ How to Add/Edit a Project

### Step 1: Add Your Images
1. Place your project images in `src/assets/projects/` folder
2. Recommended naming: `project-name-cover.jpg` (for the main image)
3. Other images: `project-name-1.jpg`, `project-name-2.jpg`, etc.

### Step 2: Import Images in `projects.ts`
At the top of the file, add imports for your images:
```typescript
import myProjectCover from "@/assets/projects/my-project-cover.jpg";
import myProject1 from "@/assets/projects/my-project-1.jpg";
import myProject2 from "@/assets/projects/my-project-2.jpg";
```

### Step 3: Add Project Object
Add your project to the `projects` array in `projects.ts`:

```typescript
{
  id: "my-unique-project-id",           // Unique identifier (lowercase, hyphens)
  title: "Project Title",                // Main title shown in portfolio
  subtitle: "Subtitle",                 // Optional: Secondary title line
  location: "Category Label",           // Category label (shown below title)
  additionalInfo: "Location, CA",      // Optional: Additional info (shown below location)
  category: "Residential",              // Category: "Residential" | "Commercial" | "Hospitality" | "Design Build"
  description: "Detailed description of the project...",  // Full project description
  image: myProjectCover,                // Main/cover image (shown in grid)
  images: [                              // Array of ALL images for gallery
    myProjectCover,
    myProject1,
    myProject2,
    // ... add all images here
  ],
}
```

---

## 📝 Example Project

Here's a complete example:

```typescript
{
  id: "monterey-custom-home",
  title: "Monterey Custom Home",
  subtitle: "Luxury Residence",
  location: "Residential",
  additionalInfo: "Monterey, CA",
  category: "Residential",
  description: "A stunning custom-built home featuring ocean views, sustainable materials, and modern architectural design. This 4,500 sq ft residence showcases our commitment to quality craftsmanship and attention to detail.",
  image: montereyCover,
  images: [
    montereyCover,
    monterey1,
    monterey2,
    monterey3,
    monterey4,
    monterey5,
  ],
}
```

---

## 🎯 Available Categories

Projects must use one of these categories:
- `"Residential"`
- `"Commercial"`
- `"Hospitality"`
- `"Design Build"`

---

## ✅ Quick Checklist

When adding a new project:
- [ ] Images added to `src/assets/projects/`
- [ ] Images imported at top of `projects.ts`
- [ ] Unique `id` (lowercase with hyphens)
- [ ] All required fields filled
- [ ] Category matches one of the 4 valid categories
- [ ] `image` is set (main/cover image)
- [ ] `images` array includes all gallery images

---

## 📍 Where Projects Appear

- **Portfolio Grid**: All projects appear in the main portfolio view
- **Project Detail Page**: Clicking a project shows `/project/:id` with full gallery
- **Category Filters**: Projects can be filtered by category
- **Homepage**: Featured projects may appear on the homepage

---

## 🔄 Editing Existing Projects

To edit an existing project:
1. Find the project object in the `projects` array
2. Update any fields (title, description, images, etc.)
3. Save the file
4. Changes will appear after the page reloads

---

## 🖼️ Image Best Practices

- **Cover Image**: Should be the best/most representative image
- **Format**: JPG, PNG, or WebP (all supported)
- **Size**: Optimize images for web (recommended: 1920px max width)
- **Naming**: Use descriptive, consistent naming conventions

---

## 🚫 Important Notes

- **Unique IDs**: Each project must have a unique `id`
- **Image Paths**: Always import images, don't use string paths directly
- **Category**: Must be one of the 4 valid categories
- **Images Array**: First image should typically be the cover image

---

Need help? Check the existing projects in `src/data/projects.ts` for more examples!

