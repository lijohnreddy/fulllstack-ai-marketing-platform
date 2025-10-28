import React from "react";
import ProjectDetailview from "@/components/project-detail/projectDetailView";
import { getProject } from "@/server/queries";
import { notFound } from "next/navigation";

interface ProjectPageProps {
  params: {
    projectId: string;
  };
}
export default async function ProjectPage({ params }: ProjectPageProps) {
  const { projectId } = params;
  const uuidRegex =
    /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

  if (!uuidRegex.test(projectId)) {
    notFound();
  }
  //  Make a query to the database to gram the project with ProjectID
  // Pass project to our children components
  const project = await getProject(projectId);

  //  If not found return 404 page
  if (!project) {
    return notFound();
  }

  return (
    <div className="p-2 sm:p-4 md:p-6 lg:p-8 mt-2">
      <ProjectDetailview project={project} />
    </div>
  );
}
