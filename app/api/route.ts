import supabase from "@/utils/supabase";
import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const url = request.url.split("section=");
  if (url.length !== 2) {
    const { data } = await supabase.from("comment").select();

    return NextResponse.json(data);
  }

  const { data } = await supabase
    .from("comment")
    .select()
    .eq("section", url[1]);

  return NextResponse.json(data);
}
