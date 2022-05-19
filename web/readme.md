创建时间：2021/08/19

## 1. 文档维护：

- 文档相关内容若有更改，请及时更新文档，以备后来者查询；

## 2. 项目开发：

- 请遵循此文档约定的目录结构与约定

```js
    |-- .babelrc
    |-- color.js
    |-- config.js
    |-- Dockerfile
    |-- jsconfig.json
    |-- package.json
    |-- readme.md
    |-- server.js
    |-- webpack.config.js
    |-- webpack.config.prod.js
    |-- .vscode
    |   |-- launch.json
    |   |-- settings.json
    |-- client
    |   |-- index.ejs
    |   |-- index.html                      // 当前 html 文件
    |   |-- index.js
    |   |-- assets                          // 资源文件
    |   |   |-- color.less
    |   |   |-- files
    |   |   |-- fonticon
    |   |   |-- font_sc
    |   |   |-- images
    |   |       |-- avatar
    |   |       |-- loginUi
    |   |-- src                             // 项目代码
    |       |-- app.js                      // 由此开始并加载模块
    |       |-- index.js                    
    |       |-- components                  // 公用组件
    |       |   |-- index.js                // 由此导出组件
    |       |   |-- Upload
    |       |       |-- index.js
    |       |-- layout                      // 项目布局以及初始化等操作
    |       |   |-- index.js
    |       |   |-- actions
    |       |   |   |-- global.js
    |       |   |-- components
    |       |   |   |-- footer
    |       |   |   |   |-- index.js
    |       |   |   |   |-- style.css
    |       |   |   |-- header
    |       |   |   |   |-- index.js
    |       |   |   |   |-- style.css
    |       |   |   |-- sider
    |       |   |       |-- index.js
    |       |   |-- containers
    |       |   |   |-- index.js
    |       |   |   |-- layout
    |       |   |   |   |-- breadcrumb.js    // 面包屑组件
    |       |   |   |   |-- index.js
    |       |   |   |   |-- index.less
    |       |   |   |-- no-match
    |       |   |       |-- index.js
    |       |   |-- reducers
    |       |   |   |-- ajaxResponse.js
    |       |   |   |-- global.js            // 全局数据，主要包含屏幕可视宽高、所有的 action 等
    |       |   |   |-- index.js
    |       |   |-- store
    |       |       |-- index.js
    |       |       |-- store.dev.js
    |       |       |-- store.prod.js
    |       |-- sections                     // 各功能模块
    |       |   |-- auth                     // 比较特别的 Auth 模块，目前 action、reducer 依然采用原始写法；包含登录、忘记密码等项目基本功能页面
    |       |   |   |-- index.js
    |       |   |   |-- routes.js
    |       |   |   |-- actions
    |       |   |   |   |-- auth.js
    |       |   |   |   |-- index.js
    |       |   |   |-- components
    |       |   |   |-- containers
    |       |   |   |   |-- index.js
    |       |   |   |   |-- login.js
    |       |   |   |-- reducers
    |       |   |   |   |-- auth.js
    |       |   |   |   |-- index.js
    |       |   |   |-- __tests__
    |       |   |-- example                   // 示例模块，一般的功能模块应遵循此结构
    |       |       |-- index.js              // 由此导出该模块信息，应包括一个 key 值，actions 等
    |       |       |-- nav-item.js           // 用于生成菜单项，此文件内可以进行权限判断
    |       |       |-- routes.js             // 路由文件
    |       |       |-- style.less            // 样式文件，若样式并不是非常多，每个模块一个样式文件即可
    |       |       |-- actions                 
    |       |       |   |-- example.js        // 具体的 action 操作
    |       |       |   |-- index.js          // 由此导出该项目的 action
    |       |       |-- components            // 组件
    |       |       |-- containers            // 容器，此文件夹内应只包括该模块第一层级的页面
    |       |       |   |-- example.js
    |       |       |   |-- index.js
    |       |       |-- reducers              // 若采用封装后的 action 写法，则 reducer 可不写
    |       |           |-- index.js
    |       |-- styles                        // 待初始化的主题样式
    |       |   |-- antd.less
    |       |   |-- theme.less
    |       |-- themes                        // 初始化后的主题样式文件
    |       |   |-- dark.json
    |       |   |-- light.json
    |       |   |-- theme.json
    |       |-- utils                         //
    |           |-- authCode.js
    |           |-- func.js                   // 常用函数
    |           |-- index.js
    |           |-- region.js
    |           |-- webapi.js                 // api 路由
    |-- log
    |-- middlewares
    |   |-- proxy.js
    |   |-- webpack-dev.js
    |-- routes
    |   |-- index.js
    |   |-- attachment
    |-- typings
        |-- node
        |   |-- node.d.ts
        |-- react
            |-- react.d.ts
```

- 封装后一般 action 写法：

    `@peace/utils 的 actionHelp 中有详细注释`

    ``` js
    'use strict';

    import { basicAction } from '@peace/utils'
    import { ApiTable } from '$utils'

    export function getMembers(orgId) {
        return dispatch => basicAction({
            type: 'get',
            dispatch: dispatch,
            actionType: 'GET_MEMBERS',
            url: `${ApiTable.getEnterprisesMembers.replace('{enterpriseId}', orgId)}`,
            msg: { error: '获取用户列表失败' },
            reducer: { name: 'members' }
        });
    }
    ```

1. 若 type=post，则可以使用 data 属性发送对象格式数据；

2. reducer.name 会作为该 action 对应的 reducer 的名字，从 state 里可以解构此变量，获得该 action 异步或其他操作获得的数据；

3. msg 可以发送 `{ option:'获取用户列表' }` ，则 actionHelp 会自动将其处理为失败和成功两种情况；

    若单独写 success 或 error 的 key，则只在成功或失败的时候进行提示；

4. 后续可以优化：type=get 时候，

    使用 query 属性将数据传递，在 @peace/utils 的 actionHelp 中将其添加到路由后面；eg. `{ enterpriseId: orgId }`

    使用 replace 属性传递对象数据，对象数据中将被替换的值为key，替换的值为 value，然后再 actionHelp 中更改路由；eg. `{ "{enterpriseId}": orgId}`

5. 最终取得的 reducer 中的数据格式一般为：
    ``` js
    {
        data: xxx,           // 接口返回的数据格式
        isRequesting: false, // 请求状态
        success: true,       // 以此判断请求是否成功，不用再以 payload.type 判断
    }
    ```

- actions 的引用

    从 reducer 的 state.global.actions 里引用具体 action

    ```js
    const Example = (props) => {
        const { dispatch, actions, user, loading } = props

        useEffect(() => {
            dispatch(actions.example.getMembers(user.orgId))
        }, [])

        return (
            <Spin tip="biubiubiu~" spinning={loading}>
                example
            </Spin>
        )
    }

    function mapStateToProps(state) {
        const { auth, global, members } = state;
        return {
            loading: members.isRequesting,
            user: auth.user,
            actions: global.actions,
            members: members.data
        };
    }

    export default connect(mapStateToProps)(Example);
    ```

- 一般路由配置
    ```js
    'use strict';
    import { Example, } from './containers';

    export default [{
        type: 'inner',                // 是否在layout 内，如果为outer，则看不到 header、footer、sider等布局，比如登陆页面
        route: {
            path: '/example',
            key: 'example',
            breadcrumb: '栗子',
                                      // 不设置 component 则面包屑禁止跳转
            childRoutes: [{
                path: '/e1',          // 自路由不必复写父路由内容，会自动拼接； 则此处组件的实际路由为 /example/e1
                key: 'e1',          
                component: Example,
                breadcrumb: '棒子',
            }]
        }
    }];
    ```
- cross-env 的使用限制

    cross-env 可以统一不同操作系统下环境变量的导出方式，不用再在 windows 下写 set；linux 下写 export； 可以统一以 cross-env NODE_ENV=DEV 代替；

    但是这样的话就不能在同一条运行的命令中使用 && 切割，因为会把命令切割为两个环境，则最终拿不到我们设置的变量；

- 主题变换

    核心实现代码：

    ```js
    // client/src/layout/components/header/index.js

    const changeTheme_ = (themeKey) => {
        localStorage.setItem("theme-name", themeKey);
        window.less.modifyVars(themeMap[themeKey]).catch(error => {
            message.error(`Failed to reset theme`);
        });
    }

    ```

    使用 less 进行样式变量替换；

    所以在 client/src/themes/xx.json 中的中可以配置想变换的主题变量，变量的获取可以通过查看 antd、antdPro 的源码，然后在 color 中处理；

## 一些考量
1. 文件上传，如需保存在api所在服务器，可以在api使用 @fs/attachment 包配合 client/src/component/Upload 使用，Upload 组件已经完美兼容该包的使用；