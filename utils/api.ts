/**
 * Gets a list of games from the backend /api/games endpoint for a selected mood.
 * @param token JWT token string
 * @param selectedMood Mood string to filter games
 * @returns backend response (array of games)
 */
const API_BASE_URL = process.env.EXPO_PUBLIC_API_BASE_URL || 'http://localhost:3000';

export async function getGames(token: string, selectedMood: string) {
  const url = `${API_BASE_URL}/api/games?selectedMood=${encodeURIComponent(selectedMood)}`;
  console.debug('Fetching games from:', url);
  const response = await fetch(url, {
    method: 'GET',
    headers: {
      'Authorization': `Bearer ${token}`,
      'Accept': 'application/json',
    },
  });
  if (!response.ok) {
    let error;
    try {
      error = await response.json();
    } catch (e) {
      error = { message: 'Unknown error', raw: await response.text() };
    }
    console.error('API getGames error:', error);
    throw new Error(error.message || 'Failed to fetch games');
  }
  return response.json();
}
// utils/api.ts

/**
 * Verifies a JWT token by calling the backend /api/auth/verify endpoint.
 * @param token JWT token string
 * @returns backend response (e.g., { valid: true, ... })
 */
export async function verifyToken(token: string) {
  const url = `${API_BASE_URL}/api/auth/verify`;
  console.debug('Verifying token at:', url);
  const response = await fetch(url, {
    method: 'GET',
    headers: {
      'Authorization': `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    let error;
    try {
      error = await response.json();
    } catch (e) {
      error = { message: 'Unknown error', raw: await response.text() };
    }
    console.error('API verifyToken error:', error);
    throw new Error(error.message || 'Token verification failed');
  }

  return response.json();
}

/**
 * Gets a list of moods from the backend /api/moods endpoint.
 * @param token JWT token string
 * @returns backend response (e.g., { moods: [...] })
 */
export async function getMoods(token: string) {
  const url = `${API_BASE_URL}/api/moods`;
  console.debug('Fetching moods from:', url);
  const response = await fetch(url, {
    method: 'GET',
    headers: {
      'Authorization': `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    let error;
    try {
      error = await response.json();
    } catch (e) {
      error = { message: 'Unknown error', raw: await response.text() };
    }
    console.error('API getMoods error:', error);
    throw new Error(error.message || 'Failed to fetch moods');
  }

  return response.json();
}
