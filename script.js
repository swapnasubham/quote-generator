const quoteContainer = document.getElementById("quote-container");
const quoteText = document.getElementById("quote");
const authorText = document.getElementById("author");
const twitterBtn = document.getElementById("twitter");
const newQuoteBtn = document.getElementById("new-quote");
const loader = document.getElementById("loader")
const bodyTag = document.body;
/* Loading Spinner*/
function showLoadingSpinner(){
    loader.hidden = false;
    quoteContainer.hidden = true;
}

/* Remove Loading Spinner*/
function removeLoadingSpinner(){
    if(!loader.hidden){
        quoteContainer.hidden = false;
        loader.hidden = true;
    }
}
/* Get Quote from API */
async function getQuoteFromAPI(){
    /* loading */
    showLoadingSpinner();
    /* Fetch data from API */
    const proxyURL = "https://cors-anywhere.herokuapp.com/";
    const apiUrl = "http://api.forismatic.com/api/1.0/?method=getQuote&lang=en&format=json";

    try{
        const response = await fetch(proxyURL + apiUrl);
        const data = await response.json();
        /* If Author is Blank The Rename as Unknown*/
        if(data.quoteAuthor === ""){
            authorText.innerText = "Unknown";
        }
        else{
            authorText.innerText = data.quoteAuthor;
        }
        /* Reduce Font Size for Long quote */
        if(data.quoteText.length > 120){
            quoteText.classList.add("long-quote");
        }
        else{
            quoteText.classList.remove("long-quote");
        }
        quoteText.innerText = data.quoteText;
        /* Stop Loader Show Our Code */
        removeLoadingSpinner();
    }

    catch (err){
        getQuoteFromAPI();
        console.log("OOPs!! No Quotes ",err);
    }
}

/* Tweet Function */
function tweetQuote(){
    const quote = quoteText.innerText;
    const author = authorText.innerText;
    const twitterURL = `https://twitter.com/intent/tweet?text=${quote} - ${author}`;
    window.open(twitterURL,'_blank');
}

/* Event Listner */
newQuoteBtn.addEventListener("click",getQuoteFromAPI);
twitterBtn.addEventListener("click",tweetQuote);

/* On Load Call the API function */
getQuoteFromAPI();