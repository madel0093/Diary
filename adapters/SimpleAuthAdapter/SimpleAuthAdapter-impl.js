/*
 *  Licensed Materials - Property of IBM
 *  5725-G92 (C) Copyright IBM Corp. 2011, 2014. All Rights Reserved.
 *  US Government Users Restricted Rights - Use, duplication or
 *  disclosure restricted by GSA ADP Schedule Contract with IBM Corp.
 */

function onAuthRequired(headers, errorMessage) {
	errorMessage = errorMessage ? errorMessage : null;
	return {
		authRequired : true,
		errorMessage : errorMessage
	};
}

function submitAuthentication(username, password) {
	var invocationData = {
		adapter : 'DiaryMySQL',
		procedure : 'findUser',
		parameters : [ username, password]
	};

	var result = WL.Server.invokeProcedure(invocationData);
	WL.Logger.warn("invoke result ");
	WL.Logger.warn(result);
	
	if (Array.isArray(result.resultSet) && result.resultSet.length > 0) {
		var userIdentity = {
			userId : username,
			displayName : username,
		};
		WL.Server.setActiveUser("SimpleAuthRealm", userIdentity);
		return {
			authRequired : false,
			userGeneralID : result.resultSet[0].userGeneralID
		};
	}
	return onAuthRequired(null, "Invalid login credentials" + username + " " + password);

}

function requestForData() {
	return {
		secretData : "You can only see this if you are logged in"
	};
}

function onLogout() {
	WL.Server.setActiveUser("SimpleAuthRealm", null);
	WL.Logger.debug("Logged out");
}
