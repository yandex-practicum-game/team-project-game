import type { Controller } from './interfaces/controller'

export const dbInitializer = async (controller: Controller) => {
  await controller.init()
}
