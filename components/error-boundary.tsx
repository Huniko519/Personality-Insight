"use client"

import { Component, type ErrorInfo, type ReactNode, memo } from "react"

interface Props {
  children: ReactNode
  fallback?: ReactNode
}

interface State {
  hasError: boolean
  error?: Error
}

// Memoized error display component
const ErrorDisplay = memo<{
  error?: Error
  onRetry: () => void
}>(({ error, onRetry }) => (
  <div className="p-4 bg-red-50 border border-red-200 rounded-md">
    <h2 className="text-lg font-semibold text-red-800 mb-2">Something went wrong</h2>
    <p className="text-red-600 mb-4">{error?.message || "Unknown error"}</p>
    <button
      onClick={onRetry}
      className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors"
    >
      Try again
    </button>
  </div>
))

ErrorDisplay.displayName = 'ErrorDisplay'

export class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props)
    this.state = { hasError: false }
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error }
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo): void {
    console.error("Error caught by ErrorBoundary:", error, errorInfo)
  }

  handleRetry = (): void => {
    this.setState({ hasError: false, error: undefined })
  }

  render(): ReactNode {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback
      }

      return (
        <ErrorDisplay 
          error={this.state.error} 
          onRetry={this.handleRetry}
        />
      )
    }

    return this.props.children
  }
}
