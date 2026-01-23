"use client"

import { useState } from "react"
import { useAppDispatch } from "@/lib/hooks"
import { addIssue } from "@/lib/features/workspace/workspace-Slice"
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
    DialogFooter,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Plus } from "lucide-react"

export default function CreateIssueModal({ workspaceId, status, buttonVariant = "ghost" }: { workspaceId: string, status: string, buttonVariant?: "ghost" | "default" }) {
    const [open, setOpen] = useState(false)
    const [summary, setSummary] = useState("")
    const [priority, setPriority] = useState("Medium")
    const dispatch = useAppDispatch()

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        if (!summary) return

        const id = Math.random().toString(36).substr(2, 9)
        const key = `AD-${Math.floor(Math.random() * 900) + 100}`

        dispatch(addIssue({
            workspaceId,
            issue: {
                id,
                key,
                summary,
                status,
                priority,
                assignee: "VS",
                type: "Task"
            }
        }))

        setSummary("")
        setOpen(false)
    }

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                {buttonVariant === "default" ? (
                    <Button className="h-9 bg-[#0052CC] hover:bg-[#0747A6] gap-2 font-semibold">
                        <Plus size={16} />
                        Create
                    </Button>
                ) : (
                    <Button
                        variant="ghost"
                        className="w-full justify-start gap-2 h-10 text-[13px] text-[#42526E] hover:bg-[#EBECF0] font-medium px-2 py-1"
                    >
                        <Plus size={16} className="text-[#6B778C]" />
                        Create issue
                    </Button>
                )}
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle className="text-2xl font-bold text-[#172B4D]">Create Issue</DialogTitle>
                </DialogHeader>
                <form onSubmit={handleSubmit} className="space-y-6 pt-4">
                    <div className="space-y-2">
                        <Label htmlFor="summary" className="text-sm font-bold text-[#42526E]">Summary</Label>
                        <Input
                            id="summary"
                            placeholder="What needs to be done?"
                            value={summary}
                            onChange={(e) => setSummary(e.target.value)}
                            className="h-11 border-[#DFE1E6] focus:border-blue-500"
                        />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="priority" className="text-sm font-bold text-[#42526E]">Priority</Label>
                        <select
                            id="priority"
                            value={priority}
                            onChange={(e) => setPriority(e.target.value)}
                            className="w-full h-11 px-3 bg-white border border-[#DFE1E6] rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                        >
                            <option value="Highest">Highest</option>
                            <option value="High">High</option>
                            <option value="Medium">Medium</option>
                            <option value="Low">Low</option>
                        </select>
                    </div>
                    <div className="space-y-2">
                        <Label className="text-sm font-bold text-[#42526E]">Initial Status</Label>
                        <div className="text-sm font-medium text-[#172B4D] bg-[#F4F5F7] px-3 py-2 rounded border">{status}</div>
                    </div>
                    <DialogFooter className="pt-4">
                        <Button type="button" variant="ghost" onClick={() => setOpen(false)} className="font-semibold">Cancel</Button>
                        <Button type="submit" className="bg-blue-600 hover:bg-blue-700 font-semibold px-8" disabled={!summary}>Create</Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    )
}
