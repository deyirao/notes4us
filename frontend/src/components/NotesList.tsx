import { useFetchNotes } from "../hooks/useFetchNotes";

export default function NotesList() {
  const { notes, loading, error, refetch } = useFetchNotes();

  if (loading) return <p>Loading...</p>;
  if (error)
    return (
      <p>
        Error: {error} <button onClick={refetch}>Retry</button>
      </p>
    );

  return (
    <div>
      <button onClick={refetch}>Refresh Notes</button>
      <ul>
        {notes.map((note) => (
          <li key={note.id}>{note.title}</li>
        ))}
      </ul>
    </div>
  );
}
