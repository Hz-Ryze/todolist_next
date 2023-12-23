
## Description

[interview-todoList 技术评测](https://github.com/stark-tech-space/interview-todoList/blob/master/README_v2.md)  

> 因为是技术评测，所以本项目是以快速实现为标准的，所以并未过多的考虑可靠性、可扩展性和可维护性。

## 需求分析及理解
- 注册／登入
- 可以多人共享任务的团队
  - 项目中内置2个团队，G1团队加入成员【A,B,C,D】，G2团队加入成员【D,E,F】,这里就不做团队的增删改查管理了
  - 举例：
    - 1.商品搜索
      - 1.1 商品排序
        - 1.1.1 商品价格排序
        - 1.1.2 商品类别排序
  - 比如，如果只共享1.1任务，那么其他人只看到1.1 ，那么因为任务表述不清，可能会认为是店铺商品排序，就会理解错需求
  - 所以，如果共享1.1任务，那么1，1.1，1.1.1，1.1.2整个任务链都应该被共享出
  - 即：考虑到真实场景下，团队内任意一人【负责】的任务，团队内其他人都会被共享整个任务链内的所有任务。

- 任务增删改查
  - 任务建立后可以指派执行人及关注人
    - 执行人和关注人都可以指派多个
  - 登入的用户需要可以看见自己的任务、被指派给自己执行的任务、自己有在关注的任务
  - 任务的子任务，子任务与任务结构相同，子任务完成后自动完成主任务
- 显示任务历史纪录
  - 可以新增评论在历史纪录中
- 内容筛选（时间段、创建人、任务人）
  - 技术评测这里就不做分页了
  - 如果父级任务不符合，那么对应的子级任务也不会显示
- 支持排序（创建时间、计划完成时间、创建者、ID）
  - 优先按照父级任务的排序显示
---
- 实现消息提醒任务即将到期
```
1. 创建单独的消息提醒表，必要字段：提醒时间，消息内容。
2. 需要提醒的消息都添加到该表中
3. 单独创建进程或者独立工程，根据提醒时间增序来查询两次
   1. 先查询提醒时间》当前时间的第一条数据，然后设置一个定时器，到时提醒，提醒完则删除本条消息
   2. 再查询提醒时间《当前时间的所有数据，这些为已过期但未提醒的消息，进行对应的业务处理
4. 修改或者删除定时任务时，则正常删除或者修改对应数据即可。
```
- 定时重复任务
```
1. 创建单独的消息重复提醒表，必要字段：提醒时间，间隔时间，消息内容，重复次数:N次、无数次
2. 需要提醒的消息都添加到该表中
   1. 在添加数据时，先计算好第一次的提醒时间填入到提醒时间字段。例如：每周一上午10点提醒，则计算下一个周一上午10点的对应毫秒时间，填入到提醒时间内
   2. 则间隔时间为7天，填入对应毫秒时间：7*24*60*60*1000
   3. 重复无数次则填入-1，
3.  单独创建进程或者独立工程，根据提醒时间增序来查询两次
   1. 先查询提醒时间》当前时间的第一条数据，然后设置一个定时器，到时提醒，提醒完则修改本条消息
      1. 重复N次，改为重复N-1次，如果N-1=0,则删除该条数据
      2. 提醒时间修改为 提醒时间+间隔时间
   2. 再查询提醒时间《当前时间的所有数据，这些为已过期但未提醒的消息
      1. 计算 （当前时间的时间间隔-提醒时间）/间隔时间 ，然后除以间隔时间，得出未提醒的消息，截止到当前，应该被提醒M次，
         1. 如果N-M》0，则修改提醒时间为下一次的提醒时间，重复次数为N-M次
         2. 如果N-M《=0，则删除该数据
4. 修改或者删除定时任务时，则正常删除或者修改对应数据即可。

```

## 组件分析
1. 筛选关联组件
2. 用户列表组件，用于添加负责人，筛选等
3. listItem

## 数据分析
1. 用户数据 
   2. 手机号
   3. 密码
   4. 昵称
   5. 所属团队
2. 团队数据
   1. UUID
   2. 团队名称
3. 任务数据
   1. UUID
   2. 任务标题
   3. 负责人[]
      1. 多人 
   4. 详细描述
      1. 支持markdown语法 
   5. 子任务[]
      1. 要支持无限分级
   6. 评论[]
      1. 评论时间
      2. 评论内容
   7. 关注人[]
      1. 多人-结构同负责人
   8. 创建时间
   9.  截止时间
   10. 更新时间


## 技术点说明
1. 数据库选用：mongoDB ，采用mongoose库
2. 前端使用：create react app脚手架创建React项目，UI组件使用：ant design
3. 因为是demo,所以
   1. 密码将不采用MD5或者RSA加密
   2. 接口不再进行使用protobuf序列化
   3. 不再上报并存储全局错误，而是通过接口下发示意
   4. 不再进行请求上报，防抖和节流等
   5. 不添加任何APM监控 
   6. 采用header中添加用户手机号来取代JWT授权

 
## 部署说明
1. 采用前后端分离的方式开发和部署
2. 后端通过 docker 部署，端口3000
3. 前端build后，通过docker nginx 部署
4. nginx 配置文件示意，见 [nginx.conf](./nginx.conf) 


## 演示说明
```markdown
已创建13300000001 ~ 13300000007 七个用户，密码都是123456
其中分为两个团队，开发1队和开发2队，
1,2在开发1队，
3,4在开发2队，
5 在开发1队也在开发2队，
6，7 不属于任何开发团队，

13300000001用户已创建部分任务 
```