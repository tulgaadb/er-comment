"use server";
import supabase from "./supabase";
import { z } from "zod";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

const FormSchema = z.object({
  id: z.string(),
  user: z.string({}),
  section: z.string(),
  comment: z.string(),
  date: z.string(),
});

const CreateInvoice = FormSchema.omit({ id: true, date: true });
const UpdateInvoice = FormSchema.omit({ date: true, id: true });

export type State = {
  errors?: {};
  message?: null;
};

export async function createComment(prevState: any, formData: FormData) {
  // console.log("🚀 ~ file: actions.ts:36 ~ createInvoice ~ formData:", formData);
  //   Validate form fields using Zod

  const comment = String(formData.get("comment"));
  const user = String(formData.get("user"));
  const section = String(formData.get("section"));

  // console.log("🚀 ~ file: actions.ts:36 ~ createInvoice ~ formData:", formData);
  // //   Validate form fields using Zod
  // const validatedFields = CreateInvoice.safeParse({
  //   customer: formData.get("user"),
  //   section: formData.get("section"),
  //   comment: formData.get("comment"),
  // });
  // console.log(
  //   "🚀 ~ file: actions.ts:37 ~ createInvoice ~ validatedFields:",
  //   validatedFields
  // );
  // // If form validation fails, return errors early. Otherwise, continue.
  // if (!validatedFields.success) {
  //   return {
  //     errors: validatedFields.error.flatten().fieldErrors,
  //     message: "Missing Fields. Failed to Create Invoice.",
  //   };
  // }
  // Prepare data for insertion into the database
  // const { comment, user, section } = validatedFields.data;

  //   // Insert data into the database
  try {
    await supabase.from("comment").insert({ user, comment, section });
  } catch (error) {
    console.log("🚀 ~ file: actions.ts:61 ~ createInvoice ~ error:", error);
    // If a database error occurs, return a more specific error.
    return {
      message: "Database Error: Failed to Create chats.",
    };
  }
  // Revalidate the cache for the invoices page and redirect the user.
  revalidatePath(`/comment?user=${user}&section=${section}`);
  redirect(`/comment?user=${user}&section=${section}`);
}
