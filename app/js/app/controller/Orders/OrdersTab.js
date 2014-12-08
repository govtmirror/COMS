Ext.define("COMS.controller.Orders.OrdersTab", {
	"extend" : "Ext.app.Controller",
	"stores" : ["OrdersStore"],
	"views" : ["Orders.OrdersTab"],
	"models" : ["OrdersTable"],

	"refs" : [
		{
			"ref" : "Orders",
			"selector" : "OrdersTab"
		}
	],

	"init" : function () {
		this.control({
			"OrdersTab": {
				collapse: this.collapseCombo,
				activate : this.PanelReady,
				beforeactivate : this.PanelReady,
				enable : this.PanelReady,
				focus : this.PanelReady,
				afterrender : this.PanelReady
			},
			"OrdersTab button[text=\"Refresh\"]": {
				click: this.HandleRefresh
			},
			"OrdersTab button[text=\"Update Records\"]": {
				click: function () {
					this.application.loadMask("Updating Order Records");
					this.PostedRecsFailed = [];
					this.PostedRecs = [];

					var HandleResponse = function(record, status, theScope) {
						theScope.PostedRecs.pop();
						if (theScope.PostedRecs.length <= 0) {
							theScope.application.unMask();
							if (theScope.PostedRecsFailed.length <= 0) {
								Ext.MessageBox.alert("Success", "The Order Status has been updated.");
								theScope.getController("Orders.OrdersTab").LoadOrdersStore(true);
							}
							else {
								Ext.MessageBox.alert("Invalid", "The Order Status was not updated");
							}
						}
					};
					var ResponseAlertFail = function(record) {
						this.PostedRecsFailed.push(record);
						HandleResponse(record, false, this);
					};
					var ResponseAlertGood = function(record) {
						HandleResponse(record, true, this);
					};

					var theStore = Ext.getStore("OrdersStore");
					var DirtyRecords = theStore.getUpdatedRecords();
					var drLen = DirtyRecords.length;
					this.NumRecords = drLen;
					if (drLen > 0) {
						// Run Update Process for each record.
						var i, rec;
						for (i = 0; i < drLen; i++) {
							this.CurRecIdx = i;
							rec = DirtyRecords[i];
							var orderStatus = rec.get("orderstatus");
							if (null == orderStatus || "" == orderStatus) {
								Ext.MessageBox.alert("Information", "Please select an Order Status");
								return;
							}
							var order = Ext.create("COMS.model.OrdersTable", {
								orderstatus: rec.get("orderstatus"),
								templateID: rec.get("templateID"),
								drug: rec.get("drug"),
								patientID: rec.get("patientID"),
								type: rec.get("type"),
								route: rec.get("route"),
								orderid: rec.get("orderid"),
								Last_Name: rec.get("Last_Name")
							});
							this.PostedRecs.push(order);
							order.save({
								scope: this,
								success: ResponseAlertGood,
								failure: ResponseAlertFail
							});
						}
					}
				}
			}
		});
	},

	PanelReady : function (thePanel, eOpts) {
	},

	"HandleRefresh" : function (button, evt, eOpts) {
		this.LoadOrdersStore(false);
	},

	"LoadOrdersStore" : function (LoadAndRenderOEMTab) {
		var PatientInfo, theStore;
		theStore = Ext.getStore("OrdersStore");
		if (theStore) {
			theStore.load({
				scope: this,
				callback: function() {
					if (false !== LoadAndRenderOEMTab) {
						if (this.application.Patient) {
							PatientInfo = this.application.Patient;
							PatientInfo.OEMDataRendered = false;

							this.application.fireEvent("DisplayOEMRecordData", PatientInfo);
						}
					}
				}
			});
		}
	}
});