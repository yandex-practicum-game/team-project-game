import React, { ErrorInfo, ReactNode } from 'react'
import { ErrorBoundaryInfo } from './ErrorBoundaryInfo'

interface State {
  error: Error | null
  errorInfo: ErrorInfo | null
}

interface Props {
  children: ReactNode
}

export class ErrorBoundary extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props)
    this.state = {
      error: null,
      errorInfo: null,
    }
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    this.setState({
      error: error,
      errorInfo: errorInfo,
    })
  }

  render() {
    return this.state.errorInfo ? (
      <ErrorBoundaryInfo
        error={this.state.error}
        errorInfo={this.state.errorInfo}
      />
    ) : (
      this.props.children
    )
  }
}
