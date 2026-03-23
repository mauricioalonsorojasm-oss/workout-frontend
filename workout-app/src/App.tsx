import { Routes, Route, Link } from "react-router-dom";
import Homepage from "./pages/Homepage";
import CreateWorkout from "./pages/CreateWorkout";
import WorkoutDetails from "./pages/WorkoutDetails";
import EditWorkout from "./pages/EditWorkout";
import About from "./pages/About";
import Contact from "./pages/Contact";
import ErrorPage from "./pages/Error";
import Login from "./components/Login"; // 👈 AÑADIDO
import "./styles/app.css";

function App() {
  return (
    <div className="app-shell">
      <div className="app-container">
        <header className="app-header">
          <div className="app-brand-card">
            <div className="app-brand-row">
              <div className="app-logo" aria-hidden="true">
                <img src="/logo-gym.svg" alt="" />
              </div>
              <div className="app-brand-copy">
                <p className="app-kicker">Workout tracker</p>
                <h1 className="app-title">Workout Tracker</h1>
              </div>
            </div>
            <p className="app-subtitle">
              Track sessions, keep your training organized, and build consistency with a clean modern workflow.
            </p>
          </div>

          <nav className="app-nav">
            <Link to="/">Home</Link>
            <Link to="/workouts/new">Create Workout</Link>
            <Link to="/about">About</Link>
            <Link to="/contact">Contact</Link>
          </nav>

          {/* 👇 LOGIN AÑADIDO */}
          <div style={{ marginTop: "10px" }}>
            <Login />
          </div>

        </header>

        <main className="app-main">
          <Routes>
            <Route path="/" element={<Homepage />} />
            <Route path="/workouts/new" element={<CreateWorkout />} />
            <Route path="/workouts/:id" element={<WorkoutDetails />} />
            <Route path="/workouts/:id/edit" element={<EditWorkout />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="*" element={<ErrorPage />} />
          </Routes>
        </main>
      </div>
    </div>
  );
}

export default App;