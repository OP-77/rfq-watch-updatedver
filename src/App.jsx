import { Toaster } from "@/components/ui/toaster"
import { QueryClientProvider } from '@tanstack/react-query'
import { queryClientInstance } from '@/lib/query-client'
import { BrowserRouter as Router, Navigate, Route, Routes } from 'react-router-dom';
import PageNotFound from './lib/PageNotFound';
import { AuthProvider, useAuth } from '@/lib/AuthContext';
import UserNotRegisteredError from '@/components/UserNotRegisteredError';
import ScrollToTop from './components/ScrollToTop';
import ProtectedRoute from '@/components/ProtectedRoute';
import Home from '@/pages/Home';
import Login from '@/pages/Login';
import FreeTrialHome from '@/pages/FreeTrialHome';
import CreateAccountExisting from '@/pages/CreateAccountExisting';
import CreateAccount from '@/pages/CreateAccount';
import RecipientsNew from '@/pages/RecipientsNew';
import Payment from '@/pages/Payment';
import OrderConfirmation from '@/pages/OrderConfirmation';
import ManageRecipients from '@/pages/ManageRecipients';
import NewCustomerPayment from '@/pages/NewCustomerPayment';
import RecipientsExisting from '@/pages/RecipientsExisting';
import Dashboard from '@/pages/Dashboard';

const AuthenticatedApp = () => {
  const { isLoadingAuth, isLoadingPublicSettings, authError, navigateToLogin } = useAuth();

  // Show loading spinner while checking app public settings or auth
  if (isLoadingPublicSettings || isLoadingAuth) {
    return (
      <div className="fixed inset-0 flex items-center justify-center">
        <div className="w-8 h-8 border-4 border-slate-200 border-t-slate-800 rounded-full animate-spin"></div>
      </div>
    );
  }

  // Handle authentication errors
  if (authError) {
    if (authError.type === 'user_not_registered') {
      return <UserNotRegisteredError />;
    } else if (authError.type === 'auth_required') {
      // Redirect to login automatically
      navigateToLogin();
      return null;
    }
  }

  // Render the main app
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route element={<ProtectedRoute unauthenticatedElement={<Navigate to="/login" replace />} />}>
        <Route path="/" element={<Home />} />
        <Route path="/free-trial" element={<FreeTrialHome />} />
        <Route path="/create-account-existing" element={<CreateAccountExisting />} />
        <Route path="/create-account-new" element={<CreateAccount />} />
        <Route path="/recipients-new" element={<RecipientsNew />} />
        <Route path="/recipients-existing" element={<RecipientsExisting />} />
        <Route path="/existing-customer-payment" element={<Payment />} />
        <Route path="/new-customer-payment" element={<NewCustomerPayment />} />
        <Route path="/order-confirmation" element={<OrderConfirmation />} />
        <Route path="/manage-recipients" element={<ManageRecipients />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/new-customer-payment" element={<NewCustomerPayment />} />
      </Route>
      <Route path="*" element={<PageNotFound />} />
    </Routes>
  );
};


function App() {

  return (
    <AuthProvider>
      <QueryClientProvider client={queryClientInstance}>
        <Router>
          <ScrollToTop />
          <AuthenticatedApp />
        </Router>
        <Toaster />
      </QueryClientProvider>
    </AuthProvider>
  )
}

export default App