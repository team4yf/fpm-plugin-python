var should = require("should");
var YF = require("yf-fpm-client-nodejs").default;

YF.init({appkey: '123123', endpoint: 'http://localhost:9999/api'});

describe('Python', function(){
  it('Python function', function(done){
    var func = new YF.Func('script.python');
    func.invoke({project: '', script: 'test.py', params: [1, 2, 3]})
      .then(function(data){
        console.log(data);
        done();
      }).catch(function(err){
        done(err);
      });
  });
})
