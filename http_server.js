/**
 * Created by Administrator on 2016/10/29.
 */
var http = require('http');
var fs = require('fs');
var url = require('url');

var server = http.createServer(function (request, response) {
    var urlObj = url.parse(request.url);

    // 读取文件，并返回一定值。
    fs.readFile('index.html', 'utf-8', function (err, data) {
        if(err){
            console.log('error');
        }else {
            response.write(data);
        }
    });
    // response.end('<html><body><h3>恭喜你成功访问我啦啦啦</h3></body></html>');
    /**
     * Created by Administrator on 2016/10/30.
     */
    var OptPool = require('./mysql_pool');
    var optPool =new OptPool();
    var pool = optPool.getPool();

//插入数据
//从连接池中取出一个连接
    pool.getConnection(function (err, conn) {
        var userAddSql = 'insert into nodejs values (?,?)';
        var param = ['666', 'yigejiaaaaa'];
        conn.query(userAddSql, param, function (err, rs) {
            if(err){
                console.log('insert err',err.message);

            }else {
                console.log('insert success!');
                //conn.release();  //放回连接池
            }

        })

    });

//查询
    pool.getConnection(function (err, conn) {
        var data = [];
        conn.query('select * from nodejs', function (err, rs) {
            if(err){
                console.log(err.message);
            }else {
                for (var i=0; i<rs.length; i++){
                    // response.write('<h3> '+rs[i].id+'</h3>');
                    data.push(rs[i].name);
                }
                var string = data.join(',');
                response.write(string);
                response.end('index.html');
                conn.release();  //放回连接池
            }
        })
    });
    // response.end(urlObj.pathname);
});


server.listen(1356);