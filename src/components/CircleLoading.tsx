import React, { useRef, useEffect } from 'react'

import styled, { keyframes } from 'styled-components'

type CircleLoadingProps = {
  size?: number
  color?: string
  hidden?: boolean
  speed?: number
  stroke?: number
  backgroundColor?: string
  parentRelativate?: boolean
  light?: boolean
  relative?: boolean
  text?: string
  minheight?: number
}

export const CircleLoading: React.FC<CircleLoadingProps> = ({
  size = 32,
  color = '#000',
  hidden,
  speed = 300,
  stroke = 3,
  backgroundColor = 'rgba(0,0,0,0.5)',
  parentRelativate,
  light,
  relative,
  text,
  minheight
}) => {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (ref && ref.current && !hidden) {
      if (parentRelativate) {
        const parent = ref?.current?.parentElement
        if (parent) parent.style.position = 'relative'
      }
    }
  }, [hidden, parentRelativate])

  return (
    <LoadContainer
      ref={ref}
      size={size}
      bColor={color}
      speed={speed}
      stroke={stroke}
      bgColor={light ? 'rgba(255,255,255,0.5)' : backgroundColor}
      relative={relative}
      minheight={minheight}
    >
      <div className="loadContent">
        <div />
      </div>
      {text ? <p>{text}</p> : null}
    </LoadContainer>
  )
}

const rotate = keyframes`
  from {
    transform: rotate(0deg)
  }
  to {
    transform: rotate(360deg)
  }
`

const LoadContainer = styled.div<{
  bgColor: string
  stroke: number
  bColor: string
  speed: number
  size: number
  relative?: boolean
  minheight?: number
}>`
  position: ${({ relative }) => (relative ? 'relative' : 'absolute')};
  margin: 0 auto;
  top: 0;
  left: 0;
  background-color: ${({ bgColor }) => bgColor};
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  align-content: center;
  width: 100%;
  height: 100%;
  min-height: ${({ minheight }) => (minheight ? `${minheight}px` : '100%')};
  p {
    font-size: 12px;
  }
  div.loadContent {
    display: flex;
    flex-flow: row nowrap;
    justify-content: center;
    align-items: center;
    align-content: center;
    div {
      display: block;
      border-radius: 50%;
      border: ${({ stroke }) => stroke}px solid #f1f1f1;
      border-top-color: ${({ bColor }) => bColor};
      animation: ${rotate} 200ms linear infinite;
      animation-duration: ${({ speed }) => `${speed}ms`};
      width: ${({ size }) => `${size}px`};
      height: ${({ size }) => `${size}px`};
    }
  }
`
