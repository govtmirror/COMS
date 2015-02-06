use COMS_TEST_6

/* Add needed primary keys to other tables */
/* Note: If error occurs during the Add Primary Key Constraint process */
/* Get a list of any existing Primary Keys to see if there's a conflict */
/**
 *
 *	use COMS_TEST_6
 *	SELECT OBJECT_NAME(OBJECT_ID) AS Name_of_Constraint,
 *	OBJECT_NAME(parent_object_id) AS Table_Name,
 *	type_desc AS Constraint_Type
 *	FROM sys.objects
 *	WHERE type_desc LIKE '%CONSTRAINT'
 *
 *	OR
 *
 *	use COMS_TEST_7
 *	SELECT OBJECT_NAME(OBJECT_ID) AS Name_of_Constraint,
 *	OBJECT_NAME(parent_object_id) AS Table_Name,
 *	type_desc AS Constraint_Type
 *	FROM sys.objects
 *	WHERE type_desc LIKE '%CONSTRAINT' and
 *	type_desc = 'PRIMARY_KEY_CONSTRAINT' OR 
 *	type_desc = 'FOREIGN_KEY_CONSTRAINT' 
 *	order by Name_of_Constraint desc
 **/
alter table Patient
add constraint PK_Patient_ID Primary key(Patient_ID)
GO

alter table LookUp
add constraint PK_Lookup_ID Primary key(Lookup_ID)
GO

alter table DiseaseStaging
add constraint PK_ID Primary key(ID)
GO

/* Create the new table */
CREATE TABLE PatientDiseaseHistory(
    PDH_ID uniqueidentifier not null default newsequentialid() constraint PK_PDH_ID PRIMARY KEY,
    Patient_ID uniqueidentifier NOT NULL constraint FK_Patient_ID REFERENCES Patient (Patient_ID),
    Date_Assessment datetime NOT NULL DEFAULT getdate(),
    Author varchar(30) NULL,
    Disease_ID uniqueidentifier NOT NULL constraint FK_Disease_ID REFERENCES LookUp(Lookup_ID),
    DiseaseStage_ID uniqueidentifier NULL constraint FK_ID REFERENCES DiseaseStaging (ID)
)

/* Patch SiteCommonInformation Table to address Emetic Risk Issue */
  UPDATE [COMS_5].[dbo].[SiteCommonInformation] SET [Label] = 'Minimal Emetic Risk' WHERE ID='8A0495C6-0BD7-E311-8759-000C2935B86F'
  UPDATE [COMS_5].[dbo].[SiteCommonInformation] SET [Label] = 'Low Emetic Risk' WHERE ID='E87EFA98-88D7-E311-8759-000C2935B86F'
  UPDATE [COMS_5].[dbo].[SiteCommonInformation] SET [Label] = 'Moderate Emetic Risk' WHERE ID='885FCFAC-0BD7-E311-8759-000C2935B86F'
  UPDATE [COMS_5].[dbo].[SiteCommonInformation] SET [Label] = 'High Emetic Risk' WHERE ID='385850A6-88D7-E311-8759-000C2935B86F'
  Delete from [COMS_5].[dbo].[SiteCommonInformation] where ID='2A619798-0BD7-E311-8759-000C2935B86F'
  Delete from [COMS_5].[dbo].[SiteCommonInformation] where ID='8C84A051-C571-E411-B128-005056B7661F'
  Delete from [COMS_5].[dbo].[SiteCommonInformation] where ID='2CC1E08E-C571-E411-B128-005056B7661F'

INSERT INTO LookUp (Lookup_ID, Lookup_Type,Lookup_Type_ID,Name,Description) VALUES ('B3A030E5-2595-E411-AD26-000C2935B86F','12',NULL,'Intra-arterial', '')
INSERT INTO LookUp (Lookup_ID, Lookup_Type,Lookup_Type_ID,Name,Description) VALUES ('B4A030E5-2595-E411-AD26-000C2935B86F','12',NULL,'Sublingual', '')
INSERT INTO LookUp (Lookup_ID, Lookup_Type,Lookup_Type_ID,Name,Description) VALUES ('E34317EF-2595-E411-AD26-000C2935B86F','12',NULL,'Intra-hepatic', '')
INSERT INTO LookUp (Lookup_ID, Lookup_Type,Lookup_Type_ID,Name,Description) VALUES ('6352EFF6-2595-E411-AD26-000C2935B86F','12',NULL,'Peritoneal', '')
INSERT INTO LookUp (Lookup_ID, Lookup_Type,Lookup_Type_ID,Name,Description) VALUES ('6452EFF6-2595-E411-AD26-000C2935B86F','12',NULL,'Topical', '')
INSERT INTO LookUp (Lookup_ID, Lookup_Type,Lookup_Type_ID,Name,Description) VALUES ('43479300-2695-E411-AD26-000C2935B86F','12',NULL,'Intravesicular', '')
INSERT INTO LookUp (Lookup_ID, Lookup_Type,Lookup_Type_ID,Name,Description) VALUES ('44479300-2695-E411-AD26-000C2935B86F','12',NULL,'Intraocular', '')
INSERT INTO LookUp (Lookup_ID, Lookup_Type,Lookup_Type_ID,Name,Description) VALUES ('53087408-2695-E411-AD26-000C2935B86F','12',NULL,'Intravitreal', '')
INSERT INTO LookUp (Lookup_ID, Lookup_Type,Lookup_Type_ID,Name,Description) VALUES ('0C2E60DA-4CA6-E411-B0EB-000C2935B86F','12',NULL,'Via Tube', '')
