import "../styles/contact.css";

function Contact() {
  return (
    <div className="contact-page">
      <div className="contact-container">
        <p className="contact-kicker">Let’s connect</p>
        <h1 className="contact-title">Contact</h1>

        <p className="contact-text">
          Workout Tracker was created as a project during the Ironhack Web Development
          Bootcamp by <strong>María Pol Pujol</strong> and <strong>Mauricio Rojas Morales</strong>.
        </p>

        <p className="contact-text">
          If you would like to know more about the project, connect professionally,
          or reach out about frontend or full-stack opportunities, feel free to get in touch.
        </p>

        <div className="contact-cards">
          <div className="contact-card">
            <div className="contact-avatar" aria-hidden="true">MP</div>
            <h3 className="contact-name">María Pol Pujol</h3>
            <p className="contact-role">Co-creator</p>

            <div className="contact-links">
              <a href="mailto:maria.pujolpol@gmail.com" className="contact-link">
                <span>Email</span>
                <span>↗</span>
              </a>

              <a
                href="https://www.linkedin.com/in/mariapolpujol"
                target="_blank"
                rel="noreferrer"
                className="contact-link"
              >
                <span>LinkedIn</span>
                <span>↗</span>
              </a>

              <a
                href="https://github.com/mariapujolpol"
                target="_blank"
                rel="noreferrer"
                className="contact-link"
              >
                <span>GitHub</span>
                <span>↗</span>
              </a>
            </div>
          </div>

          <div className="contact-card">
            <div className="contact-avatar" aria-hidden="true">MR</div>
            <h3 className="contact-name">Mauricio Rojas M.</h3>
            <p className="contact-role">Co-creator</p>

            <div className="contact-links">
              <a href="mailto:mauricioalonsorojasm@gmail.com" className="contact-link">
                <span>Email</span>
                <span>↗</span>
              </a>

              <a
                href="https://www.linkedin.com/in/mauricioalonsorojasm/"
                target="_blank"
                rel="noreferrer"
                className="contact-link"
              >
                <span>LinkedIn</span>
                <span>↗</span>
              </a>

              <a
                href="https://github.com/mauricioalonsorojasm-oss"
                target="_blank"
                rel="noreferrer"
                className="contact-link"
              >
                <span>GitHub</span>
                <span>↗</span>
              </a>
            </div>
          </div>
        </div>

        <div className="contact-footer-note">
          <p>
            Open to conversations about web development, product thinking, and junior frontend or full-stack opportunities.
          </p>
        </div>
      </div>
    </div>
  );
}

export default Contact;
