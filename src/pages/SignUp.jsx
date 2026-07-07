import { useState } from "react";
import { useNavigate } from "react-router-dom";

function SignUp() {
  const [name, setName] = useState(localStorage.getItem("circleName") || "");
  const [email, setEmail] = useState(localStorage.getItem("circleEmail") || "");
  const navigate = useNavigate();

  function handleContinue() {
    if (!name.trim()) return;
    localStorage.setItem("circleName", name);
    localStorage.setItem("circleEmail", email);
    navigate("/onboarding");
  }

  return (
    <div className="phone">
      <p className="eyebrow">circle · nairobi</p>
      <h1>Let's get you set up</h1>
      <p className="sub">Tell us a bit about you first.</p>

      <input
        className="chip"
        name="fullName"
        placeholder="Your name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <input
        className="chip"
        name="email"
        placeholder="Email (optional)"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />

      <button className="primary-btn" disabled={!name.trim()} onClick={handleContinue}>
        Continue
      </button>
    </div>
  );
}

export default SignUp;