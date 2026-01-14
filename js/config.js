// ==========================================
// 全局常量配置
// ==========================================
const PROXY_URL = '/proxy/';    // 适用于 Cloudflare, Netlify, Vercel (带重写)
const SEARCH_HISTORY_KEY = 'videoSearchHistory';
const MAX_HISTORY_ITEMS = 5;

// 密码保护配置
const PASSWORD_CONFIG = {
    localStorageKey: 'passwordVerified',
    verificationTTL: 90 * 24 * 60 * 60 * 1000  // 90天
};

// 网站信息配置
const SITE_CONFIG = {
    name: 'LibreTV',
    url: 'https://libretv.is-an.org',
    description: '免费在线视频搜索与观看平台',
    logo: 'image/logo.png',
    version: '1.0.3'
};

// ==========================================
// API 站点配置定义
// ==========================================

// 初始 API 站点
let API_SITES = {
    testSource: {
        api: 'https://www.example.com/api.php/provide/vod',
        name: '空内容测试源',
        adult: false
    }
};

// 2025年最新 API 站点 (注意：请确保 LibreTV 支持这些格式)
const LATEST_API_SITES_2025 = {
    fantaiying: { 
        api: 'http://www.饭太硬.com/tv', 
        name: '饭太硬（2025稳定单仓）', 
        detail: 'http://www.饭太硬.com' 
    },
    feimao: { 
        api: 'http://肥猫.com/', 
        name: '肥猫（资源最全）', 
        detail: 'http://肥猫.com' 
    },
    jisu: { 
        api: 'https://jszyapi.com/api.php/provide/vod', 
        name: '极速资源（标准接口）', 
        detail: 'https://jszyapi.com' 
    },
    ffzy: { 
        api: 'https://api.ffzyapi.com/api.php/provide/vod', 
        name: '非凡资源（标准接口）', 
        detail: '' 
    }
};

/**
 * 定义合并方法：修复原本未定义直接调用的错误
 */
function extendAPISites(newSites) {
    if (typeof newSites === 'object') {
        API_SITES = Object.assign(API_SITES, newSites);
    }
}

// 执行合并
extendAPISites(LATEST_API_SITES_2025);

// 暴露到全局（供其他脚本调用）
window.API_SITES = API_SITES;
window.extendAPISites = extendAPISites;

// ==========================================
// 功能参数配置
// ==========================================

const AGGREGATED_SEARCH_CONFIG = {
    enabled: true,
    timeout: 8000,
    maxResults: 10000,
    parallelRequests: true,
    showSourceBadges: true
};

const API_CONFIG = {
    search: {
        path: '?ac=videolist&wd=',
        pagePath: '?ac=videolist&wd={query}&pg={page}',
        maxPages: 50,
        headers: {
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36',
            'Accept': 'application/json'
        }
    },
    detail: {
        path: '?ac=videolist&ids=',
        headers: {
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36',
            'Accept': 'application/json'
        }
    }
};

const M3U8_PATTERN = /\$https?:\/\/[^"'\s]+?\.m3u8/g;
const CUSTOM_PLAYER_URL = 'player.html';

const PLAYER_CONFIG = {
    autoplay: true,
    allowFullscreen: true,
    width: '100%',
    height: '600',
    timeout: 15000,
    filterAds: true,
    autoPlayNext: true,
    adFilteringEnabled: true,
    adFilteringStorage: 'adFilteringEnabled'
};

const ERROR_MESSAGES = {
    NETWORK_ERROR: '网络连接错误，请检查网络设置',
    TIMEOUT_ERROR: '请求超时，服务器响应时间过长',
    API_ERROR: 'API接口返回错误，请尝试更换数据源',
    PLAYER_ERROR: '播放器加载失败，请尝试其他视频源',
    UNKNOWN_ERROR: '发生未知错误，请刷新页面重试'
};

const SECURITY_CONFIG = {
    enableXSSProtection: true,
    sanitizeUrls: true,
    maxQueryLength: 100
};

const CUSTOM_API_CONFIG = {
    separator: ',',
    maxSources: 5,
    testTimeout: 5000,
    namePrefix: 'Custom-',
    validateUrl: true,
    cacheResults: true,
    cacheExpiry: 5184000000,
    adultPropName: 'isAdult'
};

const HIDE_BUILTIN_ADULT_APIS = false;
