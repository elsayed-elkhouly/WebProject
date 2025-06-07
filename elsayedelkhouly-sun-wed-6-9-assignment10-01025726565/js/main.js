var siteName = document.getElementById("siteName");
var siteUrl = document.getElementById("siteUrl");
var urlAlert = document.getElementById("urlAlert");

var bookmarksList = [];

if (localStorage.getItem("bookmarksContainer") != null) {
    bookmarksList = JSON.parse(localStorage.getItem("bookmarksContainer"));
    displayData();
}

function addUrl() {
    if (validateName() == false || validateUrl() == false) {
        alert("Site Name or Url is not valid, Please follow the rules below :\n\nSite name must contain at least 3 characters\nSite URL must be a valid one");
        return;
    }

    var bookmarks = {
        name: siteName.value,
        url: siteUrl.value
    };
    bookmarksList.push(bookmarks);
    displayData();
    clearInput();
    localStorage.setItem("bookmarksContainer", JSON.stringify(bookmarksList));
}

function clearInput() {
    siteName.value = '';
    siteUrl.value = '';
    siteName.classList.remove("is-valid");
    siteUrl.classList.remove("is-valid");
    urlAlert.classList.add("d-none");
}

function displayData() {
    var cartona = "";
    for (var i = 0; i < bookmarksList.length; i++) {
        cartona += `<tr>
                        <td>${i + 1}</td>
                        <td>${bookmarksList[i].name}</td>
                        <td>
                            <a href="${bookmarksList[i].url}" target="_blank">
                                <button class="bg-success text-light border-0 rounded-2 p-2">
                                    <i class="fa-solid fa-eye"></i> Visit
                                </button>
                            </a>
                        </td>
                        <td>
                            <button class="bg-danger text-light border-0 rounded-2 p-2" onclick="deleteBookmark(${i})">
                                <i class="fa-solid fa-trash"></i> Delete    
                            </button>
                        </td>
                    </tr>`
    }
    document.getElementById("bookmark").innerHTML = cartona;
}

function deleteBookmark(index) {
    bookmarksList.splice(index, 1);
    localStorage.setItem("bookmarksContainer", JSON.stringify(bookmarksList));
    displayData();
}

function validateName() {
    var regex = /[a-z]{3,}$/i;

    if (regex.test(siteName.value)) {
        siteName.classList.remove("is-invalid");
        siteName.classList.add("is-valid");
        return true;
    } else {
        siteName.classList.remove("is-valid");
        siteName.classList.add("is-invalid");
        return false;
    }
}

function validateUrl() {
    var regex = /^(https?:\/\/)?(www\.)?[a-z0-9\-]+(\.[a-z]{2,})(\/.*)?$/i;

    if (regex.test(siteUrl.value)) {
        siteUrl.classList.remove("is-invalid");
        siteUrl.classList.add("is-valid");
        urlAlert.classList.add("d-none");
        return true;
    } else {
        siteUrl.classList.remove("is-valid");
        siteUrl.classList.add("is-invalid");
        urlAlert.classList.remove("d-none");
        return false;
    }
}
