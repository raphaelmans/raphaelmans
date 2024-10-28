import { NextResponse } from 'next/server'
import { getPayload } from 'payload'
import { APIBaseResponse } from '@/lib/schemas'
import configPromise from '@/payload.config'

export async function GET() {
  const payload = await getPayload({
    config: configPromise,
  })
  const blogs = await payload.find({
    collection: 'blog',
  })

  const res: APIBaseResponse<typeof blogs> = {
    data: blogs,
  }

  return NextResponse.json(res)
}
