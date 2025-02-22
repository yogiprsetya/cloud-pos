# CloudPOS

CloudPOS is a full-stack point-of-sales (POS) web application built using Next.js and modern web technologies. The project is currently a work in progress, focusing on product and user management features.

## Tech Stack

- **Frontend & Backend**: Next.js
- **Database & ORM**: PostgreSQL, Drizzle ORM
- **Validation**: Zod
- **State Management**: Zustand
- **Networking**: Axios, SWR
- **UI & Styling**: Tailwind CSS, shadcn/ui
- **Authentication**: NextAuth.js with Firebase Auth

## Features Implemented

### 1. Product Management

- Create, delete, and retrieve products (single)
- Supports product variants with labels and items

### 2. User Authentication & Roles

✅ User roles: Manager, Cashier, Trainee
✅ Authentication with NextAuth.js and Firebase Auth
✅ User account and session management

## Work in Progress

⏳ Implementing update product

## Setup & Installation

1. Clone the repository:
   ```sh
   git clone https://github.com/yourusername/cloudpos.git
   cd cloudpos
   ```
2. Install dependencies:
   ```sh
   npm install
   ```
3. Set up environment variables (e.g., Firebase, database URL, etc.).
4. Run the development server:
   ```sh
   npm run dev
   ```

## Contributing

Contributions are welcome! Please create a pull request or open an issue if you find any bugs or have feature suggestions.

## License

This project is licensed under the MIT License.
