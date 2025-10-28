import { Button } from "@/components/ui/button";
import ProjectList from "@/components/ProjectList";
import { createProject } from "@/server/mutation";
import { getProjectsForUser } from "@/server/queries";
import { Plus } from "lucide-react";
import React from "react";

export default async function ProjectsPage() {
  //  Fetch data from database
  const projects = await getProjectsForUser();
  return (
    <div className="w-full">
      {/* TODO: Create project list header with create sction */}
      {/* TODO: Grid of projects to view each project and navigate to detail project */}
      <div className="max-w-screen-2x1 mx-auto p-4 sm:p-6 md:p-8 lg:p-12 mt-2 space-y-6 sm:space-y-8 lg:space-y-10">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4 sm:mb-6">
          <div className="space-y-2 sm:space-y-4 mb sm:mb-0">
            <h1 className="text-2x1 s m:text-3x1 lg:text-4x1 font-bold">
              My Projects
            </h1>
            <p className="text-sm sm:text-base text-gray-500">
              Manage your Marketing projects effictively using AI
            </p>
          </div>
          <form action={createProject} className="w-full sm:w-auto">
            <Button className="rounded-3x1 text-base w-full sm:w-auto">
              <Plus className="w-4 h-4 mr-1" strokeWidth={3} />
              New Project
            </Button>
          </form>
        </div>
        <ProjectList projects={projects} />
      </div>
    </div>
  );
}
