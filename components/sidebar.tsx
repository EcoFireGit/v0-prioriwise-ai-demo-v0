import { LayoutDashboard, TrendingUp, AlertTriangle, Database, BookOpen } from "lucide-react"
import Link from "next/link"
import {
  Sidebar as SidebarUI,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"

const menuItems = [
  {
    title: "Dashboard",
    icon: LayoutDashboard,
    href: "/",
  },
  {
    title: "Growth Signals",
    icon: TrendingUp,
    href: "/growth-signals",
  },
  {
    title: "Risk Center",
    icon: AlertTriangle,
    href: "/risk-center",
  },
  {
    title: "Data Connectors",
    icon: Database,
    href: "/data-connectors",
  },
  {
    title: "Value Library",
    icon: BookOpen,
    href: "/value-library",
  },
]

export function Sidebar() {
  return (
    <SidebarUI>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Navigation</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {menuItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <Link href={item.href}>
                      <item.icon />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </SidebarUI>
  )
}
