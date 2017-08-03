currentPage = {};
path = "";
currentPage.init = function() {
    WL.Logger.debug("Edit Category :: init");
    $("#header_text").html("Edit Category");

    if (edit_new_cat == "edit") {
        WL.CategoryCollection.findQuery({
            _id: cat_id
        }, function(res) {
            if (res.result == "YES") {
                $("#txt_cat_name").val(res.list[0].json.name);
            }
        });
    }
};
$("#btn_cat_save").unbind('click').click(function() {
    WL.Logger.debug("Edit_New Category :: saveClicked");

    var _name = $("#txt_cat_name").val() || "";
    if (_name === "") {
        WL.SimpleDialog.show("Category", "Name Cannot be empty", [{
            text: 'OK'
        }]);
        return;
    }
    var data = {
        name: _name
    };
    if (edit_new_cat == "new") {
        WL.Logger.debug("Edit Category :: add");
        WL.CategoryCollection.add(data, function(res) {
            if (res.result == "YES") {
                WL.SimpleDialog.show("Category", "Category Added Succesfully", [{
                    text: 'OK'
                }]);
            } else {
                WL.SimpleDialog.show("Category", "Cannot Add Category", [{
                    text: 'OK'
                }]);
            }
        });
    } else {
        WL.Logger.debug("Edit Category :: edit " + cat_id);
        data._id = cat_id;
        WL.CategoryCollection.update(data, function(res) {
            if (res.result == "YES") {
                WL.SimpleDialog.show("Category", "Category Updated Succesfully", [{
                    text: 'OK'
                }]);
            } else {
                WL.SimpleDialog.show("Category", "Cannot Edit Category", [{
                    text: 'OK'
                }]);
            }
        });
    }
    $("#pagePort").load(pagesHistory.pop(), function() {
        if (currentPage.init) {
            currentPage.init();
        }
    });

});