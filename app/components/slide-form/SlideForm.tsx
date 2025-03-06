"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"

import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Textarea } from "@/components/ui/textarea"
import { Input } from "@/components/ui/input"
import { useAppDispatch, useAppSelector } from "@/lib/hooks"
import { selectNextIndex, Slide, slideAdded, slideUpdate } from "@/lib/features/generation-form/generationFormSlice"
import { v6 as uuidv6 } from 'uuid';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Pencil, Plus } from "lucide-react"
import { useState } from "react"

const FormSchema = z.object({
  slide_description: z
    .string()
    .min(10, {
      message: "To get better results input no less than 10 symbols.",
    }),
  slide_title: z
    .string()
    .min(2, {
      message: "To get better results input no less than 2 symbols.",
    })
})

interface SlideFormProps {
  usage: 'add' | 'edit',
  item?: Slide
}

export default function SlideForm({ usage, item }: SlideFormProps) {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      slide_title: item?.title ?? "",
      slide_description: item?.content ?? ""
    },
  })

  const dispatch = useAppDispatch();
  const nextSlideIndex = useAppSelector(selectNextIndex);
  const [isOpenDialog, setIsOpenDialog] = useState(false);

  function onSubmit(values: z.infer<typeof FormSchema>) {
    if (usage === 'add') {
      const newId = uuidv6();

      dispatch(slideAdded({
        id: newId,
        title: `${values.slide_title}`,
        content: `${values.slide_description}`,
        index: nextSlideIndex
      }))
    }

    if (usage === 'edit' && item !== undefined) {
      dispatch(slideUpdate({
        id: item?.id,
        changes: {
          title: `${values.slide_title}`,
          content: `${values.slide_description}`
        }
      }))
    }
    setIsOpenDialog(false);
  }

  return (
    <Dialog open={isOpenDialog} onOpenChange={() => {setIsOpenDialog(!isOpenDialog)}}>
      <DialogTrigger asChild>
        {usage === "edit" ?
          <Button variant="ghost" onClick={() => {setIsOpenDialog(true)}}><Pencil /></Button> :
          <Button variant="outline" onClick={() => {setIsOpenDialog(true)}}><Plus /> Add SLide</Button>
        }
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>About slide</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="slide_title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Title</FormLabel>
                  <FormControl>
                    <Input placeholder="Title" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="slide_description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Content</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Provide your presentation name, describe it in a few words."
                      className="resize-none"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit">{usage === "edit" ? "Save" : "Add"}</Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>

  )
}