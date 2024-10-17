import { ImageResponse } from 'next/og'

export const runtime = 'edge'

export const alt = 'Raphael Mansueto - Full-Stack Developer'
export const size = {
  width: 1200,
  height: 630,
}

export const contentType = 'image/png'

export default async function OgImage() {
  return new ImageResponse(
    (
      <div
        style={{
          height: '100%',
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: '#1f2937',
          fontFamily: 'Inter',
        }}
      >
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            border: '4px solid #60a5fa',
            borderRadius: '50%',
            width: '160px',
            height: '160px',
          }}
        >
          <svg
            xmlns='http://www.w3.org/2000/svg'
            viewBox='0 0 24 24'
            fill='#60a5fa'
            width='100'
            height='100'
          >
            <path d='M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-1-13h2v6h-2zm0 8h2v2h-2z' />
          </svg>
        </div>
        <h1
          style={{
            fontSize: 64,
            fontWeight: 'bold',
            color: '#ffffff',
            marginTop: 40,
            textAlign: 'center',
          }}
        >
          Raphael Mansueto
        </h1>
        <h2
          style={{
            fontSize: 36,
            color: '#60a5fa',
            marginTop: 20,
            textAlign: 'center',
          }}
        >
          Full-Stack Developer
        </h2>
        <p
          style={{
            fontSize: 24,
            color: '#9ca3af',
            marginTop: 20,
            maxWidth: '80%',
            textAlign: 'center',
          }}
        >
          Building innovative, scalable solutions that enhance digital experiences and drive growth
        </p>
      </div>
    ),
    {
      ...size,
    },
  )
}
