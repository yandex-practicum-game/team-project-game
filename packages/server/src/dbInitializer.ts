import type { Controller } from './types'

export const dbInitializer = async (controller: Controller) => {
  await controller.init()
}
