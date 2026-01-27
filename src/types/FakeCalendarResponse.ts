type DisplayEvent = {
  uid: string;
  summary: string;
  startISO: string;
  endISO: string;
  location?: string;
  class?: string; // PUBLIC | PRIVATE | CONFIDENTIAL
  description?: string;
};

export const fakeCalendarResponse: {
  publicEvents: DisplayEvent[];
  notPublicEvents: DisplayEvent[];
} = {
  publicEvents: [
    {
      uid: "welcome-back-social-2025-01-20T22:00:00.000Z",
      summary: "Welcome Back Social",
      startISO: "2025-01-20T22:00:00.000Z",
      endISO: "2025-01-21T00:00:00.000Z",
      location: "Squires Student Center",
      class: "PUBLIC",
      description: "Kick off the semester with food, games, and a chance to meet new and returning members."
    },
    {
      uid: "resume-linkedin-workshop-2025-01-27T21:00:00.000Z",
      summary: "Resume & LinkedIn Workshop",
      startISO: "2025-01-27T21:00:00.000Z",
      endISO: "2025-01-27T22:30:00.000Z",
      location: "Torgersen Hall, Room 1100",
      class: "PUBLIC",
      description: "Hands-on workshop: bring a draft resume and we’ll do quick feedback + LinkedIn cleanup."
    },
    {
      uid: "study-night-2025-02-02T00:00:00.000Z",
      summary: "Study Night",
      startISO: "2025-02-02T00:00:00.000Z",
      endISO: "2025-02-02T03:00:00.000Z",
      location: "Newman Library, 2nd Floor",
      class: "PUBLIC",
      description: "Quiet work session + snacks. Drop in any time."
    },
    {
      uid: "guest-speaker-careers-in-tech-2025-02-05T22:30:00.000Z",
      summary: "Guest Speaker: Careers in Tech",
      startISO: "2025-02-05T22:30:00.000Z",
      endISO: "2025-02-05T23:45:00.000Z",
      location: "Goodwin Hall Auditorium",
      class: "PUBLIC",
      description: "Talk + Q&A about internships, early career growth, and building a portfolio."
    },
    {
      uid: "volunteer-service-day-2025-02-08T14:00:00.000Z",
      summary: "Volunteer Service Day",
      startISO: "2025-02-08T14:00:00.000Z",
      endISO: "2025-02-08T17:00:00.000Z",
      location: "Local Community Center",
      class: "PUBLIC",
      description: "Morning of community service. Wear comfortable clothes—supplies provided."
    }
  ],
  notPublicEvents: [
    {
      uid: "exec-board-meeting-2025-01-22T23:00:00.000Z",
      summary: "Executive Board Meeting",
      startISO: "2025-01-22T23:00:00.000Z",
      endISO: "2025-01-23T00:30:00.000Z",
      location: "Johnson Student Center, Room 238",
      class: "PRIVATE",
      description: "Internal: agenda review, budget updates, and spring event planning."
    },
    {
      uid: "planning-meeting-spring-events-2025-02-10T23:00:00.000Z",
      summary: "Planning Meeting: Spring Events",
      startISO: "2025-02-10T23:00:00.000Z",
      endISO: "2025-02-11T00:00:00.000Z",
      location: "Zoom",
      class: "CONFIDENTIAL",
      description: "Internal planning session to finalize the spring event schedule."
    },
    {
      uid: "busy-2025-02-14T17:00:00.000Z",
      summary: "Busy",
      startISO: "2025-02-14T17:00:00.000Z",
      endISO: "2025-02-14T18:00:00.000Z",
      location: undefined,
      class: undefined,
      description: "This is a placeholder item that should be filtered by your 'busy/private' heuristic."
    }
  ]
};
