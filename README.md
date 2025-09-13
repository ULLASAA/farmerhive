# farmerhive: P2P Agricultural Rental Marketplace

farmerhive is a modern, full-stack web application built with Next.js that serves as a peer-to-peer marketplace for farmers. It allows them to rent out and borrow agricultural tools, as well as buy and sell supplies like seeds, fertilizers, and pesticides. The platform is designed to connect farming communities and make resources more accessible.

## ✨ Key Features

-   **Peer-to-Peer Rentals**: Enables farmers to list their own equipment for rent, turning idle tools into a source of income.

-   **Online Booking and Payments**: Streamlines the rental process with a secure, integrated system for reservations and payments.

-   **Marketplace**: Features a marketplace for farmers to conveniently buy and sell essential supplies like seeds and fertilizers.

-   **Bargaining System**: Facilitates fair negotiations by allowing renters and owners to propose and agree on prices and terms.

-   **AI-Powered Demand Forecasting**: Matches tool supply with local demand by analyzing regional data and seasonal trends.

-   **AI Bargaining Assistant**: Enhances negotiations with AI-driven suggestions for fair rental prices and terms.

-   **Admin Dashboard**: Provides a comprehensive dashboard for administrators to monitor revenue, transactions, and user activity.

-   **Security Monitoring**: Ensures platform integrity by tracking overdue items and monitoring the location of high-value tools.

-   **User Profiles and Reviews**: Builds community trust with detailed user profiles, ratings, and reviews from other farmers.

-   **Real-Time Notifications**: Keeps users updated with instant alerts for new offers, responses, and booking confirmations.

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

## 💡 Applications and Future Enhancements

### Applications

-   **Economic Empowerment**: By allowing farmers to monetize underutilized assets, the platform can stimulate local rural economies and provide a new source of income.
-   **Increased Accessibility**: Small-scale farmers and new entrants to agriculture can gain access to expensive, specialized equipment they might not be able to afford, improving their productivity and yield.
-   **Sustainable Agriculture**: Promoting a sharing economy for agricultural tools reduces the overall demand for new manufacturing, leading to a lower carbon footprint and less waste.

### Future Enhancements

-   **IoT Integration**: Incorporate IoT sensors on high-value equipment for real-time location tracking and monitoring of usage, enhancing security and trust.
-   **Advanced Weather & Crop Integration**: Enhance the AI demand forecast to incorporate real-time weather data and allow users to specify their crop types for hyper-personalized tool recommendations.
-   **Native Mobile Applications**: Develop dedicated mobile apps for iOS and Android to provide a more accessible and convenient user experience for farmers in the field.
-   **Integrated Insurance Options**: Partner with insurance providers to offer on-demand coverage for rented equipment, giving both owners and renters peace of mind.
