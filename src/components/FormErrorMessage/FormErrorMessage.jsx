import React from "react";

export default function FormErrorMessage({ message }) {
  return (
    <div className="rounded-xl border border-rose-200 bg-rose-50 px-4 py-2.5 text-sm font-semibold text-rose-700">
      {message}
    </div>
  );
}
