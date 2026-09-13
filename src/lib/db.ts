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
  companyName: string;
  heroTitle: string;
  heroSubtitle: string;
  aboutHistory: string;
  promoTitle: string;
  promoDesc: string;
  promoPrice: number;
  promoOriginalPrice: number;
  contactAddress: string;
  contactPhone: string;
  contactEmail: string;
  openingHours: string;
  openingHoursDetails: string;
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
        companyName: 'Sarab',
        heroTitle: 'Delicious & Fast Food for Every Moment',
        heroSubtitle: 'Experience bold flavors crafted from premium ingredients.',
        aboutHistory: 'Founded in 2012, Sarab began as a small corner joint with a big dream — to serve food that brings people together. Today we\'re proud to serve thousands of happy customers every week with same passion that started it all.',
        promoTitle: 'Get 30% Off Our Signature Burger Meal',
        promoDesc: 'Don\'t miss our weekend special — grab our mouthwatering signature burger meal while offer lasts.',
        promoPrice: 17.49,
        promoOriginalPrice: 24.99,
        contactAddress: '42 Flavor Street, Manhattan, NY 10001',
        contactPhone: '+1 (800) 123-4567',
        contactEmail: 'hello@sarabfood.com',
      openingHours: 'Monday - Tuesday: Closed; Wednesday - Thursday: 09:00 AM - 10:00 PM; Friday - Saturday: 09:00 AM - 11:30 PM; Sunday: 10:00 AM - 10:00 PM',
      openingHoursDetails: 'Fresh food and good moments await. Visit us or place your order online.'
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
