
import React, { createContext, useState, useContext, useEffect } from "react";

export type Program = {
  id: number;
  title: string;
  university: string;
  location: string;
  duration: string;
  createdAt: string;
  acceptanceRate?: string;
  mode?: string;
  deadline?: string;
  scholarships?: string;
  type?: string;
  imageUrl?: string;
  website?: string;
  course?: string;
};

// Define a type for the data needed to add a new program
export type NewProgram = Omit<Program, "id" | "createdAt">;

interface ProgramContextType {
  programs: Program[];
  addProgram: (program: NewProgram) => void;
}

const ProgramContext = createContext<ProgramContextType | undefined>(undefined);

export const ProgramProvider = ({ children }: { children: React.ReactNode }) => {
  const [programs, setPrograms] = useState<Program[]>([]);

  // Initialize with stored programs from localStorage if available
  useEffect(() => {
    const storedPrograms = localStorage.getItem("programs");
    if (storedPrograms) {
      try {
        setPrograms(JSON.parse(storedPrograms));
      } catch (error) {
        console.error("Failed to parse stored programs:", error);
        localStorage.removeItem("programs");
      }
    }
  }, []);

  // Update localStorage when programs change
  useEffect(() => {
    localStorage.setItem("programs", JSON.stringify(programs));
  }, [programs]);

  const addProgram = (newProgram: NewProgram) => {
    const today = new Date().toISOString().split('T')[0];
    const programWithId = {
      ...newProgram,
      id: programs.length > 0 ? Math.max(...programs.map(p => p.id)) + 1 : 1,
      createdAt: today
    };
    
    setPrograms(prevPrograms => [programWithId, ...prevPrograms]);
  };

  return (
    <ProgramContext.Provider value={{ programs, addProgram }}>
      {children}
    </ProgramContext.Provider>
  );
};

export const usePrograms = () => {
  const context = useContext(ProgramContext);
  if (context === undefined) {
    throw new Error("usePrograms must be used within a ProgramProvider");
  }
  return context;
};
