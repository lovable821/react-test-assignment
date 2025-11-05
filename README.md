# User Management - React Application

A scalable and high-performance React application for displaying and managing user data with filtering and sorting capabilities.

## Features

- ✅ **Data Fetching**: Fetches user data from JSONPlaceholder API
- ✅ **Filterable Table**: Real-time search across all user fields
- ✅ **Sortable Columns**: Click column headers to sort (ascending/descending)
- ✅ **Loading States**: Elegant loading spinner during data fetch
- ✅ **Error Handling**: User-friendly error messages with retry functionality
- ✅ **Responsive Design**: Works seamlessly on desktop and mobile devices
- ✅ **Performance Optimized**: Debounced search, memoized computations, and efficient rendering

## Tech Stack

- **React 18** - Latest React with hooks
- **TypeScript** - Type safety and better developer experience
- **Vite** - Fast build tool and dev server
- **CSS3** - Modern styling with responsive design

## Project Structure

```
src/
├── components/          # React components
│   ├── UserTable.tsx   # Main table component with filtering/sorting
│   ├── Loading.tsx     # Loading state component
│   └── Error.tsx       # Error state component
├── hooks/              # Custom React hooks
│   └── useUsers.ts     # Data fetching hook
├── types/              # TypeScript type definitions
│   └── user.ts         # User data types
├── utils/              # Utility functions
│   ├── debounce.ts     # Debounce utility for search
│   └── tableUtils.ts   # Table filtering and sorting utilities
├── App.tsx             # Main application component
├── main.tsx            # Application entry point
└── index.css           # Global styles
```

## Getting Started

### Prerequisites

- Node.js 16+ and npm/yarn/pnpm

### Installation

1. Install dependencies:
```bash
npm install
```

2. Start the development server:
```bash
npm run dev
```

3. Open your browser and navigate to `http://localhost:5173`

### Build for Production

```bash
npm run build
```

The production build will be in the `dist` directory.

### Preview Production Build

```bash
npm run preview
```

## Features Explained

### Filtering
- Type in the search box to filter users in real-time
- Search works across all fields: ID, Name, Username, Email, Phone, and Company Name
- Debounced input (300ms) for optimal performance

### Sorting
- Click any column header to sort
- Click again to reverse the sort order
- Visual indicators show current sort field and direction

### Performance Optimizations
- **Debounced Search**: Reduces API calls and computation
- **Memoized Filtering/Sorting**: Only recalculates when dependencies change
- **React.memo**: Prevents unnecessary re-renders (ready for future optimization)
- **Efficient Data Structures**: Uses array methods optimized for performance

## Code Quality

- ✅ TypeScript for type safety
- ✅ Clean code architecture with separation of concerns
- ✅ Reusable components and hooks
- ✅ Proper error handling
- ✅ Accessible HTML (ARIA labels, semantic HTML)
- ✅ Responsive design
- ✅ Modern CSS with smooth transitions

## API Endpoint

The application fetches data from:
```
https://jsonplaceholder.typicode.com/users
```

### Configure API via env
You can override the API endpoint via env var (works in dev and build):

Create a `.env` file (or `.env.local`) in project root:
```
VITE_API_URL=https://jsonplaceholder.typicode.com/users
```

If the external API is blocked (e.g., VPN off), the app will automatically fall back to a local mock JSON so you can continue developing.

## Troubleshooting with VPN

- If VPN is ON and `http://localhost:5173` doesn’t load, try `http://127.0.0.1:5173`.
- The dev server is bound to `0.0.0.0` and HMR is configured with `clientPort: 5173` and host `127.0.0.1` to be resilient with VPNs.
- Some VPNs block local network access. Enable “Allow LAN access” (or split tunneling) in your VPN client for `localhost/127.0.0.1`.
- If your VPN forces DNS that breaks `localhost`, use `127.0.0.1` explicitly.

## License

MIT

