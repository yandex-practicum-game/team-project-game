import prisma from '../prisma'
import type { SiteThemes } from '@prisma/client'

export default class SiteThemesService {
  static async create(data: Omit<SiteThemes, 'id'>) {
    const { theme, description } = data

    const siteTheme = await prisma.siteThemes.create({
      data: {
        theme: theme,
        description: description,
      },
    })

    return siteTheme
  }

  static async getAll(take: string, page: string) {
    const skip = (Number(page) - 1) * Number(take)

    const [siteThemes, total] = await Promise.all([
      prisma.siteThemes.findMany({ skip, take: Number(take) }),
      prisma.siteThemes.count(),
    ])

    return [siteThemes, total]
  }

  static async getOne(id: string) {
    const siteTheme = await prisma.siteThemes.findUnique({
      where: {
        id: Number(id),
      },
    })
    return siteTheme
  }

  static async update(id: number, data: Omit<SiteThemes, 'id'>) {
    const siteTheme = await prisma.siteThemes.updateMany({
      where: { id },
      data,
    })
    return siteTheme
  }

  static async delete(id: string) {
    const siteTheme = await prisma.siteThemes.deleteMany({
      where: {
        id: Number(id),
      },
    })
    return siteTheme
  }
}
