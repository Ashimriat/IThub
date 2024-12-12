import { EContentType } from '../../src/constants';


describe('My First Test', () => {
  it('Запускает функционал', () => {
    cy.viewport(1920, 1080);
    cy.visit('http://localhost:5173');

    const initActionDataTestAttr = `[data-test="action_${EContentType.INIT}"]`;

    for (const key of Object.keys(EContentType) as Array<keyof typeof EContentType>) {
      if (EContentType[key] === EContentType.INIT) continue;
      cy.get(`[data-test="action_${EContentType[key]}`).should('not.be.visible');
    }

    cy.get('[data-test="contentTitle"]').should('not.exist');


    cy.get(initActionDataTestAttr).click();
    
    cy.get(initActionDataTestAttr).should('not.be.visible');

    for (const key of Object.keys(EContentType) as Array<keyof typeof EContentType>) {
      if (EContentType[key] === EContentType.INIT) continue;
      cy.get(`[data-test="action_${EContentType[key]}`).should('be.visible');
    }

    cy.get('[data-test="contentTitle"]').should('exist').and('have.text', 'Добро пожаловать в терминал!');
  });
});
