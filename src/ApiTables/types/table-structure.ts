export type CellType = "text" | "link" | "boolean" | "html" | "datalist" | "image" | "actions";

export interface Col {
    /** Type of the column component */
    type: CellType;
    /** Column label text */
    label: string;
    /** Column name identifier (optional) */
    name: string | null;
    /** Whether column can be sorted */
    sortable: boolean;
    /** Data source key */
    data_src: string;
    /** Whether column can be shown/hidden */
    showable: boolean;
    /** Minimum width of the column */
    minWidth: string;
    /** Style of linked items */
    linkStyle: string;
    /** Color theme for links */
    linkColor: string;
    /** Visibility in mobile app */
    showInMobileApp: boolean;
    /** Conditional loading flag */
    loadIf: boolean;
}


