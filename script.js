const searchInput = document.getElementById('search-input');
const movieListSection = document.getElementById('movie-list');
const movieDetailsSection = document.getElementById('movie-details');
const movieDetail = document.getElementById('movie-detail');
const goBackButton = document.getElementById('go-back');
const notificationPopup = document.getElementById('notification-popup');
// Function to search for movies as the user types
searchInput.addEventListener('input', () => {
    const searchTerm = searchInput.value.trim();
    if (searchTerm) {
        searchMovies(searchTerm);
    }
});

// Function to fetch a list of movies based on search 
async function searchMovies(searchTerm) {
    try {
        const response = await fetch(`http://www.omdbapi.com/?s=${searchTerm}&apikey=92980800`);
        const data = await response.json();

        if (data.Search) {
            const movies = data.Search;

            movieListSection.innerHTML = '';

            movies.forEach(async (movie) => {
                // Create a movie element for each movie
                const movieElement = document.createElement('div');
                movieElement.classList.add('movie');
                movieElement.innerHTML = `
                    <img src="${movie.Poster}" alt="${movie.Title} Poster">
                    <h2>${movie.Title}</h2>
                    <p>Year: ${movie.Year}
                    <button class="favorite-button">Favorite</button>
                `;

                // Add a click event to view movie details
                movieElement.addEventListener('click', () => showMovieDetails(movie.imdbID));

                // Add a click event to add the movie to favorites
                const favoriteButton = movieElement.querySelector('.favorite-button');
                favoriteButton.addEventListener('click', (event) => {
                    event.stopPropagation(); // Prevent the click event from bubbling to the parent element
                    addMovieToFavorites(movie);
                });

                movieListSection.appendChild(movieElement);
            });
        } else {
            movieListSection.innerHTML = 'No movies found.';
        }
    } catch (error) {
        console.error('Error fetching movies:', error);
    }
}

// Function to fetch and display movie details
async function showMovieDetails(imdbID) {
    try {
        const detailsResponse = await fetch(`http://www.omdbapi.com/?i=${imdbID}&apikey=92980800`);
        const detailsData = await detailsResponse.json();

        // Create a detailed view of the movie
        const movieDetailContent = `
            <h2>${detailsData.Title}</h2>
            <p>Year: ${detailsData.Year}</p>
            <p>Plot: ${detailsData.Plot}</p>
            <img src="${detailsData.Poster}" alt="${detailsData.Title} Poster">
            <button class="favorite-button">Favorite</button>
        `;

        // Display movie details and show the details section
        movieDetail.innerHTML = movieDetailContent;
        movieDetailsSection.style.display = 'block';

        // Hide the movie list section
        movieListSection.style.display = 'none';

        // Add event listener to the "Go Back" button
        goBackButton.addEventListener('click', () => goBackToMoviesList());

        // Add a click event to add the movie to favorites from the movie details page
        const favoriteButton = movieDetail.querySelector('.favorite-button');
        favoriteButton.addEventListener('click', (event) => {
            event.stopPropagation(); // Prevent the click event from bubbling
            addMovieToFavorites(detailsData);
        });
    } catch (error) {
        console.error('Error fetching movie details:', error);
    }
}

// Function to go back to the movie list
function goBackToMoviesList() {
    movieDetailsSection.style.display = 'none';
    movieListSection.style.display = 'block';
}

// Function to add a movie to favorites
function addMovieToFavorites(movie) {
    const favorites = JSON.parse(localStorage.getItem('favorites')) || [];
    favorites.push(movie);
    localStorage.setItem('favorites', JSON.stringify(favorites));
    showPopup('Added to favorites!');
}
function showPopup(message) {
    notificationPopup.textContent = message;
    notificationPopup.style.display = 'block';
    setTimeout(() => {
        notificationPopup.style.display = 'none';
    }, 2000); 
}
