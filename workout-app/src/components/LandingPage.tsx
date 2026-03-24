import { GoogleLogin } from "@react-oauth/google";
import { useAuth } from "../context/AuthContext";

const features = [
  {
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="4" width="18" height="18" rx="2" />
        <line x1="16" y1="2" x2="16" y2="6" />
        <line x1="8" y1="2" x2="8" y2="6" />
        <line x1="3" y1="10" x2="21" y2="10" />
      </svg>
    ),
    title: "Plan Your Week",
    desc: "Organize your training sessions by week. Set goals and structure your routine in minutes.",
  },
  {
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M18 8h1a4 4 0 0 1 0 8h-1" />
        <path d="M2 8h16v9a4 4 0 0 1-4 4H6a4 4 0 0 1-4-4V8z" />
        <line x1="6" y1="1" x2="6" y2="4" />
        <line x1="10" y1="1" x2="10" y2="4" />
        <line x1="14" y1="1" x2="14" y2="4" />
      </svg>
    ),
    title: "Log Workouts",
    desc: "Record exercises, sets, reps and notes for every session. Never lose track of your progress.",
  },
  {
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" />
      </svg>
    ),
    title: "Stay Consistent",
    desc: "Review past workouts, spot patterns and keep the momentum going week after week.",
  },
];

const LandingPage = () => {
  const { login } = useAuth();

  return (
    <div className="landing">
      <section className="landing-hero">
        <div className="landing-logo">
          <img src="/logo-gym.svg" alt="Workout Tracker" />
        </div>
        <p className="landing-kicker">Your training, organized</p>
        <h2 className="landing-title">
          Plan. Train. <span className="landing-title-accent">Progress.</span>
        </h2>
        <p className="landing-subtitle">
          Workout Tracker helps you structure your weekly training, log every session and stay consistent — all in one clean place.
        </p>
        <div className="landing-login">
          <GoogleLogin
            onSuccess={(res) => {
              if (res.credential) {
                login(res.credential).catch(() => alert("Error al iniciar sesión"));
              }
            }}
            onError={() => alert("Login con Google falló")}
            text="signin_with"
            shape="rectangular"
            size="large"
          />
        </div>
      </section>

      <section className="landing-features">
        {features.map((f) => (
          <div key={f.title} className="landing-feature-card">
            <div className="landing-feature-icon">{f.icon}</div>
            <h3 className="landing-feature-title">{f.title}</h3>
            <p className="landing-feature-desc">{f.desc}</p>
          </div>
        ))}
      </section>
    </div>
  );
};

export default LandingPage;
