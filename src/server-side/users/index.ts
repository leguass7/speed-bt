import { factoryUserController } from './user.controller'
import { UserService } from './user.service'

export type { IUserService } from './user.service'

export * from './user.dto'

// export const userController = factoryUserController(UserService)
export { updateMeSchema } from './user.validation'
export { factoryUserController, UserService }
