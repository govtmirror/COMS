Ext.define("COMS.view.Management.Buttons" ,{
	"extend" : "Ext.container.Container",
	"alias" : "widget.ManagementBtns",
	"name" : "ManagementBtns",

	"items" : [
		{ "xtype" : "box", "componentCls" : "scEditInstructions", "html" : "<span>Note:</span> To edit a record, click the record in the table below, make changes in the Rich Text Edit field above, and click the \"Save\" button" },
		{ "xtype" : "container", "defaults": { "labelAlign": "right", "labelClsExtra": "NursingDocs-label", "margin" : "0 10 0 0" },
			"layout": "hbox", 
			"items" : [ 
				{ "xtype" : "button", "text" : "Save", "scope" : this }, 
				{ "xtype" : "button", "text" : "Cancel", "scope" : this },
				{ "xtype" : "button", "text" : "Refresh", "scope" : this, "margin" : "0 0 0 765"}
			]
		}
	]
});

