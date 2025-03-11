"use client"
import React from 'react'
import dynamic from 'next/dynamic'
 
const NoSSR = dynamic(() => import('./Navbar'), { ssr: false })
function NavbarNoSSr() {
  return (
    <div>
      <NoSSR></NoSSR>
    </div>
  )
}

export default NavbarNoSSr
