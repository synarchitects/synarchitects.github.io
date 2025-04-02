import path from 'path';
import { fileURLToPath } from 'url';
import { IdAttributePlugin, InputPathToUrlTransformPlugin, HtmlBasePlugin } from '@11ty/eleventy';
import pluginSyntaxHighlight from '@11ty/eleventy-plugin-syntaxhighlight';
import { eleventyImageTransformPlugin } from '@11ty/eleventy-img';

import pluginFilters from './src/_config/filters.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

/** @param {import("@11ty/eleventy").UserConfig} eleventyConfig */
export default async function (eleventyConfig) {
    // Drafts, see also _data/eleventyDataSchema.js
    eleventyConfig.addPreprocessor('drafts', '*', (data, content) => {
        if (data.draft && process.env.ELEVENTY_RUN_MODE === 'build') {
            return false;
        }
    });

    // Copy the contents of the `public` folder to the output folder
    // For example, `./public/css/` ends up in `_site/css/`
    eleventyConfig.addPassthroughCopy({
        './public/': '/',
    });

    // Copy the `favicon` icon to the output folder
    eleventyConfig.addPassthroughCopy({
        './src/content/images/': '/images/',
    });

    // Run Eleventy when these files change:
    // https://www.11ty.dev/docs/watch-serve/#add-your-own-watch-targets

    eleventyConfig.addWatchTarget('./src/css/');

    // 增量编译优化配置
    eleventyConfig.setUseGitIgnore(false); // 确保.gitignore不影响文件监听
    eleventyConfig.setWatchThrottleWaitTime(500); // 设置更短的防抖时间

    // Watch content images for the image pipeline.
    eleventyConfig.addWatchTarget('content/**/*.{svg,webp,png,jpeg}');

    // 明确添加需要监听的模板文件
    eleventyConfig.addWatchTarget('src/_includes/**/*.{njk,liquid,html}');
    eleventyConfig.addWatchTarget('src/_data/**/*.js');

    // 官方插件
    eleventyConfig.addPlugin(pluginSyntaxHighlight, {
        preAttributes: { tabindex: 0 },
    });
    eleventyConfig.addPlugin(HtmlBasePlugin);
    eleventyConfig.addPlugin(InputPathToUrlTransformPlugin);

    // Image optimization: https://www.11ty.dev/docs/plugins/image/#eleventy-transform
    eleventyConfig.addPlugin(eleventyImageTransformPlugin, {
        // File extensions to process in _site folder
        extensions: 'html',

        // Output formats for each image.
        formats: ['avif', 'webp', 'auto'],

        // widths: ["auto"],

        // 指定图片处理后的输出目录，减少网络部署时候的压力
        outputDir: '_site/img/',

        // 指定图片在生成的html中的引用路径都在img里
        urlPath: '/img/',

        // 缓存选项 - 增强增量编译
        cacheOptions: {
            duration: '1d', // 缓存1天
            directory: '.cache',
            removeUrlQueryParams: false,
            // 启用更细粒度的缓存验证
            validate: async (entry) => {
                return !(await entry.isStale());
            },
        },

        defaultAttributes: {
            // e.g. <img loading decoding> assigned on the HTML tag will override these values.
            loading: 'lazy',
            decoding: 'async',
        },

        // 添加错误处理，跳过失败的图片
        errorHandler: (err, src, options) => {
            console.error(`图片处理失败: ${src}`, err.message);
            // 返回null跳过此图片
            return null;
        },
    });

    // Filters
    eleventyConfig.addPlugin(pluginFilters);

    eleventyConfig.addPlugin(IdAttributePlugin, {
        // by default we use Eleventy’s built-in `slugify` filter:
        // slugify: eleventyConfig.getFilter("slugify"),
        // selector: "h1,h2,h3,h4,h5,h6", // default
    });

    // Features to make your build faster (when you need them)

    // If your passthrough copy gets heavy and cumbersome, add this line
    // to emulate the file copy on the dev server. Learn more:
    // https://www.11ty.dev/docs/copy/#emulate-passthrough-copy-during-serve

    //eleventyConfig.setServerPassthroughCopyBehavior("passthrough");

    eleventyConfig.addGlobalData('siteConfigFilePath', () => {
        const jsonFileAbsolutePath = path.resolve('src/_data/metadata.json');

        // Calculate the relative path from the project directory
        const relativePath = path.relative(process.cwd(), jsonFileAbsolutePath);

        return relativePath; // Return the relative path
    });
}

export const config = {
    // Control which files Eleventy will process
    // e.g.: *.md, *.njk, *.html, *.liquid
    templateFormats: ['md', 'njk', 'html', 'liquid', '11ty.js'],

    // Pre-process *.md files with: (default: `liquid`)
    markdownTemplateEngine: 'njk',

    // Pre-process *.html files with: (default: `liquid`)
    htmlTemplateEngine: 'njk',

    // These are all optional:
    dir: {
        input: './src/content', // default: "."
        includes: '../_includes', // default: "_includes" (`input` relative)
        data: '../_data', // default: "_data" (`input` relative)
        output: '_site',
    },
};
