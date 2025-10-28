import { getAuth } from "@clerk/nextjs/server";
import { z } from "zod";
import { NextRequest, NextResponse } from "next/server";
import { projectsTable } from "@/server/db/schema";
import { db } from "@/server/db";
import { and, eq } from "drizzle-orm";

const updateProjectSchema = z.object({
  title: z.string().min(1),
});

export async function PATCH(
  request: NextRequest,
  context: { params: Promise<{ projectId: string }> }
) {
  const { params } = context;
  // TODO: CHECT TO MAKE SURE THE PERSON IS AUTHORISED TO EDIT THE PROJECT
  const { userId } = getAuth(request);
  if (!userId) {
    return NextResponse.json({ error: "Unathorised" }, { status: 401 });
  }

  const body = await request.json();
  const validatedData = updateProjectSchema.safeParse(body);

  if (!validatedData.success) {
    return NextResponse.json(
      { error: validatedData.error.issues },
      { status: 400 }
    );
  }

  const { title } = validatedData.data;
  // TODO: MAKE A DB REQUEST TO UPDATE THE PROJECT TITLE
  const updateProject = await db
    .update(projectsTable)
    .set({ title })
    .where(
      and(
        eq(projectsTable.userId, userId),
        eq(projectsTable.id, (await params).projectId)
      )
    )
    .returning();

  if (updateProject.length === 0) {
    return NextResponse.json({ error: "Project not found" }, { status: 404 });
  }

  return NextResponse.json(updateProject[0]);
  // TODO: RETURN RESULTS
  // TODO: 404 IF PROJECT NOT FOUND
}

export async function DELETE(
  request: NextRequest,
  context: { params: Promise<{ projectId: string }> }
) {
  const { params } = context;
  const { userId } = getAuth(request);
  if (!userId) {
    return NextResponse.json({ error: "Unathorised" }, { status: 401 });
  }

  const deleatedProject = await db
    .delete(projectsTable)
    .where(
      and(
        eq(projectsTable.userId, userId),
        eq(projectsTable.id, (await params).projectId)
      )
    )
    .returning();

  if (deleatedProject.length === 0) {
    return NextResponse.json({ error: "project not found" }, { status: 404 });
  }

  return NextResponse.json(deleatedProject[0]);
}
