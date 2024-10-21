const uploadtableItems = [
    {
        "id": 65678,
        "created_date": "24/07/2024 15:29",
        "shipping_company": "aymakan",
        "tracking_number": {
            "value": "/sawb-tracking/AY511455855",
            "label": "AY511455855"
        },
        "cod_withdrawal_allowed": true,

        "actions":
        {
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
                    "label": "Show details",
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
                    "label": " Delete",
                    "btnClasses": [
                        "destructive"
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
                    "label": "Download unsuccessfull records",
                    "btnClasses": [
                        "secondary"
                    ]
                },
                "method": "post",
                "onSuccess": "downloadData",
                "payload_keys": [],
                "applicableForRow": "showDownloadFailedAwbsBtn"
            }
        }

    },
    {
        "id": 65679,
        "created_date": "24/07/2024 15:29",
        "shipping_company": "aymakan",
        "tracking_number": {
            "value": "/sawb-tracking/AY511455855",
            "label": "AY511455855"
        },
        "cod_withdrawal_allowed": true,

        "actions": {
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
        }
    },
    {
        "id": 65680,
        "created_date": "24/07/2024 15:29",
        "shipping_company": "aymakan",
        "tracking_number": {
            "value": "/sawb-tracking/AY511455855",
            "label": "AY511455855"
        },
        "cod_withdrawal_allowed": true,

        "actions": {
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
        }
    }
]

export default uploadtableItems;