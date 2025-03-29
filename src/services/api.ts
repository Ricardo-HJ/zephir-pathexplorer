/**
 * NEW FILE: src/services/api.ts
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

import type { UserInput } from "@/types/user"

const API_URL = process.env.NEXT_PUBLIC_API_URL

// User authentication
export async function loginUser(email: string, password: string) {
  const response = await fetch(`${API_URL}/api/users/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      correo: email,
      contraseña: password,
    }),
  })

  if (!response.ok) {
    const error = await response.json()
    throw new Error(error.message || "Error logging in")
  }

  return response.json()
}

// User profile
export async function getUserProfile(userId: string, token: string) {
  const response = await fetch(`${API_URL}/api/users/profile`, {
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
  const response = await fetch(`${API_URL}/api/users/profile`, {
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
  const response = await fetch(`${API_URL}/api/users/account`, {
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

// Skills and certifications
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

/**
 * Get user projects/experience
 */
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

