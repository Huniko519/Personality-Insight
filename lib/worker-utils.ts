// Utility for handling CPU-intensive tasks
export class TaskQueue {
  private queue: Array<() => Promise<any>> = []
  private isProcessing = false
  private maxConcurrent = 2

  async add<T>(task: () => Promise<T>): Promise<T> {
    return new Promise((resolve, reject) => {
      this.queue.push(async () => {
        try {
          const result = await task()
          resolve(result)
        } catch (error) {
          reject(error)
        }
      })
      
      this.processQueue()
    })
  }

  private async processQueue() {
    if (this.isProcessing || this.queue.length === 0) return
    
    this.isProcessing = true
    
    while (this.queue.length > 0) {
      const batch = this.queue.splice(0, this.maxConcurrent)
      await Promise.all(batch.map(task => task()))
      
      // Small delay to prevent blocking the main thread
      await new Promise(resolve => setTimeout(resolve, 10))
    }
    
    this.isProcessing = false
  }
}

// Web Worker wrapper for heavy computations
export function createWorker<T, R>(
  workerFunction: (data: T) => R
): (data: T) => Promise<R> {
  const workerCode = `
    self.onmessage = function(e) {
      const result = (${workerFunction.toString()})(e.data);
      self.postMessage(result);
    };
  `
  
  const blob = new Blob([workerCode], { type: 'application/javascript' })
  const workerUrl = URL.createObjectURL(blob)
  
  return (data: T): Promise<R> => {
    return new Promise((resolve, reject) => {
      const worker = new Worker(workerUrl)
      
      worker.onmessage = (e) => {
        resolve(e.data)
        worker.terminate()
        URL.revokeObjectURL(workerUrl)
      }
      
      worker.onerror = (error) => {
        reject(error)
        worker.terminate()
        URL.revokeObjectURL(workerUrl)
      }
      
      worker.postMessage(data)
    })
  }
}

// Debounced function utility
export function debounce<T extends (...args: any[]) => any>(
  func: T,
  wait: number
): (...args: Parameters<T>) => void {
  let timeout: NodeJS.Timeout
  
  return (...args: Parameters<T>) => {
    clearTimeout(timeout)
    timeout = setTimeout(() => func(...args), wait)
  }
}

// Throttled function utility
export function throttle<T extends (...args: any[]) => any>(
  func: T,
  limit: number
): (...args: Parameters<T>) => void {
  let inThrottle: boolean
  
  return (...args: Parameters<T>) => {
    if (!inThrottle) {
      func(...args)
      inThrottle = true
      setTimeout(() => inThrottle = false, limit)
    }
  }
}
