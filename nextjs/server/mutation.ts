"use server";

import { redirect } from "next/navigation";
import { db } from "./db";
import { projectsTable, templatesTable } from "./db/schema";
import { auth } from "@clerk/nextjs/server";

export async function createProject() {
  // Figure out who the user is
  const { userId } = await auth();
  // verify the user exixts
  if (!userId) {
    throw new Error("User not found");
  }
  // create a project in the database
  const [newProject] = await db
    .insert(projectsTable)
    .values({
      title: "New Project",
      userId,
    })
    .returning();
  // LATER - redirect to detail view
  //   redirect -> `/project
  redirect(`/project/${newProject.id}`);
}

export async function createTemplate() {
  const { userId } = await auth();
  if (!userId) {
    throw new Error("User not found");
  }
  const [newTemplate] = await db
    .insert(templatesTable)
    .values({ title: "New Template", userId })
    .returning({
      id: templatesTable.id,
    });

  redirect(`template/${newTemplate.id}`);
}
