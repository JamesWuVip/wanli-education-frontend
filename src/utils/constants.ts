/**
 * 应用常量定义
 */

/**
 * 应用基础信息
 */
export const APP_INFO = {
  NAME: '万里书院',
  VERSION: '1.0.0',
  DESCRIPTION: '专业的在线教育平台',
  AUTHOR: 'Wanli Academy Team',
  COPYRIGHT: '© 2024 万里书院. All rights reserved.'
} as const

/**
 * 路由路径常量
 */
export const ROUTES = {
  // 认证相关
  LOGIN: '/login',
  REGISTER: '/register',
  FORGOT_PASSWORD: '/forgot-password',
  RESET_PASSWORD: '/reset-password',
  
  // 主要页面
  HOME: '/',
  DASHBOARD: '/dashboard',
  
  // 课程相关
  COURSES: '/courses',
  COURSE_LIST: '/courses',
  COURSE_CREATE: '/courses/create',
  COURSE_DETAIL: '/courses/:id',
  COURSE_EDIT: '/courses/:id/edit',
  
  // 课时相关
  LESSONS: '/lessons',
  LESSON_LIST: '/courses/:courseId/lessons',
  LESSON_CREATE: '/courses/:courseId/lessons/create',
  LESSON_DETAIL: '/lessons/:id',
  LESSON_EDIT: '/lessons/:id/edit',
  
  // 学生相关
  STUDENTS: '/students',
  STUDENT_LIST: '/students',
  STUDENT_DETAIL: '/students/:id',
  
  // 用户相关
  PROFILE: '/profile',
  SETTINGS: '/settings',
  
  // 其他
  ABOUT: '/about',
  HELP: '/help',
  FORBIDDEN: '/403',
  NOT_FOUND: '/404'
} as const

/**
 * API 端点常量
 */
export const API_ENDPOINTS = {
  // 认证相关
  AUTH: {
    LOGIN: '/auth/login',
    REGISTER: '/auth/register',
    LOGOUT: '/auth/logout',
    REFRESH: '/auth/refresh',
    PROFILE: '/auth/profile',
    FORGOT_PASSWORD: '/auth/forgot-password',
    RESET_PASSWORD: '/auth/reset-password',
    VERIFY_EMAIL: '/auth/verify-email'
  },
  
  // 用户相关
  USERS: {
    LIST: '/users',
    DETAIL: '/users/:id',
    CREATE: '/users',
    UPDATE: '/users/:id',
    DELETE: '/users/:id',
    AVATAR: '/users/:id/avatar'
  },
  
  // 课程相关
  COURSES: {
    LIST: '/courses',
    DETAIL: '/courses/:id',
    CREATE: '/courses',
    UPDATE: '/courses/:id',
    DELETE: '/courses/:id',
    PUBLISH: '/courses/:id/publish',
    UNPUBLISH: '/courses/:id/unpublish',
    COVER: '/courses/:id/cover',
    STATISTICS: '/courses/:id/statistics'
  },
  
  // 课时相关
  LESSONS: {
    LIST: '/courses/:courseId/lessons',
    DETAIL: '/lessons/:id',
    CREATE: '/courses/:courseId/lessons',
    UPDATE: '/lessons/:id',
    DELETE: '/lessons/:id',
    REORDER: '/courses/:courseId/lessons/reorder',
    VIDEO: '/lessons/:id/video',
    DOCUMENT: '/lessons/:id/document'
  },
  
  // 文件上传
  UPLOAD: {
    IMAGE: '/upload/image',
    VIDEO: '/upload/video',
    DOCUMENT: '/upload/document',
    AVATAR: '/upload/avatar'
  }
} as const

/**
 * 本地存储键名
 */
export const STORAGE_KEYS = {
  // 认证相关
  ACCESS_TOKEN: 'access_token',
  REFRESH_TOKEN: 'refresh_token',
  USER_INFO: 'user_info',
  
  // 用户偏好
  THEME: 'theme',
  LANGUAGE: 'language',
  SIDEBAR_COLLAPSED: 'sidebar_collapsed',
  
  // 应用状态
  LAST_ROUTE: 'last_route',
  FORM_DRAFT: 'form_draft',
  
  // 缓存
  COURSE_LIST_CACHE: 'course_list_cache',
  USER_LIST_CACHE: 'user_list_cache'
} as const

/**
 * 用户角色常量
 */
export const USER_ROLES = {
  ADMIN: 'admin',
  TEACHER: 'teacher',
  STUDENT: 'student'
} as const

/**
 * 用户状态常量
 */
export const USER_STATUS = {
  ACTIVE: 'active',
  INACTIVE: 'inactive',
  PENDING: 'pending',
  SUSPENDED: 'suspended'
} as const

/**
 * 课程状态常量
 */
export const COURSE_STATUS = {
  DRAFT: 'draft',
  PUBLISHED: 'published',
  ARCHIVED: 'archived',
  DELETED: 'deleted'
} as const

/**
 * 课程难度常量
 */
export const COURSE_DIFFICULTY = {
  BEGINNER: 'beginner',
  INTERMEDIATE: 'intermediate',
  ADVANCED: 'advanced'
} as const

/**
 * 课程分类常量
 */
export const COURSE_CATEGORIES = {
  PROGRAMMING: 'programming',
  DESIGN: 'design',
  BUSINESS: 'business',
  MARKETING: 'marketing',
  LANGUAGE: 'language',
  MUSIC: 'music',
  PHOTOGRAPHY: 'photography',
  OTHER: 'other'
} as const

/**
 * 课时类型常量
 */
export const LESSON_TYPES = {
  VIDEO: 'video',
  DOCUMENT: 'document',
  QUIZ: 'quiz',
  ASSIGNMENT: 'assignment',
  LIVE: 'live'
} as const

/**
 * 文件类型常量
 */
export const FILE_TYPES = {
  IMAGE: 'image',
  VIDEO: 'video',
  DOCUMENT: 'document',
  AUDIO: 'audio',
  ARCHIVE: 'archive'
} as const

/**
 * 文件大小限制（字节）
 */
export const FILE_SIZE_LIMITS = {
  IMAGE: 5 * 1024 * 1024, // 5MB
  VIDEO: 100 * 1024 * 1024, // 100MB
  DOCUMENT: 10 * 1024 * 1024, // 10MB
  AUDIO: 20 * 1024 * 1024, // 20MB
  AVATAR: 2 * 1024 * 1024 // 2MB
} as const

/**
 * 支持的文件扩展名
 */
export const SUPPORTED_FILE_EXTENSIONS = {
  IMAGE: ['.jpg', '.jpeg', '.png', '.gif', '.webp', '.svg'],
  VIDEO: ['.mp4', '.avi', '.mov', '.wmv', '.flv', '.webm'],
  DOCUMENT: ['.pdf', '.doc', '.docx', '.ppt', '.pptx', '.xls', '.xlsx', '.txt'],
  AUDIO: ['.mp3', '.wav', '.aac', '.ogg', '.m4a']
} as const

/**
 * 分页配置
 */
export const PAGINATION = {
  DEFAULT_PAGE_SIZE: 10,
  PAGE_SIZE_OPTIONS: [10, 20, 50, 100],
  MAX_PAGE_SIZE: 100
} as const

/**
 * 表单验证规则
 */
export const VALIDATION_RULES = {
  USERNAME: {
    MIN_LENGTH: 3,
    MAX_LENGTH: 20,
    PATTERN: /^[a-zA-Z0-9_]+$/
  },
  PASSWORD: {
    MIN_LENGTH: 6,
    MAX_LENGTH: 50,
    PATTERN: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d@$!%*?&]+$/
  },
  EMAIL: {
    PATTERN: /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  },
  PHONE: {
    PATTERN: /^1[3-9]\d{9}$/
  }
} as const

/**
 * 主题配置
 */
export const THEMES = {
  LIGHT: 'light',
  DARK: 'dark',
  AUTO: 'auto'
} as const

/**
 * 语言配置
 */
export const LANGUAGES = {
  ZH_CN: 'zh-CN',
  EN_US: 'en-US'
} as const

/**
 * 通知类型
 */
export const NOTIFICATION_TYPES = {
  SUCCESS: 'success',
  ERROR: 'error',
  WARNING: 'warning',
  INFO: 'info'
} as const

/**
 * HTTP 状态码
 */
export const HTTP_STATUS = {
  OK: 200,
  CREATED: 201,
  NO_CONTENT: 204,
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  CONFLICT: 409,
  UNPROCESSABLE_ENTITY: 422,
  INTERNAL_SERVER_ERROR: 500,
  BAD_GATEWAY: 502,
  SERVICE_UNAVAILABLE: 503
} as const

/**
 * 错误代码
 */
export const ERROR_CODES = {
  // 通用错误
  UNKNOWN_ERROR: 'UNKNOWN_ERROR',
  NETWORK_ERROR: 'NETWORK_ERROR',
  TIMEOUT_ERROR: 'TIMEOUT_ERROR',
  
  // 认证错误
  INVALID_CREDENTIALS: 'INVALID_CREDENTIALS',
  TOKEN_EXPIRED: 'TOKEN_EXPIRED',
  TOKEN_INVALID: 'TOKEN_INVALID',
  ACCESS_DENIED: 'ACCESS_DENIED',
  
  // 验证错误
  VALIDATION_ERROR: 'VALIDATION_ERROR',
  REQUIRED_FIELD_MISSING: 'REQUIRED_FIELD_MISSING',
  INVALID_FORMAT: 'INVALID_FORMAT',
  
  // 业务错误
  RESOURCE_NOT_FOUND: 'RESOURCE_NOT_FOUND',
  RESOURCE_ALREADY_EXISTS: 'RESOURCE_ALREADY_EXISTS',
  OPERATION_NOT_ALLOWED: 'OPERATION_NOT_ALLOWED'
} as const

/**
 * 默认配置
 */
export const DEFAULT_CONFIG = {
  THEME: THEMES.LIGHT,
  LANGUAGE: LANGUAGES.ZH_CN,
  PAGE_SIZE: PAGINATION.DEFAULT_PAGE_SIZE,
  SIDEBAR_COLLAPSED: false,
  AUTO_SAVE_INTERVAL: 30000, // 30秒
  REQUEST_TIMEOUT: 10000, // 10秒
  RETRY_ATTEMPTS: 3,
  DEBOUNCE_DELAY: 300 // 300毫秒
} as const

/**
 * 正则表达式
 */
export const REGEX_PATTERNS = {
  // 中文字符
  CHINESE: /[\u4e00-\u9fa5]/,
  // 手机号
  MOBILE: /^1[3-9]\d{9}$/,
  // 身份证号
  ID_CARD: /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/,
  // URL
  URL: /^https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)$/,
  // IP地址
  IP: /^(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/
} as const