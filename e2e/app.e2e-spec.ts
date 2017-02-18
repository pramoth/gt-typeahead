import { GtTypeaheadPage } from './app.po';

describe('gt-typeahead App', function() {
  let page: GtTypeaheadPage;

  beforeEach(() => {
    page = new GtTypeaheadPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
