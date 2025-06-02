describe('Sign Up Page', () => {
  it('submits form successfully', () => {
    cy.visit('/auth/signup');

    cy.get('input[name="fullName"]').type('Test User');
    cy.get('input[name="email"]').type('test@example.com');
    cy.get('input[name="password"]').type('Password123');

    cy.get('button[type="submit"]').click();

    cy.url().should('include', '/dashboard');
    cy.contains('Welcome, Test User').should('be.visible');
  });
});
