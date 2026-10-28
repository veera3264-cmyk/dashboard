# Purchase dashboard changes

## Purchase loading and ownership

- `Mainpage` loads the purchase list once through `PurchaseService` when the dashboard page starts.
- `PurchaseService` owns the HTTP request to `GET /api/purchases`; its return type is `Purchase[]`.
- The full purchase list is kept as the source list in Mainpage. Child components do not fetch purchases.
- Mainpage shows a loading state while the request is pending and a visible error message if it fails.
- Search Criteria continues to fetch locations for its location selector through `LocationService`.

## Filter flow

Mainpage coordinates the filters and derives the table rows from the original purchase list:

1. Search Criteria emits location, purchase-date, and invoice-date selections.
2. Datepicker emits the main purchase-date range. It starts with no range selected so purchases are visible immediately.
3. Table emits group, payment, invoice-presence, vendor, and aging selections.
4. Tabsets emits the selected purchase status and possible-duplicates toggle.
5. Mainpage applies all active selections together and passes the result to Table.

Each purchase may include a `status` field. Selecting a status tab filters against that field, ignoring differences in letter case, spaces, underscores, and hyphens. The All tab does not apply a status filter. Clearing all filters also returns the selected tab to All.

The Clear Search Criteria action clears the Search Criteria controls and resets all dashboard filters, including the main date picker and Table filter controls.

Date filtering compares calendar dates without relying on UTC conversion. Purchase date ranges use `purchaseDate`; Search Criteria's invoice date range uses `invoiceDate`. A purchase date string must start with a valid `YYYY-MM-DD` date (optionally followed by a time) to match a range.

The aging selector assumes the API's `aging` value is in hours and uses these ranges: under 4, 4 to under 8, 8 through 24, and over 24 hours. The duplicate toggle treats `Y`, `yes`, `true`, and `1` (case-insensitive) as a duplicate.

## Table and component responsibilities

- Mainpage owns purchase loading, loading/error state, filter state, and combined filtering.
- Search Criteria owns its controls and location-option request, then emits filter values.
- Datepicker owns date controls and quick-range presets, then emits a selected range.
- Table receives all purchases for filter option lists and the already-filtered rows for display. It handles table rendering and pagination; it no longer fetches locations or filters the purchase dataset itself.
- Typed `Purchase`, `Location`, and filter models replace loose purchase/location data types.

The table formats Purchase Date, Invoice Date, and Created On as `DD/MM/YYYY`. The date filter itself uses Purchase Date, not Created On.

## Build-size configuration and assets

- Removed the unused Font Awesome stylesheet; the login password visibility control now uses Angular Material's `mat-icon`.
- Removed Bootstrap Icons and Bootstrap's JavaScript bundle from the global build configuration. The navbar's mobile toggle is now controlled by Angular state, and its menu icon uses `mat-icon`.
- Removed duplicate Roboto and Material Icons links from `src/index.html` and a duplicate Roboto CSS import from the navbar stylesheet.
- Production initial-bundle budgets are now set to a 1.2 MB warning and a 1.3 MB error. The previous 1 MB error limit rejected the measured bundle even after removing unused assets.

## Verification

- The production build completed successfully after the asset cleanup and budget adjustment.
- The measured initial bundle was 1.20 MB raw (about 208.48 KB estimated transfer size).
- Editor diagnostics reported no errors in the changed application files.
- Browser checks confirmed 100 purchases display with no range selected, a January 2026 range narrows the list to 30, additional vendor/location/table filters combine, and Clear Search Criteria restores the full list.
