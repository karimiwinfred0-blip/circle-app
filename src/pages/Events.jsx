import { useState } from "react";

const APPROVED_SEED = [
  { id: 1, title: "Karura Forest Run", datetime: "2026-07-11T07:00", location: "Karura Forest", rsvp: "Select your RSVP" },
];

function Events() {
  const [events, setEvents] = useState(APPROVED_SEED);
  const [suggestion, setSuggestion] = useState("");
  const [suggestions, setSuggestions] = useState([]);

  const [title, setTitle] = useState("");
  const [datetime, setDatetime] = useState("");
  const [location, setLocation] = useState("");
  const [overlapWarning, setOverlapWarning] = useState(false);

  function checkOverlap(newDatetime) {
    if (!newDatetime) return false;
    const newTime = new Date(newDatetime).getTime();
    return events.some((e) => {
      const diffHours = Math.abs(newTime - new Date(e.datetime).getTime()) / 3600000;
      return diffHours < 2;
    });
  }

  function handleDatetimeChange(value) {
    setDatetime(value);
    setOverlapWarning(checkOverlap(value));
  }

  function submitEvent() {
    if (!title || !datetime || !location) return;
    setEvents([
      ...events,
      { id: Date.now(), title, datetime, location, rsvp: "Select your RSVP" },
    ]);
    setTitle("");
    setDatetime("");
    setLocation("");
    setOverlapWarning(false);
  }

  function updateRsvp(id, value) {
    setEvents(events.map((e) => (e.id === id ? { ...e, rsvp: value } : e)));
  }

  function submitSuggestion() {
    if (!suggestion.trim()) return;
    setSuggestions([...suggestions, suggestion]);
    setSuggestion("");
  }

  return (
    <div className="phone">
      <p className="eyebrow">community events</p>
      <h1>Events</h1>
      <p className="sub">Anyone can post an event — and anyone can RSVP.</p>

      <h3 style={{ fontSize: 15, marginBottom: 8 }}>Upcoming Events</h3>
      {events.length === 0 ? (
        <p className="sub">No events yet — add the first one below.</p>
      ) : (
        events.map((e) => (
          <div key={e.id} className="meetup-card">
            <p style={{ fontWeight: 700 }}>{e.title}</p>
            <p>{new Date(e.datetime).toLocaleString()} · {e.location}</p>
            <select
              name={`rsvp-${e.id}`}
              value={e.rsvp}
              onChange={(ev) => updateRsvp(e.id, ev.target.value)}
              style={{ marginTop: 8, padding: 6, borderRadius: 6 }}
            >
              <option>Select your RSVP</option>
              <option>Going</option>
              <option>Not Going</option>
              <option>Maybe</option>
            </select>
          </div>
        ))
      )}

      <h3 style={{ fontSize: 15, margin: "20px 0 8px" }}>Add an Event</h3>
      <input className="chip" name="eventTitle" placeholder="Event title" value={title} onChange={(e) => setTitle(e.target.value)} />
      <input className="chip" name="eventDatetime" type="datetime-local" value={datetime} onChange={(e) => handleDatetimeChange(e.target.value)} />
      <input className="chip" name="eventLocation" placeholder="Location" value={location} onChange={(e) => setLocation(e.target.value)} />

      {overlapWarning && (
        <p style={{ color: "#C4622D", fontSize: 13, marginBottom: 10 }}>
          ⚠️ Heads up — this overlaps with an existing event.
        </p>
      )}

      <button className="primary-btn" onClick={submitEvent}>Post event</button>

      <h3 style={{ fontSize: 15, margin: "20px 0 8px" }}>Suggestion Box</h3>
      <input className="chip" name="suggestion" placeholder="Got feedback on the app?" value={suggestion} onChange={(e) => setSuggestion(e.target.value)} />
      <button className="primary-btn" onClick={submitSuggestion}>Send feedback</button>
    </div>
  );
}

export default Events;