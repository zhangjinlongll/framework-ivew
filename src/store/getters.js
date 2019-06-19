const getters = {
    menuList: state => state.menu.menuList,
    leftmenuList: state => state.menu.leftmenuList,
    showSearchAll: state => state.menu.showSearchAll,
    userData: state => state.user.userData,
    buttonStatusList: state => state.user.buttonStatusList,
    userRoleData: state => state.user.userRoleData,
    betaAccountList: state => state.login.betaAccountList
}
export default getters
