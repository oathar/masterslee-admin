
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "sonner";
import { LockIcon, UserIcon } from "lucide-react";
import { useAuth } from "@/context/AuthContext";

const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      // Simple validation
      if (!email || !password) {
        throw new Error("Please enter both email and password");
      }
      
      // Use our authentication context for login
      const success = await login(email, password);
      
      if (success) {
        toast.success("Login successful");
        navigate("/admin/dashboard");
      } else {
        throw new Error("Invalid credentials");
      }
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Login failed");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className="w-full max-w-md mx-auto animate-fade-in glass-morphism">
      <CardHeader className="space-y-1">
        <CardTitle className="text-2xl font-medium">Admin Login</CardTitle>
        <CardDescription>
          Enter your credentials to access the admin portal
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleLogin} className="space-y-4">
          <div className="space-y-2">
            <div className="relative">
              <UserIcon className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input
                type="email"
                placeholder="Email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="pl-10 focus-ring"
                disabled={isLoading}
                required
              />
            </div>
          </div>
          <div className="space-y-2">
            <div className="relative">
              <LockIcon className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="pl-10 focus-ring"
                disabled={isLoading}
                required
              />
            </div>
          </div>
          <Button
            type="submit"
            className="w-full transition-all duration-200"
            disabled={isLoading}
          >
            {isLoading ? "Signing in..." : "Sign in"}
          </Button>
        </form>
      </CardContent>
      <CardFooter className="flex flex-col items-center">
        <p className="text-sm text-muted-foreground mt-2">
          For demo, use: admin@example.com / admin123
        </p>
      </CardFooter>
    </Card>
  );
};

export default LoginForm;
