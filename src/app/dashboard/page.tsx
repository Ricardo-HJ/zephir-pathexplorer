export default function Dashboard() {
  return (
    <div className="flex flex-col gap-4">
      <h1 className="text-2xl font-bold">Dashboard</h1>
      <p className="text-muted-foreground">Welcome to your dashboard.</p>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className="rounded-lg border bg-card p-4 shadow-sm">
            <h3 className="text-lg font-medium">Card {i + 1}</h3>
            <p className="text-sm text-muted-foreground">This is a sample card.</p>
          </div>
        ))}
      </div>
    </div>
  )
}

