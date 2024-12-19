<template>
    <cl-popup :ref="setRefs('clpRef')" v-model="show" class="slibe" type="top" :zIndex="zIndex" padding="0" size="100%">
        <cl-card label="修改手机号码">

            <cl-form ref="Form" v-model="form" :rules="rules" tips="inner" :disabled="loading">
                <cl-form-item label="手机号码" prop="phone">
                    <cl-input v-model="form.phone">
                        <template #append>
                            <cl-button @tap="getCode" type="info" size="small">
                                <span v-show="showCode">发送验证码</span>
                                <span v-show="!showCode" class="count">{{ count }} s</span>
                            </cl-button>
                        </template>

                    </cl-input>

                </cl-form-item>

                <cl-form-item label="验证码" prop="code">
                    <cl-input v-model="form.code"></cl-input>
                </cl-form-item>


            </cl-form>

            <cl-row type="flex" justify="end">
                <cl-button @tap="submit" type="success" :loading="loading">确定</cl-button>
            </cl-row>
        </cl-card>
    </cl-popup>
</template>
    
<script setup lang='ts'>
import { computed, reactive, ref } from 'vue';
import { service, useCool } from "/@/cool";
const { refs, setRefs } = useCool();

const zIndex = 10
interface Props {
    visible: boolean

}
const props = defineProps<Props>()

interface Emit {
    (e: 'update:visible', visible: boolean): void,
    (e: 'refresh'): void
}
const emit = defineEmits<Emit>()
const show = computed({
    get() {
        return props.visible
    },
    set() {
        emit('update:visible', false)
    }
})



const Form = ref<ClForm.Ref>();
const form = reactive<any>({
    phone: "",
    code: ""

});

const rules = reactive<any>({
    phone: {
        required: true,
        message: "手机号码不能为空"
    },
    code: {
        required: true,
        message: "验证码不能为空"
    }
});


const loading = ref<boolean>(false);
// 提交
const submit = () => {
    Form.value?.validate(async (valid, errors) => {
        if (valid) {
            loading.value = true;
            await service.request({
                url: "/cms/member/comm/update",
                method: "POST",
                data: { ...form },
            });
            loading.value = false
            close()

            uni.showToast({
                title: '保存成功'
            })
        }
    });
}

// 关闭弹窗
const close = () => {
    refs.clpRef.close()
}

const showCode = ref(true);
const count = ref(0);
// 获取验证码
const getCode = async () => {
    console.log("getCode", form);
    if (!form.phone) {
        uni.showToast({
            title: "手机号码不能为空",
            icon: "none"
        })
        return;
    }

    try {
        await service.request({
            url: "/admin/base/comm/sendSms",
            method: "POST",
            data: { phone: form.phone },
        }).then((res) => {
            console.log("res");
            
            showCode.value = false;
            count.value = 100;
            timeLoop();
            uni.showToast({
                title: "短信已发送",
                icon: 'success'
            })
            return;
        });

       

    } catch (err: any) {
        uni.showToast({
            title: err.message,
            icon: 'error'
        })
        return;
    }
};

const timeLoop = () => {
    const interval = setInterval(() => {
        count.value--;
        if (count.value < 0) {
            clearInterval(interval);
            showCode.value = true;
        }
    }, 1000);
};

</script>
    
<style></style>