# سوق بلدي - Souq Baladi

<div dir="rtl">

## منصة إعلانات مبوبة احترافية

منصة إعلانات مبوبة شاملة تتنافس مع أفضل المنصات العالمية مثل Avito و Facebook Marketplace، مبنية بأحدث تقنيات 2026.

</div>

---

## Features

### Frontend
- **React 19 + Next.js 16** with App Router & TypeScript
- **Tailwind CSS v4** for styling
- **Framer Motion** for professional animations
- **Zustand** for state management
- **Dark/Light mode** support
- **RTL layout** (Arabic)
- **Responsive design** (Mobile-first)
- **PWA ready**

### Backend
- **Node.js + Express** REST API
- **PostgreSQL** with **Prisma ORM**
- **JWT Authentication** with Google & Facebook Login
- **Socket.IO** for real-time chat
- **Cloudinary** for image storage
- **Zod** for validation
- **Helmet** for security

### Pages (29+)
- Homepage with hero, categories, listings, deals
- Category browsing & filtering
- Listing detail with gallery, map, seller info
- Craftsman directory & profiles
- Animal marketplace
- Real-time chat messenger
- User dashboard (listings, favorites, messages, notifications)
- Admin panel (users, listings, reports, analytics)
- Multi-step ad posting form
- Advanced search with filters

### Security
- Password encryption (bcrypt)
- XSS protection
- CSRF protection
- Rate limiting
- SQL injection prevention (Prisma)
- Email verification

---

## Project Structure

```
marketplace/
├── src/
│   ├── app/                 # Next.js App Router pages
│   │   ├── page.tsx         # Homepage
│   │   ├── layout.tsx       # Root layout
│   │   ├── globals.css      # Global styles
│   │   ├── categories/      # Categories page
│   │   ├── category/[slug]/ # Category detail
│   │   ├── listing/[id]/    # Listing detail
│   │   ├── craftsmen/       # Craftsmen directory
│   │   ├── animals/         # Animals marketplace
│   │   ├── chat/            # Chat messenger
│   │   ├── auth/            # Login & Register
│   │   ├── dashboard/       # User dashboard
│   │   ├── admin/           # Admin panel
│   │   ├── post/            # Post ad (multi-step)
│   │   └── search/          # Search results
│   ├── components/          # Reusable components
│   ├── types/               # TypeScript types
│   ├── lib/                 # Utilities & constants
│   └── store/               # Zustand store
├── backend/
│   ├── prisma/              # Database schema & migrations
│   └── src/
│       ├── routes/          # API routes
│       ├── services/        # Business logic
│       ├── middleware/       # Auth, validation, upload
│       ├── config/          # Configuration
│       └── utils/           # Helpers
├── docker-compose.yml
├── Dockerfile.frontend
└── vercel.json
```

---

## Getting Started

### Prerequisites
- Node.js 18+
- PostgreSQL 14+
- npm or yarn

### Installation

```bash
# Clone the repository
git clone https://github.com/yourusername/souq-baladi.git
cd souq-baladi

# Install frontend dependencies
npm install

# Install backend dependencies
cd backend
npm install

# Set up environment variables
cp .env.example .env
# Edit .env with your database credentials

# Generate Prisma client
npx prisma generate

# Push database schema
npx prisma db push

# Seed the database
npx ts-node prisma/seed.ts

# Start development servers
# Terminal 1 - Frontend
cd ..
npm run dev

# Terminal 2 - Backend
cd backend
npm run dev
```

### Docker Setup

```bash
# Start all services
docker-compose up -d

# View logs
docker-compose logs -f

# Stop all services
docker-compose down
```

---

## API Endpoints

### Authentication
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | /api/auth/register | Register new user |
| POST | /api/auth/login | Login |
| POST | /api/auth/google | Google OAuth |
| POST | /api/auth/facebook | Facebook OAuth |
| GET | /api/auth/me | Get current user |
| PUT | /api/auth/me | Update profile |

### Listings
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | /api/listings | Get all listings (with filters) |
| GET | /api/listings/:id | Get listing detail |
| POST | /api/listings | Create listing |
| PUT | /api/listings/:id | Update listing |
| DELETE | /api/listings/:id | Delete listing |
| POST | /api/listings/:id/like | Toggle like |

### Categories
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | /api/categories | Get all categories |
| POST | /api/categories | Create category (admin) |

### Craftsmen
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | /api/craftsmen | Get craftsmen directory |
| GET | /api/craftsmen/:id | Get craftsman profile |
| POST | /api/craftsmen | Create craftsman profile |

### Chat
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | /api/chat/conversations | Get conversations |
| GET | /api/chat/conversations/:id/messages | Get messages |
| POST | /api/chat/conversations | Create/get conversation |

### Admin
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | /api/admin/stats | Dashboard statistics |
| GET | /api/admin/users | Manage users |
| GET | /api/admin/listings | Manage listings |
| GET | /api/admin/reports | Manage reports |

---

## Deployment

### Vercel (Frontend)
1. Push to GitHub
2. Import project on Vercel
3. Set environment variables
4. Deploy

### Railway / Render (Backend)
1. Connect GitHub repository
2. Set environment variables
3. Add PostgreSQL database
4. Deploy

---

## Tech Stack

| Technology | Purpose |
|------------|---------|
| Next.js 16 | Frontend framework |
| React 19 | UI library |
| TypeScript | Type safety |
| Tailwind CSS 4 | Styling |
| Framer Motion | Animations |
| Zustand | State management |
| Express.js | Backend API |
| PostgreSQL | Database |
| Prisma | ORM |
| Socket.IO | Real-time chat |
| Cloudinary | Image storage |
| JWT | Authentication |
| Docker | Containerization |

---

## License

MIT License - See [LICENSE](LICENSE) for details.

---

<div dir="rtl">

## الكاتب

تم بناء هذا المشروع بواسطة **opencode** - مساعد تطوير البرمجيات بالذكاء الاصطناعي.

</div>
