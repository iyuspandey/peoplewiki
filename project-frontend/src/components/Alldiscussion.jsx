// src/pages/AllDiscussions.jsx
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function AllDiscussions() {
  const [discussions, setDiscussions] = useState([]);
  const [newTitle, setNewTitle] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  // Fetch discussions
  const fetchDiscussions = () => {
    fetch("http://localhost:4000/api/discussions")
      .then((res) => res.json())
      .then(setDiscussions)
      .catch(console.error);
  };

  useEffect(() => {
    fetchDiscussions();
  }, []);

  const handleCreate = async (e) => {
    e.preventDefault();
    if (!newTitle.trim()) return;

    setLoading(true);
    setError(null);

    try {
      const id = crypto.randomUUID();

      const res = await fetch("http://localhost:4000/api/discussions", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, title: newTitle }),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || "Failed to create discussion");
      }

      // Clear input
      setNewTitle("");

      // Refresh discussions list
      fetchDiscussions();

      // Redirect to the new discussion page
      navigate(`/discussions/${id}`);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-black text-green-400 font-mono min-h-screen p-6">
      <h1 className="text-3xl mb-6 font-bold text-center">📢 All Discussions</h1>

      <form
        onSubmit={handleCreate}
        className="max-w-2xl mx-auto mb-6 flex flex-col space-y-2"
      >
        <input
          type="text"
          placeholder="Enter discussion title..."
          value={newTitle}
          onChange={(e) => setNewTitle(e.target.value)}
          className="bg-gray-800 border border-green-600 px-3 py-2 rounded text-green-300 focus:outline-none focus:border-green-400"
          disabled={loading}
        />
        <button
          type="submit"
          disabled={loading}
          className="bg-green-700 hover:bg-green-600 text-white py-2 rounded font-semibold disabled:opacity-50"
        >
          {loading ? "Creating..." : "Create New Discussion"}
        </button>
        {error && <p className="text-red-500">{error}</p>}
      </form>

      <div className="max-w-2xl mx-auto space-y-4">
        {discussions.length === 0 && <p>No discussions yet.</p>}
        {discussions.map((d) => (
         <Link
         key={d.id}
         to={`/discussions/${d.id}`}
         state={{ title: d.title, createdAt: d.createdAt }}
         className="block border border-green-600 p-4 rounded hover:border-green-400"
       >
         <h2 className="text-xl">{d.title}</h2>
         <p className="text-sm text-green-500">
           Created: {new Date(d.createdAt).toLocaleString()}
         </p>
         <p className="text-sm text-green-400">
           Messages: {d.messages?.length || 0}
         </p>
       </Link>
       
        ))}
      </div>
    </div>
  );
}
