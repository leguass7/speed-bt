import styled, { keyframes, css } from 'styled-components'

const ripple = keyframes`
  0% {
    transform: scale(1);
    opacity: 1;
  }

  100% {
    transform: scale(2.2);
    opacity: 0;
  }
`

export const Button = styled.button<{
  bgColor: string
  textColor: string
  hoverColor: string
  disabled?: boolean
}>`
  position: relative;
  display: inline-block;
  background-color: ${({ bgColor }) => bgColor};
  color: ${({ textColor }) => textColor};
  padding: ${({ theme }) => `${theme.spacing.m}px ${theme.spacing.xl}px`};
  border: 0;
  font-weight: bold;
  font-size: 20px;
  border-radius: 22px;
  transition: all ease-in-out 0.2s;
  cursor: pointer;
  z-index: 100;
  &:hover {
    background-color: ${({ hoverColor }) => hoverColor};
    &:before {
      ${({ bgColor, disabled }) =>
        disabled
          ? css``
          : css`
              animation: ${ripple} 1.2s infinite ease-in-out;
              box-shadow: 0 0 1px ${bgColor};
              z-index: 1;
            `}
    }
  }
  &:before {
    z-index: 1;
    transition: all ease-in-out 0.2s;
    content: '';
    position: absolute;
    border-radius: 22px;
    width: 99%;
    height: 99%;
    border: 0;
    top: 0;
    left: 0;
  }

  ${({ disabled }) =>
    disabled
      ? css`
          filter: grayscale(100%);
          box-shadow: inset 1px 1px 2px rgba(0, 0, 0, 0.5);
          opacity: 0.1;
        `
      : null}
  span {
    display: flex;
    justify-content: space-between;
    align-items: center;
    align-content: center;
    gap: ${({ theme }) => theme.spacing.l}px;
    min-height: 28px;
  }

  @media (max-width: 380px) {
    font-size: 16px;
  }

  @media (max-width: 360px) {
    font-size: 14px;
  }
`
