import { z } from "zod";

const portfolioSchema = z.object({
  title: z.string(),
  imageUrl: z.string(),
});
