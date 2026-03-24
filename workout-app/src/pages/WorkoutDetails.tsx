import { useCallback, useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { getWorkoutById, deleteWorkout, updateWorkoutStatus, type Workout } from "../services/workout.service";
import { createExercise, toggleExerciseCompletion } from "../services/exercise.service";
import "../styles/workout-details.css";

const formatDay = (value?: string | null) => {
  if (!value) return "Not scheduled";
  return new Date(value).toLocaleDateString(undefined, {
    weekday: "long",
    day: "numeric",
    month: "short"
  });
};

function WorkoutDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [workout, setWorkout] = useState<Workout | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [exerciseForm, setExerciseForm] = useState({
    name: "",
    scheme: "",
    weight: "",
    unit: "kg",
    comment: "",
    position: ""
  });
  const [exerciseError, setExerciseError] = useState("");
  const [savingExercise, setSavingExercise] = useState(false);
  const [pendingWorkoutStatus, setPendingWorkoutStatus] = useState(false);
  const [pendingExerciseId, setPendingExerciseId] = useState<string | null>(null);

  const loadWorkout = useCallback(async () => {
    if (!id) {
      setError("Workout ID is missing.");
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      const data = await getWorkoutById(id);
      setWorkout(data);
      setError("");
    } catch (err) {
      setError("Could not load workout details.");
    } finally {
      setLoading(false);
    }
  }, [id]);

  useEffect(() => {
    loadWorkout();
  }, [loadWorkout]);

  const handleDelete = async () => {
    if (!id) return;

    const confirmed = window.confirm("Delete this workout and its exercises?");
    if (!confirmed) return;

    try {
      await deleteWorkout(id);
      navigate("/");
    } catch (err) {
      alert("Could not delete workout.");
    }
  };

  const handleExerciseChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setExerciseForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleExerciseSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!workout) return;
    if (!exerciseForm.name || !exerciseForm.scheme) {
      setExerciseError("Please add a name and scheme.");
      return;
    }

    try {
      setSavingExercise(true);
      setExerciseError("");
      await createExercise({
        workoutId: workout.id,
        name: exerciseForm.name,
        scheme: exerciseForm.scheme,
        weight: exerciseForm.weight ? Number(exerciseForm.weight) : undefined,
        unit: exerciseForm.unit || undefined,
        comment: exerciseForm.comment || undefined,
        position: exerciseForm.position ? Number(exerciseForm.position) : undefined
      });

      setExerciseForm({ name: "", scheme: "", weight: "", unit: exerciseForm.unit, comment: "", position: "" });
      await loadWorkout();
    } catch (err) {
      setExerciseError("Could not create exercise.");
    } finally {
      setSavingExercise(false);
    }
  };

  const handleWorkoutToggle = async (checked: boolean) => {
    if (!workout) return;
    try {
      setPendingWorkoutStatus(true);
      await updateWorkoutStatus(workout.id, checked ? "DONE" : "PLANNED");
      await loadWorkout();
    } catch (err) {
      setError("Could not update workout status.");
    } finally {
      setPendingWorkoutStatus(false);
    }
  };

  const handleExerciseToggle = async (exerciseId: string) => {
    try {
      setPendingExerciseId(exerciseId);
      await toggleExerciseCompletion(exerciseId);
      await loadWorkout();
    } catch (err) {
      setExerciseError("Could not toggle exercise.");
    } finally {
      setPendingExerciseId(null);
    }
  };

  if (loading) return <p className="status-text">Loading workout details...</p>;
  if (error) return <p className="status-text">{error}</p>;
  if (!workout) return <p className="status-text">Workout not found.</p>;

  return (
    <section className="details-page">
      <Link className="back-link" to="/">
        ← Back to planner
      </Link>

      <div className="details-card">
        <div>
          <p className="details-kicker">{workout.week?.title ?? "Week"}</p>
          <h2>{workout.dayLabel}</h2>
          <p className="details-date">{formatDay(workout.date)}</p>
        </div>
        <div className="details-meta">
          {workout.focusTag && (
            <div>
              <span>Focus</span>
              <strong>{workout.focusTag}</strong>
            </div>
          )}
          <div>
            <span>Order</span>
            <strong>Day {workout.dayOrder}</strong>
          </div>
          <div className="details-toggle">
            <label className="status-toggle">
              <input
                type="checkbox"
                checked={workout.status === "DONE"}
                disabled={pendingWorkoutStatus}
                onChange={(e) => handleWorkoutToggle(e.target.checked)}
              />
              <span>{workout.status === "DONE" ? "Day completed" : "Mark day done"}</span>
            </label>
          </div>
        </div>
        {workout.notes && <p className="details-notes">{workout.notes}</p>}
        <div className="details-actions">
          <Link className="text-link" to={`/workouts/${workout.id}/edit`}>
            Edit day
          </Link>
          <button className="button-secondary" onClick={handleDelete}>
            Delete day
          </button>
        </div>
      </div>

      <div className="section-card">
        <h3>Exercises</h3>

        {!workout.exercises || workout.exercises.length === 0 ? (
          <p className="status-text">No exercises yet.</p>
        ) : (
          <ul className="exercise-detailed-list">
            {workout.exercises
              .slice()
              .sort((a, b) => a.position - b.position)
              .map((exercise) => (
                <li
                  key={exercise.id}
                  className={`exercise-detailed-item ${exercise.completed ? "exercise-detailed-item--done" : ""}`}
                >
                  <div>
                    <p className="exercise-name">{exercise.name}</p>
                    <p className="exercise-scheme">{exercise.scheme}</p>
                  </div>
                  <div className="exercise-info">
                    <label className="status-toggle">
                      <input
                        type="checkbox"
                        checked={exercise.completed}
                        disabled={pendingExerciseId === exercise.id}
                        onChange={() => handleExerciseToggle(exercise.id)}
                      />
                      <span>{exercise.completed ? "Done" : "Mark done"}</span>
                    </label>
                    {exercise.weight ? (
                      <strong>
                        {exercise.weight}
                        {exercise.unit ? ` ${exercise.unit}` : " kg"}
                      </strong>
                    ) : (
                      exercise.unit === "bw" && <strong>BW</strong>
                    )}
                    {exercise.comment && <p>{exercise.comment}</p>}
                  </div>
                </li>
              ))}
          </ul>
        )}
      </div>

      <div className="section-card">
        <h3>Add exercise</h3>
        <form className="exercise-form" onSubmit={handleExerciseSubmit}>
          <div className="form-row">
            <div className="form-group">
              <label htmlFor="exercise-name">Name</label>
              <input id="exercise-name" name="name" value={exerciseForm.name} onChange={handleExerciseChange} placeholder="Pull ups" />
            </div>
            <div className="form-group">
              <label htmlFor="exercise-scheme">Scheme</label>
              <input id="exercise-scheme" name="scheme" value={exerciseForm.scheme} onChange={handleExerciseChange} placeholder="4x8" />
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="exercise-weight">Weight</label>
              <input id="exercise-weight" name="weight" type="number" value={exerciseForm.weight} onChange={handleExerciseChange} placeholder="35" />
            </div>
            <div className="form-group">
              <label htmlFor="exercise-unit">Unit</label>
              <select id="exercise-unit" name="unit" value={exerciseForm.unit} onChange={handleExerciseChange}>
                <option value="kg">kg</option>
                <option value="lb">lb</option>
                <option value="bw">bw</option>
              </select>
            </div>
            <div className="form-group">
              <label htmlFor="exercise-position">Order</label>
              <input id="exercise-position" name="position" type="number" value={exerciseForm.position} onChange={handleExerciseChange} placeholder="1" />
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="exercise-comment">Notes</label>
            <textarea id="exercise-comment" name="comment" rows={3} value={exerciseForm.comment} onChange={handleExerciseChange} placeholder="Cues / tempo / asistencia" />
          </div>

          {exerciseError && <p className="form-error">{exerciseError}</p>}

          <div className="form-actions">
            <button type="submit" disabled={savingExercise}>
              {savingExercise ? "Adding..." : "Add exercise"}
            </button>
          </div>
        </form>
      </div>
    </section>
  );
}

export default WorkoutDetails;
