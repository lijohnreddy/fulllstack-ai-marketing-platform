"use client";

import React, { useEffect, useRef, useState } from "react";
import { Button } from "./ui/button";
import { Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";
import SidebarNav from "./SidebarNav";
import SidebarToggle from "./SidebarToggle";

const MOBILE_WINDOW_WIDTH_LIMIT = 1024;

function Sidebar() {
  const [isMobile, setIsMobile] = useState(true);
  const [isOpen, setIsOpen] = useState(false);
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const sidebarRef = useRef<HTMLDivElement>(null);

  // Handle Resize
  useEffect(() => {
    const handleResize = () => {
      const calculatedIsMobile = window.innerWidth < MOBILE_WINDOW_WIDTH_LIMIT;
      setIsMobile(calculatedIsMobile);
      if (calculatedIsMobile) {
        setIsCollapsed(false);
      } else {
        setIsOpen(true);
      }
    };

    handleResize();
    setIsMounted(true);
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => {
    const handleOutsideClick = (event: MouseEvent) => {
      if (
        sidebarRef.current &&
        !sidebarRef.current.contains(event.target as Node)
      ) {
        if (isMobile && isOpen) {
          setIsOpen(false);
        }
      }
    };
    window.removeEventListener("mousedown", handleOutsideClick);

    return () => {
      window.removeEventListener("mousedown", handleOutsideClick);
    };
  }, []);

  const toggleSidebar = () => {
    if (isMobile) {
      setIsOpen((prev) => !prev);
    } else {
      setIsCollapsed((prev) => !prev);
    }
  };

  const renderMenuIcon = (isOpen: boolean) => {
    return isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />;
  };

  if (!isMounted) {
    return null;
  }

  return (
    <div>
      {/* mobile X Toggle in the left side bar of the screen */}
      {isMobile && (
        <Button
          variant="ghost"
          onClick={toggleSidebar}
          className={cn(
            "fixed top-4 left-4 z-50 bg bg-transparent hover:bg-gray-100/50 backdrop-blur-sm",
            isOpen && "top-4 left-4"
          )}
        >
          {renderMenuIcon(isOpen)}
        </Button>
      )}
      {/* Store all components in the nav */}
      {(!isMobile || isOpen) && (
        <div
          ref={sidebarRef}
          className={cn(
            "bg-gray-100 flex flex-col h-screen transition-all duration-300 overflow-y-auto",
            // Mobile Styles
            !isMobile
              ? ""
              : `fixed inset-y-0 left-0 z-40 w-64 transform ${
                  isOpen ? "translate-x-0" : "translate-x-full"
                }`,
            // Desktop Styles
            isMobile
              ? ""
              : isCollapsed
              ? "w-24 h-screen sticky top-0"
              : "w-64 h-screen sticky top-0"
          )}
        >
          <div
            className={cn(
              "flex flex-col grow p-6",
              isMobile ? "pt-16" : "pt-10"
            )}
          >
            {!isCollapsed && (
              <h1 className="text-4xl font-bold mb-10">
                AI Marketing PLatform
              </h1>
            )}

            <SidebarNav isMobile={isMobile} isCollapsed={isCollapsed} />
          </div>

          <div>{/* TDOD: User profile from clerk */}</div>
          {!isMobile && (
            <SidebarToggle
              isCollapsed={isCollapsed}
              toggleSidebar={toggleSidebar}
            />
          )}
        </div>
      )}
    </div>
  );
}

export default Sidebar;
