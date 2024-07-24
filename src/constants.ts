// constants.ts

export const FILTERS = {
  ALL: 'all',
  POSITIVE: 'positive',
  NEGATIVE: 'negative',
} as const;

export const SORT_METHODS = {
  DATE: 'date',
  MOST_POSITIVE: 'most_positive',
  MOST_NEGATIVE: 'most_negative',
  ALPHABETICAL: 'alphabetical',
} as const;

export const ITEMS_PER_PAGE_OPTIONS = [10, 25, 50, 100] as const;

export const DEFAULT_FILTER = FILTERS.POSITIVE;
export const DEFAULT_SORT_METHOD = SORT_METHODS.DATE;
export const DEFAULT_ITEMS_PER_PAGE = 50;

export const LOCAL_STORAGE_KEYS = {
  NEWS_FILTER: 'newsFilter',
  NEWS_SORT_METHOD: 'newsSortMethod',
} as const;