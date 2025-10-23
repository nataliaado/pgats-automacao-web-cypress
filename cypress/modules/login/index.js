import { faker } from "@faker-js/faker";
import { getRandomNumber, getRandomEmail } from "../../support/helpers";

class Login {
  preencherFormularioPreCadastro() {
    const firstName = faker.person.firstName();
    const lastName = faker.person.lastName();

    cy.get('[data-qa="signup-name"]').type(`${firstName} ${lastName}`);
    cy.get('[data-qa="signup-email"]').type(getRandomEmail());

    cy.contains("button", "Signup").click();
  }

  preencherFormularioDeLogin(login, pass) {
    cy.get(`[data-qa="login-email"]`).type(login);
    cy.get(`[data-qa="login-password"]`).type(pass);

    cy.get(`[data-qa="login-button"]`).click();
  }

  preencherFormularioPreCadastroUsuarioExistente(name, email) {
    cy.get('[data-qa="signup-name"]').type(name);
    cy.get('[data-qa="signup-email"]').type(email);

    cy.contains("button", "Signup").click();
  }
}

export default new Login();
