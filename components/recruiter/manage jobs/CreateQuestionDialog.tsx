"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import CreateJobForm from "./CreateJobForm";
import CreateQuestionForm from "./CreateQuestionForm";

const CreateQuestionDialog = () => {
  const [open, setOpen] = useState(false);

  const handleSuccess = () => {
    setOpen(false);
  };
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="ml-auto w-[150px]">Create Question</Button>
      </DialogTrigger>
      <DialogContent className="">
        <DialogHeader className="">
          <DialogTitle className="text-center">
            Create New Job Question
          </DialogTitle>
        </DialogHeader>
        <CreateQuestionForm onSuccess={handleSuccess} />
      </DialogContent>
    </Dialog>
  );
};

export default CreateQuestionDialog;
