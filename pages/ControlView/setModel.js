const getCodeByCode = code => {
    switch (code) {
        case 11:
            return {
                display: 'flex',
                'align-items': 'center',
                'justify-content': 'center',
                'flex-shrink': 0
            }
        case 12:
            return {
                display: 'flex',
                'align-items': 'center',
                'flex-shrink': 0
            }
        case 13:
            return {
                display: 'flex',
                'justify-content': 'center',
                'flex-shrink': 0
            }
        case 21:
            return {
                'background-image': 'url()',
                'background-position': 'center center',
                'background-size': '100% 100%',
                'background-repeat': 'no-repeat'
            }
        case 31:
            return {
                display: 'block',
                content: '',
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
                content: '',
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
                content: '',
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
                content: '',
                position: 'absolute',
                top: 0,
                right: 0,
                bottom: 0,
                width: '1px',
                'background-color': '#000'
            }
        case 41:
            return {
                'list-style': none,
                'font-style': normal
            }

        default:
            break
    }
}

const quickLayout = () => [
    {
        key: 'flex居中',
        range: [
            { code: 11, label: '完全居中' },
            { code: 12, label: '上下居中' },
            { code: 13, label: '左右居中' }
        ]
    },
    { key: '图片填充', range: [{ code: 21, label: '自适应' }] },
    {
        key: '伪类线条',
        range: [
            { code: 31, label: '上' },
            { code: 32, label: '下' },
            { code: 33, label: '左' },
            { code: 34, label: '右' }
        ]
    },
    { key: '清除默认样式', range: [{ code: 41, label: 'ul、li、a、i、b元素' }] }
]

const layoutModel = () => [
    {
        key: 'position',
        range: ['relative', 'absolute', 'fixed']
    },
    {
        key: 'display',
        range: ['block', 'inline-block', 'flex', 'inline-flex', 'inline']
    },
    {
        key: 'align-items',
        range: ['center', 'flex-start', 'flex-end']
    },
    {
        key: 'justify-content',
        range: ['center', 'space-around', 'space-between', 'flex-start', 'flex-end']
    },
    {
        key: 'overflow',
        range: ['auto', 'hidden']
    },
    { key: 'box-sizing', range: ['border-box'] },
    { key: 'background-repeat', range: ['repeat', 'no-repeat'] },
    { key: 'background-color', range: [] },
    { key: 'background-image', range: [] },
    { key: 'background-size', range: [] },
    { key: 'background-position', range: [] },
    { key: 'content', range: [] },
    {
        key: 'width',
        range: []
    },
    {
        key: 'height',
        range: []
    },
    {
        key: 'padding',
        range: []
    },
    {
        key: 'margin',
        range: []
    },
    { key: 'left', range: [] },
    { key: 'right', range: [] },
    { key: 'top', range: [] },
    { key: 'bottom', range: [] },
    { key: 'font-size', range: [] },
    { key: 'color', range: [] },
    { key: 'border', range: [] },
    { key: 'border-radius', range: [] },
    { key: 'box-shadow', range: [] },
    { key: 'flex-shrink', range: [] },
    { key: 'flex', range: [] },
    { key: 'z-index', range: [] }
]

export { layoutModel, quickLayout, getCodeByCode }
