<script setup lang='ts'>
import { ref } from 'vue'

// 定义标签页
const tabs = [
  { id: 'personal-info', name: '个人信息' },
  { id: 'account-settings', name: '账号设置' },
  { id: 'address-management', name: '收货地址管理' },
]

// 当前激活的标签
const activeTab = ref('personal-info')

// 切换标签
function switchTab(tabId: string) {
  activeTab.value = tabId
}
</script>

<template>
  <section>
    <div class="mx-auto px-4 py-8 max-w-7xl lg:px-8 sm:px-6 sm:py-12">
      <div class="flex flex-col gap-8 md:flex-row">
        <!-- 左侧标签栏 -->
        <div class="w-full md:w-1/4">
          <div class="p-4 rounded-lg bg-white shadow dark:bg-gray-800">
            <h2 class="text-xl font-bold mb-4">
              我的账户
            </h2>
            <ul class="space-y-2">
              <li v-for="tab in tabs" :key="tab.id">
                <button
                  class="px-4 py-2 text-left rounded-md w-full transition-colors"
                  :class="{
                    'bg-primary text-white': activeTab === tab.id,
                    'hover:bg-gray-100 dark:hover:bg-gray-700': activeTab !== tab.id,
                  }"
                  @click="switchTab(tab.id)"
                >
                  {{ tab.name }}
                </button>
              </li>
            </ul>
          </div>
        </div>

        <!-- 右侧内容区 -->
        <div class="w-full md:w-3/4">
          <div class="p-6 rounded-lg bg-white shadow dark:bg-gray-800">
            <!-- 个人信息标签页 -->
            <div v-if="activeTab === 'personal-info'">
              <h3 class="text-xl font-bold mb-6">
                个人信息
              </h3>
              <div class="space-y-6">
                <form class="max-w-2xl" @submit.prevent>
                  <div class="gap-6 grid grid-cols-1 md:grid-cols-2">
                    <!-- 头像上传 -->
                    <div class="flex flex-col items-center md:col-span-2 md:items-start">
                      <div class="mb-2">
                        头像
                      </div>
                      <div class="flex gap-4 items-center">
                        <div class="rounded-full bg-gray-200 h-24 w-24 overflow-hidden dark:bg-gray-700">
                          <img src="https://via.placeholder.com/150" alt="用户头像" class="h-full w-full object-cover">
                        </div>
                        <button class="text-white px-4 py-2 rounded-md bg-blue-600 transition hover:bg-blue-700">
                          更换头像
                        </button>
                      </div>
                    </div>

                    <!-- 姓名 -->
                    <div>
                      <label class="text-sm font-medium mb-2 block">姓名</label>
                      <input
                        type="text"
                        class="px-4 py-2 border rounded-md w-full focus:outline-none dark:border-gray-600 dark:bg-gray-700 focus:ring-2 focus:ring-blue-500"
                        placeholder="请输入姓名"
                      >
                    </div>

                    <!-- 昵称 -->
                    <div>
                      <label class="text-sm font-medium mb-2 block">昵称</label>
                      <input
                        type="text"
                        class="px-4 py-2 border rounded-md w-full focus:outline-none dark:border-gray-600 dark:bg-gray-700 focus:ring-2 focus:ring-blue-500"
                        placeholder="请输入昵称"
                      >
                    </div>

                    <!-- 电子邮箱 -->
                    <div>
                      <label class="text-sm font-medium mb-2 block">电子邮箱</label>
                      <input
                        type="email"
                        class="px-4 py-2 border rounded-md w-full focus:outline-none dark:border-gray-600 dark:bg-gray-700 focus:ring-2 focus:ring-blue-500"
                        placeholder="请输入电子邮箱"
                      >
                    </div>

                    <!-- 手机号码 -->
                    <div>
                      <label class="text-sm font-medium mb-2 block">手机号码</label>
                      <input
                        type="tel"
                        class="px-4 py-2 border rounded-md w-full focus:outline-none dark:border-gray-600 dark:bg-gray-700 focus:ring-2 focus:ring-blue-500"
                        placeholder="请输入手机号码"
                      >
                    </div>

                    <!-- 性别 -->
                    <div>
                      <label class="text-sm font-medium mb-2 block">性别</label>
                      <div class="flex gap-4">
                        <label class="flex items-center">
                          <input type="radio" name="gender" class="mr-2">
                          <span>男</span>
                        </label>
                        <label class="flex items-center">
                          <input type="radio" name="gender" class="mr-2">
                          <span>女</span>
                        </label>
                        <label class="flex items-center">
                          <input type="radio" name="gender" class="mr-2">
                          <span>保密</span>
                        </label>
                      </div>
                    </div>

                    <!-- 生日 -->
                    <div>
                      <label class="text-sm font-medium mb-2 block">生日</label>
                      <input
                        type="date"
                        class="px-4 py-2 border rounded-md w-full focus:outline-none dark:border-gray-600 dark:bg-gray-700 focus:ring-2 focus:ring-blue-500"
                      >
                    </div>

                    <!-- 保存按钮 -->
                    <div class="mt-4 md:col-span-2">
                      <button class="text-white px-6 py-2 rounded-md bg-blue-600 transition hover:bg-blue-700">
                        保存修改
                      </button>
                    </div>
                  </div>
                </form>
              </div>
            </div>

            <!-- 账号设置标签页 -->
            <div v-else-if="activeTab === 'account-settings'">
              <h3 class="text-xl font-bold mb-6">
                账号设置
              </h3>
              <div class="space-y-8">
                <!-- 修改密码 -->
                <div class="pb-6 border-b dark:border-gray-700">
                  <h4 class="text-lg font-medium mb-4">
                    修改密码
                  </h4>
                  <form class="max-w-md" @submit.prevent>
                    <div class="space-y-4">
                      <div>
                        <label class="text-sm font-medium mb-2 block">当前密码</label>
                        <input
                          type="password"
                          class="px-4 py-2 border rounded-md w-full focus:outline-none dark:border-gray-600 dark:bg-gray-700 focus:ring-2 focus:ring-blue-500"
                          placeholder="请输入当前密码"
                        >
                      </div>
                      <div>
                        <label class="text-sm font-medium mb-2 block">新密码</label>
                        <input
                          type="password"
                          class="px-4 py-2 border rounded-md w-full focus:outline-none dark:border-gray-600 dark:bg-gray-700 focus:ring-2 focus:ring-blue-500"
                          placeholder="请输入新密码"
                        >
                      </div>
                      <div>
                        <label class="text-sm font-medium mb-2 block">确认新密码</label>
                        <input
                          type="password"
                          class="px-4 py-2 border rounded-md w-full focus:outline-none dark:border-gray-600 dark:bg-gray-700 focus:ring-2 focus:ring-blue-500"
                          placeholder="请再次输入新密码"
                        >
                      </div>
                      <div class="pt-2">
                        <button class="text-white px-6 py-2 rounded-md bg-blue-600 transition hover:bg-blue-700">
                          更新密码
                        </button>
                      </div>
                    </div>
                  </form>
                </div>

                <!-- 通知设置 -->
                <div class="pb-6 border-b dark:border-gray-700">
                  <h4 class="text-lg font-medium mb-4">
                    通知设置
                  </h4>
                  <div class="space-y-3">
                    <div class="flex items-center justify-between">
                      <div>
                        <p class="font-medium">
                          订单状态更新
                        </p>
                        <p class="text-sm text-gray-500 dark:text-gray-400">
                          接收订单状态变更的通知
                        </p>
                      </div>
                      <label class="inline-flex cursor-pointer items-center relative">
                        <input type="checkbox" class="peer sr-only" checked>
                        <div class="peer rounded-full bg-gray-200 h-6 w-11 peer-focus:outline-none after:border after:border-gray-300 dark:border-gray-600 after:rounded-full after:bg-white dark:bg-gray-700 peer-checked:bg-blue-600 after:h-5 after:w-5 after:content-[''] peer-focus:ring-4 peer-focus:ring-blue-300 after:transition-all after:left-[2px] after:top-[2px] after:absolute peer-checked:after:border-white dark:peer-focus:ring-blue-800 peer-checked:after:translate-x-full" />
                      </label>
                    </div>
                    <div class="flex items-center justify-between">
                      <div>
                        <p class="font-medium">
                          促销活动
                        </p>
                        <p class="text-sm text-gray-500 dark:text-gray-400">
                          接收促销和折扣信息
                        </p>
                      </div>
                      <label class="inline-flex cursor-pointer items-center relative">
                        <input type="checkbox" class="peer sr-only">
                        <div class="peer rounded-full bg-gray-200 h-6 w-11 peer-focus:outline-none after:border after:border-gray-300 dark:border-gray-600 after:rounded-full after:bg-white dark:bg-gray-700 peer-checked:bg-blue-600 after:h-5 after:w-5 after:content-[''] peer-focus:ring-4 peer-focus:ring-blue-300 after:transition-all after:left-[2px] after:top-[2px] after:absolute peer-checked:after:border-white dark:peer-focus:ring-blue-800 peer-checked:after:translate-x-full" />
                      </label>
                    </div>
                    <div class="flex items-center justify-between">
                      <div>
                        <p class="font-medium">
                          系统通知
                        </p>
                        <p class="text-sm text-gray-500 dark:text-gray-400">
                          接收系统更新和安全提醒
                        </p>
                      </div>
                      <label class="inline-flex cursor-pointer items-center relative">
                        <input type="checkbox" class="peer sr-only" checked>
                        <div class="peer rounded-full bg-gray-200 h-6 w-11 peer-focus:outline-none after:border after:border-gray-300 dark:border-gray-600 after:rounded-full after:bg-white dark:bg-gray-700 peer-checked:bg-blue-600 after:h-5 after:w-5 after:content-[''] peer-focus:ring-4 peer-focus:ring-blue-300 after:transition-all after:left-[2px] after:top-[2px] after:absolute peer-checked:after:border-white dark:peer-focus:ring-blue-800 peer-checked:after:translate-x-full" />
                      </label>
                    </div>
                  </div>
                </div>

                <!-- 账号安全 -->
                <div>
                  <h4 class="text-lg font-medium mb-4">
                    账号安全
                  </h4>
                  <div class="space-y-4">
                    <div class="p-4 border rounded-md flex items-center justify-between dark:border-gray-700">
                      <div>
                        <p class="font-medium">
                          双因素认证
                        </p>
                        <p class="text-sm text-gray-500 dark:text-gray-400">
                          增强账号安全性
                        </p>
                      </div>
                      <button class="text-white px-4 py-2 rounded-md bg-blue-600 transition hover:bg-blue-700">
                        启用
                      </button>
                    </div>
                    <div class="p-4 border rounded-md flex items-center justify-between dark:border-gray-700">
                      <div>
                        <p class="font-medium">
                          登录设备管理
                        </p>
                        <p class="text-sm text-gray-500 dark:text-gray-400">
                          查看和管理已登录设备
                        </p>
                      </div>
                      <button class="px-4 py-2 border border-gray-300 rounded-md transition dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-700">
                        查看
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <!-- 收货地址管理标签页 -->
            <div v-else-if="activeTab === 'address-management'">
              <div class="mb-6 flex items-center justify-between">
                <h3 class="text-xl font-bold">
                  收货地址管理
                </h3>
                <button class="text-white px-4 py-2 rounded-md bg-blue-600 flex transition items-center hover:bg-blue-700">
                  <span class="mr-1">+</span> 添加新地址
                </button>
              </div>

              <div class="space-y-4">
                <!-- 地址卡片 -->
                <div class="p-4 border rounded-lg dark:border-gray-700">
                  <div class="mb-2 flex justify-between">
                    <div class="flex items-center">
                      <span class="font-medium mr-2">张三</span>
                      <span class="text-sm text-gray-500">13800138000</span>
                    </div>
                    <div>
                      <span class="text-xs text-blue-800 px-2 py-1 rounded-md bg-blue-100 dark:text-blue-200 dark:bg-blue-900">默认</span>
                    </div>
                  </div>
                  <p class="text-gray-700 mb-3 dark:text-gray-300">
                    上海市浦东新区张江高科技园区博云路2号浦软大厦9楼
                  </p>
                  <div class="flex justify-end space-x-2">
                    <button class="text-sm px-3 py-1 border border-gray-300 rounded transition dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-700">
                      编辑
                    </button>
                    <button class="text-sm px-3 py-1 border border-gray-300 rounded transition dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-700">
                      删除
                    </button>
                  </div>
                </div>

                <div class="p-4 border rounded-lg dark:border-gray-700">
                  <div class="mb-2 flex justify-between">
                    <div class="flex items-center">
                      <span class="font-medium mr-2">李四</span>
                      <span class="text-sm text-gray-500">13900139000</span>
                    </div>
                  </div>
                  <p class="text-gray-700 mb-3 dark:text-gray-300">
                    北京市朝阳区建国路88号现代城5号楼2单元801
                  </p>
                  <div class="flex justify-end space-x-2">
                    <button class="text-sm px-3 py-1 border border-gray-300 rounded transition dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-700">
                      设为默认
                    </button>
                    <button class="text-sm px-3 py-1 border border-gray-300 rounded transition dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-700">
                      编辑
                    </button>
                    <button class="text-sm px-3 py-1 border border-gray-300 rounded transition dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-700">
                      删除
                    </button>
                  </div>
                </div>

                <!-- 地址表单（默认隐藏，点击添加或编辑时显示） -->
                <div class="mt-6 p-6 border rounded-lg dark:border-gray-700">
                  <h4 class="text-lg font-medium mb-4">
                    添加新地址
                  </h4>
                  <form class="gap-4 grid grid-cols-1 md:grid-cols-2" @submit.prevent>
                    <div>
                      <label class="text-sm font-medium mb-2 block">收货人</label>
                      <input
                        type="text"
                        class="px-4 py-2 border rounded-md w-full focus:outline-none dark:border-gray-600 dark:bg-gray-700 focus:ring-2 focus:ring-blue-500"
                        placeholder="请输入收货人姓名"
                      >
                    </div>
                    <div>
                      <label class="text-sm font-medium mb-2 block">手机号码</label>
                      <input
                        type="tel"
                        class="px-4 py-2 border rounded-md w-full focus:outline-none dark:border-gray-600 dark:bg-gray-700 focus:ring-2 focus:ring-blue-500"
                        placeholder="请输入手机号码"
                      >
                    </div>
                    <div class="md:col-span-2">
                      <label class="text-sm font-medium mb-2 block">所在地区</label>
                      <div class="flex gap-2">
                        <select class="px-4 py-2 border rounded-md w-1/3 focus:outline-none dark:border-gray-600 dark:bg-gray-700 focus:ring-2 focus:ring-blue-500">
                          <option>请选择省份</option>
                          <option>北京市</option>
                          <option>上海市</option>
                          <!-- 其他省份选项 -->
                        </select>
                        <select class="px-4 py-2 border rounded-md w-1/3 focus:outline-none dark:border-gray-600 dark:bg-gray-700 focus:ring-2 focus:ring-blue-500">
                          <option>请选择城市</option>
                          <!-- 城市选项 -->
                        </select>
                        <select class="px-4 py-2 border rounded-md w-1/3 focus:outline-none dark:border-gray-600 dark:bg-gray-700 focus:ring-2 focus:ring-blue-500">
                          <option>请选择区县</option>
                          <!-- 区县选项 -->
                        </select>
                      </div>
                    </div>
                    <div class="md:col-span-2">
                      <label class="text-sm font-medium mb-2 block">详细地址</label>
                      <input
                        type="text"
                        class="px-4 py-2 border rounded-md w-full focus:outline-none dark:border-gray-600 dark:bg-gray-700 focus:ring-2 focus:ring-blue-500"
                        placeholder="请输入详细地址，如街道、门牌号等"
                      >
                    </div>
                    <div class="md:col-span-2">
                      <label class="flex items-center">
                        <input type="checkbox" class="mr-2">
                        <span>设为默认收货地址</span>
                      </label>
                    </div>
                    <div class="mt-2 flex gap-4 md:col-span-2">
                      <button class="text-white px-6 py-2 rounded-md bg-blue-600 transition hover:bg-blue-700">
                        保存
                      </button>
                      <button class="px-6 py-2 border border-gray-300 rounded-md transition dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-700">
                        取消
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.bg-primary {
  @apply bg-blue-600;
}
</style>
