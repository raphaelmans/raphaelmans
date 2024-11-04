import React, { PropsWithChildren } from 'react'
import NavigationBar from '@/features/navigation/components/navigation-bar'
import NavigationFooter from '@/features/navigation/components/navigation-footer'

const BaseLayout = (props: PropsWithChildren) => {
  return (
    <div className='relative flex min-h-screen flex-col'>
      <div className='absolute left-0 top-0 z-50 mx-auto w-full'>
        <NavigationBar className='w-full' />
      </div>
      {props.children}
      <NavigationFooter />
    </div>
  )
}

export default BaseLayout
