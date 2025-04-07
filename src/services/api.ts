// Add console logs to track API calls and token usage
export async function loginUser(email: string, password: string) {
  try {

    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/users/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        correo: email,
        contraseña: password,
      }),
      credentials: "include",
    })

    const data = await response.json()

    if (!response.ok || data.error) {
      throw new Error(data.error || "Error logging in")
    }

    return data
  } catch (error) {
    throw error
  }
}

export async function getUserProfile(userId: string, token: string) {

  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/users/${userId}/profile`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })

  if (!response.ok) {
    const error = await response.json()
    console.error("api.ts: Error fetching user profile:", error)
    throw new Error(error.message || "Error fetching user profile")
  }

  const data = await response.json()
  return data
}

// Add the missing getAllEmployees function
export async function getAllEmployees(token: string) {

  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/users/employees`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })

    if (!response.ok) {
      const errorData = await response.json()
      console.error("api.ts: Error fetching employees:", errorData)
      throw new Error(errorData.error || "Failed to fetch employees")
    }

    const data = await response.json()
    return data
  } catch (error) {
    console.error("api.ts: Error in getAllEmployees:", error)
    throw error
  }
}

export async function getUserSkills(userId: string, token: string) {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/users/${userId}/skills`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })

    if (!response.ok) {
      throw new Error(`Failed to fetch skills: ${response.status}`)
    }

    return await response.json()
  } catch (error) {
    console.error("api.ts: Error fetching skills:", error)
    throw error
  }
}

export async function getUserCertifications(userId: string, token: string) {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/users/${userId}/certifications`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })

    if (!response.ok) {
      throw new Error(`Failed to fetch certifications: ${response.status}`)
    }

    return await response.json()
  } catch (error) {
    console.error("api.ts: Error fetching certifications:", error)
    throw error
  }
}

export async function getUserProjects(userId: string, token: string) {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/users/${userId}/projects`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })

    if (!response.ok) {
      throw new Error(`Failed to fetch projects: ${response.status}`)
    }

    return await response.json()
  } catch (error) {
    console.error("api.ts: Error fetching projects:", error)
    throw error
  }
}

