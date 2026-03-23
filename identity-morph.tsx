"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"

const names = ["BROKEN", "HIMANSHU", "Hey! Cutie"]

export function IdentityMorph() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isGlitching, setIsGlitching] = useState(false)

  useEffect(() => {
    const interval = setInterval(() => {
      setIsGlitching(true)
      
      setTimeout(() => {
        setCurrentIndex((prev) => (prev + 1) % names.length)
        setTimeout(() => {
          setIsGlitching(false)
        }, 200)
      }, 400)
    }, 3000)

    return () => clearInterval(interval)
  }, [])

  const currentName = names[currentIndex]

  return (
    <div className="relative inline-block">
      {/* Dark red glow effect */}
      <div 
        className="absolute inset-0 blur-3xl opacity-60"
        style={{
          background: `radial-gradient(ellipse at center, #8B0000 0%, transparent 70%)`,
        }}
      />
      
      {/* Main text container */}
      <div className="relative">
        <AnimatePresence mode="wait">
          <motion.h1
            key={currentName}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.15 }}
            className={`
              font-display text-6xl md:text-8xl lg:text-9xl font-bold tracking-wider text-foreground
              ${isGlitching ? "animate-glitch" : ""}
            `}
            style={{
              textShadow: isGlitching 
                ? `
                    0 0 20px #8B0000,
                    0 0 40px #8B0000,
                    0 0 60px #8B0000,
                    0 0 100px #8B0000
                  `
                : `
                    0 0 10px #8B0000,
                    0 0 30px rgba(139, 0, 0, 0.5),
                    0 0 60px rgba(139, 0, 0, 0.3)
                  `,
            }}
          >
            {/* Horizontal slice glitch layers with red and purple offsets */}
            {isGlitching && (
              <>
                {/* Top slice - Dark red offset */}
                <span 
                  className="absolute inset-0 opacity-80"
                  style={{ 
                    clipPath: "polygon(0 0, 100% 0, 100% 20%, 0 20%)",
                    transform: "translate(-6px, 0)",
                    color: "#8B0000",
                    textShadow: "0 0 10px #8B0000",
                  }}
                  aria-hidden="true"
                >
                  {currentName}
                </span>
                {/* Upper-mid slice - Purple offset */}
                <span 
                  className="absolute inset-0 opacity-80"
                  style={{ 
                    clipPath: "polygon(0 20%, 100% 20%, 100% 40%, 0 40%)",
                    transform: "translate(8px, 0)",
                    color: "#a855f7",
                    textShadow: "0 0 10px #a855f7",
                  }}
                  aria-hidden="true"
                >
                  {currentName}
                </span>
                {/* Mid slice - Dark red offset */}
                <span 
                  className="absolute inset-0 opacity-80"
                  style={{ 
                    clipPath: "polygon(0 40%, 100% 40%, 100% 60%, 0 60%)",
                    transform: "translate(-4px, 0)",
                    color: "#8B0000",
                    textShadow: "0 0 10px #8B0000",
                  }}
                  aria-hidden="true"
                >
                  {currentName}
                </span>
                {/* Lower-mid slice - Purple offset */}
                <span 
                  className="absolute inset-0 opacity-80"
                  style={{ 
                    clipPath: "polygon(0 60%, 100% 60%, 100% 80%, 0 80%)",
                    transform: "translate(5px, 0)",
                    color: "#a855f7",
                    textShadow: "0 0 10px #a855f7",
                  }}
                  aria-hidden="true"
                >
                  {currentName}
                </span>
                {/* Bottom slice - Dark red offset */}
                <span 
                  className="absolute inset-0 opacity-80"
                  style={{ 
                    clipPath: "polygon(0 80%, 100% 80%, 100% 100%, 0 100%)",
                    transform: "translate(-3px, 0)",
                    color: "#8B0000",
                    textShadow: "0 0 10px #8B0000",
                  }}
                  aria-hidden="true"
                >
                  {currentName}
                </span>
              </>
            )}
            
            {/* Main text */}
            <span className="relative">{currentName}</span>
          </motion.h1>
        </AnimatePresence>
        
        {/* Multiple scanlines during glitch */}
        {isGlitching && (
          <>
            <motion.div
              initial={{ top: "0%" }}
              animate={{ top: "100%" }}
              transition={{ duration: 0.2, ease: "linear" }}
              className="absolute left-0 right-0 h-0.5 bg-red-400/70 pointer-events-none"
              style={{ mixBlendMode: "screen" }}
            />
            <motion.div
              initial={{ top: "100%" }}
              animate={{ top: "0%" }}
              transition={{ duration: 0.25, ease: "linear" }}
              className="absolute left-0 right-0 h-0.5 bg-purple-400/70 pointer-events-none"
              style={{ mixBlendMode: "screen" }}
            />
          </>
        )}
      </div>
    </div>
  )
}
