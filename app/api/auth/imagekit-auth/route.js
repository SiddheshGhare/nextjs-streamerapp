// File: app/api/upload-auth/route.js
import { getUploadAuthParams } from "@imagekit/next/server";

export async function GET() {
  try {
    // Authenticate user here (check session, JWT, etc.)

    const { token, expire, signature } = getUploadAuthParams({
      privateKey: process.env.IMAGEKIT_PRIVATE_KEY, // Keep private key on server only
      publicKey: process.env.IMAGEKIT_PUBLIC_KEY,
      // expire: 30 * 60, // Optional: expiry time in seconds (max 1 hour)
      // token: "custom-token", // Optional: custom request token
    });

    return Response.json({
      token,
      expire,
      signature,
      publicKey: process.env.IMAGEKIT_PUBLIC_KEY,
    });
  } catch (error) {
    console.error("ImageKit auth error:", error);
    return Response.json(
      { error: "Authentication for ImageKit failed" },
      { status: 500 }
    );
  }
}
