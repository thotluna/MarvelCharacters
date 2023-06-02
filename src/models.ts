export interface Root {
  code: number;
  status: string;
  copyright: string;
  attributionText: string;
  attributionHTML: string;
  etag: string;
  data: Data;
}

export interface Data {
  offset: number;
  limit: number;
  total: number;
  count: number;
  results: CharacterType[];
}

export interface Thumbnail {
  path: string;
  extension: string;
}

export const InitialThumbnail = {
  path: "",
  extension: "",
};

export interface Item {
  resourceURI: string;
  name: string;
}

export const InitialItem = {
  resourceURI: "",
  name: "",
};

export interface Comics {
  available: number;
  collectionURI: string;
  items: Item[];
  returned: number;
}

export const InitialComics = {
  available: 0,
  collectionURI: "",
  items: [InitialItem],
  returned: 0,
};

export interface Item2 {
  resourceURI: string;
  name: string;
}

export const InitialItem2 = {
  resourceURI: "",
  name: "",
};

export interface Series {
  available: number;
  collectionURI: string;
  items: Item2[];
  returned: number;
}

export const InitialSeries = {
  available: "",
  collectionURI: "",
  items: [InitialItem2],
  returned: "",
};

export interface Item3 {
  resourceURI: string;
  name: string;
  type: string;
}

export const InitialItem3 = {
  resourceURI: "",
  name: "",
  type: "",
};

export interface Stories {
  available: number;
  collectionURI: string;
  items: Item3[];
  returned: number;
}

export const InitialStories = {
  available: 0,
  collectionURI: "",
  items: [InitialItem3],
  returned: 0,
};

export interface Item4 {
  resourceURI: string;
  name: string;
}

export const InitialItem4 = {
  resourceURI: "",
  name: "",
};

export interface Events {
  available: number;
  collectionURI: string;
  items: Item4[];
  returned: number;
}

export const InitialEvents = {
  available: 0,
  collectionURI: "",
  items: [InitialItem4],
  returned: 0,
};

export interface Url {
  type: string;
  url: string;
}

export const InitialUrl = {
  type: "",
  url: "",
};

export interface CharacterType {
  id: number;
  name: string;
  description: string;
  modified: string;
  thumbnail: Thumbnail;
  resourceURI: string;
  comics: Comics;
  series: Series;
  stories: Stories;
  events: Events;
  urls: Url[];
}

export const InitialCharacter: CharacterType = {
  id: 0,
  name: "",
  description: "",
  modified: "",
  thumbnail: InitialThumbnail,
  resourceURI: "",
  comics: InitialComics,
  series: InitialStories,
  stories: InitialStories,
  events: InitialEvents,
  urls: [InitialUrl],
};

export const MessageType = {
  INFO: "info",
  LOADING: "loading",
  SUCCESS: "success",
  ERROR: "error",
};

export interface MessageStore {
  message: string;
  type: string;
  requiredTimeout: boolean;
}

export const MessageStoreDefaults = {
  message: "",
  type: MessageType.SUCCESS,
  requiredTimeout: true,
};

export interface storeProps {
  page: number;
  data?: Data | null;
  loading: boolean;
  search: string;
}
