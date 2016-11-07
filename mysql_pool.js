/**
 * Created by Administrator on 2016/10/30.
 */
//mysql 连接池的创建
var mysql = require('mysql');
function OptPool (){
    this.flag = true;  //是否连接过
    this.pool = mysql.createPool({
        host:'localhost',
        user:'root',
        password:'',
        database:'demo',
        port:'3306'
    });
    this.getPool = function () {
        if(this.flag){
            //监听connection事件
            this.pool.on('connection', function (connection) {
                connection.query('SET SESSION auto_increment_increment');
                this.flag = false;

            })

        }
        return this.pool;
    }
};
module.exports = OptPool;//导出为一个类
