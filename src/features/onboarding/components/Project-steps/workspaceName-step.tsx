"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import Image from "next/image"
import { useState } from "react"
import { useAppDispatch, useAppSelector } from "@/lib/hooks"
import { setWorkspaceName, setWorkspaceDescription, setWorkspaceCode } from "@/lib/features/onboarding/onboarding-Slice"
import { useAuthFetch } from "@/hooks/use-auth-fetch"
import { Toaster } from "sonner"
interface WorkspaceStepProps {
    onNext: () => void
}

export function WorkspaceStepName({ onNext }: WorkspaceStepProps) {

    const dispatch = useAppDispatch();
    const authFetch = useAuthFetch();
    const { workspaceName, description, code } = useAppSelector((state) => state.onboarding)
    const [isCodeFocused, setIsCodeFocused] = useState(false);


    const isValidCode = (value: string) => {
        const upper = (value.match(/[A-Z]/g) || []).length;
        const lower = (value.match(/[a-z]/g) || []).length;
        const digits = (value.match(/[0-9]/g) || []).length;
        return upper >= 2 && lower >= 2 && digits >= 4 && value.length === 8;
    };

    const codeValid = isValidCode(code);

    const handleSubmit = async () => {
        if (workspaceName.trim() && description.trim() && codeValid) {
            try {
                const response = await authFetch("workspace/create/", {
                    method : "POST",
                    body : JSON.stringify({
                        name : workspaceName,
                        description : description,
                        code : code
                    }),
                })
                if(response.ok){
                    const data = await response.json();
                    console.log("Workspace created successfully", data);
                    onNext();
                }
            } catch (error){
                Toaster(error || "Failed to create workspace");
                console.error("Error creating workspace", error);
            }
        }
    }
    
    return (
        <div className="flex flex-col gap-6 px-1 lg:px-10">
            {/* <div className="flex flex-col gap-4"> */}
            <div className="flex items-center justify-center gap-1">
                <Image
                    src="/Images/logo.svg"
                    alt="logo"
                    width={60}
                    height={60}
                />
                <h2 className="text-3xl font-medium text-blue-600 pb-1">Agile</h2>
            </div>

            <div className="flex flex-col gap-3 py-4 items-center justify-center">
                <h1 className="font-medium text-4xl text-center">Let’s set up your workspace</h1>
                <p className="text-center text-md tracking-[0.02rem] text-muted-foreground font-roboto">
                    Your workspace will be the hub for all your projects, tasks, and team collaboration. Start by giving it a name
                </p>
            </div>

            <div className="flex flex-col gap-4">
                <div className="relative w-full">
                    <Input
                        id="workspace-name"
                        placeholder=" "
                        value={workspaceName}
                        onChange={(e) => dispatch(setWorkspaceName(e.target.value))}
                        className="h-12 px-5 bg-gray-100 peer border border-gray-400 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                        autoFocus
                    />

                    <label
                        htmlFor="workspace-name"
                        className={`absolute left-3 bg-gray-100 px-1 rounded-sm transition-all duration-200
                             ${workspaceName.trim().length > 0
                                ? "-top-2 text-xs text-gray-500"
                                : "top-3 text-base text-gray-400"
                            }`}
                    >
                        Workspace Name
                    </label>
                </div>
                <div className="relative w-full">
                    <Input
                        id="workspace-description"
                        placeholder=" "
                        value={description}
                        onChange={(e) => dispatch(setWorkspaceDescription(e.target.value))}
                        className="h-12 px-5 bg-gray-100 peer border border-gray-400 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                        autoFocus
                    />

                    <label
                        htmlFor="workspace-description"
                        className={`absolute left-3 bg-gray-100 px-1 rounded-sm transition-all duration-200
                                ${description.trim().length > 0
                                ? "-top-2 text-xs text-gray-500"
                                : "top-3 text-base text-gray-400"
                            }`}
                    >
                        Workspace Description
                    </label>
                </div>
                <div className="relative w-full">
                    <Input
                        id="workspace-code"
                        placeholder=" "
                        value={code}
                        maxLength={8}
                        onChange={(e) => dispatch(setWorkspaceCode(e.target.value))}
                        onFocus={() => setIsCodeFocused(true)}
                        onBlur={() => setIsCodeFocused(false)}
                        className={`h-12 px-5 bg-gray-100 peer border focus:ring-1 ${code.length > 0 && !codeValid ? "border-red-400 focus:border-red-500 focus:ring-red-500" : "border-gray-400 focus:border-blue-500 focus:ring-blue-500"}`}
                        autoFocus
                    />

                    <label
                        htmlFor="workspace-code"
                        className={`absolute left-3 bg-gray-100 px-1 rounded-sm transition-all duration-200
                             ${code.trim().length > 0
                                ? "-top-2 text-xs text-gray-500"
                                : "top-3 text-base text-gray-400"
                            }`}
                    >
                        Workspace Code
                    </label>
                    {isCodeFocused && !isValidCode(code) && (
                        <div className="absolute z-10 w-full mt-2 p-4 bg-white border border-gray-200 rounded-lg shadow-xl text-sm text-gray-600 top-full left-0 animate-in fade-in zoom-in-95 duration-200">
                            <div className="absolute -top-2 left-4 w-4 h-4 bg-white border-t border-l border-gray-200 transform rotate-45"></div>
                            <h4 className="font-semibold mb-2 text-gray-700">Code Requirements</h4>
                            <ul className="list-disc pl-5 space-y-1 text-xs">
                                <li className={`${(code.match(/[A-Z]/g) || []).length >= 2 ? "text-green-600" : "text-gray-600"}`}>At least 2 uppercase letters (A-Z)</li>
                                <li className={`${(code.match(/[a-z]/g) || []).length >= 2 ? "text-green-600" : "text-gray-600"}`}>At least 2 lowercase letters (a-z)</li>
                                <li className={`${(code.match(/[0-9]/g) || []).length >= 4 ? "text-green-600" : "text-gray-600"}`}>At least 4 numbers (0-9)</li>
                                <li className={`${code.length === 8 ? "text-green-600" : "text-gray-600"}`}>Exactly 8 characters total</li>
                            </ul>
                        </div>
                    )}
                </div>
                <p className="text-sm text-muted-foreground">
                    You can change this later
                </p>
            </div>

            <div className="flex items-center justify-center">
                <Button
                    className="w-full hover:bg-blue-800 bg-blue-700 py-6 text-lg text-white font-light"
                    onClick={handleSubmit} 
                    disabled={!workspaceName.trim() || !codeValid || !description.trim()}
                    >
                    Continue
                </Button>
            </div>
        </div>
    )
}
