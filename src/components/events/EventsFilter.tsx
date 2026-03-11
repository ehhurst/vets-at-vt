"use client";

import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
import { FaChevronDown } from "react-icons/fa";
import { MdFilterListAlt } from "react-icons/md";

export type TimeRangeFilter = "NEXT_30_DAYS" | "THIS_MONTH" | "NEXT_6_MONTHS";
export type LocationFilter = "ALL" | "IN_PERSON" | "ONLINE";

export type EventsFilters = {
  timeRange: TimeRangeFilter;
  location: LocationFilter;
};

const TIME_RANGE_OPTIONS: { label: string; value: TimeRangeFilter }[] = [
  { label: "Next 30 days", value: "NEXT_30_DAYS" },
  { label: "This month", value: "THIS_MONTH" },
  { label: "Next 6 months", value: "NEXT_6_MONTHS" },
];

const LOCATION_OPTIONS: { label: string; value: LocationFilter }[] = [
  { label: "All", value: "ALL" },
  { label: "In-person", value: "IN_PERSON" },
  { label: "Online", value: "ONLINE" },
];

function isOnlineLocation(location?: string) {
  if (!location) return false;
  const s = location.toLowerCase();
  return s.includes("zoom") || s.includes("teams") || s.includes("online") || s.includes("virtual");
}

export default function EventsFilter({
  value,
  onChange,
  onClear,
}: {
  value: EventsFilters;
  onChange: (next: EventsFilters) => void;
  onClear?: () => void;
}) {
  const activeCount =
    (value.timeRange !== "NEXT_30_DAYS" ? 1 : 0) + (value.location !== "ALL" ? 1 : 0);

  return (
    <Menu as="div" className="relative inline-block p-4">
      <MenuButton className="inline-flex w-full items-center justify-center gap-x-2 rounded-md bg-vt-impactOrange px-4 py-3 text-base font-semibold text-white shadow-sm ring-2 ring-inset ring-white/20 transition-all duration-200 hover:-translate-y-0.5 hover:brightness-110 hover:shadow-lg hover:cursor-pointer">
        <MdFilterListAlt aria-hidden="true" className="size-5 text-white" />
        <span>Filter Events</span>

        {activeCount > 0 && (
          <span className="ml-1 rounded-full bg-white/20 px-2 py-0.5 text-xs font-semibold">
            {activeCount}
          </span>
        )}

        <FaChevronDown aria-hidden="true" className="ml-1 size-4 text-white" />
      </MenuButton>

      <MenuItems
        transition
        className="absolute right-0 z-10 mt-2 w-72 origin-top-right rounded-md bg-white dark:bg-[#1a1e22] shadow-lg outline-1 outline-black/10 dark:outline-white/10 transition data-closed:scale-95 data-closed:transform data-closed:opacity-0 data-enter:duration-100 data-enter:ease-out data-leave:duration-75 data-leave:ease-in"
      >
        <div className="p-3">
          {/* TIME RANGE */}
          <div className="mb-3">
            <p className="px-1 pb-2 text-xs font-semibold tracking-wide text-black/60 dark:text-white/60">
              TIME RANGE
            </p>
            <div className="space-y-1">
              {TIME_RANGE_OPTIONS.map((opt) => (
                <MenuItem key={opt.value}>
                  {({ focus }) => (
                    <button
                      type="button"
                      onClick={() => onChange({ ...value, timeRange: opt.value })}
                      className={[
                        "w-full rounded px-3 py-2 text-left text-sm",
                        focus ? "bg-gray-100 dark:bg-[#20252a]" : "",
                        value.timeRange === opt.value
                          ? "font-semibold text-white"
                          : "text-black/80 dark:text-white/80",
                      ].join(" ")}
                    >
                      {opt.label}
                      {value.timeRange === opt.value && (
                        <span className="ml-2 text-xs text-black/60 dark:text-white/60">
                          (selected)
                        </span>
                      )}
                    </button>
                  )}
                </MenuItem>
              ))}
            </div>
          </div>

          {/* LOCATION */}
          <div className="mb-3">
            <p className="px-1 pb-2 text-xs font-semibold tracking-wide text-black/60 dark:text-white/60">
              LOCATION
            </p>
            <div className="space-y-1">
              {LOCATION_OPTIONS.map((opt) => (
                <MenuItem key={opt.value}>
                  {({ focus }) => (
                    <button
                      type="button"
                      onClick={() => onChange({ ...value, location: opt.value })}
                      className={[
                        "w-full rounded px-3 py-2 text-left text-sm",
                        focus ? "bg-gray-100 dark:bg-[#20252a]" : "",
                        value.location === opt.value
                          ? "font-semibold text-white"
                          : "text-black/80 dark:text-white/80",
                      ].join(" ")}
                    >
                      {opt.label}
                      {value.location === opt.value && (
                        <span className="ml-2 text-xs text-black/60 dark:text-white/60">
                          (selected)
                        </span>
                      )}
                    </button>
                  )}
                </MenuItem>
              ))}
            </div>
          </div>

          {/* ACTIONS */}
          <div className="flex items-center justify-between border-t border-black/10 dark:border-white/10 pt-3">
            <MenuItem>
              {({ focus }) => (
                <button
                  type="button"
                  onClick={() => onClear?.()}
                  className={[
                    "rounded px-3 py-2 text-sm",
                    focus ? "bg-gray-100 dark:bg-[#20252a]" : "",
                    "text-black/80 dark:text-white/80",
                  ].join(" ")}
                >
                  Clear
                </button>
              )}
            </MenuItem>

            <p className="text-xs text-black/60 dark:text-white/60">
              Tip: Online = Zoom/Teams/etc.
            </p>
          </div>
        </div>
      </MenuItems>
    </Menu>
  );
}
