import prisma from '../../prisma'

export default class SiteThemesService {
  static async create() {
    const count = await prisma.siteThemes.count()

    // если нет тем, то создаем начальный набор тем
    if (count === 0) {
      await prisma.siteThemes.createMany({
        data: [
          {
            theme: 'light',
            description: 'classic light',
          },
          {
            theme: 'dark',
            description: 'classic dark',
          },
        ],
      })
    }
  }

  static async getAll() {
    const [siteThemes, total] = await Promise.all([
      prisma.siteThemes.findMany(),
      prisma.siteThemes.count(),
    ])

    return [siteThemes, total]
  }
}
