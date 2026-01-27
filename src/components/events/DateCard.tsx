"use client";

import { dayNames, monthNames, DateCardProps } from "@/src/types/Event";

export default function DateCard({ isoDate }: DateCardProps) {
  const date = new Date(isoDate);

  {/* Invalid date read */}
  if (Number.isNaN(date.getTime())) {
    return <></>;
  }

  const weekday = date.getDay();
  const month = monthNames[date.getMonth()];
  const day = date.getDate();

  return (

    <div className="flex flex-col items-center w-20 sm:w-24 text-center">

      {/* weekday container */}
      <div className="w-full bg-vt-impactOrange text-white text-xs sm:text-sm font-vt-normal py-1 rounded-t-sm">
        {dayNames[weekday]}
      </div>

      {/*month/date container */}
      <div className="w-full border-2 border-vt-impactOrange rounded-b-sm py-2 bg-white dark:bg-black">

        <p className="text-xs sm:text-sm uppercase tracking-wide text-black dark:text-white/80">
          {month}
        </p>

        <p className="text-lg sm:text-2xl font-vt-bold leading-none text-black dark:text-white">
          {day}
        </p>

      </div>

    </div>

  );
}
