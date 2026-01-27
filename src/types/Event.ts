export type Event = {
  uid: string;
  summary: string;
  startISO: string; // ISO string like 2025-01-20T22:00:00.000Z
  endISO: string;
  location?: string;
  class?: string; // PUBLIC | PRIVATE | CONFIDENTIAL
  description?: string;
};


export type DateCardProps = {
  isoDate: string;
};

export const dayNames=['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
export const monthNames=['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];