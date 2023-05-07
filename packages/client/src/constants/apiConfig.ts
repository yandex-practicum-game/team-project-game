export enum API_CONFIG {
  BASE_URL = 'https://ya-praktikum.tech/api/v2',
  RESOURCES_URL = 'https://ya-praktikum.tech/api/v2/resources',
  OAUTH_URL = 'https://ya-praktikum.tech/api/v2/oauth',
  TEAM_NAME = 'team5_quack_attack',
  REDIRECT_URI_PROD = 'https://galaxian-game.vercel.app',
  REDIRECT_URI_DEV = 'http://localhost:3000',
}

export const REDIRECT_URI =
  process.env.NODE_ENV === 'production'
    ? API_CONFIG.REDIRECT_URI_PROD
    : API_CONFIG.REDIRECT_URI_DEV
