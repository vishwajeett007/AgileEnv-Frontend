"use client"

import { redirect, useParams } from "next/navigation"

export default function WorkspacePage() {
    const params = useParams()
    const workspaceId = params.workspaceId as string

    redirect(`/workspace/${workspaceId}/kanban`)
}
