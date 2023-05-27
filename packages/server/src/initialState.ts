import SiteThemesController from './modules/siteThemes/site-themes.controller'

const setInitialState = async () => {
  try {
    await SiteThemesController.createInitial()
    console.log('➜ 🎸 Initial themes is set')
  } catch (error) {
    console.error('[Error] setInitialState: ', error)
  }

  return null
}

export default setInitialState
