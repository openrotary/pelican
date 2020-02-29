<template>
  <div class="input-fill-x">
    <input :placeholder="title" :value="value" @blur="handleBlur" @input="handleChange" @keyup.enter="handleEnter" class="input-control input-fill" />
    <label class="input-label">{{ title }}</label>
  </div>
</template>

<script>
// 未启用
export default {
    name: 'MyInput',
    props: {
        title: {
            type: String,
            default: ''
        },
        value: {
            type: String,
            default: ''
        }
    },
    methods: {
        handleBlur() {
            this.$emit('blur')
        },
        handleChange(e) {
            this.$emit('input', e.target.value)
        },
        handleEnter() {
            this.$emit('keyup-enter')
        }
    }
}
</script>

<style lang="stylus" scoped>
.input-fill-x {
    position: relative;
    width: 100%;
    display: flex;
    flex: 1;
    border-bottom: 1px solid #d0d0d5;

    &:after {
        content: '';
        position: absolute;
        border-bottom: 2px solid #55295b;
        left: 0;
        right: 0;
        bottom: -1px;
        transform: scaleX(0);
        transition: transform 0.25s;
    }

    &:focus-within:after {
        transform: scaleX(1);
    }
}

.input-control {
    margin: 0;
    flex: 1;
    font-size: 16px;
    line-height: 1.5;
    outline: none;
}

.input-fill {
    padding: 20px 10px 6px;
    border: 1px solid transparent;
}

/* 默认placeholder颜色透明不可见 */
.input-control:placeholder-shown::placeholder {
    color: transparent;
}

.input-label {
    position: absolute;
    font-size: 16px;
    line-height: 1.5;
    left: 10px;
    top: 14px;
    color: #a2a9b6;
    padding: 0 2px;
    transform-origin: 0 0;
    pointer-events: none;
    transition: all 0.25s;
}

/* 线框样式label定位 */
.input-control:not(:placeholder-shown) ~ .input-label, .input-control:focus ~ .input-label {
    color: #55295b;
    transform: scale(0.75) translate(-2px, -32px);
}

/* 填充样式下label定位 */
.input-fill:not(:placeholder-shown) ~ .input-label, .input-fill:focus ~ .input-label {
    transform: scale(0.75) translateY(-14px);
}
</style>