import { Button } from "@/components/ui/button";
import { Card, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import SlideForm from "../slide-form/SlideForm";
import { Slide, slideRemoved } from "@/lib/features/generation-form/generationFormSlice";
import { useAppDispatch } from "@/lib/hooks";
import { Trash2 } from "lucide-react";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";

interface PlanSlideProps {
  item: Slide
}

export default function PlanSlide({ item }: PlanSlideProps) {
  const dispatch = useAppDispatch();

  function handleDelete() {
    dispatch(slideRemoved(item.id))
  }

  return (
    <Card className="max-w-3xl">
      <CardHeader>
        <CardTitle>
          {item.title}
        </CardTitle>
        <CardDescription>
          {item.content}
        </CardDescription>
      </CardHeader>
      <CardFooter className="flex justify-end gap-x-2">
        <SlideForm usage="edit" item={item} />
        <Dialog>
          <DialogTrigger><Button variant="ghost"><Trash2 /></Button></DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Are you absolutely sure?</DialogTitle>
              <DialogDescription>
                This action cannot be undone. This will permanently delete your slide.
              </DialogDescription>
            </DialogHeader>
            <DialogFooter><Button onClick={handleDelete}>Yes, I want to delete this slide.</Button></DialogFooter>
          </DialogContent>
        </Dialog>
      </CardFooter>
    </Card>
  )
}