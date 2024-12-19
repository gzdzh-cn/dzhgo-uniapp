import { useStore } from "../store";
import { router } from "../router";
import { isDev, config } from "../config";
import { storage } from "../utils";

// 请求队列
let requests: any[] = [];

// Token 是否刷新中
let isRefreshing = false;

export default function request(options: any) {
	// 缓存信息
	const { user } = useStore();

	// 标识
	let Authorization = user.token || "";

	// 忽略标识
	config.ignore.token.forEach((e) => {
		if (options.url.includes(e)) {
			Authorization = "";
		}
	});

	if (isDev) {
		console.log(`[${options.method || "GET"}] ${options.url}`);
	}

	return new Promise(async (resolve, reject) => {
		// 继续请求
		function next() {
			uni.request({
				...options,

				header: {
					Authorization,
					...options.header,
				},

				success(res: any) {
					// console.log("request success");
					const { code, data, message } = res.data;

					// 无权限
					if (res.statusCode === 401) {
						// console.log("request success 401");
						if (router.info()?.path == router.pages.login) {
							return reject({ message });
						} else {
							// console.log("request success logout");
							// user.logout();
							user.clear();
							router.push(router.pages.login);
						}
					}

					// 服务异常
					if (res.statusCode === 502) {
						// console.log("request success 502");
						return reject({
							message: "服务异常",
						});
					}

					// 未找到
					if (res.statusCode === 404) {
						// console.log("request success 404");
						return reject({
							message: `[404] ${options.url}`,
						});
					}

					// 成功
					if (res.statusCode === 200) {
						// console.log("request success 200");
						switch (code) {
							case 1000:
								resolve(data);
								break;
							default:
								// console.log("request success 200 reject");
								reject({ message, code });
						}
					}
				},

				fail(err) {
					console.log("request fail");
					reject({ message: err.errMsg });
				},
			});
		}

		// 刷新token处理
		if (!options.url.includes("refreshToken")) {
			if (Authorization) {
				// 判断 token 是否过期
				if (storage.isExpired("token")) {
					// 判断 refreshToken 是否过期
					if (storage.isExpired("refreshToken")) {
						// 退出登录
						return user.logout();
					}

					// 是否在刷新中
					if (!isRefreshing) {
						isRefreshing = true;
						user.refreshToken()
							.then((token) => {
								requests.forEach((cb) => cb(token));
								requests = [];
								isRefreshing = false;
							})
							.catch((err) => {
								isRefreshing = false;
								reject(err);
							});
					}

					return new Promise((resolve) => {
						// 继续请求
						requests.push((token: string) => {
							// 重新设置 token
							Authorization = token;
							next();
							resolve();
						});
					});
				}
			}
		}

		next();
	});
}
