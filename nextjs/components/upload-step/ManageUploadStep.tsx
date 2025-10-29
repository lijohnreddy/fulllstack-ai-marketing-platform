"use client";

import React, { useState, useEffect, useCallback } from "react";
import UploadStepHeader from "./UploadStepHeader";
import { useParams } from "next/navigation";
import UploadStepBody from "./UploadStepBody";
import ConfirmationModel from "../ui/ConfirmationModel";
import axios from "axios";
import toast from "react-hot-toast";
import { Asset } from "@/server/db/schema";

interface ManageUploadStepprops {
  projectId: string;
}

function ManageUploadStep({ projectId }: ManageUploadStepprops) {
  const [deleteAssetId, setDeleteAssetId] = React.useState<string | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [uploadAssets, setUploadAssets] = useState<Asset[]>([]);

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
      <UploadStepHeader projectId={projectId} />
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
