"use client";

import { useMemo, useRef, useState } from "react";
import Link from "next/link";

import { Event } from "@/types/Event";
import { formatDate, formatTimeRange } from "@/utils/date";

const weekdayLabels = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
type VisibilityFilter = "ALL" | "PUBLIC" | "PRIVATE";

const memberEvents: Event[] = [
  {
    uid: "spring-kickoff-social-2026-03-03T22:00:00.000Z",
    summary: "Spring Kickoff Social",
    startISO: "2026-03-03T22:00:00.000Z",
    endISO: "2026-03-04T00:00:00.000Z",
    location: "Squires Student Center",
    class: "PUBLIC",
    description: "Start the month with food, games, and an easy way to reconnect with returning members and meet new students.",
  },
  {
    uid: "exec-board-meeting-2026-03-05T23:00:00.000Z",
    summary: "Executive Board Meeting",
    startISO: "2026-03-05T23:00:00.000Z",
    endISO: "2026-03-06T00:15:00.000Z",
    location: "Johnson Student Center, Room 238",
    class: "PRIVATE",
    description: "Leadership planning session focused on event approvals, budget priorities, and chapter updates.",
  },
  {
    uid: "career-night-2026-03-10T22:30:00.000Z",
    summary: "Career Night with Alumni",
    startISO: "2026-03-10T22:30:00.000Z",
    endISO: "2026-03-11T00:00:00.000Z",
    location: "Torgersen Hall, Room 1100",
    class: "PUBLIC",
    description: "Hear from military-connected Hokies about internships, job searches, and translating service experience into civilian careers.",
  },
  {
    uid: "vetzone-study-night-2026-03-12T23:00:00.000Z",
    summary: "VetZone Study Night",
    startISO: "2026-03-12T23:00:00.000Z",
    endISO: "2026-03-13T02:00:00.000Z",
    location: "VetZone @ Johnson Student Center",
    class: "PRIVATE",
    description: "Quiet study block with snacks, coffee, and time to check in with classmates before midterms.",
  },
  {
    uid: "service-project-2026-03-18T14:00:00.000Z",
    summary: "Community Service Project",
    startISO: "2026-03-18T14:00:00.000Z",
    endISO: "2026-03-18T17:00:00.000Z",
    location: "Blacksburg Interfaith Food Pantry",
    class: "PUBLIC",
    description: "Volunteer shift supporting local families while representing Veterans@VT in the community.",
  },
  {
    uid: "march-member-lunch-2026-03-20T16:30:00.000Z",
    summary: "Member Lunch Meetup",
    startISO: "2026-03-20T16:30:00.000Z",
    endISO: "2026-03-20T18:00:00.000Z",
    location: "Owens Food Court",
    class: "PRIVATE",
    description: "Casual lunch meetup for members who want an easy midweek break and time to catch up.",
  },
  {
    uid: "social-chair-game-night-2026-03-24T23:00:00.000Z",
    summary: "Game Night",
    startISO: "2026-03-24T23:00:00.000Z",
    endISO: "2026-03-25T01:00:00.000Z",
    location: "Squires Student Center, Break Zone",
    class: "PUBLIC",
    description: "Board games, cards, and low-key competition designed to help members unwind and build community.",
  },
  {
    uid: "member-check-in-2026-03-27T19:00:00.000Z",
    summary: "Member Check-In",
    startISO: "2026-03-27T19:00:00.000Z",
    endISO: "2026-03-27T20:00:00.000Z",
    location: "Virtual on Zoom",
    class: "PRIVATE",
    description: "Quick virtual check-in on the semester, upcoming needs, and ideas for future programming.",
  },
];

function startOfMonth(date: Date) {
  return new Date(date.getFullYear(), date.getMonth(), 1);
}

function isSameDay(a: Date, b: Date) {
  return (
    a.getFullYear() === b.getFullYear() &&
    a.getMonth() === b.getMonth() &&
    a.getDate() === b.getDate()
  );
}

function formatMonthYear(date: Date) {
  return new Intl.DateTimeFormat("en-US", {
    month: "long",
    year: "numeric",
  }).format(date);
}

function getMonthGrid(month: Date) {
  const firstDay = startOfMonth(month);
  const gridStart = new Date(firstDay);
  gridStart.setDate(firstDay.getDate() - firstDay.getDay());

  return Array.from({ length: 42 }, (_, index) => {
    const day = new Date(gridStart);
    day.setDate(gridStart.getDate() + index);
    return day;
  });
}

export default function CalendarPage() {
  const [currentMonth, setCurrentMonth] = useState(() => new Date(2026, 2, 1));
  const [selectedEventId, setSelectedEventId] = useState<string | null>(null);
  const [visibilityFilter, setVisibilityFilter] = useState<VisibilityFilter>("ALL");
  const today = new Date();
  const eventItemRefs = useRef<Record<string, HTMLElement | null>>({});

  const monthGrid = useMemo(() => getMonthGrid(currentMonth), [currentMonth]);

  const eventsByDay = useMemo(() => {
    const map = new Map<string, Event[]>();

    memberEvents
      .filter((event) => visibilityFilter === "ALL" || event.class === visibilityFilter)
      .forEach((event) => {
      const eventDate = new Date(event.startISO);
      const key = eventDate.toDateString();
      const existing = map.get(key) ?? [];
      existing.push(event);
      existing.sort(
        (a, b) => new Date(a.startISO).getTime() - new Date(b.startISO).getTime()
      );
      map.set(key, existing);
      });

    return map;
  }, [visibilityFilter]);

  const monthEvents = useMemo(
    () =>
      memberEvents
        .filter((event) => visibilityFilter === "ALL" || event.class === visibilityFilter)
        .filter((event) => {
          const date = new Date(event.startISO);
          return (
            date.getFullYear() === currentMonth.getFullYear() &&
            date.getMonth() === currentMonth.getMonth()
          );
        })
        .sort((a, b) => new Date(a.startISO).getTime() - new Date(b.startISO).getTime()),
    [currentMonth, visibilityFilter]
  );

  function selectEvent(uid: string) {
    setSelectedEventId(uid);

    const target = eventItemRefs.current[uid];
    if (!target) return;

    target.scrollIntoView({ behavior: "smooth", block: "nearest" });
  }

  return (
    <>
      <section className="relative w-full bg-gradient-to-br from-vt-maroon to-vt-impactOrange">
        <div className="absolute inset-0 bg-black/20" aria-hidden="true" />
        <div className="relative mx-auto max-w-7xl px-4 py-12 text-white sm:px-6 lg:px-8 sm:py-16">
          <p className="text-sm font-semibold uppercase tracking-[0.24em] text-white/80">
            Members
          </p>
          <h1 className="mt-3 text-4xl font-vt-bold text-white/95 sm:text-5xl">
            Chapter Calendar
          </h1>
          <p className="mt-4 max-w-3xl text-base text-white/85 sm:text-lg">
            Track socials, meetings, professional development nights, and member-only events in one
            place.
          </p>
        </div>
      </section>

      <main className="bg-white px-4 py-8 text-black/90 dark:bg-[#14171a] dark:text-white/90 sm:px-6 lg:px-8 sm:py-10">
        <div className="mx-auto grid max-w-[1500px] items-start gap-6 xl:grid-cols-[minmax(0,3.5fr)_minmax(0,1.15fr)]">
          <section className="overflow-hidden rounded-2xl border border-black/10 bg-white shadow-sm dark:border-white/10 dark:bg-[#1a1e22]">
            <div className="flex flex-col gap-4 border-b border-black/10 px-5 py-5 dark:border-white/10 sm:flex-row sm:items-center sm:justify-between sm:px-6">
              <div>
                <h2 className="text-2xl font-vt-bold text-black/95 dark:text-white/95">
                  {formatMonthYear(currentMonth)}
                </h2>
              </div>

              <div className="flex gap-3">
                <button
                  type="button"
                  onClick={() =>
                    setCurrentMonth(
                      (prev) => new Date(prev.getFullYear(), prev.getMonth() - 1, 1)
                    )
                  }
                  className="rounded-md border border-black/10 bg-white px-4 py-2 text-sm font-semibold text-black/80 transition-all duration-200 hover:-translate-y-0.5 hover:border-vt-impactOrange/40 hover:text-vt-impactOrange hover:shadow-md dark:border-white/10 dark:bg-[#20252a] dark:text-white/80 dark:hover:border-white/20 dark:hover:text-white"
                >
                  Previous
                </button>
                <button
                  type="button"
                  onClick={() => setCurrentMonth(new Date(today.getFullYear(), today.getMonth(), 1))}
                  className="rounded-md bg-vt-impactOrange px-4 py-2 text-sm font-semibold text-white ring-2 ring-inset ring-white/20 transition-all duration-200 hover:-translate-y-0.5 hover:brightness-110 hover:shadow-lg"
                >
                  Today
                </button>
                <button
                  type="button"
                  onClick={() =>
                    setCurrentMonth(
                      (prev) => new Date(prev.getFullYear(), prev.getMonth() + 1, 1)
                    )
                  }
                  className="rounded-md border border-black/10 bg-white px-4 py-2 text-sm font-semibold text-black/80 transition-all duration-200 hover:-translate-y-0.5 hover:border-vt-impactOrange/40 hover:text-vt-impactOrange hover:shadow-md dark:border-white/10 dark:bg-[#20252a] dark:text-white/80 dark:hover:border-white/20 dark:hover:text-white"
                >
                  Next
                </button>
              </div>
            </div>

            <div className="grid grid-cols-7 border-b border-black/10 bg-black/[0.03] dark:border-white/10 dark:bg-white/[0.03]">
              {weekdayLabels.map((label) => (
                <div
                  key={label}
                  className="px-2 py-3 text-center text-xs font-semibold uppercase tracking-[0.18em] text-black/55 dark:text-white/50 sm:px-3"
                >
                  {label}
                </div>
              ))}
            </div>

            <div className="grid grid-cols-7">
              {monthGrid.map((day) => {
                const dayEvents = eventsByDay.get(day.toDateString()) ?? [];
                const isCurrentMonth = day.getMonth() === currentMonth.getMonth();
                const isToday = isSameDay(day, today);

                return (
                  <div
                    key={day.toISOString()}
                    className={[
                      "min-h-[120px] border-b border-r border-black/10 p-2 sm:min-h-[140px] sm:p-3",
                      "bg-white dark:border-white/10 dark:bg-[#1a1e22]",
                      !isCurrentMonth
                        ? "bg-black/[0.02] text-black/35 dark:bg-white/[0.02] dark:text-white/25"
                        : "",
                    ].join(" ")}
                  >
                    <div className="mb-2 flex items-center justify-between">
                      <span
                        className={[
                          "inline-flex h-8 w-8 items-center justify-center rounded-full text-sm font-semibold",
                          isToday
                            ? "bg-vt-maroon text-white"
                            : "text-black/80 dark:text-white/80",
                        ].join(" ")}
                      >
                        {day.getDate()}
                      </span>
                    </div>

                    <div className="space-y-2">
                      {dayEvents.slice(0, 2).map((event) => (
                        <div
                          key={event.uid}
                          onClick={() => selectEvent(event.uid)}
                          className={[
                            "cursor-pointer rounded-md px-2 py-2 text-left ring-1 ring-inset transition-all duration-200 hover:-translate-y-0.5 hover:brightness-110 hover:shadow-md hover:ring-white/30",
                            event.class === "PRIVATE"
                              ? "bg-vt-maroon/20 text-vt-maroon dark:bg-vt-maroon/30 dark:text-white"
                              : "bg-vt-impactOrange/20 text-black/90 dark:bg-vt-impactOrange/30 dark:text-white",
                            selectedEventId === event.uid
                              ? "ring-white/40 shadow-md"
                              : "ring-transparent",
                          ].join(" ")}
                        >
                          <p className="text-xs font-semibold leading-tight">{event.summary}</p>
                          <p className="mt-1 text-[11px] opacity-80">
                            {new Intl.DateTimeFormat("en-US", {
                              hour: "numeric",
                              minute: "2-digit",
                              hour12: true,
                            }).format(new Date(event.startISO))}
                          </p>
                        </div>
                      ))}
                      {dayEvents.length > 2 ? (
                        <p className="text-xs font-medium text-black/55 dark:text-white/55">
                          +{dayEvents.length - 2} more
                        </p>
                      ) : null}
                    </div>
                  </div>
                );
              })}
            </div>
          </section>

          <aside className="sticky top-6 flex max-h-[calc(100vh-3rem)] flex-col gap-6 self-start">
            <section className="flex min-h-0 flex-col rounded-2xl border border-black/10 bg-white p-6 shadow-sm dark:border-white/10 dark:bg-[#1a1e22]">
              <p className="text-sm font-semibold uppercase tracking-[0.24em] text-vt-impactOrange">
                This Month
              </p>
              <h2 className="mt-2 text-2xl font-vt-bold text-black/95 dark:text-white/95">
                Upcoming member events
              </h2>
              <p className="mt-2 text-sm text-black/65 dark:text-white/65">
                Showing {visibilityFilter === "ALL" ? "all events" : visibilityFilter === "PRIVATE" ? "members only events" : "public events"}
              </p>

              <div className="mt-4 flex flex-wrap items-center gap-3">
                {(["ALL", "PUBLIC", "PRIVATE"] as VisibilityFilter[]).map((value) => (
                  <button
                    key={value}
                    type="button"
                    onClick={() => setVisibilityFilter(value)}
                    className={[
                      "cursor-pointer rounded-md px-4 py-2 text-sm font-semibold transition-all duration-200",
                      visibilityFilter === value
                        ? "bg-vt-impactOrange text-white ring-2 ring-inset ring-white/20 hover:-translate-y-0.5 hover:brightness-110 hover:shadow-lg"
                        : "border border-black/10 bg-white text-black/80 hover:-translate-y-0.5 hover:border-vt-impactOrange/40 hover:text-vt-impactOrange hover:shadow-md dark:border-white/10 dark:bg-[#20252a] dark:text-white/80 dark:hover:border-white/20 dark:hover:text-white",
                    ].join(" ")}
                  >
                    {value === "ALL" ? "All events" : value === "PUBLIC" ? "Public" : "Members Only"}
                  </button>
                ))}
              </div>

              <div className="mt-5 max-h-[calc(100vh-22rem)] space-y-4 overflow-y-auto pr-2">
                {monthEvents.map((event) => (
                  <article
                    key={event.uid}
                    ref={(node) => {
                      eventItemRefs.current[event.uid] = node;
                    }}
                    tabIndex={-1}
                    onClick={() => selectEvent(event.uid)}
                    className={[
                      "cursor-pointer rounded-xl border border-black/10 bg-gray-50 p-4 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md focus:outline-none",
                      "dark:border-white/10 dark:bg-[#20252a]",
                      selectedEventId === event.uid
                        ? event.class === "PRIVATE"
                          ? "border-2 border-vt-maroon bg-vt-maroon/10 shadow-xl dark:bg-vt-maroon/15"
                          : "border-2 border-vt-impactOrange bg-vt-impactOrange/10 shadow-xl dark:bg-vt-impactOrange/15"
                        : "",
                    ].join(" ")}
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <p className="text-base font-vt-bold text-black/95 dark:text-white/95">
                          {event.summary}
                        </p>
                        <p className="mt-1 text-sm text-black/65 dark:text-white/65">
                          {formatDate(event.startISO, {
                            month: "short",
                            day: "numeric",
                            weekday: "short",
                          })}
                        </p>
                      </div>
                      <span
                        className={[
                          "rounded-full px-2.5 py-1 text-[11px] font-semibold uppercase tracking-[0.18em]",
                          event.class === "PRIVATE"
                            ? "bg-vt-maroon/10 text-vt-maroon dark:bg-vt-maroon/20 dark:text-white"
                            : "bg-vt-impactOrange/15 text-vt-impactOrange dark:bg-vt-impactOrange/20 dark:text-vt-impactOrange",
                        ].join(" ")}
                      >
                        {event.class ?? "Event"}
                      </span>
                    </div>

                    <p className="mt-3 text-sm text-black/80 dark:text-white/80">
                      {formatTimeRange(event.startISO, event.endISO)}
                    </p>

                    {event.location ? (
                      <p className="mt-1 text-sm text-black/65 dark:text-white/65">{event.location}</p>
                    ) : null}

                    {event.description ? (
                      <p className="mt-3 text-sm leading-relaxed text-black/75 dark:text-white/75">
                        {event.description}
                      </p>
                    ) : null}
                  </article>
                ))}
                {monthEvents.length === 0 ? (
                  <div className="rounded-xl border border-dashed border-black/10 bg-gray-50 p-4 text-sm text-black/65 dark:border-white/10 dark:bg-[#20252a] dark:text-white/65">
                    No events match the current filter for this month.
                  </div>
                ) : null}
              </div>
            </section>

            <section className="flex flex-col rounded-2xl border border-black/10 bg-white p-6 shadow-sm dark:border-white/10 dark:bg-[#1a1e22]">
              <p className="text-sm font-semibold uppercase tracking-[0.24em] text-vt-impactOrange">
                Quick Links
              </p>
              <div className="mt-4 space-y-3">
                <Link
                  href="/public-events"
                  className="inline-flex w-full items-center justify-center rounded-md bg-vt-impactOrange px-5 py-3 text-base font-semibold text-white ring-2 ring-inset ring-white/20 transition-all duration-200 hover:-translate-y-0.5 hover:brightness-110 hover:shadow-lg"
                >
                  View public events
                </Link>
                <Link
                  href="/contact"
                  className="inline-flex w-full items-center justify-center rounded-md bg-vt-maroon px-5 py-3 text-base font-semibold text-white ring-2 ring-inset ring-white/20 transition-all duration-200 hover:-translate-y-0.5 hover:brightness-110 hover:shadow-lg"
                >
                  Contact leadership
                </Link>
              </div>
            </section>
          </aside>
        </div>
      </main>
    </>
  );
}
