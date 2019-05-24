<template>
	<ul>
		<li class="left" >
			<!--<i class="custom-iconfont icon-fanhui"><span style="color:#FFF;">studio</span></i>-->
			<img src="../../assets/img/logo.png" />
			<!--<div class="dropdown">
				<div class="list-item">
					<img src="../../assets/img/logo.png" />
				</div>
			</div>-->
		</li>
		<li class="center">
			<div class="dropdown">
				<div class="list-item">
					<img src="../../assets/img/jb_zj.svg" />
					<div>
						{{baseComponentName}}
					</div>
				</div>
				<div class="dropdown-content">
					<div v-for="item in baseComponents" class="sub-item-parent" @click="sendAddComponent(item)">
						<div>
							<img :src="imgRoot+item.url" />
						</div>
						<div class="desc">{{item.label}}</div>
					</div>
				</div>
			</div>
		</li>
		<li class="center">
			<div class="dropdown">
				<div class="list-item">
					<img src="../../assets/img/tb_zj.svg" />
					<div>
						{{chartComponentName}}
					</div>
				</div>
				<div class="dropdown-content">
					<div v-for="item in chartComponents" class="sub-item-parent" @click="sendAddComponent(item)">
						<div>
							<img :src="imgRoot+item.url" />
						</div>
						<div class="desc">{{item.label}}</div>
					</div>
				</div>
			</div>
		</li>
		<li class="center">
			<div class="dropdown">
				<div class="list-item">
					<img src="../../assets/img/sk_zj.svg" />
					<div>
						{{spaceComponentName}}
					</div>
				</div>
				<div class="dropdown-content">
					<div v-for="item in spaceComponents" class="sub-item-parent" @click="sendAddComponent(item)">
						<div>
							<img :src="imgRoot+item.url" />
						</div>
						<div class="desc">{{item.label}}</div>
					</div>
				</div>
			</div>
		</li>
		<li class="center">
			<div class="dropdown">
				<div class="list-item">
					<img src="../../assets/img/hy_zj.svg" />
					<div>
						{{industryComponentName}}
					</div>
				</div>
				<div class="dropdown-content">
					<div v-for="item in industryComponents" class="sub-item-parent" @click="sendAddComponent(item)">
						<div>
							<img :src="imgRoot+item.url" />
						</div>
						<div class="desc">{{item.label}}</div>
					</div>
				</div>
			</div>
		</li>
		<li class="right">
			<ul>
				<li v-if="!edit">
					<div class="dropdown" @click="publish">
						<div class="list-item">
							<img src="../../assets/img/fb.svg" />
							<div>
								发布
							</div>
						</div>
					</div>
				</li>
				<li v-if="edit">
					<div class="dropdown" @click="save">
						<div class="list-item">
							<img src="../../assets/img/save.svg" />
							<div>
								保存
							</div>
						</div>
					</div>
				</li>
				<li>
					<div class="dropdown"  @click="preview">
						<div class="list-item">
							<img src="../../assets/img/yl.svg" />
							<div>
								预览
							</div>
						</div>
					</div>
				</li>
				<!--<li>
					<div class="dropdown">
						<div class="list-item">
							<img src="../../assets/img/help.svg" />
							<div>
								帮助
							</div>
						</div>
					</div>
				</li>-->
			</ul>
		</li>
	</ul>
</template>

<script>
	import { componenConfig as config } from '../../constants/ComponentType.js'

	const ADDCOMPONENT = 'addcomponent';
	const PUBLISH= 'publish';
	const PREVIEW= 'preview';
	const SAVE= 'save';
	export default {
		name: "Header",
		props:{
			edit:{
				type:Boolean,
				default:false
			}
		},
		data() {
			return {
				imgRoot: '',
				version: '', //组件版本
				baseComponentsConfig: {},
				chartComponentsConfig: {},
				spaceComponentsConfig: {},
				industryComponentsConfig: {} //行业组件
			};
		},
		methods: {
			sendAddComponent(item) {
				var obj = {};
				var url = this.imgRoot + item.url;
				var version = this.version;
				obj.url = url;
				obj.version = version;
				obj.name = item.name;
				obj.label = item.label;
				this.$emit(ADDCOMPONENT, obj);
			},
			publish() {
				this.$emit(PUBLISH);
			},
			preview() {
				this.$emit(PREVIEW);
			},
			save() {
				this.$emit(SAVE);
			}
		},
		computed: {
			baseComponentName() {
				return this.baseComponentsConfig && this.baseComponentsConfig.name ? this.baseComponentsConfig.name : '基本组件';
			},
			chartComponentName() {
				return this.chartComponentsConfig && this.chartComponentsConfig.name ? this.chartComponentsConfig.name : '图表组件';
			},
			spaceComponentName() {
				return this.spaceComponentsConfig && this.spaceComponentsConfig.name ? this.spaceComponentsConfig.name : '时空组件';
			},
			baseComponents() {
				return this.baseComponentsConfig && this.baseComponentsConfig.list ? this.baseComponentsConfig.list : [];
			},
			chartComponents() {
				return this.chartComponentsConfig && this.chartComponentsConfig.list ? this.chartComponentsConfig.list : [];
			},
			spaceComponents() {
				return this.spaceComponentsConfig && this.spaceComponentsConfig.list ? this.spaceComponentsConfig.list : [];
			},
			industryComponentName() {
				return this.industryComponentsConfig && this.industryComponentsConfig.name ? this.industryComponentsConfig.name : '行业组件';
			},
			industryComponents() {
				return this.industryComponentsConfig && this.industryComponentsConfig.list ? this.industryComponentsConfig.list : [];
			}
		},
		mounted() {
			this.baseComponentsConfig = config && config.componentlibs && config.componentlibs.base_component ? config.componentlibs.base_component : {};
			this.chartComponentsConfig = config && config.componentlibs && config.componentlibs.chart_component ? config.componentlibs.chart_component : {};
			this.spaceComponentsConfig = config && config.componentlibs && config.componentlibs.space_component ? config.componentlibs.space_component : {};
			this.industryComponentsConfig = config && config.componentlibs && config.componentlibs.industry_component ? config.componentlibs.industry_component : {};
			this.imgRoot = config && config.img_root ? config.img_root : '';
			this.version = config.version;
		}

	}
</script>
<style scoped>
	ul {
		list-style-type: none;
		margin: 0;
		padding: 0;
		background-color: #0077a6 !important;
	}
	
	ul,
	li {
		height: 70px;
		line-height: 70px;
	}
	
	li {
		float: left;
	}
	
	li.left {
		width: 150px;
	}
	
	li.left img {
		margin: 15px auto;
		padding-left: 20px;
	}
	
	li.center {
		margin-left: 40px;
	}
	
	.dropdown {
		position: relative;
		display: inline-block;
		height: 70px;
		line-height: 70px;
		width: 70px;
	}
	
	.list-item {
		display: flex;
		align-items: center;
		justify-content: center;
		flex-direction: column;
		height: 100%;
		cursor: pointer;
	}
	
	.list-item>img {
		width: 36px;
		height: 36px;
	}
	
	.list-item>div {
		height: 14px;
		padding-top:2px;
		line-height: 14px;
		color: white;
		font-size: 14px;
	}
	
	.dropdown-content {
		display: none;
		/*display: flex;
		flex-wrap: wrap;*/
		position: absolute;
		background-color: #F3F5F6; /*#444A4F*/
		min-width: 320px;
		/*width: 100%;*/
		/*width: 460px;*/
		height: auto;
		/*box-shadow: 0px 8px 16px 0px rgba(0, 0, 0, 0.2);*/
		padding: 8px;
		z-index: 100000;
	}
	
	.dropdown:hover .dropdown-content {
		display: flex;
		flex-wrap: wrap;
		justify-content:space-between;
		/*justify-content: space-around;*/
	}
	
	li.right {
		float: right;
		margin-right: 40px;
	}
	
	li a {
		/*display: block;*/
		color: white;
		text-align: center;
		padding: 14px 16px;
		text-decoration: none;
		cursor: pointer;
	}
	
	li a:hover {
		cursor: pointer;
		/*color: #5DAF34;*/
	}
	
	.sub-item-parent {
		margin: 4px;
		padding: 4px;
		width: 140px;
		height: 120px;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		font-size: 12px;
		color: #82848A;
		cursor: pointer;
		border: dashed 1px #697177;
		background-color: #FFF;
	}
	
	.sub-item-parent:hover {
		background-color: #E2F0F7;
	    /*border: dashed 1px #697177;*/
		box-shadow: 0 0 2px #888888 inset;
	}
	
	.sub-item-parent>div:first-child {
		width: 120px;
		height: 80px;
		/*background-color: #232B2E;*/
		/*height: 90px;*/
	}
	
	.sub-item-parent img {
		display: block;
		margin: 10px auto;
		/*width: 100px;
		height: 60px;*/
	}
	
	.sub-item-parent .desc {
		height: 16px;
		line-height: 16px;
		margin-top: 4px;
	}
</style>