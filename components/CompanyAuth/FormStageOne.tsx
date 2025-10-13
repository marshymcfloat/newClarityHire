"use client";

import {
  companyCreationStageOneSchema,
  CompanyCreationStageOneValues,
} from "@/lib/zod schemas/auth/authSchemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { useDispatch } from "react-redux";
import { launghCompanySliceActions } from "@/lib/redux slices/LaunchCompanySlice";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { Eye, EyeOff, Loader2 } from "lucide-react";

const FormStageOne = ({ nextStep }: { nextStep: () => void }) => {
  const dispatch = useDispatch();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const form = useForm<CompanyCreationStageOneValues>({
    resolver: zodResolver(companyCreationStageOneSchema),
    defaultValues: {
      fullname: "",
      workEmail: "",
      password: "",
      confirmPassword: "",
    },
    mode: "onBlur",
  });

  const { formState } = form;

  async function handleSubmission(values: CompanyCreationStageOneValues) {
    setIsSubmitting(true);
    await new Promise((resolve) => setTimeout(resolve, 500));

    dispatch(launghCompanySliceActions.setStepOneForm(values));
    setIsSubmitting(false);
    nextStep();
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(handleSubmission)}
        className="space-y-4"
      >
        <FormField
          control={form.control}
          name="fullname"
          render={({ field }) => (
            <FormItem>
              <FormLabel
                className={cn(formState.errors.fullname && "text-destructive")}
              >
                Full Name
              </FormLabel>
              <FormControl>
                <Input {...field} placeholder="Juan Dela Cruz" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="workEmail"
          render={({ field }) => (
            <FormItem>
              <FormLabel
                className={cn(formState.errors.workEmail && "text-destructive")}
              >
                Work Email
              </FormLabel>
              <FormControl>
                <Input
                  {...field}
                  type="email"
                  placeholder="juandelacruz@company.com"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel
                className={cn(formState.errors.password && "text-destructive")}
              >
                Password
              </FormLabel>
              <FormControl>
                <div className="relative">
                  <Input
                    {...field}
                    type={showPassword ? "text" : "password"}
                    placeholder="••••••••"
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    className="absolute right-1 top-1/2 h-7 w-7 -translate-y-1/2 text-slate-500 hover:text-slate-800"
                    onClick={() => setShowPassword((prev) => !prev)}
                  >
                    {showPassword ? (
                      <EyeOff className="h-4 w-4" />
                    ) : (
                      <Eye className="h-4 w-4" />
                    )}
                  </Button>
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="confirmPassword"
          render={({ field }) => (
            <FormItem>
              <FormLabel
                className={cn(
                  formState.errors.confirmPassword && "text-destructive"
                )}
              >
                Confirm Password
              </FormLabel>
              <FormControl>
                <div className="relative">
                  <Input
                    {...field}
                    type={showPassword ? "text" : "password"}
                    placeholder="••••••••"
                  />
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="flex justify-end pt-4">
          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            Continue
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default FormStageOne;
