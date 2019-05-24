//const colors = [
//	"#c23531",
//	"#2f4554",
//	"#61a0a8",
//	"#d48265",
//	"#91c7ae",
//	"#749f83",
//	"#ca8622",
//	"#bda29a",
//	"#6e7074",
//	"#546570",
//	"#c4ccd3"
//]
function randColor() {
	var r = Math.floor(Math.random() * 256);
	var g = Math.floor(Math.random() * 256);
	var b = Math.floor(Math.random() * 256);
	return "rgb(" + r + ',' + g + ',' + b + ")"; 
}
export default {
	randColor
}