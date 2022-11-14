import React from 'react'
import styled from 'styled-components'
import '../App.css'

const Container = styled.div`
  background: rgba(0, 0, 0, 0.5);
  color: white;
  padding: 2px 8px;
  margin-top: 2px;
  margin-left: 2px;
`

function Content (props) {
  const { geometry } = props.annotation
  if (!geometry) return null

  return (
    <Container
      style={{
        position: 'absolute',
        left: `${geometry.x}%`,
        top: `${geometry.y}%`,
        ...props.style
      }}
      className={props.className}
      geometry={geometry}
    >
      {props.annotation.data && <>{props.annotation.data.text} <span style={{color: 'darkgrey', fontSize: '13px'}}>({props.annotation.data.counter})</span></> }
    </Container>
  )
}

Content.defaultProps = {
  style: {},
  className: ''
}

export default Content