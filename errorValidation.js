export class ErrorValidation {
  constructor(formElement) {
    this.form = formElement;
  }

  createErrorElement(input) {
    const error = document.createElement("span");
    error.className = "error-message";
    input.insertAdjacentElement("afterend", error);
    return error;
  }

  getErrorElement(input) {
    const next = input.nextElementSibling;
    if (next && next.classList.contains("error-message")) {
      return next;
    }
    return this.createErrorElement(input);
  }

  showError(input, errorEl) {
    if (input.validity.valueMissing) {
      errorEl.textContent = "This field is required";
    } else if (input.validity.rangeUnderflow) {
      errorEl.textContent = `Minimum is ${input.min}`;
    } else if (input.validity.typeMismatch) {
      errorEl.textContent = "Please enter a valid value";
    } else if (input.validity.tooShort) {
      errorEl.textContent = `Please enter at least ${input.minLength} characters`;
    } else if (input.validity.tooLong) {
      errorEl.textContent = `Please enter no more than ${input.maxLength} characters`;
    } else if (input.validity.patternMismatch) {
      errorEl.textContent = "Please match the requested format";
    } else if (input.validity.rangeOverflow) {
      errorEl.textContent = `Maximum is ${input.max}`;
    } else if (input.validity.badInput) {
      errorEl.textContent = "Please enter a valid number";
    }
    errorEl.className = "error-message active";
  }

  validateField(input) {
    const errorEl = this.getErrorElement(input);
    if (input.validity.valid) {
      errorEl.textContent = "";
      errorEl.className = "error-message";
    } else {
      this.showError(input, errorEl);
    }
    return input.validity.valid;
  }

  bindField(input) {
    input.addEventListener("input", () => this.validateField(input));
    input.addEventListener("blur", () => this.validateField(input));
  }

  bindAll(inputs) {
    inputs.forEach((input) => this.bindField(input));
  }

  validateAll(inputs) {
    return inputs.every((input) => this.validateField(input));
  }

  clearErrors() {
    this.form.querySelectorAll(".error-message").forEach((el) => {
      el.textContent = "";
      el.className = "error-message";
    });
  }
}
