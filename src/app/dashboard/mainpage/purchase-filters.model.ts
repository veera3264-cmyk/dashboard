export interface DateRangeFilter {
  startDate: Date;
  endDate: Date;
}

export interface SearchCriteriaFilters {
  locationId: string | null;
  purchaseDateRange: DateRangeFilter | null;
  invoiceDateRange: DateRangeFilter | null;
}

export type InvoiceFilter = 'with' | 'without' | null;
export type AgingFilter = 'under4' | '4to8' | '8to24' | 'over24' | null;

export interface TableFilters {
  organization: string | null;
  payment: string | null;
  invoice: InvoiceFilter;
  vendor: string;
  aging: AgingFilter;
  possibleDuplicatesOnly: boolean;
}

export const EMPTY_SEARCH_CRITERIA_FILTERS: SearchCriteriaFilters = {
  locationId: null,
  purchaseDateRange: null,
  invoiceDateRange: null
};

export const EMPTY_TABLE_FILTERS: TableFilters = {
  organization: null,
  payment: null,
  invoice: null,
  vendor: '',
  aging: null,
  possibleDuplicatesOnly: false
};
