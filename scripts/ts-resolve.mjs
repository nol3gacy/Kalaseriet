// Lets plain `node` run the repo's TypeScript, whose imports have no extension (./data/themes).
import { registerHooks } from 'node:module'
registerHooks({
  resolve(specifier, context, next) {
    try { return next(specifier, context) } catch (e) {
      if (specifier.startsWith('.') && !/\.\w+$/.test(specifier)) return next(specifier + '.ts', context)
      throw e
    }
  },
})
