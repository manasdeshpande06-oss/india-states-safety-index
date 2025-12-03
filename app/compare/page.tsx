"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ChevronDown } from "lucide-react"

interface ComparisonMetric {
  label: string
  icon: string
}

const states = [
  "Kerala",
  "Sikkim",
  "Himachal Pradesh",
  "Goa",
  "Uttarakhand",
  "Punjab",
  "Haryana",
  "Delhi",
  "Karnataka",
  "Tamil Nadu",
  "Telangana",
  "Andhra Pradesh",
  "Gujarat",
  "Rajasthan",
  "Madhya Pradesh",
]

const metrics: ComparisonMetric[] = [
  { label: "Crime Rate", icon: "📊" },
  { label: "Education", icon: "📚" },
  { label: "Healthcare", icon: "🏥" },
  { label: "Women Safety", icon: "👩" },
  { label: "Infrastructure", icon: "🏗️" },
]

function ComparisonMetricCard({
  metric,
  stateA,
  stateB,
  scoreA,
  scoreB,
}: {
  metric: ComparisonMetric
  stateA: string
  stateB: string
  scoreA: number
  scoreB: number
}) {
  const maxScore = Math.max(scoreA, scoreB)

  return (
    <motion.div
      layout
      className="p-4 rounded-lg border border-slate-200 bg-white hover:border-emerald-600/50 transition-colors"
    >
      <div className="flex items-center gap-2 mb-4">
        <span className="text-xl">{metric.icon}</span>
        <h4 className="font-semibold text-slate-900">{metric.label}</h4>
      </div>

      <div className="space-y-3">
        {/* State A */}
        <div>
          <div className="flex justify-between mb-2">
            <span className="text-sm font-medium text-slate-900">{stateA}</span>
            <span className="text-sm font-bold text-emerald-700">{scoreA}%</span>
          </div>
          <motion.div className="h-2 rounded-full bg-slate-100 overflow-hidden">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${scoreA}%` }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="h-full bg-emerald-600 rounded-full"
            />
          </motion.div>
        </div>

        {/* State B */}
        <div>
          <div className="flex justify-between mb-2">
            <span className="text-sm font-medium text-slate-900">{stateB}</span>
            <span className="text-sm font-bold text-blue-700">{scoreB}%</span>
          </div>
          <motion.div className="h-2 rounded-full bg-slate-100 overflow-hidden">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${scoreB}%` }}
              transition={{ duration: 0.8, ease: "easeOut", delay: 0.1 }}
              className="h-full bg-blue-600 rounded-full"
            />
          </motion.div>
        </div>
      </div>
    </motion.div>
  )
}

export default function ComparePanel() {
  const [stateA, setStateA] = useState("Kerala")
  const [stateB, setStateB] = useState("Bihar")
  const [isOpenA, setIsOpenA] = useState(false)
  const [isOpenB, setIsOpenB] = useState(false)

  // Simulated comparison scores
  const getScores = (state: string) => {
    const scoreMap: Record<string, number[]> = {
      Kerala: [85, 92, 88, 95, 82],
      Sikkim: [88, 89, 85, 92, 80],
      Bihar: [32, 28, 35, 25, 30],
      "Uttar Pradesh": [38, 35, 40, 30, 38],
      "Himachal Pradesh": [82, 88, 85, 90, 78],
    }
    return scoreMap[state] || [65, 70, 65, 75, 60]
  }

  const scoresA = getScores(stateA)
  const scoresB = getScores(stateB)

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-slate-50">
      <div className="mx-auto max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-16"
        >
          <h2 className="text-4xl font-bold text-slate-900 mb-4">Compare States</h2>
          <p className="text-lg text-slate-600">Analyze safety metrics side-by-side to make informed decisions</p>
        </motion.div>

        {/* State Selectors */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
          {/* State A Selector */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="relative"
          >
            <label className="block text-sm font-semibold text-slate-900 mb-2">State A</label>
            <motion.button
              onClick={() => setIsOpenA(!isOpenA)}
              className="w-full flex items-center justify-between p-4 rounded-lg border border-slate-200 bg-white hover:border-emerald-600/50 transition-colors"
            >
              <span className="font-medium text-slate-900">{stateA}</span>
              <motion.div animate={{ rotate: isOpenA ? 180 : 0 }}>
                <ChevronDown className="h-5 w-5" />
              </motion.div>
            </motion.button>

            <AnimatePresence>
              {isOpenA && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="absolute top-full left-0 right-0 mt-2 max-h-48 overflow-y-auto rounded-lg border border-slate-200 bg-white shadow-lg z-10"
                >
                  {states.map((state) => (
                    <motion.button
                      key={state}
                      whileHover={{ backgroundColor: "rgba(16, 185, 129, 0.1)" }}
                      onClick={() => {
                        setStateA(state)
                        setIsOpenA(false)
                      }}
                      className="w-full px-4 py-3 text-left text-slate-900 hover:text-emerald-700 transition-colors first:rounded-t-lg last:rounded-b-lg"
                    >
                      {state}
                    </motion.button>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>

          {/* State B Selector */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="relative"
          >
            <label className="block text-sm font-semibold text-slate-900 mb-2">State B</label>
            <motion.button
              onClick={() => setIsOpenB(!isOpenB)}
              className="w-full flex items-center justify-between p-4 rounded-lg border border-slate-200 bg-white hover:border-blue-600/50 transition-colors"
            >
              <span className="font-medium text-slate-900">{stateB}</span>
              <motion.div animate={{ rotate: isOpenB ? 180 : 0 }}>
                <ChevronDown className="h-5 w-5" />
              </motion.div>
            </motion.button>

            <AnimatePresence>
              {isOpenB && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="absolute top-full left-0 right-0 mt-2 max-h-48 overflow-y-auto rounded-lg border border-slate-200 bg-white shadow-lg z-10"
                >
                  {states.map((state) => (
                    <motion.button
                      key={state}
                      whileHover={{ backgroundColor: "rgba(30, 64, 175, 0.1)" }}
                      onClick={() => {
                        setStateB(state)
                        setIsOpenB(false)
                      }}
                      className="w-full px-4 py-3 text-left text-slate-900 hover:text-blue-700 transition-colors first:rounded-t-lg last:rounded-b-lg"
                    >
                      {state}
                    </motion.button>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </div>

        {/* Comparison Metrics */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"
        >
          {metrics.map((metric, idx) => (
            <ComparisonMetricCard
              key={metric.label}
              metric={metric}
              stateA={stateA}
              stateB={stateB}
              scoreA={scoresA[idx]}
              scoreB={scoresB[idx]}
            />
          ))}
        </motion.div>

        {/* Radar Chart Placeholder */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-12 p-8 rounded-xl border border-slate-200 bg-white"
        >
          <h3 className="text-2xl font-bold text-slate-900 mb-6">Multi-Metric Comparison</h3>
          <div
            data-chart="radar"
            className="flex items-center justify-center h-96 bg-gradient-to-br from-emerald-50 to-blue-50 rounded-lg"
          >
            <div className="text-center">
              <div className="inline-flex h-20 w-20 items-center justify-center rounded-full bg-emerald-100 mb-4">
                📊
              </div>
              <p className="text-slate-600 font-medium">Radar chart visualization will render here</p>
              <p className="text-sm text-slate-500 mt-1">
                Comparing {stateA} vs {stateB}
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
