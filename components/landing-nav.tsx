"use client"

import React, { useState } from "react"
import { Menu, Home, User, FileUser, X } from "lucide-react"
import ThemeSwitcher from "./theme-switcher"
import { Button } from "@/components/ui/button"
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet"
import Link from "next/link"
import { usePathname } from "next/navigation"

export default function LandingNav() {
  const [isOpen, setIsOpen] = useState(false)
  const pathname = usePathname()

  const handleNavClick = () => {
    setIsOpen(false)
  }

  const isActive = (path: string) => pathname === path

  return (
    <>
      {/* Mobile Header Bar */}
      <div className="md:hidden bg-background border-b border-border px-4 py-3 flex items-center justify-between">
        {/* Left: Hamburger Menu */}
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setIsOpen(true)}
          aria-label="Open navigation menu"
        >
          <Menu className="w-5 h-5" />
        </Button>

        {/* Center: Title */}
        <Link href="/" className="text-sm font-semibold">
          Julian Gonzalez
        </Link>

        {/* Right: Theme Switcher */}
        <ThemeSwitcher />
      </div>

      {/* Desktop Header Bar */}
      <div className="hidden md:block bg-background border-b border-border px-4 py-3">
        <div className="flex items-center justify-between">
          {/* Left section */}
          <div className="flex items-center space-x-4">
            <Link href="/">
              <Button
                variant="ghost"
                className="flex items-center space-x-2 text-primary"
              >
                <Home className="w-5 h-5" />
                <span className="font-medium">Course Hub</span>
              </Button>
            </Link>

            <Link href="/experience">
              <Button
                variant="ghost"
                className="flex items-center space-x-2 text-foreground hover:text-foreground/80"
              >
                <FileUser className="w-5 h-5" />
                <span className="font-medium">Experience</span>
              </Button>
            </Link>

            <Link href="/about-me">
              <Button
                variant="ghost"
                className="flex items-center space-x-2 text-foreground hover:text-foreground/80"
              >
                <User className="w-5 h-5" />
                <span className="font-medium">About Me</span>
              </Button>
            </Link>
          </div>

          {/* Right section */}
          <div className="flex items-center space-x-4">
            <ThemeSwitcher />
            <div className="relative">
              <Button
                variant="outline"
                size="icon"
                className="w-8 h-8 rounded-full bg-gradient-to-r from-primary to-primary/80 border-0 hover:shadow-md transition-shadow"
              >
                <User className="w-5 h-5 text-primary-foreground" />
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Navigation Drawer */}
      <Sheet open={isOpen} onOpenChange={setIsOpen}>
        <SheetContent side="left" className="w-[300px] sm:w-[350px] p-0">
          <SheetHeader className="p-6 pb-4">
            <div className="flex items-center justify-between">
              <SheetTitle>Julian Gonzalez</SheetTitle>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setIsOpen(false)}
              >
                <X className="w-5 h-5" />
              </Button>
            </div>
          </SheetHeader>

          <div className="flex flex-col px-6 space-y-2">
            {/* Home */}
            <Link href="/" onClick={handleNavClick}>
              <Button
                variant={isActive("/") ? "secondary" : "ghost"}
                className="w-full justify-start gap-3"
                size="lg"
              >
                <Home className="w-5 h-5" />
                <span>Course Hub</span>
              </Button>
            </Link>

            {/* CV */}
            <Link href="/experience" onClick={handleNavClick}>
              <Button
                variant={isActive("/cv") ? "secondary" : "ghost"}
                className="w-full justify-start gap-3"
                size="lg"
              >
                <FileUser className="w-5 h-5" />
                <span>Experience</span>
              </Button>
            </Link>

            {/* About Me */}
            <Link href="/about-me" onClick={handleNavClick}>
              <Button
                variant={isActive("/about-me") ? "secondary" : "ghost"}
                className="w-full justify-start gap-3"
                size="lg"
              >
                <User className="w-5 h-5" />
                <span>About Me</span>
              </Button>
            </Link>
          </div>

          {/* Additional Info Section */}
          <div className="mt-auto p-6 border-t border-border">
            <div className="text-center">
              <p className="text-sm text-muted-foreground mb-2">
                Professor of Computer Science
              </p>
              <p className="text-xs text-muted-foreground">
                Advancing algorithms, machine learning, and software engineering
              </p>
            </div>
          </div>
        </SheetContent>
      </Sheet>
    </>
  )
}
