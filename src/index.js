import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter, Route, withRouter} from 'react-router-dom';
import * as Redux from 'redux';
import * as ReactRedux from 'react-redux';
import './index.css';
import AuthorQuiz from './AuthorQuiz';
import AddAuthorForm from './AddAuthorForm';
import * as serviceWorker from './serviceWorker';
import {shuffle, sample} from 'underscore';

const authors = [
    {
        name: 'Mark Twain',
        imageUrl: 'images/author/marktwain.jpg',
        imageSource: 'Wikimedia Commons',
        books: [
            'The Adventures Of Huckleberry Finn',
            'Life on the Mississippi',
            'Roughing it'
        ]
    },
    {
        name: 'Joseph Conrad',
        imageUrl: 'images/author/josephconrad.png',
        imageSource: 'Wikimedia Commons',
        books: [
            'Heart of Darkness',
            'Lord Jim',
            'Nostromo',
            'The Secret Agent'
        ]
    },
    {
        name: 'William Shakespeare',
        imageUrl: 'images/author/williamshakespeare.jpg',
        imageSource: 'Wikimedia Commons',
        books: [
            'Macbeth',
            'Hamlet',
            'Othello',
            'Romeo and Juliet'
        ]
    },
    {
        name: 'J K Rowling',
        imageUrl: 'images/author/jkrowling.jpg',
        imageSource: 'Wikimedia Commons',
        books: [
            'Harry Potter and the Philosophers Stone',
            'Fantastic Beasts and where to find them',
            'Harry Potter and the Prisoner of Azkaban'
        ]
    },
]

function getTurnData(authors) {
    const allBooks = authors.reduce(function(p, c, i) {
        return p.concat(c.books);
    }, []);
    const fourRandomBooks = shuffle(allBooks).slice(0,4);
    const answer = sample(fourRandomBooks);

    return {
        books: fourRandomBooks,
        author: authors.find((author) => 
            author.books.some((title) => title === answer))
    }

}

function resetState() {
    console.log('in resetState')
    return {
        turnData: getTurnData(authors),
        highlight: ''
    };
}

let state = resetState();
//A reducer function takes a state and applies an action to it
//to create a new state. This is part of the redux concention.
function reducer(state, action) {
    return state;
}

let store = Redux.createStore(reducer)

function onAnswerSelected (answer) {
    console.log(answer);
    const isCorrect = state.turnData.author.books.some((book) => book === answer)
    state.highlight = isCorrect ? 'correct' : 'wrong';
    render();
}


function App() {
    return <AuthorQuiz {...state} 
        onAnswerSelected={onAnswerSelected}
        onContinue={() => {
            console.log('in onContinue')
            state = resetState();
            render();
        }} />;
}

const AuthorWrapper = withRouter(({history}) => 
    <AddAuthorForm onAddAuthor={(author) => {
        console.log('in onaddauthor');
        authors.push(author);
        history.push('/');
    }} />
)

function render() {
    ReactDOM.render(
        <BrowserRouter>
            <Route exact path="/" component={App} />
            <Route exact path="/add" component={AuthorWrapper} />
        </BrowserRouter>, document.getElementById('root'));
}

render();
// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
