import { ReduxAngularChatAppPage } from './app.po';

describe('redux-angular-chat-app App', () => {
  let page: ReduxAngularChatAppPage;

  beforeEach(() => {
    page = new ReduxAngularChatAppPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
