import { useState } from "react";

const SEED_GROUPS = [
  { id: 1, name: "Sunrise Collective", members: 5, status: "Forming" },
  { id: 2, name: "Thursday Runners", members: 4, status: "Recurring" },
  { id: 3, name: "Nairobi Book Circle", members: 3, status: "First Meetup Done" },
];

function GroupsManagement({ isAdmin }) {
  const [groups] = useState(SEED_GROUPS);
  const [selectedGroup, setSelectedGroup] = useState(null);

  if (!isAdmin) {
    return (
      <div className="phone">
        <h1>Not authorized</h1>
        <p className="sub">This page is for admins only.</p>
      </div>
    );
  }

  return (
    <div className="phone">
      <p className="eyebrow">manage groups</p>
      <h1>All Groups</h1>

      {groups.map((g) => (
        <div
          key={g.id}
          className="chip"
          onClick={() => setSelectedGroup(g)}
        >
          <p style={{ fontWeight: 600 }}>{g.name}</p>
          <p style={{ fontSize: 12, color: "#8C7B5F" }}>
            {g.members} members · {g.status}
          </p>
        </div>
      ))}

      {selectedGroup && (
        <div className="meetup-card">
          <p style={{ fontWeight: 700 }}>{selectedGroup.name}</p>
          <p>Status: {selectedGroup.status}</p>
          <p>Members: {selectedGroup.members}</p>
          <button
            className="primary-btn"
            style={{ marginTop: 10 }}
            onClick={() => setSelectedGroup(null)}
          >
            Close
          </button>
        </div>
      )}

      <button className="primary-btn" style={{ marginTop: 20 }}>
        Manually match waiting users
      </button>
    </div>
  );
}

export default GroupsManagement;