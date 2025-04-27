"use client"

export function Loading() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-rose-50 to-rose-100 py-12 px-4 flex items-center justify-center">
      <div className="text-center">
        <div className="w-16 h-16 border-4 border-rose-200 border-t-rose-600 rounded-full animate-spin mx-auto"></div>
      </div>
    </div>
  )
}

// Also export as default for backward compatibility
export default Loading
