import { Button } from "@/components/ui/button";
import { Card, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { DialogTrigger } from "@radix-ui/react-dialog";
import SlideForm from "../slide-form/SlideForm";

interface PlanSlideProps {
  content: string
}

export default function PlanSlide({ content }: PlanSlideProps) {
  return (
    <Card className="max-w-[800px]">
      <CardHeader>
      <CardTitle>
        Title
      </CardTitle>
      <CardDescription>
        {content}
        <p>This project and the components are written in TypeScript. We recommend using TypeScript for your project as well.
        However we provide a JavaScript version of the components as well. The JavaScript version is available via the cli.
        To opt-out of TypeScript, you can use the tsx flag in your components.json file.</p>
    </CardDescription>
      </CardHeader>
      <CardFooter className="flex justify-end gap-x-4">
      <Dialog>
          <DialogTrigger asChild>
          <Button variant="outline">Edit</Button>
          </DialogTrigger>
          <DialogContent>
          <DialogHeader>
              <DialogTitle>About slide</DialogTitle>
          </DialogHeader>
          <SlideForm usage="edit"/>
          </DialogContent>
      </Dialog>
      <Button variant="outline">Delete</Button>
      </CardFooter>
    </Card>
  )
}