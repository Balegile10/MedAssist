import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";

const prisma = new PrismaClient();

export async function POST(req) {
  try {
    const { token, password } = await req.json();
    const reset = await prisma.passwordResetToken.findUnique({ where: { token } });

    if (!reset || reset.expiresAt < new Date()) {
      return NextResponse.json({ message: "Invalid or expired token." }, { status: 400 });
    }

    const hashed = await bcrypt.hash(password, 10);
    await prisma.user.update({
      where: { email: reset.email },
      data: { password: hashed },
    });

    await prisma.passwordResetToken.delete({ where: { token } });

    return NextResponse.json({ message: "Password has been reset successfully." });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: "Error resetting password." }, { status: 500 });
  }
}
