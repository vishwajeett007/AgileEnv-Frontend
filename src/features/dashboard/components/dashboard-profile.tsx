import { File, Folder, Globe, Locate } from "lucide-react";

import type { DashboardProfileData } from "../types";

interface DashboardProfileProps {
  profile: DashboardProfileData;
}

export function DashboardProfile({ profile }: DashboardProfileProps) {
  return (
    <aside className="flex h-full flex-col items-start space-y-6 pt-5 lg:border-r lg:border-border lg:pr-30 lg:pt-20">
      <img
        src={profile.avatarUrl}
        alt={`${profile.name} profile`}
        className="h-30 w-30 rounded-full"
      />

      <div className="space-y-1 tracking-wider">
        <h2 className="text-4xl font-semibold text-foreground">{profile.name}</h2>
        <p className="text-muted-foreground">{profile.role}</p>
      </div>

      <p className="text-muted-foreground font-1 md:text-xl md:leading-8 text:lg">
        {profile.bio}
      </p>

      <ul className="space-y-4 text-normal text-muted-foreground">
        <li>
          <Locate className="mr-1 inline h-4 w-4" /> {profile.location}
        </li>
        <li>
          <Folder className="mr-1 inline h-4 w-4" /> {profile.company}
        </li>
        <li>
          <File className="mr-1 inline h-4 w-4" /> {profile.email}
        </li>
        <li>
          <Globe className="mr-1 inline h-4 w-4" /> {profile.website}
        </li>
      </ul>

      <div className="mt-5 flex items-center gap-2 text-md text-[#0057E5]">
        <span className="h-2 w-2 rounded-full bg-[#0057E5]" />
        {profile.availability}
      </div>
    </aside>
  );
}
