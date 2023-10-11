document.addEventListener("DOMContentLoaded", function() {
  const modal = document.getElementById("Modal");
  const span = document.querySelector(".close");
  const form = document.querySelector('#Modal form');
  const nameInput = document.querySelector('.modal-content__name');
  const jobInput = document.querySelector('.modal-content__text');
  const name = document.querySelector('.profile__title');
  const job = document.querySelector('.profile__subtitle');
  const saveButton = document.querySelector('.modal-content__button');
  const overlay = document.querySelector(".overlay");
  const img = document.getElementById("Img");
  const profileClose = modal.querySelector(".close");
  const popup = document.getElementById("popup");
  const closePopupBtn = document.getElementById("close");
  const titleInput = document.getElementById("title");
  const linkInput = document.getElementById("link");
  const cardForm = document.getElementById("card-form");
  const addCardButton = document.getElementById("addCard");
  const profileAdd = document.querySelector(".profile__add");
  const enlargeModal = document.getElementById("enlargeModal");
  const myPlace = document.getElementById("myPlace");
  const captarText = document.getElementById("captar");

  function openModal() {
    modal.style.display = "block";
  }

  function closeModal() {
    modal.style.display = "none";
    resetValidation();
  }

  img.addEventListener("click", openModal);

  profileClose.addEventListener("click", closeModal);

  //esc
  function closePopupsOnEsc(event) {
    if (event.key === "Escape" || event.keyCode === 27) {
      closeModal();
      document.removeEventListener("keydown", closePopupOnEsc);
    }
  }

  document.addEventListener("keydown", closePopupsOnEsc);

  document.addEventListener("click", function (event) {
    if (event.target === overlay || event.target === modal) {
      closeModal();
    }
  });

//validacao
  function validateInput(input, errorElement, minLength, maxLength) {
    const value = input.value.trim();
    if (value.length === 0) {
      errorElement.textContent = "Preencha este campo.";
      input.classList.add("modal-content__name_error");
      return false;
    } else if (value.length < minLength || value.length > maxLength) {
      errorElement.textContent = `O campo deve conter entre ${minLength} e ${maxLength} caracteres.`;
      input.classList.add("modal-content__name_error");
      return false;
    } else {
      errorElement.textContent = "";
      input.classList.remove("modal-content__name_error");
      return true;
    }
  }

  function validateForm() {
    const isNameValid = validateInput(nameInput, document.getElementById("name-error"), 2, 40);
    const isJobValid = validateInput(jobInput, document.getElementById("job-error"), 2, 200);
    saveButton.disabled = !(isNameValid && isJobValid);
    if (isNameValid && isJobValid) {
      saveButton.classList.remove("disabled-button");
    } else {
      saveButton.classList.add("disabled-button");
    }
  }

  function resetValidation() {
    validateForm();
  }

  nameInput.addEventListener('input', function() {
    validateForm();
  });

  jobInput.addEventListener('input', function() {
    validateForm();
  });

  form.addEventListener('submit', function(event) {
    event.preventDefault();
    const newNameValue = nameInput.value.trim();
    const newJobValue = jobInput.value.trim();
    name.textContent = newNameValue;
    job.textContent = newJobValue;
    closeModal();
  });

//detelar
  const deleteIcons = document.querySelectorAll(".elements__delete");

  deleteIcons.forEach(icon => {
      icon.addEventListener("click", function() {
          const card = icon.closest(".elements__item");
          card.parentNode.removeChild(card);
      });
  });

//like
  const likeButtons = document.querySelectorAll(".elements__like");

  likeButtons.forEach(button => {
    let isActive = false;

    button.addEventListener("click", function() {
      isActive = !isActive;
      if (isActive) {
        button.src = "images/Union.png";
        button.alt = "like preenchido";
      } else {
        button.src = "images/Vector.png";
        button.alt = "like vazio";
      }
    });
  });

  const secondPopupCloseBtn = document.getElementById("close");
  const secondOverlay = document.getElementById("second-overlay");

// Função para abrir o pop-up
function openSecondPopup() {
  popup.style.display = "flex";
  secondOverlay.style.display = "block";
  document.addEventListener("keydown", closeSecondPopupOnEsc);
}

// Função para fechar o pop-up
function closeSecondPopup() {
  popup.style.display = "none";
  secondOverlay.style.display = "none";
  resetValidation();
  document.removeEventListener("keydown", closeSecondPopupOnEsc);
}

profileAdd.addEventListener("click", openSecondPopup);

// Evento para fechar o segundo pop-up
closePopupBtn.addEventListener("click", function() {
  closeSecondPopup();
});

secondPopupCloseBtn.addEventListener("click", function() {
  closeSecondPopup();
});

secondOverlay.addEventListener("click", function () {
  closeSecondPopup();
});

// Adicione um evento de clique no overlay do segundo popup para fechar o popup
secondOverlay.addEventListener("click", function () {
  closeSecondPopup();
});

document.addEventListener("click", function (event) {
  if (!popup.contains(event.target) && event.target !== profileAdd) {
    popup.style.display = "none";
  }
});

//esc
function closeSecondPopupOnEsc(event) {
  if (event.key === "Escape" || event.keyCode === 27) {
    closeSecondPopup();
  }
}

document.addEventListener("keydown", closeSecondPopupOnEsc);

//validacao segundo popup
function validateCardForm() {
  const titleValue = titleInput.value.trim();
  const linkValue = linkInput.value.trim();

      let isFormValid = true;

      function showError(element, message) {
        element.textContent = message;
        element.style.display = "block";
      }

      function hideError(element) {
        element.textContent = "";
        element.style.display = "none";
      }

      if (titleInputTouched) {
        if (titleValue.length === 1) {
          showError(document.getElementById("title-error"), "O título deve conter entre 2 e 30 caracteres..");
          titleInput.classList.add("popup-content__local_error");
          isFormValid = false;
        } else if (titleValue.length < 2 || titleValue.length > 30) {
          showError(document.getElementById("title-error"), "Preencha este campo.");
          titleInput.classList.add("popup-content__local_error");
          isFormValid = false;
        } else {
          hideError(document.getElementById("title-error"));
          titleInput.classList.remove("popup-content__local_error");
        }
      }

      if (linkInputTouched) {
        const urlPattern = /^(https?:\/\/)?[\w-]+(\.[\w-]+)+([\w.,@?^=%&:/~+#-]*[\w@?^=%&/~+#-])?$/;
        if (!urlPattern.test(linkValue)) {
          showError(document.getElementById("link-error"), "Insira uma URL válida.");
          linkInput.classList.add("popup-content__link_error");
          isFormValid = false;
        } else {
          hideError(document.getElementById("link-error"));
          linkInput.classList.remove("popup-content__link_error");
        }
      }

      addCardButton.disabled = !isFormValid;
    }

    titleInput.addEventListener('input', function () {
      titleInputTouched = true;
      validateCardForm();
    });

    linkInput.addEventListener('input', function () {
      linkInputTouched = true;
      validateCardForm();
    });

  //adicionar card
  cardForm.addEventListener("submit", function (event) {
    event.preventDefault();
    const newTitle = titleInput.value.trim();
    const newLink = linkInput.value.trim();
  })

  document.getElementById("addCard").addEventListener("click", function() {
      const newTitle = titleInput.value;
      const newLink = linkInput.value;

      const newCard = document.createElement("div");
      newCard.className = "elements__item new-card";

      const rectangleIcon = document.createElement("img");
      rectangleIcon.className = "elements__rectangle";
      rectangleIcon.src = "images/Rectangle.png";
      rectangleIcon.alt = "retângulo branco";

      const photo = document.createElement("img");
      photo.className = "elements__photo new-card";
      photo.src = newLink;
      photo.alt = newTitle;

      const group = document.createElement("div");
      group.className = "elements__group";

      const title = document.createElement("h2");
      title.className = "elements__title";
      title.textContent = newTitle;

      const likeButton = document.createElement("img");
      likeButton.className = "elements__like";
      likeButton.src = "images/Vector.png";
      likeButton.alt = "like";

      const activeLikeButton = document.createElement("img");
      activeLikeButton.className = "elements__like elements__like--active";
      activeLikeButton.src = "images/Union.png";
      activeLikeButton.alt = "like";

      group.appendChild(title);
      group.appendChild(likeButton);

      const deleteIcon = document.createElement("img");
      deleteIcon.className = "elements__delete";
      deleteIcon.src = "images/Group.png";
      deleteIcon.alt = "Excluir";

      newCard.appendChild(rectangleIcon);
      newCard.appendChild(photo);
      newCard.appendChild(group);
      newCard.appendChild(deleteIcon);

      const elementsContainer = document.querySelector('.elements');
      elementsContainer.insertBefore(newCard, elementsContainer.firstChild);

      deleteIcon.addEventListener("click", function() {
          newCard.parentNode.removeChild(newCard);
      });

      likeButton.addEventListener("click", function () {
        toggleLike(likeButton);
      });

      function toggleLike(likeButton) {
        if (likeButton.src.includes("Vector.png")) {
          likeButton.src = "images/Union.png";
          likeButton.alt = "like preenchido";
        } else {
          likeButton.src = "images/Vector.png";
          likeButton.alt = "like vazio";
        }
      }

      popup.style.display = "none";
      titleInput.value = "";
      linkInput.value = "";

      closeSecondPopup();
  });

//ampliar
  document.addEventListener("click", (e) => {
  const elem = e.target;
  if (elem.classList.contains("elements__photo")) {
    enlargeModal.style.display = "block";
    myPlace.src = elem.src;
      captarText.innerHTML = elem.alt;
  }
});

  const close = document.getElementsByClassName("fechar")[0];

  close.onclick = function() {
  enlargeModal.style.display = "none";
  };
});
