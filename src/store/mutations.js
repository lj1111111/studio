export default {
	 /***
      * 设置uid
      */
    setUid(state, value) {
        state.uid = value;
    },
     /***
      * 设置token
      */
    setToken(state, value) {
        state.token = value;
    },
    /***
     * 设置url
     */
    setUrl(state, value) {
        state.url = value;
    },
    /***
     * 设置dbUrl
     */
    setDbUrl(state, value) {
        state.dbUrl = value;
    },
    /***
     * 设置DbRestUrl,2018-8-27
     */
    setDbRestUrl(state, value) {
        state.dbRestUrl = value;
    },
     /***
     * 设置应用模板基本信息
     */
    setServiceInfo(state, value) {
        state.serviceInfo = value;
    },
     /***
     * 设置屏幕列表
     */
    setScreens(state, value) {
        state.screens = value;
    },
    /***
     * 设置系统ak
     */
    setAK(state, value) {
        state.ak = value;
    },
    /***
     * 设置时空引擎服务根目录
     */
    setSpaceRestUrl(state, value) {
        state.spaceRestUrl = value;
    },
     /***
     * 地图列表
     */
    setMaps(state, value) {
        state.maps = value;
    },
    /***
     * 设备分类
     */
    setDevicesTypes(state, value) {
        state.devicesTypes = value;
    }
    
    
};