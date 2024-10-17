import React, { PropsWithChildren } from 'react'
import BaseLayout from '@/common/layouts/base-layout'

const LandingPageLayout = (props: PropsWithChildren) => {
  return <BaseLayout>{props.children}</BaseLayout>
}

export default LandingPageLayout
