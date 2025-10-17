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

const CreateJobDialog = () => {
  const [open, setOpen] = useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="ml-auto w-[150px]">Create Job</Button>
      </DialogTrigger>
      <DialogContent className="lg:max-h-[85vh] h-[95vh] min-w-[60vw] overflow-y-auto">
        <DialogHeader className="hidden">
          <DialogTitle className="text-center"></DialogTitle>
        </DialogHeader>
        <CreateJobForm onSuccess={() => setOpen(false)} />
      </DialogContent>
    </Dialog>
  );
};

export default CreateJobDialog;
