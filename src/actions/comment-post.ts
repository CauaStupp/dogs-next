"use server";

import { COMMENT_POST, PHOTO_POST } from "@/functions/api";
import apiError from "@/functions/api-error";
import { cookies } from "next/headers";
import { revalidateTag } from "next/cache";
import { Comment } from "./photo-get";

export default async function commentPost(state: {}, formData: FormData) {
  const comment = formData.get("comment") as string | null;
  const id = formData.get("id") as string | null;
  const token = cookies().get("token")?.value;

  try {
    if (!comment || !id || !token) {
      throw new Error("Preencha todos os dados.");
    }

    const { url } = COMMENT_POST(id);
    const response = await fetch(url, {
      method: "POST",
      headers: {
        Authorization: "Bearer " + token,
      },
      body: formData,
    });

    if (!response.ok) throw new Error("Email ou usuário já existem.");
    const data = (await response.json()) as Comment;
    revalidateTag("comment");
    return { data, ok: true, error: "" };
  } catch (error: unknown) {
    return apiError(error);
  }
}
