import { Routes, Route, Link } from "react-router-dom";
import Homepage from "./pages/Homepage";
import CreateWeek from "./pages/CreateWeek";
import CreateWorkout from "./pages/CreateWorkout";
import WorkoutDetails from "./pages/WorkoutDetails";
import EditWorkout from "./pages/EditWorkout";
import About from "./pages/About";
import Contact from "./pages/Contact";
import ErrorPage from "./pages/Error";
import Login from "./components/Login";
import PrivateRoute from "./components/PrivateRoute";
import Footer from "./components/Footer";
import { useAuth } from "./context/AuthContext";
import "./styles/app.css";

function App() {
  const { user } = useAuth();

  return (
    <div className="app-shell">
      <div className="app-container">
        {user ? (
          <header className="navbar">
            <div className="navbar-brand">
              <img src="/logo-gym.svg" alt="Workout Tracker" className="navbar-logo" />
              <span className="navbar-title">Workout Tracker</span>
            </div>

            <nav className="navbar-links">
              <Link to="/">Planner</Link>
              <Link to="/weeks/new">Create Week</Link>
              <Link to="/workouts/new">Add Day</Link>
            </nav>

            <div className="navbar-user">
              <Login />
            </div>
          </header>
        ) : (
          <header className="brand-header">
            <div className="brand-header-logo">
              <img src="/logo-gym.svg" alt="" />
            </div>
            <span className="brand-header-title">Workout Tracker</span>
          </header>
        )}

        <main className="app-main">
          <Routes>
            <Route path="/" element={<PrivateRoute><Homepage /></PrivateRoute>} />
            <Route path="/weeks/new" element={<PrivateRoute><CreateWeek /></PrivateRoute>} />
            <Route path="/workouts/new" element={<PrivateRoute><CreateWorkout /></PrivateRoute>} />
            <Route path="/workouts/:id" element={<PrivateRoute><WorkoutDetails /></PrivateRoute>} />
            <Route path="/workouts/:id/edit" element={<PrivateRoute><EditWorkout /></PrivateRoute>} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="*" element={<ErrorPage />} />
          </Routes>
        </main>

        <Footer />
      </div>
    </div>
  );
}

export default App;
