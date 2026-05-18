import type { Dictionary } from "@/src/i18n/get-dictionary";

/** Keys of `dict.servicePages` that target a category (excludes `common`). */
export type ServicePageKey = Exclude<
  keyof Dictionary["servicePages"],
  "common"
>;

/**
 * Per-category content slice in the dictionaries.
 * Lives under `dict.servicePages.<categoryId>`.
 */
export type ServicePageContent = Dictionary["servicePages"][ServicePageKey];

/** Shared labels reused across every service page. */
export type ServicePageCommon = Dictionary["servicePages"]["common"];

/** True when the given id has a content slice in the dictionaries. */
export function isServicePageKey(
  dict: Dictionary,
  id: string,
): id is ServicePageKey {
  return id in dict.servicePages && id !== "common";
}
