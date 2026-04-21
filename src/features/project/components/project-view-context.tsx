"use client";

import { createContext, useContext, useState } from "react";

type ZoomLevel = "day" | "week" | "month";

type ProjectViewContextValue = {
  zoom: ZoomLevel;
  setZoom: (zoom: ZoomLevel) => void;
};

const ProjectViewContext = createContext<ProjectViewContextValue | null>(null);

export function ProjectViewProvider({ children }: { children: React.ReactNode }) {
  const [zoom, setZoom] = useState<ZoomLevel>("day");

  return (
    <ProjectViewContext.Provider value={{ zoom, setZoom }}>
      {children}
    </ProjectViewContext.Provider>
  );
}

export function useProjectView() {
  const context = useContext(ProjectViewContext);

  if (!context) {
    throw new Error("useProjectView must be used within a ProjectViewProvider");
  }

  return context;
}

export type { ZoomLevel };