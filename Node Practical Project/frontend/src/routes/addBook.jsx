import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function AddBook() {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [rating, setRating] = useState("");
  const [libraryCard, setLibraryCard] = useState("");
  const [msg, setMsg] = useState("");

  const navigate = useNavigate();

  const handleBookSubmit = (e) => {
    e.preventDefault();

    axios
      .post("http://localhost:1008/addBook", {
        title,
        author,
        rating,
        libraryCard,
      })
      .then(
        (res) => {
          setMsg(res.data.msg);
          setTitle("");
          setAuthor("");
          setRating("");
          setLibraryCard("");
          alert(`${title} added successfully`);
          navigate("/viewBooks");
        },
        (err) => {
          setMsg("Error: " + (err.response?.data?.msg || err.message));
        }
      );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white flex flex-col lg:flex-row items-center justify-center gap-12 p-6 animate-fadeIn">
      <section className="w-full max-w-md bg-white/5 backdrop-blur-lg rounded-3xl border border-white/10 shadow-2xl p-8">
        <p className="uppercase tracking-[0.5rem] text-sm text-emerald-300">
          Library Card
        </p>
        <h1 className="text-4xl font-semibold mt-4 mb-8">
          {title || "Untitled Book"}
        </h1>

        <div className="space-y-4 text-sm text-slate-200">
          <div>
            <p className="text-slate-400">Author</p>
            <p className="text-lg">{author || "Awaiting author"}</p>
          </div>
          <div>
            <p className="text-slate-400">Rating</p>
            <p className="text-lg">{rating ? `${rating}/5` : "Unrated"}</p>
          </div>
          <div>
            <p className="text-slate-400">Library Card</p>
            <p className="text-lg font-mono tracking-widest">
              {libraryCard || "XXXX-XXXX"}
            </p>
          </div>
        </div>

        <div className="mt-10 flex gap-3">
          <span className="h-10 w-10 rounded-full bg-emerald-400/10 border border-emerald-400/40 flex items-center justify-center text-xl text-emerald-300">
            📚
          </span>
          <div>
            <p className="text-sm text-slate-400">Status</p>
            <p className="text-lg text-white">Ready for shelf</p>
          </div>
        </div>
      </section>

      <form
        onSubmit={handleBookSubmit}
        className="w-full max-w-lg bg-white/5 backdrop-blur-lg rounded-3xl border border-white/10 shadow-2xl p-10"
      >
        <h2 className="text-3xl font-bold mb-6 text-center text-emerald-300">
          Add a New Book
        </h2>

        {msg && (
          <div className="bg-emerald-500/20 border border-emerald-500/40 text-emerald-100 p-3 rounded text-center mb-6">
            {msg}
          </div>
        )}

        <label className="text-sm uppercase tracking-widest text-slate-400">
          Book Title
        </label>
        <input
          type="text"
          placeholder="The Midnight Library"
          className="w-full p-4 mb-6 rounded-2xl bg-white/5 border border-white/10 focus:border-emerald-300 focus:outline-none text-white"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />

        <label className="text-sm uppercase tracking-widest text-slate-400">
          Author
        </label>
        <input
          type="text"
          placeholder="Matt Haig"
          className="w-full p-4 mb-6 rounded-2xl bg-white/5 border border-white/10 focus:border-emerald-300 focus:outline-none text-white"
          value={author}
          onChange={(e) => setAuthor(e.target.value)}
          required
        />

        <label className="text-sm uppercase tracking-widest text-slate-400">
          Rating
        </label>
        <input
          type="number"
          step="0.1"
          min="0"
          max="5"
          placeholder="4.8"
          className="w-full p-4 mb-6 rounded-2xl bg-white/5 border border-white/10 focus:border-emerald-300 focus:outline-none text-white"
          value={rating}
          onChange={(e) => setRating(e.target.value)}
          required
        />

        <label className="text-sm uppercase tracking-widest text-slate-400">
          Library Card
        </label>
        <input
          type="text"
          placeholder="LIB-2048-AX92"
          className="w-full p-4 mb-8 rounded-2xl bg-white/5 border border-white/10 focus:border-emerald-300 focus:outline-none text-white uppercase tracking-widest"
          value={libraryCard}
          onChange={(e) => setLibraryCard(e.target.value)}
          required
        />

        <button
          type="submit"
          className="w-full bg-emerald-400 hover:bg-emerald-300 text-slate-900 font-semibold p-4 rounded-2xl transition"
        >
          Save Book
        </button>
      </form>
    </div>
  );
}
