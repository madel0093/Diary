
/* JavaScript content from js/Categories.js in folder common */
currentPage = {};
path = "";
currentPage.init = function() {
    WL.Logger.debug("Main :: MyCategories :: init");
    $("#header_text").html("My Categories");


    WL.CategoryCollection.findQuery({}, function(res) {
        if (res.result != "YES")
            return;

        var html = "";
        for (var i = 0; i < res.list.length; i++) {
            var cat = res.list[i];

            html += "<label id=cat" + cat._id + ">" + cat.json.name + "</label>";
            html += '<button onclick="currentPage.editClick(' + cat._id + ');" type="submit" style="width: 100%; color: black" class="mblBlueButton" >Edit</button>';
            html += '<button onclick="currentPage.deleteClick(' + cat._id + ');" type="submit" style="width: 100%; color: black" class="mblBlueButton">Delete</button>';
        }
        $("#catList").html(html);
    });
};

$("#btn_newcat").unbind('click').click(function() {
    if (clicked) return;
    clicked = true;
    WL.Logger.debug("Categories :: addnewcatClick");

    edit_new_cat = "new";
    pagesHistory.push(path + "pages/Categories.html");
    $("#pagePort").load(path + "pages/editCategory.html", function() {
        $.getScript(path + "js/editCategory.js", function() {
            if (currentPage.init) {
                currentPage.init();
            }
        });
    });
    clicked = false;
});

currentPage.editClick = function(id) {
    if (clicked) return;
    clicked = true;
    WL.Logger.debug("Categories :: editClick");

    edit_new_cat = "edit";
    cat_id = id;

    pagesHistory.push(path + "pages/Categories.html");
    $("#pagePort").load(path + "pages/editCategory.html", function() {
        $.getScript(path + "js/editCategory.js", function() {
            if (currentPage.init) {
                currentPage.init();
            }
        });
    });
    clicked = false;
};

currentPage.deleteClick = function(id) {
    if (clicked) return;
    clicked = true;
    WL.Logger.debug("Categories :: deleteClick");

    WL.CategoryCollection.remove(id, function(res) {
        if (res.result == "YES") {
            WL.SimpleDialog.show("Category", "Category Removed Succesfully", [{
                text: 'OK'
            }]);

            $("#pagePort").load(path + "pages/Categories.html", function() {
                $.getScript(path + "js/Categories.js", function() {
                    if (currentPage.init) {
                        currentPage.init();
                    }
                });
            });
        } else {
            WL.SimpleDialog.show("Category", "Cannot Remove Category", [{
                text: 'OK'
            }]);
        }
    });
    clicked = false;
};