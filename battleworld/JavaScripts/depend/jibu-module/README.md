# JiBu-Module

> 季布一诺 可堪千金

JiBu-Module (JModule) 是一个用于完善 Odin Module 的模块架构。

v31.1.0
by LviatYi  
thanks zewei.zhang

阅读该文档时，推荐安装以下字体：

- [JetBrainsMono Nerd Font Mono][JetbrainsMonoNerdFont]
- [Sarasa Mono SC][SarasaMonoSC]

若出现乱码，其为 Nerd Font 的特殊字符，不影响段落语义。

## Functional ⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠐⠒⠒⠒⠒⠚⠛⣿⡟⠄⠄⢠⠄⠄⠄⡄⠄⠄⣠⡶⠶⣶⠶⠶⠂⣠⣶⣶⠂⠄⣸⡿⠄⠄⢀⣿⠇⠄⣰⡿⣠⡾⠋⠄⣼⡟⠄⣠⡾⠋⣾⠏⠄⢰⣿⠁⠄⠄⣾⡏⠄⠠⠿⠿⠋⠠⠶⠶⠿⠶⠾⠋⠄⠽⠟⠄⠄⠄⠃⠄⠄⣼⣿⣤⡤⠤⠤⠤⠤⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄

它旨在提供如下便利：

- [x] **可堪千金** 避免了 ModuleService.ready 在多帧注册 Module 时 ready 不可靠的问题。
- [x] **白帝托孤** Ready 行为池，将紧迫的行为注册入 Ready 池，当 Ready 后保证执行。
- [x] **螳臂当车** 提供 JAC 反作弊，避免了基于事件机制的非 net_ 函数的反常规调用。

## Deficiency ⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠐⠒⠒⠒⠒⠚⠛⣿⡟⠄⠄⢠⠄⠄⠄⡄⠄⠄⣠⡶⠶⣶⠶⠶⠂⣠⣶⣶⠂⠄⣸⡿⠄⠄⢀⣿⠇⠄⣰⡿⣠⡾⠋⠄⣼⡟⠄⣠⡾⠋⣾⠏⠄⢰⣿⠁⠄⠄⣾⡏⠄⠠⠿⠿⠋⠠⠶⠶⠿⠶⠾⠋⠄⠽⠟⠄⠄⠄⠃⠄⠄⣼⣿⣤⡤⠤⠤⠤⠤⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄

然而它亦面临无法避免的难题：

- **安石变法** 需要适应新的 Module 架构，比如，不应重写 onStart 函数。

## Statement ⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠐⠒⠒⠒⠒⠚⠛⣿⡟⠄⠄⢠⠄⠄⠄⡄⠄⠄⣠⡶⠶⣶⠶⠶⠂⣠⣶⣶⠂⠄⣸⡿⠄⠄⢀⣿⠇⠄⣰⡿⣠⡾⠋⠄⣼⡟⠄⣠⡾⠋⣾⠏⠄⢰⣿⠁⠄⠄⣾⡏⠄⠠⠿⠿⠋⠠⠶⠶⠿⠶⠾⠋⠄⠽⠟⠄⠄⠄⠃⠄⠄⣼⣿⣤⡤⠤⠤⠤⠤⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄

鉴于 mw 以下特性特性：

- 在玩家首次打开游戏时，将整个项目工程文件发送给玩家客户端。
- 运行时主要逻辑由 ts 编译于 game.js。
- 运行时不会对 game.js 进行校验，因此运行的 game.js 可能是一份玩家修改过的 game.js。
  - 注：新版本的 mw 将会对 game.js 进行校验。但 game.js 「透明公开」依旧。

这种互联网开源精神使得 mw 的安全性可谓一丝不挂，赤身裸体，如法国某镇的夏日海滩一样值得赞美。

当然，这也可能会为开发者增添些许不必要的负担。比如，玩家只要轻松修改 game.js，就可以做出飞行、修改速度上限、打开 GM
等各种各样的作弊行为。

为了降低损失，开发者应遵守 **「仅服务端函数不扩散条约」(Server Only Non-Proliferation Treaty, SONPT)**。

SONPT 的原则如下：

### 启用 JAC 反作弊模块

在你的项目中引入 JModule，并在其中一个 Module 中启用 JAC 反作弊模块。

这可为开发者拒绝一切来自客户端的非 net_ 函数调用。

### 尽可能地避免 仅服务端 函数在客户端的直接或间接调用

如果引入了 JModule，你仅需关注 net_ 函数。请谨记 net_ 函数是不安全的，用户可以在任何时机调用它们。

对于仅服务端函数，如果通过属性同步或 net_ 函数间接调用，请施加校验。

### 谨慎对待双端函数

谨记任何双端函数都可以被客户端调用。如果想避免非预期的作弊，请为双端函数在服务端施加校验。

## Trick ⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠐⠒⠒⠒⠒⠚⠛⣿⡟⠄⠄⢠⠄⠄⠄⡄⠄⠄⣠⡶⠶⣶⠶⠶⠂⣠⣶⣶⠂⠄⣸⡿⠄⠄⢀⣿⠇⠄⣰⡿⣠⡾⠋⠄⣼⡟⠄⣠⡾⠋⣾⠏⠄⢰⣿⠁⠄⠄⣾⡏⠄⠠⠿⠿⠋⠠⠶⠶⠿⠶⠾⠋⠄⠽⠟⠄⠄⠄⠃⠄⠄⣼⣿⣤⡤⠤⠤⠤⠤⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄

如果需要在游戏中使用一些敏感数据，如对称加密使用的密钥，  
由于客户端也能拥有源代码，因此你无法将 **敏感数据** **硬编码** 在 **发布** 时的代码中。

但有一种方式可以避开：将敏感数据存储在 DataStorage 中。

注：DataStorage 的数据读取仅服务端可用。

1. 首先，在代码中使用特定的 key 存储敏感数据，随后发布第一个包，并运行之。

```typescript
let key = "SECRET_KEY";
let secret = 123456;
DataStorage.asyncSetData(key, secret);
...
useSecret(secret);
```

2. 删除代码中的敏感数据，更新第二个包。

```typescript
let key = "SECRET_KEY";
let secret: number;
DataStorage
    .asyncGetData(key)
    .then((data) => {
        secret = data.data as number;
    });
...
useSecret(secret);
```

也可以使用 Web 管理页面来设置它。

[JetbrainsMonoNerdFont]: https://github.com/ryanoasis/nerd-fonts/releases/download/v3.0.2/JetBrainsMono.zip@fallbackFont
[SarasaMonoSC]: https://github.com/be5invis/Sarasa-Gothic/releases/download/v0.41.6/sarasa-gothic-ttf-0.41.6.7z