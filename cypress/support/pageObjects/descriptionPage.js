// descriptionPage.js
class DescriptionPage {
    get inputField() {
        return cy.get('#description');
    }

    typeDescription(text) {
        this.inputField.type(text);
    }

    submitForm() {
        // Assuming there's a submit button with id 'submit'
        cy.get('#submit').click();
    }

    get errorMessage() {
        return cy.get('.error-message'); // Adjust selector based on actual error message element
    }
}

export default new DescriptionPage();
//require('browserstack-cypress-cli/bin/testObservability/cypress');
