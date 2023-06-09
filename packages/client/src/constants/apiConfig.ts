export enum API_CONFIG {
  TEAM_NAME = 'team5_quack_attack',

  REDIRECT_URI_PROD = 'https://thequackattack-galaxiangame-24.ya-praktikum.tech',
  REDIRECT_URI_DEV = 'http://localhost:3000',

  OAUTH_URL_PROD = 'https://thequackattack-galaxiangame-24.ya-praktikum.tech/api/v2/oauth',
  OAUTH_URL_DEV = 'http://localhost:3000/api/v2/oauth',

  BASE_URI_PROD = 'https://thequackattack-galaxiangame-24.ya-praktikum.tech/api/v2',
  BASE_URI_DEV = 'http://localhost:3000/api/v2',

  BASE_URI_PROD_V1 = 'https://thequackattack-galaxiangame-24.ya-praktikum.tech/api/v1',
  BASE_URI_DEV_V1 = 'http://localhost:3000/api/v1',

  RESOURCES_URL_PROD = 'https://thequackattack-galaxiangame-24.ya-praktikum.tech/api/v2/resources',
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

export const OAUTH_URL =
  process.env.NODE_ENV === 'production'
    ? API_CONFIG.OAUTH_URL_PROD
    : API_CONFIG.OAUTH_URL_DEV

export const BASE_URL_V1 =
  process.env.NODE_ENV === 'production'
    ? API_CONFIG.BASE_URI_PROD_V1
    : API_CONFIG.BASE_URI_DEV_V1
