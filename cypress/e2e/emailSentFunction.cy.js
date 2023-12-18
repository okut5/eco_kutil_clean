describe('Email Sent Test', () => { 
    beforeEach(() => {
      cy.visit('http://localhost:3000/');
    })

  it('sends an email and displays confirmation', () => {
    cy.wait(1000); // wait for 1 second

    // Fill the form
    cy.get('#nameId').type('John Doe')
    cy.get('#emailId').type('johndoe@example.com')
    cy.get('#messageId').type('Hello, this is a test message.')

    // Submit the form
    cy.wait(1000); // wait for 1 second
    cy.get('#submitButton').click().debug();
    cy.wait(3000); // wait for 3 second
    // Check if the success message is displayed
    cy.get('h1').should('have.text', 'Email byl v pořádku doručen').and('be.visible').debug();
  });
});