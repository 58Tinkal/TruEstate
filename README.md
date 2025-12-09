# TruEstate - Sales Management System

## Overview

This Project is a comprehensive sales management system designed for AI-powered sales data visualization and analysis. The application provides advanced search, filtering, sorting, and pagination capabilities to help users efficiently manage and analyze large volumes of sales transactions. Built with a modern tech stack, it offers a responsive and intuitive interface for exploring sales data with real-time filtering and comprehensive transaction insights.

## Tech Stack

### Backend

- **Node.js** - Runtime environment
- **Express.js** - Web application framework
- **MongoDB** - NoSQL database
- **Mongoose** - MongoDB object modeling
- **CORS** - Cross-origin resource sharing
- **dotenv** - Environment variable management
- **csv-parser** - CSV file parsing utility

### Frontend

- **React 18** - UI library
- **Vite** - Build tool and dev server
- **Axios** - HTTP client
- **Tailwind CSS** - Utility-first CSS framework
- **React Hooks** - State management and side effects

## Search Implementation Summary

The search functionality implements full-text search across customer names and phone numbers with the following features:

### Features

- **Case-insensitive matching** - Searches ignore letter case
- **Regex pattern matching** - Supports partial matches and pattern-based queries
- **Multi-field search** - Searches simultaneously in `customerName` and `phoneNumber` fields
- **Real-time search** - Updates results as user types (debounced via React state)
- **Special character escaping** - Handles regex special characters safely

### Implementation

- **Backend**: Uses MongoDB `$regex` with case-insensitive flag (`"i"`) in a `$or` query
- **Frontend**: Search input in `TopBar` component updates query state immediately
- **Performance**: Regex is escaped to prevent injection and optimized for MongoDB indexes

### Code Location

- Backend: `backend/src/services/salesService.js` (lines 31-46)
- Frontend: `frontend/src/components/dashboard/TopBar.jsx`

## Filter Implementation Summary

The filtering system supports multi-select and range-based filtering across multiple dimensions:

### Filter Types

1. **Multi-select Filters**:

   - Customer Region (North, South, East, West)
   - Gender (Male, Female, Other)
   - Product Category (Clothing, Electronics, Grocery, Other)
   - Tags (New, Sale, Premium, Online)
   - Payment Method (Cash, Card, UPI, NetBanking)

2. **Range Filters**:
   - Age Range (Min/Max numeric inputs)
   - Date Range (Start/End date pickers)

### Features

- **Independent operation** - Each filter works independently
- **Combined filtering** - Multiple filters can be applied simultaneously using MongoDB `$and` logic
- **Clear all filters** - Single button to reset all active filters
- **State preservation** - Filter state persists with search and sort operations

### Implementation

- **Backend**: Filters are combined using MongoDB query operators (`$in` for arrays, `$gte`/`$lte` for ranges)
- **Frontend**: Custom `MultiSelectDropdown` component with checkbox-based selection
- **Validation**: Edge cases handled (invalid ranges, empty selections, conflicting date ranges)

### Code Location

- Backend: `backend/src/services/salesService.js` (lines 48-152)
- Frontend: `frontend/src/components/dashboard/TopBar.jsx`, `frontend/src/components/dashboard/MultiSelectDropdown.jsx`

## Sorting Implementation Summary

Sorting provides flexible data organization with automatic order selection:

### Sort Options

1. **Date** - Newest first (default, descending)
2. **Quantity** - Highest to lowest (descending)
3. **Customer Name** - Alphabetical A-Z (ascending)

### Features

- **Automatic sort order** - Sort order is automatically set based on selected field
- **State preservation** - Sorting works alongside search and filters
- **MongoDB optimized** - Uses indexed field sorting for performance

### Implementation

- **Backend**: MongoDB `sort()` method with dynamic field and direction
- **Frontend**: Sort state managed in `useSalesQueryState` hook with automatic order assignment
- **Default behavior**: Newest date first for initial load

### Code Location

- Backend: `backend/src/services/salesService.js` (lines 154-160)
- Frontend: `frontend/src/hooks/useSalesQueryState.js`, `frontend/src/components/dashboard/TopBar.jsx`

## Pagination Implementation Summary

Pagination ensures efficient data loading with consistent page sizes:

### Features

- **Fixed page size** - 10 items per page (configurable via `PAGE_SIZE` constant)
- **Navigation controls** - Previous/Next buttons with disabled states at boundaries
- **Page information** - Displays current page, total pages, and item range
- **State preservation** - Pagination state maintained across search, filter, and sort operations
- **Auto-reset** - Automatically resets to page 1 when filters/search/sort changes

### Implementation

- **Backend**: MongoDB `skip()` and `limit()` for efficient pagination
- **Frontend**: Page state in `useSalesQueryState`, pagination component shows current/total pages
- **Meta information**: Returns total items, total pages, and current page in API response

### Code Location

- Backend: `backend/src/services/salesService.js` (lines 28, 162-163, 200-206)
- Frontend: `frontend/src/components/dashboard/Pagination.jsx`, `frontend/src/hooks/useSalesQueryState.js`

## Setup Instructions

### Prerequisites

- Node.js (v16 or higher)
- MongoDB (local or cloud instance)
- npm or yarn package manager

### Backend Setup

1. **Navigate to backend directory**:

   ```bash
   cd backend
   ```

2. **Install dependencies**:

   ```bash
   npm install
   ```

3. **Configure environment variables**:
   Create a `.env` file in the `backend` directory:

   ```env
   MONGODB_URI=your_mongo_uri
   FRONTEND_URL=http://localhost:5173
   CSV_PATH=./data.csv
   ```

4. **Seed the database**:

   ```bash
   npm run seed
   ```

5. **Start the backend server**:
   ```bash
   npm run dev
   ```
   Server will run on `http://localhost:5000`

### Frontend Setup

1. **Navigate to frontend directory**:

   ```bash
   cd frontend
   ```

2. **Install dependencies**:

   ```bash
   npm install
   ```

3. **Configure environment variables**:
   Create a `.env` file in the `frontend` directory:

   ```env
   VITE_API_BASE_URL=http://localhost:5000/api
   ```

4. **Start the development server**:
   ```bash
   npm run dev
   ```
   Application will run on `http://localhost:5173`

## Architecture

### Backend Architecture

The backend follows a layered architecture pattern:

```
backend/
├── src/
│   ├── index.js              # Application entry point, Express setup
│   ├── models/
│   │   └── Sale.js           # Mongoose schema definition
│   ├── routes/
│   │   └── salesRoutes.js    # API route definitions
│   ├── services/
│   │   └── salesService.js   # Business logic and database queries
│   └── utils/
│       └── seedFromCsv.js    # Database seeding utility
```

**Flow**:

1. **index.js** - Initializes Express app, connects to MongoDB, sets up middleware and routes
2. **routes/salesRoutes.js** - Handles HTTP requests, delegates to service layer
3. **services/salesService.js** - Contains query logic, filtering, sorting, pagination
4. **models/Sale.js** - Defines data structure and validation rules

### Frontend Architecture

The frontend uses component-based architecture with custom hooks:

```
frontend/
├── src/
│   ├── main.jsx              # Application entry point
│   ├── App.jsx               # Root component with layout
│   ├── api.js                # Axios instance configuration
│   ├── pages/
│   │   └── Dashboard.jsx     # Main dashboard page
│   ├── components/
│   │   ├── dashboard/
│   │   │   ├── TopBar.jsx           # Search, filters, sort controls
│   │   │   ├── MultiSelectDropdown.jsx  # Reusable filter dropdown
│   │   │   ├── SalesTable.jsx       # Data table display
│   │   │   ├── SummaryCards.jsx     # Statistics cards
│   │   │   └── Pagination.jsx       # Page navigation
│   │   └── layout/
│   │       └── Sidebar.jsx          # Navigation sidebar
│   └── hooks/
│       ├── useSalesData.js          # Data fetching hook
│       └── useSalesQueryState.js    # Query state management
```

**Flow**:

1. **Dashboard.jsx** - Orchestrates all components and manages data flow
2. **useSalesQueryState** - Manages all filter, search, sort, and pagination state
3. **useSalesData** - Fetches data from API based on query state
4. **Components** - Display data and handle user interactions
5. **api.js** - Centralized HTTP client configuration

### Data Flow

```
User Interaction (Filter/Search/Sort)
    ↓
TopBar Component → update() function
    ↓
useSalesQueryState Hook → State Update
    ↓
useSalesData Hook → Detects state change
    ↓
API Request (Axios) → /api/sales?params
    ↓
Backend Route → salesRoutes.js
    ↓
Service Layer → salesService.js
    ↓
MongoDB Query → Database
    ↓
Response → Frontend
    ↓
State Update → Components Re-render
    ↓
UI Update → Dashboard, Table, Pagination
```

### Module Responsibilities

#### Backend Modules

**index.js**

- Express application initialization
- Middleware setup (CORS, JSON parsing)
- MongoDB connection
- Route registration
- Error handling middleware
- Server startup

**models/Sale.js**

- Defines Sale schema with all fields
- Specifies data types and validation
- No timestamps (as per requirements)

**routes/salesRoutes.js**

- Defines `/api/sales` endpoint
- Handles GET requests
- Calls service layer
- Error handling and response formatting

**services/salesService.js**

- Query parameter parsing and validation
- MongoDB query construction
- Search implementation (regex)
- Filter implementation (multi-select, ranges)
- Sort implementation
- Pagination logic
- Aggregation for summary statistics
- Edge case handling

**utils/seedFromCsv.js**

- Reads CSV file
- Parses and validates data
- Transforms data types (dates, numbers)
- Inserts data into MongoDB
- Handles duplicates and errors

#### Frontend Modules

**App.jsx**

- Root component
- Layout structure (Sidebar + Main content)
- Routing setup (if needed)

**pages/Dashboard.jsx**

- Main dashboard container
- Coordinates all dashboard components
- Manages refresh functionality
- Error display

**hooks/useSalesQueryState.js**

- Centralized state management for all query parameters
- Provides `update()` function for state changes
- Auto-resets page to 1 on filter/search/sort changes
- Sets appropriate sort order based on sort field

**hooks/useSalesData.js**

- Fetches data from API
- Converts state to query parameters
- Manages loading and error states
- Triggers refetch on state changes

**components/dashboard/TopBar.jsx**

- Search input field
- All filter controls (dropdowns, inputs)
- Sort dropdown
- Clear filters button
- Active filter detection

**components/dashboard/MultiSelectDropdown.jsx**

- Reusable multi-select dropdown component
- Checkbox-based selection
- Shows selected count
- Click-outside to close

**components/dashboard/SalesTable.jsx**

- Displays transaction data in table format
- Handles loading state
- Empty state message
- Responsive table with horizontal scroll
- Date formatting

**components/dashboard/SummaryCards.jsx**

- Displays aggregated statistics
- Total units sold
- Total amount
- Total discount
- Currency formatting

**components/dashboard/Pagination.jsx**

- Previous/Next navigation
- Current page and total pages display
- Item range display
- Disabled states for boundaries

**components/layout/Sidebar.jsx**

- Navigation menu
- Brand/logo display
- User information

**api.js**

- Axios instance configuration
- Base URL setup from environment variables
- Centralized API client

## API Endpoints

### GET /api/sales

Retrieves paginated, filtered, and sorted sales data.

**Query Parameters**:

- `search` (string) - Search term for customer name or phone
- `regions` (string) - Comma-separated region values
- `genders` (string) - Comma-separated gender values
- `ageMin` (number) - Minimum age
- `ageMax` (number) - Maximum age
- `categories` (string) - Comma-separated category values
- `tags` (string) - Comma-separated tag values
- `paymentMethods` (string) - Comma-separated payment method values
- `startDate` (string) - Start date (YYYY-MM-DD)
- `endDate` (string) - End date (YYYY-MM-DD)
- `sortBy` (string) - Sort field: "date", "quantity", "customerName"
- `sortOrder` (string) - Sort direction: "asc" or "desc"
- `page` (number) - Page number (default: 1)

**Response**:

```json
{
  "data": [...],
  "meta": {
    "page": 1,
    "pageSize": 10,
    "totalItems": 100,
    "totalPages": 10
  },
  "summary": {
    "totalUnits": 500,
    "totalAmount": 125000,
    "totalDiscount": 5000
  }
}
```

## Environment Variables

### Backend (.env)

- `MONGODB_URI` - MongoDB connection string
- `PORT` - Server port (default: 5000)
- `FRONTEND_URL` - Frontend URL for CORS
- `CSV_PATH` - Path to CSV file for seeding

### Frontend (.env)

- `VITE_API_BASE_URL` - Backend API base URL

## Development Scripts

### Backend

- `npm start` - Start production server
- `npm run dev` - Start development server with nodemon
- `npm run seed` - Seed database from CSV

### Frontend

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build

## Edge Case Handling

The application handles various edge cases:

1. **Invalid date ranges** - Returns empty results if start > end
2. **Invalid age ranges** - Returns empty results if min > max
3. **Empty search results** - Shows appropriate message
4. **Invalid numeric inputs** - Validated and handled gracefully
5. **Missing optional fields** - Uses null coalescing in aggregation
6. **Special characters in search** - Properly escaped for regex
7. **Large filter combinations** - Efficiently handled by MongoDB
8. **No matching records** - Returns empty array with proper meta information

## License

This project is proprietary software developed for TruEstate.
