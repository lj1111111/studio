//组件常量
const SE_BACKGROUND = 'se-background';
const SE_BORDER = 'se-border';
const SE_IMAGE = 'se-image';
const SE_VIDEO = 'se-video';
const SE_TITLE = 'se-title';
const SE_TABLE = 'se-table';
const SE_PANEL = 'se-panel';
const SE_HLINE = 'se-hline';
const SE_TIME = 'se-time';
const SE_WEATHER = 'se-weather';
const SE_NUMBERTITLEFLOP = 'se-number-title-flop';

const SE_BAR = 'se-bar';
const SE_PIE = 'se-pie';
const SE_LINE = 'se-line';
const SE_GAUGE = 'se-gauge';
const SE_SCATTER = 'se-scatter';
const SE_RADAR = 'se-radar';

const SE_MAP = 'se-map';
const SE_MAP_D3 = 'se-map-d3';
const SE_TS_HEATMAP = 'se-ts-heatmap';
const SE_TS_ANALYSIS = 'se-ts-analysis';
const SE_QUICKLOCATION = 'se-quickLocation';
const SE_ADDROUTE = 'se-addRoute';
const SE_CHARTTHEME = 'se-chartTheme';
const SE_GRADESIZETHEME = 'se-gradeSizeTheme';
const SE_GRADECOLORTHEME = 'se-gradeColorTheme';

//行业组件
const SE_TRACK = 'se-track';
const SE_TRACK_PLUS = 'se-track-plus';

const componenConfig = {
	"company": "苏州超擎图形软件科技发展有限公司",
	"version": "v2.0.0",
	"memo": "苏州超擎组件库",
	"img_root": "./static/img/",
	"componentlibs": {
		base_component: {
			"name": "基本组件",
			"list": [{
					"label": "自定义背景",
					"name": SE_BACKGROUND,
					"url": "se-background.png"
				},
				{
					"label": "边框",
					"name": SE_BORDER,
					"url": "se-border.png"
				}, {
					"label": "单张图片",
					"name": "se-image",
					"url": "se-image.png"
				}, {
					"label": "视频",
					"name": "se-video",
					"url": "se-video.png"
				}, {
					"label": "通用标题",
					"name": "se-title",
					"url": "se-title.png",
				}, {
					"label": "时间器",
					"name": SE_TIME,
					"url": "se-time.png",
				}
				//				, {
				//					"label": "天气",
				//					"name": SE_WEATHER,
				//					"url": "se-time.png",
				//				}
				, {
					"label": "数字翻牌器",
					"name": SE_NUMBERTITLEFLOP,
					"url": "se-number-title-flop.png",
				}
				//			, {
				//				"label": "键值表格",
				//				"name": "se-table",
				//				"url": "se-table.png"
				//			}, {
				//				"label": "容器",
				//				"name": "se-panel",
				//				"url": "se-panel.png"
				//			}, {
				//				"label": "水平线",
				//				"name": "se-hline",
				//				"url": "se-line.png"
				//			}
			]
		},
		"chart_component": {
			"name": "图表组件",
			"list": [{
				"label": "柱状图",
				"name": "se-bar",
				"url": "se-bar.png"
			}, {
				"label": "折线图",
				"name": "se-line",
				"url": "se-line.png"
			}, {
				"label": "饼图",
				"name": "se-pie",
				"url": "se-pie.png"
			}, {
				"label": "仪表盘",
				"name": "se-gauge",
				"url": "se-gauge.png"
			}, {
				"label": "散点图",
				"name": SE_SCATTER,
				"url": "se-scatter.png"
			}, {
				"label": "雷达图",
				"name": SE_RADAR,
				"url": "se-radar.png"
			}]
		},
		"space_component": {
			"name": "时空组件",
			"list": [{
					"label": "地图",
					"name": "se-map",
					"url": "se-map.png"
				}, {
					"label": "3D平面中国地图",
					"name": "se-map-d3",
					"url": "se-map-d3.png"
				}
				//				, {
				//					"label": "时空热力图",
				//					"name": "se-ts-heatmap",
				//					"url": "se-ts-heatmap.png"
				//				}, {
				//					"label": "时空分析",
				//					"name": "se-ts-analysis",
				//					"url": "se-ts-analysis.png"
				//				}
				//			, {
				//				"label": "快速定位",
				//				"name": "se-quickLocation",
				//				"url": "se-quickLocation.png"
				//			}, {
				//				"label": "叠加路网",
				//				"name": "se-addRoute",
				//				"url": "se-addRoute.png"
				//			}, {
				//				"label": "专题图",
				//				"name": "se-chartTheme",
				//				"url": "se-chartTheme.png"
				//			}, {
				//				"label": "分级符号",
				//				"name": "se-gradeSizeTheme",
				//				"url": "se-gradeSizeTheme.png"
				//			}, {
				//				"label": "分级色彩",
				//				"name": "se-gradeColorTheme",
				//				"url": "se-gradeColorTheme.png"
				//			}
			]
		},
		"industry_component": {
			"name": "行业组件",
			"list": [
//			    {
//					"label": "轨迹分析",
//					"name": SE_TRACK,
//					"url": "se-track.png"
//				},
				{
					"label": "轨迹分析Plus",
					"name": SE_TRACK_PLUS,
					"url": "se-track.png"
				}
			]
		}
	}
}
/***
 * 组件配置文件
 */
export {
	componenConfig
}

/****
 * 组件类型常量
 */
export default {
	SE_BACKGROUND,
	SE_BORDER,
	SE_IMAGE,
	SE_VIDEO,
	SE_TITLE,
	SE_TABLE,
	SE_PANEL,
	SE_HLINE,
	SE_TIME,
	SE_WEATHER,
	SE_NUMBERTITLEFLOP,

	SE_BAR,
	SE_PIE,
	SE_LINE,
	SE_GAUGE,
	SE_SCATTER,
	SE_RADAR,

	SE_MAP,
	SE_MAP_D3,
	SE_TS_HEATMAP,
	SE_TS_ANALYSIS,
	SE_QUICKLOCATION,
	SE_ADDROUTE,
	SE_CHARTTHEME,
	SE_GRADESIZETHEME,
	SE_GRADECOLORTHEME,

	//行业组件
	SE_TRACK,
	SE_TRACK_PLUS
};