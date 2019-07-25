const { expect } = require('chai')

describe('Suite 1', () => {
  it('Case 1', async () => {
    await browser.get('/');
    expect(true).to.equal(true, `True should be true`);
  })
})
