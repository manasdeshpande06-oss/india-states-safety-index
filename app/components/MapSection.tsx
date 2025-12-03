"use client"

import { motion } from "framer-motion"
import { MapPin } from "lucide-react"

export default function MapSection() {
  const handleStateSelect = (stateCode: string) => {
    window.location.href = `/state/${stateCode.toLowerCase()}`
  }

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-slate-50 dark:bg-slate-900">
      <div className="mx-auto max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-12"
        >
          <div className="flex items-center gap-2 mb-4">
            <MapPin className="h-6 w-6 text-emerald-600 dark:text-emerald-400" />
            <h2 className="text-4xl font-bold text-slate-900 dark:text-white">Interactive Map</h2>
          </div>
          <p className="text-lg text-slate-600 dark:text-slate-300">
            Explore safety metrics across Indian states with our interactive map
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          whileHover={{ boxShadow: "0 20px 60px rgba(16, 185, 129, 0.15)" }}
          className="relative rounded-2xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 overflow-hidden p-8 transition-shadow duration-300"
        >
          {/* Map Placeholder */}
          <div className="h-96 lg:h-[500px] w-full rounded-lg bg-gradient-to-br from-emerald-100 dark:from-emerald-900/30 via-slate-100 dark:via-slate-900/30 to-amber-100 dark:to-amber-900/30 flex items-center justify-center relative overflow-hidden border border-slate-200 dark:border-slate-700">
            {/* Animated grid */}
            <motion.div
              animate={{ opacity: [0.1, 0.3, 0.1] }}
              transition={{ duration: 4, repeat: Number.POSITIVE_INFINITY }}
              className="absolute inset-0 opacity-30"
              style={{
                backgroundImage: `linear-gradient(rgba(16, 185, 129, 0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(16, 185, 129, 0.1) 1px, transparent 1px)`,
                backgroundSize: "50px 50px"
              }}
            />

            <div className="relative z-10 text-center">
              <motion.div
                animate={{ scale: [1, 1.1, 1] }}
                transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY }}
                className="inline-flex h-24 w-24 items-center justify-center rounded-full bg-emerald-100 dark:bg-emerald-900/40 mb-4"
              >
                <MapPin className="h-12 w-12 text-emerald-600 dark:text-emerald-400" />
              </motion.div>
              <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">India Safety Index Map</h3>
              <p className="text-slate-600 dark:text-slate-300 mb-6">Click on any state to view detailed safety analytics</p>

              {/* Sample clickable states */}
              <div className="flex flex-wrap gap-2 justify-center">
                {["Kerala", "Karnataka", "Delhi", "Maharashtra"].map((state) => (
                  <motion.button
                    key={state}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => handleStateSelect(state)}
                    className="px-4 py-2 rounded-lg bg-emerald-100 dark:bg-emerald-900/40 text-emerald-700 dark:text-emerald-300 text-sm font-medium hover:bg-emerald-200 dark:hover:bg-emerald-900/60 transition-colors border border-emerald-200 dark:border-emerald-800"
                  >
                    {state}
                  </motion.button>
                ))}
              </div>
            </div>
          </div>

          {/* Info Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8">
            {[
              { label: "States Tracked", value: "28" },
              { label: "Union Territories", value: "8" },
              { label: "Data Points", value: "1.2M" },
            ].map((stat, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="p-4 rounded-lg bg-slate-100 dark:bg-slate-700/50 border border-slate-200 dark:border-slate-600 text-center hover:border-emerald-300 dark:hover:border-emerald-700 transition-colors"
              >
                <p className="text-sm text-slate-600 dark:text-slate-400 mb-1">{stat.label}</p>
                <p className="text-2xl font-bold text-emerald-600 dark:text-emerald-400">{stat.value}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
