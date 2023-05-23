export enum API_CONFIG {
  BASE_URL = 'https://ya-praktikum.tech/api/v2',
  OAUTH_URL = 'https://ya-praktikum.tech/api/v2/oauth',
  TEAM_NAME = 'team5_quack_attack',

  REDIRECT_URI_PROD = 'https://galaxian-game.vercel.app',
  REDIRECT_URI_DEV = 'http://localhost:3000',

  BASE_URI_PROD = 'https://galaxian-game.vercel.app/api/v2',
  BASE_URI_DEV = 'http://localhost:3000/api/v2',

  RESOURCES_URL_PROD = 'https://galaxian-game.vercel.app/api/v2/resources',
  RESOURCES_URL_DEV = 'http://localhost:3000/api/v2/resources',
}

export const REDIRECT_URI =
  process.env.NODE_ENV === 'production'
    ? API_CONFIG.REDIRECT_URI_PROD
    : API_CONFIG.REDIRECT_URI_DEV

export const BASE_URL =
  process.env.NODE_ENV === 'production'
    ? API_CONFIG.BASE_URI_PROD
    : API_CONFIG.BASE_URI_DEV

export const RESOURCES_URL =
  process.env.NODE_ENV === 'production'
    ? API_CONFIG.RESOURCES_URL_PROD
    : API_CONFIG.RESOURCES_URL_DEV
