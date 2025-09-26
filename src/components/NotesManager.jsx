import { useState, useEffect } from "react";
import { supabase } from "../supabaseClient";

export default function NotesManager() {
  const [notes, setNotes] = useState([]);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  // fetch all notes
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

  const addNote = async () => {
    if (!title || !content) return alert("Fill all fields");

    const { error } = await supabase
      .from("notes")
      .insert([{ title, content, created_by: "Teacher" }]);

    if (error) console.error(error);
    else {
      setTitle("");
      setContent("");
      fetchNotes(); // refresh list
    }
  };

  const deleteNote = async (id) => {
    const { error } = await supabase.from("notes").delete().eq("id", id);
    if (error) console.error(error);
    else fetchNotes();
  };

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold mb-2">Manage Notes</h1>

      <input
        type="text"
        placeholder="Title"
        className="border p-2 mb-2 w-full"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <textarea
        placeholder="Content"
        className="border p-2 mb-2 w-full"
        value={content}
        onChange={(e) => setContent(e.target.value)}
      />
      <button
        onClick={addNote}
        className="bg-blue-500 text-white px-4 py-2 rounded"
      >
        Add Note
      </button>

      <ul className="mt-4">
        {notes.map((note) => (
          <li key={note.id} className="border-b p-2 flex justify-between">
            <div>
              <h2 className="font-semibold">{note.title}</h2>
              <p>{note.content}</p>
            </div>
            <button
              onClick={() => deleteNote(note.id)}
              className="text-red-500"
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
