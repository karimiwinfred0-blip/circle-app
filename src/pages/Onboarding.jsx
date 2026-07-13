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

  function sharedInterestCount(groupInterestsStr, userInterests) {
    const groupInterests = groupInterestsStr.split(",").filter(Boolean);
    return groupInterests.filter((i) => userInterests.includes(i)).length;
  }

  async function findOrCreateGroup(userInterests) {
    // Look for any "Forming" group sharing at least 2 interests
    const { data: forming, error } = await supabase
      .from("groups")
      .select("*")
      .eq("status", "Forming");

    if (!error && forming) {
      const match = forming.find(
        (g) => sharedInterestCount(g.interests, userInterests) >= 2
      );
      if (match) return match;
    }

    // No match found, create a brand new group
    const { data: newGroup, error: createError } = await supabase
      .from("groups")
      .insert([
        {
          name: "New Circle",
          interests: userInterests.join(","),
          status: "Forming",
        },
      ])
      .select();

    if (!createError && newGroup && newGroup[0]) {
      return newGroup[0];
    }
    return null;
  }

  async function handleContinue() {
    setSaving(true);
    const userId = localStorage.getItem("circleUserId");
    const interestsString = selected.join(",");

    if (userId) {
      await supabase.from("users").update({ interests: interestsString }).eq("id", userId);

      const group = await findOrCreateGroup(selected);

      if (group) {
        // Check if user is already a member (avoid duplicates)
        const { data: existingMembership } = await supabase
          .from("group_members")
          .select("*")
          .eq("group_id", group.id)
          .eq("user_id", userId);

        if (!existingMembership || existingMembership.length === 0) {
          await supabase.from("group_members").insert([
            { group_id: group.id, user_id: userId, rsvp: "Select your RSVP" },
          ]);
        }

        localStorage.setItem("circleGroupId", group.id);
      }
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
        {saving ? "Finding your circle..." : "Find my circle"}
      </button>
    </div>
  );
}

export default Onboarding;