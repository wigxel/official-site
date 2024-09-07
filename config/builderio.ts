import { builder } from "@builder.io/sdk";
import { safeStr } from "~/utils/data.helper";

builder.init(safeStr(process.env.BUILDER_IO_API_KEY));

export const builderInstance = builder;