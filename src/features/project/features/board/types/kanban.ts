export type Assignee = {
  name: string;
  avatar: string;
};

export type Issue = {
  id: string;
  title: string;
  label: "ENG" | "DESIGN" | "DEVOPS" | "PRODUCT" | "QA" | string;
  category: "backlog" | "todo" | "in-progress" | "done";
  points: number;
  priority: string;
  comments: number;
  assignees: Assignee[];
};

export type Column = {
  id: string;
  title: string;
  count: number;
  issues: Issue[];
};