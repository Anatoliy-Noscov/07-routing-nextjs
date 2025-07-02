import SidebarNotes from "../../../../components/SidebarNotes/SidebarNotes";

const tags = ["Work", "Personal", "Meeting", "Shopping", "Todo"] as const;

export default function Sidebar() {
  return <SidebarNotes tags={tags} />;
}
