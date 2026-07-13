import { useState, useEffect } from "react";
import { supabase } from "../supabase";

const CATEGORIES = ["All", "Outdoors", "Books", "Tech", "Games", "Making", "Wellness"];

function AllEvents() {
  const [events, setEvents] = useState([]);
  const [filter, setFilter] = useState("All");

  useEffect(() => {
    fetchEvents();
  }, []);

  async function fetchEvents() {
    const { data, error } = await supabase
      .from("events")
      .select("*")
      .order("datetime", { ascending: true });
    if (!error) setEvents(data);
  }

  const filtered = filter === "All" ? events : events.filter((e) => e.category === filter);

  return (
    <div className="phone">
      <p className="eyebrow">browse</p>
      <h1>All Events</h1>

      <div style={{ display: "flex", gap: 6, flexWrap: "wrap", marginBottom: 20 }}>
        {CATEGORIES.map((c) => (
          <button
            key={c}
            onClick={() => setFilter(c)}
            style={{
              padding: "6px 12px",
              borderRadius: 16,
              fontSize: 12,
              fontWeight: 600,
              border: "1.5px solid #E4DACB",
              background: filter === c ? "#2A2521" : "#fff",
              color: filter === c ? "#F6F0E4" : "#2A2521",
              cursor: "pointer",
            }}
          >
            {c}
          </button>
        ))}
      </div>

      <h3 style={{ fontSize: 15, marginBottom: 8 }}>
        {filter === "All" ? "Everything" : filter}
      </h3>

      {filtered.length === 0 ? (
        <p className="sub">No events in this category yet.</p>
      ) : (
        filtered.map((e) => (
          <div key={e.id} className="meetup-card">
            <p style={{ fontWeight: 700 }}>{e.title}</p>
            <p style={{ fontSize: 12, opacity: 0.85 }}>{e.category}</p>
            <p>{new Date(e.datetime).toLocaleString()} · {e.location}</p>
          </div>
        ))
      )}
    </div>
  );
}

export default AllEvents;