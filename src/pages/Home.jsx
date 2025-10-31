import { useNavigate } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";

function Home() {
  const navigate = useNavigate();

  const createNewNote = () => {
    const id = uuidv4().slice(0, 6); // short ID like "a1b2c3"
    navigate(`/note/${id}`);
  };

  return (
    <div className="h-screen flex flex-col justify-center items-center">
      <h1 className="text-3xl font-bold mb-6">🗒️ My Personal Notepad</h1>
      <button
        onClick={createNewNote}
        className="bg-blue-600 text-white px-4 py-2 rounded-lg"
      >
        Create New Notepad
      </button>
    </div>
  );
}

export default Home;
