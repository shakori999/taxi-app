const logIn = () => {
  const { username, password } = Cypress.env('driver')

  // Capture API calls.
  cy.server()
  cy.route('POST', '**/api/log_in/').as('logIn')

  // Log in.
  cy.visit('/#/log-in')
  cy.get('input#username').type(username)
  cy.get('input#password').type(password, { log: false })
  cy.get('button').contains('Log in').click()
  cy.wait('@logIn')

}

describe('The driver dashboard', function () {

  before(function () {
    cy.loadUserData();
  });
  it('Cannot be visited if the user is not a driver', function () {
    const { username, password } = Cypress.env('rider')

    // Capture API calls.
    cy.server()
    cy.route('POST', '**/api/log_in/').as('logIn')

    // Log in.
    cy.visit('/#/log-in')
    cy.get('input#username').type(username)
    cy.get('input#password').type(password, { log: false })
    cy.get('button').contains('Log in').click()
    cy.hash().should('eq', '#/')
    cy.get('button').contains('Log out')
    cy.wait('@logIn')

    cy.visit('/#/driver')
    cy.hash().should('eq', '#/')
  })

  it('Can be visited if the user is a driver', function () {
    logIn();
    cy.visit('/#/driver')
    cy.hash().should('eq', '#/driver')
  })
})

context('When there are no trips', function() {
  before(function () {
    cy.task('tableTruncate', {
      table: 'trips_trip'
    });
  });

  it('Displays messages for no trips', function () {
    // cy.intercept('GET', '**/api/trip/').as('getTrips');
    
    cy.intercept('trip', {
      statusCode: 200,
      body: []
    }).as('getTrips');
    logIn();

    cy.visit('/#/driver');
    cy.wait('@getTrips');

    // Current trips
    cy.get('[data-cy=trip-card]')
      .eq(0)
      .contains('No trips.'); 
    // Requested trips
    cy.get('[data-cy=trip-card]')
      .eq(1)
      .contains('No trips. ');
    
    // Completed trips
    cy.get('[data-cy=trip-card]')
      .eq(2)
      .contains('No trips. ');
  });
});