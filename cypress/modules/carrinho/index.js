import { faker } from "@faker-js/faker";

class Carrinho {
  adicionarProdutoNoCarrinho() {
    cy.get('a.add-to-cart[data-product-id="1"]').first().click();
  }

  irParaCarrinho() {
    cy.get("u").click();
  }

  irParaCheckout() {
    cy.get(".col-sm-6 > .btn").click();
  }

  fazerPedido() {
    cy.get('a[href="/payment"]').click();
  }

  preencherDadosParaPagamento() {
    const firstName = faker.person.firstName();
    const lastName = faker.person.lastName();
    const numeroCartao = faker.finance.creditCardNumber();
    const cvc = faker.finance.creditCardCVV();
    const mesExpiracao = faker.date.month();
    const anoExpiracao = faker.date
      .between({
        from: "2000-01-01",
        to: "2025-12-31",
      })
      .getFullYear();

    cy.get('[data-qa="name-on-card"]').type(`${firstName} ${lastName}`);
    cy.get('[data-qa="card-number"]').type(`${numeroCartao}`);
    cy.get('[data-qa="cvc"]').type(`${cvc}`);
    cy.get('[data-qa="expiry-month"]').type(`${mesExpiracao}`);
    cy.get('[data-qa="expiry-year"]').type(`${anoExpiracao}`);
    cy.get('[data-qa="pay-button"]').click();
  }
}

export default new Carrinho();
