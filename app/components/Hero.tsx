"use client";

import { motion } from "framer-motion";
import { ArrowRight, Shield, Zap } from "lucide-react";
import SearchStates from "./SearchStates";

export default function Hero() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: "easeOut" },
    },
  };

  const handleStateSelect = (state: string) => {
    console.log("State selected from search:", state);
  };

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center overflow-hidden pt-16"
      style={{
        backgroundImage: `url('/indian-safety-security-dashboard-emerald-blue-saff.jpg')`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundAttachment: "scroll", // FIXED: mobile-friendly
      }}
    >
      {/* Background Overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/60 to-black/70" />

      {/* Content */}
      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 w-full">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center"
        >
          {/* Left Column */}
          <div className="flex flex-col gap-6">
            <motion.div variants={itemVariants}>
              <div className="inline-flex items-center gap-2 rounded-full bg-emerald-500/20 px-4 py-2 w-fit">
                <Zap className="h-4 w-4 text-emerald-400" />
                <span className="text-sm font-medium text-emerald-300">
                  Real-time Safety Analytics
                </span>
              </div>
            </motion.div>

            <motion.h1
              variants={itemVariants}
              className="text-5xl sm:text-6xl font-bold tracking-tight text-white"
            >
              Indian States{" "}
              <span className="bg-gradient-to-r from-emerald-400 via-blue-400 to-yellow-300 bg-clip-text text-transparent">
                Safety Index
              </span>
            </motion.h1>

            <motion.p
              variants={itemVariants}
              className="text-xl text-gray-200 max-w-lg leading-relaxed"
            >
              Explore comprehensive safety levels across all Indian states
              with real-time insights, interactive comparisons, and
              data-driven analysis.
            </motion.p>

            {/* State Search */}
            <motion.div variants={itemVariants} className="pt-2">
              <label className="block text-sm font-semibold text-gray-200 mb-3">
                Find a State
              </label>
              <SearchStates onStateSelect={handleStateSelect} />
            </motion.div>

            {/* CTA Buttons */}
            <motion.div
              variants={itemVariants}
              className="flex flex-col sm:flex-row gap-4 pt-4"
            >
              <motion.a
                href="/compare"
                whileHover={{
                  scale: 1.05,
                  boxShadow: "0 20px 40px rgba(16, 185, 129, 0.3)",
                }}
                whileTap={{ scale: 0.95 }}
                className="inline-flex items-center justify-center gap-2 rounded-lg bg-emerald-500 text-white px-6 py-3 font-semibold transition-all"
              >
                Compare States
                <ArrowRight className="h-4 w-4" />
              </motion.a>

              <motion.a
                href="/map"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="inline-flex items-center justify-center gap-2 rounded-lg border border-emerald-400/50 text-emerald-300 px-6 py-3 font-semibold hover:bg-emerald-400/10 transition-all"
              >
                <Shield className="h-4 w-4" />
                Explore Map
              </motion.a>
            </motion.div>
          </div>

          {/* Right Column - Analytics Box */}
          <motion.div
            variants={itemVariants}
            className="relative h-96 lg:h-[500px] flex items-center justify-center"
          >
            <motion.div
              animate={{ y: [0, -20, 0] }}
              transition={{
                duration: 4,
                repeat: Number.POSITIVE_INFINITY,
                ease: "easeInOut",
              }}
              className="relative w-full h-full"
            >
              {/* Background Image */}
              <div
                className="absolute inset-0 rounded-2xl overflow-hidden shadow-2xl"
                style={{
                  backgroundImage: `url('/india-safety-analytics-dashboard-secure-protection.jpg')`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                }}
              />

              {/* Dark overlay */}
              <div className="absolute inset-0 bg-black/40 rounded-2xl" />

              {/* Icon on top */}
              <div className="absolute inset-0 flex items-center justify-center rounded-2xl">
                <motion.div
                  animate={{ scale: [1, 1.05, 1] }}
                  transition={{
                    duration: 4,
                    repeat: Number.POSITIVE_INFINITY,
                    ease: "easeInOut",
                  }}
                  className="relative z-10 text-center"
                >
                  <motion.div
                    animate={{ rotate: [0, 5, -5, 0] }}
                    transition={{
                      duration: 3,
                      repeat: Number.POSITIVE_INFINITY,
                    }}
                  >
                    <Shield className="h-24 w-24 text-white/95 mx-auto mb-4 drop-shadow-lg" />
                  </motion.div>

                  <p className="text-xl font-bold text-white drop-shadow-lg">
                    Safety Analytics
                  </p>
                  <p className="text-sm text-white/80 mt-2 drop-shadow">
                    Real-time State Security Data
                  </p>
                </motion.div>
              </div>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>

      {/* Background Animated Blobs */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.1, 0.15, 0.1],
          }}
          transition={{ duration: 8, repeat: Number.POSITIVE_INFINITY }}
          className="absolute -top-40 -right-40 h-80 w-80 rounded-full bg-emerald-500 blur-3xl"
        />
        <motion.div
          animate={{
            scale: [1, 1.1, 1],
            opacity: [0.1, 0.12, 0.1],
          }}
          transition={{ duration: 10, repeat: Number.POSITIVE_INFINITY }}
          className="absolute -bottom-40 -left-40 h-80 w-80 rounded-full bg-blue-500 blur-3xl"
        />
      </div>
    </section>
  );
}
