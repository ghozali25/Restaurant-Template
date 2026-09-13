import { NextResponse } from "next/server";
import { getDB, saveDB } from "@/lib/db";
import { Product } from "@/lib/db";

export async function PUT(req: Request) {
  const { id, active } = await req.json();
  const db = getDB();
  const p = db.products.find((p: Product) => p.id === id);
  if (p) {
    (p as any).active = active;
    saveDB(db);
  }
  return NextResponse.json({ ok: true });
}