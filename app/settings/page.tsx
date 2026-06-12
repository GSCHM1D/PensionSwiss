import { Settings, User, Bell, Lock } from 'lucide-react'

export default function SettingsPage() {
  return (
    <div className="space-y-8 max-w-2xl">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 bg-slate-100 rounded-xl flex items-center justify-center">
          <Settings size={20} className="text-slate-600" />
        </div>
        <h1 className="text-2xl font-bold text-slate-900">Settings</h1>
      </div>

      {/* Profile */}
      <div className="card space-y-4">
        <div className="flex items-center gap-2 mb-2">
          <User size={16} className="text-slate-400" />
          <h2 className="font-semibold text-slate-800">Profile</h2>
        </div>
        <div className="grid grid-cols-2 gap-4">
          {[
            { label: 'First name',   value: 'Gabriel' },
            { label: 'Last name',    value: 'Schmid' },
            { label: 'Date of birth', value: '01.01.1982' },
            { label: 'AHV number',   value: '756.xxxx.xxxx.xx' },
            { label: 'Canton',       value: 'Zurich' },
            { label: 'Employment',   value: 'Employed' },
          ].map(({ label, value }) => (
            <div key={label}>
              <label className="block text-xs font-medium text-slate-500 mb-1">{label}</label>
              <input
                type="text"
                defaultValue={value}
                className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          ))}
        </div>
        <div className="pt-2">
          <button className="btn-primary text-sm">Save changes</button>
        </div>
      </div>

      {/* Notifications */}
      <div className="card space-y-3">
        <div className="flex items-center gap-2 mb-1">
          <Bell size={16} className="text-slate-400" />
          <h2 className="font-semibold text-slate-800">Notifications</h2>
        </div>
        {[
          { label: 'Annual statement reminders', sub: 'Remind me to check my pension statements' },
          { label: '3a contribution reminder', sub: 'Alert when annual 3a deadline approaches (Nov)' },
          { label: 'Market updates', sub: 'Monthly summary of BVG fund performance' },
          { label: 'Legislative changes', sub: 'Notify me of AHV / BVG law changes' },
        ].map(({ label, sub }) => (
          <label key={label} className="flex items-start justify-between gap-4 py-2 border-b border-slate-50 cursor-pointer">
            <div>
              <p className="text-sm font-medium text-slate-800">{label}</p>
              <p className="text-xs text-slate-400">{sub}</p>
            </div>
            <input type="checkbox" defaultChecked className="mt-1 accent-blue-600" />
          </label>
        ))}
      </div>

      {/* Security */}
      <div className="card space-y-3">
        <div className="flex items-center gap-2 mb-1">
          <Lock size={16} className="text-slate-400" />
          <h2 className="font-semibold text-slate-800">Security</h2>
        </div>
        <div className="flex items-center justify-between py-2 border-b border-slate-50">
          <div>
            <p className="text-sm font-medium text-slate-800">Two-factor authentication</p>
            <p className="text-xs text-slate-400">Protect your account with 2FA</p>
          </div>
          <span className="pill bg-green-50 text-green-600">Enabled</span>
        </div>
        <div className="flex items-center justify-between py-2">
          <div>
            <p className="text-sm font-medium text-slate-800">Password</p>
            <p className="text-xs text-slate-400">Last changed 3 months ago</p>
          </div>
          <button className="btn-secondary text-sm">Change</button>
        </div>
      </div>
    </div>
  )
}
