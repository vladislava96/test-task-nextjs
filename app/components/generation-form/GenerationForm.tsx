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
  FormMessage,
} from "@/components/ui/form"
import { Textarea } from "@/components/ui/textarea"
import styles from "./GenerationForm.module.css"
import { Sparkles } from "lucide-react"
import { useAppDispatch } from "@/lib/hooks"
import { redirect } from "next/navigation"
import { setPresentationDescription } from "@/lib/features/generation-form/generationFormSlice"
 
const FormSchema = z.object({
  presentation: z
    .string()
    .min(10, {
      message: "To get better results input no less than 10 symbols.",
    })
})
 
export default function TextareaForm() {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
  })

  const dispatch = useAppDispatch();
 
  function onSubmit(values: z.infer<typeof FormSchema>) {
    dispatch(setPresentationDescription(values.presentation));
    redirect("/step-2")
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-1/3 h-4 space-y-6">
        <FormField
          control={form.control}
          name="presentation"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Textarea
                  placeholder="Provide your presentation name, describe it in a few words. Provide color and slide count."
                  className={`"resize-none" ${styles.formTextArea}`}
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
  )
}