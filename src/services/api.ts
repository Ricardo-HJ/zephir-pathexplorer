// Add console logs to track API calls and token usage
export async function loginUser(email: string, password: string) {
  try {
    console.log(
      `api.ts: Attempting login for email: ${email} to URL: ${process.env.NEXT_PUBLIC_API_URL}/api/users/login`,
    )

    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/users/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        correo: email,
        contraseña: password, // The backend will handle the password comparison with bcrypt
      }),
      credentials: "include", // Include cookies in the request
    })

    console.log(`api.ts: Login response status: ${response.status}`)
    const data = await response.json()
    console.log("api.ts: Login response data:", data)
    console.log("api.ts: User data structure:", Object.keys(data.user || {}).join(", "))

    // Check if the response contains an error message
    if (!response.ok || data.error) {
      throw new Error(data.error || "Error logging in")
    }

    return data
  } catch (error) {
    console.error("api.ts: Login API error:", error)
    throw error
  }
}

export async function getUserProfile(userId: string, token: string) {
  console.log(`api.ts: Fetching user profile for ID: ${userId}`)
  console.log(`api.ts: Using token: ${token ? "Token exists" : "Token is missing"}`)

  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/users/${userId}/profile`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })

  console.log(`api.ts: getUserProfile response status: ${response.status}`)

  if (!response.ok) {
    const error = await response.json()
    console.error("api.ts: Error fetching user profile:", error)
    throw new Error(error.message || "Error fetching user profile")
  }

  const data = await response.json()
  console.log("api.ts: User profile data:", data)
  return data
}

// Add the missing getAllEmployees function
export async function getAllEmployees(token: string) {
  console.log(`api.ts: Fetching all employees`)
  console.log(`api.ts: Using token: ${token ? "Token exists" : "Token is missing"}`)

  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/users/employees`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })

    console.log(`api.ts: getAllEmployees response status: ${response.status}`)

    if (!response.ok) {
      const errorData = await response.json()
      console.error("api.ts: Error fetching employees:", errorData)
      throw new Error(errorData.error || "Failed to fetch employees")
    }

    const data = await response.json()
    console.log("api.ts: Employees data received:", data)
    return data
  } catch (error) {
    console.error("api.ts: Error in getAllEmployees:", error)
    throw error
  }
}

