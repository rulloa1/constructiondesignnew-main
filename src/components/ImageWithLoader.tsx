import React, { useState, useEffect } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";

interface ImageWithLoaderProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  /**
   * Low-res placeholder image URL (optional)
   * Shown while the main image loads for a blur-up effect
   */
  placeholderSrc?: string;
  /**
   * Container className for the wrapper div
   */
  containerClassName?: string;
  /**
   * Whether to show skeleton while loading
   * @default true
   */
  showSkeleton?: boolean;
}

/**
 * Image component with loading state and blur-up effect
 * Shows a skeleton or placeholder while loading, then smoothly transitions to the full image
 * 
 * @example
 * <ImageWithLoader 
 *   src="/image.jpg" 
 *   alt="Description"
 *   className="w-full h-64 object-cover"
 *   placeholderSrc="/image-tiny.jpg"
 * />
 */
export function ImageWithLoader({
  src,
  alt,
  className,
  containerClassName,
  placeholderSrc,
  showSkeleton = true,
  loading = "lazy",
  ...props
}: ImageWithLoaderProps) {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isError, setIsError] = useState(false);

  // Reset loading state when src changes
  useEffect(() => {
    setIsLoaded(false);
    setIsError(false);
  }, [src]);

  const handleLoad = () => {
    setIsLoaded(true);
  };

  const handleError = () => {
    setIsError(true);
  };

  return (
    <div className={cn("relative overflow-hidden", containerClassName)}>
      {/* Skeleton or placeholder */}
      {!isLoaded && !isError && showSkeleton && (
        <Skeleton className="absolute inset-0 w-full h-full" />
      )}

      {/* Low-res placeholder (if provided) */}
      {placeholderSrc && !isLoaded && !isError && (
        <img
          src={placeholderSrc}
          alt={alt}
          className={cn(
            "absolute inset-0 w-full h-full",
            "blur-sm scale-105 transition-opacity duration-300",
            isLoaded ? "opacity-0" : "opacity-100",
            className
          )}
          aria-hidden="true"
        />
      )}

      {/* Main image */}
      {!isError && (
        <img
          src={src}
          alt={alt}
          loading={loading}
          onLoad={handleLoad}
          onError={handleError}
          className={cn(
            "w-full h-full transition-all duration-500",
            isLoaded
              ? "opacity-100 scale-100 blur-0"
              : "opacity-0 scale-105 blur-sm",
            className
          )}
          {...props}
        />
      )}

      {/* Error state */}
      {isError && (
        <div
          className={cn(
            "absolute inset-0 flex items-center justify-center",
            "bg-muted text-muted-foreground text-sm",
            className
          )}
        >
          <div className="text-center">
            <svg
              className="w-12 h-12 mx-auto mb-2 opacity-50"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
              />
            </svg>
            <p>Unable to load image</p>
          </div>
        </div>
      )}
    </div>
  );
}
