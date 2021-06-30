
const form = document.querySelector('#form');
const list_tweets = document.querySelector('#list-tweets ul');
let tweets = [];

eventListeners();

function eventListeners(){

    document.addEventListener('DOMContentLoaded', start);
    form.addEventListener('submit', add_tweet);
    list_tweets.addEventListener('click', delete_tweet);
}

function start(){
    tweets = JSON.parse(localStorage.getItem('tweets')) || [];
    createHTML();
}

function add_tweet(e){
    e.preventDefault();
    const tweet = document.querySelector('#tweet').value;
    const tweetObject = {
        id: Date.now(),
        text: tweet
    }

    tweets.push(tweetObject);
    createHTML();
    form.reset();
}

function createHTML(){
    clearHTML();

    if(tweets.length > 0){

        tweets.forEach( tweet =>{
            const btn_delete = document.createElement('a');
            btn_delete.classList.add('delete-tweet');
            btn_delete.innerText = 'X';

            const li = document.createElement('li');
            li.innerText = tweet.text;
            li.appendChild(btn_delete);
            li.dataset.id = tweet.id;

            list_tweets.appendChild(li);
        });

    }
    addLocalStorage();
}

function addLocalStorage(){
    localStorage.setItem('tweets',JSON.stringify(tweets));
}

function clearHTML(){
    while(list_tweets.firstChild)
        list_tweets.removeChild(list_tweets.firstChild);
    
    localStorage.clear();
}

function delete_tweet(e){
    e.preventDefault();
    const id = e.target.parentElement.dataset.id;
    tweets = tweets.filter( t => t.id != id );
    createHTML();
}