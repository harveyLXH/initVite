import { App } from 'vue'
import registerIcon from './register-icon'
import registerProperties from './register-properties'

export function globalRegister(app: App): void {
  app.use(registerIcon)
  app.use(registerProperties)
}
