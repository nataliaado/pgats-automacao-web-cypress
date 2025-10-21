/// <reference types="cypress"/>

// describe / context - suíte ou conjunto de testes em um mesmo arquivo
// it - um teste dentro de um bloco ou conjunto de testes

// describe -> Automations Exercise
//  it -> Cadastrar um usuário
//  it -> Teste abcde

import userData from "../fixtures/example.json";
import menu from "../modules/menu";
import login from "../modules/login";
import cadastro from "../modules/cadastro";

describe("Automation Exercise", () => {
  beforeEach(() => {
    cy.viewport("iphone-xr");
    cy.visit("https://automationexercise.com/");

    // menu.navegarParaLogin();
    cy.navegarParaLogin();
  });

  it("Cadastrar um Usuário", () => {
    login.preencherFormularioPreCadastro();

    cadastro.preencherCadastroFormularioCompleto();

    cy.url().should("includes", "account_created");
    cy.contains("b", "Account Created!");
  });

  it("Login de Usuário com e-mail e senha corretos", () => {
    login.preencherFormularioDeLogin(userData.user, userData.password);

    cy.get("i.fa-user").parent().should("contain", userData.name);
    cy.get('a[href="/logout"]').should("be.visible");

    cy.contains("b", userData.name);
    cy.contains(` Logged in as ${userData.name}`).should("be.visible");
  });

  it("Logout de Usuário", () => {
    login.preencherFormularioDeLogin(userData.user, userData.password);

    menu.efetuarLogout();

    cy.url().should("contain", "login");
  });

  it("Cadastrar Usuário com e-mail existente no sistema", () => {
    cy.get(`[data-qa="signup-name"]`).type(`QA Tester`);
    cy.get(`[data-qa="signup-email"]`).type(`qa-tester-1759530219181@test.com`);

    cy.get(`[data-qa="login-button"]`).click();

    cy.contains("button", "Signup").click();
    cy.get(".signup-form > form > p").should(
      "contain",
      "Email Address already exist!"
    );
  });

  it("Enviar um formulário de Contato com Upload de arquivo", () => {
    cy.get("a[href*=contact]").click();

    cy.get('[data-qa="name"]').type(userData.name);
    cy.get('[data-qa="email"]').type(userData.email);
    cy.get('[data-qa="subject"]').type(userData.subject);
    cy.get('[data-qa="message"]').type(userData.message);

    cy.fixture("example.json").as("arquivo");
    cy.get("input[type=file]").selectFile("@arquivo");
    cy.get('[data-qa="submit-button"]').click();

    cy.get(".status").should("be.visible");
    cy.get(".status").should(
      "have.text",
      "Success! Your details have been submitted successfully."
    );
  });
});
