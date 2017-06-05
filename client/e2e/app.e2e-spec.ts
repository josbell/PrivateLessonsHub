import { PrivateLessonsFrontEndPage } from './app.po';

describe('private-lessons-front-end App', () => {
  let page: PrivateLessonsFrontEndPage;

  beforeEach(() => {
    page = new PrivateLessonsFrontEndPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
