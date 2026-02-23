"use client";

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
    },
    {
      title: "User Research Hub",
      desc: "Interview notes, synthesis, and insights",
      visibility: "PRIVATE",
      time: "3d ago",
    },
    {
      title: "Engineering Handoff",
      desc: "Specs, redlines, and developer documentation",
      visibility: "PUBLIC",
      time: "1w ago",
    },
  ];

  return (
    <div className="min-h-screen bg-white px-6 py-8">
      <div className="mx-auto max-w-7xl grid grid-cols-1 lg:grid-cols-[320px_1fr] gap-10">

        {/* Sidebar */}
        <aside className="space-y-6">
          <img
            src="https://i.pravatar.cc/120?img=47"
            alt="profile"
            className="w-24 h-24 rounded-full"
          />

          <div>
            <h2 className="text-2xl font-semibold">Sarah Jenkins</h2>
            <p className="text-gray-500">Product Designer & Art Director</p>
          </div>

          <p className="text-gray-600">
            Crafting digital experiences with a focus on typography and minimal aesthetics.
          </p>

          <ul className="text-sm text-gray-600 space-y-2">
            <li>📍 San Francisco, CA</li>
            <li>💼 Head of Design, Arch</li>
            <li>✉️ sarah@arch.design</li>
            <li>🌐 sarahjenkins.io</li>
          </ul>

          <div className="flex items-center gap-2 text-sm text-green-600">
            <span className="w-2 h-2 bg-green-500 rounded-full" />
            Open for collaborations
          </div>
        </aside>

        {/* Main */}
        <main>
          <div className="flex items-center justify-between mb-6">
            <h1 className="text-2xl font-semibold">Workspaces</h1>
            <button className="bg-yellow-400 px-4 py-2 text-sm font-medium rounded">
              + New Workspace
            </button>
          </div>

          <div className="divide-y">
            {workspaces.map((w, i) => (
              <div
                key={i}
                className={`py-5 flex items-start justify-between gap-4 ${
                  w.active ? "border-l-4 border-yellow-400 pl-4" : ""
                }`}
              >
                <div>
                  <h3 className="font-medium">
                    {w.title}{" "}
                    {w.status && (
                      <span className="ml-2 text-xs text-yellow-500">
                        {w.status}
                      </span>
                    )}
                  </h3>
                  <p className="text-sm text-gray-500">{w.desc}</p>
                </div>

                <div className="flex items-center gap-4 text-sm text-gray-500">
                  <span>{w.time}</span>
                  <span
                    className={`px-2 py-1 rounded text-xs ${
                      w.visibility === "PUBLIC"
                        ? "bg-yellow-100 text-yellow-700"
                        : "bg-gray-100 text-gray-600"
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
    </div>
  );
}