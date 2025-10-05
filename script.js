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

  if (!name || !url) {
    alert("Please provide both name and URL.");
    return;
  } else if (!name.startsWith("http://") && !url.startsWith("https://")) {
    alert("Please provide a valid URL.");
    return;
  }

  const bookmark = {
    name,
    url,
  };
  saveLocalBookmarks(bookmark);
  createBookmarkElement(bookmark);
  bookmarkNameInput.value = "";
  bookmarkUrlInput.value = "";
}

function createBookmarkElement(bookmark) {
  const li = document.createElement("li");
  const links = document.createElement("a");
  const removeBtn = document.createElement("button");

  links.href = bookmark.url;
  links.target = "_blank";
  links.textContent = bookmark.name;

  removeBtn.textContent = "Remove";
  li.appendChild(links);
  li.appendChild(removeBtn);
  bookmarkList.appendChild(li);
}

function getLocalBookmarks() {
  const bookmarks = JSON.parse(localStorage.getItem("bookmarks")) || [];
  return bookmarks;
}

function saveLocalBookmarks(bookmark) {
  let bookmarks = getLocalBookmarks();
  bookmarks.push({
    name: bookmark.name,
    url: bookmark.url,
  });
  localStorage.setItem("bookmarks", JSON.stringify(bookmarks));
}

function renderBookmarks() {
  const bookmarks = getLocalBookmarks();
  bookmarks.forEach((bookmark) => createBookmarkElement(bookmark));
}
renderBookmarks();
