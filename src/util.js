// Gets the registry to use.
export function registry() { // eslint-disable-line
  return localStorage.registry || 'https://registry.diamondpkg.org';
}
