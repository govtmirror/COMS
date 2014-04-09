Ext.define('COMS.view.NewPlan.BSASelection', {
	extend: 'Ext.panel.Panel',
	alias : 'widget.BSASelection',
    buttonAlign: 'center',
	autoShow: true,
	width: 390,

    title : "Body Surface Area Calculations",
    name : "bsaCalcInfo",
    hidden: true,
    layout : "hbox",
    defaults : { margin : "5 10 5 5", labelAlign : "top", labelWidth: 60},     //, labelClsExtra : "NursingDocs-label" },
    items : [
        {
            xtype: "combo",
            name: "BSA_FormulaWeight",
            fieldLabel: "Weight to use <em>*</em>",
            labelAlign: "top",
            width: 178,
            labelStyle: "font-weight: bold",
            store: {
                    fields: ["weightType"],
                    data: [ 
                            { weightType: "Actual Weight" },
                            { weightType: "Ideal Weight" },
                            { weightType: "Adjusted Weight" },
                            { weightType: "Lean Weight" },
                            { weightType: "Other" }
                    ]
            },
            queryMode: "local",
            displayField: "weightType"
        },
        {
            xtype: "combo",
            name: "BSA_Formula",
            fieldLabel: "BSA Formula <em>*</em>",
            labelAlign: "top",
            width: 178,
            labelStyle: "font-weight: bold",
            store: {
                fields: ["formula"],
                data: [ 
                    { formula: "DuBois" },
                    { formula: "Mosteller" },
                    { formula: "Haycock" },
                    { formula: "Gehan and George" },
                    { formula: "Boyd" },
                    { formula: "Capped" }
                ]
            },
            queryMode: "local",
            displayField: "formula"
        }
    ]
});
