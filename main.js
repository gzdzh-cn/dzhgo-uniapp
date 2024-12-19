import { createSSRApp } from "vue";
import { bootstrap } from "/@/cool/bootstrap";
import App from "./App.vue";
import "/@/dzh/router";
// 引入 uView UI
import uView from "./uni_modules/vk-uview-ui";

export function createApp() {
	const app = createSSRApp(App);
	// 使用 uView UI
	app.use(uView);
	// 启动
	bootstrap(app);

	// 隐藏底部导航栏
	uni.hideTabBar();

	return {
		app,
	};
}
