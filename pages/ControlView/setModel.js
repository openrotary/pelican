const getLayoutModel = () => ({
    position: {
        value: '',
        range: ['relative', 'absolute', 'fixed']
    },
    display: {
        value: '',
        range: ['block', 'inline-block', 'flex', 'inline-flex', 'box', 'inline', 'none']
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

const iconLayoutList = () => [
    {
        icon: require('@/assets/icon-flex-center-1.svg'),
        label: '完全居中',
        getCode: () => ({
            display: 'flex',
            'align-items': 'center',
            'justify-content': 'center'
        })
    },
    {
        icon: require('@/assets/icon-flex-center-2.svg'),
        label: '上下靠边',
        getCode: () => ({
            display: 'flex',
            'flex-direction': 'column',
            'justify-content': 'space-between'
        })
    },
    {
        icon: require('@/assets/icon-flex-center-3.svg'),
        label: '左右靠边',
        getCode: () => ({
            display: 'flex',
            'align-items': 'center',
            'justify-content': 'space-between'
        })
    },
    {
        icon: require('@/assets/icon-flex-column.svg'),
        label: '向下排列',
        getCode: () => ({
            display: 'flex',
            'flex-direction': 'column'
        })
    },
    {
        icon: require('@/assets/icon-wallpaper.svg'),
        label: '背景图自适应',
        getCode: () => ({
            'border-radius': '5px',
            'background-image': 'url()',
            'background-position': 'center center',
            'background-size': '100% 100%',
            'background-repeat': 'no-repeat'
        })
    },
    {
        icon: require('@/assets/icon-bgcolor.svg'),
        label: '背景色',
        getCode: () => ({
            'background-color': '#fff'
        })
    },
    {
        icon: require('@/assets/icon-top-line.svg'),
        label: '伪元素线条-上',
        getCode: () => ({
            display: 'block',
            content: `''`,
            position: 'absolute',
            left: 0,
            right: 0,
            top: 0,
            height: '1px',
            'background-color': '#000'
        })
    },
    {
        icon: require('@/assets/icon-bottom-line.svg'),
        label: '伪元素线条-下',
        getCode: () => ({
            display: 'block',
            content: `''`,
            position: 'absolute',
            left: 0,
            right: 0,
            bottom: 0,
            height: '1px',
            'background-color': '#000'
        })
    },
    {
        icon: require('@/assets/icon-left-line.svg'),
        label: '伪元素线条-左',
        getCode: () => ({
            display: 'block',
            content: `''`,
            position: 'absolute',
            left: 0,
            top: 0,
            bottom: 0,
            width: '1px',
            'background-color': '#000'
        })
    },
    {
        icon: require('@/assets/icon-right-line.svg'),
        label: '伪元素线条-右',
        getCode: () => ({
            display: 'block',
            content: `''`,
            position: 'absolute',
            top: 0,
            right: 0,
            bottom: 0,
            width: '1px',
            'background-color': '#000'
        })
    },
    {
        icon: require('@/assets/icon-border-outer.svg'),
        label: '全边框',
        getCode: () => ({
            'box-sizing': 'border-box',
            border: '1px solid red'
        })
    },
    {
        icon: require('@/assets/icon-border-clear.svg'),
        label: '无边框',
        getCode: () => ({
            border: 'none'
        })
    },
    {
        icon: require('@/assets/icon-width-height.svg'),
        label: '宽高',
        getCode: () => ({
            width: '100%',
            height: '100%'
        })
    },
    {
        icon: require('@/assets/icon-position.svg'),
        label: '相对定位',
        getCode: () => ({
            position: 'relative'
        })
    },
    {
        icon: require('@/assets/icon-flex-shrink.svg'),
        label: 'flex不压缩',
        getCode: () => ({
            'flex-shrink': 0
        })
    },
    {
        icon: require('@/assets/icon-flex-big.svg'),
        label: 'flex尽量填充',
        getCode: () => ({
            flex: 1
        })
    },
    {
        icon: require('@/assets/icon-font.svg'),
        label: '文字',
        getCode: () => ({
            'font-size': '12px',
            color: '#000'
        })
    },
    {
        icon: require('@/assets/icon-format-clear.svg'),
        label: '清除默认样式',
        getCode: () => ({
            'list-style': 'none',
            'font-style': 'normal'
        })
    },
    {
        icon: require('@/assets/icon-more-line.svg'),
        label: '多行省略',
        getCode: () => ({
            overflow: 'hidden',
            'text-overflow': 'ellipsis',
            display: '-webkit-box',
            '-webkit-line-clamp': 3,
            '-webkit-box-orient': 'vertical'
        })
    },
    {
        icon: require('@/assets/icon-button.svg'),
        label: '按钮',
        getCode: () => ({
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
        })
    }
]

export { getLayoutModel, iconLayoutList }
