// components/jobs/CreateJobForm.tsx
"use client";

import { useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { RiGeminiLine } from "react-icons/ri";
import type {
  JobStatus,
  JobType,
  ExperienceLevel,
  WorkArrangement,
} from "@prisma/client";

import { createJobSchema, CreateJobValues } from "@/lib/zod schemas/jobSchema";

import {
  departments,
  EXPERIENCE_LEVEL_MAP,
  JOB_STATUS_MAP,
  JOB_TYPE_MAP,
  WORK_ARRANGEMENT_MAP,
} from "@/constants";

// UI Components
import { Button } from "@/components/ui/button";
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";

import {
  generateJobDescriptionField,
  generateJobDescriptionList,
  GenerateListPayload,
  GenerateSummaryPayload,
} from "@/lib/actions/createJobActions"; // Adjust path if necessary
import MultiValueInput from "./MultiValueInput";

const CreateJobForm = () => {
  const [isSubmitting, startTransition] = useTransition();
  const [isGenerating, setIsGenerating] = useState({
    summary: false,
    qualifications: false,
    responsibilities: false,
  });

  const form = useForm<CreateJobValues>({
    resolver: zodResolver(createJobSchema),
    defaultValues: {
      title: "",
      summary: "",
      department: "",
      location: "",
      jobType: "FULL_TIME",
      experienceLevel: "ENTRY",
      workArrangement: "ON_SITE",
      status: "DRAFT",
      salaryMin: undefined,
      salaryMax: undefined,
      benefits: [],
      qualifications: [],
      responsibilities: [],
      skills: [],
      workSchedule: "",
    },
  });

  const handleGenerateSummary = () => {
    const { title, department, experienceLevel, jobType, location, skills } =
      form.getValues();
    if (!title) {
      form.setError("title", { message: "Please enter a job title first." });
      return;
    }
    startTransition(async () => {
      setIsGenerating((prev) => ({ ...prev, summary: true }));
      const payload: GenerateSummaryPayload = {
        jobTitle: title,
        department,
        experienceLevel,
        jobType,
        location,
        skills,
      };
      const result = await generateJobDescriptionField(payload);
      if (result.success && result.text) {
        form.setValue("summary", result.text);
      } else {
        form.setError("summary", {
          message: result.error || "An error occurred.",
        });
      }
      setIsGenerating((prev) => ({ ...prev, summary: false }));
    });
  };

  const handleGenerateList = (
    fieldName: "qualifications" | "responsibilities"
  ) => {
    const { title, summary, department, experienceLevel, jobType } =
      form.getValues();
    if (!title) {
      form.setError("title", { message: "Please enter a job title first." });
      return;
    }
    startTransition(async () => {
      setIsGenerating((prev) => ({ ...prev, [fieldName]: true }));
      const payload: GenerateListPayload = {
        fieldName,
        jobTitle: title,
        summary,
        department,
        experienceLevel,
        jobType,
      };
      const result = await generateJobDescriptionList(payload);
      if (result.success && result.list) {
        form.setValue(fieldName, result.list, { shouldValidate: true });
      } else {
        form.setError(fieldName, {
          message: result.error || "An error occurred.",
        });
      }
      setIsGenerating((prev) => ({ ...prev, [fieldName]: false }));
    });
  };

  const onSubmit = (values: CreateJobValues) => {
    startTransition(() => {
      console.log("Form Submitted:", values);
      alert("Form submitted successfully! Check the console for the data.");
    });
  };

  const AiGenerateButton = ({
    onClick,
    isLoading,
  }: {
    onClick: () => void;
    isLoading: boolean;
  }) => (
    <Button
      type="button"
      variant="ghost"
      size="sm"
      onClick={onClick}
      disabled={isLoading || isSubmitting}
      className="flex items-center gap-2 text-primary hover:text-primary h-8 px-2 text-xs sm:h-9 sm:px-3 sm:text-sm"
    >
      <RiGeminiLine className="h-4 w-4" />
      {isLoading ? "Generating..." : "Generate with AI"}
    </Button>
  );

  return (
    <Form {...form}>
      {/* UPDATED: Changed gap-y for slightly tighter rows */}
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4"
      >
        {/* --- UPDATED: RESTRUCTURED LEFT COLUMN --- */}
        <div className="space-y-4">
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-xs sm:text-sm">Job Title</FormLabel>
                <FormControl>
                  <Input
                    placeholder="e.g., Senior Frontend Developer"
                    className="text-xs sm:text-sm"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Grouped multiple fields into a single grid to reduce dead space */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <FormField
              control={form.control}
              name="department"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-xs sm:text-sm">
                    Department
                  </FormLabel>
                  {/* FIXED: Changed defaultValue to value */}
                  <Select onValueChange={field.onChange} value={field.value}>
                    <FormControl>
                      <SelectTrigger className="text-xs sm:text-sm">
                        <SelectValue placeholder="Select Department" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {departments.map((dep) => (
                        <SelectItem
                          key={dep}
                          value={dep}
                          className="text-xs sm:text-sm"
                        >
                          {dep}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="jobType"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-xs sm:text-sm">Job Type</FormLabel>
                  {/* FIXED: Changed defaultValue to value */}
                  <Select onValueChange={field.onChange} value={field.value}>
                    <FormControl>
                      <SelectTrigger className="text-xs sm:text-sm">
                        <SelectValue placeholder="Select Job Type" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {Object.keys(JOB_TYPE_MAP).map((key) => (
                        <SelectItem
                          key={key}
                          value={key}
                          className="text-xs sm:text-sm"
                        >
                          {JOB_TYPE_MAP[key as JobType]}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="experienceLevel"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-xs sm:text-sm">
                    Experience Level
                  </FormLabel>
                  {/* FIXED: Changed defaultValue to value */}
                  <Select onValueChange={field.onChange} value={field.value}>
                    <FormControl>
                      <SelectTrigger className="text-xs sm:text-sm">
                        <SelectValue placeholder="Select Experience Level" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {Object.keys(EXPERIENCE_LEVEL_MAP).map((key) => (
                        <SelectItem
                          key={key}
                          value={key}
                          className="text-xs sm:text-sm"
                        >
                          {EXPERIENCE_LEVEL_MAP[key as ExperienceLevel]}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="workArrangement"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-xs sm:text-sm">
                    Work Arrangement
                  </FormLabel>
                  {/* FIXED: Changed defaultValue to value */}
                  <Select onValueChange={field.onChange} value={field.value}>
                    <FormControl>
                      <SelectTrigger className="text-xs sm:text-sm">
                        <SelectValue placeholder="Select arrangement" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {Object.keys(WORK_ARRANGEMENT_MAP).map((key) => (
                        <SelectItem
                          key={key}
                          value={key}
                          className="text-xs sm:text-sm"
                        >
                          {WORK_ARRANGEMENT_MAP[key as WorkArrangement]}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
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
                <FormLabel className="text-xs sm:text-sm">Location</FormLabel>
                <FormControl>
                  <Input
                    placeholder="e.g., Makati City, Philippines"
                    className="text-xs sm:text-sm"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <FormField
              control={form.control}
              name="salaryMin"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-xs sm:text-sm">
                    Minimum Salary (Optional)
                  </FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      placeholder="e.g., 50000"
                      className="text-xs sm:text-sm"
                      value={field.value ?? ""}
                      onChange={(e) => {
                        const val = e.target.value;
                        field.onChange(
                          val === "" ? undefined : parseInt(val, 10)
                        );
                      }}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="salaryMax"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-xs sm:text-sm">
                    Maximum Salary (Optional)
                  </FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      placeholder="e.g., 80000"
                      className="text-xs sm:text-sm"
                      value={field.value ?? ""}
                      onChange={(e) => {
                        const val = e.target.value;
                        field.onChange(
                          val === "" ? undefined : parseInt(val, 10)
                        );
                      }}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <FormField
            control={form.control}
            name="workSchedule"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-xs sm:text-sm">
                  Work Schedule (Optional)
                </FormLabel>
                <FormControl>
                  <Input
                    placeholder="e.g., Mon-Fri, 9am-6pm"
                    className="text-xs sm:text-sm"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="space-y-6">
          <FormField
            control={form.control}
            name="summary"
            render={({ field }) => (
              <FormItem>
                <div className="flex items-center justify-between">
                  <FormLabel className="text-xs sm:text-sm">Summary</FormLabel>
                  <AiGenerateButton
                    onClick={handleGenerateSummary}
                    isLoading={isGenerating.summary}
                  />
                </div>
                <FormControl>
                  <Textarea
                    placeholder="A brief summary of the role..."
                    rows={6}
                    className="text-xs sm:text-sm"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <h3 className="text-xs sm:text-sm font-medium">Skills</h3>
            </div>
            <MultiValueInput
              control={form.control}
              name="skills"
              label=""
              placeholder="e.g., React, TypeScript"
              as="input"
            />
          </div>
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <h3 className="text-xs sm:text-sm font-medium">Qualifications</h3>
              <AiGenerateButton
                onClick={() => handleGenerateList("qualifications")}
                isLoading={isGenerating.qualifications}
              />
            </div>
            <MultiValueInput
              control={form.control}
              name="qualifications"
              label=""
              placeholder="e.g., Bachelor's degree in Computer Science"
              as="textarea"
            />
            {form.formState.errors.qualifications && (
              <FormMessage>
                {form.formState.errors.qualifications.message}
              </FormMessage>
            )}
          </div>
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <h3 className="text-xs sm:text-sm font-medium">
                Responsibilities
              </h3>
              <AiGenerateButton
                onClick={() => handleGenerateList("responsibilities")}
                isLoading={isGenerating.responsibilities}
              />
            </div>
            <MultiValueInput
              control={form.control}
              name="responsibilities"
              label=""
              placeholder="e.g., Develop and maintain web applications"
              as="textarea"
            />
            {form.formState.errors.responsibilities && (
              <FormMessage>
                {form.formState.errors.responsibilities.message}
              </FormMessage>
            )}
          </div>
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <h3 className="text-xs sm:text-sm font-medium">Benefits</h3>
            </div>
            <MultiValueInput
              control={form.control}
              name="benefits"
              label=""
              placeholder="e.g., Health insurance, 20 days paid leave"
              as="input"
            />
            {form.formState.errors.benefits && (
              <FormMessage>
                {form.formState.errors.benefits.message}
              </FormMessage>
            )}
          </div>
        </div>

        <div className="md:col-span-2">
          <Separator className="my-6" />
          <div className="flex items-center justify-end gap-4">
            <FormField
              control={form.control}
              name="status"
              render={({ field }) => (
                <FormItem className="w-40">
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger className="text-xs sm:text-sm">
                        <SelectValue placeholder="Set Status" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {Object.keys(JOB_STATUS_MAP).map((key) => (
                        <SelectItem
                          key={key}
                          value={key}
                          className="text-xs sm:text-sm"
                        >
                          {JOB_STATUS_MAP[key as JobStatus]}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button
              type="submit"
              disabled={
                isSubmitting || Object.values(isGenerating).some(Boolean)
              }
              className="text-xs sm:text-sm"
            >
              {isSubmitting ? "Saving..." : "Create Job Posting"}
            </Button>
          </div>
        </div>
      </form>
    </Form>
  );
};

export default CreateJobForm;
