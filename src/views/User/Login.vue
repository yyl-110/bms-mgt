<template>
    <div class='w-screen h-screen bg flex items-center justify-end'>
        <div
            class='layout-login w-[90%] sm:w-[40%] mb-[100px] px-4 md:w-[50%] xl:w-[23%] mx-auto lg:w-[33%] sm:mr-[12%] py-8 rounded'>
            <h3 class='text-2xl font-[400] text-[#333] text-center mb-6'> {{ $t('config.title') }}</h3>
            <el-form ref='ruleForm' label-position='right' label-width='0' :model='form' :rules='rules' size='large'>
                <el-form-item prop='name' class='mb-4 xl:mb-10'>
                    <el-input v-model='form.name' :placeholder="$t('login.userName')" prefix-icon='el-icon-user'>
                    </el-input>
                </el-form-item>
                <el-form-item prop='pwd' class='mb-4 xl:mb-10'>
                    <el-input v-model='form.pwd' :placeholder="$t('login.password')" prefix-icon='el-icon-lock'
                        show-password />
                </el-form-item>
                <el-form-item prop='code' class='mb-4'>
                    <el-input v-model='form.code' :placeholder="$t('login.code')" @keyup='enterSubmit'>
                        <template #append>
                            <div class='codeBox w-[100px]' @click='getVerify'>
                                <img v-if='codeImg' :src='codeImg' class='code w-full h-full' alt=''>
                            </div>
                        </template>
                    </el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type='primary' class='w-full mt-5' @click='onSubmit'>{{ $t('login.login') }}</el-button>
                </el-form-item>
            </el-form>
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, reactive, ref } from 'vue'
import { useLayoutStore } from '/@/store/modules/layout'
import { ElNotification } from 'element-plus'
import { validate } from '/@/utils/formExtend'
import { verify } from '/@/api/layout'
import { getFormData } from '/@/utils/tools'
import { useI18n } from 'vue-i18n'


const formRender = () => {
    const { t } = useI18n()
    const { login } = useLayoutStore()
    let form = reactive({
        name: 'user1',
        pwd: '123456',
        code: ''
    })
    const ruleForm = ref(null)
    const codeImg = ref('')
    /* 获取验证码 */
    const getVerify = async () => {
        const res: any = await verify()
        const base = btoa(new Uint8Array(res?.data).reduce((data, byte) => data + String.fromCharCode(byte), ''))
        codeImg.value = `data:image/png;base64,${base}`
    }
    const enterSubmit = (e: KeyboardEvent) => {
        if (e.key === 'Enter') {
            onSubmit()
        }
    }
    const onSubmit = async () => {
        let { name, pwd, code } = form
        if (!await validate(ruleForm)) return
        try {
            await login(getFormData({ userName: name, password: pwd, code }))
        } catch (error) {
            getVerify()
            return
        }
        ElNotification({
            message: t('login.msg'),
            type: 'success'
        })
    }
    const rules = reactive({
        name: [
            {
                validator: (rule: any, value: any, callback: (arg0?: Error | undefined) => void) => {
                    if (!value) {
                        return callback(new Error(`${t('login.emptyUser')}`))
                    }
                    callback()
                }, trigger: 'blur'
            }
        ],
        pwd: [
            {
                validator: (rule: any, value: any, callback: (arg0?: Error | undefined) => void) => {
                    if (!value) {
                        return callback(new Error(`${t('login.emptyPwd')}`))
                    }
                    callback()
                }, trigger: 'blur'
            }
        ],
        code: [
            {
                validator: (rule: any, value: any, callback: (arg0?: Error | undefined) => void) => {
                    if (!value) {
                        return callback(new Error(`${t('login.emptyCode')}`))
                    }
                    callback()
                }, trigger: 'blur'
            }
        ]
    })
    onMounted(() => {
        getVerify()
    })
    return {
        form,
        onSubmit,
        codeImg,
        getVerify,
        enterSubmit,
        rules,
        ruleForm,
    }
}
export default defineComponent({
    name: 'Login',
    setup() {
        return {
            labelCol: { span: 4 },
            wrapperCol: { span: 14 },
            ...formRender()
        }
    }
})
</script>

<style lang='scss' scoped>
.el-input--large {
    --el-component-size-large: 50px;
    // margin-bottom: 30px;
    --el-border-radius-base: 10px;
}

.el-button--large {
    --el-border-radius-base: 10px;
    height: 50px;
}

.codeBox {
    height: 100%;
    text-align: center;
    cursor: pointer;
}

:deep(.el-input-group__append) {
    padding: 0;
}

.bg {
    background: url("/@/assets/img/login_bg.png") no-repeat;
    background-size: 100% 100%;
}

.layout-login {
    background: #FFFFFF;
    box-shadow: 0px 0px 24px 0px rgba(147, 190, 238, 0.5);
    border-radius: 20px;
}
</style>