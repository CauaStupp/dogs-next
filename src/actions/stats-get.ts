"use server";

import { GET_STATS, PHOTOS_GET } from "@/functions/api";
import apiError from "@/functions/api-error";
import { cookies } from "next/headers";

export interface StatsData {
  id: number;
  title: string;
  acessos: string;
}

export default async function statsGet() {
  try {
    const { url } = GET_STATS();
    const token = cookies().get("token")?.value;

    if (!token) throw new Error("Token inválido");

    const response = await fetch(url, {
      method: "GET",
      headers: {
        Authorization: "Bearer " + token,
      },
    });

    if (!response.ok)
      throw new Error("Não foi possivel carregar as estatísticas.");

    const data = (await response.json()) as StatsData[];
    return { data, ok: true, error: "" };
  } catch (error: unknown) {
    return apiError(error);
  }
}
