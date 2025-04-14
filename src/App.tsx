
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useEffect, useState } from "react";
import Index from "./pages/Index";
import DoctorsPage from "./pages/DoctorsPage";
import BookAppointmentPage from "./pages/BookAppointmentPage";
import AiNursePage from "./pages/AiNursePage";
import NotFound from "./pages/NotFound";
import SignInPage from "./pages/SignInPage";
import SignUpPage from "./pages/SignUpPage";
import NearbyHospitalsPage from "./pages/NearbyHospitalsPage";

const queryClient = new QueryClient();

// Protected route component
const ProtectedRoute = ({ children }: { children: JSX.Element }) => {
  const isAuthenticated = localStorage.getItem('user') !== null;
  
  if (!isAuthenticated) {
    return <Navigate to="/signin" />;
  }
  
  return children;
};

const App = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  
  useEffect(() => {
    // This ensures that client-side auth check is done after hydration
    setIsLoaded(true);
  }, []);

  if (!isLoaded) {
    return null; // Return nothing until the client-side code has loaded
  }

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/doctors" element={
              <ProtectedRoute>
                <DoctorsPage />
              </ProtectedRoute>
            } />
            <Route path="/book-appointment/:doctorId" element={
              <ProtectedRoute>
                <BookAppointmentPage />
              </ProtectedRoute>
            } />
            <Route path="/ai-nurse" element={
              <ProtectedRoute>
                <AiNursePage />
              </ProtectedRoute>
            } />
            <Route path="/nearby-hospitals" element={
              <ProtectedRoute>
                <NearbyHospitalsPage />
              </ProtectedRoute>
            } />
            <Route path="/signin" element={<SignInPage />} />
            <Route path="/signup" element={<SignUpPage />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
