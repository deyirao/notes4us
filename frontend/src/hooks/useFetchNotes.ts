import { useState, useEffect, useCallback } from "react";

// It's highly recommended to move this Note interface to a shared types file,
// e.g., frontend/src/types.ts, and import it here.
// For this example, I'll define it directly in this file.
export interface Note {
  id: number; // Or string, depending on your backend's ID type
  title: string;
  content: string;
  // Add other fields if your backend provides them, e.g.:
  // createdAt?: string; // ISO date string
  // updatedAt?: string; // ISO date string
}

// This interface defines the shape of the object returned by our custom hook.
export interface FetchNotesResult {
  notes: Note[];
  loading: boolean;
  error: string | null;
  refetch: () => Promise<void>; // Function to manually trigger a data refetch
}

const DUMMY_NOTES: Note[] = [
  {
    id: 1,
    title: "Grocery List",
    content: "Milk, Eggs, Bread, Cheese, Apples",
  },
  {
    id: 2,
    title: "Meeting Notes - Project Phoenix",
    content:
      "Discussed Q3 roadmap. Key takeaways: finalize UI mockups by next week, schedule user testing for Sprint 2. Action items assigned.",
  },
  {
    id: 3,
    title: "Book Recommendations",
    content:
      "1. 'The Pragmatic Programmer' by Andrew Hunt and David Thomas\n2. 'Clean Code' by Robert C. Martin\n3. 'Designing Data-Intensive Applications' by Martin Kleppmann",
  },
  {
    id: 4,
    title: "Weekend Plans",
    content:
      "Saturday: Morning hike, afternoon coding session on notes app. Sunday: Brunch with friends, relax.",
  },
];

// The custom hook function
export function useFetchNotes(
  apiUrl: string = "http://localhost:8080/api/notes"
): FetchNotesResult {
  const [notes, setNotes] = useState<Note[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchData = useCallback(async () => {
    setLoading(true);
    setError(null);
    console.log("Fetching notes (using dummy data)..."); // Log that you're using dummy data

    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 500));

    try {
      // --- START DUMMY DATA USAGE ---
      setNotes(DUMMY_NOTES);
      // --- END DUMMY DATA USAGE ---

      // Comment out or remove real fetch logic when using dummy data
      /*
        const response = await fetch(apiUrl);
        if (!response.ok) {
          const errorData = await response.json().catch(() => null);
          const errorMessage = errorData?.message || `HTTP error! status: ${response.status}`;
          throw new Error(errorMessage);
        }
        const data: Note[] = await response.json();
        setNotes(data);
        */
    } catch (e) {
      if (e instanceof Error) {
        setError(e.message);
      } else {
        setError("An unknown error occurred while fetching notes.");
      }
      setNotes([]);
    } finally {
      setLoading(false);
    }
  }, [apiUrl]); // apiUrl dependency might be less relevant if always using dummy data but keep for consistency

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return { notes, loading, error, refetch: fetchData };
}
