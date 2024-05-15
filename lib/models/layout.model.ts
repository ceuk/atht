import { assetSchema } from './asset.model'

import { z } from 'zod'
import { datavizSchema } from './dataviz.model'

export const layoutSchema = assetSchema.extend({
  visuals: z.array(datavizSchema),
  layoutType: z.string(),
  pageCount: z.number(),
})

export type Layout = z.infer<typeof layoutSchema>
