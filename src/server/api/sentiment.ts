import fetch from "node-fetch";
import { stringify } from "querystring";
import { Sentiment, InterpretedSentiment, Sentence, Polarity } from "../../common/types";


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
  const json = await res.json();
  return interpretResults(json as Sentiment);
};


export const interpretResults = (sentiment: Sentiment): InterpretedSentiment => {
  const mostNegative = minmax(sentiment.sentence_list, comparator(false));
  const mostPositive = minmax(sentiment.sentence_list, comparator(true));
  const disparity = mostPositive.value != mostNegative.value
    && mostNegative.item && mostPositive.item;
  const highlights = (disparity
    ? polarity2Num(sentiment.score_tag) > 0
      ? [mostPositive.item, mostNegative.item]
      : [mostNegative.item, mostPositive.item]
    : [/* it's all the same :| */]) as Sentence[];
  return {...sentiment, highlights};
};


type Acc<T> = {value: number, item?: T}
const minmax = <T>(xs: T[], comparator: (acc: Acc<T>, t: T) => Acc<T>, initial: Acc<T> = {value: 0}) =>
  xs.reduce(comparator, initial);


const comparator = (max: boolean) => <T>(acc: Acc<T>, s: Sentence) => {
  const value = polarity2Num(s.score_tag);
  return max
    ? value > acc.value ? {value, item: s} : acc
    : value < acc.value ? {value, item: s} : acc;
};


const polarity2Num = (p: Polarity) =>
    p === "N+"  ?-10
  : p === "N"   ? -5
  : p === "NEU" ?  0
  : p === "P"   ?  5
  : p === "P+"  ? 10
  : 0;