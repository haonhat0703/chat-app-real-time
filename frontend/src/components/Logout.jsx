import React from 'react'
import styled from "styled-components"
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { BiPowerOff } from 'react-icons/bi'

const Logout = () => {

  const navigate = useNavigate()
  const handleClick = async () => {
    await localStorage.clear()
    navigate('/login')
  }

  return (
    <Button onClick={handleClick}>
      <BiPowerOff />
    </Button>
  )
}

const Button = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0.5rem;
  border-radius: 0.5rem;
  background-color: #de52e8;
  border: none;
  cursor: pointer;
  svg{
    font-size: 1.3rem;
    color: #ebe7ff;
  }
  &:hover{
    svg{
      color: #000;
    }
  }
`

export default Logout