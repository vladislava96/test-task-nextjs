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
import { useAppDispatch } from "@/lib/hooks"
import { slideAdded } from "@/lib/features/generation-form/generationFormSlice"
import { v6 as uuidv6 } from 'uuid';
 
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
  usage: 'add' | 'edit'
}

export default function SlideForm({ usage }: SlideFormProps) {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      slide_title: "",
      slide_description: ""
    },
  })

  const dispatch = useAppDispatch();
 
  function onSubmit(values: z.infer<typeof FormSchema>) {
    if (usage === 'add') {
      console.log('submit')

    const newId = uuidv6();

      dispatch(slideAdded({
        id: newId,
        title: `${values.slide_title}`,
        content: `${values.slide_description}`
      }))
    }
  }

  return (
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
                  placeholder="Provide your presentation name, describe it in a few words. Provide color and slide count."
                  className="resize-none"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">{usage === "edit" ? "Save": "Add"}</Button>
      </form>
    </Form>
  )
}