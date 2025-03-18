
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import { ProgramProvider } from "./context/ProgramContext";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";

// Admin routes
import AdminLayout from "./components/admin/AdminLayout";
import Login from "./pages/admin/Login";
import Dashboard from "./pages/admin/Dashboard";
import AddProgram from "./pages/admin/AddProgram";
import AddBlog from "./pages/admin/AddBlog";
import EditProgram from "./pages/admin/EditProgram";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <ProgramProvider>
        <TooltipProvider>
          <Toaster />
          <Sonner 
            position="top-right"
            toastOptions={{
              classNames: {
                toast: "animate-slide-down" 
              }
            }}
          />
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Index />} />
              
              {/* Admin routes */}
              <Route path="/admin/login" element={<Login />} />
              <Route path="/admin" element={<AdminLayout />}>
                <Route path="dashboard" element={<Dashboard />} />
                <Route path="add-program" element={<AddProgram />} />
                <Route path="add-blog" element={<AddBlog />} />
                <Route path="edit-program/:id" element={<EditProgram />} />
              </Route>
              
              {/* 404 fallback */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </TooltipProvider>
      </ProgramProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
