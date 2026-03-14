"use client";

import { dayNames, monthNames, DateCardProps } from "@/types/Event";

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
      <div className="w-full rounded-b-sm border-2 border-vt-impactOrange bg-gray-100 dark:bg-[#20252a] py-2">

        <p className="text-xs uppercase tracking-wide text-black/80 dark:text-white/80 sm:text-sm">
          {month}
        </p>

        <p className="text-lg font-vt-bold leading-none text-black dark:text-white sm:text-2xl">
          {day}
        </p>

      </div>

    </div>

  );
}
