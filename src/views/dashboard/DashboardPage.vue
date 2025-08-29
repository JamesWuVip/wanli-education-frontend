<template>
  <AppLayout
    :page-title="pageTitle"
    :page-description="pageDescription"
    :breadcrumb-items="breadcrumbItems"
  >
    <template #page-actions>
      <AppButton
        variant="outline"
        size="medium"
        @click="refreshData"
      >
        <RefreshCwIcon class="w-4 h-4 mr-2" />
        刷新数据
      </AppButton>
      <AppButton
        variant="solid"
        size="medium"
        @click="$router.push('/courses/create')"
      >
        <PlusIcon class="w-4 h-4 mr-2" />
        创建课程
      </AppButton>
    </template>

    <!-- 统计卡片 -->
    <div class="stats-grid">
      <AppCard
        v-for="stat in stats"
        :key="stat.key"
        class="stat-card"
        :class="stat.colorClass"
      >
        <div class="stat-content">
          <div class="stat-icon">
            <component :is="stat.icon" class="w-6 h-6" />
          </div>
          <div class="stat-info">
            <div class="stat-value">{{ stat.value }}</div>
            <div class="stat-label">{{ stat.label }}</div>
          </div>
          <div class="stat-change" :class="stat.changeClass">
            <component :is="stat.changeIcon" class="w-4 h-4" />
            <span>{{ stat.change }}</span>
          </div>
        </div>
      </AppCard>
    </div>

    <!-- 图表和数据展示 -->
    <div class="dashboard-content">
      <!-- 课程统计图表 -->
      <div class="chart-section">
        <AppCard title="课程统计" class="chart-card">
          <div class="chart-container">
            <div v-if="chartLoading" class="chart-loading">
              <AppLoading type="spinner" size="large" text="加载图表数据..." />
            </div>
            <div v-else class="chart-placeholder">
              <!-- 这里可以集成图表库如 Chart.js 或 ECharts -->
              <div class="chart-mock">
                <div class="chart-bars">
                  <div
                    v-for="(bar, index) in chartData"
                    :key="index"
                    class="chart-bar"
                    :style="{ height: `${bar.value}%` }"
                  >
                    <div class="chart-bar-label">{{ bar.label }}</div>
                  </div>
                </div>
                <div class="chart-legend">
                  <div class="legend-item">
                    <div class="legend-color bg-blue-500"></div>
                    <span>已发布课程</span>
                  </div>
                  <div class="legend-item">
                    <div class="legend-color bg-yellow-500"></div>
                    <span>草稿课程</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </AppCard>
      </div>

      <!-- 最近活动 -->
      <div class="activity-section">
        <AppCard title="最近活动" class="activity-card">
          <div class="activity-list">
            <div
              v-for="activity in recentActivities"
              :key="activity.id"
              class="activity-item"
            >
              <div class="activity-icon" :class="activity.iconClass">
                <component :is="activity.icon" class="w-4 h-4" />
              </div>
              <div class="activity-content">
                <div class="activity-title">{{ activity.title }}</div>
                <div class="activity-description">{{ activity.description }}</div>
                <div class="activity-time">{{ formatTime(activity.createdAt) }}</div>
              </div>
              <div class="activity-actions">
                <AppButton
                  v-if="activity.actionUrl"
                  variant="ghost"
                  size="small"
                  @click="$router.push(activity.actionUrl)"
                >
                  查看
                </AppButton>
              </div>
            </div>
          </div>
          <div v-if="recentActivities.length === 0" class="empty-state">
            <div class="empty-icon">
              <ActivityIcon class="w-12 h-12 text-gray-400" />
            </div>
            <div class="empty-text">
              <h3>暂无活动记录</h3>
              <p>开始创建课程或进行其他操作后，活动记录将显示在这里。</p>
            </div>
          </div>
        </AppCard>
      </div>
    </div>

    <!-- 快速操作 -->
    <div class="quick-actions">
      <AppCard title="快速操作" class="quick-actions-card">
        <div class="quick-actions-grid">
          <button
            v-for="action in quickActions"
            :key="action.key"
            class="quick-action-item"
            @click="handleQuickAction(action)"
          >
            <div class="quick-action-icon" :class="action.colorClass">
              <component :is="action.icon" class="w-6 h-6" />
            </div>
            <div class="quick-action-content">
              <div class="quick-action-title">{{ action.title }}</div>
              <div class="quick-action-description">{{ action.description }}</div>
            </div>
          </button>
        </div>
      </AppCard>
    </div>
  </AppLayout>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/store/modules/auth'
import AppLayout from '@/components/layout/AppLayout.vue'
import AppCard from '@/components/common/AppCard.vue'
import AppButton from '@/components/common/AppButton.vue'
import AppLoading from '@/components/common/AppLoading.vue'
import {
  RefreshCwIcon,
  PlusIcon,
  BookOpenIcon,
  UsersIcon,
  TrendingUpIcon,
  TrendingDownIcon,
  ActivityIcon,
  FileTextIcon,
  SettingsIcon,
  BarChart3Icon,
  GraduationCapIcon,
  ClockIcon
} from 'lucide-vue-next'
import type { BreadcrumbItem } from '@/components/layout/AppLayout.vue'

const router = useRouter()
const authStore = useAuthStore()

const loading = ref(false)
const chartLoading = ref(false)

const pageTitle = computed(() => {
  const user = authStore.userInfo
  const greeting = getGreeting()
  return user ? `${greeting}，${user.name}` : '仪表板'
})

const pageDescription = computed(() => {
  return authStore.userRole === 'admin' 
    ? '系统管理员控制台 - 查看系统统计和管理功能'
    : '查看您的课程统计和最近活动'
})

const breadcrumbItems: BreadcrumbItem[] = [
  { label: '首页', path: '/' },
  { label: '仪表板' }
]

// 统计数据
const stats = computed(() => {
  if (authStore.userRole === 'admin') {
    return [
      {
        key: 'totalCourses',
        label: '总课程数',
        value: '156',
        change: '+12',
        changeClass: 'text-green-600',
        colorClass: 'stat-card--blue',
        icon: BookOpenIcon,
        changeIcon: TrendingUpIcon
      },
      {
        key: 'totalUsers',
        label: '总用户数',
        value: '2,348',
        change: '+89',
        changeClass: 'text-green-600',
        colorClass: 'stat-card--green',
        icon: UsersIcon,
        changeIcon: TrendingUpIcon
      },
      {
        key: 'systemHealth',
        label: '系统健康度',
        value: '98%',
        change: '+2%',
        changeClass: 'text-green-600',
        colorClass: 'stat-card--yellow',
        icon: BarChart3Icon,
        changeIcon: TrendingUpIcon
      },
      {
        key: 'activeUsers',
        label: '活跃用户',
        value: '1,856',
        change: '+156',
        changeClass: 'text-green-600',
        colorClass: 'stat-card--purple',
        icon: ActivityIcon,
        changeIcon: TrendingUpIcon
      }
    ]
  } else {
    return [
      {
        key: 'courses',
        label: '我的课程',
        value: '12',
        change: '+2',
        changeClass: 'text-green-600',
        colorClass: 'stat-card--blue',
        icon: BookOpenIcon,
        changeIcon: TrendingUpIcon
      },
      {
        key: 'students',
        label: '学生总数',
        value: '248',
        change: '+15',
        changeClass: 'text-green-600',
        colorClass: 'stat-card--green',
        icon: UsersIcon,
        changeIcon: TrendingUpIcon
      },
      {
        key: 'completion',
        label: '完成率',
        value: '85%',
        change: '-3%',
        changeClass: 'text-red-600',
        colorClass: 'stat-card--yellow',
        icon: BarChart3Icon,
        changeIcon: TrendingDownIcon
      },
      {
        key: 'hours',
        label: '学习时长',
        value: '1,234h',
        change: '+56h',
        changeClass: 'text-green-600',
        colorClass: 'stat-card--purple',
        icon: ClockIcon,
        changeIcon: TrendingUpIcon
      }
    ]
  }
})

// 图表数据
const chartData = ref([
  { label: '1月', value: 65 },
  { label: '2月', value: 78 },
  { label: '3月', value: 90 },
  { label: '4月', value: 45 },
  { label: '5月', value: 88 },
  { label: '6月', value: 92 }
])

// 最近活动
const recentActivities = ref([
  {
    id: '1',
    title: '创建了新课程',
    description: 'Vue.js 进阶开发教程',
    createdAt: new Date(Date.now() - 2 * 60 * 60 * 1000),
    icon: BookOpenIcon,
    iconClass: 'activity-icon--blue',
    actionUrl: '/courses/1'
  },
  {
    id: '2',
    title: '学生完成了课程',
    description: '张三完成了《JavaScript 基础》',
    createdAt: new Date(Date.now() - 4 * 60 * 60 * 1000),
    icon: GraduationCapIcon,
    iconClass: 'activity-icon--green',
    actionUrl: '/courses/2'
  },
  {
    id: '3',
    title: '收到新的课程评价',
    description: '《React 实战项目》获得 5 星评价',
    createdAt: new Date(Date.now() - 6 * 60 * 60 * 1000),
    icon: ActivityIcon,
    iconClass: 'activity-icon--yellow'
  }
])

// 快速操作
const quickActions = computed(() => {
  if (authStore.userRole === 'admin') {
    return [
      {
        key: 'admin-courses',
        title: '课程管理',
        description: '管理所有课程内容',
        icon: BookOpenIcon,
        colorClass: 'quick-action-icon--blue',
        action: () => router.push('/admin/courses')
      },
      {
        key: 'admin-users',
        title: '用户管理',
        description: '管理系统用户和权限',
        icon: UsersIcon,
        colorClass: 'quick-action-icon--green',
        action: () => router.push('/admin/users')
      },
      {
        key: 'admin-analytics',
        title: '数据分析',
        description: '查看系统数据和统计',
        icon: BarChart3Icon,
        colorClass: 'quick-action-icon--purple',
        action: () => router.push('/admin/analytics')
      },
      {
        key: 'admin-settings',
        title: '系统设置',
        description: '配置系统参数和设置',
        icon: SettingsIcon,
        colorClass: 'quick-action-icon--gray',
        action: () => router.push('/admin/settings')
      }
    ]
  } else {
    return [
      {
        key: 'create-course',
        title: '创建课程',
        description: '开始创建新的课程内容',
        icon: BookOpenIcon,
        colorClass: 'quick-action-icon--blue',
        action: () => router.push('/courses/create')
      },
      {
        key: 'manage-students',
        title: '学生管理',
        description: '查看和管理学生信息',
        icon: UsersIcon,
        colorClass: 'quick-action-icon--green',
        action: () => router.push('/students')
      },
      {
        key: 'view-reports',
        title: '查看报告',
        description: '分析课程数据和统计',
        icon: BarChart3Icon,
        colorClass: 'quick-action-icon--purple',
        action: () => router.push('/reports')
      },
      {
        key: 'settings',
        title: '系统设置',
        description: '配置账户和偏好设置',
        icon: SettingsIcon,
        colorClass: 'quick-action-icon--gray',
        action: () => router.push('/settings')
      }
    ]
  }
})

// 获取问候语
const getGreeting = () => {
  const hour = new Date().getHours()
  if (hour < 6) return '夜深了'
  if (hour < 12) return '早上好'
  if (hour < 18) return '下午好'
  return '晚上好'
}

// 格式化时间
const formatTime = (date: Date) => {
  const now = new Date()
  const diff = now.getTime() - date.getTime()
  const minutes = Math.floor(diff / (1000 * 60))
  const hours = Math.floor(diff / (1000 * 60 * 60))
  const days = Math.floor(diff / (1000 * 60 * 60 * 24))
  
  if (minutes < 60) {
    return `${minutes} 分钟前`
  } else if (hours < 24) {
    return `${hours} 小时前`
  } else if (days < 7) {
    return `${days} 天前`
  } else {
    return date.toLocaleDateString('zh-CN')
  }
}

// 处理快速操作
const handleQuickAction = (action: any) => {
  if (action.action) {
    action.action()
  }
}

// 刷新数据
const refreshData = async () => {
  loading.value = true
  try {
    // 模拟API调用
    await new Promise(resolve => setTimeout(resolve, 1000))
    // 这里可以调用实际的API来刷新数据
  } catch (error) {
    console.error('刷新数据失败:', error)
  } finally {
    loading.value = false
  }
}

// 加载图表数据
const loadChartData = async () => {
  chartLoading.value = true
  try {
    // 模拟API调用
    await new Promise(resolve => setTimeout(resolve, 800))
    // 这里可以调用实际的API来加载图表数据
  } catch (error) {
    console.error('加载图表数据失败:', error)
  } finally {
    chartLoading.value = false
  }
}

onMounted(() => {
  loadChartData()
})
</script>

<style scoped>
.stats-grid {
  @apply grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8;
}

.stat-card {
  @apply border-l-4;
}

.stat-card--blue {
  @apply border-l-blue-500;
}

.stat-card--green {
  @apply border-l-green-500;
}

.stat-card--yellow {
  @apply border-l-yellow-500;
}

.stat-card--purple {
  @apply border-l-purple-500;
}

.stat-content {
  @apply flex items-center justify-between;
}

.stat-icon {
  @apply flex-shrink-0 w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center text-gray-600;
}

.stat-info {
  @apply flex-1 ml-4;
}

.stat-value {
  @apply text-2xl font-bold text-gray-900;
}

.stat-label {
  @apply text-sm text-gray-600;
}

.stat-change {
  @apply flex items-center text-sm font-medium;
}

.dashboard-content {
  @apply grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8;
}

.chart-section {
  @apply lg:col-span-2;
}

.chart-card {
  @apply h-96;
}

.chart-container {
  @apply h-full flex items-center justify-center;
}

.chart-loading {
  @apply w-full h-full flex items-center justify-center;
}

.chart-mock {
  @apply w-full h-full flex flex-col;
}

.chart-bars {
  @apply flex-1 flex items-end justify-around px-4 pb-4;
}

.chart-bar {
  @apply w-12 bg-blue-500 rounded-t relative transition-all duration-300 hover:bg-blue-600;
  min-height: 20px;
}

.chart-bar-label {
  @apply absolute -bottom-6 left-1/2 transform -translate-x-1/2 text-xs text-gray-600;
}

.chart-legend {
  @apply flex justify-center space-x-6 pt-4 border-t;
}

.legend-item {
  @apply flex items-center;
}

.legend-color {
  @apply w-3 h-3 rounded mr-2;
}

.activity-section {
  @apply lg:col-span-1;
}

.activity-card {
  @apply h-96;
}

.activity-list {
  @apply space-y-4 max-h-80 overflow-y-auto;
}

.activity-item {
  @apply flex items-start space-x-3 p-3 rounded-lg hover:bg-gray-50 transition-colors;
}

.activity-icon {
  @apply flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center;
}

.activity-icon--blue {
  @apply bg-blue-100 text-blue-600;
}

.activity-icon--green {
  @apply bg-green-100 text-green-600;
}

.activity-icon--yellow {
  @apply bg-yellow-100 text-yellow-600;
}

.activity-content {
  @apply flex-1 min-w-0;
}

.activity-title {
  @apply font-medium text-gray-900;
}

.activity-description {
  @apply text-sm text-gray-600 truncate;
}

.activity-time {
  @apply text-xs text-gray-500 mt-1;
}

.activity-actions {
  @apply flex-shrink-0;
}

.empty-state {
  @apply text-center py-12;
}

.empty-icon {
  @apply flex justify-center mb-4;
}

.empty-text h3 {
  @apply text-lg font-medium text-gray-900 mb-2;
}

.empty-text p {
  @apply text-gray-600;
}

.quick-actions {
  @apply mb-8;
}

.quick-actions-grid {
  @apply grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4;
}

.quick-action-item {
  @apply flex items-center p-4 rounded-lg border border-gray-200 hover:border-gray-300 hover:shadow-sm transition-all text-left;
}

.quick-action-icon {
  @apply flex-shrink-0 w-10 h-10 rounded-lg flex items-center justify-center mr-3;
}

.quick-action-icon--blue {
  @apply bg-blue-100 text-blue-600;
}

.quick-action-icon--green {
  @apply bg-green-100 text-green-600;
}

.quick-action-icon--purple {
  @apply bg-purple-100 text-purple-600;
}

.quick-action-icon--gray {
  @apply bg-gray-100 text-gray-600;
}

.quick-action-content {
  @apply flex-1 min-w-0;
}

.quick-action-title {
  @apply font-medium text-gray-900;
}

.quick-action-description {
  @apply text-sm text-gray-600;
}

/* 响应式调整 */
@media (max-width: 768px) {
  .stats-grid {
    @apply grid-cols-2 gap-4;
  }
  
  .dashboard-content {
    @apply grid-cols-1 gap-4;
  }
  
  .quick-actions-grid {
    @apply grid-cols-1 gap-3;
  }
  
  .chart-card,
  .activity-card {
    @apply h-80;
  }
}
</style>