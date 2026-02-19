import { Routes, Route, Navigate } from 'react-router-dom';
import Layout from './components/Layout';
import Login from './pages/Login';
import Register from './pages/Register';
import ForgotPassword from './pages/ForgotPassword';
import Dashboard from './pages/Dashboard';
import Marketplace from './pages/Marketplace';
import CreateLoan from './pages/CreateLoan';
import MyLoans from './pages/MyLoans';
import LoanDetails from './pages/LoanDetails';
import Profile from './pages/Profile';
import LandingPage from './pages/LandingPage';
import AboutPage from './pages/AboutPage';
import PrivacyPage from './pages/PrivacyPage';
import TermsPage from './pages/TermsPage';
import ContactPage from './pages/ContactPage';
import LendMoney from './pages/LendMoney';
import { useAuth } from './context/AuthContext';

// Protected Route Component
const ProtectedRoute = ({ children }) => {
  const { user, loading } = useAuth();

  if (loading) return <div>Loading...</div>;
  if (!user) return <Navigate to="/login" />;

  return children;
};

// Public Route (redirect to dashboard if already logged in)
const PublicRoute = ({ children }) => {
  const { user, loading } = useAuth();

  if (loading) return <div>Loading...</div>;
  if (user) return <Navigate to="/" />;

  return children;
};

function App() {
  const { user } = useAuth();

  return (
    <Routes>
      {/* Public Pages */}
      <Route path="/about" element={<AboutPage />} />
      <Route path="/privacy" element={<PrivacyPage />} />
      <Route path="/terms" element={<TermsPage />} />
      <Route path="/contact" element={<ContactPage />} />

      {/* Landing Page is root if not logged in */}
      <Route path="/" element={
        user ? <Layout /> : <LandingPage />
      }>
        <Route index element={
          user ? <Dashboard /> : <LandingPage />
        } />
        {/* Protected Dashboard Routes */}
        <Route path="dashboard" element={<Navigate to="/" replace />} />
        <Route path="marketplace" element={<Marketplace />} />
        <Route path="create-loan" element={<CreateLoan />} />
        <Route path="lend-money" element={<LendMoney />} />
        <Route path="my-loans" element={<MyLoans />} />
        <Route path="loans/:id" element={<LoanDetails />} />
        <Route path="profile" element={<Profile />} />
      </Route>

      <Route path="/login" element={
        <PublicRoute>
          <Login />
        </PublicRoute>
      } />

      <Route path="/register" element={
        <PublicRoute>
          <Register />
        </PublicRoute>
      } />

      <Route path="/forgot-password" element={
        <PublicRoute>
          <ForgotPassword />
        </PublicRoute>
      } />
    </Routes>
  );
}

export default App;
