
"use client";
import { useProjectView } from "@/features/project/components/project-view-context";

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
    const { zoom } = useProjectView();

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
    
    const minDAY_WIDTH = zoom === "day" ? 120 : zoom === "week" ? 100 : 80;
    const viewportWidth = typeof window !== "undefined" ? Math.max(window.innerWidth - 370, 500) : 1000;
    
    let headerCount = 0;
    let current = new Date(minDate);
    if (zoom === "day") {
        while (current <= maxDate) {
            headerCount++;
            current.setDate(current.getDate() + 1);
        }
    } else if (zoom === "week") {
        while (current <= maxDate) {
            headerCount++;
            current.setDate(current.getDate() + 7);
        }
    } else {
        while (current <= maxDate) {
            headerCount++;
            current.setMonth(current.getMonth() + 1);
        }
    }
    
    const DAY_WIDTH = Math.max(minDAY_WIDTH, Math.floor(viewportWidth / Math.max(headerCount, 1)));

    const getZoomIndex = (startDate: Date) => {
        const dayDiff = Math.floor((startDate.getTime() - minDate.getTime()) / (1000 * 60 * 60 * 24));

        if (zoom === "day") {
            return dayDiff;
        }

        if (zoom === "week") {
            return Math.floor(dayDiff / 7);
        }

        return (startDate.getFullYear() - minDate.getFullYear()) * 12 + (startDate.getMonth() - minDate.getMonth());
    };

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

    const headers = generateDateHeaders();

    // calculate task positions
    const getTaskPosition = (task: any) => {
        const start = task.start || task.date;
        if (!start) return null;

        const startDate = new Date(start);
        const dayDiff = Math.floor((startDate.getTime() - minDate.getTime()) / (1000 * 60 * 60 * 24));
        
        if (zoom === "day") {
            return dayDiff * DAY_WIDTH;
        }
        
        if (zoom === "week") {
            // Position: which week + offset within the week (0-6 days)
            const weekIndex = Math.floor(dayDiff / 7);
            const dayOffsetInWeek = dayDiff % 7;
            return (weekIndex * DAY_WIDTH) + ((dayOffsetInWeek / 7) * DAY_WIDTH);
        }
        
        // Month view
        const monthIndex = (startDate.getFullYear() - minDate.getFullYear()) * 12 + (startDate.getMonth() - minDate.getMonth());
        const dayOfMonth = startDate.getDate();
        const daysInMonth = new Date(startDate.getFullYear(), startDate.getMonth() + 1, 0).getDate();
        
        return (monthIndex * DAY_WIDTH) + ((dayOfMonth / daysInMonth) * DAY_WIDTH);
    }

    // calculate task widths
    const getTaskWidth = (task: any) => {
        if (!task.start || !task.end) return DAY_WIDTH; // default width for tasks without end date
        if (task.type === "milestone") return 10; // fixed width for milestones
        const taskEnd = new Date(task.end);
        const taskStart = new Date(task.start);
        
        // Always calculate actual duration in days
        const durationDays = Math.floor((taskEnd.getTime() - taskStart.getTime()) / (1000 * 60 * 60 * 24)) + 1;
        
        if (zoom === "day") {
            return durationDays * DAY_WIDTH;
        }
        
        if (zoom === "week") {
            // In week view, show proportional width based on days within the 7-day week
            return (durationDays / 7) * DAY_WIDTH;
        }
        
        // In month view, show proportional width based on days within the 30-day month
        return (durationDays / 30) * DAY_WIDTH;
    }

    // get category color
    const getCategoryColor = (categoryId: string) => {
        const category = timelineItems.categories.find(c => c.id === categoryId);
        const colorMap = {
            "blue": "bg-blue-400",
            "green": "bg-green-400",
            "orange": "bg-orange-400"
        };
        if (!category) return "bg-gray-400";
        return colorMap[category?.color as keyof typeof colorMap] || "bg-gray-400";
    };

    return (
        <div className='grid sm:grid-cols-[300px_1fr] h-[calc(100vh-120px)] overflow-auto'>

            {/* Sidebar */}
            <div className='hidden sm:flex sticky left-0 w-full h-full flex-col border-r     border-gray-300 bg-white z-5'>
                <div className=' relative w-full flex gap-2 h-13.25 p-3 border-b border-gray-300'>
                    <h2 className='text-xl font-bold'>Tasks</h2>
                </div>

                {/* Task List */}
                <div>
                    {timelineItems.tasks.map((task) => (
                        <div key={task.id} className='p-3 border-b border-gray-200 hover:bg-blue-200/70 cursor-pointer'>
                            <h3 className='text-md font-medium'>{task.title}</h3>
                            <p className='text-sm text-muted-foreground'>{task.status || task.type}</p>
                        </div>
                    ))}
                </div>

            </div>


            {/* Main Content */}
            <div className='relative flex flex-col w-full flex-1 overflow-auto'>

                {/* Date header */}
                <div className="sticky top-0 left-0 right-0 flex items-end border-b border-gray-200 bg-gray-50 z-10">
                    <div className="flex w-max min-w-full">
                        {headers.map((header, idx) => (
                            <div
                                key={idx}
                                className="border-r border-gray-200 text-center text-xs font-medium text-gray-600 flex items-end justify-center pb-2 h-13 flex-1"
                                style={{ minWidth: `${DAY_WIDTH}px` }}
                            >
                                {header.label}
                            </div>
                        ))}
                    </div>
                </div>


                {/* Timeline Items */}
                <div className='flex-1'>
                    {timelineItems.tasks.map((task, index) => {
                        const position = getTaskPosition(task);
                        const width = getTaskWidth(task);
                        const isMilestone = task.type === "milestone";
                        return (
                            <div key={index} className="flex items-center w-max min-w-full border-b border-gray-200 h-17.25 hover:bg-gray-50">
                                <div className="relative flex w-max min-w-full">
                                    {headers.map((_, headerIndex) => (
                                        <div
                                            key={headerIndex}
                                            className="shrink-0 h-17.25 opacity-0 pointer-events-none flex-1"
                                            style={{ minWidth: `${DAY_WIDTH}px` }}
                                            aria-hidden="true"
                                        />
                                    ))}

                                    {isMilestone ? (
                                        <div
                                            className="absolute top-1/2 transform -translate-y-1/2"
                                            style={{ left: `${position}px` }}
                                        >
                                            <div className="w-4 h-4 bg-red-500 rounded-full border-2 border-white shadow-md"></div>
                                        </div>
                                    ) : (
                                        <div
                                            className={`absolute top-1/2 transform -translate-y-1/2 rounded ${getCategoryColor(task.category)} opacity-80 hover:opacity-100 transition-opacity`}
                                            style={{
                                                left: `${position}px`,
                                                width: `${width}px`,
                                                minWidth: '6px'
                                            }}
                                            title={task.title}
                                        >
                                            {width > 50 && (
                                                <div className="flex px-2 py-1 text-xs font-medium text-white truncate gap-1">
                                                    <span>{task.status}</span>
                                                    {width > 100 && task.progress && `(${task.progress}%)`}
                                                </div>
                                            )}
                                        </div>
                                    )}
                                </div>
                            </div>
                        )
                    })}
                </div>
            </div>
        </div>
    )
}
;
export default TimelineView;