/// <reference types="cypress"/>

import validUserData from "../fixtures/valid-user.json";
import invalidUserData from "../fixtures/invalid-user.json";
import produtoDetails from "../fixtures/produto.json";
import menu from "../modules/menu";
import login from "../modules/login";
import cadastro from "../modules/cadastro";
import contato from "../modules/contato";
import produto from "../modules/produto";
import carrinho from "../modules/carrinho";

describe("Automation Exercise", () => {
  beforeEach(() => {
    cy.viewport("iphone-xr");
    cy.visit("https://automationexercise.com/");
  });

  it("Test Case 1: Register User", () => {
    cy.navegarParaLogin();
    login.preencherFormularioPreCadastro();
    cadastro.preencherCadastroFormularioCompleto();

    cy.url().should("includes", "account_created");
    cy.contains("b", "Account Created!");
  });

  it("Test Case 2: Login User with correct email and password", () => {
    cy.navegarParaLogin();
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
    cy.navegarParaLogin();
    login.preencherFormularioDeLogin(
      invalidUserData.user,
      invalidUserData.password
    );

    cy.contains("p", invalidUserData.message);
    cy.get('[data-qa="login-button"]').should("be.visible");
  });

  it("Test Case 4: Logout User", () => {
    cy.navegarParaLogin();
    login.preencherFormularioDeLogin(
      validUserData.user,
      validUserData.password
    );

    menu.efetuarLogout();

    cy.url().should("contain", "login");
  });

  it("Test Case 5: Register User with existing email", () => {
    cy.navegarParaLogin();
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

  it("Test Case 8: Verify All Products and product detail page", () => {
    menu.navegarParaProduto();
    cy.get(".features_items").should("be.visible");
    cy.get(".features_items .title.text-center").should(
      "have.text",
      "All Products"
    );

    produto.acessarVerPrimeiroProduto();
    cy.get(".product-information > h2").should("contain", produtoDetails.nome);
    cy.get(".product-information").should("contain", produtoDetails.categoria);
    cy.get(".product-information").should(
      "contain",
      produtoDetails.disponibilidade
    );
    cy.get(".product-information").should("contain", produtoDetails.preco);
    cy.get(".product-information").should("contain", produtoDetails.condicao);
    cy.get(".product-information").should("contain", produtoDetails.marca);
  });

  it("Test Case 9: Search Product", () => {
    menu.navegarParaProduto();
    cy.get(".features_items").should("be.visible");
    cy.get(".features_items .title.text-center").should(
      "have.text",
      "All Products"
    );

    produto.pesquisarPorProduto();
    cy.get(".features_items .title.text-center").should(
      "have.text",
      "Searched Products"
    );
    cy.get(".productinfo > p").should("contain", produtoDetails.nome);
  });

  it("Test Case 10: Verify Subscription in home page", () => {
    contato.fazerSubscricao();
    cy.get(".alert-success").should(
      "have.text",
      "You have been successfully subscribed!"
    );
  });

  it("Test Case 15: Place Order: Register before Checkout", () => {
    cy.navegarParaLogin();
    login.preencherFormularioPreCadastro();
    cadastro.preencherCadastroFormularioCompleto();

    cy.url().should("includes", "account_created");
    cy.contains("b", "Account Created!");

    cadastro.confirmarContaCriada();
    carrinho.adicionarProdutoNoCarrinho();
    carrinho.irParaCarrinho();
    cy.url().should("includes", "view_cart");

    carrinho.irParaCheckout();
    carrinho.fazerPedido();
    carrinho.preencherDadosParaPagamento();

    cy.contains(
      ".col-sm-9 > p",
      "Congratulations! Your order has been confirmed!"
    );
  });
});
