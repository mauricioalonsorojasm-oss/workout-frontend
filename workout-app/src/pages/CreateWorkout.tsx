import { useEffect, useState } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { createWorkout } from "../services/workout.service";
import { getWeeks, type Week } from "../services/week.service";
import "../styles/workout-form.css";

function CreateWorkout() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const [weeks, setWeeks] = useState<Week[]>([]);
  const [formData, setFormData] = useState({
    weekId: "",
    dayOrder: "",
    dayLabel: "",
    focusTag: "",
    notes: "",
    date: ""
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const loadWeeks = async () => {
      try {
        const data = await getWeeks();
        setWeeks(data);

        const preset = searchParams.get("weekId");
        if (preset) {
          setFormData((prev) => ({ ...prev, weekId: preset }));
        } else if (data.length > 0) {
          setFormData((prev) => ({ ...prev, weekId: data[0].id }));
        }
      } catch (err) {
        setError("Could not load weeks.");
      }
    };

    loadWeeks();
  }, [searchParams]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");

    if (!formData.weekId || !formData.dayOrder || !formData.dayLabel) {
      setError("Please fill in week, order and label.");
      return;
    }

    try {
      setLoading(true);
      await createWorkout({
        weekId: formData.weekId,
        dayOrder: Number(formData.dayOrder),
        dayLabel: formData.dayLabel,
        focusTag: formData.focusTag || undefined,
        notes: formData.notes || undefined,
        date: formData.date || undefined
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
        ← Back to planner
      </Link>

      <div className="form-card">
        <h2>Add day to week</h2>
        <p>Mirror the structure of your notebook days (label, focus, cues).</p>

        <form onSubmit={handleSubmit} className="form-grid">
          <div className="form-group">
            <label htmlFor="weekId">Week</label>
            <select id="weekId" name="weekId" value={formData.weekId} onChange={handleChange}>
              {weeks.length === 0 && <option value="">No weeks available</option>}
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
              <input id="dayOrder" type="number" name="dayOrder" value={formData.dayOrder} onChange={handleChange} placeholder="1" />
            </div>

            <div className="form-group">
              <label htmlFor="dayLabel">Day label</label>
              <input id="dayLabel" type="text" name="dayLabel" value={formData.dayLabel} onChange={handleChange} placeholder="Día 1 — Upper" />
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="focusTag">Focus tag</label>
            <input id="focusTag" type="text" name="focusTag" value={formData.focusTag} onChange={handleChange} placeholder="Upper / Lower / Pull" />
          </div>

          <div className="form-group">
            <label htmlFor="date">Date</label>
            <input id="date" type="date" name="date" value={formData.date} onChange={handleChange} />
          </div>

          <div className="form-group">
            <label htmlFor="notes">Notes</label>
            <textarea id="notes" name="notes" rows={4} value={formData.notes} onChange={handleChange} placeholder="Notas o cues generales" />
          </div>

          {error && <p className="form-error">{error}</p>}

          <div className="form-actions">
            <Link className="button-secondary" to="/">
              Cancel
            </Link>
            <button type="submit" disabled={loading || weeks.length === 0}>
              {loading ? "Creating..." : "Create day"}
            </button>
          </div>
        </form>
      </div>
    </section>
  );
}

export default CreateWorkout;
