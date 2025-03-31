import "./sidebar.scss";
import { useRouter, usePathname } from "next/navigation";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarRail,
  useSidebar,
  SidebarMenuSub,
  SidebarMenuBadge,
} from "@/shared/ui/sidebar";
import { useGetTournamentStagesQuery } from "@/shared/api";
import { TbTournament } from "react-icons/tb";
import { FaPencilAlt } from "react-icons/fa";
import { Button } from "@/shared/ui/button";
export default function TournamentSidebar({
  tournamentId,
}: {
  tournamentId: string;
}) {
  const router = useRouter();
  const pathname = usePathname();
  const { setOpen } = useSidebar();

  const { data: stages } = useGetTournamentStagesQuery(
    { tournamentId },
    {
      skip: !tournamentId,
    }
  );

  const items = [
    {
      title: "Stages",
      url: `/tournaments/${tournamentId}/stages`,
      icon: <TbTournament />,
      subitems: [
        {
          title: "Edit",
          url: `/tournaments/${tournamentId}/stages/edit`,
          icon: <FaPencilAlt />,
        },
      ],
    },
  ];

  function onClickNavButton(url: string) {
    router.push(url);
    setOpen(false);
  }
  return (
    <Sidebar
      className="absolute z-[10] bg-glass backdrop-blur-md sidebar sidebar--gradient"
      collapsible="icon"
    >
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild isActive={pathname === item.url}>
                    <Button
                      className="w-full justify-start"
                      variant="ghost"
                      onClick={() => onClickNavButton(item.url)}
                    >
                      {item.icon}
                      <span>{item.title}</span>
                    </Button>
                  </SidebarMenuButton>
                  <SidebarMenuBadge>{stages?.length}</SidebarMenuBadge>
                  {item.subitems && (
                    <SidebarMenuSub>
                      {item.subitems.map((subitem) => (
                        <SidebarMenuItem key={subitem.title}>
                          <SidebarMenuButton
                            asChild
                            isActive={pathname === subitem.url}
                          >
                            <Button
                              className="w-full justify-start"
                              variant="ghost"
                              onClick={() => onClickNavButton(subitem.url)}
                            >
                              {subitem.icon}
                              <span>{subitem.title}</span>
                            </Button>
                          </SidebarMenuButton>
                        </SidebarMenuItem>
                      ))}
                    </SidebarMenuSub>
                  )}
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarRail />
    </Sidebar>
  );
}
