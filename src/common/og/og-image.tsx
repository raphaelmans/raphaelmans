import { ImageResponse } from 'next/og'

export const alt = 'Raphael Mansueto - Full-Stack Developer'
export const size = {
  width: 1200,
  height: 630,
}

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
          backgroundColor: '#0f172a',
          backgroundImage:
            'radial-gradient(circle at 25px 25px, #334155 2%, transparent 0%), radial-gradient(circle at 75px 75px, #334155 2%, transparent 0%)',
          backgroundSize: '100px 100px',
          fontFamily: 'Inter',
        }}
      >
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '40px',
          }}
        >
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              border: '4px solid #60a5fa',
              borderRadius: '50%',
              width: '220px',
              height: '220px',
              overflow: 'hidden',
              boxShadow: '0 0 40px rgba(96, 165, 250, 0.3)',
            }}
          >
            <svg width='160' height='130' viewBox='0 0 53 43' xmlns='http://www.w3.org/2000/svg'>
              <g id='fontsvg1729197623975' strokeLinecap='round' fillRule='evenodd' fill='#60a5fa'>
                <path
                  d='M 30.444 42.969 L 24.658 42.969 L 24.658 0 L 32.788 0 L 38.892 31.397 L 44.629 0 L 52.808 0 L 52.808 42.969 L 46.973 42.969 L 46.973 26.953 L 47.217 12.256 L 41.431 42.774 L 36.23 42.774 L 30.2 12.256 L 30.444 26.953 L 30.444 42.969 Z M 8.643 22.778 L 6.543 22.681 L 6.543 42.969 L 0 42.969 L 0 0 L 10.815 0 Q 12.822 0 14.223 0.481 A 5.215 5.215 0 0 1 15.845 1.355 A 6.055 6.055 0 0 1 17.671 3.925 A 8.17 8.17 0 0 1 18.03 5.139 Q 18.555 7.569 18.555 11.487 A 30.061 30.061 0 0 1 18.489 13.543 Q 18.321 15.982 17.725 17.456 Q 16.895 19.507 14.648 20.215 Q 16.87 20.606 17.749 23.218 Q 18.517 25.501 18.614 32.099 A 136.093 136.093 0 0 1 18.628 34.094 A 467.394 467.394 0 0 0 18.632 36.041 Q 18.658 42.435 18.872 42.969 L 12.329 42.969 A 1.389 1.389 0 0 1 12.272 42.621 Q 12.085 40.616 12.085 27.564 A 18.67 18.67 0 0 0 12.047 26.33 Q 11.926 24.513 11.416 23.788 A 1.634 1.634 0 0 0 11.401 23.767 Q 10.718 22.827 8.643 22.778 Z M 6.567 5.029 L 6.567 17.603 L 9.18 17.603 A 4.388 4.388 0 0 0 9.854 17.554 Q 10.204 17.5 10.482 17.384 A 1.782 1.782 0 0 0 11.023 17.041 A 2.021 2.021 0 0 0 11.406 16.534 Q 11.675 16.043 11.822 15.284 A 7.372 7.372 0 0 0 11.853 15.112 Q 12.033 14.052 12.073 12.126 A 56.846 56.846 0 0 0 12.085 10.938 L 12.085 10.669 A 32.819 32.819 0 0 0 12.057 9.257 Q 11.957 6.943 11.499 6.104 Q 10.913 5.029 8.789 5.029 L 6.567 5.029 Z'
                  vectorEffect='non-scaling-stroke'
                />
              </g>
            </svg>
          </div>
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              padding: '20px 40px',
              borderRadius: '20px',
              backgroundColor: 'rgba(30, 41, 59, 0.7)',
              boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
            }}
          >
            <h1
              style={{
                fontSize: 64,
                fontWeight: 'bold',
                color: '#ffffff',
                textAlign: 'center',
                margin: 0,
                textShadow: '2px 2px 4px rgba(0, 0, 0, 0.3)',
              }}
            >
              Raphael Mansueto
            </h1>
            <h2
              style={{
                fontSize: 36,
                color: '#60a5fa',
                marginTop: 10,
                textAlign: 'center',
                fontWeight: 'normal',
              }}
            >
              Full-Stack Developer
            </h2>
          </div>
          <p
            style={{
              fontSize: 24,
              color: '#e2e8f0',
              maxWidth: '80%',
              textAlign: 'center',
              lineHeight: 1.4,
            }}
          >
            Intelligence-driven, creating reliable solutions focused on scalability and exceptional
            quality.
          </p>
        </div>
      </div>
    ),
    {
      ...size,
    },
  )
}
