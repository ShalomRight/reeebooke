"use client"

import { useState } from "react"
import { cn } from "@/lib/utils"

interface ImageWithFallbackProps {
  src: string | null | undefined
  alt: string
  className?: string
  containerClassName?: string
  fallbackSrc?: string
  aspectRatio?: "square" | "video" | "4/3" | "16/9" | "auto"
}

const aspectRatioClasses = {
  square: "aspect-square",
  video: "aspect-video",
  "4/3": "aspect-[4/3]",
  "16/9": "aspect-[16/9]",
  auto: "",
}

export function ImageWithFallback({
  src,
  alt,
  className,
  containerClassName,
  fallbackSrc = "/abby-placeholder.svg",
  aspectRatio = "4/3",
}: ImageWithFallbackProps) {
  const [error, setError] = useState(false)
  const [loaded, setLoaded] = useState(false)

  const imageSrc = error || !src ? fallbackSrc : src

  return (
    <div
      className={cn(
        "relative overflow-hidden bg-warm-100",
        aspectRatioClasses[aspectRatio],
        containerClassName
      )}
    >
      {/* Loading skeleton */}
      {!loaded && !error && (
        <div className="absolute inset-0 bg-gradient-to-br from-warm-200 to-warm-100 animate-pulse" />
      )}

      {/* Image */}
      <img
        src={imageSrc}
        alt={alt}
        onError={() => setError(true)}
        onLoad={() => setLoaded(true)}
        className={cn(
          "w-full h-full object-cover transition-opacity duration-300",
          loaded ? "opacity-100" : "opacity-0",
          className
        )}
      />

      {/* Fallback overlay for branded placeholder */}
      {error && (
        <div className="absolute inset-0 flex items-center justify-center bg-terracotta-50/50">
          <img
            src={fallbackSrc}
            alt="Abi's Hair Creation"
            className="w-1/2 h-1/2 object-contain opacity-80"
          />
        </div>
      )}
    </div>
  )
}
