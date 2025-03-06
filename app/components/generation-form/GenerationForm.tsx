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
import { Sparkles } from "lucide-react"
import { useAppDispatch } from "@/lib/hooks"
import { redirect } from "next/navigation"
import { setSlideDescription, setSlideColor, setSlideCount } from "@/lib/features/generation-form/generationFormSlice"
import { useState } from "react"
import { Input } from "@/components/ui/input"

const FormSchema = z.object({
  count: z
    .custom((val) => Number(val) >= 2, "Must be at least 2 slides."),
  description: z
    .string()
    .min(10, {
      message: "To get better results input no less than 10 symbols.",
    })
})

export default function TextareaForm() {
  const dispatch = useAppDispatch();
  const [color, setColor] = useState('#e66465');
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      count: "",
      description: ""
    },
  })

  function onSubmit(values: z.infer<typeof FormSchema>) {
    dispatch(setSlideDescription(values.description));
    dispatch(setSlideCount(values.count))
    redirect("/step-2")
  }

  function handleColorChange(e: React.ChangeEvent<HTMLInputElement>) {
    dispatch(setSlideColor(e.target.value))
    setColor(e.target.value);
  }

  return (
    <div className="w-[100%] sm:w-[60%] h-[100%] flex-col flex justify-center">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <FormField
            control={form.control}
            name="count"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Slide count:</FormLabel>
                <FormControl>
                  <Input type="number" placeholder="5" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormItem>
            <FormLabel>Slide color:</FormLabel>
            <Input type="color" placeholder="Color" className="max-w-[100px]" value={color} onChange={handleColorChange} />
          </FormItem>
          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Description:</FormLabel>
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
          <Button type="submit"><Sparkles />Generate Your Presentation</Button>
        </form>
      </Form>
    </div>
  )
}