import React from 'react'
import { connect } from 'react-redux'


const GistPreview = ({gist}) => {
  return <div>
    <h1>{gist}</h1>
    <p>yo yo gist</p>
  </div>
}

function mapState(state) {
  return {
    gist: state.get('activeGist')
  }
}

export default connect(mapState)(GistPreview);

