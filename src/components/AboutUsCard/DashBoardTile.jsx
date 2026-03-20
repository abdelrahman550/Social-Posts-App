import React from "react";

export default function DashBoardTile({ text, value }) {
  return (
    <>
      <div className="rounded-xl border border-[#c9d5ff] bg-[#f2f6ff] px-3 py-2">
        <p className="text-base font-extrabold text-[#00298d]">{value}</p>
        <p className="text-[11px] font-bold tracking-wide text-slate-600 uppercase">
          {text}
        </p>
      </div>
    </>
  );
}
