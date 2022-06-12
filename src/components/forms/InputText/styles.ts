import InputMask from 'react-input-mask'

import styled, { keyframes, css } from 'styled-components'

import { brighten } from '~/helpers/colors'

const ripple = keyframes`
  0% {
    transform: scale(0.9);
    opacity: 1;
  }

  100% {
    transform: scale(2.8);
    opacity: 0;
  }
`

const commonLabelCss = css`
  content: '';
  position: absolute;
  border-radius: 50%;
  width: 10px;
  height: 10px;
  left: 0;
  transform: translateY(-50%);
  transition: all ease-in-out 0.2s;
`
export const InputFeedback = styled.span`
  display: inline-block;
  height: 1px;
  font-size: 12px;
  transform: translateY(-10px);
`

export const Label = styled.label<{ actived?: boolean }>`
  position: relative;
  display: inline-block;
  width: 100%;
  max-width: 100%;
  border: 0;
  border-radius: 16px;
  padding-left: 16px;
  padding-right: 16px;
  margin-bottom: ${({ theme }) => theme.spacing.s}px;
  text-transform: uppercase;
  transition: all ease-in-out 0.2s;
  &:before {
    top: 50%;
    background-color: ${({ theme }) => theme.colors.text};
    ${commonLabelCss};
  }

  &:after {
    top: 5px;
    ${commonLabelCss};
    ${({ actived }) =>
      actived
        ? css`
            animation: ${ripple} 1.2s infinite ease-in-out;
            box-shadow: 0 0 1px ${({ theme }) => theme.colors.text};
          `
        : css``}
  }
`

const commonInputCss = css`
  position: relative;
  display: block;
  width: 100%;
  max-width: 100%;
  font-family: Gilroy, Georgia, 'Times New Roman', Times, serif;
  border-radius: 19px;
  min-height: 38px;
  outline: none;
  font-size: 18px;
  padding-left: 16px;
  padding-right: 16px;
  transition: all ease-in-out 0.2s;
  margin: 0;
`

export const Field = styled(InputMask)`
  ${commonInputCss}
  background-color: ${({ theme }) => theme.colors.text};
  border: 1px solid ${({ theme }) => theme.colors.text};
  color: ${({ theme }) => theme.colors.white};
`

export const Input = styled.input`
  ${commonInputCss}
  text-shadow: 0 0 1px #000;
  background-color: ${({ theme }) => theme.colors.text};
  border: 1px solid ${({ theme }) => theme.colors.text};
  color: ${({ theme }) => theme.colors.white};
`

export const Container = styled.div<{ labelColor: string; disabled?: boolean; hasError?: boolean }>`
  display: flex;
  flex-direction: column;
  flex-wrap: nowrap;
  justify-content: flex-start;
  width: 100%;
  height: 100%;
  padding: 0 ${({ theme }) => theme.spacing.l}px;
  margin-bottom: ${({ theme }) => theme.spacing.l}px;

  ${InputFeedback} {
    order: 2;
  }

  ${Label} {
    order: 0;
    color: ${({ labelColor, disabled, theme }) => (disabled ? theme.colors.text : labelColor)};
    cursor: ${({ disabled }) => (disabled ? 'default' : 'pointer')};
  }
  ${Label}:before {
    background-color: ${({ theme }) => theme.colors.text};
  }

  ${Input}, ${Field} {
    order: 1;
    box-shadow: ${({ disabled }) => (disabled ? `inset 0px 0px 4px rgba(0, 0, 0, 0.7)` : 'none')};
    ${({ hasError }) =>
      hasError
        ? css`
            border-color: ${({ theme }) => theme.colors.errors};
          `
        : css``}
  }

  ${Input}:focus, ${Field}:focus {
    box-shadow: 0 0 1px ${({ labelColor }) => brighten(labelColor, 1)};
    border-color: ${({ labelColor }) => labelColor};
  }

  ${Input}:focus + ${Label}, ${Field}:focus + ${Label} {
    color: ${({ labelColor }) => brighten(labelColor, 1)};
  }

  ${Input}:focus + ${Label}:before, ${Field}:focus + ${Label}:before {
    background-color: ${({ labelColor }) => labelColor};
  }

  ${Input}:focus + ${Label}:after, ${Field}:focus + ${Label}:after {
    animation: ${ripple} 1.2s infinite ease-in-out;
    box-shadow: 0 0 1px ${({ labelColor }) => labelColor};
  }
`
