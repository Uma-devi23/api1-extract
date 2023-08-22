document.addEventListener("DOMContentLoaded", () => {
    const bookList = document.getElementById("book-list");

    async function fetchBooks() {
        try {
            const response = await fetch("https://www.googleapis.com/books/v1/volumes?q=javascript");
            const data = await response.json();
            return data.items;
        } catch (error) {
            console.error("Error fetching books:", error);
            return [];
        }
    }

    async function displayBooks() {
        const books = await fetchBooks();
        const booksHtml = books.map(book => `
            <div class="list-group-item">
                <h3>${book.volumeInfo.title}</h3>
                <p>Author(s): ${book.volumeInfo.authors ? book.volumeInfo.authors.join(", ") : "N/A"}</p>
                <p>Published: ${book.volumeInfo.publishedDate || "N/A"}</p>
            </div>
        `).join("");

        bookList.innerHTML = booksHtml;
    }

    displayBooks();
});
