document.addEventListener('DOMContentLoaded', displayFavoriteMovies);
document.addEventListener('DOMContentLoaded', () => {
    displayFavoriteMovies();
    setupGoBackButton();
});

function displayFavoriteMovies() {
    const favoritesList = document.getElementById('favorites-list');
    const favorites = JSON.parse(localStorage.getItem('favorites')) || [];

    if (favorites.length === 0) {
        favoritesList.innerHTML = 'Your favorites list is empty.';
        return;
    }

    favoritesList.innerHTML = '';

    favorites.forEach((movie) => {
        const movieElement = document.createElement('div');
        movieElement.classList.add('favorite-movie');
        movieElement.innerHTML = `
            <img src="${movie.Poster}" alt="${movie.Title} Poster">
            <h2>${movie.Title}</h2>
            <p>Year: ${movie.Year}
            <button class="remove-button">Remove</button>
        `;

        // Add a click event to remove the movie from favorites
        const removeButton = movieElement.querySelector('.remove-button');
        removeButton.addEventListener('click', () => removeMovieFromFavorites(movie));

        favoritesList.appendChild(movieElement);
    });
}

function setupGoBackButton() {
    const goBackButton = document.getElementById('go-back');
    goBackButton.addEventListener('click', () => {
      
        window.location.href = './index.html';
    });
}
function removeMovieFromFavorites(movie) {
    const favorites = JSON.parse(localStorage.getItem('favorites')) || [];
    const updatedFavorites = favorites.filter((favMovie) => favMovie.imdbID !== movie.imdbID);

    localStorage.setItem('favorites', JSON.stringify(updatedFavorites));
    displayFavoriteMovies(); 
}
