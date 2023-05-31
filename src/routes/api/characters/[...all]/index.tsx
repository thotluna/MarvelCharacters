import { type RequestHandler } from "@builder.io/qwik-city";
import { generateUrl } from "~/services/fetchCharacters";

export const onGet: RequestHandler = async (requestEvent) => {
  const privateKey = requestEvent.env.get("API_TOKEN_KEY") ?? "";
  const pathname = requestEvent.pathname
  const page = Number(pathname.split("/").at(-2))
  const search = pathname.split("/").at(-1)

  const url = generateUrl(privateKey, page, search);

  try {   
    const res = await fetch(url, {
      method: "GET",
    });
    const data = await res.json();
    requestEvent.json(200, data);
  } catch (error) {
    requestEvent.json(500, { error: error });
  }
};
