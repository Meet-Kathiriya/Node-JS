import { useEffect, useState } from "react";
import axios from "axios";

export default function ViewBooks() {
  const [books, setBooks] = useState([]);

  const fetchBooks = async () => {
    const token = localStorage.getItem("token");

    const res = await axios.get("http://localhost:1008/viewBooks", {
      headers: { Authorization: `Bearer ${token}` },
    });

    setBooks(res.data.data || []);
  };

  useEffect(() => {
    fetchBooks();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 text-white py-16 px-6">
      <div className="max-w-6xl mx-auto">
        <header className="text-center mb-12">
          <p className="text-sm uppercase tracking-[0.3rem] text-emerald-300">
            Library Shelf
          </p>
          <h1 className="text-5xl font-extrabold mt-3 mb-4">
            Curated Book Registry
          </h1>
          <p className="text-slate-400">
            Every card captures a story—title, voice, and the rating it deserves.
          </p>
        </header>

        <div className="grid gap-8 md:grid-cols-2 xl:grid-cols-3">
          {books.map((book, idx) => (
            <article
              key={`${book.title}-${idx}`}
              className="relative overflow-hidden rounded-3xl border border-white/10 bg-white/5 backdrop-blur-lg shadow-2xl p-6 flex flex-col gap-5"
            >
              <div className="flex items-center gap-4">
                <span className="h-12 w-12 rounded-full bg-emerald-400/10 border border-emerald-400/40 flex items-center justify-center text-2xl">
                  📖
                </span>
                <div>
                  <p className="text-sm uppercase tracking-widest text-slate-400">
                    Library Card
                  </p>
                  <p className="text-lg font-mono tracking-widest text-emerald-200">
                    {book.libraryCard}
                  </p>
                </div>
              </div>

              <div>
                <h2 className="text-3xl font-semibold">{book.title}</h2>
                <p className="text-slate-400 text-sm mt-2">by {book.author}</p>
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <p className="text-slate-400 text-sm uppercase tracking-widest">
                    Rating
                  </p>
                  <p className="text-2xl font-bold text-emerald-300">
                    {Number(book.rating).toFixed(1)} <span className="text-base">/ 5</span>
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-slate-400 text-sm uppercase tracking-widest">
                    Added
                  </p>
                  <p className="text-base">
                    {book.createdAt ? book.createdAt.split(",")[0] : "—"}
                  </p>
                </div>
              </div>

              <footer className="pt-4 border-t border-white/10 flex items-center justify-between text-sm text-slate-400">
                <span>Catalogued • {idx + 1}</span>
                <span className="text-emerald-300">Ready to borrow</span>
              </footer>
            </article>
          ))}

          {!books.length && (
            <div className="md:col-span-2 xl:col-span-3 border border-dashed border-white/20 rounded-3xl p-12 text-center text-slate-400">
              No books catalogued yet. Add one to populate the shelf.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
