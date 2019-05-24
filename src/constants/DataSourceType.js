const DS_STATIC=1;//静态数据
const DS_CSVFILE=2;//CSV数据
const DS_DATABASE=3;//数据库
const DS_API=4;//API数据源
const DS_DATABASE_MYSQL=1001;//MySQL数据库
const DS_DATABASE_ORACLE=1002;//Oracle数据库
/***
 * 数据源类型
 */
export default {
	type: [{
			label: '静态数据',
			value: DS_STATIC,
			visible:true
		},
		{
			label: 'CSV文件',
			value: DS_CSVFILE,
			visible:true
		},
		{
			label: '数据库',
			value: DS_DATABASE,
			visible:true
		},
		{
			label: 'API',
			value: DS_API,
			visible:true
		}
//		,
//		{
//			label: 'MySQL数据库',
//			value: DS_DATABASE_MYSQL
//		},
//		{
//			label: 'Oracle数据库',
//			value: DS_DATABASE_ORACLE
//		}
	],
	DS_STATIC,
	DS_CSVFILE,
	DS_DATABASE,
	DS_API,
	DS_DATABASE_MYSQL,
	DS_DATABASE_ORACLE
}