import { NextResponse } from "next/server";
import { getDB, saveDB } from "@/lib/db";
import { Product } from "@/lib/db";

export async function PUT(req: Request) {
  const body = await req.json();
  const db = getDB();
  const idx = db.products.findIndex((p: Product) => p.id === body.id);
  if (idx !== -1) {
    db.products[idx] = { ...db.products[idx], ...body };
  } else {
    db.products.push(body);
  }
  saveDB(db);
  return NextResponse.json({ ok: true });
}

export async function DELETE(req: Request) {
  const { id } = await req.json();
  const db = getDB();
  db.products = db.products.filter((p: Product) => p.id !== id);
  saveDB(db);
  return NextResponse.json({ ok: true });
}