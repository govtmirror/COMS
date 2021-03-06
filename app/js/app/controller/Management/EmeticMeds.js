Ext.define('COMS.controller.Management.EmeticMeds', {
	extend : 'Ext.app.Controller',
	views : [ 'Management.EmeticMeds' ],
	stores : ["EmeticMeds"],
	refs: [
		{ ref : "EmeticMedsGrid",           selector : "EmeticMeds grid" },
		{ ref : "PatientType",              selector : "EmeticMeds radiogroup[name=\"patientRadio\"]" },
		{ ref : "SelLevel",                 selector : "EmeticMeds combo[name=\"EmetogenicLevel\"]" },
		{ ref : "SelDrug",                  selector : "EmeticMeds combo[name=\"Drug\"]" },
		{ ref : "DeleteBtn",                selector : "EmeticMeds button[text=\"Delete\"]" }

	],

	init: function() {

		this.control({
			"EmeticMeds " : {
				beforerender: this.RefreshPanel
			},
			"EmeticMeds radiogroup[name=\"patientRadio\"]" : {
					change: this.selPatientType
			},
			"EmeticMeds combo[name=\"Drug\"]" : {
				select: this.selDrug
			},
			"EmeticMeds grid" : {
				select: this.selectGridRow
			},

			"EmeticMeds button[text=\"Cancel\"]" : {
				click: this.CancelForm
			},
			"EmeticMeds button[text=\"Save\"]" : {
				click: this.SaveForm
			},
			"EmeticMeds button[text=\"Refresh\"]" : {
				click: this.RefreshPanel
			},
			"EmeticMeds button[text=\"Delete\"]" : {
				click: this.DeleteSelectedRecords
			}
		});
	},

	initDrugStore : function() {
		var pType = this.getPatientType().getValue().PatientType;
		var theDrugCombo = this.getSelDrug();
		theDrugCombo.lastQuery = null; 
		var theDrugStore = theDrugCombo.getStore();
		theDrugStore.filters.clear();
		theDrugStore.proxy.api.read = Ext.URLs.Drugs + "/" + pType;


		theDrugStore.load();
	},

	RefreshPanel : function(P) {
		// this.application.loadMask("Please wait; Loading Emetic Medications");
		this.initDrugStore();


		var theGrid = this.getEmeticMedsGrid();
		var theStore = theGrid.getStore();
		theStore.load();

		var delBtn = this.getDeleteBtn();
		delBtn.setDisabled(true);
		delBtn.show();

		// this.application.unMask();
		return true;
	},

	selPatientType : function(rgroup, nValue, oValue, eOpts) {
		this.initDrugStore();
	},

	selDrug : function(theCombo, theRecord) {
		var DrugID = theCombo.getValue();
		var DrugName = theCombo.getRawValue();
		var theData = theRecord[0].getData();
		var rawData = theRecord[0].raw;
	},


	selectGridRow : function(theRowModel, record, index, eOpts) {
		var recID = record.get("id");
		var EmoLevelID = record.get("EmoLevel");
		var EmoLevel = record.get("EmoLevelName");
		var PatientType = record.get("MedType");

		var thePTypeField = this.getPatientType();

		var MedID = record.get("MedID");
		var MedName = record.get("MedName");
		var MedIEN = record.get("IEN");

		var theDrugField = this.getSelDrug();
		theDrugField.setValue(MedIEN);
		theDrugField.setRawValue(MedName);

		var theLevelField = this.getSelLevel();
		theLevelField.setValue(EmoLevelID);
		theLevelField.setRawValue(EmoLevel);

		this.CurrentEmeticMedRecordID = recID;

		var records = theRowModel.getSelection();
		var delBtn = this.getDeleteBtn();
		if (records.length <= 0) {
			delBtn.setDisabled(true);
		}
		else {
			delBtn.setDisabled(false);
		}
	},

	CancelForm : function(theBtn, theEvent, eOpts) {
		theBtn.up('form').getForm().reset();
		this.getSelDrug().setRawValue("");
		delete this.CurrentEmeticMedRecordID;
	},

	SaveForm : function(theBtn, theEvent, eOpts) {
		var fData = {};

		var theDrugField = this.getSelDrug();
		fData.MedID = theDrugField.getValue();

		var theEmoLevelField = this.getSelLevel();
		fData.EmoLevel = theEmoLevelField.getValue();

		var form = theBtn.up('form').getForm();
		if (form.isValid()) {
			var recID = this.CurrentEmeticMedRecordID;
			var URL = Ext.URLs.EmeticMeds;
			delete this.CurrentEmeticMedRecordID;

			var CMD = "POST";
			if (recID && "" !== recID) {
				URL += "/" + recID;
				CMD = "PUT";
			}

			Ext.Ajax.request({
				url: URL,
				method: CMD,
				jsonData : fData,
				scope: this,
				theForm: form,
				success: function( response, opts ){
					var text = response.responseText;
					var resp = Ext.JSON.decode( text );
					opts.theForm.reset();
					if (!resp.success) {
						Ext.MessageBox.alert("Saving Error", "Site Configuration - Emetic Medication, Save Error - " + resp.msg );
					}
					else {
						this.RefreshPanel();
					}
				},
				failure: function( response, opts ) {
					var text = response.responseText;
					var resp = Ext.JSON.decode( text );
					opts.theForm.reset();
					Ext.MessageBox.alert("Saving Error", "Saving Error", "Site Configuration - Emetic Medication, Save Error - " + "e.message" + "<br />" + resp.msg );
				}
			});
		}
		else {
			var Msg = "";
			var Docs = "";

			if (!theData.Drug) {
				Msg += "<li>Missing Drug</li>";
			}
			if (!theData.PatientType) {
				Msg += "<li>Missing Medication Type</li>";
			}
			if ("" === theData.EmetogenicLevel) {
				Msg += "<li>Missing Emetogenic Level</li>";
			}
			if ("" !== Msg) {
				Ext.MessageBox.alert('Invalid', 'Please fix the following errors:<ul>' + Msg + '</ul>');
			}

		}
	},

	deleteRecord : function(theRecords) {
		var record = theRecords.pop();
		if (record) {
			var rID = record.get("id");
			var CMD = "DELETE";
			var URL = Ext.URLs.EmeticMeds + "/" + rID;
			Ext.Ajax.request({
				url: URL,
				method : CMD,
				scope: this,
				records : theRecords,
				success: function( response, opts ){
					this.deleteRecord(opts.records);
				},
				failure : function( response, opts ) {
					var text = response.responseText;
					var resp = Ext.JSON.decode( text );
					Ext.MessageBox.alert("Saving Error", "Saving Error", "Site Configuration - Delete Emetic Medication Record, Save Error - <br />" + resp.msg );
				}
			});
		}
		else {
			var theBtn = this.getDeleteBtn();
			this.application.unMask();
			this.RefreshPanel();
			this.CancelForm(theBtn);
		}
	},

	DeleteSelectedRecords : function() {
		var theGrid = this.getEmeticMedsGrid();
		var theRecords = theGrid.getSelectionModel().getSelection();
		var len = theRecords.length, i, record;
		Ext.MessageBox.confirm("Confirm Deletion", "Are you sure you want to delete the selected Emetic Medication records?", function(btn) {
			if ("yes" === btn) {
				this.application.loadMask("Please wait; Deleting Selected Records");
				this.deleteRecord(theRecords);
			}
		}, this);
	}
});