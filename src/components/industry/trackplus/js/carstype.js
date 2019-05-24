/*****
 * 车辆类型
 */
var cars_type =[];
//[{
//	label: "出租车",
//	key: "A1"
//}, {
//	label: "警车",
//	key: "B1"
//}, {
//	label: "公交车",
//	key: "C1"
//}, {
//	label: "私家车",
//	key: "D1"
//}, {
//	label: "货车",
//	key: "E1"
//}]

export function setTypes(types){
	if(types)
	{
		cars_type=types
	}
}
export function getTypes(types){
	return cars_type;
}
export function getCarTypeKeyList(){
	//setTypes(types);
	var array=[];
	cars_type.forEach(item=>{
		array.push(item.key);
	})
	return array;
}

export function getCarTypeNameList(){
	var array=[];
	cars_type.forEach(item=>{
		array.push(item.label);
	})
	return array;
}
/**
 * 根据Label查找对应的key
 */
export function findCarTypeKeyByLabel(label){
	var len=cars_type.length;
	for(var i=0;i<len;i++)
	{
		if(cars_type[i].label==label){
			return cars_type[i].key;
		}
	}
	return ""
}
/***
 * 根据key查找对应的label
 */
export function getCarLabelByKey(key){
	var len=cars_type.length;
	for(var i=0;i<len;i++)
	{
		if(cars_type[i].key==key){
			return cars_type[i].label;
		}
	}
	return ""
}
