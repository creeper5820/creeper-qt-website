"use client"

import { useState, useEffect } from "react"

const THEME_STORAGE_KEY = "creeper-qt-theme"

export function useTheme() {
  const [isDark, setIsDark] = useState(false)
  const [isInitialized, setIsInitialized] = useState(false)

  // Initialize theme from localStorage or system preference
  useEffect(() => {
    if (typeof window === "undefined") return

    const storedTheme = localStorage.getItem(THEME_STORAGE_KEY)
    
    if (storedTheme !== null) {
      // Use stored preference
      setIsDark(storedTheme === "dark")
    } else {
      // Check system preference
      const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches
      setIsDark(prefersDark)
    }
    
    setIsInitialized(true)
  }, [])

  // Apply theme to document
  useEffect(() => {
    if (!isInitialized || typeof window === "undefined") return

    if (isDark) {
      document.documentElement.classList.add("dark")
      localStorage.setItem(THEME_STORAGE_KEY, "dark")
    } else {
      document.documentElement.classList.remove("dark")
      localStorage.setItem(THEME_STORAGE_KEY, "light")
    }
  }, [isDark, isInitialized])

  // Listen to system theme changes (optional)
  useEffect(() => {
    if (!isInitialized || typeof window === "undefined") return

    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)")
    
    const handleChange = (e: MediaQueryListEvent) => {
      // Only update if user hasn't set a preference
      if (localStorage.getItem(THEME_STORAGE_KEY) === null) {
        setIsDark(e.matches)
      }
    }

    mediaQuery.addEventListener("change", handleChange)
    return () => mediaQuery.removeEventListener("change", handleChange)
  }, [isInitialized])

  const toggleTheme = () => {
    setIsDark((prev) => !prev)
  }

  return { isDark, setIsDark, toggleTheme }
}

