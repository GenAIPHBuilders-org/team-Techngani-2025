# GEN AI - Content Generation & SaaS Platform

## Tech Stack

### Frontend (Next.js)

- **Framework**: Next.js 15
- **UI**: React 19, TailwindCSS 4
- **State Management**: Context API/Redux
- **Validation**: Zod
- **Styling**: TailwindCSS with class-variance-authority, clsx, tailwind-merge

### Backend (NestJS)

- **Framework**: NestJS 10
- **Runtime**: Node.js
- **API**: RESTful with Graphql
- **Testing**: Jest

### Workflow Automation

- **Tool**: n8n for workflow automation and content generation pipelines

## Project Structure

This is a monorepo using Turborepo for managing multiple packages.

```
/
├── app/                       # Main application code
│   ├── client/                # Frontend Next.js application
│   └── server/                # Backend NestJS application
├── package.json               # Root package.json for workspace management
└── turbo.json                 # Turborepo configuration
```

### Backend Structure (NestJS)

```
/nestjs-app
├── src
│   ├── app.module.ts                 # Main application module
│   ├── main.ts                       # Application entry point
│   ├── config                        # Configuration files
│   │   ├── database.config.ts
│   │   └── n8n.config.ts             # n8n API endpoints, tokens, etc.
│   ├── common                        # Shared utilities, interfaces, and DTOs
│   │   ├── decorators
│   │   ├── interfaces
│   │   └── utils.ts
│   ├── modules                       # Feature-specific modules
│   │   ├── auth
│   │   │   ├── auth.controller.ts    # Handles login, signup, etc.
│   │   │   ├── auth.service.ts
│   │   │   └── auth.module.ts
│   │   ├── user
│   │   │   ├── user.controller.ts
│   │   │   ├── user.service.ts
│   │   │   └── user.module.ts
│   │   ├── content                   # Content generation-specific logic
│   │   │   ├── content.controller.ts
│   │   │   ├── content.service.ts    # Calls n8n workflows, process content, etc.
│   │   │   └── content.module.ts
│   │   └── workflow                  # Optional module for workflow management
│   │       ├── workflow.service.ts   # Logic to call n8n webhooks or APIs
│   │       └── workflow.module.ts
│   └── database                      # Database connection & ORM configuration
│       ├── entities                  # Your entities/models
│       └── database.module.ts
├── test                              # Test cases and scripts
├── nest-cli.json
├── package.json
└── tsconfig.json
```

### Frontend Structure (Next.js)

```
/frontend
├── public
│   ├── assets                # Static assets like images, icons, and fonts
│   │   ├── images
│   │   └── icons
│   ├── favicon.ico           # Application favicon
│   ├── manifest.json         # Web app manifest for PWA features
│   └── robots.txt            # SEO and crawler instructions
├── src
│   ├── components            # Reusable UI components
│   │   ├── Navbar.tsx
│   │   ├── Footer.tsx
│   │   └── Button.tsx
│   ├── pages                 # Next.js pages (each file maps to a route)
│   │   ├── index.tsx         # Homepage
│   │   ├── login.tsx         # Login page
│   │   ├── dashboard.tsx     # Dashboard for logged-in users
│   │   └── content
│   │       ├── create.tsx    # Page to create new content
│   │       └── list.tsx      # Page to display user's contents
│   ├── styles                # Global styles and CSS modules
│   ├── context               # React Contexts for state management
│   ├── hooks                 # Custom React hooks
│   ├── services              # API client setups and service functions
│   ├── types                 # TypeScript interfaces and types
│   ├── config                # Configuration files
│   └── lib                   # Utility functions and helper libraries
├── package.json
├── tsconfig.json
└── next.config.js
```

### n8n Workflow Structure

```
/n8n
├── workflows                       # Pre-built workflows to be imported into n8n
│   ├── trend-analysis.json         # Workflow for analyzing trends
│   ├── content-ideation.json       # Generates content based on user input and trends
│   └── publishing.json             # Handles scheduling and multi-platform publishing
├── custom-nodes                    # Custom functionality beyond standard nodes
├── Dockerfile                      # For containerized deployment of n8n
├── config                          # n8n configuration files
│   └── config.json
└── README.md
```

## Getting Started

1. **Install dependencies**

   ```
   npm install
   ```

2. **Start development servers**
   ```
   npm run dev
   ```

This will start both the frontend and backend development servers.

## Scripts

- `npm run dev`: Start all applications in development mode
- `npm run build`: Build all applications
- `npm run lint`: Run linting on all applications
