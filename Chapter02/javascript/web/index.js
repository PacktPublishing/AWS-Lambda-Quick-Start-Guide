// api client
var apigClient = apigClientFactory.newClient();

// init page with items in random order
// (for retrieving an ordered list, we need to change the data model
// to use hash key and range key and perform a query on the dynamodb table)
getAllArticles();

// jquery event listener
$("#createArticleBtn").click(function() {
    var text = $("#articleText").val();
    createArticle(text);
});

function createArticle(text) {
    var params = {};
    var body = {
        "text": text
    };
    var additionalParams = {};

    apigClient.articlesPost(params, body, additionalParams)
        .then(function(result) {
            console.log(result);
            getAllArticles();
        }).catch(function(error) {
            console.log("error", error);
        });
}

function updateArticle(id, text) {
    var body = {
        "article_id": id,
        "text": text
    };
    apigClient.articlesPut({}, body, {})
        .then(function(result) {
            console.log(result);
            // render updated list item
            $("#txt-" + id).html(text);
        }).catch(function(error) {
            console.log("error", error);
        });
}

function deleteArticle(id) {
    var body = {
        "article_id": id
    };
    apigClient.articlesDelete({}, body, {})
        .then(function(result) {
            console.log(result);
            $("#li-" + id + "").fadeOut();
        }).catch(function(error) {
            console.log("error", error);
        });
};

function getAllArticles() {
    apigClient.articlesGet({}, {}, {})
        .then(function(result) {
            console.log(result);
            $("#articleList").empty();
            for (var i = 0; i < result.data.length; i++) {
                var id = result.data[i].article_id;
                var liId = "id=\"li-" + id;
                var text = "<p id=\"txt-" + id + "\">" + result.data[i].text + " </p>";
                var updateInput = "<input id=\"upIn-" + id + "\" type=\"text\"></input>";
                var updateBtn = "<button class=\"updateBtn\" id=\"upBtn-" + id + "\" type=\"button\">Update</button>";
                var delBtn = "<button class=\"deleteBtn\" id=\"dlBtn-" + id + "\" type=\"button\">Delete</button>";
                $("#articleList").append("<li " + liId + "\">" + text + updateInput + updateBtn + delBtn + "</li>");
            }
            // jquery event listeners
            $(".updateBtn").click(function(event) {
                console.log(event.target.id);
                // Strip off the "upBtn-" substring
                var id = event.target.id.substring(6);
                var text = $("#upIn-" + id).val();
                updateArticle(id, text);
            });
            $(".deleteBtn").click(function(event) {
                console.log(event.target.id);
                // Strip off the "dlBtn-" substring
                var id = event.target.id.substring(6);
                deleteArticle(id);
            });
        }).catch(function(error) {
            console.log("error", error);
        });
}
