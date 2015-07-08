module.exports = {
  index: function *index(next){
    yield this.render('index', {
      title: "Victors new project"
    });
    yield next;
  }
};
