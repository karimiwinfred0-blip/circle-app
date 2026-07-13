import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../supabase";

function SignUp() {
  const [name, setName] = useState(localStorage.getItem("circleName") || "");
  const [email, setEmail] = useState(localStorage.getItem("circleEmail") || "");
  const [saving, setSaving] = useState(false);
  const navigate = useNavigate();

  async function handleContinue() {
    if (!name.trim()) return;
    setSaving(true);

    let userId = localStorage.getItem("circleUserId");

    if (userId) {
      await supabase.from("users").update({ name, email }).eq("id", userId);
    } else {
      const { data, error } = await supabase
        .from("users")
        .insert([{ name, email, interests: "", photo_url: "" }])
        .select();
      if (!error && data && data[0]) {
        userId = data[0].id;
        localStorage.setItem("circleUserId", userId);
      }
    }

    localStorage.setItem("circleName", name);
    localStorage.setItem("circleEmail", email);
    setSaving(false);
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

      <button className="primary-btn" disabled={!name.trim() || saving} onClick={handleContinue}>
        {saving ? "Saving..." : "Continue"}
      </button>
    </div>
  );
}

export default SignUp;