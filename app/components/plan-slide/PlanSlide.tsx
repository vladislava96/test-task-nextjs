import { Button } from "@/components/ui/button";
import { Card, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { DialogTrigger } from "@radix-ui/react-dialog";
import SlideForm from "../slide-form/SlideForm";
import { Slide, slideRemoved } from "@/lib/features/generation-form/generationFormSlice";
import { useAppDispatch } from "@/lib/hooks";

interface PlanSlideProps {
  item: Slide
}

export default function PlanSlide({ item }: PlanSlideProps) {
  const dispatch = useAppDispatch();

  function handleDelete() {
    dispatch(slideRemoved(item.id))
  }

  return (
    <Card className="max-w-[800px]">
      <CardHeader>
      <CardTitle>
        {item.title}
      </CardTitle>
      <CardDescription>
        {item.id}
        {item.content}
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
          <SlideForm usage="edit" item={item} />
          </DialogContent>
      </Dialog>
      <Button variant="outline" onClick={handleDelete}>Delete</Button>
      </CardFooter>
    </Card>
  )
}