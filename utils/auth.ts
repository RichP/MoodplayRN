// utils/auth.ts
export async function getMobileJwtToken(appKey: string) {
  const response = await fetch('http://localhost:3000/api/auth/mobile', {
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
