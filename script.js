// Dom
const bookmarkNameInput = document.getElementById("bookmark-name");
const bookmarkUrlInput = document.getElementById("bookmark-url");
const bookmarkAddButton = document.getElementById("add-bookmark-btn");
const bookmarkList = document.getElementById("bookmark-list");


// Event Listeners
bookmarkAddButton.addEventListener("click", addBookmark);

function addBookmark() {
    const name = bookmarkNameInput.value.trim();
    const url = bookmarkUrlInput.value.trim();

    if(!name || !url) {
        alert("Please provide both name and URL.");
        return;
    } else if(!name.startsWith("http://") && !url.startsWith("https://")) {
        alert("Please provide a valid URL.");
        return;
    }

    const bookmark = {
        name,
        url
    }
   console.log(bookmark);
    bookmarkNameInput.value = "";
    bookmarkUrlInput.value = "";
}

