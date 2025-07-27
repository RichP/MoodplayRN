// utils/auth.ts

const API_BASE_URL = process.env.EXPO_PUBLIC_API_BASE_URL || 'http://localhost:3000';

export async function getMobileJwtToken(appKey: string) {

  const url = `${API_BASE_URL}/api/auth/mobile`;
  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ appKey }),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || 'Failed to authenticate');
  }

  return response.json(); // Should contain your JWT or success message
}
