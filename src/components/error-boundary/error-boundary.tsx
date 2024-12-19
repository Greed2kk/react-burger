import { Component, ErrorInfo, ReactNode, Suspense } from 'react'

interface Props {
  children: ReactNode
}

interface State {
  hasError: boolean
}

export class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props)
    this.state = { hasError: false }
  }

  static getDerivedStateFromError(error: Error): State {
    console.error(error)

    return { hasError: true }
  }

  componentDidCatch(error: Error, info: ErrorInfo): void {
    console.error(error, info.componentStack)
  }

  render(): ReactNode {
    const { hasError } = this.state
    const { children } = this.props

    if (hasError) {
      return (
        <Suspense fallback="">
          <h1>Обновите страницу</h1>
        </Suspense>
      )
    }

    return children
  }
}

export default ErrorBoundary
