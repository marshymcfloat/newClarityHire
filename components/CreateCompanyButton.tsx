import { Button } from "./ui/button";
import { Dialog, DialogContent, DialogTrigger } from "./ui/dialog";
import { Rocket } from "lucide-react";

const CreateCompanyButton = () => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          size="lg"
          className="
            font-bold
            
            
            bg-white/60 
            border border-slate-200/80 
            shadow-md shadow-black/10 
            
            text-slate-900 
            backdrop-blur-lg 
            transform transition-all duration-300 
            hover:scale-105 hover:bg-white/80 hover:shadow-lg
            
            z-50

            
            fixed bottom-6 left-1/2 -translate-x-1/2 
            md:bottom-auto md:left-auto md:translate-x-0 md:top-8 md:right-8
          "
        >
          <Rocket className="mr-2 h-5 w-5" />
          Launch Your Company
        </Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-[425px]">
        <header className="pt-4">
          <h2 className="text-lg font-semibold leading-none tracking-tight">
            Launch Your Company
          </h2>
          <p className="text-sm text-muted-foreground mt-1">
            Let's get you started. Fill in the details below.
          </p>
        </header>

        <div className="py-4">
          <p>Your registration form will appear here.</p>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default CreateCompanyButton;
