export type Event = {
    uuid: string,
    summary: string,
    startISO:string,
    endISO:string,
    location?:string,
    class?:string,
    description?:string
};

export const dayNames=['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
export const monthNames=['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];