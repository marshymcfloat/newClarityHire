"use client";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Edit } from "lucide-react";
import CreateJobForm from "./CreateJobForm";
import { useRef } from "react";
import { Job } from "@prisma/client";

const EditJobDialog = ({ job }: { job: Job }) => {
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  function handleSuccess() {
    if (closeButtonRef.current) {
      closeButtonRef.current.click();
    }
  }
  return (
    <>
      <Dialog>
        <DialogClose className="hidden" ref={closeButtonRef} />
        <DialogTrigger>
          <div className="flex gap-2 items-center ">
            <Edit />
            <p>Edit</p>
          </div>
        </DialogTrigger>
        <DialogContent className="sm:max-w-5xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Create a New Job Posting</DialogTitle>
            <DialogDescription>
              Fill in the details below. You can use our AI assistant to help
              generate content.
            </DialogDescription>
          </DialogHeader>
          <CreateJobForm onSuccess={handleSuccess} />
        </DialogContent>
      </Dialog>
    </>
  );
};

export default EditJobDialog;
