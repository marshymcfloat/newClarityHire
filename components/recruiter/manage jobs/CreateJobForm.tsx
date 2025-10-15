"use client";

import { useTransition } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { Button } from "@/components/ui/button"; // Assuming shadcn/ui
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { createJobSchema, CreateJobValues } from "@/lib/zod schemas/jobSchema";
import { generateJobDescriptionField } from "@/lib/actions/createJobActions";
import { RiGeminiLine } from "react-icons/ri";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { departments, JOB_TYPE_MAP } from "@/constants";
import { JobType } from "@prisma/client";

const CreateJobForm = () => {
  const [isPending, startTransition] = useTransition();

  const form = useForm<CreateJobValues>({
    resolver: zodResolver(createJobSchema),
    defaultValues: {
      title: "",
      summary: "",
      department: "",
      jobType: "FULL_TIME",
      location: "",
    },
  });

  const handleGenerateSummary = () => {
    const jobTitle = form.getValues("title");

    if (!jobTitle) {
      form.setError("title", {
        message: "Please enter a job title before generating.",
      });
      return;
    }

    startTransition(async () => {
      const result = await generateJobDescriptionField("job summary", jobTitle);

      if (result.success && result.text) {
        form.setValue("summary", result.text);
      } else {
        form.setError("summary", {
          message: result.error || "An unknown error occurred.",
        });
      }
    });
  };

  const onSubmit = (values: CreateJobValues) => {
    console.log("Form Submitted:", values);
    alert("Form submitted! Check the console for the data.");
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="flex gap-4">
        <div className="flex-1 space-y-4 ">
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Job Title</FormLabel>
                <FormControl>
                  <Input
                    placeholder="e.g., Senior Frontend Developer"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="flex gap-2">
            <FormField
              control={form.control}
              name="department"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Department</FormLabel>

                  <FormControl>
                    <Select>
                      <SelectTrigger {...field}>
                        <SelectValue placeholder="Select Department" />
                      </SelectTrigger>
                      <SelectContent>
                        {departments.map((dep) => (
                          <SelectItem className="capitalize" value={dep}>
                            {dep}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </FormControl>
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="department"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Job Type</FormLabel>
                  <FormControl>
                    <Select onValueChange={field.onChange} value={field.value}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select Job Type" />
                      </SelectTrigger>
                      <SelectContent>
                        {Object.keys(JOB_TYPE_MAP).map((key) => (
                          <SelectItem key={key} value={key}>
                            {JOB_TYPE_MAP[key as JobType]}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <FormField
            control={form.control}
            name="location"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Location</FormLabel>
                <FormControl>
                  <Input
                    placeholder="e.g., Makati City, Philippines"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="summary"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Summary</FormLabel>
                <FormControl>
                  <div className="relative">
                    <Textarea
                      placeholder="A brief summary of the role will be generated here..."
                      rows={8}
                      {...field}
                    />
                    <Button
                      type="button"
                      className="size-7! bottom-full right-[-20px] rounded-full p-1 absolute "
                      onClick={handleGenerateSummary}
                    >
                      <RiGeminiLine />
                    </Button>
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <div className="flex-1">meow</div>
      </form>
    </Form>
  );
};

const CreateJobPage = () => {
  return (
    <main className="flex min-h-screen flex-col items-center p-12">
      <div className="w-full">
        <h1 className="text-3xl font-bold mb-2">Create a New Job Posting</h1>
        <p className="text-muted-foreground mb-8">
          Fill in the details below or use AI to help you.
        </p>
        <CreateJobForm />
      </div>
    </main>
  );
};

export default CreateJobPage;
