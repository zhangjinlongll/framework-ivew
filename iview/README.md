## 单元测试开发注意事项
### 拉取组件工程，必须放在iview根目录下
例如：
iview/zn_vue_ui_basepage
### 单元测试路径
根据需要修改配置
```
import Counter from '../组件名/src/components/需测试的文件名.vue'
例如：拉取组件为zn_vue_ui_basepage单元测试路径为以下
import Counter from '../zn_vue_ui_basepage/src/components/Counter.vue'
```
## 单元测试安装
npm install
## 单元测试启动
npm run test
## 文件覆盖率查看
启动单元测试会生成
coverage文件，打开文件至index.html用浏览器打开
## 注事项
功能开发完成，书写单元测试用例，单独进行测试