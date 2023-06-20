import fetch from "node-fetch";
import { stringify } from "querystring";

export const DUMMY_KEY = "put-key-in-dotenv-pls";
export const ENDPOINT = "https://api.meaningcloud.com/sentiment-2.1";

export const buildQuery = (text: string, isUrl: boolean): string => {
  const params = stringify({
    lang: "auto",
    ilang: "en",
    key: process.env.NLP_API_KEY || DUMMY_KEY,
    url: isUrl? text : undefined,
    txt: isUrl? undefined : text,
  });
  return `${ENDPOINT}?${params}`;
};

export const request = async (text: string, isUrl: boolean) => {
  const query = buildQuery(text, isUrl);
  const res = await fetch(query, {method: "POST"});
  return res.json();
};
