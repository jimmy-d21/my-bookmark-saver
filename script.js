// DOM Elements
const bookmarkNameInput = document.getElementById("bookmark-name");
const bookmarkUrlInput = document.getElementById("bookmark-url");
const bookmarkAddButton = document.getElementById("add-bookmark-btn");
const bookmarkList = document.getElementById("bookmark-list");

// Event Listener
bookmarkAddButton.addEventListener("click", addBookmark);

function addBookmark() {
  const name = bookmarkNameInput.value.trim();
  const url = bookmarkUrlInput.value.trim();

  if (!name || !url) {
    alert("Please provide both name and URL.");
    return;
  } else if (!url.startsWith("http://") && !url.startsWith("https://")) {
    alert("Please provide a valid URL.");
    return;
  }

  const bookmark = { name, url };

  const success = saveLocalBookmarks(bookmark);
  if (!success) return; // If duplicate, abort

  createBookmarkElement(bookmark);
  bookmarkNameInput.value = "";
  bookmarkUrlInput.value = "";
}

function createBookmarkElement(bookmark) {
  const li = document.createElement("li");
  const link = document.createElement("a");
  const removeBtn = document.createElement("button");

  link.href = bookmark.url;
  link.target = "_blank";
  link.textContent = bookmark.name;

  removeBtn.textContent = "Remove";
  removeBtn.addEventListener("click", () => {
    deleteBookmark(bookmark, li);
  });

  li.appendChild(link);
  li.appendChild(removeBtn);
  bookmarkList.appendChild(li);
}

function getLocalBookmarks() {
  return JSON.parse(localStorage.getItem("bookmarks")) || [];
}

function saveLocalBookmarks(bookmark) {
  let bookmarks = getLocalBookmarks();

  const duplicate = bookmarks.find(
    (b) => b.name === bookmark.name && b.url === bookmark.url
  );
  if (duplicate) {
    alert("Bookmark already exists.");
    return false;
  }

  bookmarks.push(bookmark);
  localStorage.setItem("bookmarks", JSON.stringify(bookmarks));
  return true;
}

function renderBookmarks() {
  const bookmarks = getLocalBookmarks();
  bookmarks.forEach((bookmark) => createBookmarkElement(bookmark));
}

function deleteBookmark(bookmark, element) {
  let bookmarks = getLocalBookmarks();
  bookmarks = bookmarks.filter(
    (b) => b.name !== bookmark.name || b.url !== bookmark.url
  );
  localStorage.setItem("bookmarks", JSON.stringify(bookmarks));
  if (element) {
    element.remove();
  }
}

// Initial render on page load
renderBookmarks();
