// 时间类型转化
function date(d,t) {
	var time = d?new Date(d):new Date(),
		t = t || 0,
		year = time.getFullYear(),
		month = time.getMonth()*1 +1,
		day = time.getDate();
}