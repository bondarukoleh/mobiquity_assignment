const {Button, Text} = require('../elements');

class HeaderFragment {
  constructor(){
    this.logout = new Button($('.main-button'));
    this.userInfo = new Text($('#greetings'));
  }

  async clickLogout(){
    return this.logout.click();
  }

  async getLogout(){
    return this.logout.getData();
  }

  async getUserInfo(){
    return this.userInfo.getText();
  }
}

module.exports = {HeaderFragment};