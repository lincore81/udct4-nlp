import fetch from "node-fetch";
import { stringify } from "querystring";

const ENDPOINT = "https://api.meaningcloud.com/sentiment-2.1";

const getQuery = (url: string): string => {
  const params = stringify({
    lang: "auto",
    ilang: "en",
    key: process.env.NLP_API_KEY ?? "put-key-in-dotenv-pls",
    url
  });
  return `${ENDPOINT}?${params}`;
};

export const request = async (url: string) => {
  const query = getQuery(url);
  console.log("query: ", query);
  const res = await fetch(query, {method: "POST"});
  return res.json();
};
