<!--
 * @Author: chen.liang chen.liang@appshahe.com
 * @Date: 2024-01-02 09:41:16
 * @LastEditors: chen.liang chen.liang@appshahe.com
 * @LastEditTime: 2024-01-02 10:03:23
 * @FilePath: \hauntedparadise\JavaScripts\modules\build\ReadMe.md
 * @Description: 
-->

建筑模块使用指南

建筑功能对象需要继承自`BuildingBase`
在`BuildingFactory`中注册class

实现继承接口之后需要自己判断客户端还是服务端
建筑实例随时可能显示隐藏,在onShow和onHide中做好自己的内存管理(onhide中清理引用,action等方法)
数据可以保存到`BuildingInfo`的dataEx中


