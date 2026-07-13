import { useState, useEffect } from "react";
import { supabase } from "../supabase";

function Events() {
  const [events, setEvents] = useState([]);
  const [suggestion, setSuggestion] = useState("");
  const [suggestions, setSuggestions] = useState([]);

  const [title, setTitle] = useState("");
  const [datetime, setDatetime] = useState("");
  const [location, setLocation] = useState("");
  const [overlapWarning, setOverlapWarning] = useState(false);

  // Load events once, then listen for live changes
  useEffect(() => {
    fetchEvents();

    const channel = supabase
      .channel("events-changes")
      .on("postgres_changes", { event: "*", schema: "public", table: "events" }, () => {
        fetchEvents();
      })
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  async function fetchEvents() {
    const { data, error } = await supabase
      .from("events")
      .select("*")
      .order("datetime", { ascending: true });
    if (!error) setEvents(data);
  }

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

  async function submitEvent() {
    if (!title || !datetime || !location) return;
    await supabase.from("events").insert([
      { title, datetime, location, rsvp: "Select your RSVP" },
    ]);
    setTitle("");
    setDatetime("");
    setLocation("");
    setOverlapWarning(false);
  }

  async function updateRsvp(id, value) {
    await supabase.from("events").update({ rsvp: value }).eq("id", id);
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