import { useEffect, useState } from "react";
import {
  collection,
  addDoc,
  getDocs,
  updateDoc,
  deleteDoc,
  doc,
} from "firebase/firestore";
import { db, auth, serverTs } from "./firebase";

function Notes() {
  const [notes, setNotes] = useState([]);
  const [text, setText] = useState("");

  // Load notes from Firestore
  useEffect(() => {
    const fetchNotes = async () => {
      const snapshot = await getDocs(collection(db, "notes"));
      const data = snapshot.docs
        .filter((d) => d.data().owner === auth.currentUser.uid)
        .map((d) => ({ id: d.id, ...d.data() }));
      setNotes(data);
    };
    fetchNotes();
  }, []);

  // Add new note
  const addNote = async () => {
    if (!text.trim()) return;
    const newNote = {
      content: text,
      createdAt: serverTs(),
      owner: auth.currentUser.uid,
      shareEnabled: false,
    };
    await addDoc(collection(db, "notes"), newNote);
    setText("");
    alert("Note saved ✅ (refresh to see it)");
  };

  // Delete note
  const deleteNote = async (id) => {
    await deleteDoc(doc(db, "notes", id));
    alert("Deleted 🗑️");
  };

  return (
    <div className="p-4 text-center">
      <h1 className="text-2xl font-bold mb-4">📝 My Notes</h1>

      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Write something..."
        className="border p-2 w-full max-w-lg h-32 rounded-md"
      />

      <button
        onClick={addNote}
        className="block mx-auto mt-4 bg-green-600 text-white px-4 py-2 rounded-lg"
      >
        Save Note
      </button>

      <div className="mt-8 text-left max-w-lg mx-auto">
        <h2 className="text-lg font-semibold mb-2">Your Saved Notes:</h2>
        {notes.length === 0 && <p>No notes yet</p>}
        {notes.map((note) => (
          <div key={note.id} className="border rounded-md p-3 mb-3 bg-gray-100">
            <p>{note.content}</p>
            <button
              onClick={() => deleteNote(note.id)}
              className="mt-2 text-red-500 text-sm"
            >
              Delete
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Notes;
