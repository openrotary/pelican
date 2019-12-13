const layoutModel = () => [
    {
        key: 'position',
        value: ['relative', 'absolute', 'fixed']
    },
    {
        key: 'display',
        value: ['block', 'inline-block', 'flex', 'inline-flex', 'inline']
    },
    {
        key: 'align-item',
        value: ['center', 'flex-start', 'flex-end']
    },
    {
        key: 'justify-content',
        value: ['center', 'space-around', 'space-between', 'flex-start', 'flex-end']
    },
    {
        key: 'width',
        tips: '宽度',
        value: '0',
        range: [0, 200]
    },
    {
        key: 'height',
        value: '0',
        range: [0, 200]
    },
    {
        key: 'padding',
        value: '0',
        range: [0, 100]
    },
    {
        key: 'margin',
        value: '0',
        range: [0, 100]
    },
    { key: 'left', value: '0', range: [0, 200] },
    { key: 'right', value: '0', range: [0, 200] },
    { key: 'top', value: '0', range: [0, 200] },
    { key: 'bottom', value: '0', range: [0, 200] }
]

export default layoutModel
