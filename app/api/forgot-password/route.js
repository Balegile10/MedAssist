import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import crypto from "crypto";

const prisma = new PrismaClient();

export async function POST(req) {
  try {
    const { email } = await req.json();
    const user = await prisma.user.findUnique({ where: { email } });

    if (!user) {
      return NextResponse.json({ message: "No account found with that email." }, { status: 404 });
    }

    // Generate a secure random token
    const token = crypto.randomBytes(32).toString("hex");
    const expiry = new Date(Date.now() + 15 * 60 * 1000); // 15 minutes

    await prisma.passwordResetToken.create({
      data: { email, token, expiresAt: expiry },
    });

    // Here you’d send an email with this reset link:
    // e.g. `https://yourapp.com/reset-password?token=${token}`

    return NextResponse.json({
      message: "If that email exists, a reset link has been sent.",
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: "Error sending reset link." }, { status: 500 });
  }
}
