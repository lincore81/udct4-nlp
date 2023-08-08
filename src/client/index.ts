import isUrl from "is-url";

import './styles/resets.scss';
import './styles/base.scss';
import './styles/footer.scss';
import './styles/form.scss';
import './styles/header.scss';
import { InterpretedSentiment, Polarity } from "../common/types";

const ENDPOINT = "/api";

const selectors = {
  form: "form",
  inputElem: "input[type=text]",
  errors: "#errors",
  results: "#results",
  loading: "#loading",
  agreement: "#agreement",
  confidence: "#confidence",
  irony: "#irony",
  polarity: "#polarity",
  subjectivity: "#subjectivity",
  highlights: "#highlights"
};

const elems = Object.fromEntries(
  Object.entries(selectors).map(
    ([k,v]) => {
      const elem = document.querySelector(v);
      if (!elem) throw new Error(`No such elem: ${v}`);
      return [k, document.querySelector(v)];
    })) as {[k in keyof typeof selectors]: HTMLElement};


const getApiResponse = async (url: string) => await fetch(ENDPOINT, {
  method: "POST",
  body: JSON.stringify(isUrl(url)? {url} : {txt: url}),
  headers: {
    "Content-Type": "application/json"
  }
});

const polarity2String = (p: Polarity) =>
  p === "P+" ? "++"
  : p === "P" ? "+"
  : p === "NEU" ? "o"
  : p === "N" ? "-"
  : p === "N+" ? "--"
  : "N/A";

const handleResponse = async (res: Response) => {
  console.log(res);
  if (res.ok) {
    const sentiment = await res.json() as InterpretedSentiment;
    console.log(sentiment);
    elems.errors.classList.add("hidden");
    elems.results.classList.remove("hidden");
    elems.loading.classList.add("hidden");

    elems.agreement.textContent = `Agreement: ${sentiment.agreement.toLocaleLowerCase()}`;
    elems.confidence.textContent = `Confidence: ${sentiment.confidence}%`;
    elems.irony.textContent = `Irony: ${sentiment.irony.toLocaleLowerCase()}`;
    elems.polarity.textContent = `Polarity: ${polarity2String(sentiment.score_tag)}`;
    elems.subjectivity.textContent = `Subjectivity: ${sentiment.subjectivity.toLocaleLowerCase()}`;
    elems.errors.textContent = "";

    if (sentiment.highlights.length) {
      elems.highlights.innerHTML = `
      <h3>Highlights</h3>
      <ul>
        ${sentiment.highlights.map(h =>
          `<li>(<strong>${polarity2String(h.score_tag)}</strong>) ${h.text}</li>`).join('\n')}
      </ul>`;
    } else {
      elems.highlights.innerHTML = `
        <h3>Highlights</h3>
        <pre>¯\\_(ツ)_/¯</pre>
        None`;
    }
  }
};

const handleError = (reason: string) => {
  elems.errors.classList.remove("hidden");
  elems.errors.textContent = `Error: ${reason}`;
};

elems.form.onsubmit = e => {
  e.preventDefault();
  const url = (elems.inputElem as HTMLInputElement)?.value.trim();
  if (url) {
    elems.loading.classList.remove("hidden");
    getApiResponse(url)
      .then(handleResponse)
      .catch(handleError);
  } else {
    elems.errors.classList.remove("hidden");
    elems.errors.textContent = "Please enter a url";
  }
};
