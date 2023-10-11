export function resetValidationPopup1() {
  const nameInput = document.querySelector('.modal-content__name');
  const jobInput = document.querySelector('.modal-content__text');
  const nameError = document.getElementById('name-error');
  const jobError = document.getElementById('job-error');
  const saveButton = document.querySelector('.modal-content__button');

  nameInput.value = '';
  jobInput.value = '';
  nameError.textContent = '';
  jobError.textContent = '';
  nameInput.classList.remove('modal-content__name_error');
  jobInput.classList.remove('modal-content__text_error');
  saveButton.disabled = true;
}

export function resetValidationPopup2() {
  const titleInput = document.getElementById('title');
  const linkInput = document.getElementById('link');
  const titleError = document.getElementById('title-error');
  const linkError = document.getElementById('link-error');
  const addCardButton = document.getElementById('addCard');

  titleInput.value = '';
  linkInput.value = '';
  titleError.textContent = '';
  linkError.textContent = '';
  titleInput.classList.remove('popup-content__local_error');
  linkInput.classList.remove('popup-content__link_error');
  addCardButton.disabled = true;
}

