import { Card, Typography } from '@mui/material'
import React from 'react'

function Navbar() {
  return (
    <Card elevation={5} sx={{textAlign: 'center'}} >
    <Typography variant='h2' color={'error'}>Reviews Classifier</Typography>
  </Card>
  )
}

export default Navbar