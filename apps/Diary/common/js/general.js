var KEY_VALUE_COLLECTION_NAME = 'keyvalue',
	INIT_FIRST_MSG = 'PERSISTENT_STORE_NOT_OPEN',
	EMPTY_TABLE_MSG = 'No documents found',
	DESTROY_MSG = 'Destroy finished succesfully',
	INIT_MSG = 'Collection initialized',
	ADD_MSG = 'Data added to the collection',
	REPLACE_MSG = 'Document replaced succesfully, call find.',
	REMOVE_MSG = 'Documents removed: ',
	CLOSE_ALL_MSG = 'JSONStore closed',
	LOAD_MSG = 'New documents loaded from adapter: ',
	PUSH_MSG_FAILED = 'Could not push some docs, res: ',
	PUSH_MSG = 'Push finished',
	REMOVE_COLLECTION_MSG = 'Removed all data in the collection';

var userGeneralID = "";


function guid(){
	function s4() {
		return Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1);
	}
	return s4() + s4() + '-' + s4() + '-' + s4() + '-' + s4() + '-' + s4() + s4() + s4();
}

function ongComplete(status) {
	
}
function ongError(status) {
	
}
