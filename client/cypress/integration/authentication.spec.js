Cypress.on('uncaught:exception', (err, runnable) => {
    // returning false here prevents Cypress from
    // failing the test
    return false
})

describe('Authentication', function () {
  it('Can sign up.', function () {
    const filepath = 'images/photo.jpg'
    cy.server();
    cy.route({
      method: 'POST',
      url: '**/api/sign_up/**',
      status: 201,
      response: {
        'id': 1,
        'username': 'gary.cole@example.com',
        'first_name': 'Gary',
        'last_name': 'Cole',
        'group': 'driver',
        'photo': '/media/images/photo.jpg'
      }
    }).as('signUp');

    cy.visit('/#/sign-up');
    cy.get('input#username').type('gary.cole@example.com');
    cy.get('input#firstName').type('Gary');
    cy.get('input#lastName').type('Cole');
    cy.get('input#password').type('pAssw0rd', { log: false });
    cy.get('select#group').select('driver');

    cy.get('input#photo').attachFile(filepath)
    cy.get('button').contains('Sign up').click();
    cy.wait('@signUp');
    cy.hash().should('eq', '#/log-in');
    cy.route('POST', '**/api/log_in/**').as('logIn');
  });
  const logIn = () => {
    const { username, password } = Cypress.env('credentials');

    // Capture HTTP requests.
    cy.server();
    cy.route({
      method: 'POST',
      url: '**/api/log_in/**',
      status: 200,
      response: {
        'access': 'ACCESS_TOKEN',
        'refresh': 'REFRESH_TOKEN'
      }
    }).as('logIn');

    // Log into the app.
    cy.visit('/#/log-in');
    cy.get('input#username').type(username);
    cy.get('input#password').type(password, { log: false });
    cy.get('button').contains('Log in').click();
    cy.wait('@logIn');
    cy.route('POST', '**/api/log_in/**').as('logIn');
  }; 
  it('Can log in.', function () {
    logIn();
    cy.hash().should('eq', '#/');
  });

  it('Cannot visit the login page when logged in', function () {
    logIn();
    cy.visit('/#/log-in');
    cy.hash().should('eq', '/');

  });

 //  it('Cannot visit the sign up when logged in', function () {
 //    logIn();
 //    cy.visit('/#/sign-up');
 //    cy.hash().should('eq', '#/');
 //  });

 //  it('Cannot see the links when logged in', function () {
 //    logIn();
 //    cy.get('button#signUp').should('not.exist')
 //    cy.get('button#logIn').should('not.exist')
 //  });

 //  it("Shows an alert on login error.", function() {
 //    const { username, password } = Cypress.env('credentials');
 //    cy.server();
 //    cy.route({
 //      method: 'POST',
 //      url: '**/api/log_in/**/',
 //      status: 400,
 //      response: {
 //        '__all__': [
 //          'Please enter a correct username and password.' +
 //          'Note that both fields may be case-sensitive.'
 //        ]
 //      }
 //    }).as('logIn');
 //    cy.visit('/#/log-in');
 //    cy.get('input#username').type(username);
 //    cy.get('input#password').type(password, {log: false});
 //    cy.get('button').contains('Log in').click();
 //    cy.wait('@logIn');
 //    cy.get('div.alert').contains(
 //      'Please enter a correct username and password.' +
 //      'Note that both fields may be case-sensitive.'
 //    );
 //    cy.hash().should('eq', '#/log-in');
 //  });

 //  it('Can log out.', function () {
 //  logIn();
 //  cy.get('button').contains('Log out').click().should(() => {
 //    expect(window.localStorage.getItem('taxi.auth')).to.be.null;
 //  });
 //  cy.get('button').contains('Log out').should('not.exist');
 //  });

 //  it('Show invalid fields on sign up error.', function () {
 //    const filepath = 'images/photo.jpg'
 //    cy.server();
 //    cy.route({
 //      method: 'POST',
 //      url: '**/api/sign_up/**',
 //      status: 400,
 //      response: {
 //        'username': [
 //          'A user with that username already exists.'
 //        ]
 //      }
 //    }).as('signUp');
 //    cy.visit('/#/sign-up');
 //    cy.get('input#username').type('gary.cole@example.com');
 //    cy.get('input#firstName').type('Gary');
 //    cy.get('input#lastName').type('Cole');
 //    cy.get('input#password').type('pAssw0rd', { log: false });
 //    cy.get('select#group').select('driver');

 //    cy.get('input#photo').attachFile(filepath)
 //    cy.get('button').contains('Sign up').click();
 //    cy.wait('@signUp');
 //    cy.get('div.invalid-feedback').contains(
 //      'A user with that username already exists'
 //    );
 //    cy.hash().should('eq', '#/sign-up');
 //  });
});
