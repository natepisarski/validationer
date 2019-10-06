export class ValidationResult {
    constructor(isSuccess) {
        this.isSuccess = isSuccess;
        this.isFailure = !isSuccess;
        this.successMessage = null;
        this.errorMessage = null;
    }
}

export class ValidationSuccessResult extends ValidationResult {
    constructor(successMessage) {
        super(true);
        this.successMessage = successMessage;
    }
}

export class ValidationErrorResult extends ValidationResult {
    constructor(errorMessage) {
        super(false);
        this.errorMessage = errorMessage;
    }
}
