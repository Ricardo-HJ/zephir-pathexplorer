export async function getEmployees() {
    // In a real app, this would be an API call
    // For now, we'll read from the JSON file
    const res = await fetch("/data/employees.json", {
      // This ensures the data is fresh on each request in development
      cache: process.env.NODE_ENV === "development" ? "no-store" : "force-cache",
    })
  
    if (!res.ok) {
      throw new Error("Failed to fetch employees")
    }
  
    const data = await res.json()
    return data.employees
  }
  
  