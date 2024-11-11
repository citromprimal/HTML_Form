// Update character count for input fields ------------------------------------

function updateCharCount(field, counterId) {
    const count = field.value.length;
    const maxLength = field.maxLength || field.getAttribute('maxlength');
    const counter = document.getElementById(counterId);
    if (counter) {
        counter.innerText = `${count} / ${maxLength}`;
    }
}

// Check if field is filled ------------------------------------

function isFieldFilled(field) {
    if (!field) return false;

    if (field.type === 'checkbox' || field.type === 'radio') {
        return field.checked;
    } else if (field.tagName.toLowerCase() === 'select') {
        return field.value !== '';
    } else {
        return field.value.trim() !== '';
    }
}

// Show not filled error ------------------------------------

function showNotFilledError(fieldId) {
    const notFilledMessage = document.getElementById(`${fieldId}NotFilled`);
    if (notFilledMessage) {
        notFilledMessage.style.display = 'block';
    }
}

// Hide not filled error ------------------------------------

function hideNotFilledError(fieldId) {
    const notFilledMessage = document.getElementById(`${fieldId}NotFilled`);
    if (notFilledMessage) {
        notFilledMessage.style.display = 'none';
    }
}

// Apply error border ------------------------------------

function applyErrorBorder(field) {
    field.classList.add('error');
}

// Remove error border ------------------------------------

function removeErrorBorder(field) {
    field.classList.remove('error');
}

// Apply valid border ------------------------------------

function applyValidBorder(field) {
    field.classList.add('valid');
}

// Remove valid border ------------------------------------

function removeValidBorder(field) {
    field.classList.remove('valid');
}

// Show error message ------------------------------------

function showErrorMessage(errorId) {
    const errorMessage = document.getElementById(errorId);
    if (errorMessage) {
        errorMessage.style.display = 'block';
    }
}

// Hide error message ------------------------------------

function hideErrorMessage(errorId) {
    const errorMessage = document.getElementById(errorId);
    if (errorMessage) {
        errorMessage.style.display = 'none';
    }
}

// Validate first name ------------------------------------

function validateFirstName() {
    const firstNameField = document.getElementById('firstName');
    const isFilled = isFieldFilled(firstNameField);
    const isValidName = /^[a-zA-ZáéíóöőúüűÁÉÍÓÖŐÚÜŰľščťžňýôäŠČŤŽŇÝÔÄ\s]+$/.test(firstNameField.value.trim());

    if (!isFilled) {
        removeValidBorder(firstNameField);
        applyErrorBorder(firstNameField);
        showNotFilledError('firstName');
        hideErrorMessage('nameError');
        return false;
    }

    if (!isValidName) {
        removeValidBorder(firstNameField);
        applyErrorBorder(firstNameField);
        hideNotFilledError('firstName');
        showErrorMessage('nameError');
        return false;
    }

    removeErrorBorder(firstNameField);
    applyValidBorder(firstNameField);
    hideNotFilledError('firstName');
    hideErrorMessage('nameError');
    return true;
}

// Validate last name ------------------------------------

function validateLastName() {
    const lastNameField = document.getElementById('lastName');
    const isFilled = isFieldFilled(lastNameField);
    const isValidName = /^[a-zA-ZáéíóöőúüűÁÉÍÓÖŐÚÜŰľščťžňýôäŠČŤŽŇÝÔÄ\s]+$/.test(lastNameField.value.trim());

    if (!isFilled) {
        removeValidBorder(lastNameField);
        applyErrorBorder(lastNameField);
        showNotFilledError('lastName');
        hideErrorMessage('surnameError');
        return false;
    }

    if (!isValidName) {
        removeValidBorder(lastNameField);
        applyErrorBorder(lastNameField);
        hideNotFilledError('lastName');
        showErrorMessage('surnameError');
        return false;
    }

    removeErrorBorder(lastNameField);
    applyValidBorder(lastNameField);
    hideNotFilledError('lastName');
    hideErrorMessage('surnameError');
    return true;
}

// Validate phone number ------------------------------------

function validatePhone() {
    const phoneField = document.getElementById('phoneNumber');
    const phoneValue = phoneField.value.trim();
    const phoneRegex = /^\+\d{1,3}\d{9,}$/;
    const isValid = phoneRegex.test(phoneValue);
    const isFilled = isFieldFilled(phoneField);

    if (!isFilled) {
        removeValidBorder(phoneField);
        applyErrorBorder(phoneField);
        showNotFilledError('phoneNumber');
        hideErrorMessage('phoneError');
        return false;
    }

    if (!isValid) {
        removeValidBorder(phoneField);
        applyErrorBorder(phoneField);
        showErrorMessage('phoneError');
        hideNotFilledError('phoneNumber');
        return false;
    }

    removeErrorBorder(phoneField);
    applyValidBorder(phoneField);
    hideNotFilledError('phoneNumber');
    hideErrorMessage('phoneError');
    return true;
}

// Validate email ------------------------------------

function validateEmail() {
    const emailField = document.getElementById('email');
    const emailValue = emailField.value.trim();
    const emailRegex = /^[a-zA-Z0-9._%+-]{3,}@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    const isValid = emailRegex.test(emailValue);
    const isFilled = isFieldFilled(emailField);

    if (!isFilled) {
        removeValidBorder(emailField);
        applyErrorBorder(emailField);
        showNotFilledError('email');
        hideErrorMessage('emailError');
        return false;
    }

    if (!isValid) {
        removeValidBorder(emailField);
        applyErrorBorder(emailField);
        showErrorMessage('emailError');
        hideNotFilledError('email');
        return false;
    }

    removeErrorBorder(emailField);
    applyValidBorder(emailField);
    hideNotFilledError('email');
    hideErrorMessage('emailError');
    return true;
}

// Validate date of birth and age ------------------------------------

function validateDateOfBirthAndAge() {
    const dobField = document.getElementById('dateOfbirth');
    const ageField = document.getElementById('age');
    const dobDate = new Date(dobField.value);
    const today = new Date();

    const age = Math.abs(new Date(today - dobDate).getUTCFullYear() - 1970);
    const isDobFilled = isFieldFilled(dobField);
    const isDobValid = dobDate <= today;

    if (!isDobFilled) {
        removeValidBorder(dobField);
        applyErrorBorder(dobField);
        showNotFilledError('dateOfbirth');
        hideErrorMessage('dobError');
        hideErrorMessage('dobNoMatch');
        return false;
    }

    if (!isDobValid) {
        removeValidBorder(dobField);
        applyErrorBorder(dobField);
        hideNotFilledError('dateOfbirth');
        showErrorMessage('dobError');
        hideErrorMessage('dobNoMatch');
        return false;
    }

    ageField.value = age;

    if (age > 120) {
        removeValidBorder(ageField);
        applyErrorBorder(ageField);
        removeValidBorder(dobField);
        applyErrorBorder(dobField);
        hideErrorMessage('ageError');
        hideNotFilledError('age');
        showErrorMessage('ageTooHigh');
        return false;
    }

    removeErrorBorder(dobField);
    applyValidBorder(dobField);
    hideNotFilledError('dateOfbirth');
    hideErrorMessage('dobError');
    hideErrorMessage('dobNoMatch');

    removeErrorBorder(ageField);
    applyValidBorder(ageField);
    hideNotFilledError('age');
    hideErrorMessage('ageError');
    hideErrorMessage('ageNoMatch');
    hideErrorMessage('ageTooHigh');

    return true;
}

// Validate country ------------------------------------

function validateCountry() {
    const countryField = document.getElementById('country');
    const isFilled = isFieldFilled(countryField);
    const isValidName = /^[a-zA-ZáéíóöőúüűÁÉÍÓÖŐÚÜŰľščťžňýôäŠČŤŽŇÝÔÄ\s]+$/.test(countryField.value.trim());

    if (!isFilled) {
        removeValidBorder(countryField);
        applyErrorBorder(countryField);
        showNotFilledError('country');
        hideErrorMessage('countryError');
        return false;
    }

    if (!isValidName) {
        removeValidBorder(countryField);
        applyErrorBorder(countryField);
        hideNotFilledError('country');
        showErrorMessage('countryError');
        return false;
    }

    removeErrorBorder(countryField);
    applyValidBorder(countryField);
    hideNotFilledError('country');
    hideErrorMessage('countryError');
    return true;
}

// Validate city ------------------------------------

function validateCity() {
    const cityField = document.getElementById('city');
    const isFilled = isFieldFilled(cityField);
    const isValidName = /^[a-zA-ZáéíóöőúüűÁÉÍÓÖŐÚÜŰľščťžňýôäŠČŤŽŇÝÔÄ\s]+$/.test(cityField.value.trim());

    if (!isFilled) {
        removeValidBorder(cityField);
        applyErrorBorder(cityField);
        showNotFilledError('city');
        hideErrorMessage('cityError');
        return false;
    }

    if (!isValidName) {
        removeValidBorder(cityField);
        applyErrorBorder(cityField);
        hideNotFilledError('city');
        showErrorMessage('cityError');
        return false;
    }

    removeErrorBorder(cityField);
    applyValidBorder(cityField);
    hideNotFilledError('city');
    hideErrorMessage('cityError');
    return true;
}

// Validate street ------------------------------------

function validateStreet() {
    const streetField = document.getElementById('street');
    const isFilled = isFieldFilled(streetField);

    if (!isFilled) {
        removeValidBorder(streetField);
        applyErrorBorder(streetField);
        showNotFilledError('street');
        return false;
    }

    removeErrorBorder(streetField);
    applyValidBorder(streetField);
    hideNotFilledError('street');
    return true;
}

// Travel form ------------------------------------

let finalPrice = 0;

document.getElementById('travelType').addEventListener('change', function() {
    const travelType = this.value;
    const travelClassDropdown = document.getElementById('travelClass');
    const destinationDropdown = document.getElementById('destination');

    travelClassDropdown.innerHTML = '<option value="" disabled selected>--Vyberte cestovnú triedu--</option>';
    destinationDropdown.innerHTML = '<option value="" disabled selected>--Vyberte destináciu--</option>';

    const travelClasses = {
        letecky: { 'Economy (200€)': 'economy', 'Business (500€)': 'business' },
        autobus: { 'Standard (50€)': 'standard', 'Relax (100€)': 'relax' }
    };

    const classes = travelClasses[travelType] || {};

    Object.keys(classes).forEach(function(travelClass) {
        const option = document.createElement('option');
        option.value = classes[travelClass];
        option.text = travelClass;
        travelClassDropdown.add(option);
    });
});

// Populate destination dropdown based on travel class ------------------------------------

document.getElementById('travelClass').addEventListener('change', function() {
    const travelClass = this.value;
    const destinationDropdown = document.getElementById('destination');

    destinationDropdown.innerHTML = '<option value="" disabled selected>--Vyberte destináciu--</option>';

    const destinationsByClass = {
        economy: { 'Španielsko (240€)': 'spanielsko', 'Turecko (260€)': 'turecko', 'Grécko (300€)': 'grecko' },
        business: { 'Japonsko (1000€)': 'japonsko', 'Spojené štáty (1100€)': 'spojene_staty', 'Austrália (1250€)': 'australia' },
        standard: { 'Slovensko (50€)': 'slovensko', 'Poľsko (55€)': 'polsko', 'Maďarsko (60€)': 'madarsko' },
        relax: { 'Nemecko (140€)': 'nemecko', 'Taliansko (150€)': 'taliansko', 'Francúzsko (160€)': 'francuzsko' }
    };

    const destinations = destinationsByClass[travelClass] || {};

    Object.keys(destinations).forEach(function(destination) {
        const option = document.createElement('option');
        option.value = destinations[destination];
        option.text = destination;
        destinationDropdown.add(option);
    });
});

// Calculate final price ------------------------------------

document.getElementById('destination').addEventListener('change', function() {
    const travelType = document.getElementById('travelType').value;
    const travelClass = document.getElementById('travelClass').value;
    const destination = this.value;

    const prices = {
        letecky: { economy: 200, business: 500 },
        autobus: { standard: 50, relax: 100 }
    };

    const destinationMultipliers = {
        spanielsko: 1.2,
        grecko: 1.5,
        turecko: 1.3,
        japonsko: 2.0,
        australia: 2.5,
        spojene_staty: 2.2,
        polsko: 1.1,
        madarsko: 1.2,
        slovensko: 1.0,
        nemecko: 1.4,
        francuzsko: 1.6,
        taliansko: 1.5
    };

    const basePrice = prices[travelType][travelClass];
    const multiplier = destinationMultipliers[destination.toLowerCase()];
    finalPrice = basePrice * multiplier;

    document.getElementById('finalPrice').innerText = `Cena: ${finalPrice.toFixed(2)}€`;
});

// Validate travel type ------------------------------------

function validateTravelType() {
    const travelTypeField = document.getElementById('travelType');
    const isValid = isFieldFilled(travelTypeField);

    if (isValid) {
        removeErrorBorder(travelTypeField);
        applyValidBorder(travelTypeField);
        hideNotFilledError('travelType');
        return true;
    } else {
        removeValidBorder(travelTypeField);
        applyErrorBorder(travelTypeField);
        showNotFilledError('travelType');
        return false;
    }
}

// Validate travel class ------------------------------------

function validateTravelClass() {
    const travelClassField = document.getElementById('travelClass');
    const isValid = isFieldFilled(travelClassField);

    if (isValid) {
        removeErrorBorder(travelClassField);
        applyValidBorder(travelClassField);
        hideNotFilledError('travelClass');
        return true;
    } else {
        removeValidBorder(travelClassField);
        applyErrorBorder(travelClassField);
        showNotFilledError('travelClass');
        return false;
    }
}

// Validate destination ------------------------------------

function validateDestination() {
    const destinationField = document.getElementById('destination');
    const isValid = isFieldFilled(destinationField);

    if (isValid) {
        removeErrorBorder(destinationField);
        applyValidBorder(destinationField);
        hideNotFilledError('destination');
        return true;
    } else {
        removeValidBorder(destinationField);
        applyErrorBorder(destinationField);
        showNotFilledError('destination');
        return false;
    }
}

// Validate departure date ------------------------------------

function validateDepartureDate() {
    const departureField = document.getElementById('departure');
    const depValue = departureField.value;
    const depDate = new Date(depValue);
    const today = new Date();
    const isValid = depDate > today;
    const isFilled = isFieldFilled(departureField);

    if (isValid && !isNaN(Date.parse(depValue))) {
        removeErrorBorder(departureField);
        applyValidBorder(departureField);
        hideNotFilledError('departure');
        hideErrorMessage('depError');
        return true;
    } else if (!isFilled) {
        removeValidBorder(departureField);
        applyErrorBorder(departureField);
        hideErrorMessage('depError');
        showNotFilledError('departure');
        return false;
    } else {
        removeValidBorder(departureField);
        applyErrorBorder(departureField);
        hideNotFilledError('departure');
        showErrorMessage('depError');
        return false;
    }
}

// Validate arrival date ------------------------------------

function validateArrivalDate() {
    const departureField = document.getElementById('departure');
    const arrivalField = document.getElementById('arrival');
    const arrValue = arrivalField.value;
    const depDate = new Date(departureField.value);
    const arrDate = new Date(arrivalField.value);
    const isValid = arrDate > depDate;
    const isFilled = isFieldFilled(arrivalField);

    if (isValid && !isNaN(Date.parse(arrValue))) {
        removeErrorBorder(arrivalField);
        applyValidBorder(arrivalField);
        hideNotFilledError('arrival');
        hideErrorMessage('arrError');
        return true;
    } else if (!isFilled) {
        removeValidBorder(arrivalField);
        applyErrorBorder(arrivalField);
        hideErrorMessage('arrError');
        showNotFilledError('arrival');
        return false;
    } else {
        removeValidBorder(arrivalField);
        applyErrorBorder(arrivalField);
        hideNotFilledError('arrival');
        showErrorMessage('arrError');
        return false;
    }
}

// Show/hide delivery information ------------------------------------

const checkbox = document.getElementById('toggleCheckbox');
const additionalContent = document.getElementById('additionalContent');

additionalContent.style.display = checkbox.checked ? 'none' : 'block';

checkbox.addEventListener('change', function() {
    additionalContent.style.display = this.checked ? 'none' : 'block';
});

// Show/hide other travel reason field ------------------------------------

const otherCheckbox = document.getElementById('otherCheckbox');
const otherTextContainer = document.getElementById('otherTextContainer');

otherCheckbox.addEventListener('change', function() {
    if (this.checked) {
        otherTextContainer.classList.add('visible');
    } else {
        otherTextContainer.classList.remove('visible');
    }
});

// Show/hide info about creator ------------------------------------

document.getElementById('info-icon').addEventListener('click', function() {
    const infoText = document.getElementById('info-text');
    if (infoText.style.display === 'none') {
        infoText.style.display = 'block';
    } else {
        infoText.style.display = 'none';
    }
});

// Event listeners for input fields ------------------------------------

document.getElementById('firstName').addEventListener('input', function() {
    validateFirstName();
    updateCharCount(this, 'nameCount');  // Update the character counter for first name
});
document.getElementById('lastName').addEventListener('input', function() {
    validateLastName();
    updateCharCount(this, 'surnameCount');  // Update the character counter for last name
});
document.getElementById('email').addEventListener('input', function() {
    validateEmail();
    updateCharCount(this, 'emailCount');  // Update the character counter for email
});
document.getElementById('phoneNumber').addEventListener('input', function () {
    validatePhone();
    updateCharCount(this, 'phoneCount');  // Update the character counter for phone number
});
document.getElementById('dateOfbirth').addEventListener('input', function () {
    validateDateOfBirthAndAge();
    updateCharCount(this, 'dobCount');  // Update the character counter for date of birth
});
document.getElementById('age').addEventListener('input', function () {
    validateDateOfBirthAndAge();
    updateCharCount(this, 'ageCount');  // Update the character counter for age
});
document.getElementById('country').addEventListener('input', function () {
    validateCountry();
    updateCharCount(this, 'countryCount');  // Update the character counter for country
});
document.getElementById('county').addEventListener('input', function () {
    updateCharCount(this, 'countyCount');  // Update the character counter for country
});
document.getElementById('city').addEventListener('input', function () {
    validateCity();
    updateCharCount(this, 'cityCount');  // Update the character counter for city
});
document.getElementById('street').addEventListener('input', function () {
    validateStreet();
    updateCharCount(this, 'streetCount');  // Update the character counter for street
});
document.getElementById('country2').addEventListener('input', function () {
    updateCharCount(this, 'country2Count');  // Update the character counter for country
});
document.getElementById('county2').addEventListener('input', function () {
    updateCharCount(this, 'county2Count');  // Update the character counter for country
});
document.getElementById('city2').addEventListener('input', function () {
    updateCharCount(this, 'city2Count');  // Update the character counter for city
});
document.getElementById('street2').addEventListener('input', function () {
    updateCharCount(this, 'street2Count');  // Update the character counter for street
});
document.getElementById('travelType').addEventListener('change', validateTravelType);
document.getElementById('travelClass').addEventListener('change', validateTravelClass);
document.getElementById('destination').addEventListener('change', validateDestination);
document.getElementById('departure').addEventListener('change', validateDepartureDate);
document.getElementById('arrival').addEventListener('change', validateArrivalDate);
document.getElementById('otherText').addEventListener('input', function() {
    updateCharCount(this, 'otherTextCount');
});
document.getElementById('moreinfo').addEventListener('input', function() {
    updateCharCount(this, 'moreInfoCount');
});

// Validate the form ------------------------------------

function validateForm() {
    const validators = [
        validateFirstName,
        validateLastName,
        validateEmail,
        validatePhone,
        validateDateOfBirthAndAge,
        validateCountry,
        validateCity,
        validateStreet,
        validateTravelType,
        validateTravelClass,
        validateDestination,
        validateDepartureDate,
        validateArrivalDate
    ];

    let allValid = true;

    validators.forEach(validator => {
        if (!validator()) {
            allValid = false;
        }
    });

    return allValid;
}

// Show modal with form details ------------------------------------

document.querySelector('form').addEventListener('submit', function(event) {
    event.preventDefault();

    if (!validateForm()) {
        return;
    }

    const ignoredFields = ['apikey', 'from', 'sender', 'to', 'subject', 'redirectOk', 'redirectFalse'];

    const formData = new FormData(this);
    const modalDetails = document.getElementById('modalDetails');
    modalDetails.innerHTML = '';

    formData.forEach((value, key) => {
        if (!ignoredFields.includes(key) && value.trim() !== '') {
            const p = document.createElement('p');
            p.textContent = `${key}: ${value}`;
            modalDetails.appendChild(p);
        }
    });

    const priceElement = document.createElement('p');
    priceElement.textContent = `Konečná cena: ${finalPrice.toFixed(2)}€`;
    modalDetails.appendChild(priceElement);

    document.getElementById('confirmationModal').style.display = 'block';
});

// Send form/close modal --------------------------------------

const modal = document.getElementById('confirmationModal');
const closeButton = document.getElementById('closeModalButton');
const confirmButton = document.getElementById('confirmButton');

window.onclick = function(event) {
    if (event.target === modal) {
        modal.style.display = 'none';
    }
};

modal.onclick = function(event) {
    if (event.target === closeButton) {
        modal.style.display = 'none';
    }
};

modal.onclick = function(event) {
    if (event.target === confirmButton) {
        document.querySelector('form').submit();
    }
};