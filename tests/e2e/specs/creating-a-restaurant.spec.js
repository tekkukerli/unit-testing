describe('Creating a Restaurant', () => {
    it('allows adding restaurants', () => {
      const restaurantId = 27;
      const restaurantName = 'Sushi Place';
  
      cy.server({force404: true});
  
      cy.route({
        method: 'GET',
        url:
          'https://outside-in-dev-api.herokuapp.com/V06y0OScZBi3avMESUUEk9yzReSxFO1k/restaurants',
        response: [],
      });
  
      cy.route({
        method: 'POST',
        url:
          'https://outside-in-dev-api.herokuapp.com/V06y0OScZBi3avMESUUEk9yzReSxFO1k/restaurants',
        response: {
          id: restaurantId,
          name: restaurantName,
        },
      }).as('addRestaurant');
  
      cy.visit('/');
  
      cy.get('[placeholder="Add Restaurant"]').type(restaurantName);
      cy.contains('Add').click();
  
      cy.wait('@addRestaurant')
        .its('requestBody')
        .should('deep.equal', {
          name: restaurantName,
        });
  
      cy.contains(restaurantName);
    });
  });