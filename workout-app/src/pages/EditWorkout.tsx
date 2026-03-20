import { useEffect, useState } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import { getWorkoutById, updateWorkout } from "../services/workout.service";
import "../styles/workout-form.css";

function EditWorkout() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    duration: "",
    calories: "",
    date: "",
  });

  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
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

        setFormData({
          name: data.name || "",
          duration: data.duration?.toString() || "",
          calories: data.calories?.toString() || "",
          date: data.date ? data.date.slice(0, 10) : "",
        });
      } catch (err) {
        setError("Could not load workout.");
      } finally {
        setLoading(false);
      }
    };

    fetchWorkout();
  }, [id]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!id) return;

    if (!formData.name || !formData.duration || !formData.date) {
      setError("Please fill in all required fields.");
      return;
    }

    try {
      setSubmitting(true);
      setError("");

      await updateWorkout(id, {
        name: formData.name,
        duration: Number(formData.duration),
        calories: formData.calories ? Number(formData.calories) : null,
        date: formData.date,
      });

      navigate(`/workouts/${id}`);
    } catch (err) {
      setError("Could not update workout.");
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) return <p className="status-text">Loading workout...</p>;
  if (error && !formData.name) return <p className="status-text">{error}</p>;

  return (
    <section className="workout-form-page">
      <Link className="back-link" to={id ? `/workouts/${id}` : "/"}>
        ← Back
      </Link>

      <div className="form-card">
        <h2>Edit Workout</h2>
        <p>Update the details of your workout and keep your log accurate.</p>

        <form onSubmit={handleSubmit} className="form-grid">
          <div className="form-group">
            <label htmlFor="name">Workout name</label>
            <input
              id="name"
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Leg Day"
            />
          </div>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="duration">Duration (minutes)</label>
              <input
                id="duration"
                type="number"
                name="duration"
                value={formData.duration}
                onChange={handleChange}
                placeholder="60"
              />
            </div>

            <div className="form-group">
              <label htmlFor="calories">Calories</label>
              <input
                id="calories"
                type="number"
                name="calories"
                value={formData.calories}
                onChange={handleChange}
                placeholder="450"
              />
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="date">Date</label>
            <input id="date" type="date" name="date" value={formData.date} onChange={handleChange} />
          </div>

          {error && <p className="form-error">{error}</p>}

          <div className="form-actions">
            <Link className="button-secondary" to={id ? `/workouts/${id}` : "/"}>
              Cancel
            </Link>
            <button type="submit" disabled={submitting}>
              {submitting ? "Updating..." : "Update Workout"}
            </button>
          </div>
        </form>
      </div>
    </section>
  );
}

export default EditWorkout;