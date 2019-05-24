<template>
	<div>
		<el-row class="right-component-item track-split-item" type="flex" align='middle'>
			<el-col :span="8">
				{{$t('CarType.vehicle_type')}}
			</el-col>
		</el-row>
		<div class="right-component-item track-split-item" style="display: flex;justify-content:space-between;flex-wrap:wrap">
			<div class="button-div" @click="handleCheckAllChange">
				<!--<img src="../images/btn.png" style="display: inline-block;position:absolute;right:0;top:0;" v-show="checkAll"/>-->
				{{$t('Common.select_all')}}
			</div>
			<div v-for="(item,index) in cars" :key="index" class="button-div" :class="[tempCheckedCars.indexOf(item)>=0?'check-button-div':'']" @click="handleCheckedChange(item)">
				<img src="../images/btn.png" style="display: inline-block;position:absolute;right:0;top:0;" v-show="tempCheckedCars.indexOf(item)>=0" /> {{item}}
			</div>
		</div>
		<!--<div v-for="(item,index) in cars" :key="index" class="button-div" :class="[tempCheckedCars.indexOf(item)>=0?'check-button-div':'']" @click="handleCheckedChange(item)">
				{{item}}
		</div>-->
	</div>
</template>

<script>
	import { getCarTypeNameList, findCarTypeKeyByLabel, setTypes } from '../js/carstype.js'
	import { mapState } from 'vuex'
	const props = {
		checkedCars: {
			type: Array
		}
	}
	export default {
		props,
		data() {
			return {
				tempCheckedCars: [],
				checkAll: false,
				isIndeterminate: true,
			}
		},
		mounted() {
			if(this.checkedCars == null || this.checkedCars.length == 0) {
				this.tempCheckedCars = [];
			} else {
				this.tempCheckedCars = this.checkedCars;
			}
			this.checkAll = this.tempCheckedCars.length === this.cars.length;
		},
		methods: {
			handleCheckAllChange() {
				this.checkAll = !this.checkAll;
				if(this.checkAll) {
					this.tempCheckedCars = getCarTypeNameList();
				} else {
					this.tempCheckedCars = [];
				}
			},
			handleCheckedChange(value) {
				if(this.tempCheckedCars) {
					var index = this.tempCheckedCars.indexOf(value);
					if(index >= 0) {
						this.tempCheckedCars.splice(index, 1);
					} else {
						this.tempCheckedCars.splice(0, 0, value);
					}
					this.checkAll = this.tempCheckedCars.length === this.cars.length;
				}
			}
		},
		computed: {
			cars() {
				setTypes(this.$store.state.devicesTypes);
				return getCarTypeNameList();
			}
		},

		watch: {
			"tempCheckedCars": {
				handler(curVal, oldVal) {　　　　　　　　　　　　
					this.$emit('changetype', curVal);　　　　　　　　　　
				},
				deep: true
			},
			"checkedCars": {
				handler(curVal, oldVal) {　　　
					this.tempCheckedCars=　curVal;
					var checkedCount = this.tempCheckedCars.length;
					this.checkAll = checkedCount === this.cars.length;
				},
				deep: true
			}
		}
	}
</script>

<style>
	/*.button{
		width: 72px;
		height: 32px;
	}*/
	
	.button-div {
		position: relative;
		width: 30%;
		text-align: center;
		line-height: 1;
		cursor: pointer;
		background: #fff;
		border: 1px solid #dcdfe6;
		color: #606266;
		-webkit-appearance: none;
		text-align: center;
		-webkit-box-sizing: border-box;
		box-sizing: border-box;
		outline: 0;
		margin: 4px;
		-webkit-transition: .1s;
		transition: .1s;
		padding: 10px;
		font-size: 14px;
		border-radius: 4px;
		overflow: hidden;
		white-space: nowrap;
		text-overflow: ellipsis;
	}
	
	.button-div:active,
	.button-div:focus,
	.button-div:hover {
		color: #21adb8;
		/*border-color: #3a8ee6;*/
		outline: 0
	}
	
	.check-button-div {
		color: #3a8ee6;
		border-color: #3a8ee6;
		outline: 0
	}
</style>