import common from '../../mixins/common.js'
import { mapState } from 'vuex'
import { getField, deepClone, isInteger } from '../../utils/util.js'

//数据库数据源服务子URL
const DB_SUB_REST = "/dboperation/v3/dboperation/selectrecord";
/***
 * 组件混合基类
 */
export default {
	mixins: [common],
	data() {
		return {
			interval: null //定时器
		}
	},
	methods: {
		init() {
			this.$nextTick(() => {
				if(this.interval) {
					clearInterval(this.interval);
				}
				if(this.params.dataConfig.type == 3) //数据库模式
				{
					this.dowithDataBase(); //调用子mixin
					var func = this.dowithDataBase;
					if(this.params.dataConfig.autoUpdate) {
						var t = isInteger(this.params.dataConfig.intervalTime);
						if(t) {
							this.interval = setInterval(this.dowithDataBase, this.params.dataConfig.intervalTime * 1000);
						} else {
							this.interval = setInterval(this.dowithDataBase, 5 * 1000);
						}
					}
				} else if(this.params.dataConfig.type == 4) //API
				{
					this.dowithAPI(); //调用子mixin
					var func = this.dowithAPI;
					if(this.params.dataConfig.autoUpdate) {
						var t = isInteger(newval.dataConfig.intervalTime);
						if(t) {
							this.interval = setInterval(this.dowithAPI, this.params.dataConfig.intervalTime * 1000);
						} else {
							this.interval = setInterval(this.dowithAPI, 5 * 1000);
						}
					}
				} else {
					var params2 = deepClone(this.params);
					this.createComponent(params2);
				}
			})
		},
		//处理API
		dowithAPI() {
			var params = deepClone(this.params);
			this.$fetch(params.dataConfig.api.rest).then(repsone => {
				var data = repsone;
				if(data && data.length > 0) {
					params.dataConfig.data = data;
					this.createComponent(params);
				} else {
					this.$message({
						message: '数据为空！',
						type: 'warning'
					});
				}
			}).catch(error => {
				this.$message.error('服务器错误！');
			});
		},
		//处理数据库
		dowithDataBase() {
			var params = deepClone(this.params);
			var dbConfig = params.dataConfig.dbConfig;
			if(dbConfig && dbConfig.tableName) {
				var url = this.dbUrl + DB_SUB_REST;
				var params2 = {
					tablename: dbConfig.tableName,
					fields: '*',
					filter: dbConfig.condition ? dbConfig.condition : ''
				};
				this.$fetch(url, params2).then(repsone => {
					var data = repsone;
					if(repsone && repsone.status == 0) {
						var data = repsone.result;
						if(data && data.length > 0) {
							params.dataConfig.data = data;
							this.createComponent(params);
						} else {
							this.$message({
								message: '数据为空！',
								type: 'warning'
							});
						}
					} else {
						this.$message.error('服务器错误！');
					}
				}).catch(error => {
					this.$message.error('服务器错误！');
				});
			} else {
				this.$message.error('缺少必需参数！');
			}
		},
		//组件需要实现此方法
		createComponent(params) {

		}
	},
	computed: {
		...mapState([
			'dbUrl','dbRestUrl','bus'
		])
	},
	mounted() {
		this.init();
	},
	watch: {
		'params': {
			handler(curVal, oldVal) {　　　　　　　　　　　　
				this.init();　　　　　　　　
			},
			deep: true
		}
	}
}