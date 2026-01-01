/**
 * Natural Translation Mappings
 * Replaces literal translations with contextually appropriate, natural translations
 */

export interface NaturalTranslation {
  [key: string]: {
    [langCode: string]: string
  }
}

// Natural translations map: English term -> Language code -> Natural translation
export const NATURAL_TRANSLATIONS: NaturalTranslation = {
  // Navigation & UI Terms
  'Home': {
    'fr': 'Accueil',
    'de': 'Startseite',
    'it': 'Home',
    'es': 'Inicio',
    'pt': 'Início',
    'zh-CN': '首页',
    'ja': 'ホーム',
    'ko': '홈',
    'ar': 'الرئيسية',
    'hi': 'होम',
    'ru': 'Главная',
    'tr': 'Ana Sayfa',
    'pl': 'Strona główna',
    'nl': 'Startpagina',
  },
  'home': {
    'fr': 'accueil',
    'de': 'Startseite',
    'it': 'home',
    'es': 'inicio',
    'pt': 'início',
    'zh-CN': '首页',
    'ja': 'ホーム',
    'ko': '홈',
    'ar': 'الرئيسية',
    'hi': 'होम',
    'ru': 'главная',
    'tr': 'ana sayfa',
    'pl': 'strona główna',
    'nl': 'startpagina',
  },
  'Maison': { // In case Google already translated it incorrectly
    'fr': 'Accueil',
  },
  'maison': {
    'fr': 'accueil',
  },

  // Common Website Terms
  'Welcome': {
    'fr': 'Bienvenue',
    'de': 'Willkommen',
    'it': 'Benvenuto',
    'es': 'Bienvenido',
    'pt': 'Bem-vindo',
    'zh-CN': '欢迎',
    'ja': 'ようこそ',
    'ko': '환영합니다',
    'ar': 'مرحباً',
    'hi': 'स्वागत है',
    'ru': 'Добро пожаловать',
    'tr': 'Hoş geldiniz',
    'pl': 'Witamy',
    'nl': 'Welkom',
  },
  'Login': {
    'fr': 'Connexion',
    'de': 'Anmelden',
    'it': 'Accedi',
    'es': 'Iniciar sesión',
    'pt': 'Entrar',
    'zh-CN': '登录',
    'ja': 'ログイン',
    'ko': '로그인',
    'ar': 'تسجيل الدخول',
    'hi': 'लॉग इन',
    'ru': 'Войти',
    'tr': 'Giriş yap',
    'pl': 'Zaloguj się',
    'nl': 'Inloggen',
  },
  'Sign in': {
    'fr': 'Se connecter',
    'de': 'Anmelden',
    'it': 'Accedi',
    'es': 'Iniciar sesión',
    'pt': 'Entrar',
    'zh-CN': '登录',
    'ja': 'ログイン',
    'ko': '로그인',
    'ar': 'تسجيل الدخول',
    'hi': 'साइन इन करें',
    'ru': 'Войти',
    'tr': 'Giriş yap',
    'pl': 'Zaloguj się',
    'nl': 'Inloggen',
  },
  'Sign up': {
    'fr': 'S\'inscrire',
    'de': 'Registrieren',
    'it': 'Registrati',
    'es': 'Registrarse',
    'pt': 'Cadastrar',
    'zh-CN': '注册',
    'ja': '新規登録',
    'ko': '가입하기',
    'ar': 'إنشاء حساب',
    'hi': 'साइन अप करें',
    'ru': 'Регистрация',
    'tr': 'Kayıt ol',
    'pl': 'Zarejestruj się',
    'nl': 'Registreren',
  },
  'Dashboard': {
    'fr': 'Tableau de bord',
    'de': 'Dashboard',
    'it': 'Cruscotto',
    'es': 'Panel',
    'pt': 'Painel',
    'zh-CN': '仪表板',
    'ja': 'ダッシュボード',
    'ko': '대시보드',
    'ar': 'لوحة التحكم',
    'hi': 'डैशबोर्ड',
    'ru': 'Панель управления',
    'tr': 'Kontrol paneli',
    'pl': 'Panel',
    'nl': 'Dashboard',
  },
  'Contact': {
    'fr': 'Contact',
    'de': 'Kontakt',
    'it': 'Contatto',
    'es': 'Contacto',
    'pt': 'Contato',
    'zh-CN': '联系',
    'ja': 'お問い合わせ',
    'ko': '문의하기',
    'ar': 'اتصل بنا',
    'hi': 'संपर्क करें',
    'ru': 'Контакты',
    'tr': 'İletişim',
    'pl': 'Kontakt',
    'nl': 'Contact',
  },
  'About': {
    'fr': 'À propos',
    'de': 'Über uns',
    'it': 'Chi siamo',
    'es': 'Acerca de',
    'pt': 'Sobre',
    'zh-CN': '关于',
    'ja': 'について',
    'ko': '소개',
    'ar': 'حول',
    'hi': 'के बारे में',
    'ru': 'О нас',
    'tr': 'Hakkında',
    'pl': 'O nas',
    'nl': 'Over ons',
  },

  // Immigration-Specific Terms
  'Work Permit': {
    'fr': 'Permis de travail',
    'de': 'Arbeitsbewilligung',
    'it': 'Permesso di lavoro',
    'es': 'Permiso de trabajo',
    'pt': 'Permissão de trabalho',
    'zh-CN': '工作许可',
    'ja': '就労許可',
    'ko': '취업 허가',
    'ar': 'تصريح العمل',
    'hi': 'काम का परमिट',
    'ru': 'Разрешение на работу',
    'tr': 'Çalışma izni',
    'pl': 'Pozwolenie na pracę',
    'nl': 'Werkvergunning',
  },
  'Citizenship': {
    'fr': 'Citoyenneté',
    'de': 'Staatsbürgerschaft',
    'it': 'Cittadinanza',
    'es': 'Ciudadanía',
    'pt': 'Cidadania',
    'zh-CN': '公民身份',
    'ja': '市民権',
    'ko': '시민권',
    'ar': 'الجنسية',
    'hi': 'नागरिकता',
    'ru': 'Гражданство',
    'tr': 'Vatandaşlık',
    'pl': 'Obywatelstwo',
    'nl': 'Burgerschap',
  },
  'Residency': {
    'fr': 'Résidence',
    'de': 'Aufenthalt',
    'it': 'Residenza',
    'es': 'Residencia',
    'pt': 'Residência',
    'zh-CN': '居住',
    'ja': '居住',
    'ko': '거주',
    'ar': 'الإقامة',
    'hi': 'निवास',
    'ru': 'Вид на жительство',
    'tr': 'İkamet',
    'pl': 'Pobyt',
    'nl': 'Verblijf',
  },
  'Application': {
    'fr': 'Demande',
    'de': 'Antrag',
    'it': 'Domanda',
    'es': 'Solicitud',
    'pt': 'Candidatura',
    'zh-CN': '申请',
    'ja': '申請',
    'ko': '신청',
    'ar': 'طلب',
    'hi': 'आवेदन',
    'ru': 'Заявление',
    'tr': 'Başvuru',
    'pl': 'Wniosek',
    'nl': 'Aanvraag',
  },
  'Resources': {
    'fr': 'Ressources',
    'de': 'Ressourcen',
    'it': 'Risorse',
    'es': 'Recursos',
    'pt': 'Recursos',
    'zh-CN': '资源',
    'ja': 'リソース',
    'ko': '리소스',
    'ar': 'الموارد',
    'hi': 'संसाधन',
    'ru': 'Ресурсы',
    'tr': 'Kaynaklar',
    'pl': 'Zasoby',
    'nl': 'Bronnen',
  },
  'Tools': {
    'fr': 'Outils',
    'de': 'Tools',
    'it': 'Strumenti',
    'es': 'Herramientas',
    'pt': 'Ferramentas',
    'zh-CN': '工具',
    'ja': 'ツール',
    'ko': '도구',
    'ar': 'أدوات',
    'hi': 'उपकरण',
    'ru': 'Инструменты',
    'tr': 'Araçlar',
    'pl': 'Narzędzia',
    'nl': 'Gereedschappen',
  },
  'Pricing': {
    'fr': 'Tarifs',
    'de': 'Preise',
    'it': 'Prezzi',
    'es': 'Precios',
    'pt': 'Preços',
    'zh-CN': '价格',
    'ja': '料金',
    'ko': '가격',
    'ar': 'الأسعار',
    'hi': 'मूल्य निर्धारण',
    'ru': 'Цены',
    'tr': 'Fiyatlandırma',
    'pl': 'Ceny',
    'nl': 'Prijzen',
  },
  'Profile': {
    'fr': 'Profil',
    'de': 'Profil',
    'it': 'Profilo',
    'es': 'Perfil',
    'pt': 'Perfil',
    'zh-CN': '个人资料',
    'ja': 'プロフィール',
    'ko': '프로필',
    'ar': 'الملف الشخصي',
    'hi': 'प्रोफ़ाइल',
    'ru': 'Профиль',
    'tr': 'Profil',
    'pl': 'Profil',
    'nl': 'Profiel',
  },
  'Settings': {
    'fr': 'Paramètres',
    'de': 'Einstellungen',
    'it': 'Impostazioni',
    'es': 'Configuración',
    'pt': 'Configurações',
    'zh-CN': '设置',
    'ja': '設定',
    'ko': '설정',
    'ar': 'الإعدادات',
    'hi': 'सेटिंग्स',
    'ru': 'Настройки',
    'tr': 'Ayarlar',
    'pl': 'Ustawienia',
    'nl': 'Instellingen',
  },
  'FAQ': {
    'fr': 'FAQ',
    'de': 'FAQ',
    'it': 'FAQ',
    'es': 'Preguntas frecuentes',
    'pt': 'Perguntas frequentes',
    'zh-CN': '常见问题',
    'ja': 'よくある質問',
    'ko': '자주 묻는 질문',
    'ar': 'الأسئلة الشائعة',
    'hi': 'अक्सर पूछे जाने वाले प्रश्न',
    'ru': 'Часто задаваемые вопросы',
    'tr': 'SSS',
    'pl': 'Najczęstsze pytania',
    'nl': 'Veelgestelde vragen',
  },
  'Search': {
    'fr': 'Rechercher',
    'de': 'Suchen',
    'it': 'Cerca',
    'es': 'Buscar',
    'pt': 'Pesquisar',
    'zh-CN': '搜索',
    'ja': '検索',
    'ko': '검색',
    'ar': 'بحث',
    'hi': 'खोजें',
    'ru': 'Поиск',
    'tr': 'Ara',
    'pl': 'Szukaj',
    'nl': 'Zoeken',
  },
}

/**
 * Apply natural translations to the page after Google Translate has processed it
 */
export function applyNaturalTranslations(langCode: string): void {
  if (typeof window === 'undefined' || langCode === 'en') {
    return
  }

  // Normalize language code
  const normalizedLang = langCode === 'zh' ? 'zh-CN' : langCode

  // Check if we have translations for this language
  const hasTranslations = Object.values(NATURAL_TRANSLATIONS).some(
    translations => translations[normalizedLang]
  )
  if (!hasTranslations) {
    return
  }

  // Function to replace text in nodes
  const replaceTextInNode = (node: Node): boolean => {
    let changed = false

    if (node.nodeType === Node.TEXT_NODE) {
      let text = node.textContent || ''
      const originalText = text

      // Check each natural translation mapping
      Object.entries(NATURAL_TRANSLATIONS).forEach(([original, translations]) => {
        const naturalTranslation = translations[normalizedLang]
        if (naturalTranslation && text.includes(original)) {
          // Use case-insensitive regex with word boundaries for better matching
          const regex = new RegExp(`\\b${original.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}\\b`, 'gi')
          if (regex.test(text)) {
            text = text.replace(regex, (match) => {
              // Preserve case
              if (match === match.toUpperCase()) {
                return naturalTranslation.toUpperCase()
              } else if (match === match.toLowerCase()) {
                return naturalTranslation.toLowerCase()
              } else if (match[0] === match[0].toUpperCase()) {
                return naturalTranslation.charAt(0).toUpperCase() + naturalTranslation.slice(1).toLowerCase()
              }
              return naturalTranslation
            })
            changed = true
          }
        }
      })

      if (changed && text !== originalText) {
        node.textContent = text
      }
    } else if (node.nodeType === Node.ELEMENT_NODE) {
      const element = node as HTMLElement
      // Skip elements that shouldn't be translated
      if (
        element.classList.contains('notranslate') ||
        (element.hasAttribute('translate') && element.getAttribute('translate') === 'no') ||
        element.tagName === 'SCRIPT' ||
        element.tagName === 'STYLE' ||
        element.tagName === 'CODE' ||
        element.tagName === 'PRE'
      ) {
        return false
      }

      // Recursively process child nodes
      Array.from(element.childNodes).forEach(child => {
        if (replaceTextInNode(child)) {
          changed = true
        }
      })
    }

    return changed
  }

  // Apply natural translations function
  const apply = () => {
    try {
      replaceTextInNode(document.body)
    } catch (error) {
      console.error('Error applying natural translations:', error)
    }
  }

  // Wait a bit for Google Translate to finish, then apply natural translations
  setTimeout(apply, 1500) // Give Google Translate time to process

  // Also apply on DOM mutations (for dynamically loaded content)
  if (typeof MutationObserver !== 'undefined') {
    // Clear existing observer if any
    if ((window as any).__naturalTranslationObserver) {
      (window as any).__naturalTranslationObserver.disconnect()
    }

    const observer = new MutationObserver((mutations) => {
      let shouldApply = false
      mutations.forEach((mutation) => {
        mutation.addedNodes.forEach((node) => {
          if (node.nodeType === Node.ELEMENT_NODE || node.nodeType === Node.TEXT_NODE) {
            shouldApply = true
          }
        })
      })
      if (shouldApply) {
        setTimeout(apply, 200)
      }
    })

    observer.observe(document.body, {
      childList: true,
      subtree: true,
    })

    // Store observer to clean up later if needed
    ;(window as any).__naturalTranslationObserver = observer
  }
}

/**
 * Clear natural translation observer
 */
export function clearNaturalTranslationObserver(): void {
  if (typeof window !== 'undefined' && (window as any).__naturalTranslationObserver) {
    ;(window as any).__naturalTranslationObserver.disconnect()
    delete (window as any).__naturalTranslationObserver
  }
}
