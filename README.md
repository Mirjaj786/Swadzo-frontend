# Swadzo Frontend

The **Swadzo Frontend** is the customer-facing interface of the food delivery application. It provides an intuitive and responsive user experience for browsing menus, managing cart items, and placing orders securely.

## 🚀 Features

*   **Responsive Design**: Optimized for both desktop and mobile devices.
*   **Menu Browsing**: Browse a wide variety of food items filtered by categories.
*   **Smart Search**: Quickly find specific dishes.
*   **Cart Management**:
    *   Add/Remove items.
    *   Real-time total calculation.
*   **Secure Checkout**:
    *   Integrated with **Stripe** for secure payments.
    *   **Stateless Flow**: Orders are only submitted to the backend *after* payment confirmation.
*   **Order Tracking**:
    *   "My Orders" page shows real-time status updates from the kitchen.
    *   **Skeleton Loading**: Smooth shimmer animations during data fetching.
*   **User Reviews**:
    *   **Average Rating**: Displays the calculated average score for each food item.
    *   **Review Management**: Users can delete their own reviews (Authorization check enforced).
    *   **Anti-Spam**: One user can only leave one review per item.
*   **Password Recovery**:
    *   **Forgot Password**: Request a reset link via email.
    *   **Reset Password**: Securely update password using a time-limited token.

## 🛠️ Tech Stack

*   **Framework**: React.js (via Vite)
*   **Routing**: React Router DOM
*   **State Management**: Context API
*   **HTTP Client**: Axios
*   **Styling**: Vanilla CSS / Modules
*   **Notifications**: React Toastify

## 📦 Installation

1.  Navigate to the `frontend` directory:
    ```bash
    cd frontend
    ```
2.  Install dependencies:
    ```bash
    npm install
    ```
3.  Configure Environment Variables:
    Create a `.env` file (if not present) and add your backend URL (or check `StoreContext.jsx` for default configuration).
4.  Run the development server:
    ```bash
    npm run dev
    ```
    The app will typically look for the backend at `http://localhost:4000`.

## 📂 Key Directories

*   `src/pages`: Main application pages (Home, Cart, PlaceOrder, MyOrders, Verify).
*   `src/components`: Reusable UI components (Navbar, FoodItem, ExploreMenu).
*   `src/context`: Global state management (StoreContext).
*   `src/assets`: Images and icons.

## 🧪 Usage

*   **Login**: Use the popup login to authenticate.
*   **Order**: Navigate to Cart -> Checkout.
*   **Verify**: After payment, you are redirected to the Verify page which confirms the transaction with the backend.

---
*Built for the Swadzo Food Delivery Ecosystem.*
