"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Plus, Zap, GitCompare, Share2 } from "lucide-react"

export default function FloatingActions() {
  const [isOpen, setIsOpen] = useState(false)

  const actions = [
    {
      icon: Zap,
      label: "Surprise Me",
      color: "bg-amber-500",
      action: () => {
        const states = document.querySelectorAll('[data-state-code]')
        if (states.length > 0) {
          const randomState = states[Math.floor(Math.random() * states.length)] as HTMLElement
          randomState.click()
        }
      },
    },
    {
      icon: GitCompare,
      label: "Compare",
      color: "bg-blue-500",
      action: () => {
        window.location.href = '/compare'
      },
    },
    {
      icon: Share2,
      label: "Share",
      color: "bg-emerald-600",
      action: () => {
        if (navigator.share) {
          navigator.share({
            title: 'India Safety Index',
            text: 'Check out the India Safety Index - Safety data for all Indian states',
            url: window.location.href,
          })
        } else {
          const url = window.location.href
          const text = `Check out the India Safety Index - ${url}`
          navigator.clipboard.writeText(text).then(() => {
            alert('Link copied to clipboard!')
          })
        }
      },
    },
  ]

  const containerVariants = {
    closed: { scale: 0.8, opacity: 0 },
    open: {
      scale: 1,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 260,
        damping: 20,
      },
    },
  }

  const itemVariants = {
    closed: { y: 0, opacity: 0 },
    open: (i: number) => ({
      y: -60 - i * 60,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 260,
        damping: 20,
        delay: i * 0.05,
      },
    }),
  }

  return (
    <div className="fixed bottom-8 right-8 z-40">
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 z-30"
            />

            {/* Action Items */}
            {actions.map((action, i) => (
              <motion.button
                key={action.label}
                custom={i}
                variants={itemVariants}
                initial="closed"
                animate="open"
                exit="closed"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => {
                  action.action()
                  setIsOpen(false)
                }}
                className={`absolute w-14 h-14 rounded-full flex items-center justify-center text-white shadow-lg hover:shadow-xl transition-all ${action.color} left-0 -translate-x-full`}
                aria-label={action.label}
                title={action.label}
              >
                <action.icon className="h-5 w-5" />
              </motion.button>
            ))}
          </>
        )}
      </AnimatePresence>

      {/* Main FAB */}
      <motion.button
        animate={isOpen ? { rotate: 45 } : { rotate: 0 }}
        transition={{ duration: 0.2 }}
        onClick={() => setIsOpen(!isOpen)}
        className="relative w-14 h-14 rounded-full bg-emerald-600 text-white shadow-lg hover:shadow-xl transition-all flex items-center justify-center hover:bg-emerald-700"
        aria-label="Open actions menu"
        aria-expanded={isOpen}
      >
        <Plus className="h-6 w-6" />
      </motion.button>
    </div>
  )
}
