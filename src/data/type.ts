export type UserListItemType = {
  id: number;
  email: string;
  moldevId: string;
  name: string;
  islandName: string;
  totalWarning: number;
  marketingAgree: boolean;
};

export type ReportReceptionItemType = {
  id: number;
  type: "article" | "comment";
  targetEmail: string;
  contentId: number;
  content: string;
  reasonType: string;
  createdDate: string;
};

export type ReportProcessItemType = {
  id: number;
  type: "article" | "comment";
  targetEmail: string;
  contentId: number;
  content: string;
  reasonType: string;
  createdDate: string;
  processedDate: string;
  result: "ignore" | "1" | "3" | "7" | "30" | "forever";
};
