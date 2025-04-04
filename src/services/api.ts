/**
 * src/services/api.ts
 *
 * Purpose: Centralizes all API calls to the backend in one place.
 * This improves maintainability by:
 * 1. Avoiding duplicate fetch logic across components
 * 2. Making it easier to handle authentication consistently
 * 3. Providing a single place to update API endpoints
 *
 * How it's used:
 * - Imported by components and server actions that need to communicate with the backend
 * - Provides typed methods for each API endpoint
 * - Handles common error patterns and authentication
 */

import type { UserInput, Skill, Certificado, Curso } from "@/types/user"

const API_URL = process.env.NEXT_PUBLIC_API_URL

// User authentication
export async function loginUser(email: string, password: string) {
  try {
    console.log(`Attempting login for email: ${email} to URL: ${API_URL}/api/users/login`)

    const response = await fetch(`${API_URL}/api/users/login`, {
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

    console.log(`Login response status: ${response.status}`)
    const data = await response.json()
    console.log("Login response data:", data)

    // Check if the response contains an error message
    if (!response.ok || data.error) {
      throw new Error(data.error || "Error logging in")
    }

    return data
  } catch (error) {
    console.error("Login API error:", error)
    throw error
  }
}


// User profile
export async function getUserProfile(userId: string, token: string) {
  const response = await fetch(`${API_URL}/api/users/${userId}/profile`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })

  if (!response.ok) {
    const error = await response.json()
    throw new Error(error.message || "Error fetching user profile")
  }

  return response.json()
}

export async function updateUserProfile(userId: string, userData: Partial<UserInput>, token: string) {
  const response = await fetch(`${API_URL}/api/users/${userId}/profile`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(userData),
  })

  if (!response.ok) {
    const error = await response.json()
    throw new Error(error.message || "Error updating user profile")
  }

  return response.json()
}

export async function deleteUserAccount(userId: string, token: string) {
  const response = await fetch(`${API_URL}/api/users/${userId}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })

  if (!response.ok) {
    const error = await response.json()
    throw new Error(error.message || "Error deleting user account")
  }

  return response.json()
}

// For lead users - get all employees
export async function getAllEmployees(token: string) {
  const response = await fetch(`${API_URL}/api/users`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })

  if (!response.ok) {
    const error = await response.json()
    throw new Error(error.message || "Error fetching employees")
  }

  return response.json()
}

// Skills
export async function getUserSkills(userId: string, token: string) {
  const response = await fetch(`${API_URL}/api/users/${userId}/skills`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })

  if (!response.ok) {
    const error = await response.json()
    throw new Error(error.message || "Error fetching user skills")
  }

  return response.json()
}

// Certifications
export async function getUserCertifications(userId: string, token: string) {
  const response = await fetch(`${API_URL}/api/users/${userId}/certifications`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })

  if (!response.ok) {
    const error = await response.json()
    throw new Error(error.message || "Error fetching user certifications")
  }

  return response.json()
}

// Projects
export async function getUserProjects(userId: string, token: string) {
  const response = await fetch(`${API_URL}/api/users/${userId}/projects`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })

  if (!response.ok) {
    const error = await response.json()
    throw new Error(error.message || "Error fetching user projects")
  }

  return response.json()
}

// Courses
export async function getUserCourses(userId: string, token: string) {
  const response = await fetch(`${API_URL}/api/users/${userId}/courses`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })

  if (!response.ok) {
    const error = await response.json()
    throw new Error(error.message || "Error fetching user courses")
  }

  return response.json()
}

// Add a new skill
export async function addUserSkill(userId: string, skillData: Partial<Skill>, token: string) {
  const response = await fetch(`${API_URL}/api/users/${userId}/skills`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(skillData),
  })

  if (!response.ok) {
    const error = await response.json()
    throw new Error(error.message || "Error adding user skill")
  }

  return response.json()
}

// Add a new certification
export async function addUserCertification(userId: string, certData: Partial<Certificado>, token: string) {
  const response = await fetch(`${API_URL}/api/users/${userId}/certifications`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(certData),
  })

  if (!response.ok) {
    const error = await response.json()
    throw new Error(error.message || "Error adding user certification")
  }

  return response.json()
}

// Add a new course
export async function addUserCourse(userId: string, courseData: Partial<Curso>, token: string) {
  const response = await fetch(`${API_URL}/api/users/${userId}/courses`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(courseData),
  })

  if (!response.ok) {
    const error = await response.json()
    throw new Error(error.message || "Error adding user course")
  }

  return response.json()
}

