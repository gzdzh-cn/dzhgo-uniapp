<template>
	<cl-page>
		<view class="" style="padding: 0 20px">
			<cl-text :value="content" />
		</view>

		<view class="bt">
			<cl-button type="primary" @tap="back()"> 同意 </cl-button>
			<!-- <cl-button type="text" @tap="back()"> 取消 </cl-button> -->
		</view>
	</cl-page>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { useCool } from "/@/cool";
const { router,storage } = useCool();


const back = ()=>{
    storage.set("agree", true);
    router.back();
}


const content = ref(`


用户协议

欢迎您使用我们的后台订单系统！在您注册和登录之前，请仔细阅读以下用户协议。使用我们的后台订单系统，即表示您同意遵守以下条款和条件：

1. 用户责任
1.1 在使用后台订单系统时，您必须遵守适用的法律法规，并对您的行为负责。
1.2 您应该保护您的账户和密码，并对您的账户安全负责。
1.3 您不得以任何方式损害、干扰或破坏后台订单系统的正常运行。

2. 隐私政策
2.1 我们将尽力保护您的个人信息，并遵守适用的隐私法律法规。详细信息请查阅我们的隐私政策。
2.2 您同意我们根据隐私政策收集、使用和处理您的个人信息。

3. 服务变更和终止
3.1 我们保留随时修改、暂停或终止后台订单系统的权利，而无需提前通知。
3.2 如果您违反本协议的任何条款，我们有权暂停或终止您的账户。

4. 免责声明
4.1 后台订单系统是按“原样”提供的，不作任何明示或暗示的担保或保证。
4.2 我们对后台订单系统的任何故障、中断或错误不承担责任。

5. 知识产权
5.1 后台订单系统的所有权和知识产权归属于我们或我们的许可方。
5.2 未经我们或许可方的书面许可，您不得复制、修改、传播或使用后台订单系统的任何部分。

6. 其他条款
6.1 我们可能随时修改本用户协议，并将通过我们的网站或应用程序通知您。
6.2 如果您不同意本用户协议的任何修改，您可以停止使用后台订单系统。


`);
</script>

<style lang="less">

.bt{

    display: flex;
    flex-direction: row;
    justify-content: center;
    width: 100%;
    padding-bottom: 4rem;
}
</style>
