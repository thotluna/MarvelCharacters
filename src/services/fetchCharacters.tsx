import md5 from 'js-md5'

export const urlBase = 'https://gateway.marvel.com:443/v1/public/'

export const ENDPOINT = {
  CHARACTERS: 'characters'
}

export const getHash = (privateToken: string) => {
  const VITE_API_TOKEN_KEY = import.meta.env.VITE_API_TOKEN_KEY
  const ts = new Date().getTime();
  return {hash: md5(ts + privateToken+  VITE_API_TOKEN_KEY), ts}
}

export interface getFetchProps{
  page: number,
  controller?: AbortController | null
}

export const generateUrl = (keyPrivate: string, page: number) => {
  const {hash, ts} = getHash(keyPrivate)
  const url = new URL(`${urlBase}/${ENDPOINT.CHARACTERS}`)
  url.searchParams.append('ts', `${ts}`)
  url.searchParams.append('apikey', import.meta.env.VITE_API_TOKEN_KEY)
  url.searchParams.append('hash', hash)
  if(page > 0){
    const offset = page * 20 + 1
    url.searchParams.append('offset', offset.toString())
  }
  return url
}

export async function getFetch({page, controller }: getFetchProps){
  const {hash, ts} = getHash()
  const url = new URL(`${urlBase}/${ENDPOINT.CHARACTERS}`)
  url.searchParams.append('ts', `${ts}`)
  url.searchParams.append('apikey', import.meta.env.VITE_API_TOKEN_KEY)
  url.searchParams.append('hash', hash)
  if(page > 0){
    const offset = page * 20 + 1
    url.searchParams.append('offset', offset.toString())
  }

  return await fetch(url, {method: 'GET', signal: controller?.signal}).then(response => response).then(response => response.json)

}