'use client'

import { useEffect, useRef } from 'react'

interface Packet {
  x: number
  y: number
  vx: number
  vy: number
  life: number
  maxLife: number
  length: number
}

const GRID_SPACING = 56

export default function HeroCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReducedMotion) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let width = 0
    let height = 0
    let dpr = 1
    let animationFrameId: number | null = null
    let isLoopRunning = false
    let lastSpawn = 0
    const packets: Packet[] = []

    const resize = () => {
      const parent = canvas.parentElement
      if (!parent) return
      dpr = window.devicePixelRatio || 1
      width = parent.clientWidth
      height = parent.clientHeight
      canvas.width = Math.floor(width * dpr)
      canvas.height = Math.floor(height * dpr)
      canvas.style.width = `${width}px`
      canvas.style.height = `${height}px`
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
    }

    const spawnPacket = (x: number, y: number, vx: number, vy: number) => {
      packets.push({
        x,
        y,
        vx,
        vy,
        life: 0,
        maxLife: 28 + Math.random() * 22,
        length: 14 + Math.random() * 18,
      })
    }

    const spawnBurst = (cx: number, cy: number, count = 8) => {
      const startX = Math.round(cx / GRID_SPACING) * GRID_SPACING
      const startY = Math.round(cy / GRID_SPACING) * GRID_SPACING
      const dirs = [
        [1, 0],
        [-1, 0],
        [0, 1],
        [0, -1],
      ]
      for (let i = 0; i < count; i++) {
        const dir = dirs[i % dirs.length]
        const speed = 2.2 + Math.random() * 2.4
        spawnPacket(startX, startY, dir[0] * speed, dir[1] * speed)
      }
      startLoop()
    }

    const render = () => {
      ctx.clearRect(0, 0, width, height)
      if (packets.length === 0) return

      for (const p of packets) {
        const progress = p.life / p.maxLife
        const alpha = Math.sin(progress * Math.PI)
        ctx.strokeStyle = `rgba(38, 76, 190, ${alpha * 0.85})`
        ctx.lineWidth = 1.75
        ctx.lineCap = 'round'

        ctx.beginPath()
        const tailX = p.x - (p.vx > 0 ? p.length : p.vx < 0 ? -p.length : 0)
        const tailY = p.y - (p.vy > 0 ? p.length : p.vy < 0 ? -p.length : 0)
        ctx.moveTo(tailX, tailY)
        ctx.lineTo(p.x, p.y)
        ctx.stroke()

        ctx.fillStyle = `rgba(45, 95, 235, ${alpha * 0.95})`
        ctx.beginPath()
        ctx.arc(p.x, p.y, 2, 0, Math.PI * 2)
        ctx.fill()
      }
    }

    const loop = () => {
      render()

      for (let i = packets.length - 1; i >= 0; i--) {
        const p = packets[i]
        p.x += p.vx
        p.y += p.vy
        p.life++
        if (p.life >= p.maxLife || p.x < 0 || p.x > width || p.y < 0 || p.y > height) {
          packets.splice(i, 1)
        }
      }

      if (packets.length > 0) {
        animationFrameId = requestAnimationFrame(loop)
      } else {
        isLoopRunning = false
        animationFrameId = null
        ctx.clearRect(0, 0, width, height)
      }
    }

    const startLoop = () => {
      if (!isLoopRunning) {
        isLoopRunning = true
        loop()
      }
    }

    const handleMouseMove = (e: MouseEvent) => {
      const parent = canvas.parentElement
      if (!parent) return
      const rect = parent.getBoundingClientRect()
      const mouseX = e.clientX - rect.left
      const mouseY = e.clientY - rect.top

      if (mouseX >= 0 && mouseX <= width && mouseY >= 0 && mouseY <= height) {
        const now = performance.now()
        if (now - lastSpawn > 75) {
          lastSpawn = now
          const nearestX = Math.round(mouseX / GRID_SPACING) * GRID_SPACING
          const nearestY = Math.round(mouseY / GRID_SPACING) * GRID_SPACING
          const dir = Math.random() > 0.5 ? [1, 0] : [0, 1]
          const sign = Math.random() > 0.5 ? 1 : -1
          spawnPacket(nearestX, nearestY, dir[0] * sign * 3.2, dir[1] * sign * 3.2)
        }
        startLoop()
      }
    }

    const parent = canvas.parentElement
    resize()
    window.addEventListener('resize', resize)
    if (parent) {
      parent.addEventListener('mousemove', handleMouseMove, { passive: true })
    }

    const timer = setTimeout(() => {
      spawnBurst(width / 2, height / 2, 6)
    }, 150)

    return () => {
      clearTimeout(timer)
      window.removeEventListener('resize', resize)
      if (parent) {
        parent.removeEventListener('mousemove', handleMouseMove)
      }
      if (animationFrameId !== null) {
        cancelAnimationFrame(animationFrameId)
      }
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      style={{
        position: 'absolute',
        inset: 0,
        pointerEvents: 'none',
        zIndex: 0,
      }}
    />
  )
}
