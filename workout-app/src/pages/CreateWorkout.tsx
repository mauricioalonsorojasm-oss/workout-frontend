import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { createWorkout } from "../services/workout.service";
import "../styles/workout-form.css";

function CreateWorkout() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    duration: "",
    calories: "",
    date: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");

    if (!formData.name || !formData.duration || !formData.date) {
      setError("Please fill in all required fields.");
      return;
    }

    try {
      setLoading(true);

      await createWorkout({
        name: formData.name,
        duration: Number(formData.duration),
        calories: formData.calories ? Number(formData.calories) : null,
        date: formData.date,
      });

      navigate("/");
    } catch (err) {
      setError("Could not create workout.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="workout-form-page">
      <Link className="back-link" to="/">
        ← Back to workouts
      </Link>

      <div className="form-card">
        <h2>Create Workout</h2>
        <p>Add a new training session with the basics you want to track.</p>

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
            <Link className="button-secondary" to="/">
              Cancel
            </Link>
            <button type="submit" disabled={loading}>
              {loading ? "Creating..." : "Create Workout"}
            </button>
          </div>
        </form>
      </div>
    </section>
  );
}

export default CreateWorkout;