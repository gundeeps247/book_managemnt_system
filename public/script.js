const bookList = document.getElementById('bookList');
const bookTitleInput = document.getElementById('bookTitle');
let books = [];

function addBook() {
  const bookTitle = bookTitleInput.value.trim();
  if (bookTitle === '') {
    return;
  }

  books.push(bookTitle);
  bookTitleInput.value = '';
}

function updateBookList() {
  bookList.innerHTML = '';
  books.forEach(book => {
    const listItem = document.createElement('li');
    listItem.textContent = book;
    bookList.appendChild(listItem);
  });
}

function displayList() {
  updateBookList();
}

function clearList() {
  books = [];
  bookList.innerHTML = '';
}

// function saveList() {
//   const data = JSON.stringify(books);
//   const blob = new Blob([data], { type: 'application/json' });
//   const url = URL.createObjectURL(blob);
//   const a = document.createElement('a');
//   a.href = url;
//   a.download = 'favorite_books.json';
//   a.click();
// }

function downloadList() {
  const data = JSON.stringify(books);
  const blob = new Blob([data], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = 'favorite_books.json';
  a.click();
}




// function displayAllBooks() {
//   fetch('/getAllBooks')
//     .then(response => response.json())
//     .then(data => {
//       books = data;
//       updateBookList();
//     })
//     .catch(error => {
//       console.error('Error fetching all books:', error);
//     });
// }


// ... (Existing code)

function saveList() {
  fetch('/saveList', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ books })
  })
    .then(response => {
      if (response.ok) {
        console.log('List saved successfully.');
      } else {
        console.error('Failed to save the list.');
      }
    })
    .catch(error => {
      console.error('Error saving the list:', error);
    });
}

function displayAllBooks() {
  fetch('/getAllBooks')
    .then(response => response.json())
    .then(data => {
      books = data;
      updateBookList();
    })
    .catch(error => {
      console.error('Error fetching all books:', error);
    });
}

// ... (Existing code)