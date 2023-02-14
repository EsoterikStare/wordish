const testGameA = {
  solution: 'smell',
  maxGuesses: 6,
  wordLength: 5,
  id: '2bda9a721',
};

describe('Wordish', () => {
  describe('Main app behaviors', () => {
    it('should be able to visit the localhost app', () => {
      cy.visit('localhost:3000');
    });
    it('should automatically update the url with a query parameter, p, when not part of the original url', () => {
      cy.visit('localhost:3000');
      cy.url().should('include', '?p=');
    });
    it('should load a specific solution when given a valid p query parameter in the url', () => {
      cy.visit(`localhost:3000/?p=${testGameA.id}`);
      cy.get('#root').type(`${testGameA.solution}{Enter}`);
      cy.findByRole('dialog').within(() => cy.findByRole('button', { name: /share/i }));
      cy.findByText(/you did it/i);
    });
    it('should show the fail dialog when you fail to guess the word', () => {
      cy.visit(`localhost:3000/?p=${testGameA.id}`);
      cy.get('#root').type(`${'wrong{Enter}'.repeat(testGameA.maxGuesses)}`);
      cy.findByRole('dialog').within(() => cy.findByRole('button', { name: /another!/i }));
      cy.findByText(/That's ok! Try another!/i);
    });
  });
  describe('Header component', () => {
    it('should be present', () => {
      cy.visit('localhost:3000');
      cy.findByTestId('header-grid');
    });
    it('should have a stats and share button', () => {
      cy.visit('localhost:3000');
      cy.findByTestId('header-grid').within(() =>
        cy.findByRole('button', { name: 'Stats and Share' })
      );
    });
    it('should reveal the StatsDialog when the "stats and share" button is clicked', () => {
      cy.visit('localhost:3000');
      cy.findByTestId('header-grid');
      cy.findByTestId('header-grid').within(() =>
        cy.findByRole('button', { name: 'Stats and Share' }).click()
      );
      cy.findByRole('dialog');
    });
  });
  describe('WordGrid component', () => {
    it('should be present', () => {
      cy.visit('localhost:3000');
      cy.findByTestId('words-grid');
    });
  });
  describe('Keyboard component', () => {
    it('should be present', () => {
      cy.visit('localhost:3000');
      cy.findByTestId('keyboard-grid');
    });
  });
});
