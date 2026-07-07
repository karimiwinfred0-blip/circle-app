import { useState } from "react";

const SEED_GROUPS = [
  { id: 1, name: "Sunrise Collective", members: 5, status: "Forming" },
  { id: 2, name: "Thursday Runners", members: 4, status: "Recurring" },
  { id: 3, name: "Nairobi Book Circle", members: 3, status: "First Meetup Done" },
];

const SEED_PENDING_EVENTS = [
  { id: 1, title: "Chess in the Park", submittedBy: "Brian", datetime: "2026-07-14T16:00" },
];

const SEED_SUGGESTIONS = [
  { id: 1, text: "Would love a dark mode option!" },
];

function Admin({ isAdmin }) {
  const [groups] = useState(SEED_GROUPS);
  const [pendingEvents, setPendingEvents] = useState(SEED_PENDING_EVENTS);
  const [suggestions] = useState(SEED_SUGGESTIONS);

  if (!isAdmin) {
    return (
      <div className="phone">
        <h1>Not authorized</h1>
        <p className="sub">This page is for admins only.</p>
      </div>
    );
  }

  const groupsFormed = groups.length;
  const firstMeetupsDone = groups.filter(
    (g) => g.status === "First Meetup Done" || g.status === "Recurring"
  ).length;
  const metSecondTime = groups.filter((g) => g.status === "Recurring").length;

  function approveEvent(id) {
    setPendingEvents(pendingEvents.filter((e) => e.id !== id));
  }

  function rejectEvent(id) {
    setPendingEvents(pendingEvents.filter((e) => e.id !== id));
  }

  return (
    <div className="phone">
      <p className="eyebrow">admin dashboard</p>
      <h1>Community Health</h1>

      <div style={{ display: "flex", gap: 10, marginBottom: 24 }}>
        <div className="meetup-card" style={{ flex: 1, textAlign: "center" }}>
          <p style={{ fontSize: 22, fontWeight: 700 }}>{groupsFormed}</p>
          <p style={{ fontSize: 12 }}>Groups Formed</p>
        </div>
        <div className="meetup-card" style={{ flex: 1, textAlign: "center" }}>
          <p style={{ fontSize: 22, fontWeight: 700 }}>{firstMeetupsDone}</p>
          <p style={{ fontSize: 12 }}>First Meetups</p>
        </div>
        <div className="meetup-card" style={{ flex: 1, textAlign: "center" }}>
          <p style={{ fontSize: 22, fontWeight: 700 }}>{metSecondTime}</p>
          <p style={{ fontSize: 12 }}>Met Again</p>
        </div>
      </div>

      <h3 style={{ fontSize: 15, marginBottom: 8 }}>Event Approval Queue</h3>
      {pendingEvents.length === 0 ? (
        <p className="sub">No events waiting for approval.</p>
      ) : (
        pendingEvents.map((e) => (
          <div key={e.id} className="chip" style={{ cursor: "default" }}>
            <p style={{ fontWeight: 600 }}>{e.title}</p>
            <p style={{ fontSize: 12, color: "#8C7B5F" }}>
              by {e.submittedBy} · {new Date(e.datetime).toLocaleString()}
            </p>
            <div style={{ display: "flex", gap: 8, marginTop: 8 }}>
              <button
                className="primary-btn"
                style={{ margin: 0, padding: "8px", fontSize: 13 }}
                onClick={() => approveEvent(e.id)}
              >
                Approve
              </button>
              <button
                className="primary-btn"
                style={{ margin: 0, padding: "8px", fontSize: 13, background: "#8C4A2E" }}
                onClick={() => rejectEvent(e.id)}
              >
                Reject
              </button>
            </div>
          </div>
        ))
      )}

      <h3 style={{ fontSize: 15, margin: "20px 0 8px" }}>Suggestion Box</h3>
      {suggestions.length === 0 ? (
        <p className="sub">No suggestions yet.</p>
      ) : (
        suggestions.map((s) => (
          <div key={s.id} className="chip" style={{ cursor: "default" }}>
            {s.text}
          </div>
        ))
      )}
    </div>
  );
}

export default Admin;