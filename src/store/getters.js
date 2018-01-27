const getters = {
  sidebar: state => state.app.sidebar,
  language: state => state.app.language,
  visitedViews: state => state.tagsView.visitedViews,
  cachedViews: state => state.tagsView.cachedViews,
  token: state => state.home.token,
  avatar: state => state.home.avatar,
  name: state => state.home.name,
  username: state => state.home.username,
  user_menus: state => state.home.menus,
  elements: state => state.home.elements,
  errorLogs: state => state.errorLog.logs
}
export default getters
