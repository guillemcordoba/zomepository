import { html, fixture, expect } from '@open-wc/testing';

import {UiUi} from '../src/UiUi.js';
import '../src/ui-ui.js';

describe('UiUi', () => {
  it('has a default title "Hey there" and counter 5', async () => {
    const el: UiUi = await fixture(html`
      <ui-ui></ui-ui>
    `);

    expect(el.title).to.equal('Hey there');
    expect(el.counter).to.equal(5);
  });

  it('increases the counter on button click', async () => {
    const el: UiUi = await fixture(html`
      <ui-ui></ui-ui>
    `);
    el.shadowRoot!.querySelector('button')!.click();

    expect(el.counter).to.equal(6);
  });

  it('can override the title via attribute', async () => {
    const el: UiUi = await fixture(html`
      <ui-ui title="attribute title"></ui-ui>
    `);

    expect(el.title).to.equal('attribute title');
  });

  it('passes the a11y audit', async () => {
    const el: UiUi = await fixture(html`
      <ui-ui></ui-ui>
    `);

    await expect(el).shadowDom.to.be.accessible();
  });
});
