'use client'

import { useEffect, useState } from 'react'

import { Application } from '@/app/admin/components'

export default () => {
  const [isClient, setIsClient] = useState<boolean>(false)

  useEffect(() => {
    console.log('effect')
    setIsClient(true)
  }, [])

  console.log('admin page', isClient)

  if (!isClient) {
    return <div>{`isClient: ${isClient}`}</div>
  }

  return <Application />
}
