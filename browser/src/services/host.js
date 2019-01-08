var host = process.env.REACT_APP_API_HOST || ''
if (host === '') {
  throw Error('env REACT_APP_API_HOST is not set')
}
if (!host.startsWith('http')) {
  throw Error('REACT_APP_API_HOST has wrong value. Should have the follwing form: "http[s]://hostname[:portnum]/" without tailing /')
}
if (host.endsWith('/')) {
  host = host.slice(-1)
}

/* mkLink constructs a proper link for the backend
   @param path represents the REST endpoint.
      The leadin slash will be added if it's not present.
 */
export function mkLink (path: string) {
  if (!path.startsWith('/')) {
    path = '/' + path
  }
  return host + '/v1' + path
}

export function mkPublicLink (path: string) {
  if (!path.startsWith('/')) {
    path = '/' + path
  }
  return host + '/v1/assets/public' + path
}
