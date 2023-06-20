const ENDPOINT = "/api";

const formElem = document.querySelector(`form`);
const inputElem = document.querySelector(`input[type=text]`) as HTMLInputElement;
const errorsElem = document.querySelector(`#errors`);
const resultsElem = document.querySelector(`#results`);

if (!(formElem && inputElem && errorsElem && resultsElem)) {
  throw new Error("Bad html");
}

const getSentiment = async (url: string) => {
  const body = JSON.stringify({url});
  console.log("posting ", body);
  const result = await fetch(ENDPOINT,  {
    method: "POST",
    body,
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
  }});
  console.log("result", result);
  return result;
};

const handleResponse = async (res: Response) => {
  console.log(res);
  if (res.ok) {
    const text = JSON.stringify(await res.json(), undefined, 4);
    resultsElem.textContent = text;
    errorsElem.textContent = "";
  }
};

const handleError = (reason: string) => {
  errorsElem.textContent = reason;
};

formElem.onsubmit = e => {
  e.preventDefault();
  const url = inputElem?.value.trim();
  if (url) {
    errorsElem.textContent = "";
    getSentiment(url)
      .then(handleResponse)
      .catch(handleError);
  } else {
    errorsElem.textContent = "Please enter a url";
  }
};
