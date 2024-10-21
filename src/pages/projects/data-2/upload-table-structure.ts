const uploadTableStructure = {
    "table_test": {
        "tableName": "table_test",
        "columns": [
            {
                "type": "text",
                "label": "Id",
                "name": null,
                "sortable": true,
                "data_src": "id",
                "showable": false,
                "minWidth": "50px",
                "showInMobileApp": false,
                "loadIf": true
            },
            {
                "type": "text",
                "label": "Creation Date",
                "name": null,
                "sortable": true,
                "data_src": "created_date",
                "showable": true,
                "minWidth": "50px",
                "showInMobileApp": true,
                "loadIf": true
            },
            {
                "type": "text",
                "label": "Shipping Company",
                "name": null,
                "sortable": false,
                "data_src": "shipping_company",
                "showable": true,
                "minWidth": "50px",
                "showInMobileApp": true,
                "loadIf": true
            },
            {
                "type": "link",
                "label": "Tracking Number",
                "name": null,
                "sortable": false,
                "data_src": "tracking_number",
                "showable": true,
                "minWidth": "80px",
                "linkStyle": "text",
                "linkColor": "primary",
                "showInMobileApp": true,
                "loadIf": true,
                "showCopyBtn": false,
                "linkText": "رقم التتبع"
            },
            {
                "type": "boolean",
                "label": "tables.shipping_awbs.cod_withdrawal_allowed",
                "name": null,
                "sortable": true,
                "data_src": "cod_withdrawal_allowed",
                "loadIf": true,
                "minWidth": "50px",
                "showable": false,
                "showInMobileApp": false,
                "values_formating": {
                    "falseBool": "danger",
                    "trueBool": "success",
                    "falseLabel": "لا",
                    "trueLabel": "نعم"
                }
            },
            {
                "type": "actions",
                "label": "Actions",
                "name": null,
                "sortable": false,
                "data_src": "NA",
                "minWidth": "200px",
                "showable": true,
                "showInMobileApp": true,
                "loadIf": true
            }
        ],
        "filters": [
            {
                "type": "date",
                "filter_name": "created_from_to",
                "label": "Creation Date From/to",
                "loadIf": true,
                "min": 1664312400000,
                "max": 1721854799000,
                "group_src": "created_at",
                "props": {
                    "is_from": true,
                    "operators": [
                        ">="
                    ]
                },
                "pair_with": "created_at_to"
            },
            {
                "type": "date",
                "filter_name": "created_at_to",
                "label": "Creation Date From/to",
                "loadIf": true,
                "min": 1664312400000,
                "max": 1721854799000,
                "group_src": "created_at",
                "props": {
                    "is_from": false,
                    "operators": [
                        "<="
                    ]
                }
            },
            {
                "type": "select",
                "filter_name": "shipping_company",
                "label": "Shipping Company",
                "loadIf": true,
                "props": {
                    "select_options": {
                        "all": "الكل",
                        "smsa_salla": null,
                        "smsa_cold": null,
                        "adwar_cold": null,
                        "JT_Express": null,
                        "aymakan": "AyMakan",
                        "bolesa": "Bolesa",
                        "third_mile": "Third Mile",
                        "smsa": "SMSA",
                        "jt_express": "J&T Express",
                        "tabex": "Tabex",
                        "kwickbox": "Kwickbox",
                        "aramex": "Aramex",
                        "adwar": "Adwar"
                    },
                    "operators": [
                        "="
                    ]
                }
            },
            {
                "type": "number",
                "filter_name": "id",
                "label": "Id",
                "loadIf": true,
                "props": {
                    "operators": [
                        "=",
                        "<=",
                        ">="
                    ]
                }
            },
            {
                "type": "text",
                "filter_name": "user__email",
                "label": "User Email",
                "loadIf": true,
                "props": {
                    "operators": [
                        "=",
                        "like"
                    ]
                }
            },
            {
                "type": "boolean",
                "filter_name": "is_paid",
                "label": "Is Paid",
                "loadIf": true,
                "props": {
                    "default_selected": "all",
                    "select_options": {
                        "0": "لا",
                        "1": "نعم",
                        "all": "الكل"
                    },
                    "operators": [
                        "="
                    ]
                }
            }
        ],
        "rowActions": {
            "show_details": {
                "action_key": "show_details",
                "action_type": "redirect",
                "showInMobileApp": true,
                "showInWeb": true,
                "need_confirmation": false,
                "applicableAsBulkAction": false,
                "action": {
                    "api": "/api/control-tables/row-table-action/bulk_import/show_details/364",
                    "web": "/control-tables/row-table-action/bulk_import/show_details/364"
                },
                "button": {
                    "label": "عرض الطلبات",
                    "btnClasses": []
                },
                "method": "post",
                "onSuccess": "refetchRow",
                "payload_keys": [],
                "applicableForRow": "showDetailsBtn",
                "redirect_routes": {
                    "api": "/api/shipping-awbs/multi-orders-import-results/364",
                    "web": "/shipping-awbs/multi-orders-import-results/364"
                }
            },
            "del_bulk_import": {
                "action_key": "del_bulk_import",
                "action_type": "normal",
                "showInMobileApp": true,
                "showInWeb": true,
                "need_confirmation": true,
                "applicableAsBulkAction": false,
                "action": {
                    "api": "/api/control-tables/row-table-action/bulk_import/del_bulk_import/364",
                    "web": "/control-tables/row-table-action/bulk_import/del_bulk_import/364"
                },
                "button": {
                    "label": " حذف",
                    "btnClasses": [
                        "btn-opac-danger"
                    ]
                },
                "method": "post",
                "onSuccess": "deleteRow",
                "payload_keys": [],
                "applicableForRow": "showDelBulkImportBtn"
            },
            "download_failed_awbs": {
                "action_key": "download_failed_awbs",
                "action_type": "normal",
                "showInMobileApp": true,
                "showInWeb": true,
                "need_confirmation": false,
                "applicableAsBulkAction": false,
                "action": {
                    "api": "/api/control-tables/row-table-action/bulk_import/download_failed_awbs/364",
                    "web": "/control-tables/row-table-action/bulk_import/download_failed_awbs/364"
                },
                "button": {
                    "label": "تصدير التسجيلات الغير ناجحة ",
                    "btnClasses": [
                        "btn-opac-secondary"
                    ]
                },
                "method": "post",
                "onSuccess": "downloadData",
                "payload_keys": [],
                "applicableForRow": "showDownloadFailedAwbsBtn"
            }
        },
        "bulkActions": {
            "export_excel": {
                "action_key": "export_excel",
                "label": "Export",
                "action": {
                    "api": "/api/control-tables/bulk-table-action/shipping_awbs/export_excel",
                    "web": "/control-tables/bulk-table-action/shipping_awbs/export_excel"
                },
                "button": {
                    "label": "Export",
                    "btnClasses": []
                },
                "method": "post",
                "payload_keys": [
                    "selected_ids",
                    "filters"
                ],
                "need_confirmation": false,
                "action_response": "instant",
                "onSuccess": "no_action",
                "callBack": "exportToExcel"
            }
        },
        "newRowActions": {
            "addNewProject": {
                "action_key": "addNewProject",
                // The real purpose of this key is to not apply the styling of redirect/toggle button and 
                "action_type": "custom_control",
                "label": "Add New Project",
                "action": {
                    // This should change from API
                    // "web": "/admin/projects",
                },
                "button": {
                    "label": "Add New Project",
                    "btnClasses": []
                },
                "method": "post",
                "payload_keys": [],
                "need_confirmation": false,
                "action_response": "instant",
                "onSuccess": "OpenModalForm",
                "callBack": ""
            },
            "addNewProjectByExcel": {
                "action_key": "addNewProjectsByExcel",
                // The real purpose of this key is to not apply the styling of redirect/toggle button and 
                "action_type": "custom_control",
                "label": "Add New Projects By Excel",
                "action": {
                    // This should change from API
                    // "web": "/admin/projects",
                },
                "button": {
                    "label": "Add New Projects By Excel",
                    "btnClasses": []
                },
                "method": "post",
                "payload_keys": [],
                "need_confirmation": false,
                "action_response": "instant",
                "onSuccess": "OpenModalForm",
                "callBack": ""
            }
        }
    }
}

export default uploadTableStructure