Ext.define('COMS.store.TemplateListStore', {
    extend : 'Ext.data.Store',
    autoLoad: true,
    model : Ext.COMSModels['TemplateList'],
    groupField: 'DiseaseName'
});