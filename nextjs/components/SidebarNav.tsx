import React from "react";
import { Button } from "./ui/button";
import Link from "next/link";
import { Home, LayoutDashboard, Settings } from "lucide-react";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

interface SidebarNavProps {
  isMobile: boolean;
  isCollapsed: boolean;
}

interface NavItem {
  herf: string;
  label: string;
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  isActive: (pathname: string) => boolean;
}

function SidebarNav({ isMobile, isCollapsed }: SidebarNavProps) {
  const pathname = usePathname();
  const navItems: NavItem[] = [
    {
      herf: "/projects",
      label: "projects",
      icon: Home,
      isActive: (pathname) =>
        pathname === "/projects" || pathname.startsWith("/project/"),
    },
    {
      herf: "/templates",
      label: "Templates",
      icon: LayoutDashboard,
      isActive: (pathname) =>
        pathname === "/templates" || pathname.startsWith("/templates/"),
    },
    {
      herf: "/settings",
      label: "Settings",
      icon: Settings,
      isActive: (pathname) => pathname === "/settings",
    },
  ];

  return (
    <div className="space-y4 overflow-hidden mb-auto">
      {navItems.map((item) => (
        <Button
          key={item.herf}
          variant="ghost"
          asChild
          className={cn(
            "w-full justifi-start hover:text-main hover:bg-grey-200 flex items-center lest-lg font-medium",
            !isMobile && isCollapsed && "justify-center p-2",
            item.isActive(pathname) && "bg-gray-200 textmain"
          )}
        >
          <Link href={item.herf}>
            <item.icon className="h-[22px] w-[22px]" />
            {(isMobile || !isCollapsed) && (
              <span className="ml-3">{item.label}</span>
            )}
          </Link>
        </Button>
      ))}
    </div>
  );
}

export default SidebarNav;
