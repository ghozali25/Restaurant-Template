import axios from "axios";
import { OdooConfig, Product } from "./db";

export interface OdooProductRaw {
  id: number;
  name: string;
  list_price: number;
  default_code?: string;
  description_sale?: string;
  image_1920?: string;
  categ_id?: [number, string];
}

export async function testOdooConnection(config: OdooConfig): Promise<{ ok: boolean; message: string }> {
  try {
    const url = new URL(config.url);
    const base = `${url.protocol}//${url.host}`;
    const response = await axios.post(
      `${base}/jsonrpc`,
      {
        jsonrpc: "2.0",
        method: "call",
        params: {
          service: "common",
          method: "version"
        },
        id: 1
      },
      { timeout: 10000 }
    );
    return { ok: true, message: `Connected to Odoo ${response.data.result.server_version}` };
  } catch (err: any) {
    return { ok: false, message: err.message || "Connection failed" };
  }
}

export async function fetchOdooProducts(config: OdooConfig): Promise<Product[]> {
  const url = new URL(config.url);
  const base = `${url.protocol}//${url.host}`;

  // 1. Authenticate
  const authRes = await axios.post(
    `${base}/jsonrpc`,
    {
      jsonrpc: "2.0",
      method: "call",
      params: {
        service: "common",
        method: "authenticate",
        args: [config.db, config.username, config.apiKey, {}]
      },
      id: 1
    },
    { timeout: 15000 }
  );
  const uid = authRes.data.result;
  if (!uid) throw new Error("Odoo authentication failed. Check db, username, and API key.");

  // 2. Search product ids
  const searchRes = await axios.post(
    `${base}/jsonrpc`,
    {
      jsonrpc: "2.0",
      method: "call",
      params: {
        service: "object",
        method: "execute_kw",
        args: [
          config.db,
          uid,
          config.apiKey,
          "product.template",
          "search_read",
          [],
          {
            fields: ["name", "list_price", "default_code", "description_sale", "image_1920", "categ_id"],
            limit: 200
          }
        ]
      },
      id: 2
    },
    { timeout: 30000 }
  );

  const items: OdooProductRaw[] = searchRes.data.result || [];
  return items.map((p) => ({
    id: p.id,
    name: p.name,
    price: p.list_price,
    category: p.categ_id?.[1] || "Uncategorized",
    image: p.image_1920 ? `data:image/png;base64,${p.image_1920}` : undefined,
    description: p.description_sale || ""
  }));
}