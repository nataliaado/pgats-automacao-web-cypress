class Menu {
  navegarParaLogin() {
    cy.get('a[href="/login"]').click();
  }

  efetuarLogout() {
    cy.get('a[href="/logout"]').should("be.visible").click();
  }

  navegarParaProduto() {
    cy.get('a[href="/products"]').click();
  }
}

export default new Menu();
