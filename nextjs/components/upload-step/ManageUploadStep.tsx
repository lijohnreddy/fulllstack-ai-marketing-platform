"use client";

import React, { useState, useEffect, useCallback, useRef } from "react";
import UploadStepHeader from "./UploadStepHeader";
import { useParams } from "next/navigation";
import UploadStepBody from "./UploadStepBody";
import ConfirmationModel from "../ui/ConfirmationModel";
import axios from "axios";
import toast from "react-hot-toast";
import { Asset } from "@/server/db/schema";
import { upload } from "@vercel/blob/client";

interface ManageUploadStepprops {
  projectId: string;
}

function ManageUploadStep({ projectId }: ManageUploadStepprops) {
  const [deleteAssetId, setDeleteAssetId] = React.useState<string | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [uploadAssets, setUploadAssets] = useState<Asset[]>([]);
  const [uploading, setUploding] = useState(false);
  const [browserFiles, setBrowserFiles] = useState<File[]>([]);

  const inputFileRef = useRef<HTMLInputElement>(null);

  const fetchAsset = useCallback(async () => {
    setIsLoading(true);
    try {
      const response = await axios.get<Asset[]>(
        `/api/projects/${projectId}/assets`
      );
      setUploadAssets(response.data);
      console.log("Upload Assets", response.data);
    } catch (error) {
      console.error("Failed to fetch assets", error);
    } finally {
      setIsLoading(false);
    }
  }, [projectId]);

  useEffect(() => {
    fetchAsset();
  }, [fetchAsset]);

  const getFileType = (file: File) => {
    if (file.type.startsWith("/video")) return "video";
    if (file.type.startsWith("/video")) return "video";
    if (file.type === "text/plain") return "text";
    if (file.type === "text/markdown") return "markdown";
    return "other";
  };

  const handleUpload = async () => {
    setUploding(true);
    try {
      // uploadfiles
      const uploadPromis = browserFiles.map(async (file) => {
        const fileData = {
          projectId,
          title: file.name,
          fileType: getFileType(file),
          mimeType: file.type,
          size: file.size,
        };

        const filename = `${projectId}/${file.name}`;
        await upload(filename, file, {
          access: "public",
          handleUploadUrl: `/api/upload`,
          multipart: true,
          clientPayload: JSON.stringify(fileData),
        });
      });

      const uploadResults = await Promise.all(uploadPromis);

      toast.success(`Files uploaded ${uploadResults.length} successfully`);
      setBrowserFiles([]);
      if (inputFileRef.current) {
        inputFileRef.current.value = "";
      }

      // TODO: fetch fies
      fetchAsset();
    } catch (error) {
      console.error("Error in upload process", error);
      toast.error("Failed to upload one or more files. Please try again.");
    } finally {
      setUploding(false);
    }
  };

  const handleDelete = async () => {
    // TODO: api delete request to delete asset
    setIsDeleting(true);
    try {
      await axios.delete(
        `/api/projects/${projectId}/assets?assetId=${deleteAssetId}`
      );
      toast.success("Asset deleted successfully");
      // TODO: Refetch assets
    } catch (error) {
      console.error("Failed to delete project", error);
      toast.error("Failed to delete asset. Please try again.");
    } finally {
      setIsDeleting(false);
      setDeleteAssetId(null);
    }
  };

  return (
    <div>
      <UploadStepHeader
        setBrowserFiles={setBrowserFiles}
        browserFiles={browserFiles}
        inputFileRef={inputFileRef}
        handleUpload={handleUpload}
        uploading={uploading}
      />
      <UploadStepBody
        isLoading={isLoading}
        setDeleteAssetId={setDeleteAssetId}
        uploadAssets={uploadAssets}
      />
      <ConfirmationModel
        isOpen={!!deleteAssetId}
        title={"Delete Asset"}
        message={
          "Are you sure you want to delete this asset? This action cannot be undone"
        }
        onClose={() => {
          setDeleteAssetId(null);
        }}
        onConfirm={handleDelete}
        isLoading={isDeleting}
      />
    </div>
  );
}

export default ManageUploadStep;
