import React from 'react'
import ReactDOM from 'react-dom'
import { Provider, connect } from 'react-redux'
import { createStore } from 'redux'
import { List, Map } from 'immutable'
import SearchContainer from './components/search'
import GistPreviewContainer from './components/gistPreview'


const App = React.createClass({
  render() {
    return <div>
      <SearchContainer />
      <hr />
      <GistPreviewContainer />
    </div>
  }
})

function query(query, action) {
  switch (action.type) {
    case 'UPDATE_QUERY':
      return action.query
    default:
      return query
  }  
}

function activeGist(activeGist, action) {
  switch (action.type) {
    case 'SELECT_GIST':
      return action.activeGist
    default:
      return activeGist
  }
}

let stateTree = Map({ 
  gists: List(['ruby','javascript','java','c++','haskell','golang']), 
  query: '' 
})

const store = createStore(function(state = stateTree, action) {
  return Map({
    query: query(state.get('query'), action),
    gists: state.get('gists'),
    activeGist: activeGist(state.get('activeGist'), action)
  })
})

const rootElem = document.getElementById('root') 
ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  rootElem
)
