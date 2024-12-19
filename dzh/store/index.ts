import { useSettingStore } from "/@/dzh/store/modules/setting";


export function dzhStore() {
	return {
		setting: useSettingStore(),
	};
}
