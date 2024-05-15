'use client'

import Error from 'next/error'
import React from 'react'

export const notFoundPage = () => (
  <html lang="en">
    <body>
      <Error statusCode={404} />
    </body>
  </html>
)
export default notFoundPage
