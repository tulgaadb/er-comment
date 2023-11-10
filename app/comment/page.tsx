"use client";
import supabase from "@/utils/supabase";

import { useSearchParams } from "next/navigation";

import NewComment from "../new_comment";

async function getComments(section: string) {
  const data = await fetch(
    `${process.env.NEXT_PUBLIC_URL}/api?section=${section}`
  );
  return data.json();
}

// eslint-disable-next-line @next/next/no-async-client-component
export default async function Home() {
  const searchParams = useSearchParams();
  const section = searchParams.get("section");
  const user = searchParams.get("user");
  const comments = await getComments(section || "");

  return (
    <div>
      {comments?.map((c: any) => {
        return (
          <div key={c.id}>
            <div className="grid my-4 gap-6 justify-self-end">
              <div className="text-sm flex items-start gap-4">
                <div className="grid gap-1.5">
                  <div className="flex items-center gap-2">
                    <div className="font-semibold">{c.customer}</div>
                  </div>
                  <div>{c.comment}</div>
                  <div className="text-zinc-500 text-xs dark:text-zinc-400">
                    {new Date(c.created_at).toUTCString()}
                  </div>
                </div>
              </div>
            </div>
            <hr className="solid" />
          </div>
        );
      })}
      <NewComment user={user} section={section} />
    </div>
  );
}
