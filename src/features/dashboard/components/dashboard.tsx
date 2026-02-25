"use client";
import { useState } from "react";
import{ Globe, File, Folder, Locate, LogOut } from "lucide-react"
import { LogoutButton } from "@/features/auth/components/logout-button";
import WorkSpaceSetUp from "@/features/onboarding/components/onboarding-modal";
import { useRouter } from "next/navigation";

export default function ProfileWorkspace() {
  const workspaces = [
    {
      title: "Design System v2",
      desc: "Component library and token documentation",
      status: "ACTIVE",
      visibility: "PUBLIC",
      time: "2h ago",
      active: true,
    },
    {
      title: "Q1 Product Roadmap",
      desc: "Strategic planning and feature prioritization",
      visibility: "PRIVATE",
      time: "1d ago",
      active: false,
    },
    {
      title: "User Research Hub",
      desc: "Interview notes, synthesis, and insights",
      visibility: "PRIVATE",
      time: "3d ago",
      active: false,
    },
    {
      title: "Engineering Handoff",
      desc: "Specs, redlines, and developer documentation",
      visibility: "PUBLIC",
      time: "1w ago",
      active: false,
    },
    {
      title: "Q1 Product Roadmap",
      desc: "Strategic planning and feature prioritization",
      visibility: "PRIVATE",
      time: "1d ago",
      active: false,
    },
    {
      title: "User Research Hub",
      desc: "Interview notes, synthesis, and insights",
      visibility: "PRIVATE",
      time: "3d ago",
      active: false,
    },
    {
      title: "Engineering Handoff",
      desc: "Specs, redlines, and developer documentation",
      visibility: "PUBLIC",
      time: "1w ago",
      active: false,
    },
    {
      title: "Q1 Product Roadmap",
      desc: "Strategic planning and feature prioritization",
      visibility: "PRIVATE",
      time: "1d ago",
      active: false,
    },
    {
      title: "User Research Hub",
      desc: "Interview notes, synthesis, and insights",
      visibility: "PRIVATE",
      time: "3d ago",
      active: false,
    },
    {
      title: "Engineering Handoff",
      desc: "Specs, redlines, and developer documentation",
      visibility: "PUBLIC",
      time: "1w ago",
      active: false,
    },
  ];

const [selected, setSelected] = useState(0);
const [showOnboarding, setShowOnboarding] = useState(false);
const router = useRouter();

  const handleSelect = (i: number) => {
    setSelected(i);
    router.push(`/workspace/${i}`);
    };

    const addWorkSpace = () => {
      setShowOnboarding(true);
    }

  return (
    <div className="min-h-screen w-full bg-background px-6 lg:px-15 xl:px-20">
      <div className="min-h-screen grid grid-cols-1 lg:grid-cols-[35%_1fr] gap-10">

        {/* Sidebar */}
        <aside className="h-full space-y-6 flex flex-col items-start pt-5 lg:pt-20 lg:pr-30 lg:border-r lg:border-border">
          <img
            src="https://i.pravatar.cc/120?img=47"
            alt="profile"
            className="w-30 h-30 rounded-full"
          />

          <div className="space-y-1 tracking-wider">
            <h2 className="text-4xl font-semibold text-foreground">Sarah Jenkins</h2>
            <p className="text-muted-foreground">Product Designer & Art Director</p>
          </div>

          <p className="text-muted-foreground font-1 md:leading-8 text:lg md:text-xl">
            Crafting digital experiences with a focus on typography and minimal aesthetics. Currently leading design systems at Arch. previously at Studio Mono.
          </p>

          <ul className="text-normal text-muted-foreground space-y-4">
            <li> <Locate className="w-4 h-4 inline mr-1" /> San Francisco, CA</li>
            <li> <Folder className="w-4 h-4 inline mr-1" /> Head of Design, Arch</li>
            <li> <File className="w-4 h-4 inline mr-1" /> sarah@arch.design</li>
            <li> <Globe className="w-4 h-4 inline mr-1" /> sarahjenkins.io</li>
          </ul>

          <div className="flex items-center gap-2 text-md text-[#0057E5] lg:mt-5">
            <span className="w-2 h-2 bg-[#0057E5] rounded-full" />
            Open for collaborations
          </div>
        </aside>

        {/* Main */}
        <main className="h-full py-6">
          <div className="flex items-center justify-between mb-6">
            <h1 className="text-2xl font-semibold text-foreground">Workspaces</h1>
            <div className="flex items-center gap-4">
            <button className="bg-[#0057E5] text-white px-4 py-2 text-sm font-medium rounded-md hover:bg-[#0046b8] transition-colors"
            onClick={addWorkSpace}
            >
              + New Workspace
            </button>
            <LogoutButton />
            </div>
          </div>

          <div className="py-4 border-t border-border">
            {workspaces.map((w, i) => (
              <div
                key={i}
                onClick={() => {
                  handleSelect(i);
                }}
                className={`py-5 flex items-start justify-between px-4 py-8 gap-6 mt-4 hover:cursor-pointer border-b ${
                  selected === i ? "border-l-4 border-[#0057E5] pl-4 bg-[#DAE9FA]/50" : ""
                }`}
              >
                <div className="space-y-1">
                  <h3 className="font-large text-xl text-foreground">
                    {w.title}{" "}
                    {w.status && (
                      <span className="ml-2 text-xs text-[#0057E5] font-semibold bg-blue-200 px-1 py-0.5 rounded">
                        {w.status}
                      </span>
                    )}
                  </h3>
                  <p className="text-sm text-muted-foreground">{w.desc}</p>
                </div>

                <div className="flex items-center gap-4 text-sm text-muted-foreground">
                  <span>{w.time}</span>
                  <span
                    className={`px-2 py-1 rounded text-xs ${
                      w.visibility === "PUBLIC"
                        ? "bg-[#DAE9FA] text-[#0057E5]"
                        : "bg-muted text-muted-foreground"
                    }`}
                  >
                    {w.visibility}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </main>
      </div>
      {showOnboarding && <WorkSpaceSetUp />}
    </div>
  );
}