import MENU from '../js/menu.js'
import {TrackModuleType}  from '../js/constants.js'
export default{
	data(){
		return {
			currentTabComponent: 'MonitorModule',
			activeName:''
		}
	},
	methods:{
		handleMenuChange(pv){
			if(pv==MENU.TRACK_MENU_MONITOR) //监测
			{
				this.currentTabComponent='MonitorModule';
				this.activeName=TrackModuleType.MONITOR_LOCATION;
			}
			else if(pv==MENU.TRACK_MENU_QUERY)//查询
		    {
		    	this.currentTabComponent='TrackQueryModule';
		    	this.activeName=TrackModuleType.TRACK_QUERY;
		    }
		    else if(pv==MENU.TRACK_MENU_ANALYSIS)//分析
		    {
		    	this.currentTabComponent='TrackAnalysisModule';
		    	this.activeName=TrackModuleType.TRACK_HEAT;
		    }
		}
	}
	
}
