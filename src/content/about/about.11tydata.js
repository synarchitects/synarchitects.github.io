// 根据11ty的文档，该文件定义了目录内所有文档的共同frontmatter数据集。
// 本文件就是给所有文件加上一个layout属性，值为'layouts/about.njk'。
// 这样，所有在src/content/<xxx>目录下的文档都将拥有相同的layout属性。
// 当然，layout属性可以在具体的文档中被覆盖。
// 这样做的好处是可以避免在每个文档中都重复定义相同的属性，
// 使得代码更加简洁和易于维护。
// 该文件名和目录名必须一致，才能生效。

export default {
    tags: [
        'about',
        '袈蓝',
        '袈蓝集团',
        '袈蓝建筑',
        '袈蓝公社',
        '乡村振兴',
        '城乡融合',
        '乡村运营',
        '乡村文旅',
        '农文旅',
        '顶层设计',
        '故乡的月',
        '邹迎晞',
        '建筑设计',
        '乡村设计',
        '乡村建筑',
        '乡村规划',
        '乡村振兴设计',
        '乡村振兴建筑',
        '乡村振兴规划',
        '乡村振兴研究',
        '乡村振兴案例',
        '乡村振兴政策',
        '乡村振兴战略',
        'synarchitects',
        'bau-jl',
    ],
    layout: 'layouts/about.njk',
};
