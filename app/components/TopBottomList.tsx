"use client"

import { motion } from "framer-motion"
import { TrendingUp, TrendingDown, Trophy, AlertCircle } from "lucide-react"

interface StateItem {
  rank: number
  name: string
  score: number
  trend: "up" | "down"
  change: number
}

const topStates: StateItem[] = [
  { rank: 1, name: "Kerala", score: 92, trend: "up", change: 5 },
  { rank: 2, name: "Sikkim", score: 88, trend: "up", change: 3 },
  { rank: 3, name: "Himachal Pradesh", score: 85, trend: "up", change: 2 },
  { rank: 4, name: "Goa", score: 83, trend: "up", change: 1 },
  { rank: 5, name: "Uttarakhand", score: 81, trend: "down", change: -1 },
]

const bottomStates: StateItem[] = [
  { rank: 1, name: "Bihar", score: 32, trend: "down", change: -4 },
  { rank: 2, name: "Uttar Pradesh", score: 38, trend: "down", change: -2 },
  { rank: 3, name: "Madhya Pradesh", score: 42, trend: "up", change: 1 },
  { rank: 4, name: "Assam", score: 45, trend: "down", change: -3 },
  { rank: 5, name: "West Bengal", score: 48, trend: "up", change: 2 },
]

function StateListItem({ item, isTop = true }: { item: StateItem; isTop?: boolean }) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ delay: (item.rank - 1) * 0.1 }}
      whileHover={{ x: 8 }}
      className="flex items-center justify-between p-4 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 hover:border-emerald-300 dark:hover:border-emerald-700 transition-colors group"
    >
      <div className="flex items-center gap-4 flex-1">
        <motion.div
          whileHover={{ scale: 1.2 }}
          className={`inline-flex h-10 w-10 items-center justify-center rounded-lg font-bold text-sm ${
            item.rank === 1
              ? "bg-amber-500 text-white"
              : item.rank === 2
                ? "bg-slate-400 dark:bg-slate-500 text-white"
                : "bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-200"
          }`}
        >
          {item.rank === 1 ? <Trophy className="h-5 w-5" /> : item.rank}
        </motion.div>

        <div>
          <p className="font-semibold text-slate-900 dark:text-white">{item.name}</p>
          <p className="text-xs text-slate-600 dark:text-slate-400">Safety Score</p>
        </div>
      </div>

      <div className="flex items-center gap-3">
        <div className="text-right">
          <p className="text-lg font-bold text-slate-900 dark:text-white">{item.score}%</p>
          <div className="flex items-center gap-1">
            {item.trend === "up" ? (
              <TrendingUp className="h-3 w-3 text-emerald-600 dark:text-emerald-400" />
            ) : (
              <TrendingDown className="h-3 w-3 text-red-600 dark:text-red-400" />
            )}
            <span className={`text-xs font-medium ${item.trend === "up" ? "text-emerald-600 dark:text-emerald-400" : "text-red-600 dark:text-red-400"}`}>
              {item.trend === "up" ? "+" : ""}
              {item.change}%
            </span>
          </div>
        </div>

        <motion.div
          whileHover={{ scale: 1.1 }}
          className="h-12 w-12 rounded-lg bg-slate-100 dark:bg-slate-700 flex items-center justify-center"
        >
          <div className={`h-8 w-8 rounded ${isTop ? "bg-emerald-100 dark:bg-emerald-900/40" : "bg-red-100 dark:bg-red-900/40"}`} />
        </motion.div>
      </div>
    </motion.div>
  )
}

export default function TopBottomList() {
  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white dark:bg-slate-900">
      <div className="mx-auto max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-16"
        >
          <h2 className="text-4xl font-bold text-slate-900 dark:text-white mb-4">State Rankings</h2>
          <p className="text-lg text-slate-600 dark:text-slate-300">Discover the safest and most challenging states in India</p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Top States */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="flex items-center gap-2 mb-6">
              <Trophy className="h-6 w-6 text-amber-500" />
              <h3 className="text-2xl font-bold text-slate-900 dark:text-white">Safest States</h3>
            </div>
            <div className="space-y-3">
              {topStates.map((state) => (
                <StateListItem key={state.name} item={state} isTop={true} />
              ))}
            </div>
          </motion.div>

          {/* Bottom States */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="flex items-center gap-2 mb-6">
              <AlertCircle className="h-6 w-6 text-red-600 dark:text-red-400" />
              <h3 className="text-2xl font-bold text-slate-900 dark:text-white">Areas of Concern</h3>
            </div>
            <div className="space-y-3">
              {bottomStates.map((state) => (
                <StateListItem key={state.name} item={state} isTop={false} />
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
