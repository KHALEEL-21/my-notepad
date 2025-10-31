import { useEffect, useState } from "react";
import { db, ref, set, onValue } from "../firebase";
import { useParams } from "react-router-dom";

function Note() {
  const { id } = useParams();
  const [text, setText] = useState("");

  useEffect(() => {
    const noteRef = ref(db, `notes/${id}`);
    onValue(noteRef, (snapshot) => {
      const val = snapshot.val();
      if (val) setText(val.text);
    });
  }, [id]);

  const updateText = (newText) => {
    setText(newText);
    set(ref(db, `notes/${id}`), { text: newText });
  };

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <h1 className="text-xl font-bold mb-4">🔗 Notepad Link: {id}</h1>
      <textarea
        value={text}
        onChange={(e) => updateText(e.target.value)}
        placeholder="Type here..."
        className="w-full h-96 border p-3 rounded-md"
      />
      <p className="mt-2 text-gray-500 text-sm">
        Auto-saved and shareable with anyone having this link.
      </p>
    </div>
  );
}

export default Note;
