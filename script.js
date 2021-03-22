
const button = document.querySelector("#buttonteller");
const audio = document.querySelector("#audio")

async function getJokeText() {
    const jokeAPIURL = "https://v2.jokeapi.dev/joke/Programming?blacklistFlags=sexist";
    try {
        const resp = await fetch(jokeAPIURL);
        const joke = await resp.json();
        let jokeText;
        //Check between 1/2 parts jokes
        if (joke.type == "twopart") {
            jokeText = joke.setup + joke.delivery
        } else {
            jokeText = joke.joke;
        }
        speechJoke(jokeText);
    } catch (err) {
        disabledButton();
        console.log(err);
    }
}

function speechJoke(jokeText) {
    //create audioUrl and populate audioag. 
    const audioURL = `http://api.voicerss.org/?key=fd0d80678ef64171830cac0bb104aea4&hl=en-us&src=${jokeText}"`;
    audio.src = audioURL;
}


function disabledButton() {
    button.disabled = !button.disabled
    button.classList.toggle("disabledButton");
}


button.addEventListener("click", getJokeText)
button.addEventListener("click", disabledButton);
audio.addEventListener("ended", disabledButton);
audio.addEventListener("loadeddata", () => audio.play())


