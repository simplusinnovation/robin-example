# Tutorial

We want to build a small app that's going to allow the user to post some messages on a cache server. (The app is very useless, sorry about that).
The goal of this exercice is to present you the different features offered by robin.

let's start..

## 1 ) What is robin ?

Robin is a microservice interface. It allows a developer to make asynchrounous calls and to listen to events and to read a state  associated to these calls.
It is currently only available for front-end development.

## 2 )  Why should I use robin ?

There are already event based base libraries that maintain a state, a famous one is Redux. The purpose of robin is not to replace those libraries, but to complete them and to make them even easier to use.
Let's take a closer look at how we need to make API call using react and redux.

### Let's create a minimal app without robin

#### First : We need to create a reducer

The reducer contains the logic of how an event (called action) should modify the state

```jsx

/*We need to handle a big set of events*/
export function reducer(state, action) {
    state = state || {}

    switch(action.type) {
        case 'fetched':
         state = Object.assign({}, state, { 
             data : action.data,
             status : 'fetched'
        }) break
        case 'loading':
         state = Object.assign({}, state, { 
             status : 'loading'
        }) break
        case 'error':
         state = Object.assign({}, state, { 
             status : 'error',
             error : action.error
        }) break
    }

    return state
}  
```
On Robin there is also a way to handle states and it works the same way. However robins have already some preset logic and for the case of making requests it's already there 

#### Second : We need to create some actions

Actions are just javascript objects or functions (if you use the thunk middleware)

```jsx
import axios from 'axios'

/*Get method to an api*/
export function get(url) {
    return dispatch => {
        dispatch({ type : 'loading'})

        axios.get(url).then( res => {
            dispatch({ type : 'fetched', data : res.data})
        }).catch( err => {
            dispatch({ type : 'error', error : err })
        })
    }
}

```

A robin has a concept of microservice, in which some actions are defined, and which handles its own state.
A lot of actions are predefined (as the example one)

#### Third : We need to configure the app

With react and redux there is a need to configure the react app by linking everything together

```jsx
import * as React from "react";
import * as ReactDOM from "react-dom";

/*We need to import a bunch of items (this is really the bare minimum and not enough for a big app)*/
import { createStore } from "redux";
import {Provider} from "react-redux";
import thunk from "redux-thunk"

/*We need to import a our reducer*/
import {reducer} from './reducer';

import {MyComponent} from './MyComponent';

/*We need to bind the reducer to a store*/
const store = createStore(reducer)

ReactDOM.render(
    /*We need to bind the store to the app thanks to a provider*/
    <Provider store={store}>
        <MyComponent/>
    </Provider>
    ,document.getElementById('mount'),
    () => {
    }
  );
```

On Robin there is no need to make the link to your app. The link will be made whe you connect to a component

#### Fourth : We need to read the state from our component and trigger some events
The last step consist to finaly use everything that was created

```jsx
import * as React from 'react'

/*We import our actions*/
import {get} from './actions'

/*We need to bind the component to the app state*/
@connect( state => {
    return state
})
export class MyComponent extends React.Component{
    
    componenDidMount(){
        /*We need to use the dispatcher method to trigger an event*/
        this.props.dispatch(get('/api/something'))
    }

    render() {
        if(state.status === 'error')
            return <div>There was an error {state.error}</div>
        if(state.status === 'loading')
            return <div> Loading data ... </div>
        
        return <div>
            {JSON.stringify(state.data)}
        </div>
    }
}
```
On robin you don't bind the compoent to the state, but to a microservice (this causes a bit more refreshes, however this will be optimized later)
you also don't need to know how the state is stored, you just ask for the result that was requested


## 3 ) The concepts of robin

#### A Robin

A robin is a microservice that contains a bunch of methods and that manages its own state, the simpliest robin is the Robin class, its purpose is mainly to make API calls

#### A request key

Robins associate requests to keys, and the Status, Error, and Result can be get for that same key

#### A RobinProvider

The robin provider allows to attach subscribers to the robin library. An example of subscriber is the RobinReact from @simplus/robin-react that attaches Robin to React


## 4 ) Exercice

We have an api that handles Posts,
we want to use all the features offered by that api to make a posting applcation (it's useless, absolutely useless)

#### 1 - Download the exercice
#### 2 - Bind the app to logic 
#### 3 - Make the app refresh itself when creating a new post (use of Collections)
#### 5 - Have different view on the same data (use scopes)
#### 6 - Abstracting the api calls (create your own robin)
