import React from "react";
import ErrorPage from "./ErrorPage";

class ErrorBoundary extends React.Component {
    constructor(props) {
        super(props);
        this.state = { hasError: false };
    }

    static getDerivedStateFromError(error) {
        return { hasError: true, error };
    }

    render() {
        const { hasError } = this.state;
        if (hasError) {
            return <ErrorPage />;
        }

        const { children } = this.props;
        return children;
    }
}

export default ErrorBoundary;