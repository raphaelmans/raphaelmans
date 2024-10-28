import { NextRequest, NextResponse } from 'next/server'
import { getPayload } from 'payload'
import configPromise from '@payload-config'

export const GET = async (
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) => {
  const payload = await getPayload({
    config: configPromise,
  })

  const { id } = await params

  const blog = await payload.find({
    collection: 'blog',
    where: {
      id: { equals: id },
    },
  })
  return NextResponse.json({ data: blog })
}
