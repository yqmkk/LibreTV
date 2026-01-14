// ==========================================
// 1. 全局基础配置
// ==========================================
const PROXY_URL = '/proxy/';    // 建议确保 Vercel/Cloudflare 已配置反向代理
const SEARCH_HISTORY_KEY = 'videoSearchHistory';
const MAX_HISTORY_ITEMS = 5;

const PASSWORD_CONFIG = {
    localStorageKey: 'passwordVerified',
    verificationTTL: 90 * 24 * 60 * 60 * 1000  // 90天免登录
};

const SITE_CONFIG = {
    name: 'LibreTV',
    url: 'https://libretv.is-an.org',
    description: '免费在线视频搜索与观看平台',
    logo: 'image/logo.png',
    version: '1.0.4' // 建议升级版本号
};

// ==========================================
// 2. API 站点管理逻辑
// ==========================================

// 基础源 (默认保留)
let API_SITES = {
    testSource: {
        api: 'https://www.example.com/api.php/provide/vod',
        name: '待命测试源',
        adult: false
    }
};

// 2025年最新有效源
const LATEST_API_SITES_2025 = {
    fantaiying: { 
        api: 'http://www.饭太硬.com/tv', 
        name: '饭太硬（2025稳定单仓）'
    },
    feimao: { 
        api: 'http://肥猫.com/', 
        name: '肥猫（资源全/速度快）'
    },
    jisu: { 
        api: 'https://jszyapi.com/api.php/provide/vod', 
        name: '极速资源（标准V10）'
    },
    ffzy: { 
        api: 'https://api.ffzyapi.com/api.php/provide/vod', 
        name: '非凡资源' 
    },
    sdzy: { 
        api: 'https://sdzyapi.com/api.php/provide/vod', 
        name: '闪电资源' 
    }
};

/**
 * 核心修复：定义合并函数
 * 将新源安全地注入 API_SITES
 */
function extendAPISites(newSites) {
    if (!newSites || typeof newSites !== 'object') return;
    
    // 合并对象
    API_SITES = Object.assign({}, API_SITES, newSites);
    
    // 清理无用的占位符源
    if (API_SITES.testSource && API_SITES.testSource.api.includes('example.com')) {
        delete API_SITES.testSource;
    }
    
    console.log('LibreTV: API Sites Extended Successfully.');
}

// 执行合并并挂载到全局
extendAPISites(LATEST_API_SITES_2025);
window.API_SITES = API_SITES;
window.extendAPISites = extendAPISites;

// ==========================================
// 3. 搜索与播放性能配置
// ==========================================

const AGGREGATED_SEARCH_CONFIG = {
    enabled: true,
    timeout: 10000,           // 增加到10秒防止网络抖动
    maxResults: 50,           // 限制前端单次渲染数量，防止卡顿
    parallelRequests: true,   // 启用并行搜索
    showSourceBadges: true
};

const API_CONFIG = {
    search: {
        path: '?ac=videolist&wd=',
        pagePath: '?ac=videolist&wd={query}&pg={page}',
        maxPages: 2,          // 聚合搜索建议限制页数，否则响应极慢
        headers: {
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
            'Accept': 'application/json'
        }
    },
    detail: {
        path: '?ac=videolist&ids=',
        headers: {
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
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

// ==========================================
// 4. 安全与错误处理
// ==========================================

const ERROR_MESSAGES = {
    NETWORK_ERROR: '网络连接错误，请检查代理设置',
    TIMEOUT_ERROR: '请求超时，该源响应较慢',
    API_ERROR: '接口异常，请尝试切换搜索源',
    PLAYER_ERROR: '视频加载失败，请尝试其他线路'
};

const SECURITY_CONFIG = {
    enableXSSProtection: true,
    sanitizeUrls: true,
    maxQueryLength: 50       // 限制搜索长度防止恶意注入
};

const CUSTOM_API_CONFIG = {
    separator: ',',
    maxSources: 5,
    testTimeout: 5000,
    namePrefix: '自定义-',
    validateUrl: true,
    cacheResults: true,
    cacheExpiry: 5184000000
};

const HIDE_BUILTIN_ADULT_APIS = false;
