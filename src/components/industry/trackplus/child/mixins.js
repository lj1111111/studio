import { DEVICE_QUERY } from '../js/serviceapi.js'
const pagesize = 20; //每页大小

export default {
	data() {
		return {
			bprocessStyle: {
				backgroundColor: '#ccc'
			}
		}
	},
	methods: {
		/***
		 * 查询设备
		 */
		querySearch(queryString, cb) {

			var index = this.params.dataConfig.dsId;
			var url = this.spaceRestUrl + DEVICE_QUERY + index + "&key=" + queryString + "&size=" + pagesize;
			this.$fetch(url).then(response => {
				var restaurants = response.info && response.info.item ? response.info.item : [];
				var results = queryString ? restaurants.filter(this.createFilter(queryString)) : restaurants;
				// 调用 callback 返回建议列表的数据
				cb(results);
			});
		},
		createFilter(queryString) {
			return(restaurant) => {
				return(restaurant.id.toLowerCase().search(queryString.toLowerCase()) >= 0);
			};
		},
		handleSelect(item) {
			this.code = item ? item.id : '';
		},
		computeScale() {
			var bounds = this.map && this.map.getBounds();
			var size = this.map && this.map.getSize();
			if(bounds && size) {
				var difLng = bounds.getEast() - bounds.getWest();
				var difWidth = size.x;
				return difLng / difWidth;
			}
			return 0;
		}
	},
	computed: {
		heightStyle() {
			return {
				maxHeight: this.height - 52 + "px",
				overflow: 'auto'
			}
		}
	}
}