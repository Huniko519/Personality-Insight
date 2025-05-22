import { Loader2 } from "lucide-react"

export default function Loading() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-rose-50 dark:bg-rose-950">
      <div className="text-center">
        <Loader2 className="h-12 w-12 animate-spin text-rose-600 dark:text-rose-400 mx-auto" />
        <h2 className="mt-4 text-xl font-semibold text-rose-800 dark:text-rose-200">Analyzing Your Results...</h2>
        <p className="mt-2 text-rose-600 dark:text-rose-400">Discovering your Enneagram type</p>
      </div>
    </div>
  )
}
