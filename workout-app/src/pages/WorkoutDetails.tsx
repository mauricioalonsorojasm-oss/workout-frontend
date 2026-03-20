import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { getWorkoutById, deleteWorkout, type Workout } from "../services/workout.service";
import "../styles/workout-details.css";

function WorkoutDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [workout, setWorkout] = useState<Workout | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchWorkout = async () => {
      if (!id) {
        setError("Workout ID is missing.");
        setLoading(false);
        return;
      }

      try {
        const data = await getWorkoutById(id);
        setWorkout(data);
      } catch (err) {
        setError("Could not load workout details.");
      } finally {
        setLoading(false);
      }
    };

    fetchWorkout();
  }, [id]);

  const handleDelete = async () => {
    if (!id) return;

    const confirmed = window.confirm("Are you sure you want to delete this workout?");
    if (!confirmed) return;

    try {
      await deleteWorkout(id);
      navigate("/");
    } catch (err) {
      alert("Could not delete workout.");
    }
  };

  if (loading) return <p className="status-text">Loading workout details...</p>;
  if (error) return <p className="status-text">{error}</p>;
  if (!workout) return <p className="status-text">Workout not found.</p>;

  return (
    <section className="details-page">
      <Link className="back-link" to="/">
        ← Back to workouts
      </Link>

      <div className="details-card">
        <h2>{workout.name}</h2>

        <div className="details-summary">
          <article>
            <span>Duration</span>
            <strong>{workout.duration} min</strong>
          </article>
          <article>
            <span>Calories</span>
            <strong>{workout.calories ?? "N/A"}</strong>
          </article>
          <article>
            <span>Date</span>
            <strong>{new Date(workout.date).toLocaleDateString()}</strong>
          </article>
        </div>

        <div className="details-actions">
          <Link className="text-link" to={`/workouts/${workout.id}/edit`}>
            Edit Workout
          </Link>
          <button className="button-secondary" onClick={handleDelete}>
            Delete Workout
          </button>
        </div>
      </div>

      <div className="section-card">
        <h3>Exercises</h3>

        {!workout.exercises || workout.exercises.length === 0 ? (
          <p className="status-text">No exercises added yet.</p>
        ) : (
          <div className="exercise-list">
            {workout.exercises.map((exercise) => (
              <article key={exercise.id} className="exercise-item">
                <h4>{exercise.name}</h4>
                <p>
                  <strong>Sets:</strong> {exercise.sets}
                </p>
                <p>
                  <strong>Reps:</strong> {exercise.reps}
                </p>
                <p>
                  <strong>Weight:</strong> {exercise.weight ?? "N/A"}
                </p>
              </article>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

export default WorkoutDetails;