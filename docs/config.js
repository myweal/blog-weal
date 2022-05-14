// el: "#app",                                  // 挂载元素，可以是一个 CSS 选择器，默认为 #app 如果不存在就直接绑定在 body 上。
// repo: null,                                  // 配置仓库地址或者 username/repo 的字符串，会在页面右上角渲染一个 GitHub Corner 挂件。
// maxLevel: 6,                                 // 默认情况下会抓取文档中所有标题渲染成目录，可配置最大支持渲染的标题层级。
// loadNavbar: false,                           // 加载自定义导航栏。设置为 true 后会加载 _navbar.md 文件，也可以自定义加载的文件名。
// loadSidebar: false,                          // 加载自定义侧边栏。设置为 true 后会加载 _sidebar.md 文件，也可以自定义加载的文件名。
// hideSidebar: true,                           // 这个选项用来完全隐藏侧边栏，侧边栏的任何内容都不会被渲染。
// subMaxLevel: 0,                              // 自定义侧边栏后默认不会再生成目录，你也可以通过设置生成目录的最大层级开启这个功能。
// auto2top: false,                             // 切换页面后是否自动跳转到页面顶部。
// homepage: "README.md",                       // 设置首页文件加载路径。适合不想将 README.md 作为入口文件渲染，或者是文档存放在其他位置的情况使用。
// basePath: "/",                               // 文档加载的根路径，可以是二级路径或者是其他域名的路径。
// relativePath: false,                         // 是否使用相对路径
// coverpage: false,                            // 启用封面页。开启后是加载 _coverpage.md 文件，也可以自定义文件名。
// logo: "assess/images/logo.svg",              // 在侧边栏中出现的网站图标，你可以使用CSS来更改大小
// name: "",                                    // 文档标题，会显示在侧边栏顶部。也可以包含自定义 HTML 代码来方便地定制。
// nameLink: window.location.pathname,          // 点击文档标题后跳转的链接地址。
// markdown: {},                                // markdown 解析配置
// themeColor: "",                              // 替换主题色。利用 CSS3 支持变量的特性，对于老的浏览器有 polyfill 处理。
// alias: {"/.*/_sidebar.md": "/_sidebar.md"},  // 定义路由别名，可以更自由的定义路由规则。 支持正则。
// autoHeader: true,                            // 同时设置 loadSidebar 和 autoHeader 后，可以根据 _sidebar.md 的内容自动为每个页面增加标题。
// executeScript: true,                         // 执行文档里的 script 标签里的脚本。 如果 Vue 存在，则自动开启。
// noEmoji: true,                               // 禁用 emoji 解析。
// mergeNavbar: true,                           // 小屏设备下合并导航栏到侧边栏。
// formatUpdated: "{YYYY}/{MM}/{DD} {HH}:{mm}", // 我们可以通过 {docsify-updated} 变量显示文档更新日期. 并且通过 formatUpdated配置日期格式。
// externalLinkTarget: "_blank",                // 外部链接的打开方式。
// cornerExternalLinkTarget: "_blank",          // 右上角链接的打开方式。
// externalLinkRel: "noopener",                 // 默认为 noopener (no opener) 可以防止新打开的外部页面（当 externalLinkTarget 设为 _blank 时）能够控制我们的页面，没有设为 _blank 的话就不需要设置这个选项了。
// routerMode: "hash",                          // 路由模式。
// crossOriginLinks: [],                        // 当设置了routerMode:'history'时，你可能会面临跨域的问题。
// noCompileLinks: [],                          // 有时我们不希望 docsify 处理我们的链接。
// onlyCover: false,                            // 只在访问主页时加载封面。
// requestHeaders: {},                          // 设置请求资源的请求头。
// ext: ".md",                                  // 资源的文件扩展名。
// fallbackLanguages: [],                       // 一个语言列表。在浏览这个列表中的语言的翻译文档时都会在请求到一个对应语言的翻译文档，不存在时显示默认语言的同名文档。
// notFoundPage: true,                          // 在找不到指定页面时加载_404.md。
// topMargin: 0,                                // 让你的内容页在滚动到指定的锚点时，距离页面顶部有一定空间。
// vueComponents: {},                           // 创建并注册全局 Vue组件 。组件是以组件名称为键，以包含 Vue 选项的对象为值来指定的。组件data对每个实例都是唯一的，并且在用户浏览网站时不会持久。
// vueGlobalOptions: {},                        // 指定 Vue选项 ，用于未明确使用vueMounts、vueComponents或markdown脚本挂载的 Vue 内容。对全局data的更改将持续存在，并在任何使用全局引用的地方得到反映。
// vueMounts: {},                               // 指定要挂载为 Vue实例 的 DOM 元素及其相关选项。挂载元素使用 CSS选择器 作为键，并使用包含 Vue 选项的对象作为其值。每次加载新页面时，Docsify 将挂载主内容区域中第一个匹配的元素。挂载元素data对每个实例来说都是唯一的，并且不会在用户浏览网站时持久存在。
window.$docsify = {
  coverpage: true,
  loadNavbar: true,
  loadSidebar: true,
  subMaxLevel: 2,
  maxLevel: 2,
  auto2top: true,
  name: "我的成长日记",

  copy: {
    errorText: "复制失败",
    successText: "已复制到剪贴板"
  },

  search: {
    paths: "auto",

    placeholder: {
      "/": "(o゜▽゜)o☆ 搜一下"
    },

    noData: {
      "/": "找不到结果╮(╯▽╰)╭"
    }
  },

  sidebarDisplayLevel: 1,

  toc: {
    title: "成长日记"
  },

  vue: {
    version: "vue2"
  }
};
