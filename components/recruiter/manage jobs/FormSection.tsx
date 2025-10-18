import { Separator } from "@/components/ui/separator";

type FormSectionProps = {
  title: string;
  description: string;
  children: React.ReactNode;
};

const FormSection = ({ title, description, children }: FormSectionProps) => {
  return (
    <div className="space-y-6 rounded-lg border p-6 shadow-sm">
      <div>
        <h3 className="text-lg font-medium tracking-tight">{title}</h3>
        <p className="text-sm text-muted-foreground mt-1">{description}</p>
      </div>
      <Separator />
      <div className="space-y-4">{children}</div>
    </div>
  );
};

export default FormSection;
