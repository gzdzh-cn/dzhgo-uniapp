import { isArray, orderBy } from "lodash-es";

// 是否小数
export function isDecimal(value: any): boolean {
	return String(value).length - String(value).indexOf(".") + 1 > 0;
}

// 首字母大写
export function firstUpperCase(value: string): string {
	return value.replace(/\b(\w)(\w*)/g, function ($0, $1, $2) {
		return $1.toUpperCase() + $2;
	});
}

// 深度合并
export function deepMerge(a: any, b: any) {
	let k;
	for (k in b) {
		a[k] =
			a[k] && a[k].toString() === "[object Object]" ? deepMerge(a[k], b[k]) : (a[k] = b[k]);
	}
	return a;
}

// 获取地址栏参数
export function getUrlParam(name: string): string | null {
	const reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
	const r = window.location.search.substr(1).match(reg);
	if (r != null) return decodeURIComponent(r[2]);
	return null;
}

// 列表转树形
export function deepTree(list: any[]): any[] {
	const newList: any[] = [];
	const map: any = {};

	list.forEach((e) => (map[e.id] = e));

	list.forEach((e) => {
		const parent = map[e.parentId];

		if (parent) {
			(parent.children || (parent.children = [])).push(e);
		} else {
			newList.push(e);
		}
	});

	const fn = (list: Array<any>) => {
		list.map((e) => {
			if (isArray(e.children)) {
				e.children = orderBy(e.children, "orderNum");
				fn(e.children);
			}
		});
	};

	fn(newList);

	return orderBy(newList, "orderNum");
}

// 文件路径转对象
export function deepFiles(list: any[]) {
	const modules: any = {};

	list.forEach((e) => {
		const arr = e.path.split("/");
		const parents = arr.slice(0, arr.length - 1);
		const name = basename(e.path).replace(".ts", "");

		let curr: any = modules;
		let prev: any = null;
		let key: any = null;

		parents.forEach((k: string) => {
			if (!curr[k]) {
				curr[k] = {};
			}

			prev = curr;
			curr = curr[k];
			key = k;
		});

		if (name == "index") {
			prev[key] = e.value;
		} else {
			curr[name] = e.value;
		}
	});

	return modules;
}

// 文件名
export function filename(path: string): string {
	return basename(path.substring(0, path.lastIndexOf(".")));
}

// 路径名称
export function basename(path: string): string {
	let index = path.lastIndexOf("/");
	index = index > -1 ? index : path.lastIndexOf("\\");
	if (index < 0) {
		return path;
	}
	return path.substring(index + 1);
}

// 文件扩展名
export function extname(path: string): string {
	return path.substring((path || "").lastIndexOf(".") + 1);
}

// 横杠转驼峰
export function toCamel(str: string): string {
	return str.replace(/([^-])(?:-+([^-]))/g, function ($0, $1, $2) {
		return $1 + $2.toUpperCase();
	});
}

// uuid
export function uuid(): string {
	const s: any[] = [];
	const hexDigits = "0123456789abcdef";
	for (let i = 0; i < 36; i++) {
		s[i] = hexDigits.substr(Math.floor(Math.random() * 0x10), 1);
	}
	s[14] = "4";
	s[19] = hexDigits.substr((s[19] & 0x3) | 0x8, 1);
	s[8] = s[13] = s[18] = s[23] = "-";

	return s.join("");
}
