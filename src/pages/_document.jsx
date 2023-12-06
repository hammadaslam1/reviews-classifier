import Navbar from '@/components/navbar/Navbar'
import { Card, Typography } from '@mui/material'
import { Html, Head, Main, NextScript } from 'next/document'

export default function Document() {
  return (
    <Html lang="en">
      <Head />
      <body style={{backgroundColor: '#bfbfbf', margin: 0, padding: 0}}>
      <Navbar />
        {/* <Main /> */}
        <NextScript />
      </body>
    </Html>
  )
}
