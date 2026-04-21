
"use client";
import { useState } from "react";

const timelineItems = {
    "categories": [
        { "id": "eng", "name": "Engineering", "color": "blue" },
        { "id": "design", "name": "Design", "color": "green" },
        { "id": "marketing", "name": "Marketing", "color": "orange" }
    ],
    "tasks": [
        {
            "id": 1,
            "title": "Database Schema Design",
            "category": "eng",
            "start": "2024-10-08",
            "end": "2024-10-11",
            "status": "in_progress",
            "progress": 65
        },
        {
            "id": 2,
            "title": "UI Mockups (Figma)",
            "category": "design",
            "start": "2024-10-09",
            "end": "2024-10-13",
            "status": "completed",
            "progress": 100
        },
        {
            "id": 3,
            "title": "Alpha Release Milestone",
            "category": "eng",
            "date": "2024-10-16",
            "type": "milestone"
        },
        {
            "id": 4,
            "title": "Social Media Strategy",
            "category": "marketing",
            "start": "2024-10-12",
            "end": "2024-10-18",
            "status": "scheduled"
        },
        {
            "id": 5,
            "title": "API Integration",
            "category": "eng",
            "start": "2024-10-15",
            "end": "2024-10-20",
            "status": "waiting"
        },
        {
            "id": 6,
            "title": "Brand Guidelines",
            "category": "design",
            "start": "2024-10-07",
            "end": "2024-10-10",
            "status": "completed",
            "progress": 100
        }
    ]
};

function TimelineView() {
const [zoom, setZoom] = useState<"day" | "week" | "month">("day");

// calculate 
const getAllDates = () => {
    const dates: Date[] = [];
    timelineItems.tasks.forEach(task => {
        if (task.start) dates.push(new Date(task.start));
        if (task.end) dates.push(new Date(task.end));
        if (task.date) dates.push(new Date(task.date));
    });
    return dates;
};
const allDates: Date[] = getAllDates();
if (allDates.length === 0) {
    throw new Error("No dates available");
}
const minDate = new Date(Math.min(...allDates.map(d => d.getTime())));
const maxDate = new Date(Math.max(...allDates.map(d => d.getTime())));

const DAY_WIDTH = zoom === "day" ? 40 : zoom === "week" ? 20 : 10;

const generateDateHeaders = () => {
    const headers = [];
    let current = new Date(minDate);

            if (zoom === "day") {
            while (current <= maxDate) {
                headers.push({
                    date: new Date(current),
                    label: current.getDate().toString(),
                    type: "day"
                });
                current.setDate(current.getDate() + 1);
            }
        } else if (zoom === "week") {
            while (current <= maxDate) {
                const weekEnd = new Date(current);
                weekEnd.setDate(weekEnd.getDate() + 6);
                headers.push({
                    date: new Date(current),
                    label: `W${Math.ceil((current.getDate()) / 7)}`,
                    type: "week"
                });
                current.setDate(current.getDate() + 7);
            }
        } else {
            while (current <= maxDate) {
                headers.push({
                    date: new Date(current),
                    label: current.toLocaleDateString('en-US', { month: 'short' }),
                    type: "month"
                });
                current.setMonth(current.getMonth() + 1);
            }
        }
        return headers;
}


// calculate task positions
const getTaskPosition = (task: any) => {
    const start = task.start || task.date;
    if ( !start ) return null;
    
    const taskStart = new Date(start);
    const daysFromMin = Math.floor((taskStart.getTime() - minDate.getTime()) / (1000 * 60 * 60 * 24));
    return daysFromMin * DAY_WIDTH;
}
// calculate task widths
const getTaskWidth = (task : any) => {
    if ( !task.start || !task.end ) return DAY_WIDTH; // default width for tasks without end date
    if (task.type === "milestone") return 10; // fixed width for milestones
    const taskEnd = new Date(task.end);
    const taskStart = new Date(task.start);
    const durationDays = Math.floor((taskEnd.getTime() - taskStart.getTime()) / (1000 * 60 * 60 * 24)) + 1;
    return durationDays * DAY_WIDTH;
}
// get category color
    const getCategoryColor = (categoryId : string) => {
        const category = timelineItems.categories.find(c => c.id === categoryId);
        const colorMap = {
            "bg-blue-500": "bg-blue-400",
            "bg-green-500": "bg-green-400",
            "bg-orange-500": "bg-orange-400"
        };
        if (!category) return "bg-gray-400";
        return colorMap[category?.color as keyof typeof colorMap] || "bg-gray-400";
    };

    return (
        <div className='grid grid-cols-[300px_1fr] h-[calc(100vh-120px)]'>
            {/* Sidebar */}
            <div className='w-full h-full flex flex-col border-r border-gray-300 overflow-y-hidden'>
                <div className=' relative w-full flex gap-2 h-13.25 p-3 border-b border-gray-300'>
                    <h2 className='text-xl font-bold'>Tasks</h2>
                </div>
                {/* Task List */}
                <div>
                    {timelineItems.tasks.map((task) => (
                        <div key={task.id} className='p-3 border-b border-gray-200 hover:bg-blue-200/70 cursor-pointer'>
                            <h3 className='text-md font-medium'>{task.title}</h3>
                        </div>
                    ))}
                </div>
            </div>
            {/* Main Content */}
            <div className=' flex flex-col w-full h-full overflow-y-auto'>
                {/* dates */}
                <div className='w-full h-13.25 p-3 border-b border-gray-300'>

                </div>
                {/* Timeline Items */}
                <div>
                    {timelineItems.tasks.map((task) => (
                        <div key={task.id} className='p-3 border-b border-gray-200 hover:bg-blue-200/70 cursor-pointer'>
                            <h3 className='text-md font-medium'>{task.status || task.type}</h3>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}
;
export default TimelineView;