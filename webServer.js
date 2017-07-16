var express  = require('express'); //확장모듈을 불러온다.
var http = require('http'); //기본 모듈
var path = require('path');
var static = require('serve-static'); //특정폴더 접근 허용 미들웨어
var bodyParser = require('body-parser'); //post 방식 사용 모듈
var cookieParser =  require('cookie-parser');

var app = express();

app.set('port',process.env.PORT || 3000);

app.use('/Page',static(path.join(__dirname,'Page')));  //현재실행되는 폴더 = __dirname , path.join 경로를 붙여주는 함수

app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());


var router = express.Router(); //라우터 생성

router.route('/main').get(function(req,res){
    console.log('/main 라우팅함수 호출됨');

    res.send(req.cookies);


});

app.use('/',router);


var server = http.createServer(app).listen(app.get('port'),function(){
    console.log('익스프레스로 웹서버를 실행함 : '+app.get('port'));
});  //express를 이용해서 서버 생성
