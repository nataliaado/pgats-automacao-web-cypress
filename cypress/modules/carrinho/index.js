class Carrinho {
  adicionarProdutoNoCarrinho() {
    cy.get('a.add-to-cart[data-product-id="1"]').first().click();
  }
}

export default new Carrinho();
