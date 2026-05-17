import { BarChart3, CheckSquare, LayoutDashboard, X } from 'lucide-react'
import Button from '../common/Button'

const navItems = [
  { label: 'Dashboard', icon: LayoutDashboard },
  { label: 'Tasks', icon: CheckSquare },
  { label: 'Reports', icon: BarChart3 },
]

const Sidebar = ({ isOpen, onClose }) => {
  return (
    <>
      <div
        className={`fixed inset-0 z-30 bg-gray-950/30 transition lg:hidden ${isOpen ? 'opacity-100' : 'pointer-events-none opacity-0'}`}
        onClick={onClose}
      />
      <aside
        className={`fixed inset-y-0 left-0 z-40 flex w-72 flex-col border-r border-gray-200 bg-white transition-transform lg:static lg:translate-x-0 ${isOpen ? 'translate-x-0' : '-translate-x-full'}`}
      >
        <div className="flex h-16 items-center justify-between border-b border-gray-100 px-5">
          <div>
            <p className="text-lg font-semibold text-gray-950">GigFlow</p>
            <p className="text-xs font-medium text-gray-500">Task CRM</p>
          </div>
          <Button aria-label="Close sidebar" className="lg:hidden" icon={X} onClick={onClose} size="sm" variant="ghost" />
        </div>

        <nav className="flex-1 space-y-1 px-3 py-4">
          {navItems.map((item, index) => (
            <button
              className={`flex w-full items-center gap-3 rounded-md px-3 py-2.5 text-left text-sm font-medium transition ${index === 0 ? 'bg-brand-50 text-brand-700' : 'text-gray-600 hover:bg-gray-50 hover:text-gray-950'}`}
              key={item.label}
              type="button"
            >
              <item.icon className="h-4 w-4" />
              {item.label}
            </button>
          ))}
        </nav>

        <div className="border-t border-gray-100 p-4">
          <div className="rounded-lg bg-gray-50 p-4">
            <p className="text-sm font-semibold text-gray-950">Production ready</p>
            <p className="mt-1 text-xs leading-5 text-gray-500">Redux, routed dashboards, API services, and responsive layout are separated for growth.</p>
          </div>
        </div>
      </aside>
    </>
  )
}

export default Sidebar
