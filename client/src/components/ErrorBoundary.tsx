import { Component } from 'react';
import type { ErrorInfo, ReactNode } from 'react';

interface Props {
    children?: ReactNode;
}

interface State {
    hasError: boolean;
    error?: Error;
}

class ErrorBoundary extends Component<Props, State> {
    public state: State = {
        hasError: false
    };

    public static getDerivedStateFromError(error: Error): State {
        return { hasError: true, error };
    }

    public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
        console.error("Uncaught error:", error, errorInfo);
    }

    public render() {
        if (this.state.hasError) {
            return (
                <div style={{ padding: "2rem", textAlign: "center" }}>
                    <h1>Something went wrong.</h1>
                    <p style={{ color: "red" }}>{this.state.error?.toString()}</p>
                    <button
                        onClick={() => window.location.reload()}
                        style={{
                            marginTop: "1rem",
                            padding: "8px 16px",
                            backgroundColor: "#f43397",
                            color: "white",
                            border: "none",
                            borderRadius: "4px"
                        }}
                    >
                        Reload Page
                    </button>
                </div>
            );
        }

        return this.props.children;
    }
}

export default ErrorBoundary;
