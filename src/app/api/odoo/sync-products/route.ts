import { NextResponse } from "next/server";
import { getDB, saveDB } from "@/lib/db";
import { fetchOdooProducts } from "@/lib/odoo";

export async function POST() {
  const db = getDB();
  try {
    const products = await fetchOdooProducts(db.config);
    db.products = products;
    saveDB(db);
    return NextResponse.json({ ok: true, count: products.length });
  } catch (err: any) {
    return NextResponse.json({ ok: false, message: err.message }, { status: 500 });
  }
}