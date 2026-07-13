import { useState, useEffect } from "react";
import { supabase } from "../supabase";

const MEMBERS = [
  { name: "Achieng", initials: "A", color: "#C4622D", rsvp: "Going" },
  { name: "Brian", initials: "B", color: "#2B4636", rsvp: "Maybe" },
  { name: "Faith", initials: "F", color: "#D9A441", rsvp: "Going" },
  { name: "Kevin", initials: "K", color: "#7A8B6F", rsvp: "Not Going" },
  { name: "You", initials: "Y", color: "#8C4A2E", rsvp: "Select your RSVP" },
];

function GroupDashboard() {
  const [members, setMembers] = useState(MEMBERS);
  const [meetupDone, setMeetupDone] = useState(false);
  const [ritualStatus, setRitualStatus] = useState("undecided");
  const [remindersOn, setRemindersOn] = useState(true);
  const [groupName, setGroupName] = useState("Sunrise Collective");
  const [editingName, setEditingName] = useState(false);

  const [availableEvents, setAvailableEvents] = useState([]);
  const [selectedEventId, setSelectedEventId] = useState("");
  const [pickingEvent, setPickingEvent] = useState(false);

  useEffect(() => {
    fetchEvents();
  }, []);

  async function fetchEvents() {
    const { data, error } = await supabase
      .from("events")
      .select("*")
      .order("datetime", { ascending: true });
    if (!error) setAvailableEvents(data);
  }

  function updateMyRsvp(value) {
    setMembers(members.map((m) => (m.name === "You" ? { ...m, rsvp: value } : m)));
  }

  const confirmedCount = members.filter((m) => m.rsvp === "Going").length;
  const proposedMeetup = availableEvents.find((e) => e.id === selectedEventId);

  return (
    <div className="phone">
      <p className="eyebrow">{groupName} · Forming</p>

      {editingName ? (
        <input
          className="chip"
          name="groupName"
          value={groupName}
          onChange={(e) => setGroupName(e.target.value)}
          onBlur={() => setEditingName(false)}
          autoFocus
        />
      ) : (
        <h1 onClick={() => setEditingName(true)} style={{ cursor: "pointer" }}>
          {groupName} ✏️
        </h1>
      )}

      <p className="sub">Say hi, show up, and keep the momentum going.</p>

      <h3 style={{ marginTop: 20, marginBottom: 8, fontSize: 15 }}>Your People</h3>
      {members.map((m) => (
        <div key={m.name} style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 8 }}>
          <div className="avatar" style={{ background: m.color, opacity: 1 }}>{m.initials}</div>
          <span style={{ fontSize: 14 }}>{m.name}</span>
          <span style={{ fontSize: 12, color: "#8C7B5F", marginLeft: "auto" }}>{m.rsvp}</span>
        </div>
      ))}

      <h3 style={{ fontSize: 15, margin: "20px 0 8px" }}>Proposed Meetup</h3>

      {proposedMeetup ? (
        <div className="meetup-card">
          <p>📅 {new Date(proposedMeetup.datetime).toLocaleString()}</p>
          <p>📍 {proposedMeetup.title} · {proposedMeetup.location}</p>
          <select
            name="rsvpStatus"
            value={members.find((m) => m.name === "You").rsvp}
            onChange={(e) => updateMyRsvp(e.target.value)}
            style={{ marginTop: 8, padding: 6, borderRadius: 6 }}
          >
            <option>Select your RSVP</option>
            <option>Going</option>
            <option>Not Going</option>
            <option>Maybe</option>
          </select>
          <button
            className="primary-btn"
            style={{ marginTop: 10, background: "transparent", border: "1.5px solid #F6F0E4", boxShadow: "none" }}
            onClick={() => setPickingEvent(true)}
          >
            Change meetup
          </button>
        </div>
      ) : (
        <p className="sub">No meetup picked yet. Choose one from upcoming events below.</p>
      )}

      {(pickingEvent || !proposedMeetup) && (
        <>
          {availableEvents.length === 0 ? (
            <p className="sub">No events posted yet — add one on the Events tab first.</p>
          ) : (
            availableEvents.map((e) => (
              <button
                key={e.id}
                className={`chip ${selectedEventId === e.id ? "active" : ""}`}
                onClick={() => {
                  setSelectedEventId(e.id);
                  setPickingEvent(false);
                }}
              >
                {e.title} — {new Date(e.datetime).toLocaleDateString()} · {e.location}
              </button>
            ))
          )}
        </>
      )}

      {proposedMeetup && !meetupDone && (
        <button className="primary-btn" onClick={() => setMeetupDone(true)}>
          Mark meetup as completed
        </button>
      )}

      {meetupDone && ritualStatus === "undecided" && (
        <div className="meetup-card" style={{ background: "#D9A441", color: "#2A2521" }}>
          <p>Make this a weekly ritual? (optional)</p>
          <p style={{ marginBottom: 10 }}>{confirmedCount} of {members.length} confirmed</p>
          <div style={{ display: "flex", gap: 8 }}>
            <button className="primary-btn" style={{ margin: 0, flex: 1 }} onClick={() => setRitualStatus("confirmed")}>
              Yes, make it weekly
            </button>
            <button
              className="primary-btn"
              style={{ margin: 0, flex: 1, background: "transparent", border: "1.5px solid #2A2521", color: "#2A2521", boxShadow: "none" }}
              onClick={() => setRitualStatus("skipped")}
            >
              Not now
            </button>
          </div>
        </div>
      )}

      {ritualStatus === "confirmed" && (
        <div className="meetup-card">
          <p>✅ Status: Recurring, same time and place every week.</p>
        </div>
      )}

      {ritualStatus === "skipped" && (
        <p className="sub">No standing ritual yet — you can set one up anytime from here.</p>
      )}

      <label style={{ display: "flex", alignItems: "center", gap: 8, marginTop: 16, fontSize: 13 }}>
        <input type="checkbox" name="remindersToggle" checked={remindersOn} onChange={() => setRemindersOn(!remindersOn)} />
        Meetup reminders
      </label>
    </div>
  );
}

export default GroupDashboard;