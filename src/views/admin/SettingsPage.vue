<template>
  <div class="min-h-screen bg-gray-50 py-8">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <!-- 页面标题 -->
      <div class="mb-8">
        <h1 class="text-3xl font-bold text-gray-900">系统设置</h1>
        <p class="mt-2 text-gray-600">管理系统配置、安全设置和基础参数</p>
      </div>

      <div class="grid grid-cols-1 lg:grid-cols-4 gap-8">
        <!-- 侧边导航 -->
        <div class="lg:col-span-1">
          <nav class="space-y-1">
            <button
              v-for="tab in settingTabs"
              :key="tab.id"
              @click="activeTab = tab.id"
              :class="[
                'w-full text-left px-3 py-2 text-sm font-medium rounded-md flex items-center',
                activeTab === tab.id
                  ? 'bg-blue-100 text-blue-700'
                  : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
              ]"
            >
              <component :is="tab.icon" class="mr-3 h-5 w-5" />
              {{ tab.name }}
            </button>
          </nav>
        </div>

        <!-- 设置内容 -->
        <div class="lg:col-span-3">
          <!-- 基本设置 -->
          <div v-if="activeTab === 'basic'" class="bg-white shadow rounded-lg">
            <div class="px-6 py-4 border-b border-gray-200">
              <h3 class="text-lg font-medium text-gray-900">基本设置</h3>
              <p class="mt-1 text-sm text-gray-500">配置系统的基本信息和参数</p>
            </div>
            <div class="p-6 space-y-6">
              <div>
                <label class="block text-sm font-medium text-gray-700">系统名称</label>
                <input
                  type="text"
                  v-model="settings.basic.systemName"
                  class="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                />
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700">系统描述</label>
                <textarea
                  v-model="settings.basic.systemDescription"
                  rows="3"
                  class="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                ></textarea>
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700">联系邮箱</label>
                <input
                  type="email"
                  v-model="settings.basic.contactEmail"
                  class="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                />
              </div>
            </div>
          </div>

          <!-- 安全设置 -->
          <div v-if="activeTab === 'security'" class="bg-white shadow rounded-lg">
            <div class="px-6 py-4 border-b border-gray-200">
              <h3 class="text-lg font-medium text-gray-900">安全设置</h3>
              <p class="mt-1 text-sm text-gray-500">配置系统安全策略和访问控制</p>
            </div>
            <div class="p-6 space-y-6">
              <div class="flex items-center justify-between">
                <div>
                  <h4 class="text-sm font-medium text-gray-900">启用双因素认证</h4>
                  <p class="text-sm text-gray-500">为管理员账户启用额外的安全验证</p>
                </div>
                <button
                  @click="settings.security.twoFactorAuth = !settings.security.twoFactorAuth"
                  :class="[
                    'relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2',
                    settings.security.twoFactorAuth ? 'bg-blue-600' : 'bg-gray-200'
                  ]"
                >
                  <span
                    :class="[
                      'pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out',
                      settings.security.twoFactorAuth ? 'translate-x-5' : 'translate-x-0'
                    ]"
                  />
                </button>
              </div>
              
              <div>
                <label class="block text-sm font-medium text-gray-700">密码最小长度</label>
                <input
                  type="number"
                  v-model="settings.security.minPasswordLength"
                  min="6"
                  max="20"
                  class="mt-1 block w-32 border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                />
              </div>
              
              <div>
                <label class="block text-sm font-medium text-gray-700">会话超时时间（分钟）</label>
                <input
                  type="number"
                  v-model="settings.security.sessionTimeout"
                  min="15"
                  max="480"
                  class="mt-1 block w-32 border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                />
              </div>
            </div>
          </div>

          <!-- 通知设置 -->
          <div v-if="activeTab === 'notifications'" class="bg-white shadow rounded-lg">
            <div class="px-6 py-4 border-b border-gray-200">
              <h3 class="text-lg font-medium text-gray-900">通知设置</h3>
              <p class="mt-1 text-sm text-gray-500">配置系统通知和消息推送</p>
            </div>
            <div class="p-6 space-y-6">
              <div class="space-y-4">
                <div class="flex items-center justify-between">
                  <div>
                    <h4 class="text-sm font-medium text-gray-900">邮件通知</h4>
                    <p class="text-sm text-gray-500">接收重要系统事件的邮件通知</p>
                  </div>
                  <button
                    @click="settings.notifications.email = !settings.notifications.email"
                    :class="[
                      'relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2',
                      settings.notifications.email ? 'bg-blue-600' : 'bg-gray-200'
                    ]"
                  >
                    <span
                      :class="[
                        'pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out',
                        settings.notifications.email ? 'translate-x-5' : 'translate-x-0'
                      ]"
                    />
                  </button>
                </div>
                
                <div class="flex items-center justify-between">
                  <div>
                    <h4 class="text-sm font-medium text-gray-900">短信通知</h4>
                    <p class="text-sm text-gray-500">接收紧急事件的短信通知</p>
                  </div>
                  <button
                    @click="settings.notifications.sms = !settings.notifications.sms"
                    :class="[
                      'relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2',
                      settings.notifications.sms ? 'bg-blue-600' : 'bg-gray-200'
                    ]"
                  >
                    <span
                      :class="[
                        'pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out',
                        settings.notifications.sms ? 'translate-x-5' : 'translate-x-0'
                      ]"
                    />
                  </button>
                </div>
                
                <div class="flex items-center justify-between">
                  <div>
                    <h4 class="text-sm font-medium text-gray-900">浏览器推送</h4>
                    <p class="text-sm text-gray-500">在浏览器中显示推送通知</p>
                  </div>
                  <button
                    @click="settings.notifications.push = !settings.notifications.push"
                    :class="[
                      'relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2',
                      settings.notifications.push ? 'bg-blue-600' : 'bg-gray-200'
                    ]"
                  >
                    <span
                      :class="[
                        'pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out',
                        settings.notifications.push ? 'translate-x-5' : 'translate-x-0'
                      ]"
                    />
                  </button>
                </div>
              </div>
            </div>
          </div>

          <!-- 系统维护 -->
          <div v-if="activeTab === 'maintenance'" class="bg-white shadow rounded-lg">
            <div class="px-6 py-4 border-b border-gray-200">
              <h3 class="text-lg font-medium text-gray-900">系统维护</h3>
              <p class="mt-1 text-sm text-gray-500">系统备份、清理和维护操作</p>
            </div>
            <div class="p-6 space-y-6">
              <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div class="border border-gray-200 rounded-lg p-4">
                  <h4 class="text-sm font-medium text-gray-900 mb-2">数据备份</h4>
                  <p class="text-sm text-gray-500 mb-4">创建系统数据的完整备份</p>
                  <button class="w-full bg-blue-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-blue-700">
                    立即备份
                  </button>
                </div>
                
                <div class="border border-gray-200 rounded-lg p-4">
                  <h4 class="text-sm font-medium text-gray-900 mb-2">清理缓存</h4>
                  <p class="text-sm text-gray-500 mb-4">清理系统缓存和临时文件</p>
                  <button class="w-full bg-orange-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-orange-700">
                    清理缓存
                  </button>
                </div>
                
                <div class="border border-gray-200 rounded-lg p-4">
                  <h4 class="text-sm font-medium text-gray-900 mb-2">系统日志</h4>
                  <p class="text-sm text-gray-500 mb-4">查看和下载系统运行日志</p>
                  <button class="w-full bg-gray-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-gray-700">
                    查看日志
                  </button>
                </div>
                
                <div class="border border-red-200 rounded-lg p-4">
                  <h4 class="text-sm font-medium text-red-900 mb-2">重置系统</h4>
                  <p class="text-sm text-red-600 mb-4">重置系统到初始状态（危险操作）</p>
                  <button class="w-full bg-red-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-red-700">
                    重置系统
                  </button>
                </div>
              </div>
            </div>
          </div>

          <!-- 保存按钮 -->
          <div class="mt-8 flex justify-end">
            <button
              @click="saveSettings"
              class="bg-blue-600 text-white px-6 py-2 rounded-md text-sm font-medium hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              保存设置
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { Settings, Shield, Bell, Wrench } from 'lucide-vue-next'

interface SettingsData {
  basic: {
    systemName: string
    systemDescription: string
    contactEmail: string
  }
  security: {
    twoFactorAuth: boolean
    minPasswordLength: number
    sessionTimeout: number
  }
  notifications: {
    email: boolean
    sms: boolean
    push: boolean
  }
}

const activeTab = ref('basic')

const settingTabs = [
  { id: 'basic', name: '基本设置', icon: Settings },
  { id: 'security', name: '安全设置', icon: Shield },
  { id: 'notifications', name: '通知设置', icon: Bell },
  { id: 'maintenance', name: '系统维护', icon: Wrench }
]

const settings = ref<SettingsData>({
  basic: {
    systemName: '万里书院管理系统',
    systemDescription: '专业的在线教育管理平台，提供课程管理、学员管理、门店管理等功能。',
    contactEmail: 'admin@wanli-academy.com'
  },
  security: {
    twoFactorAuth: true,
    minPasswordLength: 8,
    sessionTimeout: 120
  },
  notifications: {
    email: true,
    sms: false,
    push: true
  }
})

const saveSettings = () => {
  // 这里可以保存设置到后端
  console.log('保存设置:', settings.value)
  // 显示成功提示
  alert('设置已保存')
}

onMounted(() => {
  // 这里可以加载设置数据
})
</script>