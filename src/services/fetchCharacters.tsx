import MD5 from "crypto-js/md5.js";

export const urlBase = "https://gateway.marvel.com:443/v1/public/";

export const ENDPOINT = {
  CHARACTERS: "characters",
};

export const getHash = (privateToken: string) => {
  const VITE_API_TOKEN_KEY = import.meta.env.VITE_API_TOKEN_KEY;
  const ts = new Date().getTime();
  const hash: string = MD5(ts + privateToken + VITE_API_TOKEN_KEY).toString();
  return { hash, ts };
};

export const generateUrl = (
  keyPrivate: string,
  page?: number,
  search?: string
) => {
  const { hash, ts } = getHash(keyPrivate);
  const url = new URL(`${urlBase}${ENDPOINT.CHARACTERS}`);

  if (page && page > 0) {
    const offset = page * 20 + 1;
    url.searchParams.append("offset", offset.toString());
  }
  if (search && search.length > 0) {
    url.searchParams.append("nameStartsWith", search);
  }

  url.searchParams.append("ts", `${ts}`);
  url.searchParams.append("apikey", import.meta.env.VITE_API_TOKEN_KEY);
  url.searchParams.append("hash", hash);
  return url;
};
