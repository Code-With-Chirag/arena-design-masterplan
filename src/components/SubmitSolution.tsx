
import React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { Link } from "react-router-dom";

// Define the form schema
const submitSolutionSchema = z.object({
  projectLink: z.string().url({ message: "Please enter a valid URL" }),
  pitchDeckLink: z.string().url({ message: "Please enter a valid URL" }).optional().or(z.literal("")),
  demoVideoLink: z.string().url({ message: "Please enter a valid URL" }).optional().or(z.literal("")),
  notes: z.string().max(1000, { message: "Notes must be less than 1000 characters" }).optional(),
});

type SubmitSolutionFormValues = z.infer<typeof submitSolutionSchema>;

interface SubmitSolutionProps {
  challengeId: string;
  challengeTitle: string;
  onCancel: () => void;
}

const SubmitSolution = ({ challengeId, challengeTitle, onCancel }: SubmitSolutionProps) => {
  const form = useForm<SubmitSolutionFormValues>({
    resolver: zodResolver(submitSolutionSchema),
    defaultValues: {
      projectLink: "",
      pitchDeckLink: "",
      demoVideoLink: "",
      notes: "",
    },
  });

  const onSubmit = async (data: SubmitSolutionFormValues) => {
    try {
      // Here you would typically send data to your API
      console.log("Submitting solution:", data);
      
      // Show success message
      toast.success("Your solution has been submitted successfully!");
      
      // Reset form
      form.reset();
      
    } catch (error) {
      console.error("Error submitting solution:", error);
      toast.error("Failed to submit solution. Please try again.");
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6 border rounded-lg bg-card">
      <h2 className="text-2xl font-bold mb-6">Submit Your Solution</h2>
      <p className="text-muted-foreground mb-6">
        Submitting to: <span className="font-medium text-foreground">{challengeTitle}</span>
      </p>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <FormField
            control={form.control}
            name="projectLink"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Project Link*</FormLabel>
                <FormControl>
                  <Input placeholder="https://github.com/yourusername/project" {...field} />
                </FormControl>
                <FormDescription>
                  Link to your GitHub repository, Google Drive folder, etc.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="pitchDeckLink"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Pitch Deck Link (Optional)</FormLabel>
                <FormControl>
                  <Input placeholder="https://slides.google.com/..." {...field} />
                </FormControl>
                <FormDescription>
                  Link to your Google Slides, Canva presentation, PDF, etc.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="demoVideoLink"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Demo Video Link (Optional)</FormLabel>
                <FormControl>
                  <Input placeholder="https://youtube.com/..." {...field} />
                </FormControl>
                <FormDescription>
                  Link to your YouTube, Vimeo, or Loom video.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="notes"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Notes for Sponsor (Optional)</FormLabel>
                <FormControl>
                  <Textarea 
                    placeholder="Any additional information or comments for the sponsor reviewing your submission."
                    className="min-h-32" 
                    {...field} 
                  />
                </FormControl>
                <FormDescription>
                  Any additional information or comments for the sponsor reviewing your submission.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="bg-muted p-4 rounded-md">
            <h3 className="font-medium mb-2">Submission Guidelines</h3>
            <ul className="text-sm text-muted-foreground list-disc pl-5 space-y-1">
              <li>Ensure your repository is public or you've granted access to the sponsor.</li>
              <li>Include a README.md file with setup and usage instructions.</li>
              <li>Only submit original work that you have the right to share.</li>
            </ul>
          </div>

          <div className="flex justify-end space-x-4 pt-4">
            <Button type="button" variant="outline" onClick={onCancel}>
              Cancel
            </Button>
            <Button type="submit">Submit Solution</Button>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default SubmitSolution;
