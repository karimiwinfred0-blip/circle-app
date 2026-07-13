import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../supabase";

const INTERESTS = ["Outdoors", "Books", "Tech", "Games", "Making", "Wellness"];

function Onboarding() {
  const [selected, setSelected] = useState([]);
  const [saving, setSaving] = useState(false);
  const navigate = useNavigate();

  function toggleInterest(interest) {
    if (selected.includes(interest)) {
      setSelected(selected.filter((i) => i !== interest));
    } else if (selected.length < 4) {
      setSelected([...selected, interest]);
    }
  }

  async function handleContinue() {
    setSaving(true);
    const userId = localStorage.getItem("circleUserId");
    const interestsString = selected.join(",");

    if (userId) {
      await supabase.from("users").update({ interests: interestsString }).eq("id", userId);
    }

    localStorage.setItem("circleInterests", JSON.stringify(selected));
    setSaving(false);
    navigate("/group");
  }

  return (
    <div className="phone">
      <p className="eyebrow">circle · nairobi</p>
      <h1>What pulls you in?</h1>
      <p className="sub">Pick 2-4 interests.</p>

      {INTERESTS.map((interest) => (
        <button
          key={interest}
          className={`chip ${selected.includes(interest) ? "active" : ""}`}
          onClick={() => toggleInterest(interest)}
        >
          {interest}
        </button>
      ))}

      <button
        className="primary-btn"
        disabled={selected.length < 2 || saving}
        onClick={handleContinue}
      >
        {saving ? "Saving..." : "Find my circle"}
      </button>
    </div>
  );
}

export default Onboarding;