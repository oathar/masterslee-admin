
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeftIcon } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";

// Mock program data - will be replaced with actual data from Supabase
const mockPrograms = [
  { id: "1", title: "Summer Workshop 2023", description: "A summer workshop for kids", price: "299", date: "2023-07-15" },
  { id: "2", title: "Fall Seminar Series", description: "Professional development series", price: "499", date: "2023-09-22" },
  { id: "3", title: "Winter Leadership Program", description: "Leadership training for executives", price: "999", date: "2023-12-10" },
];

const EditProgram = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [program, setProgram] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate fetching program data
    const fetchProgram = async () => {
      setLoading(true);
      try {
        // In a real app, this would be a call to your Supabase backend
        await new Promise(resolve => setTimeout(resolve, 800)); // Simulate network delay
        
        const foundProgram = mockPrograms.find(p => p.id === id);
        if (foundProgram) {
          setProgram(foundProgram);
        } else {
          // Program not found
          navigate("/admin/dashboard", { replace: true });
        }
      } catch (error) {
        console.error("Error fetching program:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProgram();
  }, [id, navigate]);

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Button
          variant="outline"
          size="icon"
          onClick={() => navigate(-1)}
          className="h-8 w-8"
        >
          <ArrowLeftIcon className="h-4 w-4" />
        </Button>
        <h1 className="text-2xl font-semibold tracking-tight">
          {loading ? <Skeleton className="h-8 w-64" /> : `Edit Program: ${program?.title}`}
        </h1>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Program Details</CardTitle>
          <CardDescription>
            Update the information for this program
          </CardDescription>
        </CardHeader>
        <CardContent>
          {loading ? (
            <div className="space-y-4">
              <Skeleton className="h-10 w-full" />
              <Skeleton className="h-20 w-full" />
              <Skeleton className="h-10 w-full" />
              <Skeleton className="h-10 w-full" />
            </div>
          ) : (
            <div className="space-y-4">
              <p>Edit form will go here. This is a placeholder.</p>
              <p>Program ID: {program?.id}</p>
              <p>Title: {program?.title}</p>
              <p>Description: {program?.description}</p>
              <p>Price: ${program?.price}</p>
              <p>Date: {program?.date}</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default EditProgram;
