import React from 'react'
import styled from 'styled-components'

const Container = styled.div`
  border: solid 2px red;
  box-shadow: 0px 0px 1px 1px white inset;
  box-sizing: border-box;
  transition: box-shadow 0.21s ease-in-out;
  background-color: rgba(255, 0, 0, 0.3);
  
`

function Rectangle (props) {
  const { geometry } = props.annotation
  if (!geometry) return null

  return (
    <Container
      className={props.className}
      style={{
        position: 'absolute',
        left: `${geometry.x}%`,
        top: `${geometry.y}%`,
        height: `${geometry.height}%`,
        width: `${geometry.width}%`,
        boxShadow: props.active && '0 0 1px 1px blue inset',
        ...props.style
      }}
    />
  )
}

Rectangle.defaultProps = {
  className: '',
  style: {}
}

export default Rectangle