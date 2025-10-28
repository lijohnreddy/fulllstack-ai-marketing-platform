import { db } from "@/server/db";
import { assetProcessingJobTable, assetTable } from "@/server/db/schema";
import { auth } from "@clerk/nextjs/server";
import { handleUpload, type HandleUploadBody } from "@vercel/blob/client";
import { NextResponse } from "next/server";

export async function POST(request: Request): Promise<NextResponse> {
  const body = (await request.json()) as HandleUploadBody;

  try {
    const jsonResponse = await handleUpload({
      body,
      request,
      onBeforeGenerateToken: async (pathname, clientPayload) => {
        const { userId } = await auth();
        if (!userId) {
          return {};
        }

        return {
          allowedContentTypes: [
            "video/mp4",
            "video/quicktime",
            "audio/mpeg",
            "audio/ogg",
            "text/plain",
            "text/mmarkdown",
          ],
          maximumSizeInBytes: 5 * 1024 * 1024 * 1024, //5GB
          addRandomSuffix: true,
          // callbackUrl: 'https://example.com/api/avatar/upload',
          // optional, `callbackUrl` is automatically computed when hosted on Vercel
          tokenPayload: clientPayload,
          // optional, sent to your server on upload completion
          // you could pass a user id from auth, or a value from clientPayload
        };
      },
      onUploadCompleted: async ({ blob, tokenPayload }) => {
        // Called by Vercel API on client upload completion
        // Use tools like ngrok if you want this to work locally

        if (!tokenPayload) return;

        const { projectId, fileType, mimeType, size } =
          JSON.parse(tokenPayload);

        console.log(
          `Saving blob URL ${blob.url} to database for project ${projectId} with filename ${blob.pathname}`
        );
        try {
          const [newAsset] = await db
            .insert(assetTable)
            .values({
              projectId,
              title: blob.pathname.split("/").pop() || blob.pathname,
              fileName: blob.pathname,
              fileUrl: blob.url,
              fileType,
              mimeType,
              size,
            })
            .returning();

          await db.insert(assetProcessingJobTable).values({
            assetId: newAsset.id,
            projectId,
            status: "created",
          });
          // Run any logic after the file upload completed
          // const { userId } = JSON.parse(tokenPayload);
          // await db.update({ avatar: blob.url, userId });
        } catch (error) {
          throw new Error(
            `Could not save asset processing job to database: ${
              (error as Error).message
            }`
          );
        }
      },
    });

    return NextResponse.json(jsonResponse);
  } catch (error) {
    return NextResponse.json(
      { error: (error as Error).message },
      { status: 400 } // The webhook will retry 5 times waiting for a 200
    );
  }
}
