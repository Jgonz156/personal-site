"use client"

import { useState, useEffect } from "react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"

export interface DieImageToggleProps {
  labeledSrc: string
  unlabeledSrc: string
  alt: string
  caption?: string
  className?: string
}

export function DieImageToggle({
  labeledSrc,
  unlabeledSrc,
  alt,
  caption,
  className,
}: DieImageToggleProps) {
  const [showLabeled, setShowLabeled] = useState(false)
  const [labeledExists, setLabeledExists] = useState(true)
  const [unlabeledExists, setUnlabeledExists] = useState(true)

  const currentSrc = showLabeled ? labeledSrc : unlabeledSrc
  const currentExists = showLabeled ? labeledExists : unlabeledExists

  useEffect(() => {
    const checkImage = (src: string, setter: (v: boolean) => void) => {
      const img = new Image()
      img.onload = () => setter(true)
      img.onerror = () => setter(false)
      img.src = src
    }
    checkImage(labeledSrc, setLabeledExists)
    checkImage(unlabeledSrc, setUnlabeledExists)
  }, [labeledSrc, unlabeledSrc])

  return (
    <div className={cn("border rounded-lg overflow-hidden bg-card", className)}>
      {/* Image area */}
      <div className="relative aspect-video bg-muted flex items-center justify-center overflow-hidden">
        {currentExists ? (
          <img
            src={currentSrc}
            alt={`${alt} (${showLabeled ? "labeled" : "unlabeled"})`}
            className="w-full h-full object-contain"
          />
        ) : (
          <div className="flex flex-col items-center gap-2 text-muted-foreground p-6 text-center">
            <div className="text-4xl">🖥️</div>
            <p className="text-sm font-mono">{currentSrc}</p>
            <p className="text-xs">Image placeholder — file will be added later</p>
          </div>
        )}
      </div>

      {/* Controls and caption */}
      <div className="p-3 flex items-center justify-between border-t">
        <div className="flex-1">
          {caption && (
            <p className="text-xs text-muted-foreground">{caption}</p>
          )}
        </div>
        <div className="flex gap-1 ml-3">
          <Button
            variant={!showLabeled ? "default" : "outline"}
            size="sm"
            onClick={() => setShowLabeled(false)}
            className="text-xs"
          >
            Clean
          </Button>
          <Button
            variant={showLabeled ? "default" : "outline"}
            size="sm"
            onClick={() => setShowLabeled(true)}
            className="text-xs"
          >
            Labeled
          </Button>
        </div>
      </div>
    </div>
  )
}
