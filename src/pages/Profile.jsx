import { useState, useEffect } from "react";
import { supabase } from "../supabase";

const INTERESTS = ["Outdoors", "Books", "Tech", "Games", "Making", "Wellness"];

function Profile() {
  const [name, setName] = useState("");
  const [interests, setInterests] = useState([]);
  const [notifications, setNotifications] = useState(true);
  const [saved, setSaved] = useState(false);
  const [photo, setPhoto] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadProfile();
  }, []);

  async function loadProfile() {
    const userId = localStorage.getItem("circleUserId");
    if (!userId) {
      setLoading(false);
      return;
    }
    const { data, error } = await supabase.from("users").select("*").eq("id", userId).single();
    if (!error && data) {
      setName(data.name || "");
      setInterests(data.interests ? data.interests.split(",").filter(Boolean) : []);
      setPhoto(data.photo_url || null);
    }
    setLoading(false);
  }

  function toggleInterest(interest) {
    if (interests.includes(interest)) {
      setInterests(interests.filter((i) => i !== interest));
    } else if (interests.length < 4) {
      setInterests([...interests, interest]);
    }
  }

  function handlePhotoUpload(e) {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => setPhoto(reader.result);
      reader.readAsDataURL(file);
    }
  }

  async function saveProfile() {
    const userId = localStorage.getItem("circleUserId");
    if (userId) {
      await supabase
        .from("users")
        .update({ name, interests: interests.join(","), photo_url: photo || "" })
        .eq("id", userId);
    }
    localStorage.setItem("circleName", name);
    localStorage.setItem("circleInterests", JSON.stringify(interests));
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  }

  if (loading) {
    return (
      <div className="phone">
        <p className="sub">Loading your profile...</p>
      </div>
    );
  }

  return (
    <div className="phone">
      <p className="eyebrow">your profile</p>
      <h1>Edit Profile</h1>

      <div className="avatar-row">
        <label style={{ cursor: "pointer" }}>
          {photo ? (
            <img src={photo} alt="Profile" style={{ width: 64, height: 64, borderRadius: "50%", objectFit: "cover" }} />
          ) : (
            <div className="avatar" style={{ background: "#8C4A2E", opacity: 1, width: 64, height: 64, fontSize: 20 }}>
              {name ? name.charAt(0).toUpperCase() : "?"}
            </div>
          )}
          <input type="file" accept="image/*" name="profilePhoto" onChange={handlePhotoUpload} style={{ display: "none" }} />
        </label>
      </div>
      <p className="sub" style={{ marginTop: -14, marginBottom: 20 }}>Tap your photo to change it</p>

      <input
        className="chip"
        name="displayName"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Your name"
      />

      <h3 style={{ fontSize: 15, margin: "16px 0 8px" }}>Interests (2-4)</h3>
      {INTERESTS.map((interest) => (
        <button
          key={interest}
          className={`chip ${interests.includes(interest) ? "active" : ""}`}
          onClick={() => toggleInterest(interest)}
        >
          {interest}
        </button>
      ))}

      <label style={{ display: "flex", alignItems: "center", gap: 8, margin: "16px 0", fontSize: 13 }}>
        <input type="checkbox" name="notificationsToggle" checked={notifications} onChange={() => setNotifications(!notifications)} />
        Enable notifications
      </label>

      <button className="primary-btn" onClick={saveProfile} disabled={interests.length < 2}>
        {saved ? "Saved ✓" : "Save profile"}
      </button>
    </div>
  );
}

export default Profile;