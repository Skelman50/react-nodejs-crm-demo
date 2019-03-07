import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './components/app-components/App';

import {Provider} from 'react-redux';
import {createStore, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import {composeWithDevTools} from 'redux-devtools-extension';
import rootReducer from './reducers/rootReducer'



import '../node_modules/materialize-css/dist/js/materialize'


const store = createStore(
    rootReducer,
    composeWithDevTools(applyMiddleware(thunk)) 
)

ReactDOM.render(
    <Provider store={store}><App /></Provider>, document.getElementById('root'));

