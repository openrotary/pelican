const getCodeByCode = code => {
    switch (code) {
        case 11:
            return {
                display: 'flex',
                'align-items': 'center',
                'justify-content': 'center'
            }
        case 12:
            return {
                display: 'flex',
                'flex-direction': 'column',
                'justify-content': 'space-between'
            }
        case 13:
            return {
                display: 'flex',
                'align-items': 'center',
                'justify-content': 'space-between'
            }
        case 21:
            return {
                'border-radius': '5px',
                'background-image': 'url()',
                'background-position': 'center center',
                'background-size': '100% 100%',
                'background-repeat': 'no-repeat'
            }
        case 22:
            return {
                'background-color': '#fff'
            }
        case 31:
            return {
                display: 'block',
                content: `''`,
                position: 'absolute',
                left: 0,
                right: 0,
                top: 0,
                height: '1px',
                'background-color': '#000'
            }
        case 32:
            return {
                display: 'block',
                content: `''`,
                position: 'absolute',
                left: 0,
                right: 0,
                bottom: 0,
                height: '1px',
                'background-color': '#000'
            }
        case 33:
            return {
                display: 'block',
                content: `''`,
                position: 'absolute',
                left: 0,
                top: 0,
                bottom: 0,
                width: '1px',
                'background-color': '#000'
            }
        case 34:
            return {
                display: 'block',
                content: `''`,
                position: 'absolute',
                top: 0,
                right: 0,
                bottom: 0,
                width: '1px',
                'background-color': '#000'
            }
        case 41:
            return {
                border: 'none'
            }
        case 42:
            return {
                'box-sizing': 'border-box',
                border: '1px solid red'
            }
        case 43:
            return {
                width: '100%',
                height: '100%'
            }
        case 44:
            return {
                position: 'relative'
            }
        case 51:
            return {
                'list-style': 'none',
                'font-style': 'normal'
            }
        case 52:
            return {
                overflow: 'hidden',
                'text-overflow': 'ellipsis',
                display: '-webkit-box',
                '-webkit-line-clamp': 2,
                '-webkit-box-orient': 'vertical'
            }
        case 53:
            return {
                display: 'flex',
                'flex-direction': 'column'
            }
        case 54:
            return {
                'flex-shrink': 0
            }
        case 55:
            return {
                flex: 1
            }
        case 56:
            return {
                'font-size': '12px',
                color: '#000'
            }
        case 57:
            return {
                'background-color': '#233',
                padding: '5px 5px',
                'font-size': '15px',
                color: '#fff',
                display: 'inline-flex',
                'align-items': 'center',
                'justify-content': 'center',
                width: '60px',
                height: '30px',
                'border-radius': '5px'
            }

        default:
            break
    }
}

const quickLayout = () => [
    {
        key: 'flex布局',
        range: [
            { code: 11, label: '完全居中' },
            { code: 12, label: '上下靠边' },
            { code: 13, label: '左右靠边' }
        ]
    },
    {
        key: '背景色/图',
        range: [
            { code: 21, label: '自适应' },
            { code: 22, label: '背景色' }
        ]
    },
    {
        key: '伪类线条',
        range: [
            { code: 31, label: '上' },
            { code: 32, label: '下' },
            { code: 33, label: '左' },
            { code: 34, label: '右' }
        ]
    },
    {
        key: '其他常用',
        range: [
            { code: 41, label: '无边框' },
            { code: 42, label: '全边框' },
            { code: 43, label: '宽高' },
            { code: 44, label: '定位' },
            { code: 51, label: '清除默认样式元素' },
            { code: 52, label: '多行省略' },
            { code: 53, label: 'Flex向下排列' },
            { code: 54, label: '不被压缩' },
            { code: 55, label: '尽量填充' },
            { code: 56, label: '字体' },
            { code: 57, label: '按钮' }
        ]
    }
]

const getLayoutModel = () => ({
    position: {
        value: '',
        range: ['relative', 'absolute', 'fixed']
    },
    display: {
        value: '',
        range: ['block', 'inline-block', 'flex', 'inline-flex', 'box', 'inline']
    },
    'align-items': {
        value: '',
        range: ['center', 'flex-start', 'flex-end']
    },
    'justify-content': {
        value: '',
        range: ['center', 'space-around', 'space-between', 'flex-start', 'flex-end']
    },
    overflow: {
        value: '',
        range: ['auto', 'hidden']
    },
    'box-sizing': { value: '', range: ['border-box'] },
    'background-repeat': { value: '', range: ['repeat', 'no-repeat'] }
})

export { getLayoutModel, quickLayout, getCodeByCode }
