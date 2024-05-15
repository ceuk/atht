import { z } from 'zod'

const ISO_DATE_REGEX = /\d{4}-[01]\d-[0-3]\d/

/**
 * Asset category == how the assets is grouped
 * Asset type     == the assets subtype
 */
export enum AssetCategory {
  featured = 'Featured',
  kpi = 'KPI',
  layouts = 'Layouts',
  storyboards = 'Storyboards',
}

export enum AssetType {
  KPI = 'kpi',
  Layout = 'layout',
  DataViz = 'data-viz',
  Storyboard = 'storyboard',
}

export const assetSchema = z.object({
  id: z.string(),
  name: z.string(),
  description: z.string(),
  tags: z.string().array(),
  usageCount: z.number(),
  modified: z
    .string()
    .regex(ISO_DATE_REGEX, 'date must be a valid ISO date')
    .optional(),
  type: z.nativeEnum(AssetType),
  isFeatured: z.boolean(),
  isTrending: z.boolean(),
})

export type Asset = z.infer<typeof assetSchema>
