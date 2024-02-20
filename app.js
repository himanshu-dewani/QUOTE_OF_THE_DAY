const quoteContainer=document.getElementById("quote-container");
const quoteText=document.getElementById("quote");
const authorText=document.getElementById("author");
const twitterBtn=document.getElementById("twitter");
const newQuoteBtn=document.getElementById("new-quote");
const loader=document.getElementById("loader");

let apiQuotes=[];

//show loader
function showLoader(){
    loader.hidden=false;
    quoteContainer.hidden=true;
}

// hide loader
function removeLoader(){
    quoteContainer.hidden=false;
    loader.hidden=true;
}


//show new quote
function newQuote(){
    showLoader();
    // generating a random number to get random quotes from apiQuotes
    const quote=apiQuotes[Math.floor(Math.random() * apiQuotes.length )];
   // check if author is blank then replace it with this
    if(!quote.author){
        authorText.textContent='unknown'
    }
    else{
    authorText.textContent=quote.author;
    }
    //check quote length to determine the styling 
    if(quote.text.length>50){
        quoteText.classList.add('long-quote');
    }
    else{
        quoteText.classList.remove('long-quote');
    }
    quoteText.textContent=quote.text;
    //set quote hide loader
    removeLoader();
}

// get quotes from api
async function getQuotes(){
    showLoader();
    const apiUrl='https://jacintodesign.github.io/quotes-api/data/quotes.json';
    try {
        const response =await fetch(apiUrl);
        apiQuotes= await response.json();
        // console.log(apiQuotes);
      newQuote();
    } catch (error) {
        // catch error here
    }
}

//tweet quote
function tweetQuote(){
    const twitterUrl=`https://twitter.com/intent/tweet?text=${quoteText.textContent}-${authorText.textContent}`;
    window.open(twitterUrl,'_blank');
}

//event Listner
newQuoteBtn.addEventListener('click',newQuote);
twitterBtn.addEventListener('click',tweetQuote);

console.log("hello");
getQuotes();
// loading();

//if we are using localQuotes
// function newQuote(){
//     // generating a random number to get random quotes from apiQuotes
//     const quote=localQuotes[Math.floor(Math.random() * localQuotes.length )];
//    console.log( quote);
// }

// newQuote();