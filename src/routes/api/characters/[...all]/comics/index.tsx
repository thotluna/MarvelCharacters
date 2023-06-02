import { type RequestHandler } from "@builder.io/qwik-city";
import { ENDPOINT, getHash, urlBase } from "~/services/fetchCharacters";

export const onGet: RequestHandler = async (requestEvent) => {
  const privateKey = requestEvent.env.get("API_TOKEN_KEY") ?? "";
  const pathname = requestEvent.pathname;
  const id = Number(pathname.split("/").at(-2));
  const comics = pathname.split("/").at(-1);

  const { hash, ts } = getHash(privateKey);
  const url = new URL(`${urlBase}${ENDPOINT.CHARACTERS}/${id}/${comics}`);

  url.searchParams.append("ts", `${ts}`);
  url.searchParams.append("apikey", import.meta.env.VITE_API_TOKEN_KEY);
  url.searchParams.append("hash", hash);

  try {
    const res = await fetch(url, {
      method: "GET",
    });
    const data = await res.json();
    requestEvent.json(200, data);
  } catch (error) {
    requestEvent.json(500, { error: error });
  }

}