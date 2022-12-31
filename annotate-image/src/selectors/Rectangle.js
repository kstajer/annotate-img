import React from 'react'
import styled from 'styled-components'

const Container = styled.div`
  border: solid 2px rgb(160,0,0);
  box-sizing: border-box;
  border-radius:2px;
  transition: background-color 0.21s ease-in-out;
  background-color: rgba(255, 0, 0, 0.2);
  
`

function Rectangle(props) {
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
        backgroundColor: props.active && 'rgba(255, 0, 0, 0.4)',
        boxShadow: props.active && '0 0 1px 1px red inset',
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