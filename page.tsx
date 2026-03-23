"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { motion } from "framer-motion"
import { MapPin, Calendar, Users, Sparkles, BookOpen, Crown, Palette, Award, Shirt, ImageIcon, Volume2, VolumeX, Play, Pause } from "lucide-react"
import { useRef } from "react"
import { IdentityMorph } from "@/components/identity-morph"
import { CherryBlossoms } from "@/components/cherry-blossoms"
import { CRTOverlay } from "@/components/crt-overlay"
import { ScrambleText } from "@/components/scramble-text"

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6 }
}

const staggerContainer = {
  animate: {
    transition: {
      staggerChildren: 0.1
    }
  }
}

export default function Portfolio() {
  const [scrollY, setScrollY] = useState(0)
  const [isPlaying, setIsPlaying] = useState(false)
  const [volume, setVolume] = useState(0.5)
  const [isMuted, setIsMuted] = useState(false)
  const audioRef = useRef<HTMLAudioElement>(null)

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY)
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const togglePlay = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause()
      } else {
        audioRef.current.play()
      }
      setIsPlaying(!isPlaying)
    }
  }

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newVolume = parseFloat(e.target.value)
    setVolume(newVolume)
    if (audioRef.current) {
      audioRef.current.volume = newVolume
    }
    if (newVolume === 0) {
      setIsMuted(true)
    } else {
      setIsMuted(false)
    }
  }

  const toggleMute = () => {
    if (audioRef.current) {
      if (isMuted) {
        audioRef.current.volume = volume || 0.5
        setIsMuted(false)
      } else {
        audioRef.current.volume = 0
        setIsMuted(true)
      }
    }
  }

  return (
    <main className="min-h-screen text-foreground overflow-x-hidden relative">
      {/* Blood-red to obsidian gradient background */}
      <div 
        className="fixed inset-0 z-0"
        style={{
          background: `linear-gradient(180deg, #450a0a 0%, #1c0a0a 30%, #0a0a0f 60%, #020617 100%)`,
        }}
      />

      {/* Cherry blossom petals */}
      <CherryBlossoms />

      {/* CRT scanlines and noise */}
      <CRTOverlay />

      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 px-6 py-4 bg-black/40 backdrop-blur-md border-b border-red-900/30">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <motion.span 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="text-lg font-serif font-bold tracking-wider"
            style={{ color: "#8B0000", textShadow: "0 0 10px rgba(139, 0, 0, 0.5)" }}
          >
            BROKEN
          </motion.span>
          <motion.span 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="text-sm text-red-200/60"
          >
            <ScrambleText duration={1.2} delay={0.5}>Chronicle</ScrambleText>
          </motion.span>
        </div>
      </nav>

      {/* Audio Element */}
      <audio
        ref={audioRef}
        src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Chupke_Se___Amal_x_Stereo_India%28128k%29_040049-wGF9XbrYDCCTMaLK6S54g7BC0XUW2n.mp3"
        loop
        onEnded={() => setIsPlaying(false)}
      />

      {/* Music Player - Fixed Bottom Right */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1 }}
        className="fixed bottom-6 right-6 z-50 flex items-center gap-3 bg-black/60 backdrop-blur-md border border-red-900/50 rounded-full px-4 py-2"
      >
        <button
          onClick={togglePlay}
          className="w-8 h-8 flex items-center justify-center rounded-full bg-red-900/30 hover:bg-red-900/50 transition-colors"
          style={{ color: "#8B0000" }}
        >
          {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4 ml-0.5" />}
        </button>
        
        <button
          onClick={toggleMute}
          className="text-red-200/60 hover:text-red-200 transition-colors"
        >
          {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
        </button>
        
        <input
          type="range"
          min="0"
          max="1"
          step="0.01"
          value={isMuted ? 0 : volume}
          onChange={handleVolumeChange}
          className="w-20 h-1 bg-red-900/30 rounded-full appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-3 [&::-webkit-slider-thumb]:h-3 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-red-700"
        />
        
        <span className="text-xs text-red-200/40 hidden sm:block">Chupke Se</span>
      </motion.div>

      {/* Hero Section - Banner + Profile */}
      <section className="relative pt-16 z-20">
        {/* Banner Image */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          className="relative w-full h-[300px] md:h-[400px] overflow-hidden"
          style={{ transform: `translateY(${scrollY * 0.3}px)` }}
        >
          <Image
            src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/1000001849-wDJZzOkOtGI3uK0PCmstw5OOpqHnTT.jpg"
            alt="Cinematic samurai in red spider lily field at sunset"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/80" />
        </motion.div>

        {/* Profile Picture + Info */}
        <div className="relative max-w-4xl mx-auto px-6">
          {/* Profile Picture - overlapping banner */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="relative -mt-24 md:-mt-32 mb-6"
          >
            <div className="absolute inset-0 w-36 h-36 md:w-48 md:h-48 bg-red-900/30 blur-2xl rounded-full" />
            <div className="relative w-36 h-36 md:w-48 md:h-48 rounded-full overflow-hidden border-4 border-black ring-2 ring-red-900/50">
              <Image
                src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/profile-m9PIDK3BqOO0kmj3FCUfeYt4ZqcBN3.webp"
                alt="Himanshu aka BROKEN - artistic portrait with blindfold"
                fill
                loading="eager"
                className="object-cover"
              />
            </div>
          </motion.div>

          {/* Hero Content */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="pb-16"
          >
            <div className="mb-4">
              <IdentityMorph />
            </div>
            <p className="text-lg md:text-xl text-red-100/80 max-w-md leading-relaxed">
              <ScrambleText duration={1.5} delay={0.8}>Content Creator & Community Helper</ScrambleText>
            </p>
            <div className="flex items-center gap-2 mt-4 text-red-200/60">
              <MapPin className="w-4 h-4" style={{ color: "#8B0000" }} />
              <span className="text-sm">
                <ScrambleText duration={1} delay={1}>Based in Jaipur</ScrambleText>
              </span>
            </div>
          </motion.div>
        </div>

        {/* Scroll Indicator */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
          className="absolute bottom-4 left-1/2 -translate-x-1/2"
        >
          <div className="w-6 h-10 border-2 rounded-full flex items-start justify-center p-1" style={{ borderColor: "rgba(139, 0, 0, 0.3)" }}>
            <motion.div 
              animate={{ y: [0, 12, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
              className="w-1.5 h-1.5 rounded-full"
              style={{ backgroundColor: "#8B0000" }}
            />
          </div>
        </motion.div>
      </section>

      {/* About Section with Portrait */}
      <section className="relative py-24 px-6 z-20">
        <div className="max-w-6xl mx-auto">
          <motion.div 
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            variants={staggerContainer}
            className="grid md:grid-cols-2 gap-12 items-center"
          >
            {/* Portrait */}
            <motion.div 
              variants={fadeInUp}
              className="relative max-w-md mx-auto md:mx-0"
            >
              <div className="absolute -inset-4 blur-3xl rounded-full" style={{ backgroundColor: "rgba(139, 0, 0, 0.2)" }} />
              <div className="relative w-full rounded-2xl overflow-hidden border border-red-900/50">
                <Image
                  src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/IMG_20260323_130336_010413-1EvLnwtllZIE2BfkzGwLiCyOs0yUdQ.jpg"
                  alt="Himanshu aka BROKEN - artistic portrait"
                  width={500}
                  height={500}
                  className="object-cover w-full h-auto"
                />
              </div>
            </motion.div>

            {/* Bio */}
            <motion.div variants={fadeInUp} className="space-y-6">
              <span className="text-sm font-medium tracking-widest uppercase" style={{ color: "#8B0000" }}>
                About
              </span>
              <h2 className="font-serif text-4xl md:text-5xl font-bold leading-tight text-red-50">
                Himanshu aka <span style={{ color: "#8B0000", textShadow: "0 0 20px rgba(139, 0, 0, 0.5)" }}>BROKEN</span>
              </h2>
              <p className="text-red-100/70 leading-relaxed text-lg">
                <ScrambleText duration={2} delay={0.3}>
                  I'm a dreamer exploring the digital world, one heartbeat and one line of code at a time. I don't just watch the world change—I put my heart into everything I learn and build. Whether it's connecting with beautiful communities or mastering a new language, I move with love, growth, and a little bit of magic.
                </ScrambleText>
              </p>
              <div className="flex items-center gap-4 pt-4">
                <div className="flex items-center gap-2 text-sm text-red-200/60">
                  <Calendar className="w-4 h-4" style={{ color: "#8B0000" }} />
                  <span><ScrambleText duration={1} delay={0.5}>Since July 2021</ScrambleText></span>
                </div>
                <div className="flex items-center gap-2 text-sm text-red-200/60">
                  <Users className="w-4 h-4" style={{ color: "#8B0000" }} />
                  <span><ScrambleText duration={1} delay={0.6}>Community Helper</ScrambleText></span>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Chronicle Section */}
      <section className="relative py-24 px-6 z-20 bg-black/30">
        <div className="max-w-6xl mx-auto">
          <motion.div 
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            variants={staggerContainer}
            className="space-y-16"
          >
            {/* Section Header */}
            <motion.div variants={fadeInUp} className="text-center">
              <span className="text-sm font-medium tracking-widest uppercase" style={{ color: "#8B0000" }}>
                Journey
              </span>
              <h2 className="font-serif text-4xl md:text-5xl font-bold mt-4 text-red-50">
                Chronicle
              </h2>
            </motion.div>

            {/* Chronicle Cards */}
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              <ChronicleCard
                icon={<Users className="w-6 h-6" />}
                title="The Veteran"
                description="3+ Years in the Trenches. I've navigated the shifts of the blockchain world since the early days. Not just a spectator, but a long-term contributor who understands the culture, the cycles, and the community."
                delay={0}
              />
              <ChronicleCard
                icon={<Award className="w-6 h-6" />}
                title="Hemigo of the Week"
                description="Proof of Contribution. A title earned within the Hemi Network for consistent engagement. It's a badge of honor that represents my dedication to being a 'Hemigo'—someone who moves the needle for the ecosystem."
                delay={0.1}
              />
              <ChronicleCard
                icon={<Palette className="w-6 h-6" />}
                title="Community Creative"
                description="Visual Architect. From winning T-shirt design contests to generating high-res media for Hemi Network and HairDAO, I use unique ideas and designs to give communities a visual identity. I build the vibe that people want to be part of."
                delay={0.2}
              />
              <ChronicleCard
                icon={<Crown className="w-6 h-6" />}
                title="Raja Rani Chor Sipahi"
                description="Logic in Motion. I successfully conceptualized and built a digital version of the classic Raja Rani Chor Sipahi game. It was my first major step into turning game logic into a functional experience, proving that I can build what I imagine."
                delay={0.3}
              />
              <ChronicleCard
                icon={<Sparkles className="w-6 h-6" />}
                title="Rapid Growth"
                description="High-Speed Learning. Whether it's mastering complex English linguistics for the LDC exams or deploying a site to Vercel via Termux, I don't just 'try'—I learn and execute. My trajectory is always upward."
                delay={0.4}
              />
              <ChronicleCard
                icon={<BookOpen className="w-6 h-6" />}
                title="The Discipline"
                description="The Daily Grind. I don't believe in luck; I believe in the routine. Whether I'm solving geometry theorems or perfecting Hindi grammar rules, I put in the hours every single day. My best work comes from the discipline of the study."
                delay={0.5}
              />
            </div>
          </motion.div>
        </div>
      </section>

      {/* T-Shirt and Logo Design Section */}
      <section className="relative py-24 px-6 z-20">
        <div className="max-w-6xl mx-auto">
          <motion.div 
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            variants={staggerContainer}
            className="space-y-16"
          >
            {/* Section Header */}
            <motion.div variants={fadeInUp} className="text-center">
              <span className="text-sm font-medium tracking-widest uppercase" style={{ color: "#8B0000" }}>
                Creative Work
              </span>
              <h2 className="font-serif text-4xl md:text-5xl font-bold mt-4 text-red-50">
                T-Shirt & Logo Design
              </h2>
            </motion.div>

            {/* Design Gallery */}
            <div className="grid md:grid-cols-3 gap-8">
              {/* HIPPO Logo - Silhouette */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                whileHover={{ y: -8, transition: { duration: 0.2 } }}
                className="group relative overflow-hidden rounded-2xl border border-red-900/50 bg-black/40 backdrop-blur-sm"
              >
                <div className="aspect-square overflow-hidden">
                  <Image
                    src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Project%20%2820251115124241%29-FJsRTptSmbTBZFn9QNOYLskfO2dIOb.jpg"
                    alt="HIPPO - Hemi Improvement Proposal Logo Design"
                    width={400}
                    height={400}
                    className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="absolute bottom-0 left-0 right-0 p-6 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                  <h3 className="font-serif text-xl font-bold text-red-50">HIPPO Logo</h3>
                  <p className="text-red-200/60 text-sm mt-2">
                    <ScrambleText duration={1.5} delay={0}>Hemi Improvement Proposal - Community logo design featuring a hippo silhouette</ScrambleText>
                  </p>
                </div>
              </motion.div>

              {/* HIPPO Logo - Robot Mascot */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.1 }}
                whileHover={{ y: -8, transition: { duration: 0.2 } }}
                className="group relative overflow-hidden rounded-2xl border border-red-900/50 bg-black/40 backdrop-blur-sm"
              >
                <div className="aspect-square overflow-hidden">
                  <Image
                    src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Project%20%2820251115021513%29-xA4h6lkvESVNdeZtcectszsOrXp6dA.jpg"
                    alt="HIPPO Robot Mascot Logo Design"
                    width={400}
                    height={400}
                    className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="absolute bottom-0 left-0 right-0 p-6 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                  <h3 className="font-serif text-xl font-bold text-red-50">HIPPO Mascot</h3>
                  <p className="text-red-200/60 text-sm mt-2">
                    <ScrambleText duration={1.5} delay={0}>Friendly robot hippo mascot for the Hemi community</ScrambleText>
                  </p>
                </div>
              </motion.div>

              {/* Koala T-Shirt */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.2 }}
                whileHover={{ y: -8, transition: { duration: 0.2 } }}
                className="group relative overflow-hidden rounded-2xl border border-red-900/50 bg-black/40 backdrop-blur-sm"
              >
                <div className="aspect-square overflow-hidden">
                  <Image
                    src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Project%20%2820260116122358%29-AQgy5kDLqG2bJZOwniCdthBg7JEaBW.jpg"
                    alt="Hemi Koala T-Shirt Design"
                    width={400}
                    height={400}
                    className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="absolute bottom-0 left-0 right-0 p-6 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                  <h3 className="font-serif text-xl font-bold text-red-50">Hemigo T-Shirt</h3>
                  <p className="text-red-200/60 text-sm mt-2">
                    <ScrambleText duration={1.5} delay={0}>Community t-shirt design featuring the iconic Hemi koala mascot</ScrambleText>
                  </p>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Wallpaper Design Section */}
      <section className="relative py-24 px-6 z-20">
        <div className="max-w-6xl mx-auto">
          <motion.div 
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            variants={staggerContainer}
            className="space-y-16"
          >
            {/* Section Header */}
            <motion.div variants={fadeInUp} className="text-center">
              <span className="text-sm font-medium tracking-widest uppercase" style={{ color: "#8B0000" }}>
                Digital Art
              </span>
              <h2 className="font-serif text-4xl md:text-5xl font-bold mt-4 text-red-50">
                Wallpaper Design
              </h2>
            </motion.div>

            {/* Wallpaper Gallery */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="group relative overflow-hidden rounded-2xl border border-red-900/50 bg-black/40 backdrop-blur-sm"
            >
              <div className="aspect-video overflow-hidden">
                <Image
                  src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Project%20%2820260209013424%29-Fluecn9o5gEzQFrdjcyVsTGREdiLS1.jpg"
                  alt="Japanese landscape wallpaper with torii gate and mountains"
                  width={1200}
                  height={675}
                  className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-500"
                />
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <div className="absolute bottom-0 left-0 right-0 p-6 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                <h3 className="font-serif text-xl font-bold text-red-50">Japanese Torii Landscape</h3>
                <p className="text-red-200/60 text-sm mt-2">
                  <ScrambleText duration={1.5} delay={0}>Serene Japanese landscape featuring a torii gate, misty mountains, and cherry blossoms</ScrambleText>
                </p>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Footer with Socials */}
      <footer className="relative py-16 px-6 border-t border-red-900/30 z-20">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col items-center gap-8">
            <span 
              className="font-display text-2xl font-bold"
              style={{ color: "#8B0000", textShadow: "0 0 20px rgba(139, 0, 0, 0.5)" }}
            >
              BROKEN
            </span>
            
            {/* Connect Header */}
            <h3 className="font-serif text-xl font-bold text-red-50">CONNECT / REACH OUT</h3>
            
            {/* Social Links */}
            <div className="flex flex-wrap items-center justify-center gap-6">
              <Link 
                href="https://discord.com/users/broken_ninju" 
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center gap-2 text-red-200/60 transition-colors"
                style={{ ["--hover-color" as string]: "#8B0000" }}
                onMouseEnter={(e) => e.currentTarget.style.color = "#8B0000"}
                onMouseLeave={(e) => e.currentTarget.style.color = ""}
              >
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028 14.09 14.09 0 0 0 1.226-1.994.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z"/>
                </svg>
                <span className="text-sm"><ScrambleText duration={1} delay={0.2}>@broken_ninju</ScrambleText></span>
              </Link>
              
              <Link 
                href="https://twitter.com/BROKEN_NINJU" 
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center gap-2 text-red-200/60 transition-colors"
                onMouseEnter={(e) => e.currentTarget.style.color = "#8B0000"}
                onMouseLeave={(e) => e.currentTarget.style.color = ""}
              >
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                </svg>
                <span className="text-sm"><ScrambleText duration={1} delay={0.3}>@BROKEN_NINJU</ScrambleText></span>
              </Link>
              
              <Link 
                href="https://www.snapchat.com/add/iam_ninju" 
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center gap-2 text-red-200/60 transition-colors"
                onMouseEnter={(e) => e.currentTarget.style.color = "#8B0000"}
                onMouseLeave={(e) => e.currentTarget.style.color = ""}
              >
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12.206.793c.99 0 4.347.276 5.93 3.821.529 1.193.403 3.219.299 4.847l-.003.06c-.012.18-.022.345-.03.51.075.045.203.09.401.09.3-.016.659-.12 1.033-.301.165-.088.344-.104.464-.104.182 0 .359.029.509.09.45.149.734.479.734.838.015.449-.39.839-1.213 1.168-.089.029-.209.075-.344.119-.45.135-1.139.36-1.333.81-.09.224-.061.524.12.868l.015.015c.06.136 1.526 3.475 4.791 4.014.255.044.435.27.42.509 0 .075-.015.149-.045.225-.24.569-1.273.988-3.146 1.271-.059.091-.12.375-.164.57-.029.179-.074.36-.134.553-.076.271-.27.405-.555.405h-.03c-.135 0-.313-.031-.538-.074-.36-.075-.765-.135-1.273-.135-.3 0-.599.015-.913.074-.6.104-1.123.464-1.723.884-.853.599-1.826 1.288-3.294 1.288-.06 0-.119-.015-.18-.015h-.149c-1.468 0-2.427-.675-3.279-1.288-.599-.42-1.107-.779-1.707-.884-.314-.045-.629-.074-.928-.074-.54 0-.958.089-1.272.149-.211.043-.391.074-.54.074-.374 0-.523-.224-.583-.42-.061-.192-.09-.389-.135-.567-.046-.181-.105-.494-.166-.57-1.918-.222-2.95-.642-3.189-1.226-.031-.063-.052-.15-.055-.225-.015-.243.165-.465.42-.509 3.264-.54 4.73-3.879 4.791-4.02l.016-.029c.18-.345.224-.645.119-.869-.195-.434-.884-.658-1.332-.809-.121-.029-.24-.074-.346-.119-.809-.329-1.213-.72-1.213-1.17 0-.254.12-.479.315-.614.28-.195.585-.271.87-.271.196 0 .351.029.457.075.359.166.718.27 1.018.285.27 0 .449-.06.519-.09l-.015-.165c-.088-.645-.284-3.165.254-4.485C6.402 1.058 9.821.778 10.84.778z"/>
                </svg>
                <span className="text-sm"><ScrambleText duration={1} delay={0.4}>@iam_ninju</ScrambleText></span>
              </Link>
            </div>

            <p className="text-sm text-red-200/40">
              <ScrambleText duration={1.2} delay={0.5}>Himanshu — Portfolio</ScrambleText>
            </p>
          </div>
        </div>
      </footer>
    </main>
  )
}

function ChronicleCard({ 
  icon, 
  title, 
  description, 
  delay 
}: { 
  icon: React.ReactNode
  title: string
  description: string
  delay: number
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay }}
      whileHover={{ y: -4, transition: { duration: 0.2 } }}
      className="group p-8 bg-black/40 border border-red-900/50 rounded-2xl transition-colors backdrop-blur-sm"
      style={{ ["--hover-border" as string]: "#8B0000" }}
      onMouseEnter={(e) => e.currentTarget.style.borderColor = "rgba(139, 0, 0, 0.5)"}
      onMouseLeave={(e) => e.currentTarget.style.borderColor = ""}
    >
      <div 
        className="w-12 h-12 flex items-center justify-center rounded-xl bg-red-900/30 mb-6 group-hover:bg-red-900/40 transition-colors"
        style={{ color: "#8B0000" }}
      >
        {icon}
      </div>
      <h3 className="font-serif text-xl font-bold mb-3 text-red-50">
        {title}
      </h3>
      <p className="text-red-200/60 leading-relaxed">
        <ScrambleText duration={1.5} delay={delay + 0.2}>{description}</ScrambleText>
      </p>
    </motion.div>
  )
}
