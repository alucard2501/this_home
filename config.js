

var Config = {};
/***nodejs监视http请求的端口***/
Config.HTTP_PORT = "3000";
/***本机IP***/
Config.LOCAL_IP = "192.168.0.119";
/***硬件组列表 */
Config.BUSES=["LBus","OBus"];
/***数据库主机 */
Config.DB_HOST="localhost";
/***数据库端口 */
Config.DB_PORT="3306";
/***数据库用户 */
Config.DB_USER="root";
/***数据库密码 */
Config.DB_PASS="boat";
/***数据库 */
Config.DB_NAME="db_thishome";
/***产生二维码用的key */
Config.QR_CODE_KEY="";

exports.LOCAL_IP = Config.LOCAL_IP;
exports.HTTP_PORT = Config.HTTP_PORT;
exports.OBUS_PORT = Config.OBUS_PORT;
exports.LBUS_PORT = Config.LBUS_PORT;
exports.BUSES = Config.BUSES;

exports.DB_HOST = Config.DB_HOST;
exports.DB_PORT = Config.DB_PORT;
exports.DB_USER = Config.DB_USER;
exports.DB_PASS = Config.DB_PASS;
exports.DB_NAME = Config.DB_NAME;
exports.QR_CODE_KEY = Config.QR_CODE_KEY;
exports.INFO='调试访问页面：http://app.onlytechglobal.com/OnlyTechHome/pages/get_code.html?appid=wxe01620749eed5934&scope=snsapi_base&state=index&redirect_uri=http%3A%2f%2f192.168.0.119%3A3000%2fmobile%2fmain.html';