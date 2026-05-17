import { motion } from 'framer-motion'
import { BriefcaseBusiness, CheckCircle2 } from 'lucide-react'

const AuthLayout = ({ children, subtitle, title }) => {
  return (
    <main
      className="relative flex min-h-screen overflow-hidden bg-gray-950 bg-cover bg-center px-4 py-8 sm:px-6 lg:px-10"
      style={{
        backgroundImage: 'url(https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&w=2200&q=85)',
      }}
    >
      <div className="absolute inset-0 bg-gradient-to-br from-gray-950/90 via-slate-900/70 to-brand-700/55" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(255,255,255,0.18),transparent_32%)]" />

      <section className="relative z-10 mx-auto grid w-full max-w-6xl items-center gap-10 lg:grid-cols-[1.05fr_0.95fr]">
        <motion.div
          animate={{ opacity: 1, y: 0 }}
          className="hidden text-white lg:block"
          initial={{ opacity: 0, y: 18 }}
          transition={{ duration: 0.55, ease: 'easeOut' }}
        >
          <div className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-3 py-1.5 text-sm font-medium text-white/90 shadow-lg backdrop-blur">
            <BriefcaseBusiness className="h-4 w-4" />
            Internship Task Management System
          </div>
          <h2 className="mt-7 max-w-xl text-4xl font-semibold leading-tight tracking-tight xl:text-5xl">
            Manage interns, assignments, submissions, and reviews from one focused workspace.
          </h2>
          <p className="mt-5 max-w-lg text-base leading-7 text-white/75">
            A professional portal for admins to assign work and for interns to track progress without losing context.
          </p>
          <div className="mt-8 grid max-w-xl grid-cols-2 gap-3">
            {['Role-based dashboards', 'Real-time notifications', 'Submission reviews', 'Clean task ownership'].map((item) => (
              <div className="flex items-center gap-2 rounded-lg border border-white/15 bg-white/10 p-4 text-sm font-medium text-white/90 shadow-lg backdrop-blur" key={item}>
                <CheckCircle2 className="h-4 w-4 text-emerald-300" />
                {item}
              </div>
            ))}
          </div>
        </motion.div>

        <div className="flex items-center justify-center">
          <motion.div
            animate={{ opacity: 1, scale: 1, y: 0 }}
            className="w-full max-w-md rounded-2xl border border-white/30 bg-white/85 p-6 shadow-2xl shadow-gray-950/30 backdrop-blur-xl sm:p-8"
            initial={{ opacity: 0, scale: 0.97, y: 24 }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
          >
            <div className="mb-7">
              <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-xl bg-brand-600 text-white shadow-lg shadow-brand-700/30">
                <BriefcaseBusiness className="h-6 w-6" />
              </div>
              <p className="text-sm font-semibold uppercase tracking-wider text-brand-700">Welcome back</p>
              <h1 className="mt-2 text-3xl font-semibold tracking-tight text-gray-950">{title}</h1>
              <p className="mt-3 text-sm leading-6 text-gray-600">{subtitle}</p>
            </div>
            {children}
          </motion.div>
          <div className="sr-only">
            <p>GigFlow</p>
          </div>
        </div>
      </section>
    </main>
  )
}

export default AuthLayout
