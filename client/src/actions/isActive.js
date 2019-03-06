export function isActive(links) {
  return {
    type: 'CHECK_LINKS',
    links,
  };
}
