/// <reference types="cypress"/>

import validUserData from "../fixtures/valid-user.json";
import invalidUserData from "../fixtures/invalid-user.json";
import menu from "../modules/menu";
import login from "../modules/login";
import cadastro from "../modules/cadastro";
import contato from "../modules/contato";

describe("Automation Exercise", () => {
  beforeEach(() => {
    cy.viewport("iphone-xr");
    cy.visit("https://automationexercise.com/");
    cy.navegarParaLogin();
  });

  it("Test Case 1: Register User", () => {
    login.preencherFormularioPreCadastro();
    cadastro.preencherCadastroFormularioCompleto();

    cy.url().should("includes", "account_created");
    cy.contains("b", "Account Created!");
  });

  it("Test Case 2: Login User with correct email and password", () => {
    login.preencherFormularioDeLogin(
      validUserData.user,
      validUserData.password
    );

    cy.get("i.fa-user").parent().should("contain", validUserData.name);
    cy.get('a[href="/logout"]').should("be.visible");

    cy.contains("b", validUserData.name);
    cy.contains(` Logged in as ${validUserData.name}`).should("be.visible");
  });

  it("Test Case 3: Login User with incorrect email and password", () => {
    login.preencherFormularioDeLogin(
      invalidUserData.user,
      invalidUserData.password
    );

    cy.contains("p", invalidUserData.message);
    cy.get('[data-qa="login-button"]').should("be.visible");
  });

  it("Test Case 4: Logout User", () => {
    login.preencherFormularioDeLogin(
      validUserData.user,
      validUserData.password
    );

    menu.efetuarLogout();

    cy.url().should("contain", "login");
  });

  it("Test Case 5: Register User with existing email", () => {
    login.preencherFormularioPreCadastroUsuarioExistente(
      validUserData.name,
      validUserData.email
    );

    cy.contains("button", "Signup").click();
    cy.get(".signup-form > form > p").should(
      "contain",
      "Email Address already exist!"
    );
  });

  it("Test Case 6: Contact Us Form", () => {
    contato.preencherFormularioDeContato();

    cy.get(".status").should("be.visible");
    cy.get(".status").should(
      "have.text",
      "Success! Your details have been submitted successfully."
    );
  });
});
