"use client"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"

interface Petal {
  id: number
  x: number
  delay: number
  duration: number
  size: number
  rotation: number
  swayAmount: number
}

export function CherryBlossoms() {
  const [petals, setPetals] = useState<Petal[]>([])

  useEffect(() => {
    const generatePetals = () => {
      const newPetals: Petal[] = []
      for (let i = 0; i < 25; i++) {
        newPetals.push({
          id: i,
          x: Math.random() * 100,
          delay: Math.random() * 10,
          duration: 8 + Math.random() * 8,
          size: 8 + Math.random() * 12,
          rotation: Math.random() * 360,
          swayAmount: 30 + Math.random() * 50,
        })
      }
      setPetals(newPetals)
    }
    generatePetals()
  }, [])

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-10">
      {petals.map((petal) => (
        <motion.div
          key={petal.id}
          className="absolute"
          style={{
            left: `${petal.x}%`,
            top: -30,
          }}
          animate={{
            y: ["0vh", "110vh"],
            x: [0, petal.swayAmount, -petal.swayAmount / 2, petal.swayAmount / 2, 0],
            rotate: [petal.rotation, petal.rotation + 360],
          }}
          transition={{
            y: {
              duration: petal.duration,
              repeat: Infinity,
              delay: petal.delay,
              ease: "linear",
            },
            x: {
              duration: petal.duration / 2,
              repeat: Infinity,
              delay: petal.delay,
              ease: "easeInOut",
            },
            rotate: {
              duration: petal.duration,
              repeat: Infinity,
              delay: petal.delay,
              ease: "linear",
            },
          }}
        >
          <svg
            width={petal.size}
            height={petal.size}
            viewBox="0 0 24 24"
            fill="none"
            className="opacity-60"
          >
            <path
              d="M12 2C12 2 8 6 8 10C8 12.5 10 14 12 14C14 14 16 12.5 16 10C16 6 12 2 12 2Z"
              fill="#fda4af"
            />
            <path
              d="M12 2C12 2 8 6 8 10C8 12.5 10 14 12 14"
              fill="#fb7185"
              opacity="0.6"
            />
          </svg>
        </motion.div>
      ))}
    </div>
  )
}
