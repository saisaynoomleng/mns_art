# MNSArt

## Description

MNSArt is a creative agency site based in Ohio, USA, offering UI/UX design, web development, and custom digital projects for clients across the United States and Myanmar. MNSArt works with businesses at different stages of growth, delivering projects that range from small business to large enterprise scale.

## Live Website

[mnsart.com](https://mnsart.com)

## Tech Stack

**Frontend**

- Next.js
- React.js
- TypeScript
- Zod
- Tailwind CSS
- shadcn/ui
- Storybook
- React Hook Form
- TanStack Query
- GSAP

**Backend**

- Sanity CMS
- PostgreSQL
- Neon
- Drizzle
- Better Auth
- React Email

**Tooling**

- Turborepo
- pnpm

**DevOps**

- GitHub Actions
- CI/CD
- Bash
- Linux
- Git / GitHub

**Testing**

- Vitest
- Playwright

**Cloud & Infrastructure**

- Amazon EC2
- Amazon ECR
- Amazon SES
- Amazon S3
- AWS Secrets Manager
- Amazon CloudFront
- Certbot
- Nginx
- Docker / Containers

## Features

> The project draft lists the following as a draft/planned feature set.

**Functional**

- User can request an audit by contacting the site
- User can chat with an AI assistant for questions
- User can get an audit by asking the AI Assistant, where the LLM performs the contact form submission in the background by asking the user questions
- Portfolio / case studies section, content managed via Sanity CMS
- Service pages for each offering (UI/UX design, web development, custom digital projects)
- Testimonials / client logos section
- Blog or insights section for SEO and thought leadership
- Newsletter signup with automated emails via React Email
- "Request a quote" or project inquiry form separate from the general contact form
- Admin view for staff to see incoming contact/audit submissions
- Client login area (using Better Auth) to view project status or deliverables
  Testimonials / client logos section
- Client can login, sign up, delete account
- Client can change user info, profile image, password

**Non-functional**

- Each page must have a Lighthouse score of 95% and above
- The site must start within 1 second
- Mobile responsiveness across all pages
- Basic analytics (e.g. page views, form conversion) for the marketing team
- Accessibility (WCAG) baseline for public-facing pages

## Architecture

MNSArt is structured as a monorepo, managed with Turborepo and pnpm.

### Folder Structure

```plaintext
├── Dockerfile
├── LICENSE
├── README.md
├── apps
│   ├── agency
│   └── studio
├── package.json
├── packages
│   ├── email
│   ├── ui
│   └── utils
├── pnpm-lock.yaml
├── pnpm-workspace.yaml
├── tsconfig.json
└── turbo.json
```

| Path             | Purpose                  | Local Address    | Package Name    |
| ---------------- | ------------------------ | ---------------- | --------------- |
| `apps/agency`    | Agency front-end and API | `localhost:3000` | —               |
| `apps/studio`    | Sanity Studio            | `localhost:3333` | —               |
| `packages/email` | React Email              | `localhost:3001` | `@mnsart/email` |
| `packages/ui`    | Storybook (React)        | `localhost:6006` | `@mnsart/ui`    |
| `packages/utils` | Shared utilities         | —                | `@mnsart/utils` |

### Request Flow

```plaintext
user -> Namecheap DNS -> EC2 -> Nginx -> agency (mnsart.com) -> validate contact -> AWS SES -> contact@mnsart.com
```

## Development / Getting Started

### Prerequisites

- Node.js `>=24.20.0 <25.0.0`
- pnpm `>=11.24.0`

### Environment Variables

Reference `.env.example` in the apps/agency for the full list of required variables. The following variable names are defined there (values are not provided and must be sourced separately):

```plaintext
# Next.js
NEXT_PUBLIC_APP_URL=
NEXT_PUBLIC_SANITY_DATASET=
NEXT_PUBLIC_SANITY_PROJECT_ID=

# Sanity
SANITY_STUDIO_DATASET=
SANITY_STUDIO_PROJECT_ID=
SANITY_READ_TOKEN=
SANITY_WRITE_TOKEN=

# Database
DATABASE_URL=

# AWS
AWS_ACCESS_KEY=
AWS_SECRET_ACCESS_KEY=
AWS_REGION=

# Better Auth
BETTER_AUTH_SECRET=
BETTER_AUTH_URL=
```

### Setup

```bash
git clone https://github.com/saisaynoomleng/mns_art.git
cd mns_art
pnpm i
pnpm dev
```

### Available Scripts

```bash
pnpm dev      # Run the development environment
pnpm test     # Run the test suite
pnpm lint     # Run linting
pnpm build    # Build the project
pnpm clean    # Clean the dist in each app and package
pnpm format   # format the codebase with prettier
```

## Deployment Architecture

- **Hosting:** AWS EC2
- **CDN:** Amazon CloudFront, positioned in front of EC2
- **Reverse proxy:** Nginx, positioned in front of the applications
- **DNS management:** Namecheap
- **Container registry:** AWS ECR
- **Containerization:** Docker
- **Storage:** S3
- **Supporting AWS services:** SES, Secrets Manager
- **TLS:** Certbot

### CI/CD Flow

```plaintext
developer -> push code -> GitHub Actions -> test, lint, type check, build -> docker push -> ECR -> docker pull -> EC2 -> docker run
```

### Production Build (from `root`)

```bash
docker build -t mnsart .
docker run -p 3000:3000 mnsart
```

## Testing

Testing is performed using:

- Vitest
- Playwright

Run the test suite with:

```bash
pnpm test
```

## License

This project is licensed under the MIT License.

**Author:** [saisaynoomleng](https://github.com/saisaynoomleng)
