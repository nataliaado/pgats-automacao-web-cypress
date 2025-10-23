/// <reference types="cypress"/>

import validUserData from "../fixtures/valid-user.json";
import { getRandomNumber, getRandomEmail } from "../support/helpers";
import { faker } from "@faker-js/faker";

describe("Automation Exercise", () => {
  beforeEach(() => {
    cy.viewport("iphone-xr");
    cy.visit("https://automationexercise.com/");
    //cy.get('a[href="/login"]').click();
    cy.xpath('//a[@href="/login"]').click();
  });

  it("Exemplos de Logs", () => {
    cy.log(`STEP 1 :: PGATS AUTOMAÇÃO WEB CY LOG`);
    cy.log(`STEP 2 :: PGATS AUTOMAÇÃO WEB CY LOG`);

    cy.log(`getRandomNumber: ${getRandomNumber()}`);
    cy.log(`getRandomEmail: ${getRandomEmail()}`);

    cy.log(`Dog Breed: ${faker.animal.dog()}`);

    cy.log(`Nome do usuário: ${validUserData.name}`);
    cy.log(`Email do usuário: ${validUserData.email}`);
  });

  it("Cadastrar um Usuário", () => {
    const timestamp = new Date().getTime();

    //cy.get('[data-qa="signup-name"]').type("QA Tester");
    cy.xpath('//input[@data-qa="signup-name"]').type("QA Tester");

    //cy.get('[data-qa="signup-email"]').type(`qa-tester-${timestamp}@test.com`);
    cy.xpath('//input[@data-qa="signup-email"]').type(
      `qa-tester-${timestamp}@test.com`
    );

    cy.contains("button", "Signup").click();

    // radio ou checkboxes -> check
    //cy.get("#id_gender1").check;
    //cy.get("input[type=radio]").check("Mrs");
    cy.xpath('//input[@type="radio"]').check("Mrs");

    //cy.get("input#password").type("12345", { log: false });
    cy.xpath('//input[@type = "password"]').type("12345", { log: false });

    // para comboboxes ou selects -> select
    //cy.get("select[data-qa=days]").select("20");
    cy.xpath('//select[@data-qa="days"]').select("20");
    //cy.get("select[data-qa=months]").select("September");
    cy.xpath('//select[@data-qa="months"]').select("September");
    // cy.get("select[data-qa=years]").select("1992");
    cy.xpath('//select[@data-qa="years"]').select("1992");

    // radio ou checkboxes - > check
    //cy.get("input[type=checkbox]#newsletter").check();
    cy.xpath('//input[@id="newsletter"]').check();

    //cy.get("input[type=checkbox]#optin").check();
    cy.xpath('//input[@id="optin"]').check();

    //cy.get("input#first_name").type(faker.person.firstName());
    cy.xpath('//input[@data-qa="first_name"]').type(faker.person.firstName());

    //cy.get("input#last_name").type(faker.person.lastName());
    cy.xpath('//input[@data-qa="last_name"]').type(faker.person.lastName());

    //cy.get("input#company").type(faker.company.name());
    cy.xpath('//input[@id="company"]').type(faker.company.name());

    //cy.get("input#address1").type(faker.location.streetAddress());
    cy.xpath('//input[@id="address1"]').type(faker.location.streetAddress());

    //cy.get("select#country").select("Canada");
    cy.xpath('//select[@id="country"]').select("Canada");

    //cy.get("input#state").type(faker.location.state());
    cy.xpath('//input[@id="state"]').type(faker.location.state());

    //cy.get("input#city").type(faker.location.city());
    cy.xpath('//input[@id="city"]').type(faker.location.city());

    //cy.get('[data-qa="zipcode"]').type(faker.location.zipCode("#####"));
    cy.xpath('//input[@data-qa="zipcode"]').type(
      faker.location.zipCode("#####")
    );

    //cy.get('[data-qa="mobile_number"]').type(faker.phone.number("### ### ###"));
    cy.xpath('//input[@data-qa="mobile_number"]').type(
      faker.phone.number("### ### ###")
    );

    // cy.get('[data-qa="create-account"]').click();
    cy.xpath('//button[@data-qa="create-account"]').click();

    cy.url().should("includes", "account_created");
    cy.contains("b", "Account Created!");
  });

  it("Login de Usuário com e-mail e senha corretos", () => {
    //cy.get(`[data-qa="login-email"]`).type(`qa-tester-1759530219181@test.com`);
    cy.xpath(`//input[@data-qa="login-email"]`).type(
      `qa-tester-1759530219181@test.com`
    );

    //cy.get(`[data-qa="login-password"]`).type(`12345`);
    cy.xpath(`//input[@data-qa="login-password"]`).type(`12345`);

    //cy.get(`[data-qa="login-button"]`).click();
    cy.xpath(`//button[@data-qa="login-button"]`).click();

    //cy.get("i.fa-user").parent().should("contain", "QA Tester");
    cy.xpath('//i[@class="fa fa-user"]')
      .parent()
      .should("contain", "QA Tester");

    //cy.get('a[href="/logout"]').should("be.visible");
    cy.xpath('//a[@href="/logout"]').should("be.visible");

    cy.contains("b", "QA Tester");
    cy.contains(` Logged in as QA Tester`).should("be.visible");
  });

  it("Logout de Usuário", () => {
    //cy.get(`[data-qa="login-email"]`).type(`qa-tester-1759530219181@test.com`);
    cy.xpath(`//input[@data-qa="login-email"]`).type(
      `qa-tester-1759530219181@test.com`
    );

    //cy.get(`[data-qa="login-password"]`).type(`12345`);
    cy.xpath(`//input[@data-qa="login-password"]`).type(`12345`);

    //cy.get(`[data-qa="login-button"]`).click();
    cy.xpath(`//button[@data-qa="login-button"]`).click();

    //cy.get("i.fa-user").parent().should("contain", "QA Tester");
    cy.xpath('//i[@class="fa fa-user"]')
      .parent()
      .should("contain", "QA Tester");

    //cy.get('a[href="/logout"]').should("be.visible");
    cy.xpath('//a[@href="/logout"]').should("be.visible");

    //cy.get('a[href="/logout"]').should("be.visible").click();
    cy.xpath('//a[@href="/logout"]').should("be.visible").click();

    cy.url().should("contain", "login");
  });

  it("Cadastrar Usuário com e-mail existente no sistema", () => {
    //cy.get('[data-qa="signup-name"]').type("QA Tester");
    cy.xpath('//input[@data-qa="signup-name"]').type("QA Tester");

    //cy.get(`[data-qa="signup-email"]`).type(`qa-tester-1759530219181@test.com`);
    cy.xpath('//input[@data-qa="signup-email"]').type(
      `qa-tester-1759530219181@test.com`
    );

    //cy.get(`[data-qa="login-button"]`).click();
    cy.xpath(`//button[@data-qa="login-button"]`).click();

    cy.contains("button", "Signup").click();
    //cy.get(".signup-form > form > p").should("contain","Email Address already exist!");
    cy.xpath('//p[text()="Email Address already exist!"]').should(
      "contain",
      "Email Address already exist!"
    );
  });

  it("Enviar um formulário de Contato com Upload de arquivo", () => {
    //cy.get("a[href*=contact]").click();
    cy.xpath('//a[@href="/contact_us"]').click();

    //cy.get('[data-qa="name"]').type(validUserData.name);
    cy.xpath('//input[@data-qa="name"]').type(validUserData.name);

    //cy.get('[data-qa="email"]').type(validUserData.email);
    cy.xpath('//input[@data-qa="email"]').type(validUserData.email);

    //cy.get('[data-qa="subject"]').type(validUserData.subject);
    cy.xpath('//input[@data-qa="subject"]').type(validUserData.subject);

    //cy.get('[data-qa="message"]').type(validUserData.message);
    cy.xpath('//textarea[@data-qa="message"]').type(validUserData.message);

    cy.fixture("valid-user.json").as("arquivo");
    //cy.get("input[type=file]").selectFile("@arquivo");
    cy.xpath('//input[@type="file"]').selectFile("@arquivo");

    //cy.get('[data-qa="submit-button"]').click();
    cy.xpath('//input[@data-qa="submit-button"]').click();

    //cy.get(".status").should("be.visible");
    cy.xpath('//div[@class="status alert alert-success"]').should("be.visible");

    //cy.get(".status").should("have.text","Success! Your details have been submitted successfully.");
    cy.xpath('//div[@class="status alert alert-success"]').should(
      "have.text",
      "Success! Your details have been submitted successfully."
    );
  });
});
