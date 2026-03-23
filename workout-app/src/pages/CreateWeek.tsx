import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { createWeek } from "../services/week.service";
import "../styles/workout-form.css";

function CreateWeek() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    title: "",
    startDate: "",
    notes: ""
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");

    if (!formData.title || !formData.startDate) {
      setError("Please fill in title and start date.");
      return;
    }

    try {
      setLoading(true);
      await createWeek({
        title: formData.title,
        startDate: formData.startDate,
        notes: formData.notes || undefined
      });
      navigate("/");
    } catch (err) {
      setError("Could not create week.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="workout-form-page">
      <Link className="back-link" to="/">
        ← Back to planner
      </Link>

      <div className="form-card">
        <h2>Create Week</h2>
        <p>Define the container for your workouts so you can mirror your note layout.</p>

        <form onSubmit={handleSubmit} className="form-grid">
          <div className="form-group">
            <label htmlFor="title">Week title</label>
            <input id="title" type="text" name="title" value={formData.title} onChange={handleChange} placeholder="Semana 01 · Fuerza" />
          </div>

          <div className="form-group">
            <label htmlFor="startDate">Start date</label>
            <input id="startDate" type="date" name="startDate" value={formData.startDate} onChange={handleChange} />
          </div>

          <div className="form-group">
            <label htmlFor="notes">Notes</label>
            <textarea id="notes" name="notes" rows={4} value={formData.notes} onChange={handleChange} placeholder="Notas generales de la semana" />
          </div>

          {error && <p className="form-error">{error}</p>}

          <div className="form-actions">
            <Link className="button-secondary" to="/">
              Cancel
            </Link>
            <button type="submit" disabled={loading}>
              {loading ? "Creating..." : "Create Week"}
            </button>
          </div>
        </form>
      </div>
    </section>
  );
}

export default CreateWeek;
