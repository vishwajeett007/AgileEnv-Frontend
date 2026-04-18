import { Input } from '@/components/ui/input';
import React from 'react'
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { updateIssue, createIssue } from '../features/board/store/board-slice';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogPortal, DialogTitle } from '@/components/ui/dialog';
import { VisuallyHidden } from '@/components/ui/visually-hidden';
import { cn } from "@/shared/utils";
import { IssueSchema } from '../features/board/schemas';


function IssueModal({ issueId, columnId, onClose, handleCreate }: { issueId: string, columnId: string, onClose: () => void, handleCreate?: boolean }) {
    const dispatch = useAppDispatch();
    const [open, setOpen] = React.useState(true);
    const issue = useAppSelector((state) => {
        const column = state.board.columns.find(c => c.id === columnId);
        return column?.issues.find(i => i.id === issueId);
    })
    const [issueTitle, setIssueTitle] = React.useState(issue?.title || "");
    const [priority, setPriority] = React.useState(issue?.priority || "medium");
    const [status, setStatus] = React.useState(issue?.category || "todo");
    const [issueLabel, setIssueLabel] = React.useState(issue?.label || "");
    const [assignees, setAssignees] = React.useState(issue?.assignees || []);
    const [errors, setErrors] = React.useState<{
        title?: string;
        label?: string;
    }>({});
    const handleSubmit = () => {
        const result = IssueSchema.safeParse({
            title: issueTitle,
            priority,
            label: issueLabel,
            assignees
        });

        if (!result.success) {
            setErrors(result.error.issues.reduce((acc, issue) => {
                acc[issue.path[0] as keyof typeof acc] = issue.message;
                return acc;
            }, {} as typeof errors));
            return;
        }

        if (handleCreate) {
            const newIssue = {
                id: `AF-${Math.floor(Math.random() * 10000)}`,
                title: issueTitle,
                priority,
                label: issueLabel,
                assignees,
                category: status
            };
            dispatch(createIssue({ issue: newIssue, columnId: status }));
        } else {
            dispatch(updateIssue({
                issueId,
                columnId,
                updatedData: { title: issueTitle, priority, label: issueLabel, category: status }
            }));
        }

        setOpen(false);
        onClose();
    };

    const handleOpenChange = (isOpen: boolean) => {
        setOpen(isOpen);
        if (!isOpen) onClose();
    }
    return (
        <Dialog open={open} onOpenChange={handleOpenChange}>
            <DialogPortal>
                <DialogContent className={cn(
                    "w-full transition-all duration-300 lg:max-w-[30rem] xl:max-w-[35rem] lg:px-16"
                )}
                    showCloseButton={true}
                    onInteractOutside={(e) => e.preventDefault()}
                    onEscapeKeyDown={(e) => e.preventDefault()}
                >
                    <DialogHeader>
                        <DialogTitle><VisuallyHidden>Issue Details</VisuallyHidden></DialogTitle>
                    </DialogHeader>
                    <div className="flex flex-col gap-6 px-1 lg:px-5">

                        <div className="flex flex-col gap-3 py-4 items-center justify-center">
                            <h1 className="font-medium text-4xl text-center">Save after edits</h1>
                        </div>

                        <div className="flex flex-col gap-4">
                            <div className="relative w-full">
                                <Input
                                    id="Issue-title"
                                    placeholder=" "
                                    value={issueTitle}
                                    onChange={(e) => {
                                        const value = e.target.value;
                                        setIssueTitle(value);

                                        const result = IssueSchema.shape.title.safeParse(value);

                                        setErrors((prev: any) => ({
                                            ...prev,
                                            title: result.success ? undefined : result.error.issues[0].message,
                                        }));
                                    }}
                                    className="h-12 px-5 bg-gray-100 peer border border-gray-400 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                                    autoFocus
                                />
                                {errors.title && <p className="text-red-500 text-sm mt-1">{errors.title}</p>}

                                <label
                                    htmlFor="Issue-title"
                                    className={`absolute left-3 bg-gray-100 px-1 rounded-sm transition-all duration-200
                             ${issueTitle.trim().length > 0
                                            ? "-top-2 text-xs text-gray-500"
                                            : "top-3 text-base text-gray-400"
                                        }`}
                                >
                                    Issue Title
                                </label>
                            </div>
                            <div className="relative w-full">
                                <select
                                    title="Issue-label"
                                    id="Issue-label"
                                    value={issueLabel}
                                    onChange={(e) => {
                                        const value = e.target.value;
                                        setIssueLabel(value);

                                        const result = IssueSchema.shape.label.safeParse(value);

                                        setErrors((prev: any) => ({
                                            ...prev,
                                            label: result.success ? undefined : result.error.issues[0].message,
                                        }));
                                    }}
                                    className="h-12 px-5 bg-gray-100 peer border border-gray-400 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 rounded-lg"
                                >
                                    <option value="ENG">ENG</option>
                                    <option value="DES">DES</option>
                                    <option value="QA">QA</option>
                                    <option value="DEVOPS">DEVOPS</option>
                                    <option value="PRODUCT">PRODUCT</option>
                                    <option value="OTHER">OTHER</option>
                                </select>
                                {errors.label && <p className="text-red-500 text-sm mt-1">{errors.label}</p>}

                                <label
                                    htmlFor="Issue-label"
                                    className={`absolute left-3 bg-gray-100 px-1 rounded-sm transition-all duration-200
                             ${issueLabel.trim().length > 0
                                            ? "-top-2 text-xs text-gray-500"
                                            : "top-3 text-base text-gray-400"
                                        }`}
                                >
                                    Issue Label
                                </label>
                            </div>
                            <div className="relative w-full">
                                <select
                                    id="priority"
                                    value={priority}
                                    onChange={(e) => {
                                        setPriority(e.target.value as "low" | "medium" | "high");
                                    }}
                                    className="h-12 px-5 bg-gray-100 peer border border-gray-400 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 rounded-lg"
                                >
                                    <option value="low">Low</option>
                                    <option value="medium">Medium</option>
                                    <option value="high">High</option>
                                </select>

                                <label
                                    htmlFor="priority"
                                    className={`absolute left-3 bg-gray-100 px-1 rounded-sm transition-all duration-200
                                ${priority.trim().length > 0
                                            ? "-top-2 text-xs text-gray-500"
                                            : "top-3 text-base text-gray-400"
                                        }`}
                                >
                                    Priority
                                </label>
                            </div>
                            <div className="relative w-full">
                                <select
                                    id="status"
                                    value={status}
                                    onChange={(e) => {
                                        setStatus(e.target.value as"backlog" |"todo" | "in-progress" | "done");
                                    }}
                                    className="h-12 px-5 bg-gray-100 peer border border-gray-400 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 rounded-lg"
                                >
                                    <option value="backlog">Backlog</option>
                                    <option value="todo">To Do</option>
                                    <option value="in-progress">In-Progress</option>
                                    <option value="done">Done</option>
                                </select>

                                <label
                                    htmlFor="status"
                                    className={`absolute left-3 bg-gray-100 px-1 rounded-sm transition-all duration-200
                                ${status.trim().length > 0
                                            ? "-top-2 text-xs text-gray-500"
                                            : "top-3 text-base text-gray-400"
                                        }`}
                                >
                                    Status
                                </label>
                            </div>
                        </div>

                        <div className="flex items-center justify-center">
                            <Button
                                className="w-full hover:bg-blue-800 bg-blue-700 py-6 text-lg text-white font-light"
                                onClick={handleSubmit}
                                disabled={!issueTitle.trim() || !issueLabel.trim()}
                            >
                                Save
                            </Button>
                        </div>
                    </div>
                </DialogContent>
            </DialogPortal>
        </Dialog>
    )
}

export default IssueModal;