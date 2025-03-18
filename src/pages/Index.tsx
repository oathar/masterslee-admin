
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowRightIcon, LayoutDashboardIcon } from "lucide-react";

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6 bg-gradient-to-b from-blue-50 to-sky-100">
      <div className="w-full max-w-4xl mx-auto text-center space-y-6 animate-fade-in">
        <div className="space-y-4">
          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl">
            MastersLee-Admin Portal
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Add data to your website with ease
          </p>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
          <Button asChild size="lg" className="animate-slide-up">
            <Link to="/admin/login">
              Go to Admin Portal
              <ArrowRightIcon className="ml-2 h-5 w-5" />
            </Link>
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-16">
         
        </div>
      </div>

     
    </div>
  );
};

export default Index;
