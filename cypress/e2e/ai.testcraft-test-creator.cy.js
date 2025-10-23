// description.spec.js
import DescriptionPage from "../support/pageObjects/descriptionPage";

describe("Description Input Field Tests", () => {
  beforeEach(() => {
    cy.visit("https://dev-finance.netlify.app/");
    cy.contains("Nova Transação").click();
  });

  it("Verify that the input field accepts valid text input and displays it correctly", () => {
    const validText = "Test description";
    DescriptionPage.typeDescription(validText);
    DescriptionPage.inputField.should("have.value", validText);
  });

  it("Test the input field's behavior when the user switches languages while typing", () => {
    DescriptionPage.typeDescription("Hello");
    DescriptionPage.inputField.should("have.value", "Hello");
    DescriptionPage.typeDescription("Olá");
    DescriptionPage.inputField.should("have.value", "HelloOlá"); // Assuming it concatenates the input
  });
});
