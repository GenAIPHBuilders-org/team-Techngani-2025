# Sikatly.AI Client

## Recent Authentication Updates

### User Authentication in Navigation

We've implemented a new authentication system that displays the user's avatar in the navigation bar when they are logged in, replacing the Sign In/Sign Up buttons.

#### New Features:

- **User Avatar Display**: Shows the user's profile picture in the navbar when authenticated
- **User Menu Dropdown**: Clicking the avatar opens a dropdown with user options
- **Responsive Design**: Works on both desktop and mobile views
- **Custom Avatar Fallback**: Uses user's initials when no avatar image is available
- **Loading State**: Shows a loading indicator while authentication state is being determined

#### Technical Implementation:

1. **Authentication Hook**

   - Created a new `useAuth` hook that handles authentication state management
   - Provides user data, authentication status, and loading state
   - Automatically fetches current user data on component mount

2. **API Routes**

   - `/api/auth/user`: Endpoint to fetch the current authenticated user
   - `/api/auth/signout`: Endpoint to handle user sign out process

3. **Updated Components**

   - `UserMenu`: Now dynamically shows either the user avatar or sign-in/sign-up buttons
   - `Navbar`: Simplified to use the self-contained UserMenu component
   - `MobileNav`: Updated to work with the authentication system

4. **Session Management**
   - Uses a secure cookie-based session system
   - JWT tokens for authentication validation
   - Auto-redirect for expired or invalid sessions

### How to Use:

The authentication system works automatically. When a user signs in through the `/auth/signin` route, their session is created and the navbar will update to show their avatar. The avatar displays the user's profile picture if available, falling back to their initials if not.

Clicking the avatar reveals a dropdown menu with options for:

- Dashboard
- Settings
- Sign Out

### Benefits:

- Enhanced user experience with visual authentication status
- Consistent design across desktop and mobile
- Improved security with proper session management
- Clean, modular code structure for easy maintenance

This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
