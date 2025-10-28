import {
  AlertDialog,
  AlertDialogDescription,
} from "@radix-ui/react-alert-dialog";
import React from "react";
import {
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "./alert-dialog";
import { Loader2 } from "lucide-react";

interface ConfirmationModelProps {
  isOpen: boolean;
  title: string;
  message: string;
  isLoading?: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

function ConfirmationModel({
  isOpen,
  title,
  message,
  isLoading,
  onClose,
  onConfirm,
}: ConfirmationModelProps) {
  return (
    <AlertDialog open={isOpen}>
      <AlertDialogContent className="max-w-[90%] sm:max-w-lg bg-white">
        <AlertDialogHeader>
          <AlertDialogTitle className="text-lg sm:text-xl md:text-2xl">
            {title}
          </AlertDialogTitle>
          <AlertDialogDescription className="text-sm sm:text-base">
            {message}
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter className="flex-col space-y-2 sm:flex-row sm:space-y-0 sm:space-x-2">
          <AlertDialogCancel
            onClick={onClose}
            className="w-full sm:w-auto border-main text-main bg-white hover:bg-main/5"
            disabled={isLoading}
          >
            Cancel
          </AlertDialogCancel>
          <AlertDialogAction
            onClick={onConfirm}
            className="w-full sm:w-auto"
            disabled={isLoading}
          >
            {isLoading ? (
              <Loader2 className="animate-spin h-4 w-4 mr-2" />
            ) : null}
            Confirm
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}

export default ConfirmationModel;
