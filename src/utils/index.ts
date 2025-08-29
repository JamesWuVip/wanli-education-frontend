/**
 * 工具函数统一导出
 * 提供各种实用工具函数的统一入口
 */

// 通用工具函数
export {
  debounce,
  throttle,
  deepClone,
  paginate,
  sleep,
  retry,
  parseQueryString,
  numberToChinese,
  generateRandomString,
  generateUUID
} from './common'

// 日期工具函数
export {
  formatDate,
  formatTime,
  formatDateTime,
  now,
  startOfDay,
  endOfDay,
  diffInDays,
  diffInHours,
  isToday,
  isYesterday,
  addDays,
  addMonths
} from './date'

// 格式化工具函数
export {
  formatFileSize,
  formatNumber,
  formatPercentage,
  formatDuration,
  formatCurrency,
  formatTruncate,
  formatPhone,
  formatCapitalize,
  formatCamelCase,
  formatKebabCase,
  formatJSON,
  formatArrayToString
} from './format'

// 验证工具函数
export {
  isEmail,
  isPhone,
  isIdCard,
  isStrongPassword,
  isUrl,
  isIP,
  isBankCard,
  isChineseName,
  isEmpty,
  isValidLength,
  isImageFile,
  isVideoFile,
  isNumber,
  isInteger,
  isPositive
} from './validate'

// 常用函数快捷导出（别名）
export {
  debounce as debounceFn,
  throttle as throttleFn,
  deepClone as clone
} from './common'

export { isEmpty as isEmptyValue } from './validate'

// 工具函数类型定义
export interface DebounceOptions {
  leading?: boolean
  trailing?: boolean
}

export interface ThrottleOptions {
  leading?: boolean
  trailing?: boolean
}

export interface PaginateOptions {
  page: number
  pageSize: number
}

export interface RetryOptions {
  maxAttempts?: number
  delay?: number
  backoff?: boolean
}

// 工具函数组合器
export const createUtils = async () => {
  const commonUtils = await import('./common')
  const dateUtils = await import('./date')
  const formatUtils = await import('./format')
  const validateUtils = await import('./validate')
  
  return {
    debounce: commonUtils.debounce,
    throttle: commonUtils.throttle,
    deepClone: commonUtils.deepClone,
    formatDate: dateUtils.formatDate,
    formatFileSize: formatUtils.formatFileSize,
    isEmail: validateUtils.isEmail,
    isPhone: validateUtils.isPhone,
    isEmpty: validateUtils.isEmpty
  }
}

// 工具函数工厂
export const createValidator = (rules: Record<string, (value: any) => boolean>) => {
  return (data: Record<string, any>) => {
    const errors: Record<string, string> = {}
    
    Object.entries(rules).forEach(([key, rule]) => {
      if (!rule(data[key])) {
        errors[key] = `${key} validation failed`
      }
    })
    
    return {
      isValid: Object.keys(errors).length === 0,
      errors
    }
  }
}

// 工具函数混合器
export const mixinUtils = <T extends Record<string, any>>(target: T, utils: Record<string, any>) => {
  return Object.assign(target, utils)
}

// 条件工具函数
export const when = <T>(condition: boolean, fn: () => T, elseFn?: () => T): T | undefined => {
  return condition ? fn() : elseFn?.()
}

// 异步工具函数包装器
export const asyncWrapper = <T extends any[], R>(
  fn: (...args: T) => Promise<R>
) => {
  return async (...args: T): Promise<[R | null, Error | null]> => {
    try {
      const result = await fn(...args)
      return [result, null]
    } catch (error) {
      return [null, error as Error]
    }
  }
}

// 缓存工具函数
export const memoize = <T extends any[], R>(
  fn: (...args: T) => R,
  keyFn?: (...args: T) => string
) => {
  const cache = new Map<string, R>()
  
  return (...args: T): R => {
    const key = keyFn ? keyFn(...args) : JSON.stringify(args)
    
    if (cache.has(key)) {
      return cache.get(key)!
    }
    
    const result = fn(...args)
    cache.set(key, result)
    return result
  }
}

// 调试工具函数
export const debug = {
  log: (message: string, data?: any) => {
    if (process.env.NODE_ENV === 'development') {
      console.log(`[DEBUG] ${message}`, data)
    }
  },
  warn: (message: string, data?: any) => {
    if (process.env.NODE_ENV === 'development') {
      console.warn(`[WARN] ${message}`, data)
    }
  },
  error: (message: string, error?: any) => {
    if (process.env.NODE_ENV === 'development') {
      console.error(`[ERROR] ${message}`, error)
    }
  }
}