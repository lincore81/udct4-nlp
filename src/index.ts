import './client/styles/resets.scss';
import './client/styles/base.scss';
import './client/styles/footer.scss';
import './client/styles/form.scss';
import './client/styles/header.scss';

const ENDPOINT = "/api";

const formElem = document.querySelector(`form`);
const inputElem = document.querySelector(`input[type=text]`) as HTMLInputElement;
const errorsElem = document.querySelector(`#errors`);
const resultsElem = document.querySelector(`#results`);

if (!(formElem && inputElem && errorsElem && resultsElem)) {
  throw new Error("I expected a few more elements to be honest.");
}

const getSentiment = async (url: string) => await fetch(ENDPOINT, {
  method: "POST",
  body: JSON.stringify({url})
});

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
