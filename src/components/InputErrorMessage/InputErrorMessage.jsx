import React from "react";

export default function InputErrorMessage({ message }) {
  return (
    <>
      <span className="mt-1 text-xs font-semibold text-rose-600">
        {message}
      </span>
    </>
  );
}
