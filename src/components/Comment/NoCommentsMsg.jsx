import { MessageCircle } from "lucide-react";
import React from "react";

export default function NoCommentsMsg() {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white px-4 py-8 text-center flex flex-col justify-center items-center">

      <div className="w-12 h-12 rounded-full bg-[#EEF3FF] text-[#1877F2] flex items-center justify-center mb-3"><MessageCircle size={22} /></div>
      <span className="text-lg font-extrabold text-slate-800">No comments yet</span>
      <span className="mt-1 text-sm font-medium text-slate-500">Be the first to comment.</span>

    </div>
  );
}
