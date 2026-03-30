export type WorkspaceVisibility = "PUBLIC" | "PRIVATE";

export interface DashboardWorkspace {
  id: string;
  title: string;
  description: string;
  visibility: WorkspaceVisibility;
  lastUpdated: string;
  status?: string;
}

export interface DashboardProfileData {
  name: string;
  role: string;
  bio: string;
  location: string;
  company: string;
  email: string;
  website: string;
  avatarUrl: string;
  availability: string;
}
