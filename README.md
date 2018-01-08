#微信小程序自定义组件
[TOC]
##简介
		小程序基础库版本1.6.3开始，小程序支持简洁的组件化编程。
		开发过程中，要重复使用到某些页面功能或是组件，一般我们思路是把对应的页面功能或是组件抽象成自定义组件，以便不同页面中重复使用。达到复杂界面拆分多个模块，有助有后期维护和代码的可读性。

##创建组件
		自定义组件有四个文件：.json、.wxml、.wxss、.js组成，类似于创建page界面。创建自定义组件在微信开发工具中右击选择Component，自动生成四个文件。
![](http://img.blog.csdn.net/20171229145558288?watermark/2/text/aHR0cDovL2Jsb2cuY3Nkbi5uZXQvcXFfMjcxMDM5NTk=/font/5a6L5L2T/fontsize/400/fill/I0JBQkFCMA==/dissolve/70/gravity/SouthEast)

创建自定义文件在json文件中自定义组件会声明component字段设为true:
```
{
  "component": true
}
```
如何自定义组件，这边我们结合一个自定义对话框来进行讲解。
我们先看下要实现的效果图，如下：

![](http://img.blog.csdn.net/20171229150056866?watermark/2/text/aHR0cDovL2Jsb2cuY3Nkbi5uZXQvcXFfMjcxMDM5NTk=/font/5a6L5L2T/fontsize/400/fill/I0JBQkFCMA==/dissolve/70/gravity/SouthEast)

##创建自定义对话框

###step1

		创建一个components文件，项目使用的自定义控件全部存放在这里，我们在components文件夹中创建一个Dialog文件夹存放我们的弹窗组件，在Dialog下右击新建Component并命名为dialog后并命名为dialog，对应生成四个文件：dialog.js、dialog.json、dialog.wxml、dialog.wxss四个文件，与创建pages页面类似。

![](http://img.blog.csdn.net/20171229150337587?watermark/2/text/aHR0cDovL2Jsb2cuY3Nkbi5uZXQvcXFfMjcxMDM5NTk=/font/5a6L5L2T/fontsize/400/fill/I0JBQkFCMA==/dissolve/70/gravity/SouthEast)

###step2

		组件初始化完成，进行下一步相关配置的设置，首先需要声明自定义组件，在dailog.json中设置component字段为true
```
{
  "component": true,        // 自定义组件声明
  "usingComponents": {}     // 可选项，用于引用别的组件
}
```
		usingCompoents引用其他组件，就是组件套组件，但我们现在定义对话框使用不到。
		其次，我们要贴UI效果的视图，在dialog,wxml文件中编写弹窗体组件UI标签（美工完成的视图，直接copy过来）。界面的UI不是这次主要介绍内容，这里不详细讲解标签和css样式了，直接上代码dialog.wxml文件如下：
```
<view class="contain" hidden="{{!isShow}}">
    <view class="hd-dialog">
        <view class="weui-mask"></view>
        <view class="weui-dialog">
            <view class="weui-dialog__hd"><view class="weui-dialog__title">{{title}}</view></view>
            <view class="weui-dialog__bd">{{ content }}</view>
            <view class="weui-dialog__ft">
                <view class="weui-dialog__btn weui-dialog__btn_default" catchtap='_cancelEvent'>{{ cancelText }}</view>
                <view class="weui-dialog__btn weui-dialog__btn_primary" catchtap='_confirmEvent'>{{ confirmText }}</view>
            </view>
        </view>
    </view>
</view>
```
dialog.wxss文件如下：
```
.contain {
  position: relative;
  width: 100%;
  height: 100%;
}
.hd-dialog .weui-mask {
  position: fixed;
  z-index: 1000;
  top: 0;
  right: 0;
  left: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.6);
}
.hd-dialog .weui-dialog {
  position: fixed;
  z-index: 5000;
  width: 80%;
  max-width: 600rpx;
  top: 50%;
  left: 50%;
  -webkit-transform: translate(-50%, -50%);
  transform: translate(-50%, -50%);
  background-color: #FFFFFF;
  text-align: center;
  border-radius: 6rpx;
  overflow: hidden;
}
.hd-dialog .weui-dialog__title {
  font-size: 36rpx;
  font-weight: bold;
}
.hd-dialog .weui-dialog__hd {
  padding: 1.3em 1.6em 0.5em;
}
.hd-dialog .weui-dialog__hd .ico {
  display: inline-block;
}
.hd-dialog .weui-dialog__hd .ico .img {
  width: 160rpx;
  height: 160rpx;
}
.hd-dialog .weui-dialog__bd {
  padding: 0 1.6em 0.8em;
  min-height: 80rpx;
  font-size: 30rpx;
  line-height: 1.5;
  word-wrap: break-word;
  word-break: break-all;
  color: #999;
}
.hd-dialog .weui-dialog__bd .txt {
  font-size: 30rpx;
}
.hd-dialog .weui-dialog__ft {
  position: relative;
  line-height: 96rpx;
  font-size: 32rpx;
  display: -webkit-box;
  display: -webkit-flex;
  display: flex;
}
.hd-dialog .weui-dialog__ft:after {
  content: " ";
  position: absolute;
  left: 0;
  top: 0;
  right: 0;
  height: 1px;
  border-top: 1px solid #ddd;
  -webkit-transform-origin: 0 0;
  transform-origin: 0 0;
  -webkit-transform: scaleY(0.5);
  transform: scaleY(0.5);
}
.hd-dialog .weui-dialog__btn {
  display: block;
  -webkit-box-flex: 1;
  -webkit-flex: 1;
  flex: 1;
  color: #0c7cdb;
  text-decoration: none;
  -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
  position: relative;
}
.hd-dialog .weui-dialog__btn + .weui-dialog__btn:after {
  content: " ";
  position: absolute;
  left: 0;
  top: 0;
  width: 1px;
  bottom: 0;
  border-left: 1px solid #ddd;
  -webkit-transform-origin: 0 0;
  transform-origin: 0 0;
  -webkit-transform: scaleX(0.5);
  transform: scaleX(0.5);
}
.hd-dialog .weui-dialog__btn_default {
  color: #353535;
}
.hd-dialog .weui-dialog__btn_primary {
  color: #0c7cdb;
}
```
如果控件的UI样式效果要和工程同步，即样式可以这样引用
```
@import "/app.wxss"
```
个人不提倡这种做法，自定义控件剥离出来，后面不同项目使用，不应该依赖于其他整体样式，一旦修改错误，自定义控件受到影响。

###step3

		组件UI效果图都有了，剩下就是业务逻辑js的控制。dialog.js是自定义组件的构造器，这里区别page界面，是用小程序的Component构造器时可以用来指定自定义组件的属性、数据、方法等。
下面通过注释解释一下构造器的属性使用：
```
Component({
  /**
   * 组件的属性列表
   * 用于组件自定义设置
   */
  properties: {
    // 弹窗标题
    title: {            // 属性名
      type: String,     // 类型（必填），目前接受的类型包括：String, Number, Boolean, Object, Array, null（表示任意类型）
      value: '标题'     // 属性初始值（可选），如果未指定则会根据类型选择一个
    },
    // 弹窗内容
    content: {
      type: String,
      value: '弹窗内容'
    },
    // 弹窗取消按钮文字
    cancelText: {
      type: String,
      value: '取消'
    },
    // 弹窗确认按钮文字
    confirmText: {
      type: String,
      value: '确定'
    }
  },

  /**
   * 私有数据,组件的初始数据
   * 可用于模版渲染
   */
  data: {
    // 弹窗显示控制
    isShow: false
  },

  /**
   * 组件的方法列表
   * 更新属性和数据的方法与更新页面数据的方法类似
   */
  methods: {
    /*
     * 公有方法
     */

    //隐藏弹框
    hideDialog() {
      this.setData({
        isShow: !this.data.isShow
      })
    },
    //展示弹框
    showDialog() {
      this.setData({
        isShow: !this.data.isShow
      })
    },
    /*
    * 内部私有方法建议以下划线开头
    * triggerEvent 用于触发事件
    */
    _cancelEvent() {
      //触发取消回调
      this.triggerEvent("cancelEvent")
    },
    _confirmEvent() {
      //触发成功回调
      this.triggerEvent("confirmEvent");
    }
  }
})
```
		看到这边可能疑问this.triggerEvent(“”)是什么，这边如果使用过vue就知道这个类似this.$emit(“”)组件的回调引用该控件的界面的方法，从而达到子组件调取父组件的方法。讲到这边肯定疑问到父组件要调取子组件方法怎么调取，这个后面有讲解。
###step4

		自定义组件已经定义完成后，如何使用该控件是最关键点上。首先，需要在使用的界面的.json里面中引入组件：
```
{
  "usingComponents": {
    "dialog": "/component/Dialog/dialog"
  }
}
```
然后.wxml中引入子组件，并增加自定义的一些值：
```
<view class="container">
  <dialog id='dialog' title='标题' content='内容：是否要学习自定义组件？' cancelText="取消" confirm='确定' bind:cancelEvent="_cancelEvent" bind:confirmEvent="_confirmEvent">
  </dialog>
  <button type="primary" bindtap="showDialog"> 点击对话框 </button>
</view>
```
在.js配置上，如下：
```
Page({

  /**
 * 生命周期函数--监听页面初次渲染完成
 */
  onReady: function () {
    //获得dialog组件
    this.dialog = this.selectComponent("#dialog");
  },

  showDialog(){
    this.dialog.showDialog();
  },

   //取消事件
  _cancelEvent(){
    console.log('你点击了取消');
    this.dialog.hideDialog();
  },
  //确认事件
  _confirmEvent(){
    console.log('你点击了确定');
    this.dialog.hideDialog();
  }

})
```
selectComponent(String) 使用选择器组件实例节点，返回匹配的第一个组件实例对象。

##总结
		上面自定义组件是官方提供自定义推荐，比较简单明了。还有其他自定义流程由于过于复杂，不直观，这里不介绍了。如果有兴趣，可以看自定义控件里面的wetoast，这两个不同风格。
&nbsp;&nbsp;&nbsp;&nbsp;github的Demo地址：==https://github.com/Chenjiabin09/WXComponents==
