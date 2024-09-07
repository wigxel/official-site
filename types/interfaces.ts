import { z } from "zod";

export interface ProductItemBase {
  id: string;
  name: string;
  designYear: string;
  productCatalogueUrl: string;
  categoryId: string;
  dimensions: Dimension[];
  materials: Material[];
  price: number;
  assetUrlAndColor: AssetUrlAndColor[];
  deletedAt: unknown;
  isPublished: boolean;
  createdAt: string;
  updatedAt: string;
  category: Category;
}

export interface Dimension {
  key: string;
  value: number;
}

export interface Material {
  key: string;
  value: string;
}

export const AssetUrlAndColorSchema = z.object({
  url: z.array(z.object({ image: z.string() })),
  color: z.string(),
  price: z.number(),
  texture: z
    .object({
      url: z.string(),
      name: z.string().optional(),
      code: z.string(),
    })
    .optional(),
});

export type AssetUrlAndColor = z.infer<typeof AssetUrlAndColorSchema>;

export interface Category {
    id: string;
    name: string;
  }