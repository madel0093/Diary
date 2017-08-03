/*******************************************************************************
 * Functions that correspond to JSONStore client operations
 * 
 */

// Diary Table
var selectDiaryStatement = WL.Server.createSQLStatement("select * from Diary where idUser=?");
function getDiaryInfos(data) {
	WL.Logger.warn("getDiaryInfos: " + data);

	return WL.Server.invokeSQLStatement({
		preparedStatement : selectDiaryStatement,
		parameters : [data]
	});
}

var addDiaryStatement = WL.Server.createSQLStatement("insert into Diary(idCategory, idUser, diaryText, dateTime, location, feeling, photoURL) values (?, ?, ?, ?, ?, ?, ?)");
function addDiaryInfo(data) {
	WL.Logger.warn("add diary data " + data);

	var arr = JSON.parse(data);
	return WL.Server.invokeSQLStatement({
		preparedStatement : addDiaryStatement,
		parameters : [ arr.idCategory || "", arr.idUser, arr.diaryText || "", arr.dateTime || "", arr.location || "", arr.feeling || "", arr.photoURL || "" ]
	});
}

var updateDiaryStatement = WL.Server.createSQLStatement("update Diary set idCategory=?, diaryText=?, dateTime=?, location=?, feeling=?, photoURL=? where idDiary=? and idUser=?");
function updateDiaryInfo(data) {
	WL.Logger.warn("update diary data : " + data);

	var arr = JSON.parse(data);
	return WL.Server.invokeSQLStatement({
		preparedStatement : updateDiaryStatement,
		parameters : [ arr.idCategory || "", arr.diaryText || "", arr.dateTime || "", arr.location || "", arr.feeling || "", arr.photoURL || "", arr.idDiary, arr.idUser ]
	});
}

var deleteDiaryStatement = WL.Server.createSQLStatement("delete from Diary where idDiary=? and idUser=?");
function deleteDiaryInfo(data) {
	WL.Logger.warn("delete diary data : " + data);

	var arr = JSON.parse(data);
	return WL.Server.invokeSQLStatement({
		preparedStatement : deleteDiaryStatement,
		parameters : [ arr.idDiary, arr.idUser ]
	});
}

// ////////////////////////////////////////////////////////////////////////////////////////
// ////////////////////////////////////////////////////////////////////////////////////////

// Category Table
var selectCategoryStatement = WL.Server.createSQLStatement("select * from Category where idUser=?");
function getCategoryInfos(data) {
	WL.Logger.warn("getCategoryInfos: " + data);

	return WL.Server.invokeSQLStatement({
		preparedStatement : selectCategoryStatement,
		parameters : [data]
	});
}

var addCategoryStatement = WL.Server.createSQLStatement("insert into Category(name,idUser,idGeneralCategory) values (?, ?, ?)");
function addCategoryInfo(data) {
	WL.Logger.warn("add category data " + data);

	var arr = JSON.parse(data);
	return WL.Server.invokeSQLStatement({
		preparedStatement : addCategoryStatement,
		parameters : [ arr.name || "", arr.idUser, arr.idGeneralCategory]
	});
}

var updateCategoryStatement = WL.Server.createSQLStatement("update Category set name=? where idGeneralCategory=? and idUser=?");
function updateCategoryInfo(data) {
	WL.Logger.warn("update category data : " + data);

	var arr = JSON.parse(data);
	return WL.Server.invokeSQLStatement({
		preparedStatement : updateCategoryStatement,
		parameters : [ arr.name || "", arr.idGeneralCategory, arr.idUser]
	});
}

var deleteCategoryStatement = WL.Server.createSQLStatement("delete from Category where idGeneralCategory=? and idUser=?");
function deleteCategoryInfo(data) {
	WL.Logger.warn("delete category data : " + data);

	var arr = JSON.parse(data);
	return WL.Server.invokeSQLStatement({
		preparedStatement : deleteCategoryStatement,
		parameters : [ arr.idGeneralCategory, arr.idUser ]
	});
}

// ////////////////////////////////////////////////////////////////////////////////////////
// ////////////////////////////////////////////////////////////////////////////////////////

// User Table
var selectUserStatement = WL.Server.createSQLStatement("select * from User where idGeneralUser=?");
function getUserInfos(data) {
	WL.Logger.warn("getUserInfos : " + data);

	return WL.Server.invokeSQLStatement({
		preparedStatement : selectUserStatement,
		parameters : [data]
	});
}

var findUserStatement = WL.Server.createSQLStatement("select * from User where email=? and password=?");
function findUser(email, password) {
	WL.Logger.warn("getUserInfos : " + email + " " + password);

	return WL.Server.invokeSQLStatement({
		preparedStatement : findUserStatement,
		parameters : [email, password]
	});
}

var addUserStatement = WL.Server.createSQLStatement("insert into User(name, password, email, birth, idGeneralUser) values (?, ?, ?, ?, ?)");
function addUserInfo(data) {
	WL.Logger.warn("add user data " + data);

	var arr = JSON.parse(data);
	return WL.Server.invokeSQLStatement({
		preparedStatement : addUserStatement,
		parameters : [ arr.name||"", arr.password||"", arr.email||"", arr.birth||"", arr.idGeneralUser]
	});
}

var updateUserStatement = WL.Server.createSQLStatement("update User set name=?, password=?, email=?, birth=? where idGeneralUser=?");
function updateUserInfo(data) {
	WL.Logger.warn("update user data : " + data);

	var arr = JSON.parse(data);
	return WL.Server.invokeSQLStatement({
		preparedStatement : updateUserStatement,
		parameters : [ arr.name||"", arr.password||"", arr.email||"", arr.birth||"", arr.idGeneralUser ]
	});
}

var deleteUserStatement = WL.Server.createSQLStatement("delete from User where idGeneralUser=?");
function deleteUserInfo(data) {
	WL.Logger.warn("delete user data : " + data);

	var arr = JSON.parse(data);
	return WL.Server.invokeSQLStatement({
		preparedStatement : deleteUserStatement,
		parameters : [ arr.idGeneralUser]
	});
}

