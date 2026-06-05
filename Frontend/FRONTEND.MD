# Project Camp Frontend Implementation Prompt

The React project is already initialized and configured with:

* React 19
* Tailwind CSS v4
* React Router
* TanStack Query
* Axios
* Zustand
* React Hook Form
* Zod
* Framer Motion
* Recharts
* React Dropzone
* Lucide React

Do NOT recreate the project setup.

Do NOT reinstall dependencies.

Work inside the existing codebase.

---

# Objective

Build a premium SaaS-grade frontend for Project Camp using the existing backend APIs.

The design should feel comparable to:

* Linear
* Vercel Dashboard
* Notion
* ClickUp
* Jira

The application should feel modern, responsive, polished, and production-ready.

---

# First Task

Analyze the existing codebase and create a scalable architecture.

If folders already exist:

* Reuse them
* Refactor only when necessary
* Avoid breaking existing code

Create missing folders only when needed.

---

# Required Folder Structure

src/

├── api/

├── components/

│ ├── common/

│ ├── layout/

│ ├── dashboard/

│ ├── projects/

│ ├── tasks/

│ ├── notes/

│ └── team/

├── pages/

├── hooks/

├── routes/

├── services/

├── store/

├── utils/

├── constants/

└── assets/

---

# Design Requirements

Maintain perfect:

* Alignment
* Spacing
* Typography hierarchy
* Component consistency

Use:

* Geist for headings
* Inter for body text

The interface should feel premium.

Avoid generic admin dashboard styles.

---

# Layout Requirements

Create:

## Sidebar

Menu:

* Dashboard
* Projects
* Tasks
* Notes
* Team
* Settings

Features:

* Active navigation state
* Collapsible sidebar
* Mobile drawer
* Smooth transitions

---

## Navbar

Contains:

* Search bar
* Notification icon
* Theme toggle
* User profile menu

Sticky navbar.

---

# Authentication

Implement pages:

* Login
* Register
* Forgot Password
* Reset Password
* Verify Email

Requirements:

* React Hook Form
* Zod validation
* Axios integration
* TanStack Query mutations
* Protected routes
* Loading states
* Error handling

---

# State Management

Use Zustand for:

* Authentication
* User information
* Theme state

Do not use Context API for global state unless absolutely necessary.

---

# API Layer

Create reusable API architecture.

Requirements:

* Axios instance
* Request interceptors
* Response interceptors
* Automatic token handling
* Refresh token support
* Centralized error handling

---

# Dashboard

Build a premium dashboard.

Include:

## Stats Cards

* Total Projects
* Active Tasks
* Completed Tasks
* Team Members

## Charts

Use Recharts.

Create:

* Task Progress Chart
* Project Completion Chart

## Activity Feed

Recent activities section.

---

# Projects Module

Implement:

* Project listing
* Create project
* Edit project
* Delete project
* Project details page

Use responsive cards.

Include:

* Project name
* Description
* Member count
* Progress bar

---

# Team Module

Implement:

* Member listing
* Add member
* Remove member
* Change role

Use responsive table layout.

---

# Tasks Module

Implement a Kanban board.

Columns:

* Todo
* In Progress
* Done

Requirements:

* Drag and drop
* Smooth animations
* Responsive design

Task cards should display:

* Title
* Assignee
* Due date
* Status
* Attachments

---

# Task Details

Create a slide-over drawer.

Display:

* Task information
* Subtasks
* Attachments
* Activity timeline

---

# Notes Module

Implement:

* Notes listing
* Create note
* Update note
* Delete note

Use a clean reading-focused design.

---

# File Uploads

Use React Dropzone.

Requirements:

* Drag and drop
* Multiple files
* Preview support
* Upload progress

---

# Theme System

Implement:

* Light mode
* Dark mode

Persist theme using localStorage.

---

# Loading States

Create reusable skeleton components.

Never leave sections blank while loading.

---

# Error States

Create reusable:

* Error component
* Empty state component
* Retry mechanism

---

# Animations

Use Framer Motion carefully.

Add animations for:

* Sidebar collapse
* Modals
* Page transitions
* Drawers
* Dropdowns

Keep animations subtle and professional.

---

# Code Quality Rules

Follow:

* Component-first architecture
* Reusable components
* Clean code principles
* Feature-based organization
* Consistent naming conventions

Avoid:

* Large components
* Duplicate code
* Inline business logic
* Hardcoded values

---

# Expected Output

Generate:

* Pages
* Components
* Routes
* Zustand stores
* API services
* Custom hooks
* Reusable UI components

Integrate everything with the provided backend API structure.

Prioritize production-quality code, maintainability, responsiveness, accessibility, and premium user experience over speed of implementation.
