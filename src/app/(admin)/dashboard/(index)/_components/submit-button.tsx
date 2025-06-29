import { Button } from "@/components/ui/button";
import { useFormStatus } from "react-dom";

interface SubmitButtonProps {
  type: string;
}

export default function SubmitButton({ type }: SubmitButtonProps) {
  const { pending } = useFormStatus();

  return (
    <Button type="submit" size="sm" disabled={pending}>
      {pending ? "Loading..." : `Save ${type}`}
    </Button>
  );
}
