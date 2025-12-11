# Sudabang (수다방)

Sudabang is a modern e-commerce shopping mall application built with **Next.js 16**, **TypeScript**, and **Firebase**.

## 🚀 Technologies

- **Framework**: [Next.js 16](https://nextjs.org/) (App Router)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Styling**: [TailwindCSS v4](https://tailwindcss.com/)
- **Backend & Database**: [Firebase](https://firebase.google.com/) (Auth, Firestore, Hosting)
- **Deployment**: Firebase Hosting / Vercel

## 🛠️ Getting Started

### Prerequisites

- Node.js (Latest LTS version recommended)
- npm or yarn

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/lepapillon90/sudabang.git
   cd sudabang
   ```

2. Install dependencies:
   ```bash
   npm install
   # or
   yarn install
   ```

3. Set up environment variables:
   Create a `.env.local` file in the root directory and add your Firebase configuration keys.
   *(Refer to `env.example.md` if available)*

4. Run the development server:
   ```bash
   npm run dev
   # or
   yarn dev
   ```

   Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## 📂 Project Structure

- `app/`: Next.js App Router pages and layouts
- `src/`: Source code including components, hooks, and utilities
- `public/`: Static assets
- `firebase.json`: Firebase configuration

## ✨ Features

- **User Authentication**: Secure login/signup using Firebase Auth.
- **Product Management**: Browse and view product details.
- **Shopping Cart**: Add items to cart and manage orders.
- **Admin Dashboard**: Manage products, orders, and sales stats.
- **Responsive Design**: Optimized for both mobile and desktop.

## 📄 License

This project is licensed under the MIT License.
