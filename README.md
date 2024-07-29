# 1.启动  

```bash
# 依赖下载
$ npm install

# 项目启动
$ npm run start

# 监听项目接口变动
$ npm run start:debug
```

## 2.模块批注

* controller 是处理路由，解析请求参数的。
* ervice 是处理业务逻辑的，比如操作数据库。
* dto 是封装请求参数的。
* entities 是封装对应数据库表的实体的。

### 3.git提交规范

* fix：修改bug类型
* note：增加注释
* feat：新功能
* docs：文档变更
* style：代码风格变动
* refactor：代码重构
* perf：性能优化
* test：添加或修改测试
* hore：构建过程或辅助工具的变动
* build：构建系统或外部依赖项的变更
* ci：持续集成配置的变更
* revert：代码回滚
