currentPage = {};

currentPage.init = function() {
    WL.Logger.debug("mainPage :: init");

    (function(WL, jQuery, lodash) {

        'use strict';

        //Dependencies
        var $ = jQuery,
            _ = lodash;

        //CONSTANTS
        var DIARY_COLLECTION_NAME = 'diary',
            KEY_VALUE_COLLECTION_NAME = 'keyvalue',
            INIT_FIRST_MSG = 'PERSISTENT_STORE_NOT_OPEN',
            TITLE_FIELD_EMPTY_MSG = 'Title field is empty',
            DESCRIPTION_FIELD_EMPTY_MSG = 'Description field is empty',
            ID_FIELD_EMPTY_MSG = 'Id field is empty',
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

        //Log messages to the console and status field
        var _logMessage = function(msg, id) {
            //Get reference to the status field
            var status = _.isUndefined(id) ? $('div#status-field') : $(id);

            //Put message in the status div
            status.text(msg);

            //Log message to the console
            WL.Logger.info(msg);
        };

        //Show JSONStore document in a table
        var _showTable = function(arr) {

            if (_.isArray(arr) && arr.length < 1) {
                return _logMessage(EMPTY_TABLE_MSG);
            }

            //Log to the console
            WL.Logger.ctx({
                stringify: true,
                pretty: true
            }).info(arr);

            var
            //Get reference to the status field
                status = $('div#status-field'),

                //Table HTML template
                table = [
                    '<table id="user_table" >',
                    '<tr>',
                    '<td><b>_id</b></td>',
                    '<td><b>id</b></td>',
                    '<td><b>title</b></td>',
                    '<td><b>description</b></td>',
                    '<td><b>datetime</b></td>',
                    '<td><b>json</b></td>',
                    '</tr>',
                    '<% _.each(people, function(person) { %>',
                    '<tr>',
                    '<td> <%= person._id %> </td>',
                    '<td> <%= person.json.id %> </td>',
                    '<td> <%= person.json.title %> </td>',
                    '<td> <%= person.json.description %> </td>',
                    '<td> <%= person.json.datetime %> </td>',
                    '<td> <%= JSON.stringify(person.json) %> </td>',
                    '</tr>',
                    '<% }); %>',
                    '</table>'
                ].join(''),

                //Populate the HTML template with content
                html = _.template(table, {
                    people: arr
                });

            //Put the generated HTML table into the DOM
            status.html(html);
        };

        //Scroll to the top every time a button is clicked
        $('button').on('click', function() {
            $('html, body').animate({
                scrollTop: 0
            }, 'slow');
        });

        //init
        $('button#init').on('click', function() {
            WL.Logger.debug("mainPage :: initButton clicked");

            //Get references to the input fields DOM elements
            var usernameField = $('input#init-username'),
                passwordField = $('input#init-password');

            //Get values from the input fields
            var username = usernameField.val() || '',
                password = passwordField.val() || '';

            //Create the optional options object passed to init
            var options = {};

            //Check if a username was passed
            if (username.length > 0) {
                options.username = username;
            }

            //If if a password was passed
            if (password.length > 0) {
                options.password = password;
            }

            //JSONStore collections metadata
            var collections = {};

            //Define the 'diary' collection and list the search fields
            collections[DIARY_COLLECTION_NAME] = {

                searchFields: {
                    title: 'string'
                },

                //-- Start optional adapter metadata
                adapter: {
                    name: 'DiaryMySQL',
                    add: 'addDiaryInfo',
                    remove: 'deleteDiaryInfo',
                    replace: 'updateDiaryInfo',
                    load: {
                        procedure: 'getDiaryInfos',
                        params: [],
                        key: 'resultSet'
                    }
                }
                //-- End optional adapter metadata
            };

            //Define the 'keyvalue' collection and use additional search fields
            collections[KEY_VALUE_COLLECTION_NAME] = {
                searchFields: {},
                additionalSearchFields: {
                    key: 'string'
                }
            };

            //Initialize the people collection
            WL.JSONStore.init(collections, options)

            .then(function() {
                _logMessage(INIT_MSG);
                _callEnhanceToAddKeyValueMethods();
            })

            .fail(function(errorObject) {
                _logMessage(errorObject.msg);
            });
        });

        //destroy
        $('button#destroy').on('click', function() {

            //Destroy removes all documents, all collections, all stores
            //and every piece of JSONStore metadata
            WL.JSONStore.destroy()

            .then(function() {
                _logMessage(DESTROY_MSG);
            })

            .fail(function(errorObject) {
                _logMessage(errorObject.msg);
            });
        });

        //add
        $('button#add-data').on('click', function() {
            WL.Logger.debug("mainPage :: add-data clicked");
            //Get references to the input fields DOM elements
            var titleField = $('input#add-title'),
                descriptionField = $('textarea#add-description');

            //Get values from the input fields
            var title = titleField.val() || '',
                description = descriptionField.val() || '';

            //Prepare the data object
            var data = {};

            //Check if a title was passed
            if (title.length > 0) {
                data.title = title;
            }

            //Check if an description was passed
            if (description.length > 0) {
                data.description = description;
            }

            data.datetime = new Date().toISOString().slice(0, 19).replace('T', ' ');

            try {

                //Call add on the JSONStore collection
                WL.JSONStore.get(DIARY_COLLECTION_NAME).add(data)

                .then(function() {
                    _logMessage(ADD_MSG);
                })

                .fail(function(errorObject) {
                    _logMessage(errorObject.msg);
                });

                //Clear the input fields
                titleField.val('');
                descriptionField.val('');

            } catch (e) {
                _logMessage(INIT_FIRST_MSG);
            }

        });

        //find-name
        $('button#find-title').on('click', function() {

            //Get reference to the search field
            var searchFieldDOM = $('input#find-search-title');

            //Get value from the search field
            var searchField = searchFieldDOM.val() || '';

            //Create the query object
            var query = {};

            //Check if a title was passed
            if (searchField.length > 0) {
                query.title = searchField;
            }

            //Check if some value was passed
            if (_.isEmpty(query)) {
                return _logMessage(NAME_FIELD_EMPTY_MSG);
            }

            //Create optional options object
            var options = {};

            try {

                //Perform the search
                WL.JSONStore.get(DIARY_COLLECTION_NAME).find(query, options)

                .then(function(res) {
                    _showTable(res);
                })

                .fail(function(errorObject) {
                    _logMessage(errorObject.msg);
                });

                //Clear the input fields
                searchFieldDOM.val('');

            } catch (e) {
                _logMessage(INIT_FIRST_MSG);
            }
        });

        //find-all
        $('button#find-all').on('click', function() {

            //Create optional options object
            var options = {};

            try {

                //Alternative syntax:
                //WL.JSONStore.get(PEOPLE_COLLECTION_NAME).find({}, options)
                WL.JSONStore.get(DIARY_COLLECTION_NAME).findAll(options)

                .then(function(res) {
                    _showTable(res);
                })

                .fail(function(errorObject) {
                    _logMessage(errorObject.msg);

                });

            } catch (e) {
                _logMessage(INIT_FIRST_MSG);
            }
        });

        //find-by-id
        $('button#find-id-btn').on('click', function() {

            //Get reference to the id field
            var idField = $('input#find-id');

            //Get value from the search field
            var id = parseInt(idField.val(), 10) || '';

            //Check if an id was passed
            if (!_.isNumber(id)) {
                return _logMessage(ID_FIELD_EMPTY_MSG);
            }

            try {

                WL.JSONStore.get(DIARY_COLLECTION_NAME).findById(id)

                .then(function(res) {
                    _showTable(res);
                })

                .fail(function(errorObject) {
                    _logMessage(errorObject.msg);
                });

                //Clear the input fields
                idField.val('');

            } catch (e) {
                _logMessage(INIT_FIRST_MSG);
            }
        });

        //replace
        $('button#replace').on('click', function() {

            //Get references to the input fields DOM elements
            var titleField = $('input#replace-title'),
                descriptionField = $('textarea#replace-description'),
                idField = $('input#replace-id');

            //Get values from the input fields
            var title = titleField.val() || '',
                description = parseInt(descriptionField.val(), 10) || '',
                id = parseInt(idField.val(), 10) || '';

            //Check if an id was passed
            if (!_.isNumber(id)) {
                return _logMessage(ID_FIELD_EMPTY_MSG);
            }

            //Create the document object
            var doc = {
                _id: id,
                json: {}
            };

            //Check if a name was passed
            if (title.length > 0) {
                doc.json.title = title;
            }

            //Check if an description was passed
            if (description.length > 0) {
                doc.json.description = description;
            }
            doc.json.datetime = new Date().toISOString().slice(0, 19).replace('T', ' ');
            try {

                WL.JSONStore.get(DIARY_COLLECTION_NAME).replace(doc)

                .then(function() {
                    _logMessage(REPLACE_MSG);
                })

                .fail(function(errorObject) {
                    _logMessage(errorObject.msg);
                });

                //Clear the input fields
                titleField.val('');
                descriptionField.val('');
                idField.val('');

            } catch (e) {
                _logMessage(INIT_FIRST_MSG);
            }
        });

        //remove
        $('button#remove-id-btn').on('click', function() {

            //Get reference to the id field
            var idField = $('input#remove-id');

            //Get value from the search field
            var id = parseInt(idField.val(), 10) || '';

            //Check if an id was passed
            if (!_.isNumber(id)) {
                return _logMessage(ID_FIELD_EMPTY_MSG);
            }

            //Build the query object
            var query = {
                _id: id
            };

            //Build the options object, if exact: true
            //is not passed fuzzy searching is enabled
            //that means id: 1 will match 1, 10, 100, ...
            var options = {
                exact: true
            };

            try {

                WL.JSONStore.get(DIARY_COLLECTION_NAME).remove(query, options)

                .then(function(res) {
                    _logMessage(REMOVE_MSG + res);
                })

                .fail(function(errorObject) {
                    _logMessage(errorObject.msg);
                });

                //Clear the input fields
                idField.val('');

            } catch (e) {
                _logMessage(INIT_FIRST_MSG);
            }
        });

        //closeAll
        $('button#close').on('click', function() {

            WL.JSONStore.closeAll()

            .then(function() {
                _logMessage(CLOSE_ALL_MSG);
            })

            .fail(function(errorObject) {
                _logMessage(errorObject.msg);
            });
        });

        //load
        $('button#load').on('click', function() {

            try {

                WL.JSONStore.get(DIARY_COLLECTION_NAME).load()

                .then(function(res) {
                    _logMessage(LOAD_MSG + res);
                })

                .fail(function(errorObject) {
                    _logMessage(errorObject.msg);
                });

            } catch (e) {
                _logMessage(INIT_FIRST_MSG);
            }

        });

        //getPushRequired
        $('button#get-push-required').on('click', function() {

            try {

                WL.JSONStore.get(DIARY_COLLECTION_NAME).getPushRequired()

                .then(function(res) {
                    _showTable(res);
                })

                .fail(function(errorObject) {
                    _logMessage(errorObject.msg);
                });

            } catch (e) {
                _logMessage(INIT_FIRST_MSG);
            }

        });

        //push
        $('button#push').on('click', function() {

            try {

                WL.JSONStore.get(DIARY_COLLECTION_NAME).push()

                .then(function(res) {

                    if (_.isArray(res) && res.length < 1) {
                        //Got no errors pushing the adapter to the server
                        _logMessage(PUSH_MSG);

                    } else {
                        //The array contains error responses from the adapter
                        _logMessage(PUSH_MSG_FAILED + _.first(res).res.errorCode);
                    }

                })

                .fail(function(errorObject) {
                    _logMessage(errorObject.msg);
                });

            } catch (e) {
                _logMessage(INIT_FIRST_MSG);
            }

        });



    }(WL, WLJQ, WL_));

}; //end wlCommonInit