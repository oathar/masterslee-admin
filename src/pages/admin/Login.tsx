
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import LoginForm from "@/components/auth/LoginForm";
import { useAuth } from "@/context/AuthContext";

const Login = () => {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();

  useEffect(() => {
    // Check if already authenticated using our context
    if (isAuthenticated) {
      navigate("/admin/dashboard");
    }
  }, [navigate, isAuthenticated]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 bg-gradient-to-b from-blue-50 to-sky-100">
      <div className="w-full max-w-md space-y-4 text-center mb-10 animate-slide-down">
        <h1 className="text-3xl font-semibold tracking-tight">Admin Portal</h1>
        <p className="text-muted-foreground">Manage your website content</p>
      </div>
      <LoginForm />
    </div>
  );
};

export default Login;
