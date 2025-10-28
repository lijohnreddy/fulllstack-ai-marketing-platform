"use server";

import { db } from "./db";
import { projectsTable } from "./db/schema";
import { auth } from "@clerk/nextjs/server";

export async function createProject() {
  // Figure out who the user is
  const { userId } = await auth();
  // verify the user exixts
  if (!userId) {
    throw new Error("User not found");
  }
  // create a project in the database
  const newProject = await db
    .insert(projectsTable)
    .values({
      title: "New Project",
      userId,
    })
    .returning();
  // LATER - redirect to detail view
  //   redirect -> `/project
}
