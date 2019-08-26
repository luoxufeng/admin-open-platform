# admin-open-platform

## Project setup

```
npm install
```

### Compiles and hot-reloads for development

```
npm run serve
```

### Compiles and minifies for production

```
npm run build
```

### Run your tests

```
npm run test
```

### Lints and fixes files

```
npm run lint
```

### Customize configuration

See [Configuration Reference](https://cli.vuejs.org/config/).

目录结构：

├── mock # 本地模拟数据
├── public
│ └── favicon.png # Favicon
├── src
│ ├── assets # 本地静态资源
| |—— api # 数据接口请求
│ ├── components # 业务通用组件
│ ├── filters # 过滤器
│ ├── layouts # 通用布局
│ ├── oauth # 封装权限
│ ├── views # 业务页面
│ ├── store # 状态管理
│ ├── utils # 工具库
│ ├── styles # 样式
│ ├── router # 路由
| |—— svg # svg 文件
│ └── main.js #入口文件
├── vue.config.js
├── README.md
└── package.json
