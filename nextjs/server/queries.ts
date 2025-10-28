"server only";

import { auth } from "@clerk/nextjs/server";
import { db } from "./db";
import { projectsTable, project } from "./db/schema";
import { eq } from "drizzle-orm";

export async function getProjectsForUser(): Promise<project[]> {
  // Figure out who the user is
  const { userId } = await auth();

  // Verify the user exists
  if (!userId) {
    throw new Error("User not found");
  }

  // Fetch projects from database
  const projects = db.query.projectsTable.findMany({
    where: eq(projectsTable.userId, userId),
    orderBy: (projects, { desc }) => [desc(projects.updatedAt)],
  });

  return projects;
}

export async function getProject(projectId: string) {
  // Figure out whou the user is
  const { userId } = await auth();

  // Verify the user exists

  if (!userId) {
    throw new Error("User not found");
  }
  // Authenticated
  // Autharised

  // Fetch project database
  console.log("ProjectId before query:", projectId);
  const project = await db.query.projectsTable.findFirst({
    where: (project, { eq, and }) =>
      and(eq(project.id, projectId), eq(project.userId, userId)),
  });

  return project;
}
