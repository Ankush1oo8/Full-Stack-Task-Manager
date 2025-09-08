# Task Management App

A full-stack task management web application built with Next.js 14, MongoDB, and JWT authentication. Users can register, log in, and manage their personal tasks with advanced search, filtering, and pagination features.

![App Screenshot](https://github.com/user-attachments/assets/9c4d3fb4-7a65-44ca-8537-6f974404a70e)
*Main Dashboard - Task Management Interface*

## 🚀 Features

### Authentication
- ✅ Secure user registration and login with email/password
- ✅ JWT-based authentication with HTTP-only cookies
- ✅ Password hashing with bcrypt
- ✅ Protected routes and middleware
- ✅ User session management

### Task Management (CRUD)
- ✅ Create, read, update, and delete tasks
- ✅ Task properties: title, description, status (pending/done), timestamps
- ✅ User-specific task isolation (users only see their own tasks)
- ✅ Optimistic updates for smooth UX

### Search & Filter
- ✅ Real-time search by task title or description
- ✅ Status filtering (All, Pending, Done)
- ✅ Combined search and filter functionality
- ✅ Pagination with smart navigation
- ✅ Task statistics and counts

### User Interface
- ✅ Modern, responsive design with Tailwind CSS
- ✅ Clean and minimal UI following design best practices
- ✅ Loading states and error handling
- ✅ Mobile-first responsive design
- ✅ Intuitive navigation and user flows

## 🛠️ Tech Stack

- **Frontend**: Next.js 14 (App Router), React, TypeScript
- **Styling**: Tailwind CSS, shadcn/ui components
- **Backend**: Next.js API Routes, MongoDB
- **Authentication**: JWT, bcrypt
- **Database**: MongoDB with Mongoose ODM
- **Deployment**: Vercel (Frontend), MongoDB Atlas (Database)

## 📸 Screenshots

![Landing Page](https://github.com/user-attachments/assets/9c4d3fb4-7a65-44ca-8537-6f974404a70e)
![Landing Page](https://github.com/user-attachments/assets/098c042b-b20e-4114-ada2-4736c567877d)
*Landing Page - Welcome and Features*

![Login Page](https://github.com/user-attachments/assets/0cc6304f-f291-4993-8fb9-d64c6a4a96e6)
*Authentication - Login Form*

![Register Page](https://github.com/user-attachments/assets/ec1dac06-afa6-4614-a16e-b1b56b56e839)
*Authentication - Registration Form*

![Dashboard](https://github.com/user-attachments/assets/52b1f14d-0de1-491e-bd26-408ec12fc599)
*Dashboard - Complete Task Management Interface*

![Task Form](https://github.com/user-attachments/assets/d1896cf2-a0ee-45a6-9b6e-407cebcb8181)
*Task Creation/Editing Form*

![Search and Filter](https://github.com/user-attachments/assets/3577bd6a-b6aa-44f8-bf86-6b0dd4574f91)
![Search and Filter](https://github.com/user-attachments/assets/600cbe59-0c22-48c1-aff6-41c4b69004f6)
![Search and Filter](https://github.com/user-attachments/assets/faa6db2c-348e-42b1-bd65-328d3c0b3c84)
*Search and Filter Functionality*

## 🚀 Quick Start

### Prerequisites

- Node.js 18+ and npm
- MongoDB database (local or MongoDB Atlas)

### Installation

1. **Clone the repository**
   \`\`\`bash
   git clone <your-repo-url>
   cd task-management-app
   \`\`\`

2. **Install dependencies**
   \`\`\`bash
   npm install
   \`\`\`

3. **Set up environment variables**
   
   Create a `.env.local` file in the root directory:
   ```env
   MONGODB_URI=mongodb://localhost:27017/taskmanager
   # OR for MongoDB Atlas:
   # MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/taskmanager
   
   JWT_SECRET=your-super-secret-jwt-key-here
   NODE_ENV=development
   ```

4. **Run the development server**
   \`\`\`bash
   npm run dev
   \`\`\`

5. **Open your browser**
   
   Navigate to [http://localhost:3000](http://localhost:3000)

## 🔧 Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| `MONGODB_URI` | MongoDB connection string | ✅ Yes |
| `JWT_SECRET` | Secret key for JWT token signing | ✅ Yes |
| `NODE_ENV` | Environment (development/production) | ✅ Yes |

## 📁 Project Structure

```
├── app/
│   ├── api/
│   │   ├── auth/          # Authentication endpoints
│   │   └── tasks/         # Task CRUD endpoints
│   ├── dashboard/         # Main dashboard page
│   ├── login/            # Login page
│   ├── register/         # Registration page
│   ├── layout.tsx        # Root layout
│   └── page.tsx          # Landing page
├── components/
│   ├── ui/               # shadcn/ui components
│   ├── task-card.tsx     # Individual task display
│   ├── task-form.tsx     # Task creation/editing
│   ├── task-list.tsx     # Task list with search/filter
│   ├── task-search.tsx   # Search and filter controls
│   └── task-pagination.tsx # Pagination component
├── hooks/
│   ├── use-auth.ts       # Authentication hook
│   └── use-tasks.ts      # Task management hook
├── lib/
│   ├── models/           # MongoDB models
│   ├── db/              # Database operations
│   ├── auth.ts          # JWT utilities
│   └── mongodb.ts       # Database connection
└── middleware.ts         # Route protection
```

## 🔗 API Endpoints

### Authentication
- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login
- `POST /api/auth/logout` - User logout
- `GET /api/auth/me` - Get current user

### Tasks
- `GET /api/tasks` - Get user tasks (with search, filter, pagination)
- `POST /api/tasks` - Create new task
- `PUT /api/tasks/[id]` - Update task
- `DELETE /api/tasks/[id]` - Delete task

## 🚀 Deployment

### Deploy to Vercel

1. **Push to GitHub**
   \`\`\`bash
   git add .
   git commit -m "Initial commit"
   git push origin main
   \`\`\`

2. **Deploy on Vercel**
   - Connect your GitHub repository to Vercel
   - Add environment variables in Vercel dashboard
   - Deploy automatically

3. **Set up MongoDB Atlas**
   - Create a MongoDB Atlas cluster
   - Get your connection string
   - Update `MONGODB_URI` in Vercel environment variables

### Environment Variables for Production

In your Vercel dashboard, add:
- `MONGODB_URI`: Your MongoDB Atlas connection string
- `JWT_SECRET`: A secure random string (use a password generator)
- `NODE_ENV`: `production`

## 🧪 Testing

The app includes comprehensive error handling and loading states. Test the following scenarios:

1. **Authentication Flow**
   - Register new user
   - Login with valid/invalid credentials
   - Access protected routes

2. **Task Management**
   - Create, edit, delete tasks
   - Search functionality
   - Filter by status
   - Pagination

3. **Edge Cases**
   - Network errors
   - Invalid form submissions
   - Empty states

## 🔒 Security Features

- Password hashing with bcrypt
- JWT tokens stored in HTTP-only cookies
- Protected API routes with middleware
- Input validation and sanitization
- User-specific data isolation
- CORS protection

## 📝 Assignment Requirements Checklist

- ✅ **Authentication**: Sign up/login with email+password, secure password storage, JWT auth
- ✅ **Task Management**: Full CRUD operations with user isolation
- ✅ **Search & Filter**: Search by title/description, status filter, pagination
- ✅ **Frontend**: Next.js 14 App Router, proper loading/error states, clean UI
- ✅ **Bonus**: Deployed on Vercel, optimistic updates, modern data fetching

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request


---

**Live Demo**: [Your Deployed App URL]

**Repository**: https://github.com/Ankush1oo8/Full-Stack-Task-Manager

Built using Next.js, MongoDB, and modern web technologies.
