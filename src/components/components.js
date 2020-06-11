import Vue from "vue"
//底部的标签栏组件
import Tabbar from "./Tabbar/Tabbar"
import TabbarItem from './Tabbar/TabbarItem'
//头部的导航栏组件
import NavBar from './Navbar/Navbar'
//消息列表组件
import MessageItem from './MessageItem/MessageItem'
//通讯录列表组件
import AddressBookItem from './AddressBookItem/AddressBookItem'
// 我的列表组件
import MyItem from './MyItem/MyItem'
//进度条
import ProgressBar from './ProgressBar/ProgressBar'
//图片组件
import MyImage from './MyImage/MyImage'
// input:text的组件
import InputText from './InputText/InputText'
// input:button的组件
import InputButton from './InputButton/InputButton'
// 上传图片组件
import uploadImg from './uploadImg/uploadImg'
// item组件
import Item from './Item/Item'

let components = [
  Tabbar,
  TabbarItem,
  NavBar,
  MessageItem,
  AddressBookItem,
  MyItem,
  ProgressBar,
  MyImage,
  InputText,
  InputButton,
  uploadImg,
  Item,
]

export default {
  install(Vue) {
    components.forEach(UI => {
      Vue.component(UI.name, UI)
    })
  }
}