import React, { PropTypes } from 'react'
import { connect } from 'react-redux'

const ResultItem = ({gist, onClick}) => {
  return <div onClick={() => { onClick(gist) }}>{gist}</div>
}

const Search = React.createClass({
  propTypes: {
    gists: PropTypes.object
  },

  handleChange(event) {
    this.props.onQueryChange(event.target.value)
  },

  handleKeyDown(event) {
    console.log(event.which)
  },

  render() {
    let { gists, onResultItemClick } = this.props
    return <div>
      <input onChange={this.handleChange} onKeyDown={this.handleKeyDown} autoFocus />
      {gists.map((gist, index) => {
        return <ResultItem gist={gist} key={index} onClick={onResultItemClick} />
      })}
    </div>
  }
})

function mapState(state) {
  return {
    gists: state.get('gists')
      .filter(gist => gist.toLowerCase().indexOf(state.get('query')) > -1)
  }
}

function mapDispatch(dispatch) {
  return {
    onQueryChange: (query) => dispatch({ type: 'UPDATE_QUERY', query }),
    onResultItemClick: (activeGist) => dispatch({ type: 'SELECT_GIST', activeGist })
  }
}

export default connect(mapState, mapDispatch)(Search)
