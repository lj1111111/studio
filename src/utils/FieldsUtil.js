/****
 * 根据源字段超找对应的映射字段名称
 * @param {Object} fieldName 源字段
 * @param {Object} fields
 * @return {String} 
 */
function findField(fieldName, fields) {
	var name = "";
	var len = fields ? fields.length : 0;
	for(var i = 0; i < len; i++) {
		if(fieldName == fields[i].source) {
			name = fields[i].target ? fields[i].target : fields[i].source;
			break;
		}
	}
	return name;
}

export {
	findField
}