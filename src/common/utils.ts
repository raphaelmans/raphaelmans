import { Media, User } from '@/payload-types'

function isMedia(val: unknown): val is Media {
  return typeof val === 'object' && val !== null && 'id' in val
}

function isUser(val: unknown): val is User {
  return typeof val === 'object' && val !== null && 'id' in val
}

export const typeGuardUtils = {
  isMedia,
  isUser,
}
