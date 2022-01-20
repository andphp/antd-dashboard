import Storage from './Storage'

export const Logged = () => {
  return Storage.get('accessToken') !== null ?? false
}
