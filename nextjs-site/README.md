# Rotaract Club of Bangalore JP Nagar Website

Welcome to the official source code for the Rotaract Club of Bangalore JP Nagar website (District 3191). This project is built with **Next.js 16**, **Tailwind CSS**, and modern web standards to provide a fast, accessible, and dynamic experience.

## ✨ Features

- **Dynamic Projects Showcase**: Projects are loaded from a CSV/JSON data source, generating individual detail pages automatically via Static Site Generation (SSG).
- **Brand Center**: A dedicated portal for members to download club, district, and theme logos with a functional background checker and preview modal.
- **Responsive Design**: Mobile-first architecture ensuring seamless access across all devices.
- **Dark Mode**: Fully supported theme toggle.
- **Contact Form**: Integrated with **Web3Forms** for serverless email delivery.
- **Optimized Performance**: Next.js App Router with React Server Components.

## 🛠 Tech Stack

- **Framework**: [Next.js 16](https://nextjs.org/) (App Router)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **Data Handling**: Server-side CSV parsing (`papaparse` / Native FS)
- **Icons**: SVG / Heroicons
- **Deployment**: Vercel (Recommended) or Netlify

## 🚀 Getting Started

### Prerequisites

- Node.js 18.17.0 or later
- npm or yarn

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/rotaractjpnagar3191/rcjpn_website.git
   cd rcjpn_website/nextjs-site
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. **Configure Environment Variables**:
   Create a `.env.local` file in the root directory (`nextjs-site/`) to enable the contact form:
   ```bash
   NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY=your_access_key_here
   ```
   > **Note**: Don't commit this file. It is already ignored by git.

4. Run the development server:
   ```bash
   npm run dev
   ```

   Open [http://localhost:3000](http://localhost:3000) (or 3001) in your browser.

## 📂 Project Structure

```
src/
├── app/                  # App Router Pages
│   ├── brand-center/     # Logo Download Portal
│   ├── projects/         # Projects Listing & Dynamic [slug] Pages
│   ├── team/             # Team/Board Members
│   ├── layout.tsx        # Global Layout (Header/Footer)
│   └── page.tsx          # Home Page
├── components/           # Reusable React Components
│   ├── home/             # Home-specific sections (Hero, Featured, Contact)
│   ├── layout/           # Header, Footer
│   └── ui/               # Generic UI (ScrollToTop, Buttons)
├── lib/                  # Utilities (Project parsing, types)
├── styles/               # Global CSS
└── public/               # Static assets (images, logos)
```

## 📝 Configuration

- **Projects Data**: Modify the source CSV file in `src/data` (if applicable) or `src/lib/projects.server.ts` to update the project list.
- **Theme Colors**: CSS variables are defined in `src/app/globals.css`.

## 🤝 Contributing

1. Fork the repository.
2. Create a feature branch (`git checkout -b feature/AmazingFeature`).
3. Commit your changes.
4. Push to the branch.
5. Open a Pull Request.

## 📄 License

This project is licensed for the storage and usage of Rotaract JP Nagar.

---
Built with ❤️ by the Rotaract Club of Bangalore JP Nagar Team.
