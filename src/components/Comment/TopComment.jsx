import { Avatar } from "@heroui/react";
import React from "react";

export default function TopComment({ topComment }) {
  return (
    <div className="p-4 pt-0 w-full">
      <div className="rounded-2xl border border-slate-200 bg-[#F8FAFC] p-3">
        <p className="mb-2 text-[11px] font-bold tracking-wide text-slate-500 uppercase">
          Top Comment
        </p>
        <div className="flex gap-2">
          <Avatar
            isBordered={false}
            radius="full"
            size="sm"
            src={topComment?.commentCreator?.photo}
          />

          <div className="flex w-full flex-col rounded-2xl bg-white px-3 py-2">
            <span className="truncate text-xs font-bold text-slate-900">
              {topComment?.commentCreator?.name}
            </span>
            <span className="mt-0.5 text-sm whitespace-pre-wrap text-slate-700 max-w-full line-clamp-3">
              {topComment?.content}
            </span>
          </div>
        </div>
        <p className="mt-2 text-xs font-bold text-[#1877f2] hover:underline">
          View all comments
        </p>
      </div>
    </div>
  );
}
