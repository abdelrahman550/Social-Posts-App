import React from 'react'

export default function InvalidCommentInput() {
  return (
    <div className='text-xs font-semibold text-rose-700 bg-[#FFF1F2] px-3 py-2 rounded-lg border border-rose-200 mt-3'>
        Comment must be at least 2 characters.
    </div>
  )
}
