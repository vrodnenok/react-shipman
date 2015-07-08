module.exports = {
  'Main page loads': function(client){
    client
      .url('http://localhost:3000')
      .assert.title("Victors new project")
      .end();
  }
};
