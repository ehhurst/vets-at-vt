import { dayNames } from "@/src/types/Event";
import { monthNames } from "@/src/types/Event";

export default function DateCard() {
    const date = new Date('August 19, 1975 23:15:30')
    const weekday = date.getDay();
    const month = monthNames[date.getMonth()];

    return(
        <div className='w-max text-center p-2'>
            <div className='bg-vt-impactOrange text-white text-center rounded-t-sm font-vt-normal p-2'>{dayNames[weekday]}</div>
                <div className='text-2xl text-center font-vt-bold border-3 border-vt-impactOrange rounded-b-sm p-2'>
                    <p>{month}</p>
                    <p>{date.getDate()}</p>
                </div>
        </div>
    );
}