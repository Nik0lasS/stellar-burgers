describe('Проверка constructor', () => {
  beforeEach(() => {
    cy.visit('http://localhost:4000');
    cy.intercept('GET', 'api/ingredients', { fixture: 'ingredient.json' });
    cy.intercept('POST', 'api/orders', { fixture: 'order.json' });
    cy.intercept('GET', 'api/auth/user', { fixture: 'user.json' });
    localStorage.setItem('refreshToken', 'refreshToken');
    cy.setCookie('accessToken', 'accessToken');
  });
  afterEach(() => {
    cy.clearLocalStorage();
    cy.clearCookies();
  });
  describe('Проверка добавления ингредиентов', () => {
    it('Добавление булки', () => {
      cy.contains('Выберите булки').should('exist');
      cy.get('[data-cy=buns-category]')
        .should('exist')
        .contains('Добавить')
        .click();
      cy.get('[data-cy=constructor-bun-1]')
        .contains('Флюоресцентная булка R2-D3')
        .should('exist');
      cy.get('[data-cy=constructor-bun-2]')
        .contains('Флюоресцентная булка R2-D3')
        .should('exist');
    });
    it('Добавление начинки', () => {
      cy.contains('Выберите начинку').should('exist');
      cy.get('[data-cy=mains-category]')
        .should('exist')
        .contains('Добавить')
        .click();
      cy.get('[data-cy=constructor]')
        .contains('Биокотлета из марсианской Магнолии')
        .should('exist');
    });
    it('Добавление соусов', () => {
      cy.contains('Выберите начинку').should('exist');
      cy.get('[data-cy=sauces-category]')
        .should('exist')
        .contains('Добавить')
        .click();
      cy.get('[data-cy=constructor]')
        .contains('Соус с шипами Антарианского плоскоходца')
        .should('exist');
    });
  });
  describe('Проверка модальных окон', () => {
    it('Открытие модального окна ингридиента', () => {
      cy.get('[data-cy=buns-category]')
        .should('exist')
        .find('li')
        .first()
        .click();
      cy.contains('Детали ингредиента').should('exist');
      cy.get('[id=modals]').find('button').click().should('not.exist');
      cy.contains('Детали ингредиента').should('not.exist');
    });
  });
  describe('Проверка создания заказа', () => {
    it('Оформление заказа', () => {
      cy.get('[data-cy=constructor]')
        .contains('Флюоресцентная булка R2-D3')
        .should('not.exist');
      cy.get('[data-cy=constructor]')
        .contains('Соус с шипами Антарианского плоскоходца')
        .should('not.exist');
      cy.get('[data-cy=constructor]')
        .contains('Биокотлета из марсианской Магнолии')
        .should('not.exist');
      cy.get('[data-cy=buns-category]').contains('Добавить').click();
      cy.get('[data-cy=mains-category]').contains('Добавить').click();
      cy.get('[data-cy=sauces-category]').contains('Добавить').click();
      cy.get('[data-cy=constructor]')
        .contains('Флюоресцентная булка R2-D3')
        .should('exist');
      cy.get('[data-cy=constructor]')
        .contains('Соус с шипами Антарианского плоскоходца')
        .should('exist');
      cy.get('[data-cy=constructor]')
        .contains('Биокотлета из марсианской Магнолии')
        .should('exist');
      cy.get('[type=button]').contains('Оформить заказ').click();
      cy.get('[id=modals]').contains('1').should('exist');
      cy.get('[id=modals]').find('button').click().should('not.exist');
      cy.get('[data-cy=constructor]')
        .contains('Флюоресцентная булка R2-D3')
        .should('not.exist');
      cy.get('[data-cy=constructor]')
        .contains('Соус с шипами Антарианского плоскоходца').should('not.exist');
      cy.get('[data-cy=constructor]')
        .contains('Биокотлета из марсианской Магнолии')
        .should('not.exist');
    });
  });
});
