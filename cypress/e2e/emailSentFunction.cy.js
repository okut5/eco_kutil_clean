describe('Email Sent Test and price calculation test ', () => { 
  beforeEach(() => {
    cy.visit('https://eco-kutil-clean-try1-6be92d72c6d5.herokuapp.com');
  })

  it('sends an email and displays confirmation', () => {
    cy.wait(1000); // wait for 1 second

    // Test price calculator
    cy.get('#numberInput').type('300');
    cy.get('#calculatePriceBtn').click();
  
    cy.get('#result').should('have.value', '1\u00a0125 Kč');

    // Assert the expected result for monthly cleaning
    // Replace regular spaces with non-breaking spaces in the assertion
    cy.get('#result_per_month').should('have.value', '24\u00a0188 Kč');

    // Fill the form
    cy.get('#nameId').type('John Doe')
    cy.get('#emailId').type('johndoe@example.com')
    cy.get('#messageId').type('Hello, this is a test message written by Cypress to test your app.')

    // Submit the form
    cy.wait(1000); // wait for 1 second
    cy.get('#submitButton').click().debug();
    cy.wait(1000); // wait for 3 second
    // Check if the success message is displayed
    cy.get('h1').should('have.text', 'Email doručen').and('be.visible').debug();
  });
});