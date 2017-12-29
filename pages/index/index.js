Page({
  /**
 * 生命周期函数--监听页面初次渲染完成
 */
  onReady: function () {
    //获得组件
    this.dialog = this.selectComponent("#dialog");
    this.toast =this.selectComponent("#toast");
  },

  showDialog() {
    this.dialog.showDialog();
  },

  //取消事件
  _cancelEvent() {
    this.dialog.hideDialog();
    this.toast.show('点击事件--取消')
  },
  //确认事件
  _confirmEvent() {
    this.dialog.hideDialog();
    this.toast.show('点击事件--确定')
  }

})