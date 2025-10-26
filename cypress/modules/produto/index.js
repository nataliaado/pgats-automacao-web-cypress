import produtoDetails from "../../fixtures/produto.json";

class Produto {
  acessarVerPrimeiroProduto() {
    cy.get('a[href="/product_details/1"]').click();
  }

  pesquisarPorProduto() {
    cy.get("#search_product").type(produtoDetails.nome);
    cy.get("#submit_search").click();
  }
}

export default new Produto();
