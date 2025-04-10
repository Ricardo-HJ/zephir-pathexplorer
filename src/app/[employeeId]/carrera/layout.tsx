import type { ReactNode } from "react"

export default function CareerLayout({
  children,
}: {
  children: ReactNode
}) {
  // This layout explicitly doesn't include the sidebar
  return <div className="w-full min-h-screen">{children}</div>
}
