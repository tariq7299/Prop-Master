const tablesItems = [
    {
        "id": 65678,
        "created_date": "24/07/2024 15:29",
        "shipping_company": "aymakan",
        "tracking_number": {
            "value": "/sawb-tracking/AY511455855",
            "label": "AY511455855"
        },
        "cod_withdrawal_allowed": true,

        "actions": {
            "toggle_awb_activation": {
                "action_key": "toggle_awb_activation",
                "action_type": "toggle",
                "showInMobileApp": false,
                "showInWeb": true,
                "need_confirmation": true,
                "applicableAsBulkAction": false,
                "action": {
                    "api": "/api/control-tables/row-table-action/shipping_awbs/toggle_awb_activation/65678",
                    "web": "/control-tables/row-table-action/shipping_awbs/toggle_awb_activation/65678"
                },
                "button": {
                    "label": "حالة التفعيل",
                    "btnClasses": []
                },
                "method": "post",
                "onSuccess": "refetchRow",
                "payload_keys": [],
                "applicableForRow": "showAwbActivationToggler",
                "toggle_current_value": true
            },
            "show_details": {
                "action_key": "show_details",
                "action_type": "normal",
                "showInMobileApp": true,
                "showInWeb": true,
                "need_confirmation": false,
                "applicableAsBulkAction": false,
                "action": {
                    "api": "/api/control-tables/row-table-action/shipping_awbs/show_details/65678",
                    "web": "/control-tables/row-table-action/shipping_awbs/show_details/65678"
                },
                "button": {
                    "label": "عرض",
                    "btnClasses": [
                        "btn-opac-info"
                    ]
                },
                "method": "post",
                "onSuccess": "DisplayOnModal",
                "payload_keys": [],
                "applicableForRow": "showDetailsBtn"
            },
            "update_track_status": {
                "action_key": "update_track_status",
                "action_type": "normal",
                "showInMobileApp": true,
                "showInWeb": true,
                "need_confirmation": false,
                "applicableAsBulkAction": true,
                "action": {
                    "api": "/api/control-tables/row-table-action/shipping_awbs/update_track_status/65678",
                    "web": "/control-tables/row-table-action/shipping_awbs/update_track_status/65678"
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
                "applicableForRow": "showUpdateStatusBtn",
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
                    "api": "/api/control-tables/row-table-action/shipping_awbs/mark_as_delivered/65678",
                    "web": "/control-tables/row-table-action/shipping_awbs/mark_as_delivered/65678"
                },
                "button": {
                    "label": "تم التوصيل",
                    "btnClasses": []
                },
                "method": "post",
                "onSuccess": "refetchRow",
                "payload_keys": [],
                "applicableForRow": "showMarkAsDeliveredBtn",
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
                    "api": "/api/control-tables/row-table-action/shipping_awbs/cod_withdrawal_allowed/65678",
                    "web": "/control-tables/row-table-action/shipping_awbs/cod_withdrawal_allowed/65678"
                },
                "button": {
                    "label": "إمكانية السحب",
                    "btnClasses": []
                },
                "method": "post",
                "onSuccess": "refetchRow",
                "payload_keys": [],
                "applicableForRow": "showCodWithdrawalAllowedToggler",
                "toggle_current_value": true
            },
            "toggle_prevent_tracking_on_delete": {
                "action_key": "toggle_prevent_tracking_on_delete",
                "action_type": "toggle",
                "showInMobileApp": false,
                "showInWeb": true,
                "need_confirmation": false,
                "applicableAsBulkAction": false,
                "action": {
                    "api": "/api/control-tables/row-table-action/shipping_awbs/toggle_prevent_tracking_on_delete/65678",
                    "web": "/control-tables/row-table-action/shipping_awbs/toggle_prevent_tracking_on_delete/65678"
                },
                "button": {
                    "label": "منع التتبع التلقائي عند الإلغاء",
                    "btnClasses": []
                },
                "method": "post",
                "onSuccess": "refetchRow",
                "payload_keys": [],
                "applicableForRow": "showPreventTrackingToggler",
                "toggle_current_value": false
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
            "toggle_awb_activation": {
                "action_key": "toggle_awb_activation",
                "action_type": "toggle",
                "showInMobileApp": false,
                "showInWeb": true,
                "need_confirmation": true,
                "applicableAsBulkAction": false,
                "action": {
                    "api": "/api/control-tables/row-table-action/shipping_awbs/toggle_awb_activation/65678",
                    "web": "/control-tables/row-table-action/shipping_awbs/toggle_awb_activation/65678"
                },
                "button": {
                    "label": "حالة التفعيل",
                    "btnClasses": []
                },
                "method": "post",
                "onSuccess": "refetchRow",
                "payload_keys": [],
                "applicableForRow": "showAwbActivationToggler",
                "toggle_current_value": true
            },
            "show_details": {
                "action_key": "show_details",
                "action_type": "normal",
                "showInMobileApp": true,
                "showInWeb": true,
                "need_confirmation": false,
                "applicableAsBulkAction": false,
                "action": {
                    "api": "/api/control-tables/row-table-action/shipping_awbs/show_details/65678",
                    "web": "/control-tables/row-table-action/shipping_awbs/show_details/65678"
                },
                "button": {
                    "label": "عرض",
                    "btnClasses": [
                        "btn-opac-info"
                    ]
                },
                "method": "post",
                "onSuccess": "DisplayOnModal",
                "payload_keys": [],
                "applicableForRow": "showDetailsBtn"
            },
            "update_track_status": {
                "action_key": "update_track_status",
                "action_type": "normal",
                "showInMobileApp": true,
                "showInWeb": true,
                "need_confirmation": false,
                "applicableAsBulkAction": true,
                "action": {
                    "api": "/api/control-tables/row-table-action/shipping_awbs/update_track_status/65678",
                    "web": "/control-tables/row-table-action/shipping_awbs/update_track_status/65678"
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
                "applicableForRow": "showUpdateStatusBtn",
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
                    "api": "/api/control-tables/row-table-action/shipping_awbs/mark_as_delivered/65678",
                    "web": "/control-tables/row-table-action/shipping_awbs/mark_as_delivered/65678"
                },
                "button": {
                    "label": "تم التوصيل",
                    "btnClasses": []
                },
                "method": "post",
                "onSuccess": "refetchRow",
                "payload_keys": [],
                "applicableForRow": "showMarkAsDeliveredBtn",
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
                    "api": "/api/control-tables/row-table-action/shipping_awbs/cod_withdrawal_allowed/65678",
                    "web": "/control-tables/row-table-action/shipping_awbs/cod_withdrawal_allowed/65678"
                },
                "button": {
                    "label": "إمكانية السحب",
                    "btnClasses": []
                },
                "method": "post",
                "onSuccess": "refetchRow",
                "payload_keys": [],
                "applicableForRow": "showCodWithdrawalAllowedToggler",
                "toggle_current_value": true
            },
            "toggle_prevent_tracking_on_delete": {
                "action_key": "toggle_prevent_tracking_on_delete",
                "action_type": "toggle",
                "showInMobileApp": false,
                "showInWeb": true,
                "need_confirmation": false,
                "applicableAsBulkAction": false,
                "action": {
                    "api": "/api/control-tables/row-table-action/shipping_awbs/toggle_prevent_tracking_on_delete/65678",
                    "web": "/control-tables/row-table-action/shipping_awbs/toggle_prevent_tracking_on_delete/65678"
                },
                "button": {
                    "label": "منع التتبع التلقائي عند الإلغاء",
                    "btnClasses": []
                },
                "method": "post",
                "onSuccess": "refetchRow",
                "payload_keys": [],
                "applicableForRow": "showPreventTrackingToggler",
                "toggle_current_value": false
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
            "toggle_awb_activation": {
                "action_key": "toggle_awb_activation",
                "action_type": "toggle",
                "showInMobileApp": false,
                "showInWeb": true,
                "need_confirmation": true,
                "applicableAsBulkAction": false,
                "action": {
                    "api": "/api/control-tables/row-table-action/shipping_awbs/toggle_awb_activation/65678",
                    "web": "/control-tables/row-table-action/shipping_awbs/toggle_awb_activation/65678"
                },
                "button": {
                    "label": "حالة التفعيل",
                    "btnClasses": []
                },
                "method": "post",
                "onSuccess": "refetchRow",
                "payload_keys": [],
                "applicableForRow": "showAwbActivationToggler",
                "toggle_current_value": true
            },
            "show_details": {
                "action_key": "show_details",
                "action_type": "normal",
                "showInMobileApp": true,
                "showInWeb": true,
                "need_confirmation": false,
                "applicableAsBulkAction": false,
                "action": {
                    "api": "/api/control-tables/row-table-action/shipping_awbs/show_details/65678",
                    "web": "/control-tables/row-table-action/shipping_awbs/show_details/65678"
                },
                "button": {
                    "label": "عرض",
                    "btnClasses": [
                        "btn-opac-info"
                    ]
                },
                "method": "post",
                "onSuccess": "DisplayOnModal",
                "payload_keys": [],
                "applicableForRow": "showDetailsBtn"
            },
            "update_track_status": {
                "action_key": "update_track_status",
                "action_type": "normal",
                "showInMobileApp": true,
                "showInWeb": true,
                "need_confirmation": false,
                "applicableAsBulkAction": true,
                "action": {
                    "api": "/api/control-tables/row-table-action/shipping_awbs/update_track_status/65678",
                    "web": "/control-tables/row-table-action/shipping_awbs/update_track_status/65678"
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
                "applicableForRow": "showUpdateStatusBtn",
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
                    "api": "/api/control-tables/row-table-action/shipping_awbs/mark_as_delivered/65678",
                    "web": "/control-tables/row-table-action/shipping_awbs/mark_as_delivered/65678"
                },
                "button": {
                    "label": "تم التوصيل",
                    "btnClasses": []
                },
                "method": "post",
                "onSuccess": "refetchRow",
                "payload_keys": [],
                "applicableForRow": "showMarkAsDeliveredBtn",
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
                    "api": "/api/control-tables/row-table-action/shipping_awbs/cod_withdrawal_allowed/65678",
                    "web": "/control-tables/row-table-action/shipping_awbs/cod_withdrawal_allowed/65678"
                },
                "button": {
                    "label": "إمكانية السحب",
                    "btnClasses": []
                },
                "method": "post",
                "onSuccess": "refetchRow",
                "payload_keys": [],
                "applicableForRow": "showCodWithdrawalAllowedToggler",
                "toggle_current_value": true
            },
            "toggle_prevent_tracking_on_delete": {
                "action_key": "toggle_prevent_tracking_on_delete",
                "action_type": "toggle",
                "showInMobileApp": false,
                "showInWeb": true,
                "need_confirmation": false,
                "applicableAsBulkAction": false,
                "action": {
                    "api": "/api/control-tables/row-table-action/shipping_awbs/toggle_prevent_tracking_on_delete/65678",
                    "web": "/control-tables/row-table-action/shipping_awbs/toggle_prevent_tracking_on_delete/65678"
                },
                "button": {
                    "label": "منع التتبع التلقائي عند الإلغاء",
                    "btnClasses": []
                },
                "method": "post",
                "onSuccess": "refetchRow",
                "payload_keys": [],
                "applicableForRow": "showPreventTrackingToggler",
                "toggle_current_value": false
            }
        }
    }
]

export default tablesItems;