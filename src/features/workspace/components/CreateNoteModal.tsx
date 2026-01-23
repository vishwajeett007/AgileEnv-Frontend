"use client"

import { useState } from "react"
import { useAppDispatch } from "@/lib/hooks"
import { addNote } from "@/lib/features/workspace/workspace-Slice"
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

export default function CreateNoteModal({ workspaceId, children }: { workspaceId: string, children: React.ReactNode }) {
    const [open, setOpen] = useState(false)
    const [title, setTitle] = useState("")
    const [content, setContent] = useState("")
    const dispatch = useAppDispatch()

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        if (!title || !content) return

        const id = Math.random().toString(36).substr(2, 9)

        dispatch(addNote({
            workspaceId,
            note: {
                id,
                title,
                content,
                date: "Just now",
                author: "VS"
            }
        }))

        setTitle("")
        setContent("")
        setOpen(false)
    }

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                {children}
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle className="text-2xl font-bold text-[#172B4D]">Create New Note</DialogTitle>
                </DialogHeader>
                <form onSubmit={handleSubmit} className="space-y-6 pt-4">
                    <div className="space-y-2">
                        <Label htmlFor="title" className="text-sm font-bold text-[#42526E]">Title</Label>
                        <Input
                            id="title"
                            placeholder="Note title"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            className="h-11 border-[#DFE1E6] focus:border-blue-500"
                        />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="content" className="text-sm font-bold text-[#42526E]">Content</Label>
                        <textarea
                            id="content"
                            placeholder="Write your note here..."
                            value={content}
                            onChange={(e) => setContent(e.target.value)}
                            className="w-full h-32 px-3 py-2 bg-white border border-[#DFE1E6] rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>
                    <DialogFooter className="pt-4">
                        <Button type="button" variant="ghost" onClick={() => setOpen(false)} className="font-semibold">Cancel</Button>
                        <Button type="submit" className="bg-blue-600 hover:bg-blue-700 font-semibold px-8" disabled={!title || !content}>Save Note</Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    )
}
