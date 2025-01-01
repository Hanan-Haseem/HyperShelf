/*=============== Loader ===============*/
function loader(){
  document.querySelector('.loader-container').classList.add('active');
}

function fadeOut(){
  setTimeout(loader,4000);
}
/*=============== SEARCH ===============*/
const searchButton = document.getElementById("search-button"),
  searchClose = document.getElementById("search-close"),
  searchContent = document.getElementById("search-content");

  // Function to clear the search results
function clearSearchResults() {
  document.getElementById('searchQuery').value = ''; // Clear the search input
  document.getElementById('search-results').innerHTML = ''; // Clear the results
}

// Attach event listeners to the close button or page navigation logic
document.getElementById('search-close').addEventListener('click', () => {
  clearSearchResults(); // Clear results when closing the search
});

window.addEventListener('load', () => {
  clearSearchResults(); // Clear search results on page load
});




// Book search logic
async function searchBooks(event) {
  event.preventDefault(); // Prevent form from refreshing the page
  
  const searchQuery = document.getElementById('searchQuery').value.trim(); // Get the search input value
  const apiKey = 'AIzaSyAc3nado7bK5H7aC7uRznf-5aMZdkK2GjM'; // Replace with your actual API key
  const apiUrl = `https://www.googleapis.com/books/v1/volumes?q=${searchQuery}&key=${apiKey}`;
  
  // Clear previous search results before starting the new search
  const searchResults = document.getElementById("search-results");
  searchResults.innerHTML = '';

  // If the search query is empty, do nothing
  if (searchQuery === "") {
    return;
  }

  try {
    const response = await fetch(apiUrl); // Make the API request
    const data = await response.json(); // Parse the JSON response
    
    if (data.items && data.items.length > 0) {
      displayBooks(data.items); // Display books if there are any results
    } else {
      showNoBooksFoundMessage(); // Show the "No Books Found" message if no books are found
    }
  } catch (error) {
    console.error('Error fetching books:', error);
    showNoBooksFoundMessage(); // Show the "No Books Found" message in case of an error
  }
}

// Function to display books in the results section
function displayBooks(books) {
  const searchResults = document.getElementById("search-results");

  // Loop through the books and display each one
  books.forEach(book => {
    const bookItem = document.createElement("div");
    bookItem.classList.add("book-item");

    // Create book image container and image
    const bookImageContainer = document.createElement("div");
    bookImageContainer.classList.add("book-image-container");
    const bookImage = document.createElement("img");
    bookImage.classList.add("book-image");
    bookImage.src = book.volumeInfo.imageLinks ? book.volumeInfo.imageLinks.thumbnail : 'default-image.jpg'; // Use default image if not available
    bookImageContainer.appendChild(bookImage);

    // Create book information container
    const bookInfo = document.createElement("div");
    bookInfo.classList.add("book-info");

    // Book title
    const bookTitle = document.createElement("h3");
    bookTitle.classList.add("book-title");
    bookTitle.textContent = book.volumeInfo.title;

    // Book authors
    const bookAuthors = document.createElement("p");
    bookAuthors.classList.add("book-authors");
    bookAuthors.textContent = book.volumeInfo.authors ? book.volumeInfo.authors.join(', ') : 'Unknown Author';

    // Book publication date
    const bookDate = document.createElement("p");
    bookDate.classList.add("book-date");
    bookDate.textContent = book.volumeInfo.publishedDate || 'No publication date';

    // Read more link
    const readMore = document.createElement("a");
    readMore.classList.add("read-more");
    readMore.href = book.volumeInfo.infoLink;
    readMore.target = "_blank";
    readMore.textContent = "Read More";

    // Append elements to book item
    bookInfo.appendChild(bookTitle);
    bookInfo.appendChild(bookAuthors);
    bookInfo.appendChild(bookDate);
    bookInfo.appendChild(readMore);

    bookItem.appendChild(bookImageContainer);
    bookItem.appendChild(bookInfo);

    searchResults.appendChild(bookItem); // Add the book item to the search results

    
  });
}

// Function to display the "No Books Found" message
function showNoBooksFoundMessage() {
  const searchResults = document.getElementById("search-results");
  searchResults.innerHTML = ''; // Clear any previous search results

  // Create and display a "No Books Found" message
  const message = document.createElement("div");
  message.classList.add("no-results-message");
  message.textContent = "No books found. Please try another search.";
  searchResults.appendChild(message);
}


// Function to display books in the results section
function displayBooks(books) {
  const resultsContainer = document.getElementById('search-results');
  resultsContainer.innerHTML = ''; // Clear previous results
  
  books.forEach(book => {
    const bookInfo = book.volumeInfo;
    const bookElement = document.createElement('div');
    bookElement.classList.add('book-item');
    
    bookElement.innerHTML = `
      <img src="${bookInfo.imageLinks ? bookInfo.imageLinks.thumbnail : ''}" alt="${bookInfo.title}" class="book-image" />
      <h3>${bookInfo.title}</h3>
      <p>${bookInfo.authors ? bookInfo.authors.join(', ') : 'Unknown Author'}</p>
      <p>${bookInfo.publishedDate}</p>
      <a href="${bookInfo.infoLink}" target="_blank">Read More</a>
    `;
    
    resultsContainer.appendChild(bookElement);
  });
}

// Search button click event to start searching
if (searchButton) {
  searchButton.addEventListener("click", searchBooks);
}

// Close search functionality
if (searchClose) {
  searchClose.addEventListener("click", () => {
    searchContent.classList.remove("show-search");
  });
}

// Show search modal on search button click
if (searchButton) {
  searchButton.addEventListener("click", () => {
    searchContent.classList.add("show-search");
  });
}


/*=============== LOGIN ===============*/
const loginButton = document.getElementById("login-button"),
  loginClose = document.getElementById("login-close"),
  loginContent = document.getElementById("login-content");

// Login Show
if (loginButton) {
  loginButton.addEventListener("click", () => {
    loginContent.classList.add("show-login");
  });
}

// Login hidden
if (loginClose) {
  loginClose.addEventListener("click", () => {
    loginContent.classList.remove("show-login");
  });
}

/*=============== ADD SHADOW HEADER ===============*/
const shadowHeader = () => {
  const header = document.getElementById("header");
  this.scrollY >= 50
    ? header.classList.add("shadow-header")
    : header.classList.remove("shadow-header");
};
window.addEventListener("scroll", shadowHeader);

/*=============== HOME SWIPER ===============*/
let swiperHome = new Swiper(".home__swiper", {
  loop: true,
  spaceBetween: -24,
  grabCursor: true,
  slidesPerView: "auto",
  centeredSlides: "auto",

  autoplay: {
    delay: 3000,
    disableOnInteraction: false,
  },

  breakpoints: {
    1220: {
      spaceBetween: -32,
    },
  },
});

/*=============== FEATURED SWIPER ===============*/
let swiperFeatured = new Swiper(".featured__swiper", {
  loop: true,
  spaceBetween: 16,
  grabCursor: true,
  slidesPerView: "auto",
  centeredSlides: "auto",

  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },

  breakpoints: {
    1150: {
      slidesPerView: 4,
      centeredSlides: false,
    },
  },
});

/*=============== NEW SWIPER ===============*/
let swiperNew = new Swiper(".new__swiper", {
  loop: true,
  spaceBetween: 16,
  slidesPerView: "auto",

  breakpoints: {
    1150: {
      slidesPerView: 3,
    },
  },
});

/*=============== TESTIMONIAL SWIPER ===============*/
let swiperTestimonial = new Swiper(".testimonial__swiper", {
  loop: true,
  spaceBetween: 16,
  grabCursor: true,
  slidesPerView: "auto",
  centeredSlides: "auto",

  breakpoints: {
    1150: {
      slidesPerView: 3,
      centeredSlides: false,
    },
  },
});

/*=============== SHOW SCROLL UP ===============*/
const scrollUp = () => {
  const scrollUp = document.getElementById("scroll-up");
  // when the scroll is higher than 350 viewport height, add the
  this.scrollY >= 350
    ? scrollUp.classList.add("show-scroll")
    : scrollUp.classList.remove("show-scroll");
};
window.addEventListener("scroll", scrollUp);

/*=============== SCROLL SECTIONS ACTIVE LINK ===============*/
const sections = document.querySelectorAll("section[id]");
const scrollActive = () => {
  const scrollDown = window.scrollY;

  sections.forEach((current) => {
    const sectionHeight = current.offsetHeight,
      sectionTop = current.offsetTop - 58,
      sectionId = current.getAttribute("id"),
      sectionsClass = document.querySelector(
        ".nav__menu a[href*=" + sectionId + "]"
      );

    if (scrollDown > sectionTop && scrollDown <= sectionTop + sectionHeight) {
      sectionsClass.classList.add("active-link");
    } else {
      sectionsClass.classList.remove("active-link");
    }
  });
};
window.addEventListener("scroll", scrollActive);

/*=============== DARK LIGHT THEME ===============*/
const themeButton = document.getElementById("theme-button");
const darkTheme = "dark-theme";
const iconTheme = "ri-sun-line";

// Previously selected topic (if user selected)
const selectedTheme = localStorage.getItem("selected-theme");
const selectedIcon = localStorage.getItem("selected-icon");

// we obtain the current theme that the interface has by validating the dark-theme class
const getCurrentTheme = () =>
  document.body.classList.contains(darkTheme) ? "dark" : "light";
const getCurrentIcon = () =>
  themeButton.classList.contains(iconTheme) ? "ri-moon-line" : "ri-sun-line";

// we validate if the user previously chose a topic
if (selectedTheme) {
  // if the validation is fulfilled, we ask what the issue was to know if we activated or deactivated the dark
  document.body.classList[selectedTheme === "dark" ? "add" : "remove"](
    darkTheme
  );
  themeButton.classList[selectedIcon === "ri-moon-line" ? "add" : "remove"](
    iconTheme
  );
}

// Activate / deactivate the theme manually with the button
themeButton.addEventListener("click", () => {
  // add or remove the dark / icon theme
  document.body.classList.toggle(darkTheme);
  themeButton.classList.toggle(iconTheme);
  // we save the theme and current icon that the user chose
  localStorage.setItem("selected-theme", getCurrentTheme());
  localStorage.setItem("selected-icon", getCurrentIcon());
});

/*=============== SCROLL REVEAL ANIMATION ===============*/
const sr = ScrollReveal({
  origin: "top",
  distance: "60px",
  duration: 2500,
  delay: 400,
  // reset: true, //Animations repeat
});

sr.reveal(
  `.home__data, .featured__container, .new__container, .join__data, 
  .testimonial__container, .footer`
);
sr.reveal(`.home__images`, { delay: 600 });
sr.reveal(`.services__card`, { interval: 100 });
sr.reveal(`.discount__data`, { origin: "left" });
sr.reveal(`.discount__images`, { origin: "right" });



// Function to clear the search results when the search tab is closed
if (searchClose) {
  searchClose.addEventListener("click", () => {
    searchContent.classList.remove("show-search");
    clearSearchResults(); // Clear the results when closing the search tab
  });
}

// Function to clear the search results
function clearSearchResults() {
  const resultsContainer = document.getElementById('search-results');
  resultsContainer.innerHTML = ''; // Clear previous search results
}

// Function to display books in the results section
function displayBooks(books) {
  const resultsContainer = document.getElementById('search-results');
  resultsContainer.innerHTML = ''; // Clear previous results

  books.forEach(book => {
    const bookInfo = book.volumeInfo;
    const bookElement = document.createElement('div');
    bookElement.classList.add('book-item');
    
    // Book HTML structure
    bookElement.innerHTML = `
      <div class="book-image-container">
        <img src="${bookInfo.imageLinks ? bookInfo.imageLinks.thumbnail : ''}" alt="${bookInfo.title}" class="book-image" />
      </div>
      <div class="book-info">
        <h3 class="book-title">${bookInfo.title}</h3>
        <p class="book-authors">${bookInfo.authors ? bookInfo.authors.join(', ') : 'Unknown Author'}</p>
        <p class="book-date">${bookInfo.publishedDate}</p>
        <a href="${bookInfo.infoLink}" target="_blank" class="read-more">Read More</a>
      </div>
    `;
    
    resultsContainer.appendChild(bookElement);
  });
}

window.addEventListener("load", () => {
  const loader = document.getElementById("loader");
  loader.classList.add("hidden"); // Hide the loader after the page has loaded
});
