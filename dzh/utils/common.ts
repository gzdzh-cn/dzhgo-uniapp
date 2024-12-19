import { useCool, config } from "/@/cool";

const { router } = useCool();

// 跳转路由
const toLink = (path: string, param?: { isGuard?: boolean; query: any }) => {
	router.push({
		path,
		isGuard: param?.isGuard || true,
		query: param?.query,
	});
};

//过滤图片
const doImg = (src: string | string[] | undefined, type = 1) => {
	let path: any = "/";

	if (src && src != undefined && src != "") {
		if (
			src.indexOf("data:image") != -1 ||
			src.indexOf("http://") != -1 ||
			src.indexOf("https://") != -1
		) {
			path = src;
		} else {
			path = "http://" + src;
		}
	} else {
		switch (type) {
			case 1:
				path = "/static/my_service/images/grey.png";
				break;
			default:
				break;
		}
	}

	return path;
};

// 图片路径处理
const filterPic = (src: string): string => {
	if ((src && src.includes("http")) || src.includes("https")) {
		return src;
	} else {
		return config.host + src;
	}
};

// 随机数
const randFun = (num = 20, sub = 2) => {
	return Math.random().toString(num).substr(sub);
};

// randomWord 产生随机数字
// min-任意长度最小位[固定位数]
const randomWord = (min: number) => {
	var str = "",
		pos,
		arr = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"];
	for (var i = 0; i < min; i++) {
		pos = Math.round(Math.random() * (arr.length - 1));
		str += arr[pos];
	}
	return str;
};

// 日期转时间戳
const datetimeToTimestamp = (dateTime: string | number | Date) => {
	var date = new Date(dateTime);
	var timestamp = date.getTime();
	return timestamp;
};

// 时间戳转日期
const formatTime = (timestamp: number, type = "MM-DD hh:mm") => {
	if (timestamp) {
		var date = new Date(timestamp);
		//获取年份
		var YY = date.getFullYear();
		//获取月份
		var MM = date.getMonth() + 1 < 10 ? "0" + (date.getMonth() + 1) : date.getMonth() + 1;
		//获取日期
		var DD = date.getDate() < 10 ? "0" + date.getDate() : date.getDate();
		//获取小时
		var hh = date.getHours() < 10 ? "0" + date.getHours() : date.getHours();
		//获取分
		var mm = date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes();
		///获取秒
		var ss = date.getSeconds() < 10 ? "0" + date.getSeconds() : date.getSeconds();

		switch (type) {
			case "hh:mm:ss":
				return hh + ":" + mm + ":" + ss;
				break;
			case "YY-MM-DD":
				return YY + ":" + MM + ":" + DD;
				break;
			case "MM-DD hh:mm":
				return MM + "-" + DD + " " + hh + ":" + mm;
				break;
			case "YY-MM-DD hh:mm":
				return YY + "-" + MM + "-" + DD + " " + hh + ":" + mm;
				break;
			case "YY-MM-DD hh:mm:ss":
				return YY + "-" + MM + "-" + DD + " " + hh + ":" + mm + ":" + ss;
				break;
			default:
				return MM + "-" + DD + " " + hh + ":" + mm;
		}
	} else {
		return "";
	}
};

//金额格式转换
const parsePrice = (s: string) => {
	if (!s) {
		return `￥0.00`;
	}
	var n = 2; //设置保留的小数位数
	s = parseFloat((s + "").replace(/[^\d\.-]/g, "")).toFixed(n) + "";
	var l = s.split(".")[0].split("").reverse();
	var r = s.split(".")[1];
	var t = "";
	for (var i = 0; i < l.length; i++) {
		t += l[i];
	}
	return `￥${t.split("").reverse().join("")}.${r}`;
};

// 订单号
const orderNum = () => {
	var date = new Date();
	//获取年份
	var YY = date.getFullYear();
	//获取月份
	var MM = date.getMonth() + 1 < 10 ? "0" + (date.getMonth() + 1) : date.getMonth() + 1;
	//获取日期
	var DD = date.getDate() < 10 ? "0" + date.getDate() : date.getDate();
	//获取小时
	var hh = date.getHours() < 10 ? "0" + date.getHours() : date.getHours();
	//获取分
	var mm = date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes();
	///获取秒
	var ss = date.getSeconds() < 10 ? "0" + date.getSeconds() : date.getSeconds();

	const ranNum = randomWord(2);

	return "FACE" + YY + MM + DD + hh + mm + ss + ranNum;
};

/**
 * key 缓存下标
 * value 缓存数值
 * seconds 缓存数据
 */
const myCache = (key: string, value: any, seconds = 3600 * 24) => {
	let nowTime = Date.parse(String(new Date())) / 1000;
	if (key && value) {
		let expire = nowTime + Number(seconds);
		uni.setStorageSync(key, JSON.stringify(value) + "|" + expire);
		console.log("设置");
	} else if (key && !value) {
		let val = uni.getStorageSync(key);
		if (val) {
			// 缓存存在，判断是否过期
			let temp = val.split("|");
			console.log("到期", temp[1]);
			console.log("现在", nowTime);
			console.log("判断", temp[1] <= nowTime);
			if (!temp[1] || temp[1] <= nowTime) {
				uni.removeStorageSync(key);
				return false;
			} else {
				return true;
			}
		}
	}
};

//过滤所有的html标签
const filterHtml = (str: any) => {
	var reg = /<[^>]+>/gi;
	return str.replace(reg, "").replace("\n\r", "");
};

/*去掉html标签（真正意义上去掉所有html标签包括内嵌的css样式）*/
const stripHTML = (html: any, isRemoveNewLine: boolean) => {
	let t = document.createElement("div");
	t.innerHTML = html;
	let r = t.innerText;
	isRemoveNewLine && (r = r.replace(/[\r\n]/g, ""));
	return r;
};

// 倒计时
const formatCountdown = (seconds: number) => {
	const h = Math.floor(seconds / 3600);
	const h_y = seconds % 3600;
	const m = Math.floor(h_y / 60);
	const s = h_y % 60;

	const H = h ? h + ":" : "";
	const M = m ? m + ":" : "";

	return H + M + s;
};

// 过滤html和截取指定字符
function stripHtmlLen(str: any, len?: number): string {
	len = len ? len : 50;
	return str && str.replace(/<\/?[^>]+(>|$)/g, "").slice(0, len);
}

export {
	toLink,
	doImg,
	filterPic,
	randFun,
	randomWord,
	datetimeToTimestamp,
	formatTime,
	parsePrice,
	orderNum,
	myCache,
	formatCountdown,
	filterHtml,
	stripHtmlLen,
};
