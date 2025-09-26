import { useState, useEffect } from "react";
import { supabase } from "../supabaseClient";

export default function NotesViewer() {
  const [notes, setNotes] = useState([]);

  useEffect(() => {
    fetchNotes();
  }, []);

  const fetchNotes = async () => {
    const { data, error } = await supabase
      .from("notes")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) console.error(error);
    else setNotes(data);
  };

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold mb-2">Available Notes</h1>
      <ul>
        {notes.map((note) => (
          <li key={note.id} className="border-b p-2">
            <h2 className="font-semibold">{note.title}</h2>
            <p>{note.content}</p>
            <p className="text-sm text-gray-500">
              By: {note.created_by} | {new Date(note.created_at).toLocaleString()}
            </p>
          </li>
        ))}
      </ul>
    </div>
  );
}
