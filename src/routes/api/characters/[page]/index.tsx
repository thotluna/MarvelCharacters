import { type RequestHandler } from "@builder.io/qwik-city";
import { generateUrl } from "~/services/fetchCharacters";

export const onGet: RequestHandler = async (requestEvent) => {
  const privateKey = requestEvent.env.get("API_TOKEN_KEY") ?? "";
  const page = Number(requestEvent.params.page) || 0;

  const url = generateUrl(privateKey, page);

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
