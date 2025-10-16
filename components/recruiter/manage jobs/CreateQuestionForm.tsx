"use client";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { QUESTION_TYPE_MAP } from "@/constants";
import {
  createQuestionSchema,
  CreateQuestionValues,
} from "@/lib/zod schemas/questionSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { QuestionTypeEnum } from "@prisma/client";
import { useForm } from "react-hook-form";
import MultiValueInput from "./MultiValueInput";
import { Button } from "@/components/ui/button";
import { useMutation } from "@tanstack/react-query";
import { createNewQuestionAction } from "@/lib/actions/questionActions";
import { LoaderCircle } from "lucide-react";
import { toast } from "sonner";

const CreateQuestionForm = ({ onSuccess }: { onSuccess: () => void }) => {
  const form = useForm<CreateQuestionValues>({
    resolver: zodResolver(createQuestionSchema),
    defaultValues: {
      question: "",
      type: "TEXT",
      options: [],
    },
  });

  const typeInputWatch = form.watch("type");

  const { mutate, isPending } = useMutation({
    mutationFn: createNewQuestionAction,
    onSuccess: (data) => {
      if (!data.success) {
        toast(data.error);
        return;
      }
      toast(data.message);
      onSuccess();
    },
  });

  const handleSubmission = (values: CreateQuestionValues) => {
    mutate(values);
  };

  return (
    <Form {...form}>
      <form
        action=""
        onSubmit={form.handleSubmit(handleSubmission)}
        className="space-y-4"
      >
        <FormField
          control={form.control}
          name="type"
          render={({ field }) => (
            <Select onValueChange={field.onChange} value={field.value}>
              <FormControl>
                <SelectTrigger>
                  <SelectValue placeholder="Select Question Type" />
                </SelectTrigger>
              </FormControl>
              <SelectContent>
                {Object.keys(QUESTION_TYPE_MAP).map((key) => (
                  <SelectItem
                    value={key}
                    key={key}
                    className="text-xs sm:text-sm"
                  >
                    {QUESTION_TYPE_MAP[key as QuestionTypeEnum]}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          )}
        />
        <FormField
          control={form.control}
          name="question"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Question</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {(typeInputWatch === "MULTIPLE_CHOICE" ||
          typeInputWatch === "CHECKBOX") && (
          <MultiValueInput
            control={form.control}
            label="Question Options"
            name="options"
            as="input"
            placeholder="React, NextJS, etc;."
          />
        )}

        <div className="flex justify-end">
          <Button disabled={isPending}>
            {isPending && <LoaderCircle className="animate-spin" />}
            Create
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default CreateQuestionForm;
