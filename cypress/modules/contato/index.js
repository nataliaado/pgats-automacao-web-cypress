import validUserData from "../../fixtures/valid-user.json";

class Contato {
  preencherFormularioDeContato() {
    cy.get("a[href*=contact]").click();

    cy.get('[data-qa="name"]').type(validUserData.name);
    cy.get('[data-qa="email"]').type(validUserData.email);
    cy.get('[data-qa="subject"]').type(validUserData.subject);
    cy.get('[data-qa="message"]').type(validUserData.message);

    cy.fixture("valid-user.json").as("arquivo");
    cy.get("input[type=file]").selectFile("@arquivo");
    cy.get('[data-qa="submit-button"]').click();
  }
}

export default new Contato();
