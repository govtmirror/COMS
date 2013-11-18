Ext.define("COMS.view.NewPlan.CTOS.NursingDocs.Chemotherapy" ,{
    extend: "Ext.form.FieldSet",
    alias : "widget.NursingDocs_Chemotherapy",
	name : "NursingDocs.Chemotherapy",
	title : "Chemotherapy / Biotherapy",

	items : [ { xtype : "displayfield", name : "ndctWarning"}, { 
		xtype : "container", 
		layout : "hbox",
		defaults : {
		    labelAlign: "right"
		},
		items : [
			{ xtype : "displayfield", name : "ndctRegimen", fieldLabel : "Regimen", labelClsExtra : "NursingDocs-label" },
			{ xtype : "displayfield", name : "ndctCycle", fieldLabel : "Cycle", labelClsExtra : "NursingDocs-label" },
			{ xtype : "displayfield", name : "ndctDay", fieldLabel : "Day", labelClsExtra : "NursingDocs-label" },
			{ xtype : "displayfield", name : "ndctDate", fieldLabel : "Date", labelClsExtra : "NursingDocs-label" }
		]
	}]
});

Ext.define("COMS.view.NewPlan.CTOS.NursingDocs" ,{
	extend : "Ext.container.Container",
	alias : "widget.NursingDocs",
	name : "Nursing Documentation Tabs",
	title: "Nursing Documentation",
	padding : "10",
	bodyCls : "Level1",
bodyStyle: {
    background: '#ffc',
    padding: '10px'
},

	items : [
		{ xtype : "NursingDocs_Chemotherapy", cls : "Level1" },
		{ xtype : "tabpanel", plain : true, autoEl : { tag : 'nav' },
			items : [
				{ xtype : "NursingDocs_GenInfo", padding : "10" },
				{ xtype : "NursingDocs_Assessment", padding : "10" },
				{ xtype : "NursingDocs_PreTreatment", padding : "10" },
				{ xtype : "NursingDocs_Treatment", padding : "10" },
				{ xtype : "NursingDocs_React_Assess", padding : "10" },
				{ xtype : "NursingDocs_Education", padding : "10" }
			]
		}
	]
});