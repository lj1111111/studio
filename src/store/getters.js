export const map = state => {
	return state.map;
}
export const baseParam = (state) => {
	let baseParam = {
		url: state.url,
		token: state.token,
		sys_ak: state.sys_ak,
		bus:state.bus
	}
	return baseParam;
}