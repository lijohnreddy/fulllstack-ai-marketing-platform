"use client";
import { Asset } from "@/server/db/schema";
import React from "react";
import { Skeleton } from "../ui/skeleton";
import { AudioLines, Video, File, FileMinus, Dot, Trash } from "lucide-react";
import { Button } from "../ui/button";

interface UploadStepBodyprops {
  setDeleteAssetId: React.Dispatch<React.SetStateAction<string | null>>;
  isLoading: boolean;
  uploadAssets: Asset[];
}

function UploadStepBody({
  setDeleteAssetId,
  isLoading,
  uploadAssets,
}: UploadStepBodyprops) {
  // fetch all assets
  // fetch all asset processing jobs - polling
  // TODO: show a skeleton loding asset

  if (isLoading) {
    return (
      <div className="space-y-2 sm:space-y-3 md:space-y-4">
        <Skeleton className="h-10 w-full rounded-xl" />
        <Skeleton className="h-10 w-full rounded-xl" />
        <Skeleton className="h-10 w-full rounded-xl" />
      </div>
    );
  }

  return (
    <div>
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-end mb-4 mt-3">
        <h3 className="font-bold text-lg mb-2 sm:mb-0">Upload Files</h3>
        <div>{/* TODO: Token usage bar  on the right*/}</div>
      </div>
      <ul className="space-y-1">
        {uploadAssets.map((asset) => (
          <li
            key={asset.id}
            className="flex items-center justify-between hover:bg-gray-100 rounded-lg transition-all duration-100 px-3 py-2 group"
          >
            <span className="flex items-center text-semibold min-w-0 flex-1 mr-2">
              <FileIconLoader fileType={asset.fileType} />
              <div className="flex flex-col ml-3 w-full min-w-0">
                <span className="font-medium text-sm sm:text-base truncate">
                  {asset.title}
                </span>
                <div className="flex flex-col sm:flex-row sm:items-center text-gray-500 w-full min-w-0">
                  <p className="text-xs sm:text-sm truncate">
                    Job Status: Unknown
                  </p>
                  <Dot className="hidden sm:flex shrink-0" />
                  <p className="text-xs sm:text-sm truncate">
                    Tokens: ??
                    {/* {formatFileTokens(asset.tokenCount || 0)} */}
                  </p>
                </div>
              </div>
            </span>
            <Button
              onClick={() => setDeleteAssetId(asset.id)}
              className="text-red-500 bg-transparent shadow-none hover:bg-transparent shrink-0 lg:opacity-0 lg:group-hover:opacity-100 transition-all duration-100"
            >
              <Trash className="h-5 w-5" />
              <span className="hidden lg:inline ml-2">Delete</span>
            </Button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default UploadStepBody;

// Extra components
function FileIconLoader({ fileType }: { fileType: string }) {
  switch (fileType) {
    case "video":
      return <Video className="h-5 w-5 shrink-0 text-main" />;
    case "audio":
      return <AudioLines className="h-5 w-5 shrink-0 text-main" />;
    case "text":
      return <File className="h-5 w-5 shrink-0 text-main" />;
    case "markdown":
      return <FileMinus className="h-5 w-5 shrink-0 text-main" />;
    default:
      return <File className="h-5 w-5 shrink-0 text-main" />;
  }
}
