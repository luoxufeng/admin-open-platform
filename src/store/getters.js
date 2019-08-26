const getters = {
  user: state => state.user,
  displayName: (state, getters) => getters.user.displayName || ''
}
export default getters
