"use client";

import DateCard from "@/src/components/events/DateCard";
import { Event } from "@/src/types/Event";
import { formatDate, formatTimeRange } from "@/src/utils/date";

export default function EventCard({ event }: { event: Event }) {
  return (
    <article
      className="
        flex flex-col sm:flex-row
        rounded-md overflow-hidden
        border-2 border-gray-100 dark:border-white/10
        bg-white dark:bg-black

        shadow-sm
        hover:shadow-md
        dark:shadow-black/40
        transition-shadow
        hover: cursor-pointer
      "
    >

      {/* Date */}
      <div
        className="
          bg-gray-100 dark:bg-white/5
          p-4
          flex justify-center sm:items-center
        "
      >
        <DateCard isoDate={event.startISO} />
      </div>

      {/* Event details */}
      <div className="flex-1 space-y-1 p-4">
        <h3 className="text-xl font-vt-extrabold text-vt-maroon dark:text-white">
          {event.summary}
        </h3>

        <p className="text-lg text-gray-800 dark:text-white/80">
          {formatDate(event.startISO)}
        </p>

        <p className="text-sm sm:text-lg text-gray-800 dark:text-white/80">
          {formatTimeRange(event.startISO, event.endISO)}
        </p>

        {event.location && (
          <p className="text-md text-gray-500 dark:text-white/60">
            {event.location}
          </p>
        )}

        {event.description && (
          <p className="text-md text-gray-700 dark:text-white/70 leading-relaxed">
            {event.description}
          </p>
        )}
      </div>
    </article>
  );
}
