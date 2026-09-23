import { withErrorBoundary } from "react-error-boundary";
import { withSuspense } from "../../shared/lib/react/index.jsx";
import { BrowserRouter } from "./RouterProvider";
import { ToastProvider } from "./ToasterProvider.js";
import React from "react";
// import '../../i18n.js';

export default function App() {
  return (
    <React.StrictMode>
      <ToastProvider>
        <BrowserRouter />
      </ToastProvider>
    </React.StrictMode>
  );
}

export function ErrorFallback({ error, resetErrorBoundary }) {
  return (
    <div role="alert" style={{ padding: "20px", textAlign: "center" }}>
      <h2>Что-то пошло не так...</h2>
      <pre style={{ color: "red" }}>{error.message}</pre>
      <button onClick={resetErrorBoundary}>Попробуйте снова</button>
    </div>
  );
}

const SuspensedProvider = withSuspense(App, {
  fallback: (
    <div>
      <h2>Что-то пошло не так... :/</h2>
    </div>
  ),
});

export const Provider = withErrorBoundary(SuspensedProvider, {
  fallbackRender: ErrorFallback,
});
