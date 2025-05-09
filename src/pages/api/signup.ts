// pages/api/signup.ts
import type { NextApiRequest, NextApiResponse } from "next";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method Not Allowed" });
  }

  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    return res.status(400).json({ message: "Missing required fields" });
  }

  // Mock DB call or user creation logic here
  console.log("✅ Received signup:", { name, email, password });

  // Send back success
  return res.status(201).json({ message: "User signed up successfully" });
}
