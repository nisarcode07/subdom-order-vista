
# OrderMade - White-label Order Management Platform

## Overview

OrderMade is a white-label order management platform that dynamically renders company-specific dashboards based on subdomains. For example, daraz.ordermade.com shows Daraz's logo and orders, while foodpanda.ordermade.com displays FoodPanda's branding and orders.

## Features

- Dynamic subdomain rendering with company-specific branding
- Sortable order table with pagination
- Responsive design for all device sizes
- Local development support with URL parameter simulation

## Technical Implementation

### Dynamic Subdomains

The application uses a subdomain detection system to identify which company's dashboard to display:

1. In production, the subdomain is extracted from the hostname (e.g., `daraz.ordermade.com` → `daraz`)
2. For local development, a URL parameter is used: `localhost:8080?company=daraz`

### Local Development Setup

Since subdomains like `daraz.localhost:8080` might not work consistently, the application uses URL query parameters for local development:

```
http://localhost:8080?company=daraz
http://localhost:8080?company=foodpanda
```

### Adding New Companies

To add a new company (e.g., Amazon):

1. Add a new entry to the `companies` array in `src/data/companies.ts`:

```typescript
{
  id: 'amazon',
  name: 'Amazon',
  logo: '/logos/amazon.png',
  primaryColor: '#FF9900',
  secondaryColor: '#146EB4',
  domain: 'amazon'
}
```

2. Add the company logo to the `public/logos/` directory
3. The system will automatically handle the rest, and the company will be accessible via:
   - Production: `amazon.ordermade.com`
   - Local development: `localhost:8080?company=amazon`

## Technology Stack

- React / TypeScript
- Tailwind CSS for styling
- shadcn/ui components

## Running the Project

1. Clone the repository
2. Install dependencies: `npm install`
3. Start the development server: `npm run dev`
4. Access with company parameter: `http://localhost:8080?company=daraz`
