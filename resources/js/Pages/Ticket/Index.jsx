import Nav from '@/Components/Nav'
import Ticket from '@/Components/Ticket'
import React from 'react'

const Index = ({event}) => {
  return (
    <>
    <Nav />
        <Ticket event={event}/>
        <Ticket />
    </>
  )
}

export default Index