"use client"

import { motion, useInView } from "framer-motion"
import { useRef } from "react"

export function ScrambleText({ 
  children, 
  className = "",
  duration = 1.5,
  delay = 0
}: { 
  children: string
  className?: string
  duration?: number
  delay?: number
}) {
  const ref = useRef<HTMLSpanElement>(null)
  const isInView = useInView(ref, { once: true, margin: "-50px" })

  return (
    <motion.span
      ref={ref}
      initial={{ opacity: 0 }}
      animate={isInView ? { opacity: 1 } : { opacity: 0 }}
      transition={{ duration: duration, delay }}
      className={className}
      style={{ fontFamily: "inherit" }}
    >
      {children}
    </motion.span>
  )
}
