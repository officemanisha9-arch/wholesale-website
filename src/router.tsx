import React from 'react';
import {
  createRootRoute,
  createRoute,
  createRouter,
  Outlet,
  RouterProvider
} from '@tanstack/react-router';
import { Navbar } from './components/layout/Navbar';
import { Footer } from './components/layout/Footer';
import { CurrencyRegionModal } from './components/modals/CurrencyRegionModal';
import { DeliveryLocationMapModal } from './components/modals/DeliveryLocationMapModal';
import { ImageSearchModal } from './components/modals/ImageSearchModal';
import { QuickViewModal } from './components/modals/QuickViewModal';
import { ContactSupplierModal } from './components/modals/ContactSupplierModal';
import { AuthModal } from './components/modals/AuthModal';
import { ToastContainer } from './components/common/ToastContainer';

// Pages
import { HomePage } from './pages/HomePage';
import { ProductListingPage } from './pages/ProductListingPage';
import { ProductDetailPage } from './pages/ProductDetailPage';
import { ManufacturersPage } from './pages/ManufacturersPage';
import { RFQPage } from './pages/RFQPage';
import { AISourcingPage } from './pages/AISourcingPage';
import { CartPage } from './pages/CartPage';
import { CheckoutPage } from './pages/CheckoutPage';
import { OrdersPage } from './pages/OrdersPage';
import { MessagesPage } from './pages/MessagesPage';
import { BuyerCentralPage } from './pages/BuyerCentralPage';
import { SellerCentralPage } from './pages/SellerCentralPage';
import { AccountPage } from './pages/AccountPage';
import { AuthPage } from './pages/AuthPage';
import { NotFoundPage } from './pages/NotFoundPage';

// Root Layout Component
const RootLayout: React.FC = () => {
  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', background: '#f4f5f7' }}>
      <Navbar />
      <main style={{ flex: 1 }}>
        <Outlet />
      </main>
      <Footer />

      {/* Global Modals & Notifications */}
      <CurrencyRegionModal />
      <DeliveryLocationMapModal />
      <ImageSearchModal />
      <QuickViewModal />
      <ContactSupplierModal />
      <AuthModal />
      <ToastContainer />
    </div>
  );
};

// 1. Root Route
const rootRoute = createRootRoute({
  component: RootLayout,
  notFoundComponent: NotFoundPage
});

// 2. Child Routes
const indexRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/',
  component: HomePage
});

const productsRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/products',
  component: ProductListingPage
});

const productDetailRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/product/$productId',
  component: ProductDetailPage
});

const manufacturersRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/manufacturers',
  component: ManufacturersPage
});

const rfqRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/rfq',
  component: RFQPage
});

const aiSourcingRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/ai-sourcing',
  component: AISourcingPage
});

const cartRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/cart',
  component: CartPage
});

const checkoutRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/checkout',
  component: CheckoutPage
});

const ordersRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/orders',
  component: OrdersPage
});

const messagesRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/messages',
  component: MessagesPage
});

const buyerCentralPage = createRoute({
  getParentRoute: () => rootRoute,
  path: '/buyer-central',
  component: BuyerCentralPage
});

const sellerCentralRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/sell',
  component: SellerCentralPage
});

const accountRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/account',
  component: AccountPage
});

const loginRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/login',
  component: AuthPage
});

const registerRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/register',
  component: AuthPage
});

// 3. Assemble Route Tree
const routeTree = rootRoute.addChildren([
  indexRoute,
  productsRoute,
  productDetailRoute,
  manufacturersRoute,
  rfqRoute,
  aiSourcingRoute,
  cartRoute,
  checkoutRoute,
  ordersRoute,
  messagesRoute,
  buyerCentralPage,
  sellerCentralRoute,
  accountRoute,
  loginRoute,
  registerRoute
]);

// 4. Create TanStack Router
export const router = createRouter({
  routeTree,
  defaultPreload: 'intent',
  defaultNotFoundComponent: NotFoundPage
});

// 5. Register router type for strict type-safety
declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router;
  }
}
