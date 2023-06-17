import checkForName from "./nameChecker";

function handleSubmit(event) {
    event.preventDefault();

    // check what text was put into the form field
    const elem = document.getElementById('name') as HTMLInputElement;
    const formText = elem?.value ?? "";
    checkForName(formText);

    console.log("::: Form Submitted :::");
    fetch('http://localhost:8080/test')
        .then(res => res.json())
        .then(function(res) {
            const elem = document.getElementById('results');
            if (elem) elem.innerHTML = res.message;
        });
}

export { handleSubmit };
