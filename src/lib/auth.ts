import { jwtVerify, SignJWT } from 'jose';

const getJwtSecretKey = () => {
  const secret = process.env.JWT_SECRET || 'fallback-super-secret-key-change-me-in-production';
  return new TextEncoder().encode(secret);
};

export async function verifyJwtToken(token: string) {
  try {
    const { payload } = await jwtVerify(token, getJwtSecretKey());
    return payload;
  } catch (error) {
    return null;
  }
}

export async function signJwtToken(payload: any) {
  const secret = getJwtSecretKey();
  const token = await new SignJWT(payload)
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime('24h') // 24 hour expiration
    .sign(secret);
  
  return token;
}
