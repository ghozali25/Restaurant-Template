import { NextResponse } from "next/server";
import { getDB } from "@/lib/db";

export async function GET() {
  return NextResponse.json(getDB().products);
}