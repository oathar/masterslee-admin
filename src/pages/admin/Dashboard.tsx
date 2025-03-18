
import { useState } from "react";
import { Link } from "react-router-dom";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { PlusIcon, FileTextIcon, RefreshCwIcon } from "lucide-react";
import { usePrograms } from "@/context/ProgramContext";

const Dashboard = () => {
  const { programs } = usePrograms();
  const [isLoading, setIsLoading] = useState(false);

  const handleRefresh = () => {
    setIsLoading(true);
    // Simulate a refresh delay
    setTimeout(() => {
      setIsLoading(false);
    }, 800);
  };

  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-semibold tracking-tight">Dashboard</h1>
          <p className="text-muted-foreground mt-1">
            Manage your programs and content
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" onClick={handleRefresh}>
            <RefreshCwIcon className="h-4 w-4 mr-2" />
            Refresh
          </Button>
          <Button asChild>
            <Link to="/admin/add-program">
              <PlusIcon className="h-4 w-4 mr-2" />
              Add Program
            </Link>
          </Button>
        </div>
      </div>

      <div className="grid gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Recent Programs</CardTitle>
            <CardDescription>
              View and manage your recently created programs
            </CardDescription>
          </CardHeader>
          <CardContent>
            {isLoading ? (
              // Skeleton loading state
              <div className="space-y-4">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="flex items-center justify-between p-4 border rounded-md">
                    <div className="space-y-2">
                      <Skeleton className="h-4 w-[250px]" />
                      <Skeleton className="h-3 w-[120px]" />
                    </div>
                    <Skeleton className="h-9 w-[100px]" />
                  </div>
                ))}
              </div>
            ) : programs.length > 0 ? (
              <div className="divide-y">
                {programs.map((program) => (
                  <div key={program.id} className="flex items-center justify-between p-4 hover:bg-muted/50 transition-colors rounded-md">
                    <div>
                      <h3 className="font-medium">{program.title}</h3>
                      <p className="text-sm text-muted-foreground">
                        {program.university} • Created on {new Date(program.createdAt).toLocaleDateString()}
                      </p>
                    </div>
                    <Button variant="outline" size="sm" asChild>
                      <Link to={`/admin/edit-program/${program.id}`}>
                        <FileTextIcon className="h-4 w-4 mr-2" />
                        Edit
                      </Link>
                    </Button>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-6">
                <p className="text-muted-foreground">No programs found</p>
                <Button className="mt-4" asChild>
                  <Link to="/admin/add-program">Create your first program</Link>
                </Button>
              </div>
            )}
          </CardContent>
          <CardFooter className="border-t px-6 py-4">
            <p className="text-sm text-muted-foreground">
              Programs are stored locally and will persist between sessions.
            </p>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;
