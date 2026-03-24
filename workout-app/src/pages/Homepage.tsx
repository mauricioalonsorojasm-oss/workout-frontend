import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getWeeks, toggleWeekCompletion, type Week } from "../services/week.service";
import { updateWorkoutStatus, type WorkoutStatus } from "../services/workout.service";
import "../styles/homepage.css";

const formatDay = (value?: string | null) => {
  if (!value) return "Sin fecha";
  return new Date(value).toLocaleDateString(undefined, {
    weekday: "short",
    day: "numeric",
    month: "short"
  });
};

function Homepage() {
  const [weeks, setWeeks] = useState<Week[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [actionMessage, setActionMessage] = useState("");
  const [pendingWorkout, setPendingWorkout] = useState<string | null>(null);
  const [pendingWeek, setPendingWeek] = useState<string | null>(null);

  const loadWeeks = async () => {
    try {
      setLoading(true);
      const data = await getWeeks({ full: true });
      setWeeks(data);
      setError("");
    } catch (err) {
      setError("Could not load weeks");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadWeeks();
  }, []);

  const handleDayToggle = async (workoutId: string, status: WorkoutStatus) => {
    try {
      setPendingWorkout(workoutId);
      await updateWorkoutStatus(workoutId, status);
      await loadWeeks();
      setActionMessage("");
    } catch (err) {
      setActionMessage("No se pudo actualizar el estado del día");
    } finally {
      setPendingWorkout(null);
    }
  };

  const handleWeekToggle = async (week: Week, target: boolean) => {
    if (target) {
      const allDone = week.workouts && week.workouts.length > 0 && week.workouts.every((w) => w.status === "DONE");
      if (!allDone) {
        setActionMessage("Completa todos los días antes de cerrar la semana");
        return;
      }
    }

    try {
      setPendingWeek(week.id);
      await toggleWeekCompletion(week.id, target);
      await loadWeeks();
      setActionMessage("");
    } catch (err) {
      setActionMessage("No se pudo actualizar la semana");
    } finally {
      setPendingWeek(null);
    }
  };

  if (loading) return <p className="status-text">Loading weekly planner...</p>;
  if (error) return <p className="status-text">{error}</p>;

  return (
    <section className="planner-page">
      <div className="page-header">
        <div>
          <p className="planner-kicker">Weekly planner</p>
          <h2>Structure your weeks like your notes</h2>
          <p>Review each day, see the rep schemes at a glance, and keep cues in context.</p>
          {actionMessage && <p className="planner-warning">{actionMessage}</p>}
        </div>
        <div className="planner-actions">
          <Link className="text-link" to="/weeks/new">
            + Create week
          </Link>
          <Link className="text-link" to="/workouts/new">
            + Add day to week
          </Link>
        </div>
      </div>

      {weeks.length === 0 ? (
        <div className="empty-state">
          <div className="empty-state__icon" aria-hidden="true">
            📒
          </div>
          <h3 className="empty-state__title">No weeks yet</h3>
          <p className="empty-state__text">Create your first week to mirror the layout from your notes.</p>
          <Link className="text-link" to="/weeks/new">
            Create your first week
          </Link>
        </div>
      ) : (
        <div className="week-stack">
          {weeks.map((week) => {
            const totalDays = week.workouts?.length ?? week._count?.workouts ?? 0;
            const completedDays = week.workouts ? week.workouts.filter((w) => w.status === "DONE").length : 0;
            const canComplete = week.workouts ? week.workouts.length > 0 && week.workouts.every((w) => w.status === "DONE") : false;

            return (
              <article key={week.id} className={`week-card ${week.isCompleted ? "week-card--completed" : ""}`}>
                <header className="week-card__header">
                  <div>
                    <p className="week-card__label">Starts {new Date(week.startDate).toLocaleDateString()}</p>
                    <h3>{week.title}</h3>
                    {week.notes && <p className="week-card__notes">{week.notes}</p>}
                  </div>
                  <div className="week-card__meta">
                    <span>
                      {completedDays}/{totalDays} days done
                    </span>
                    <label className="status-toggle">
                      <input
                        type="checkbox"
                        checked={week.isCompleted}
                        disabled={pendingWeek === week.id}
                        onChange={() => handleWeekToggle(week, !week.isCompleted)}
                      />
                      <span>{week.isCompleted ? "Week completed" : canComplete ? "Mark week complete" : "Pending days"}</span>
                    </label>
                  </div>
                </header>

                {week.workouts && week.workouts.length > 0 ? (
                  <div className="day-grid">
                    {week.workouts
                      .slice()
                      .sort((a, b) => a.dayOrder - b.dayOrder)
                      .map((workout) => (
                        <article key={workout.id} className={`day-card status-${workout.status.toLowerCase()}`}>
                          <header className="day-card__header">
                            <div>
                              <p className="day-card__order">Day {workout.dayOrder}</p>
                              <h4>{workout.dayLabel}</h4>
                            </div>
                            <div className="day-card__tag">
                              <span>{workout.focusTag ?? ""}</span>
                              <span>{formatDay(workout.date)}</span>
                              <label className="status-toggle">
                                <input
                                  type="checkbox"
                                  checked={workout.status === "DONE"}
                                  disabled={pendingWorkout === workout.id}
                                  onChange={(e) =>
                                    handleDayToggle(workout.id, e.target.checked ? "DONE" : "PLANNED")
                                  }
                                />
                                <span>{workout.status === "DONE" ? "Completed" : "Mark done"}</span>
                              </label>
                            </div>
                          </header>

                          <ul className="day-card__list">
                            {workout.exercises && workout.exercises.length > 0 ? (
                              workout.exercises
                                .slice()
                                .sort((a, b) => a.position - b.position)
                                .map((exercise) => (
                                  <li
                                    key={exercise.id}
                                    className={`exercise-row ${exercise.completed ? "exercise-row--completed" : ""}`}
                                  >
                                    <div>
                                      <p className="exercise-name">{exercise.name}</p>
                                      <p className="exercise-scheme">{exercise.scheme}</p>
                                    </div>
                                    <div className="exercise-meta">
                                      {exercise.weight ? (
                                        <span>
                                          {exercise.weight}
                                          {exercise.unit ? ` ${exercise.unit}` : " kg"}
                                        </span>
                                      ) : (
                                        exercise.unit === "bw" && <span>BW</span>
                                      )}
                                      {exercise.comment && <p className="exercise-comment">{exercise.comment}</p>}
                                    </div>
                                  </li>
                                ))
                            ) : (
                              <li className="exercise-row empty">No exercises yet</li>
                            )}
                          </ul>

                          {workout.notes && <p className="day-card__notes">{workout.notes}</p>}

                          <div className="day-card__actions">
                            <Link className="text-link" to={`/workouts/${workout.id}`}>
                              Details
                            </Link>
                            <Link className="text-link" to={`/workouts/${workout.id}/edit`}>
                              Edit
                            </Link>
                          </div>
                        </article>
                      ))}
                  </div>
                ) : (
                  <p className="status-text">No days defined yet.</p>
                )}
              </article>
            );
          })}
        </div>
      )}
    </section>
  );
}

export default Homepage;
