
import { useState, useEffect } from "react";
import { useNavigate, Outlet, Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { 
  LayoutDashboardIcon, 
  ListPlusIcon, 
  LogOutIcon, 
  MenuIcon, 
  XIcon,
  FileTextIcon 
} from "lucide-react";
import { toast } from "sonner";
import { useIsMobile } from "@/hooks/use-mobile";
import { useAuth } from "@/context/AuthContext";

const AdminLayout = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const navigate = useNavigate();
  const isMobile = useIsMobile();
  const location = useLocation();
  const { isAuthenticated, logout } = useAuth();
  
  useEffect(() => {
    // Check if authenticated using our context
    if (!isAuthenticated) {
      navigate("/admin/login");
    }
    
    // Handle mobile sidebar
    if (isMobile) {
      setIsSidebarOpen(false);
    }
  }, [navigate, isMobile, isAuthenticated]);

  const handleLogout = () => {
    logout();
    toast.success("You have been logged out");
    navigate("/admin/login");
  };

  const navItems = [
    { name: "Dashboard", path: "/admin/dashboard", icon: <LayoutDashboardIcon className="h-4 w-4 mr-2" /> },
    { name: "Add Program", path: "/admin/add-program", icon: <ListPlusIcon className="h-4 w-4 mr-2" /> },
    { name: "Add Blog", path: "/admin/add-blog", icon: <FileTextIcon className="h-4 w-4 mr-2" /> },
  ];

  return (
    <div className="flex h-screen overflow-hidden bg-background">
      {/* Mobile sidebar toggle */}
      <div className="fixed top-4 left-4 z-50 md:hidden">
        <Button
          variant="outline"
          size="icon"
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          className="rounded-full shadow-md"
        >
          {isSidebarOpen ? <XIcon className="h-4 w-4" /> : <MenuIcon className="h-4 w-4" />}
        </Button>
      </div>
      
      {/* Sidebar */}
      <div 
        className={`fixed inset-y-0 left-0 z-40 w-64 transform transition-transform duration-300 ease-in-out 
                    bg-card border-r border-border md:relative md:translate-x-0 shadow-lg
                    ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}
      >
        <div className="flex flex-col h-full">
          <div className="flex items-center justify-center h-16 px-4 py-6 border-b border-border">
            <h1 className="text-xl font-semibold tracking-tight">Admin Portal</h1>
          </div>
          <nav className="flex-1 px-2 py-4 space-y-1">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`flex items-center px-4 py-3 text-sm rounded-md transition-colors duration-200 group focus-ring ${
                  location.pathname === item.path ? 'bg-muted font-medium' : 'hover:bg-muted'
                }`}
                onClick={() => isMobile && setIsSidebarOpen(false)}
              >
                {item.icon}
                <span>{item.name}</span>
              </Link>
            ))}
          </nav>
          <div className="p-4 border-t border-border">
            <Button 
              variant="outline" 
              className="w-full justify-start" 
              onClick={handleLogout}
            >
              <LogOutIcon className="h-4 w-4 mr-2" />
              Sign Out
            </Button>
          </div>
        </div>
      </div>
      
      {/* Overlay for mobile */}
      {isSidebarOpen && isMobile && (
        <div 
          className="fixed inset-0 z-30 bg-black/50"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}
      
      {/* Main content */}
      <div className="flex-1 overflow-auto p-6 pt-16 md:pt-6">
        <main className="max-w-4xl mx-auto animate-fade-in">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
