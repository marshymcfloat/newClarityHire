// src/components/CreateQuestionDialog.tsx

"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription, // ✨ NEW: Import DialogDescription
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import CreateQuestionForm from "./CreateQuestionForm";
import { PlusCircle } from "lucide-react"; // ✨ NEW: Add an icon for visual appeal

const CreateQuestionDialog = () => {
  const [open, setOpen] = useState(false);

  // This handler is perfect for closing the dialog upon form success
  const handleSuccess = () => {
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="ml-auto">
          <PlusCircle className="mr-2 h-4 w-4" />
          New Question
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Create a New Question</DialogTitle>
          <DialogDescription>
            This question will be saved to your library and can be added to any
            job posting.
          </DialogDescription>
        </DialogHeader>
        <CreateQuestionForm onSuccess={handleSuccess} />
      </DialogContent>
    </Dialog>
  );
};

export default CreateQuestionDialog;
