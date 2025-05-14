import React, { createContext, useContext, ReactNode } from "react";
import { useFetchNotes } from "../hooks/useFetchNotes";

// 1. Define the Note interface (or import from a shared types.ts)
// It's better to have a single source of truth for this type.
// For this example, I'll redefine it here.
interface Note {
  id: number; // Or string
  title: string;
  content: string;
  // other fields like createdAt, updatedAt
}

// 2. Define the shape of the context value
interface NotesContextType {
  notes: Note[];
  loading: boolean;
  error: string | null;
  refetchNotes: () => void;
  addNote: (newNoteData: Omit<Note, "id">) => Promise<void>; // Omit 'id' as backend usually generates it
  updateNote: (id: number, updatedNoteData: Partial<Note>) => Promise<void>;
  deleteNote: (id: number) => Promise<void>;
}

// 3. Create the Context with a default undefined value
// The undefined default is okay as we'll ensure Provider is always used
const NotesContext = createContext<NotesContextType | undefined>(undefined);

// 4. Create the Provider component
interface NotesProviderProps {
  children: ReactNode;
}

export const NotesProvider: React.FC<NotesProviderProps> = ({ children }) => {
  // Use the custom hook for fetching notes
  const { notes, loading, error, refetch: refetchNotes } = useFetchNotes();

  // Placeholder functions for CRUD operations
  // In a real app, these would make API calls (POST, PUT, DELETE)
  // and then likely call refetchNotes() or optimistically update state.

  const addNote = async (newNoteData: Omit<Note, "id">) => {
    console.log("Adding note:", newNoteData);
    // Example:
    // try {
    //   const response = await fetch('http://localhost:8080/api/notes', {
    //     method: 'POST',
    //     headers: { 'Content-Type': 'application/json' },
    //     body: JSON.stringify(newNoteData),
    //   });
    //   if (!response.ok) throw new Error('Failed to add note');
    //   refetchNotes(); // Refetch the list to include the new note
    // } catch (err) {
    //   console.error(err);
    //   // Handle error appropriately
    // }
    alert("Add note functionality not fully implemented yet. See console.");
  };

  const updateNote = async (id: number, updatedNoteData: Partial<Note>) => {
    console.log(`Updating note ${id}:`, updatedNoteData);
    // Example:
    // try {
    //   const response = await fetch(`http://localhost:8080/api/notes/${id}`, {
    //     method: 'PUT',
    //     headers: { 'Content-Type': 'application/json' },
    //     body: JSON.stringify(updatedNoteData),
    //   });
    //   if (!response.ok) throw new Error('Failed to update note');
    //   refetchNotes();
    // } catch (err) {
    //   console.error(err);
    // }
    alert("Update note functionality not fully implemented yet. See console.");
  };

  const deleteNote = async (id: number) => {
    console.log(`Deleting note ${id}`);
    // Example:
    // try {
    //   const response = await fetch(`http://localhost:8080/api/notes/${id}`, {
    //     method: 'DELETE',
    //   });
    //   if (!response.ok) throw new Error('Failed to delete note');
    //   refetchNotes();
    // } catch (err) {
    //   console.error(err);
    // }
    alert("Delete note functionality not fully implemented yet. See console.");
  };

  const contextValue: NotesContextType = {
    notes,
    loading,
    error,
    refetchNotes,
    addNote,
    updateNote,
    deleteNote,
  };

  return (
    <NotesContext.Provider value={contextValue}>
      {children}
    </NotesContext.Provider>
  );
};

// 5. Create a custom hook for easy consumption of the context
export const useNotes = (): NotesContextType => {
  const context = useContext(NotesContext);
  if (context === undefined) {
    throw new Error("useNotes must be used within a NotesProvider");
  }
  return context;
};
