"use client"

import { useEffect, useRef, useState } from "react"

interface Particle {
  id: number
  x: number
  y: number
  size: number
  opacity: number
  color: string
}

export function ParticleTrail() {
  const [particles, setParticles] = useState<Particle[]>([])
  const particleIdRef = useRef(0)
  const lastPositionRef = useRef({ x: 0, y: 0 })

  useEffect(() => {
    const colors = ["#8B0000", "#DC143C", "#FF6B6B", "#FFB6C1", "#FFFFFF"]
    
    const handleMouseMove = (e: MouseEvent) => {
      const dx = e.clientX - lastPositionRef.current.x
      const dy = e.clientY - lastPositionRef.current.y
      const distance = Math.sqrt(dx * dx + dy * dy)
      
      // Only create particles if mouse moved enough
      if (distance > 5) {
        lastPositionRef.current = { x: e.clientX, y: e.clientY }
        
        const newParticle: Particle = {
          id: particleIdRef.current++,
          x: e.clientX,
          y: e.clientY,
          size: Math.random() * 8 + 4,
          opacity: 1,
          color: colors[Math.floor(Math.random() * colors.length)]
        }
        
        setParticles(prev => [...prev, newParticle])
        
        // Remove particle after animation
        setTimeout(() => {
          setParticles(prev => prev.filter(p => p.id !== newParticle.id))
        }, 1000)
      }
    }

    window.addEventListener("mousemove", handleMouseMove)
    return () => window.removeEventListener("mousemove", handleMouseMove)
  }, [])

  return (
    <div className="fixed inset-0 pointer-events-none z-50 overflow-hidden">
      {particles.map(particle => (
        <div
          key={particle.id}
          className="absolute rounded-full animate-particle-fade"
          style={{
            left: particle.x,
            top: particle.y,
            width: particle.size,
            height: particle.size,
            backgroundColor: particle.color,
            transform: "translate(-50%, -50%)",
            boxShadow: `0 0 ${particle.size * 2}px ${particle.color}`,
          }}
        />
      ))}
    </div>
  )
}
