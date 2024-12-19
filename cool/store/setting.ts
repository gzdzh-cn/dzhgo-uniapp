import { defineStore } from "pinia";
import { ref } from "vue";
import {  storage } from "../utils";
import { service } from "../service";

// 本地缓存
const data = storage.info();

const useSettingStore = defineStore("setting", function () {
 
	// 用户信息
	const info = ref(data.setting);

	// 获取用户信息
	async function get() {
   
		return await service.cms.setting.info({ id: 1 })
			.then((res) => {
				if (res) {
					set(res);
				}
				return res;
			})
		 
	}

	// 设置用户信息
	function set(value: any) {
		info.value = value;
		storage.set("setting", value);
	}


	return {
 
		info,
		get,
 
	};
});

export { useSettingStore };
