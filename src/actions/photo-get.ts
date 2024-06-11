"use server";

import { PHOTO_GET } from "@/functions/api";
import apiError from "@/functions/api-error";
import { Photo } from "./photos-get";

export interface Comment {
  comment_ID: string;
  comment_post_ID: string;
  commet_author: string;
  comment_content: string;
}

export interface PhotoData {
  photo: Photo;
  comments: Comment[];
}

export default async function photoGet(id: number) {
  try {
    const { url } = PHOTO_GET(id);

    const response = await fetch(url, {
      next: {
        revalidate: 10,
        tags: ["photos", "comment"],
      },
    });

    if (!response.ok) throw new Error("Não foi possivel carregar a imagem.");

    const data = (await response.json()) as PhotoData;
    return { data, ok: true, error: "" };
  } catch (error: unknown) {
    return apiError(error);
  }
}
