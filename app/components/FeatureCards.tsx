"use client"

import { motion } from "framer-motion"
import { Map, BarChart3, GitCompare } from "lucide-react"

const features = [
  {
    icon: Map,
    title: "Interactive Map",
    description: "Visualize safety data across all Indian states with an intuitive, clickable map interface.",
  },
  {
    icon: BarChart3,
    title: "Top & Bottom States",
    description: "Quickly identify the safest and most challenging states with ranked analytics.",
  },
  {
    icon: GitCompare,
    title: "State Comparison",
    description: "Compare multiple states side-by-side across crime, education, healthcare metrics.",
  },
]

export default function FeatureCards() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 },
    },
  }

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-slate-50">
      <div className="mx-auto max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold text-slate-900 mb-4">Powerful Features</h2>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            Everything you need to understand safety patterns across Indian states
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6"
        >
          {features.map((feature, idx) => (
            <motion.div
              key={idx}
              variants={itemVariants}
              whileHover={{ y: -8, transition: { duration: 0.2 } }}
              className="group relative p-6 rounded-xl border border-slate-200 bg-white hover:border-emerald-600/50 transition-colors"
            >
              {/* Hover Glow Effect */}
              <div className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-gradient-to-br from-emerald-50 to-blue-50 blur-xl" />

              <div className="relative z-10">
                <motion.div
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  className="mb-4 inline-flex p-3 rounded-lg bg-emerald-100 text-emerald-700"
                >
                  <feature.icon className="h-6 w-6" />
                </motion.div>

                <h3 className="text-xl font-semibold text-slate-900 mb-2">{feature.title}</h3>
                <p className="text-slate-600 text-sm leading-relaxed">{feature.description}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
