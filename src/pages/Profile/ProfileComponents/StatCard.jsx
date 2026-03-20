import React from 'react'

export default function StatCard({ label, value }) {
  return (
    <div className="rounded-[22px] border border-slate-200 bg-white px-3 py-5 text-center shadow-sm">
      <div className="text-sm font-bold tracking-wide text-slate-500">
        {label}
      </div>
      <div className="mt-2 text-3xl font-extrabold text-slate-900">{value}</div>
    </div>
  );
}