import React from 'react'

function Button(props) {
  return (
    <div>
      <button disabled={props.dis} onClick={props.handler} className={props.color}>{props.name}</button>
    </div>
  )
}

export default Button