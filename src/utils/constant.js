
const pageSize = 2

export function getPageSize() {
  return pageSize
}
export function closeNowTag() {
  this.$store.dispatch('delVisitedViews', {
    path: this.$route.path
  }).then((views) => {
  })
}
