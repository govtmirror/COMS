Ext.define("COMS.controller.Common.puWinAddCumDose", {
	extend : "Ext.app.Controller",

	stores : [ "DiseaseType", "DiseaseStage" ],
	views : [ "Common.selDisease", "Common.selDiseaseStage" ],

	init: function() {
		this.control({
			"puWinAddCumDose button[text=\"Cancel\"]" : {
				click: this.Cancel
			},
			"puWinAddCumDose button[text=\"Save\"]" : {
				click: this.Save
			},
		});
	},

	_submitForm : function(form) {
		form.url += "/" + this.application.Patient.id;
		form.submit(
			{
				success: function(form, action) {
					form.owner.up("window").hide();
					form.reset();
				},
				failure: function(form, action) {
					switch (action.failureType) {
						case Ext.form.action.Action.CLIENT_INVALID:
							Ext.Msg.alert('Failure', 'Form fields may not be submitted with invalid values');
							break;
						case Ext.form.action.Action.CONNECT_FAILURE:
							Ext.Msg.alert('Failure', 'Ajax communication failed');
							break;
						case Ext.form.action.Action.SERVER_INVALID:
						   Ext.Msg.alert('Failure', action.result.msg);
				   }
					form.owner.up("window").hide();
					form.reset();
				}
			}
		);
	},

	Save : function(btn) {
		var theForm = btn.up('form').getForm();
		if (theForm.isValid()) {
			Ext.Ajax.request({
				scope : this,
				pForm : theForm,
				url: Ext.URLs.PatientCumulativeDosing + "/" + this.application.Patient.id,
				success: function( response, opts ){
					var selectedMedID = opts.pForm.getValues().value;
					var text = response.responseText;
					var resp = Ext.JSON.decode( text );
					if (resp.success) {

						var i, dupMed = false, recs, len;
						if (resp.records) {
							recs = resp.records; 
							len = recs.length;
							for (i = 0; i < len; i++) {
								if (recs[i].MedID === selectedMedID) {
									alert("Duplicate Medication selected. Please select another");
									dupMed = true;
									break;
								}
							}
						}
						if (!dupMed) {
							this._submitForm(theForm);
						}
					}
					else {
						debugger;
						alert("ERROR - Saving Patient Cumulative Medication Dosing History");
					}
				},
				failure : function( response, opts ) {
					debugger;
					alert("ERROR: Saving Patient Cumulative Medication Dosing History");
				}
			});
		}
	},
	Cancel : function(btn) {
		btn.up('form').getForm().reset();
		btn.up('window').hide();
	}
});