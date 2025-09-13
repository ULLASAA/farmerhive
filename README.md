# farmerhive: P2P Agricultural Rental Marketplace

farmerhive is a modern, full-stack web application built with Next.js that serves as a peer-to-peer marketplace for farmers. It allows them to rent out and borrow agricultural tools, as well as buy and sell supplies like seeds, fertilizers, and pesticides. The platform is designed to connect farming communities and make resources more accessible.

## ✨ Key Features

-   **Peer-to-Peer Rentals**: Farmers can easily post their own tools for rent, creating a community-driven inventory.
-   **Online Booking and Payments**: Securely book rentals and process payments directly through the platform.
-   **Marketplace**: Purchase essential farming supplies like seeds, pesticides, and fertilizers.
-   **Bargaining System**: Users can negotiate rental prices and terms directly with the item owner.
-   **AI-Powered Insights**:
    -   **Demand Forecasting**: An AI-driven dashboard matches supply with demand by predicting the need for various tools based on region, season, and crop cycles.
    -   **Bargaining Assistant**: Get AI-powered suggestions for fair rental prices and terms.
-   **Admin Dashboard**: A comprehensive dashboard for platform administrators to monitor revenue, transactions, and user activity.
-   **Security Monitoring**: Track overdue items and take action to ensure platform integrity.
-   **User Profiles**: View profiles of item owners, including their listings and ratings.
-   **Notifications**: Receive real-time notifications for new offers and responses.

## 🚀 Tech Stack

-   **Framework**: [Next.js](https://nextjs.org/) (App Router)
-   **Language**: [TypeScript](https://www.typescriptlang.org/)
-   **AI Integration**: [Genkit](https://firebase.google.com/docs/genkit)
-   **UI**: [React](https://react.dev/)
-   **Styling**: [Tailwind CSS](https://tailwindcss.com/)
-   **Component Library**: [ShadCN UI](https://ui.shadcn.com/)
-   **Icons**: [Lucide React](https://lucide.dev/guide/packages/lucide-react)
-   **Forms**: [React Hook Form](https://react-hook-form.com/) & [Zod](https://zod.dev/)

## 🏁 Getting Started

To get a local copy up and running, follow these simple steps.

### Prerequisites

-   Node.js (v18 or newer)
-   npm or yarn

### Installation

1.  Clone the repository:
    ```sh
    git clone https://github.com/your-repo/farmerhive.git
    ```
2.  Navigate to the project directory:
    ```sh
    cd farmerhive
    ```
3.  Install NPM packages:
    ```sh
    npm install
    ```

### Running the Application

This project requires two separate processes to run concurrently: the Next.js development server and the Genkit AI server.

1.  **Start the Next.js development server:**
    This command runs the main web application.
    ```sh
    npm run dev
    ```
    The application will be available at `http://localhost:9002`.

2.  **Start the Genkit development server:**
    In a separate terminal, run this command to start the Genkit server, which powers the AI features.
    ```sh
    npm run genkit:dev
    ```
    The Genkit development UI will be available at `http://localhost:4000`.

## 📁 Project Structure

```
.
├── src
│   ├── app                 # Next.js App Router pages
│   │   ├── (app)           # Main application routes (authenticated)
│   │   ├── (auth)          # Authentication routes (login, register)
│   │   └── page.tsx        # Landing page
│   ├── ai                  # Genkit AI flows and schemas
│   │   ├── flows           # Genkit flows for AI logic
│   │   └── schemas         # Zod schemas for AI inputs/outputs
│   ├── components          # Shared React components
│   │   └── ui              # ShadCN UI components
│   ├── hooks               # Custom React hooks
│   └── lib                 # Utility functions and shared libraries
└── tailwind.config.ts      # Tailwind CSS configuration
```

This should give you a good starting point for exploring the codebase. Let me know if you have any other questions!
