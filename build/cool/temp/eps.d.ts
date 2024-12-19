declare namespace Eps {
	interface BaseComm {
		/**
		 * eps
		 */
		eps(data?: any): Promise<any>;
		/**
		 * upload
		 */
		upload(data?: any): Promise<any>;
		/**
		 * uploadMode
		 */
		uploadMode(data?: any): Promise<any>;
		/**
		 * list
		 */
		list(data?: any): Promise<any[]>;
		/**
		 * page
		 */
		page(data?: any): Promise<{
			pagination: { size: number; page: number; total: number };
			list: any[];
			[key: string]: any;
		}>;
		/**
		 * info
		 */
		info(data?: any): Promise<any>;
		/**
		 * update
		 */
		update(data?: any): Promise<any>;
		/**
		 * delete
		 */
		delete(data?: any): Promise<any>;
		/**
		 * add
		 */
		add(data?: any): Promise<any>;
	}

	interface CmsBanner {
		/**
		 * add
		 */
		add(data?: any): Promise<any>;
		/**
		 * bannerList
		 */
		bannerList(data?: any): Promise<any>;
		/**
		 * delete
		 */
		delete(data?: any): Promise<any>;
		/**
		 * info
		 */
		info(data?: any): Promise<any>;
		/**
		 * list
		 */
		list(data?: any): Promise<any[]>;
		/**
		 * page
		 */
		page(data?: any): Promise<{
			pagination: { size: number; page: number; total: number };
			list: any[];
			[key: string]: any;
		}>;
		/**
		 * update
		 */
		update(data?: any): Promise<any>;
	}

	interface CmsContent {
		/**
		 * add
		 */
		add(data?: any): Promise<any>;
		/**
		 * delete
		 */
		delete(data?: any): Promise<any>;
		/**
		 * info
		 */
		info(data?: any): Promise<any>;
		/**
		 * list
		 */
		list(data?: any): Promise<any[]>;
		/**
		 * page
		 */
		page(data?: any): Promise<{
			pagination: { size: number; page: number; total: number };
			list: any[];
			[key: string]: any;
		}>;
		/**
		 * update
		 */
		update(data?: any): Promise<any>;
	}

	interface CmsFinanceOrder {
		/**
		 * add
		 */
		add(data?: any): Promise<any>;
		/**
		 * delete
		 */
		delete(data?: any): Promise<any>;
		/**
		 * info
		 */
		info(data?: any): Promise<any>;
		/**
		 * list
		 */
		list(data?: any): Promise<any[]>;
		/**
		 * orderPayStatus
		 */
		orderPayStatus(data?: any): Promise<any>;
		/**
		 * page
		 */
		page(data?: any): Promise<{
			pagination: { size: number; page: number; total: number };
			list: any[];
			[key: string]: any;
		}>;
		/**
		 * update
		 */
		update(data?: any): Promise<any>;
	}

	interface CmsFinancePay {
		/**
		 * V3PartnerNative
		 */
		V3PartnerNative(data?: any): Promise<any>;
		/**
		 * notice
		 */
		notice(data?: any): Promise<any>;
		/**
		 * list
		 */
		list(data?: any): Promise<any[]>;
		/**
		 * page
		 */
		page(data?: any): Promise<{
			pagination: { size: number; page: number; total: number };
			list: any[];
			[key: string]: any;
		}>;
		/**
		 * info
		 */
		info(data?: any): Promise<any>;
		/**
		 * update
		 */
		update(data?: any): Promise<any>;
		/**
		 * delete
		 */
		delete(data?: any): Promise<any>;
		/**
		 * add
		 */
		add(data?: any): Promise<any>;
	}

	interface CmsForm {
		/**
		 * add
		 */
		add(data?: any): Promise<any>;
		/**
		 * delete
		 */
		delete(data?: any): Promise<any>;
		/**
		 * formAdd
		 */
		formAdd(data?: any): Promise<any>;
		/**
		 * info
		 */
		info(data?: any): Promise<any>;
		/**
		 * list
		 */
		list(data?: any): Promise<any[]>;
		/**
		 * page
		 */
		page(data?: any): Promise<{
			pagination: { size: number; page: number; total: number };
			list: any[];
			[key: string]: any;
		}>;
		/**
		 * update
		 */
		update(data?: any): Promise<any>;
		/**
		 * welcome
		 */
		welcome(data?: any): Promise<any>;
	}

	interface CmsHome {
		/**
		 * home
		 */
		home(data?: any): Promise<any>;
		/**
		 * list
		 */
		list(data?: any): Promise<any[]>;
		/**
		 * page
		 */
		page(data?: any): Promise<{
			pagination: { size: number; page: number; total: number };
			list: any[];
			[key: string]: any;
		}>;
		/**
		 * info
		 */
		info(data?: any): Promise<any>;
		/**
		 * update
		 */
		update(data?: any): Promise<any>;
		/**
		 * delete
		 */
		delete(data?: any): Promise<any>;
		/**
		 * add
		 */
		add(data?: any): Promise<any>;
	}

	interface CmsIndex {
		/**
		 * index
		 */
		index(data?: any): Promise<any>;
		/**
		 * index2
		 */
		index2(data?: any): Promise<any>;
		/**
		 * list
		 */
		list(data?: any): Promise<any[]>;
		/**
		 * page
		 */
		page(data?: any): Promise<{
			pagination: { size: number; page: number; total: number };
			list: any[];
			[key: string]: any;
		}>;
		/**
		 * info
		 */
		info(data?: any): Promise<any>;
		/**
		 * update
		 */
		update(data?: any): Promise<any>;
		/**
		 * delete
		 */
		delete(data?: any): Promise<any>;
		/**
		 * add
		 */
		add(data?: any): Promise<any>;
	}

	interface CmsMemberComm {
		/**
		 * memberUpdate
		 */
		memberUpdate(data?: any): Promise<any>;
		/**
		 * person
		 */
		person(data?: any): Promise<any>;
		/**
		 * refreshToken
		 */
		refreshToken(data?: any): Promise<any>;
		/**
		 * list
		 */
		list(data?: any): Promise<any[]>;
		/**
		 * page
		 */
		page(data?: any): Promise<{
			pagination: { size: number; page: number; total: number };
			list: any[];
			[key: string]: any;
		}>;
		/**
		 * info
		 */
		info(data?: any): Promise<any>;
		/**
		 * update
		 */
		update(data?: any): Promise<any>;
		/**
		 * delete
		 */
		delete(data?: any): Promise<any>;
		/**
		 * add
		 */
		add(data?: any): Promise<any>;
	}

	interface CmsMemberOpen {
		/**
		 * account
		 */
		account(data?: any): Promise<any>;
		/**
		 * accountReg
		 */
		accountReg(data?: any): Promise<any>;
		/**
		 * autoPhone
		 */
		autoPhone(data?: any): Promise<any>;
		/**
		 * login
		 */
		login(data?: any): Promise<any>;
		/**
		 * mini
		 */
		mini(data?: any): Promise<any>;
		/**
		 * mp
		 */
		mp(data?: any): Promise<any>;
		/**
		 * tourist
		 */
		tourist(data?: any): Promise<any>;
		/**
		 * verifyCount
		 */
		verifyCount(data?: any): Promise<any>;
		/**
		 * list
		 */
		list(data?: any): Promise<any[]>;
		/**
		 * page
		 */
		page(data?: any): Promise<{
			pagination: { size: number; page: number; total: number };
			list: any[];
			[key: string]: any;
		}>;
		/**
		 * info
		 */
		info(data?: any): Promise<any>;
		/**
		 * update
		 */
		update(data?: any): Promise<any>;
		/**
		 * delete
		 */
		delete(data?: any): Promise<any>;
		/**
		 * add
		 */
		add(data?: any): Promise<any>;
	}

	interface CmsMemberUser {
		/**
		 * add
		 */
		add(data?: any): Promise<any>;
		/**
		 * delete
		 */
		delete(data?: any): Promise<any>;
		/**
		 * info
		 */
		info(data?: any): Promise<any>;
		/**
		 * list
		 */
		list(data?: any): Promise<any[]>;
		/**
		 * page
		 */
		page(data?: any): Promise<{
			pagination: { size: number; page: number; total: number };
			list: any[];
			[key: string]: any;
		}>;
		/**
		 * update
		 */
		update(data?: any): Promise<any>;
	}

	interface CmsNews {
		/**
		 * add
		 */
		add(data?: any): Promise<any>;
		/**
		 * delete
		 */
		delete(data?: any): Promise<any>;
		/**
		 * info
		 */
		info(data?: any): Promise<any>;
		/**
		 * list
		 */
		list(data?: any): Promise<any[]>;
		/**
		 * page
		 */
		page(data?: any): Promise<{
			pagination: { size: number; page: number; total: number };
			list: any[];
			[key: string]: any;
		}>;
		/**
		 * update
		 */
		update(data?: any): Promise<any>;
	}

	interface CmsOpen {
		/**
		 * requestData
		 */
		requestData(data?: any): Promise<any>;
		/**
		 * upload
		 */
		upload(data?: any): Promise<any>;
		/**
		 * uploadMode
		 */
		uploadMode(data?: any): Promise<any>;
		/**
		 * list
		 */
		list(data?: any): Promise<any[]>;
		/**
		 * page
		 */
		page(data?: any): Promise<{
			pagination: { size: number; page: number; total: number };
			list: any[];
			[key: string]: any;
		}>;
		/**
		 * info
		 */
		info(data?: any): Promise<any>;
		/**
		 * update
		 */
		update(data?: any): Promise<any>;
		/**
		 * delete
		 */
		delete(data?: any): Promise<any>;
		/**
		 * add
		 */
		add(data?: any): Promise<any>;
	}

	interface CmsSetting {
		/**
		 * add
		 */
		add(data?: any): Promise<any>;
		/**
		 * contactList
		 */
		contactList(data?: any): Promise<any>;
		/**
		 * delete
		 */
		delete(data?: any): Promise<any>;
		/**
		 * info
		 */
		info(data?: any): Promise<any>;
		/**
		 * list
		 */
		list(data?: any): Promise<any[]>;
		/**
		 * page
		 */
		page(data?: any): Promise<{
			pagination: { size: number; page: number; total: number };
			list: any[];
			[key: string]: any;
		}>;
		/**
		 * update
		 */
		update(data?: any): Promise<any>;
	}

	interface DictInfo {
		/**
		 * add
		 */
		add(data?: any): Promise<any>;
		/**
		 * data
		 */
		data(data?: any): Promise<any>;
		/**
		 * delete
		 */
		delete(data?: any): Promise<any>;
		/**
		 * info
		 */
		info(data?: any): Promise<any>;
		/**
		 * list
		 */
		list(data?: any): Promise<any[]>;
		/**
		 * page
		 */
		page(data?: any): Promise<{
			pagination: { size: number; page: number; total: number };
			list: any[];
			[key: string]: any;
		}>;
		/**
		 * update
		 */
		update(data?: any): Promise<any>;
	}

	interface DictType {
		/**
		 * add
		 */
		add(data?: any): Promise<any>;
		/**
		 * delete
		 */
		delete(data?: any): Promise<any>;
		/**
		 * info
		 */
		info(data?: any): Promise<any>;
		/**
		 * list
		 */
		list(data?: any): Promise<any[]>;
		/**
		 * page
		 */
		page(data?: any): Promise<{
			pagination: { size: number; page: number; total: number };
			list: any[];
			[key: string]: any;
		}>;
		/**
		 * update
		 */
		update(data?: any): Promise<any>;
	}

	interface Test {
		/**
		 * list
		 */
		list(data?: any): Promise<any[]>;
		/**
		 * page
		 */
		page(data?: any): Promise<{
			pagination: { size: number; page: number; total: number };
			list: any[];
			[key: string]: any;
		}>;
		/**
		 * info
		 */
		info(data?: any): Promise<any>;
		/**
		 * update
		 */
		update(data?: any): Promise<any>;
		/**
		 * delete
		 */
		delete(data?: any): Promise<any>;
		/**
		 * add
		 */
		add(data?: any): Promise<any>;
	}

	type Service = {
		request(options: {
			url: string;
			method?: "POST" | "GET" | string;
			data?: any;
			params?: any;
			proxy?: boolean;
			[key: string]: any;
		}): Promise<any>;
		base: { comm: BaseComm };
		cms: {
			banner: CmsBanner;
			content: CmsContent;
			finance: { order: CmsFinanceOrder; pay: CmsFinancePay };
			form: CmsForm;
			home: CmsHome;
			index: CmsIndex;
			member: { comm: CmsMemberComm; open: CmsMemberOpen; user: CmsMemberUser };
			news: CmsNews;
			open: CmsOpen;
			setting: CmsSetting;
		};
		dict: { info: DictInfo; type: DictType };
		test: Test;
	};
}
