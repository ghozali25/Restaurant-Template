# Sarab Resto - Next.js Restaurant App with Odoo Integration

A modern restaurant website built with Next.js, TypeScript, and Tailwind CSS, featuring an admin dashboard for managing content and synchronizing products with Odoo ERP.

## Features

- 🍔 **Restaurant Website**: Beautiful, responsive frontend inspired by the Sarab theme
- 👨‍💼 **Admin Dashboard**: Manage website content and Odoo integration
- 🔄 **Odoo Synchronization**: Sync products from Odoo ERP via JSON-RPC
- 💾 **Local Storage**: SQLite database for caching products and site content
- 📱 **Responsive Design**: Works on mobile, tablet, and desktop
- 🌓 **Dark Mode Support**: Automatic dark/light theme based on system preference
- 🚀 **SEO Friendly**: Semantic HTML and meta tags

## Tech Stack

- **Framework**: Next.js 16 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **State Management**: React Hooks
- **Database**: SQLite (via better-sqlite3)
- **Odoo Integration**: XML-RPC/JSON-RPC
- **Icons**: Lucide React
- **Deployment**: Vercel-ready

## Prerequisites

- Node.js 18+ (LTS version recommended)
- npm or yarn
- Odoo instance (version 14+ recommended) with JSON-RPC enabled
- Git (optional, for version control)

## Getting Started

### 1. Clone the Repository

```bash
git clone <repository-url>
cd sarab-resto
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Environment Setup

Create a `.env.local` file in the root directory with the following variables:

```env
# Odoo Connection Settings
ODOO_URL=https://your-odoo-instance.com
ODOO_DB=your_database_name
ODOO_USERNAME=your_username
ODOO_API_KEY=your_api_key_or_password

# Optional: Adjust these for your environment
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

> **Note**: For security, never commit your `.env.local` file to version control. It's already in `.gitignore`.

### 4. Initialize the Database

The application will automatically create a SQLite database at `./data/store.json` on first run. This stores:
- Odoo configuration
- Cached product data
- Site content (hero text, promo details, etc.)

### 5. Run the Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the website.

Access the admin dashboard at [http://localhost:3000/admin](http://localhost:3000/admin).

## Building for Production

To create an optimized production build:

```bash
npm run build
```

Start the production server:

```bash
npm start
```

## Admin Dashboard Features

### Overview
- System status and quick stats
- Connection test to Odoo
- Product synchronization button

### Page Manager
- Edit homepage hero text
- Update promotional offers
- Modify contact information

### Odoo Integration
- Test connection to your Odoo instance
- Synchronize products from Odoo to local cache
- View synchronization status and logs

### Product Management
- View all synchronized products
- Toggle product active/inactive status
- Search and filter products

## API Endpoints

All API routes are located in `/src/app/api/`:

- `GET /api/products` - Get all products
- `GET /api/admin/pages` - Get site content
- `PUT /api/admin/pages` - Update site content
- `POST /api/odoo/test-connection` - Test Odoo connection
- `POST /api/odoo/sync-products` - Sync products from Odoo
- `PUT /api/products/update` - Update product status

## Database Structure

The SQLite store (`data/store.json`) contains:

```json
{
  "config": {
    "url": "https://your-odoo-instance.com",
    "db": "your_database_name",
    "username": "your_username",
    "apiKey": "your_api_key"
  },
  "products": [
    {
      "id": 1,
      "name": "Product Name",
      "price": 12.99,
      "category": "Burgers",
      "image": "base64_image_string",
      "description": "Product description",
      "active": true
    }
  ],
  "content": {
    "heroTitle": "Delicious & Fast Food for Every Moment",
    "heroSubtitle": "Experience bold flavors crafted from premium ingredients.",
    "promoTitle": "30% Off Signature Burger Combo",
    "promoPrice": 17.49,
    "promoOriginalPrice": 24.99
  }
}
```

## Deployment

### Vercel (Recommended)

1. Push your code to a GitHub repository
2. Import the project in Vercel
3. Add the environment variables in Vercel Settings:
   - `ODOO_URL`
   - `ODOO_DB`
   - `ODOO_USERNAME`
   - `ODOO_API_KEY`
4. Deploy!

### Other Platforms

The app can be deployed to any Node.js hosting platform that supports Next.js:
- Netlify (with Next.js plugin)
- AWS Amplify
- Docker
- Traditional VPS

## Troubleshooting

### Common Issues

1. **Odoo Connection Failed**
   - Verify your Odoo URL is correct (include protocol: `http://` or `https://`)
   - Check that JSON-RPC is enabled on your Odoo instance
   - Ensure username/password or API key are correct
   - Confirm the database name is accurate

2. **Product Sync Issues**
   - Make sure the user has access to `product.template` model
   - Check Odoo server logs for permission errors
   - Verify network connectivity between your app and Odoo server

3. **Database Permissions**
   - Ensure the web server has write access to the `./data` directory
   - On Linux/macOS: `chmod 755 data` and `chmod 644 data/store.json`

4. **Build Errors**
   - Delete `.next` folder and node_modules, then reinstall:
     ```bash
     rm -rf .next node_modules
     npm install
     npm run build
     ```

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- [ThemeWagon](https://themewagon.com/) for the Sarab HTML template inspiration
- [Next.js](https://nextjs.org/) team for the amazing framework
- [Odoo](https://www.odoo.com/) community for the excellent ERP platform
- [Tailwind CSS](https://tailwindcss.com/) for the utility-first CSS framework

## Support

For issues, questions, or feature requests, please open an issue on the GitHub repository.

Enjoy building your restaurant's online presence! 🍕🍔🥗
