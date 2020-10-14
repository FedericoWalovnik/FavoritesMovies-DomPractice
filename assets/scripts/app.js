//Save all the user´s movies
const favoritesMovies = [];

//HTML Elements
const AddMovieButton = document.getElementById('addMovie-button');
const modalAddMovie = document.getElementById('add-modal');
const deleteMovieModal = document.getElementById('delete-modal');
const backdrop = document.getElementById('backdrop');
const cancelAddMovieButton = modalAddMovie.querySelector('.btn--passive');
const confirmAddMovieButton = modalAddMovie.querySelector('.btn--success');
const entryTextSection = document.getElementById('entry-text');

//User inputs
const titleInput = document.getElementById('title');
const imageUrlInput = document.getElementById('image-url');
const ratingInput = document.getElementById('rating');

const updateUI = () => {
  if (favoritesMovies === 0) {
    entryTextSection.style.display = 'block';
  } else {
    entryTextSection.style.display = 'none';
  }
};

const deleteMovie = (movieId) => {
  index = favoritesMovies
    .map((e) => {
      return e.id;
    })
    .indexOf(movieId);

  favoritesMovies.splice(index, 1);
  closeMovieDeleteModal();
  list.children[index].remove();
};

const closeMovieDeleteModal = () => {
  toggleBackdrop();
  deleteMovieModal.classList.remove('visible');
};

const deleteMovieHandler = (movieId) => {
  deleteMovieModal.classList.add('visible');
  const cancelDelete = deleteMovieModal.querySelector('.btn--passive');
  const confirmDelete = deleteMovieModal.querySelector('.btn--danger');
  toggleBackdrop();

  confirmDelete.addEventListener('click', deleteMovie.bind(this, movieId));
  cancelDelete.addEventListener('click', closeMovieDeleteModal);
};

const list = document.getElementById('movie-list');
list.addEventListener('click', (e) => {
  elementClicked = e.target;

  if (elementClicked.matches('li i')) {
    deleteMovieHandler(elementClicked.getAttribute('value'));
  }
});

const renderNewMovieElement = (id, title, imageUrl, rating) => {
  const newMovieElement = document.createElement('li');
  newMovieElement.className = 'movie-element';
  newMovieElement.innerHTML = `
  <i value="${id}" class="fas fa-times movie-element__delete-icon" id="deleteMovieButton"></i>
  <div class="movie-element__image">
    <img src="${imageUrl}" alt="${title}">
  </div>
  <div class="movie-element__info">
    <h2>${title}</h2>
    <p>${rating}</p>
  </div>
  `;

  list.append(newMovieElement);
};

const toggleBackdrop = () => {
  backdrop.classList.toggle('visible');
};

const closeMovieModal = () => {
  modalAddMovie.classList.remove('visible');
};

const showMovieModal = () => {
  modalAddMovie.classList.add('visible');
  toggleBackdrop();
  clearMovieInput();
};

const clearMovieInput = () => {
  titleInput.value = '';
  imageUrlInput.value = '';
  ratingInput.value = '';
};

const cancelAddMovie = () => {
  closeMovieModal();
  clearMovieInput();
};

const handleBackdropClick = () => {
  closeMovieModal();
  closeMovieDeleteModal();
};

const AddMovieFormValidation = () => {
  let itsValid = true;

  if (
    titleInput.value.trim() === '' ||
    imageUrlInput.value.trim() === '' ||
    ratingInput.value.trim() === '' ||
    ratingInput.value < 1 ||
    ratingInput.value > 5
  ) {
    itsValid = false;
  }
  return itsValid;
};

const saveMovie = () => {
  const newMovie = {
    id: Math.random().toString(),
    title: titleInput.value,
    imageUrl: imageUrlInput.value,
    rating: ratingInput.value
  };

  favoritesMovies.push(newMovie);

  renderNewMovieElement(
    newMovie.id,
    newMovie.title,
    newMovie.imageUrl,
    newMovie.rating
  );
  updateUI();
};

const handleAddMovieClick = () => {
  if (AddMovieFormValidation()) {
    saveMovie();
    closeMovieModal();
    toggleBackdrop();
  } else {
    alert('Please enter valid values(rating between 1 and 5)');
  }
};

AddMovieButton.addEventListener('click', showMovieModal);
backdrop.addEventListener('click', handleBackdropClick);
cancelAddMovieButton.addEventListener('click', cancelAddMovie);
confirmAddMovieButton.addEventListener('click', handleAddMovieClick);
