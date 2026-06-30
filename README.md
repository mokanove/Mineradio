![不知名迪克](https://raw.githubusercontent.com/mokanove/Mineradio/refs/heads/main/build/icon.png)
# Mineradio
Forked from <https://github.com/XxHuberrr/Mineradio>

Mineradio 是一款 Windows 桌面沉浸式音乐播放器，把天气电台、搜索播放、歌词舞台、粒子视觉和 3D 歌单架组合成一个更接近现场感的私人音乐空间。

此修改版在原版的基础上更新了依赖并加入了对macOS和Linux的支持 同时使用Vulkan图形API 需注意Apple这个废物不支持Vulkan 所以用了ANGEL转metal

如果你的设备不支持Vulkan请转到desktop/main.js的第61～71行 取消注释和删除`if`行并重新编译即可
## ↓ 下载
[GitHub Release](https://github.com/mokanove/Mineradio/releases)
## 🚀 核心特性
- Open-Meteo 天气电台，根据当前位置、城市和天气 mood 生成更合适的播放队列
- 首页包含天气电台、每日推荐、私人电台、继续听、听歌画像和我的歌单入口
- Wallpaper 银河首页背景，未播放状态保持干净的星河氛围
- 播放后切换到 Emily / 默认播放态视觉，歌词舞台与粒子舞台同步工作
- 基于节奏的电影镜头视觉系统
- 面向长播客和 DJ 曲目的专属视觉模式
- 歌词舞台、自定义歌词、歌词位置与视觉控制
- 自定义专辑封面上传与裁剪
- 右键唤起 3D 歌单架，支持歌单队列浏览
- 网易云音乐账号、搜索、歌单、播客等体验接入
- QQ 音乐搜索、登录态与音源补充接入
- GitHub Releases 更新检测与下载入口
- 首次启动内置「默认测试」视觉用户存档，软件内默认视觉参数与该存档一致
## 🛠 开发和自编译

确保你已经有了pnpm nodejs和一个可以轻松连接GitHub的网络
```
git clone https://github.com/mokanove/Mineradio.git
cd Mineradio
pnpm install
```
运行一个Web测试版
```
pnpm dev
```
编译 对于Windows和macOS

这里Windows只有amd64 macOS只有arm64 以保证主流平台兼容 如果你是小众平台可以自行修改package.json
```
pnpm build:windows/macos
```
编译 对于Linux
```
pnpm build:linux:AppImage # 还支持pacman,rpm,deb 只需要把AppImage替换即可
```
对于打包维护者 可能需要输出纯文件而不是已经封装好的安装包 可以使用下列命令
```
pnpm build:原系统:原包格式:dir
```
### ⚠️ 警告
这两个依赖归属于NeteaseCloudMusicApi 但他已经在两年前就停止维护了
```
overrides:
  music-metadata: ">=11.12.2"
  file-type: ">=21.3.1"
```
这个也停止维护了 用于windows打包
```
"rcedit": "^5.0.2"
```
这四个依赖属于electron-builder的一部分 他们随electron-builder一起更新
```
boolean@3.2.0, glob@7.2.3, inflight@1.0.6, rimraf@2.6.3
```
同时还将能更新的依赖更新至最新版本 其他一切行为均与原版无异 可以参照原版项目的文档
## 🙏 致谢
由`MoKanove`二次开发

Mineradio 由 [XxHuberrr](https://github.com/XxHuberrr) 主要设计与打造。emily 作为早期视觉底层想法与 `emily` 视觉预设改进方向的共创者和灵感来源之一，特此感谢。

同时感谢小天才e宝、应春日、锋将军、軌跡、林中、骊、风痕、花椰菜🥦在早期体验、测试反馈和发布准备中的帮助。
## ⚖️ 条款、许可和法律、版权声明
### 第三方音乐平台说明

Mineradio 不是网易云音乐、QQ 音乐或腾讯音乐娱乐集团的官方客户端，也不隶属于任何音乐平台。

项目中的第三方平台接入仅用于个人学习、本地客户端体验和用户自有账号的播放辅助。请遵守对应平台的用户协议、版权规则和会员权益规则。项目不会提供绕过付费、绕过会员、破解音质或重新分发音乐内容的能力。

### 用户数据与隐私

登录 Cookie、搜索历史、自定义封面、自定义歌词、节奏分析缓存等数据只应保存在本机用户数据目录或浏览器本地存储中，不应提交到仓库。

更多说明见 [PRIVACY.md](https://github.com/XxHuberrr/Mineradio/blob/main/PRIVACY.md)

### 版权与授权

Copyright (C) 2026 MoKanove

本项目采用 GPL-3.0 授权。详见 [LICENSE](https://github.com/XxHuberrr/Mineradio/blob/main/LICENSE)

原作者为[XxHuberrr](https://github.com/XxHuberrr)

MR Logo、Mineradio 名称、界面视觉设计与原创视觉表达归作者所有；第三方依赖和第三方服务分别遵循其各自授权与服务条款。