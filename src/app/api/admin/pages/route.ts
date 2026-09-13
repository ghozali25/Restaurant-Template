import { NextResponse } from "next/server";
import { getDB, saveDB } from "@/lib/db";

export async function GET() {
  return NextResponse.json(getDB().content);
}

export async function PUT(req: Request) {
  const body = await req.json();
  const db = getDB();
  db.content = { ...db.content, ...body };
  saveDB(db);
  return NextResponse.json(db.content);
}