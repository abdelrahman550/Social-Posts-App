import React from 'react'

export default function MiniStatCard({ title, value }) {
  return (
    <div className="rounded-[22px] border border-blue-100 bg-[#f8fbff] px-5 py-4 shadow-sm">
      <div className="text-xs font-extrabold tracking-wide text-blue-800">
        {title}
      </div>
      <div className="mt-3 text-2xl font-extrabold text-slate-900">{value}</div>
    </div>
  )
}
