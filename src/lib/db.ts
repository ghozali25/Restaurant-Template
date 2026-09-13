import fs from 'fs';
import path from 'path';

const DB_PATH = path.join(process.cwd(), 'data', 'store.json');

export interface OdooConfig {
  url: string;
  db: string;
  username: string;
  apiKey: string;
}

export interface Product {
  id: number;
  name: string;
  price: number;
  category: string;
  image?: string;
  description?: string;
  active?: boolean;
}

export interface SiteContent {
  heroTitle: string;
  heroSubtitle: string;
  promoTitle: string;
  promoPrice: number;
  promoOriginalPrice: number;
}

interface DBData {
  config: OdooConfig;
  products: Product[];
  content: SiteContent;
}

function initDB(): DBData {
  const dir = path.dirname(DB_PATH);
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }

  if (!fs.existsSync(DB_PATH)) {
    const defaultData: DBData = {
      config: {
        url: '',
        db: '',
        username: '',
        apiKey: ''
      },
      products: [],
      content: {
        heroTitle: 'Delicious & Fast Food for Every Moment',
        heroSubtitle: 'Experience bold flavors crafted from premium ingredients.',
        promoTitle: '30% Off Signature Burger Combo',
        promoPrice: 17.49,
        promoOriginalPrice: 24.99
      }
    };
    fs.writeFileSync(DB_PATH, JSON.stringify(defaultData, null, 2));
    return defaultData;
  }

  const raw = fs.readFileSync(DB_PATH, 'utf-8');
  return JSON.parse(raw);
}

export function getDB(): DBData {
  return initDB();
}

export function saveDB(data: DBData) {
  fs.writeFileSync(DB_PATH, JSON.stringify(data, null, 2));
}
