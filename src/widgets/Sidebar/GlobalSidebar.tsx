import { Sidebar, SidebarRail } from "@/shared/ui/sidebar";
export default function GlobalSidebar({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Sidebar
      className="absolute z-[10] bg-glass backdrop-blur-md sidebar sidebar--gradient"
      collapsible="icon"
    >
      {children}
      <SidebarRail />
    </Sidebar>
  );
}
