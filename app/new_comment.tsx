// import supabase from "@/utils/supabase";
import { createComment } from "@/utils/actions";
import supabase from "@/utils/supabase";
import { createServerActionClient } from "@supabase/auth-helpers-nextjs";
import { revalidatePath, revalidateTag } from "next/cache";
import { useFormState } from "react-dom";

// eslint-disable-next-line @next/next/no-async-client-component
export default async function NewComment({ section, user }: any) {
  const initialState = { message: "", errors: {} };
  const [state, dispatch] = useFormState(createComment, initialState);

  return (
    <form action={dispatch}>
      <input name="comment" />
      <input name="section" type="hidden" defaultValue={section} />
      <input name="user" type="hidden" defaultValue={user} />
      <button type="submit">Send</button>
    </form>
  );
}
