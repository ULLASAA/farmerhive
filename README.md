# farmerhive: P2P Agricultural Rental Marketplace

farmerhive is a modern, full-stack web application built with Next.js that serves as a peer-to-peer marketplace for farmers. It allows them to rent out and borrow agricultural tools, as well as buy and sell supplies like seeds, fertilizers, and pesticides. The platform is designed to connect farming communities and make resources more accessible.

## ✨ Key Features

-   **Peer-to-Peer Rentals**: Empower individual farmers by allowing them to list their own equipment for rent. This creates a dynamic, community-driven inventory where users can find everything from tractors to specialized attachments. By turning idle tools into a source of income, the platform fosters a collaborative and resourceful farming ecosystem.

-   **Online Booking and Payments**: Streamline the rental process with a secure and integrated booking system. Users can check availability, make reservations, and complete payments directly through the platform. This eliminates the need for manual coordination and provides a seamless, professional experience for both the tool owner and the renter.

-   **Marketplace**: In addition to rentals, farmerhive features a marketplace for purchasing essential farming supplies. Farmers can conveniently buy and sell items like seeds, pesticides, and fertilizers. This centralizes resource management and ensures that farmers have access to everything they need for a successful season.

-   **Bargaining System**: Facilitate fair negotiations with a built-in bargaining system. Renters can propose alternative prices and terms, and owners can respond directly. This ensures that both parties can agree on a deal that works for them, promoting flexibility and user satisfaction.

-   **AI-Powered Demand Forecasting**: Leverage the power of artificial intelligence to match supply with local demand. The platform analyzes regional data, seasonal crop cycles, and historical trends to predict which tools will be most needed. This provides valuable insights to administrators and helps ensure that the right equipment is available at the right time.

-   **AI Bargaining Assistant**: Enhance negotiations with AI-driven suggestions. The bargaining assistant analyzes market conditions and item details to recommend fair rental prices and terms. This helps users make informed offers and counter-offers, leading to more successful agreements.

-   **Admin Dashboard**: A comprehensive dashboard for platform administrators to monitor revenue, transactions, and user activity. This central hub provides critical business intelligence for managing the platform effectively.

-   **Security Monitoring**: Ensure platform integrity by tracking overdue items and flagging them for review. The system allows administrators to monitor the location of high-value tools, enabling quick action to prevent loss and maintain trust.

-   **User Profiles and Reviews**: Build trust within the community with detailed user profiles. View an owner's complete listings, read reviews from other farmers, and check their overall rating before entering into a transaction.

-   **Real-Time Notifications**: Stay updated with instant notifications for new offers, responses, and booking confirmations. This ensures that users never miss an important update and can respond to inquiries promptly.

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
