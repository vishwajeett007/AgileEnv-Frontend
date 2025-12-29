"use client"

import { Toaster as Sonner } from "sonner"
import { ComponentProps } from "react"

type ToasterProps = ComponentProps<typeof Sonner>

const Toaster = ({ ...props }: ToasterProps) => {
    return (
        <Sonner
            className="toaster group"
            toastOptions={{
                classNames: {
                    toast:
                        "group toast group-[.toaster]:bg-white group-[.toaster]:text-gray-950 group-[.toaster]:border-gray-200 group-[.toaster]:shadow-lg",
                    description: "group-[.toast]:text-gray-500",
                    actionButton:
                        "group-[.toast]:bg-gray-900 group-[.toast]:text-gray-50",
                    cancelButton:
                        "group-[.toast]:bg-gray-100 group-[.toast]:text-gray-500",
                    error: "group-[.toaster]:bg-red-600 group-[.toaster]:text-white group-[.toaster]:border-red-700",
                    success: "group-[.toaster]:bg-green-600 group-[.toaster]:text-white group-[.toaster]:border-green-700",
                    warning: "group-[.toaster]:bg-yellow-600 group-[.toaster]:text-white group-[.toaster]:border-yellow-700",
                    info: "group-[.toaster]:bg-blue-600 group-[.toaster]:text-white group-[.toaster]:border-blue-700",
                },
            }}
            {...props}
        />
    )
}

export { Toaster }
