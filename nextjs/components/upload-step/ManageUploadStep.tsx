import React from "react";
import UploadStepHeader from "./UploadStepHeader";
import { useParams } from "next/navigation";

function ManageUploadStep() {
  const params = useParams();
  const projectId = params.projectId as string;

  return (
    <div>
      <UploadStepHeader projectId={projectId} />
    </div>
  );
}

export default ManageUploadStep;
