import { useEffect, useState } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import { getWorkoutById, updateWorkout } from "../services/workout.service";
import { getWeeks, type Week } from "../services/week.service";
import "../styles/workout-form.css";

function EditWorkout() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [weeks, setWeeks] = useState<Week[]>([]);
  const [formData, setFormData] = useState({
    weekId: "",
    dayOrder: "",
    dayLabel: "",
    focusTag: "",
    notes: "",
    date: ""
  });

  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const loadWeeks = async () => {
      try {
        const data = await getWeeks();
        setWeeks(data);
      } catch (err) {
        setError("Could not load weeks.");
      }
    };

    loadWeeks();
  }, []);

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
          weekId: data.weekId,
          dayOrder: data.dayOrder?.toString() ?? "",
          dayLabel: data.dayLabel ?? "",
          focusTag: data.focusTag ?? "",
          notes: data.notes ?? "",
          date: data.date ? data.date.slice(0, 10) : ""
        });
      } catch (err) {
        setError("Could not load workout.");
      } finally {
        setLoading(false);
      }
    };

    fetchWorkout();
  }, [id]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!id) return;

    if (!formData.weekId || !formData.dayOrder || !formData.dayLabel) {
      setError("Please fill in week, order and label.");
      return;
    }

    try {
      setSubmitting(true);
      setError("");

      await updateWorkout(id, {
        weekId: formData.weekId,
        dayOrder: Number(formData.dayOrder),
        dayLabel: formData.dayLabel,
        focusTag: formData.focusTag || undefined,
        notes: formData.notes || undefined,
        date: formData.date || undefined
      });

      navigate(`/workouts/${id}`);
    } catch (err) {
      setError("Could not update workout.");
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) return <p className="status-text">Loading workout...</p>;
  if (error && !formData.dayLabel) return <p className="status-text">{error}</p>;

  return (
    <section className="workout-form-page">
      <Link className="back-link" to={id ? `/workouts/${id}` : "/"}>
        ← Back
      </Link>

      <div className="form-card">
        <h2>Edit day</h2>
        <p>Keep your weekly plan consistent.</p>

        <form onSubmit={handleSubmit} className="form-grid">
          <div className="form-group">
            <label htmlFor="weekId">Week</label>
            <select id="weekId" name="weekId" value={formData.weekId} onChange={handleChange}>
              {weeks.map((week) => (
                <option key={week.id} value={week.id}>
                  {week.title}
                </option>
              ))}
            </select>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="dayOrder">Day order</label>
              <input id="dayOrder" type="number" name="dayOrder" value={formData.dayOrder} onChange={handleChange} />
            </div>

            <div className="form-group">
              <label htmlFor="dayLabel">Day label</label>
              <input id="dayLabel" type="text" name="dayLabel" value={formData.dayLabel} onChange={handleChange} />
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="focusTag">Focus tag</label>
            <input id="focusTag" type="text" name="focusTag" value={formData.focusTag} onChange={handleChange} />
          </div>

          <div className="form-group">
            <label htmlFor="date">Date</label>
            <input id="date" type="date" name="date" value={formData.date} onChange={handleChange} />
          </div>

          <div className="form-group">
            <label htmlFor="notes">Notes</label>
            <textarea id="notes" name="notes" rows={4} value={formData.notes} onChange={handleChange} />
          </div>

          {error && <p className="form-error">{error}</p>}

          <div className="form-actions">
            <Link className="button-secondary" to={id ? `/workouts/${id}` : "/"}>
              Cancel
            </Link>
            <button type="submit" disabled={submitting}>
              {submitting ? "Updating..." : "Update day"}
            </button>
          </div>
        </form>
      </div>
    </section>
  );
}

export default EditWorkout;
