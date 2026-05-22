import {
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  isRouteErrorResponse,
  useFetcher,
  useFetchers,
  useNavigation,
} from "react-router"

import type { Route } from "./+types/root"
import "./app.css"
import { Toaster } from "sonner"
import { TooltipProvider } from "./components/ui/tooltip"
import TopBarProgress from "react-topbar-progress-indicator"
import HydrationFallback from "./components/HydrationFallback"

TopBarProgress.config({
  barColors: {
    0: "#ef4444",
    "0.5": "#f97316",
    1: "#fb923c",
  },
})

export function Layout({ children }: { children: React.ReactNode }) {
  const navigation = useNavigation();
  const fetchers = useFetchers();

  const isFetcherLoading = fetchers.some(
    (fetcher) => fetcher.state !=="idle"
  )

  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body>
        {(navigation.state !=="idle" || isFetcherLoading) && <TopBarProgress />}
        <TooltipProvider>
          {children}
        </TooltipProvider>
        <Toaster closeButton richColors position={"top-right"}/>
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  )
}
export  function HydrateFallback() {
  return <HydrationFallback/>
}
export default function App() {
  return <Outlet />
}


export function ErrorBoundary({ error }: Route.ErrorBoundaryProps) {
  let message = "Oops!"
  let details = "An unexpected error occurred."
  let stack: string | undefined

  if (isRouteErrorResponse(error)) {
    message = error.status === 404 ? "404" : "Error"
    details =
      error.status === 404
        ? "The requested page could not be found."
        : error.statusText || details
  } else if (import.meta.env.DEV && error && error instanceof Error) {
    details = error.message
    stack = error.stack
  }

  return (
    <main className="container mx-auto p-4 pt-16">
      <h1>{message}</h1>
      <p>{details}</p>
      {stack && (
        <pre className="w-full overflow-x-auto p-4">
          <code>{stack}</code>
        </pre>
      )}
    </main>
  )
}
