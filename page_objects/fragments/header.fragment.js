const {Button, Text} = require('../elements');

class HeaderFragment {
  constructor(){
    this.logout = new Button($('.main-button'));
    this.userInfo = new Text($('#greetings'));
  }

  async logout(){
    return this.logout.click();
  }

  async getLogout(){
    return this.logout.getText();
  }

  async getUserInfo(){
    return this.userInfo.getText();
  }
}

module.exports = {HeaderFragment};