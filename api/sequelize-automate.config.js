module.exports = {
    // 数据库配置 与 sequelize 相同
    dbOptions: {
        database: 'demo',
        username: 'Administrator',
        password: '123',
        dialect: 'postgres',
        host: 'localhost',
        port: 5432,
        define: {
            underscored: false,
            freezeTableName: false,
            charset: 'utf8mb4',
            timezone: '+00: 00',
            dialectOptions: {
                collate: 'utf8_general_ci',
            },
            timestamps: false,
        },
    },
    options: {
        type: 'js', // 指定 models 代码风格
        camelCase: true, // Models 文件中代码是否使用驼峰命名
        modalNameSuffix: false, // 模型名称是否带 ‘Model’ 后缀
        fileNameCamelCase: false, // Model 文件名是否使用驼峰法命名，默认文件名会使用表名，如 `user_post.js`；如果为 true，则文件名为 `userPost.js`
        dir: './app/lib/models', // 指定输出 models 文件的目录
        typesDir: 'models', // 指定输出 TypeScript 类型定义的文件目录，只有 TypeScript / Midway 等会有类型定义
        emptyDir: false, // ！！！ 谨慎操作 生成 models 之前是否清空 `dir` 以及 `typesDir`
        tables: ['user_placeSecurityRecord', 'places'], // 指定生成哪些表的 models，如 ['user', 'user_post']；如果为 null，则忽略改属性
        skipTables: ['user'], // 指定跳过哪些表的 models，如 ['user']；如果为 null，则忽略改属性
        tsNoCheck: false, // 是否添加 `@ts-nocheck` 注释到 models 文件中
        ignorePrefix: [], // 生成的模型名称忽略的前缀，因为 项目中有以下表名是以 t_ 开头的，在实际模型中不需要， 可以添加多个 [ 't_data_', 't_',] ,长度较长的 前缀放前面
        attrLength: false, // 在生成模型的字段中 是否生成 如 var（128）这种格式，公司一般使用 String ，则配置为 false
    },
}