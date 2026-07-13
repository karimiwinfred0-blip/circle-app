import { useState, useEffect } from "react";
import { supabase } from "../supabase";

const CATEGORIES = ["Outdoors", "Books", "Tech", "Games", "Making", "Wellness"];

function AllEvents() {
  const [events, setEvents] = useState([]);

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

  return (
    <div className="phone">
      <p className="eyebrow">browse</p>
      <h1>All Events</h1>

      <h3 style={{ fontSize: 15, marginBottom: 8 }}>Everything, combined</h3>
      {events.length === 0 ? (
        <p className="sub">No events posted yet.</p>
      ) : (
        events.map((e) => (
          <div key={e.id} className="meetup-card">
            <p style={{ fontWeight: 700 }}>{e.title}</p>
            <p style={{ fontSize: 12, opacity: 0.85 }}>{e.category}</p>
            <p>{new Date(e.datetime).toLocaleString()} · {e.location}</p>
          </div>
        ))
      )}

      {CATEGORIES.map((cat) => {
        const catEvents = events.filter((e) => e.category === cat);
        return (
          <div key={cat}>
            <h3 style={{ fontSize: 15, margin: "24px 0 8px" }}>{cat}</h3>
            {catEvents.length === 0 ? (
              <p className="sub">No {cat.toLowerCase()} events yet.</p>
            ) : (
              catEvents.map((e) => (
                <div key={e.id} className="chip" style={{ cursor: "default" }}>
                  <p style={{ fontWeight: 600 }}>{e.title}</p>
                  <p style={{ fontSize: 12, color: "#8C7B5F" }}>
                    {new Date(e.datetime).toLocaleString()} · {e.location}
                  </p>
                </div>
              ))
            )}
          </div>
        );
      })}
    </div>
  );
}

export default AllEvents;