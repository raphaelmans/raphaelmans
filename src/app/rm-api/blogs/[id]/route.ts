import { NextRequest, NextResponse } from 'next/server'
import { getPayload } from 'payload'
import configPromise from '@payload-config'

export const GET = async (_request: NextRequest, { params }: { params: { id: string } }) => {
  const payload = await getPayload({
    config: configPromise,
  })
  const blog = await payload.find({
    collection: 'blog',
    where: {
      id: { equals: params.id },
    },
  })
  return NextResponse.json({ data: blog })
}
