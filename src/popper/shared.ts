import { InjectionKey } from 'vue'
import { Placement } from '@popperjs/core'

export namespace injections {
  export const placement: InjectionKey<Placement> = Symbol('INJECTION_PLACEMENT')
  export const teleport: InjectionKey<string> = Symbol('INJECTION_TELEPORT')
}
