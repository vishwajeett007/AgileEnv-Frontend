"use client"

import { useState } from "react"
import { useAppDispatch } from "@/lib/hooks"
import { addWorkspace } from "@/lib/features/workspace/workspace-Slice"
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

export default function CreateWorkspaceModal() {
    const [open, setOpen] = useState(false)
    const [name, setName] = useState("")
    const [role, setRole] = useState("Owner")
    const dispatch = useAppDispatch()

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        if (!name) return

        const id = Math.random().toString(36).substr(2, 9)
        dispatch(addWorkspace({
            id,
            name,
            role,
            tools: ["Kanban", "Scrum", "Timeline", "Notes"],
            projects: [],
            issues: [],
            notes: []
        }))

        setName("")
        setOpen(false)
    }

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <div className="group border-2 border-dashed border-[#DFE1E6] rounded-xl flex flex-col items-center justify-center p-8 hover:border-blue-500 hover:bg-blue-50 transition-all cursor-pointer min-h-[220px]">
                    <div className="w-12 h-12 bg-white border border-[#DFE1E6] rounded-full flex items-center justify-center text-blue-600 group-hover:bg-blue-600 group-hover:text-white group-hover:border-blue-600 transition-all duration-300 shadow-sm mb-4">
                        <Plus size={24} />
                    </div>
                    <span className="font-semibold text-[#42526E] group-hover:text-blue-700">Create Workspace</span>
                </div>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle className="text-2xl font-bold text-[#172B4D]">Create Workspace</DialogTitle>
                </DialogHeader>
                <form onSubmit={handleSubmit} className="space-y-6 pt-4">
                    <div className="space-y-2">
                        <Label htmlFor="name" className="text-sm font-bold text-[#42526E]">Workspace Name</Label>
                        <Input
                            id="name"
                            placeholder="e.g. Engineering Team"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            className="h-11 border-[#DFE1E6] focus:border-blue-500 focus:ring-blue-500"
                        />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="role" className="text-sm font-bold text-[#42526E]">Your Role</Label>
                        <Input
                            id="role"
                            placeholder="e.g. Tech Lead"
                            value={role}
                            onChange={(e) => setRole(e.target.value)}
                            className="h-11 border-[#DFE1E6] focus:border-blue-500 focus:ring-blue-500"
                        />
                    </div>
                    <DialogFooter className="pt-4">
                        <Button type="button" variant="ghost" onClick={() => setOpen(false)} className="font-semibold">Cancel</Button>
                        <Button type="submit" className="bg-blue-600 hover:bg-blue-700 font-semibold px-8" disabled={!name}>Create</Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    )
}
