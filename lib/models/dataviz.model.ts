import { assetSchema } from './asset.model'
import { z } from 'zod'

export const datavizSchema = assetSchema.extend({
  data: z.array(z.any()),
})

export type DataViz = z.infer<typeof datavizSchema>
