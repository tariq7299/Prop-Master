const tables = {
    "table_test": {
        "tableName": "table_test",
        "columns": [
            {
                "type": "text",
                "label": "المعرف",
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
                "label": "شركة الشحن",
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
                "label": "رقم التتبع",
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
                "label": "الإجراءات",
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
                "filter_name": "created_at_from",
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
            "toggle_awb_activation": {
                "action_key": "toggle_awb_activation",
                "action_type": "toggle",
                "showInMobileApp": false,
                "showInWeb": true,
                "need_confirmation": true,
                "applicableAsBulkAction": false,
                "action": {
                    "api": "/api/control-tables/row-table-action/shipping_awbs/toggle_awb_activation/ROWID",
                    "web": "/control-tables/row-table-action/shipping_awbs/toggle_awb_activation/ROWID"
                },
                "button": {
                    "label": "حالة التفعيل",
                    "btnClasses": []
                },
                "method": "post",
                "onSuccess": "refetchRow",
                "payload_keys": []
            },
            "show_details": {
                "action_key": "show_details",
                "action_type": "normal",
                "showInMobileApp": true,
                "showInWeb": true,
                "need_confirmation": false,
                "applicableAsBulkAction": false,
                "action": {
                    "api": "/api/control-tables/row-table-action/shipping_awbs/show_details/ROWID",
                    "web": "/control-tables/row-table-action/shipping_awbs/show_details/ROWID"
                },
                "button": {
                    "label": "عرض",
                    "btnClasses": [
                        "btn-opac-info"
                    ]
                },
                "method": "post",
                "onSuccess": "DisplayOnModal",
                "payload_keys": []
            },
            "update_track_status": {
                "action_key": "update_track_status",
                "action_type": "normal",
                "showInMobileApp": true,
                "showInWeb": true,
                "need_confirmation": false,
                "applicableAsBulkAction": true,
                "action": {
                    "api": "/api/control-tables/row-table-action/shipping_awbs/update_track_status/ROWID",
                    "web": "/control-tables/row-table-action/shipping_awbs/update_track_status/ROWID"
                },
                "button": {
                    "label": "تحديث حالة الشحن",
                    "btnClasses": [
                        "btn-opac-success"
                    ]
                },
                "method": "post",
                "onSuccess": "refetchRow",
                "payload_keys": [],
                "onBulkSuccess": "refetchData",
                "bulk_actions_url": {
                    "api": "/api/control-tables/row-bulk-table-action/shipping_awbs/update_track_status",
                    "web": "/control-tables/row-bulk-table-action/shipping_awbs/update_track_status"
                }
            },
            "mark_as_delivered": {
                "action_key": "mark_as_delivered",
                "action_type": "normal",
                "showInMobileApp": false,
                "showInWeb": true,
                "need_confirmation": true,
                "applicableAsBulkAction": true,
                "action": {
                    "api": "/api/control-tables/row-table-action/shipping_awbs/mark_as_delivered/ROWID",
                    "web": "/control-tables/row-table-action/shipping_awbs/mark_as_delivered/ROWID"
                },
                "button": {
                    "label": "تم التوصيل",
                    "btnClasses": []
                },
                "method": "post",
                "onSuccess": "refetchRow",
                "payload_keys": [],
                "onBulkSuccess": "refetchData",
                "bulk_actions_url": {
                    "api": "/api/control-tables/row-bulk-table-action/shipping_awbs/mark_as_delivered",
                    "web": "/control-tables/row-bulk-table-action/shipping_awbs/mark_as_delivered"
                }
            },
            "cod_withdrawal_allowed": {
                "action_key": "cod_withdrawal_allowed",
                "action_type": "toggle",
                "showInMobileApp": false,
                "showInWeb": true,
                "need_confirmation": true,
                "applicableAsBulkAction": false,
                "action": {
                    "api": "/api/control-tables/row-table-action/shipping_awbs/cod_withdrawal_allowed/ROWID",
                    "web": "/control-tables/row-table-action/shipping_awbs/cod_withdrawal_allowed/ROWID"
                },
                "button": {
                    "label": "إمكانية السحب",
                    "btnClasses": []
                },
                "method": "post",
                "onSuccess": "refetchRow",
                "payload_keys": []
            },
            "create_return_awb": {
                "action_key": "create_return_awb",
                "action_type": "custom_control",
                "showInMobileApp": true,
                "showInWeb": true,
                "need_confirmation": false,
                "applicableAsBulkAction": false,
                "action": {
                    "api": "/api/control-tables/row-table-action/shipping_awbs/create_return_awb/ROWID",
                    "web": "/control-tables/row-table-action/shipping_awbs/create_return_awb/ROWID"
                },
                "button": {
                    "label": "إصدار بوليصة استرجاع",
                    "btnClasses": [
                        "btn-opac-danger"
                    ]
                },
                "method": "post",
                "onSuccess": "OpenModalForm",
                "payload_keys": []
            },
            "toggle_prevent_tracking_on_delete": {
                "action_key": "toggle_prevent_tracking_on_delete",
                "action_type": "toggle",
                "showInMobileApp": false,
                "showInWeb": true,
                "need_confirmation": false,
                "applicableAsBulkAction": false,
                "action": {
                    "api": "/api/control-tables/row-table-action/shipping_awbs/toggle_prevent_tracking_on_delete/ROWID",
                    "web": "/control-tables/row-table-action/shipping_awbs/toggle_prevent_tracking_on_delete/ROWID"
                },
                "button": {
                    "label": "منع التتبع التلقائي عند الإلغاء",
                    "btnClasses": []
                },
                "method": "post",
                "onSuccess": "refetchRow",
                "payload_keys": []
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
        }
    }
}

export default tables