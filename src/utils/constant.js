
const pageSize = 10
const qiniuHost = 'http://p3npuv0x6.bkt.clouddn.com/'

export function getPageSize() {
  return pageSize
}

export function getQiniuHost() {
  return qiniuHost
}

export function closeNowTag() {
  this.$store.dispatch('delVisitedViews', {
    path: this.$route.path
  }).then((views) => {
  })
}
