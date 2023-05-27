import SiteThemesController from './modules/siteThemes/site-themes.controller'

const setDBInitialState = async () => {
  await SiteThemesController.createInitial()
}

export default setDBInitialState
