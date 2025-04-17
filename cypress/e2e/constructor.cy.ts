describe('Проверка constructor', () => {
  const constructorSelector = '[data-cy=constructor]';
  const bunsCategorySelector = '[data-cy=buns-category]';
  const mainsCategorySelector = '[data-cy=mains-category]';
  const saucesCategorySelector = '[data-cy=sauces-category]';
  const modalSelector = '[id=modals]';
  beforeEach(() => {
    cy.visit('/');
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
      cy.get(bunsCategorySelector)
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
      cy.get(mainsCategorySelector)
        .should('exist')
        .contains('Добавить')
        .click();
      cy.get(constructorSelector)
        .contains('Биокотлета из марсианской Магнолии')
        .should('exist');
    });
    it('Добавление соусов', () => {
      cy.contains('Выберите начинку').should('exist');
      cy.get(saucesCategorySelector)
        .should('exist')
        .contains('Добавить')
        .click();
      cy.get(constructorSelector)
        .contains('Соус с шипами Антарианского плоскоходца')
        .should('exist');
    });
  });
  describe('Проверка модальных окон', () => {
    it('Открытие модального окна ингридиента', () => {
      cy.get(bunsCategorySelector)
        .should('exist')
        .find('li')
        .first()
        .click();
      cy.contains('Детали ингредиента').should('exist');
      cy.get(modalSelector).find('button').click().should('not.exist');
      cy.contains('Детали ингредиента').should('not.exist');
    });
  });
  describe('Проверка создания заказа', () => {
    it('Оформление заказа', () => {
      cy.get(constructorSelector)
        .contains('Флюоресцентная булка R2-D3')
        .should('not.exist');
      cy.get(constructorSelector)
        .contains('Соус с шипами Антарианского плоскоходца')
        .should('not.exist');
      cy.get(constructorSelector)
        .contains('Биокотлета из марсианской Магнолии')
        .should('not.exist');
      cy.get(bunsCategorySelector).contains('Добавить').click();
      cy.get(mainsCategorySelector).contains('Добавить').click();
      cy.get(saucesCategorySelector).contains('Добавить').click();
      cy.get(constructorSelector)
        .contains('Флюоресцентная булка R2-D3')
        .should('exist');
      cy.get(constructorSelector)
        .contains('Соус с шипами Антарианского плоскоходца')
        .should('exist');
      cy.get(constructorSelector)
        .contains('Биокотлета из марсианской Магнолии')
        .should('exist');
      cy.get('[type=button]').contains('Оформить заказ').click();
      cy.get(modalSelector).contains('1').should('exist');
      cy.get(modalSelector).find('button').click().should('not.exist');
      cy.get(constructorSelector)
        .contains('Флюоресцентная булка R2-D3')
        .should('not.exist');
      cy.get(constructorSelector)
        .contains('Соус с шипами Антарианского плоскоходца').should('not.exist');
      cy.get(constructorSelector)
        .contains('Биокотлета из марсианской Магнолии')
        .should('not.exist');
    });
  });
});
