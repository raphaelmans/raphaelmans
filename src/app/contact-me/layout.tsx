import React, { PropsWithChildren } from 'react'
import BaseLayout from '@/common/layouts/base-layout'

const ContactMeLayout = (props: PropsWithChildren) => {
  return <BaseLayout>{props.children}</BaseLayout>
}

export default ContactMeLayout
