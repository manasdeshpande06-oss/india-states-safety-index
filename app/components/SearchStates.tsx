"use client"

import { useState, useMemo } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Search, X } from "lucide-react"

const allStates = [
  "Andaman and Nicobar Islands",
  "Andhra Pradesh",
  "Arunachal Pradesh",
  "Assam",
  "Bihar",
  "Chandigarh",
  "Chhattisgarh",
  "Dadra and Nagar Haveli",
  "Daman and Diu",
  "Delhi",
  "Goa",
  "Gujarat",
  "Haryana",
  "Himachal Pradesh",
  "Jharkhand",
  "Karnataka",
  "Kerala",
  "Lakshadweep",
  "Madhya Pradesh",
  "Maharashtra",
  "Manipur",
  "Meghalaya",
  "Mizoram",
  "Nagaland",
  "Odisha",
  "Puducherry",
  "Punjab",
  "Rajasthan",
  "Sikkim",
  "Tamil Nadu",
  "Telangana",
  "Tripura",
  "Uttar Pradesh",
  "Uttarakhand",
  "West Bengal",
]

interface SearchStatesProps {
  onStateSelect?: (state: string) => void
}

export default function SearchStates({ onStateSelect }: SearchStatesProps) {
  const [searchQuery, setSearchQuery] = useState("")
  const [isOpen, setIsOpen] = useState(false)

  const filteredStates = useMemo(() => {
    return allStates.filter((state) => state.toLowerCase().includes(searchQuery.toLowerCase()))
  }, [searchQuery])

  const handleSelectState = (state: string) => {
    setSearchQuery("")
    setIsOpen(false)
    if (onStateSelect) {
      onStateSelect(state)
    } else {
      // Default navigation to state page — navigate using full lowercased name slug
      const slug = encodeURIComponent(state.toLowerCase())
      window.location.href = `/state/${slug}`
    }
  }

  return (
    <div className="relative w-full">
      {/* Search Input */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="relative"
      >
        <div className="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none">
          <Search className="h-5 w-5 text-slate-400 dark:text-slate-500" />
        </div>

        <input
          type="text"
          placeholder="Search any state..."
          value={searchQuery}
          onChange={(e) => {
            setSearchQuery(e.target.value)
            setIsOpen(true)
          }}
          onFocus={() => setIsOpen(true)}
          className="w-full pl-12 pr-4 py-3 rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-800 text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:border-emerald-500 dark:focus:border-emerald-400 focus:ring-2 focus:ring-emerald-500/20 dark:focus:ring-emerald-400/20 transition-all"
        />

        {searchQuery && (
          <motion.button
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            onClick={() => setSearchQuery("")}
            className="absolute right-4 top-1/2 -translate-y-1/2 p-1 hover:bg-slate-100 dark:hover:bg-slate-700 rounded transition-colors"
          >
            <X className="h-4 w-4 text-slate-600 dark:text-slate-400" />
          </motion.button>
        )}
      </motion.div>

      {/* Dropdown Results */}
      <AnimatePresence>
        {isOpen && filteredStates.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="absolute top-full left-0 right-0 mt-2 max-h-64 overflow-y-auto rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-800 shadow-lg z-20"
          >
            {filteredStates.map((state, idx) => (
              <motion.button
                key={state}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: idx * 0.02 }}
                whileHover={{ backgroundColor: "rgba(16, 185, 129, 0.1)" }}
                onClick={() => handleSelectState(state)}
                className="w-full px-4 py-3 text-left text-slate-900 dark:text-white hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors first:rounded-t-lg last:rounded-b-lg border-b border-slate-200 dark:border-slate-700 last:border-b-0 hover:bg-emerald-50 dark:hover:bg-slate-700/50"
              >
                <motion.div initial={{ opacity: 0.7 }} whileHover={{ opacity: 1 }} className="flex items-center gap-3">
                  <div className="h-2 w-2 rounded-full bg-emerald-600 dark:bg-emerald-400" />
                  <span className="font-medium">{state}</span>
                </motion.div>
              </motion.button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      {/* No Results */}
      <AnimatePresence>
        {isOpen && searchQuery && filteredStates.length === 0 && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="absolute top-full left-0 right-0 mt-2 p-4 rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-800 shadow-lg z-20 text-center"
          >
            <p className="text-slate-600 dark:text-slate-400 text-sm">No states found matching "{searchQuery}"</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
