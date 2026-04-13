export type Assignee = {
  name: string;
  avatar: string;
};

export type Issue = {
  id: string;
  title: string;
  label: "ENG" | "DESIGN" | "DEVOPS";
  priority: "low" | "medium" | "high";
  comments: number;
  assignees: Assignee[];
};

export type Column = {
  id: string;
  title: string;
  count: number;
  issues: Issue[];
};