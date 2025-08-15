// File: app/api/upload-auth/route.js
import { NextResponse } from "next/server";
import { getUploadAuthParams } from "@imagekit/next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth"; // Adjust path

export async function GET() {
  try {
    // Authenticate user with NextAuth
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Generate ImageKit upload auth params
    const { token, expire, signature } = getUploadAuthParams({
      privateKey: process.env.IMAGEKIT_PRIVATE_KEY
    });

    return NextResponse.json({
      token,
      expire,
      signature,
      publicKey: process.env.NEXT_PUBLIC_PUBLIC_KEY
    });
  } catch (error) {
    console.error("ImageKit auth error:", error);
    return NextResponse.json(
      { error: "Authentication for ImageKit failed" },
      { status: 500 }
    );
  }
}
