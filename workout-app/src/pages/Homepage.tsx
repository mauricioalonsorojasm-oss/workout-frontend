import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getWorkouts, deleteWorkout, type Workout } from "../services/workout.service";
import "../styles/homepage.css";

function Homepage() {
  const [workouts, setWorkouts] = useState<Workout[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const loadWorkouts = async () => {
    try {
      setLoading(true);
      const data = await getWorkouts();
      setWorkouts(data);
      setError("");
    } catch (err) {
      setError("Could not load workouts");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadWorkouts();
  }, []);

  const handleDelete = async (id: string) => {
    const confirmed = window.confirm("Are you sure you want to delete this workout?");
    if (!confirmed) return;

    try {
      await deleteWorkout(id);
      setWorkouts((prev) => prev.filter((workout) => workout.id !== id));
    } catch (err) {
      alert("Could not delete workout");
    }
  };

  if (loading) return <p className="status-text">Loading workouts...</p>;
  if (error) return <p className="status-text">{error}</p>;

  return (
    <section className="page-stack">
      <div className="page-header">
        <div>
          <h2>My Workouts</h2>
          <p>Track your sessions and keep your training history organized.</p>
        </div>
        <Link className="text-link" to="/workouts/new">
          + Create new workout
        </Link>
      </div>

      {workouts.length === 0 ? (
        <div className="empty-state">
          <div className="empty-state__icon" aria-hidden="true">🏋️</div>
          <h3 className="empty-state__title">No workouts yet</h3>
          <p className="empty-state__text">Add your first workout to get started.</p>
          <Link className="text-link" to="/workouts/new">
            Create your first workout
          </Link>
        </div>
      ) : (
        <div className="workout-grid">
          {workouts.map((workout) => (
            <article key={workout.id} className="workout-card">
              <h3 className="workout-card__title">{workout.name}</h3>

              <dl className="workout-meta">
                <div>
                  <dt>Duration</dt>
                  <dd>{workout.duration} min</dd>
                </div>
                <div>
                  <dt>Calories</dt>
                  <dd>{workout.calories ?? "N/A"}</dd>
                </div>
                <div>
                  <dt>Date</dt>
                  <dd>{new Date(workout.date).toLocaleDateString()}</dd>
                </div>
              </dl>

              <div className="workout-actions">
                <Link className="text-link" to={`/workouts/${workout.id}`}>
                  Details
                </Link>
                <Link className="text-link" to={`/workouts/${workout.id}/edit`}>
                  Edit
                </Link>
                <button className="button-secondary" onClick={() => handleDelete(workout.id)}>
                  Delete
                </button>
              </div>
            </article>
          ))}
        </div>
      )}
    </section>
  );
}

export default Homepage;