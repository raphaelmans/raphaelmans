import myImageSrc from '../../public/assets/images/me.jpeg'

export const MY_IMAGE = myImageSrc

export const API_BASE_URL = process.env.VERCEL_URL
  ? `https://${process.env.VERCEL_URL}`
  : 'http://localhost:3000/rm-api'
