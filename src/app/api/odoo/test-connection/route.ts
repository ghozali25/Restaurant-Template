import { NextResponse } from "next/server";
import { getDB, saveDB } from "@/lib/db";
import { testOdooConnection } from "@/lib/odoo";

export async function POST(req: Request) {
  const body = await req.json();
  const db = getDB();
  db.config = { ...db.config, ...body };
  saveDB(db);
  const result = await testOdooConnection(db.config);
  return NextResponse.json(result);
}