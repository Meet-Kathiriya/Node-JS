import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import RegisterAdmin from "./routes/registerAdmin";
import LoginAdmin from "./routes/loginAdmin";
import ViewProfile from "./routes/viewProfile";
import AddBook from "./routes/addBook" 
import ViewBooks from "./routes/viewBooks";


function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-slate-950 text-white">
        <nav className="sticky top-0 z-50 bg-slate-950/80 backdrop-blur border-b border-white/10">
          <div className="max-w-6xl mx-auto flex flex-wrap justify-between items-center p-5">
            <Link to="/" className="flex items-center gap-3">
              <span className="h-10 w-10 rounded-full bg-emerald-400/10 border border-emerald-300/40 flex items-center justify-center text-2xl">
                📚
              </span>
              <div>
                <p className="text-xs uppercase tracking-[0.4rem] text-emerald-200">
                  Archive
                </p>
                <h1 className="text-xl font-semibold">Aurora Library Desk</h1>
              </div>
            </Link>

            <div className="flex flex-wrap gap-4 text-sm">
              <Link className="px-4 py-2 rounded-full bg-white/5 hover:bg-white/10 transition" to="/registerAdmin">Register</Link>
              <Link className="px-4 py-2 rounded-full bg-white/5 hover:bg-white/10 transition" to="/loginAdmin">Login</Link>
              <Link className="px-4 py-2 rounded-full bg-white/5 hover:bg-white/10 transition" to="/viewProfile">Profile</Link>
              <Link className="px-4 py-2 rounded-full bg-emerald-400 text-slate-900 font-semibold hover:bg-emerald-300 transition" to="/addBook">Add Book</Link>
              <Link className="px-4 py-2 rounded-full bg-white/5 hover:bg-white/10 transition" to="/viewBooks">View Library</Link>
            </div>
          </div>
        </nav>

        <main className="max-w-6xl mx-auto py-10 px-6">
          <Routes>
            <Route path="/" element={<RegisterAdmin />} />
            <Route path="/registerAdmin" element={<RegisterAdmin />} />
            <Route path="/loginAdmin" element={<LoginAdmin />} />
            <Route path="/viewProfile" element={<ViewProfile />} />
            <Route path="/addBook" element={<AddBook />} />
            <Route path="/viewBooks" element={<ViewBooks />} />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  );
}

export default App;
