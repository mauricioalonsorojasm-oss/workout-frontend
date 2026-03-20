import "../styles/about.css";

function About() {
  return (
    <div className="about-page">
      <section className="about-hero">
        <div className="about-hero-content">
          <p className="about-kicker">About the project</p>
          <h1 className="about-title">Building a workout habit should feel simple</h1>
          <p className="about-subtitle">
            Workout Tracker was created to help people log their training in a clean,
            practical way without distractions, clutter, or overcomplicated features.
          </p>
        </div>
      </section>

      <section className="about-section">
        <div className="about-container">
          <h2 className="about-heading">The Problem</h2>
          <p className="about-text">
            Staying consistent with training is already hard enough. Many fitness apps
            add too much friction with noisy interfaces, unnecessary features, or
            workflows that make it harder to focus on the basics.
          </p>
          <p className="about-text">
            When logging a workout feels like work, it becomes easier to skip it.
            A simple and reliable tracker can make the process smoother and help turn
            training into a habit.
          </p>
        </div>
      </section>

      <section className="about-section about-solution">
        <div className="about-container">
          <h2 className="about-heading">The Solution</h2>
          <p className="about-text">
            Workout Tracker focuses on the essentials: creating workouts, reviewing
            details, editing sessions, and keeping a clear overview of progress.
            The goal is not to overwhelm the user, but to provide a fast, modern,
            and intuitive space to organize training sessions.
          </p>
        </div>
      </section>

      <section className="about-section">
        <div className="about-container">
          <h2 className="about-heading">What You Can Do with Workout Tracker</h2>

          <div className="about-features">
            <div className="about-feature">
              <h3 className="feature-title">Create Workouts</h3>
              <p className="feature-text">
                Add new training sessions with the most important information in just a few steps.
              </p>
            </div>

            <div className="about-feature">
              <h3 className="feature-title">Review Your Sessions</h3>
              <p className="feature-text">
                Open each workout to see the details, exercises, and overall structure of your training.
              </p>
            </div>

            <div className="about-feature">
              <h3 className="feature-title">Edit Anytime</h3>
              <p className="feature-text">
                Update workout information whenever needed to keep your history accurate.
              </p>
            </div>

            <div className="about-feature">
              <h3 className="feature-title">Stay Consistent</h3>
              <p className="feature-text">
                Keep everything organized in one place and make it easier to stick to your routine.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="about-section about-creators">
        <div className="about-container">
          <h2 className="about-heading">The Project</h2>

          <p className="about-text">
            Workout Tracker was developed as a full-stack web application during the
            Ironhack Web Development Bootcamp by <strong>María Pol Pujol</strong> and
            <strong> Mauricio Rojas Morales</strong>.
          </p>

          <p className="about-text">
            The project was built to practice modern frontend and backend development
            with a real use case, combining React, TypeScript, Express, Prisma, and PostgreSQL.
          </p>

          <p className="about-text">
            More than a technical exercise, Workout Tracker reflects the idea that good
            digital products do not need to be overloaded to be useful. Sometimes the
            best experience comes from doing a few things clearly and well.
          </p>

          <div className="about-note">
            <p>
              A simple product, a clear purpose, and a practical user experience — that was the mindset behind this project.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}

export default About;
