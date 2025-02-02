import path from "path";
import { defineConfig } from "vite";
import uni from "@dcloudio/vite-plugin-uni"; // ！此依赖不能安装
import { cool } from "./build/cool";
import { proxy } from "./cool/config/proxy";

import { UnifiedViteWeappTailwindcssPlugin as uvwt } from "weapp-tailwindcss/vite";
// 注意： 打包成 h5 和 app 都不需要开启插件配置
const isH5 = process.env.UNI_PLATFORM === "h5";
const isApp = process.env.UNI_PLATFORM === "app";
const WeappTailwindcssDisabled = isH5 || isApp;
// vite 插件配置
const vitePlugins = [uni(), cool(), uvwt({
	disabled: WeappTailwindcssDisabled
})];

const resolve = (p: string) => {
	return path.resolve(__dirname, p);
};

const postcssPlugins = [
	require("autoprefixer")(),
	require("tailwindcss")({
		config: resolve("./tailwind.config.js"),
	}),
];
if (!WeappTailwindcssDisabled) {
	postcssPlugins.push(
		require("postcss-rem-to-responsive-pixel")({
			rootValue: 32,
			propList: ["*"],
			transformUnit: "rpx",
		})
	);
}

// https://vitejs.dev/config/

export default defineConfig(
	{
		plugins: vitePlugins,
		// 假如 postcss.config.js 不起作用，请使用内联 postcss Latset
		css: {
			postcss: {
				plugins: postcssPlugins,
			},
		},
		resolve: {
			alias: {
				"/@": resolve("./"),
				"/$": resolve("./pages/"),
			},
		},
		server: {
			port: 9900,
			proxy,
			 
		},
	},
);