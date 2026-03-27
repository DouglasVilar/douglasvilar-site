/* DOUGLAS VILAR NEWS - NEWS LOADER */
const NewsLoader = {
    cacheKey: 'dv_news_cache',
    cacheDuration: 30 * 60 * 1000,
    newsUrl: 'https://douglasvilar.github.io/douglas-vilar-noticias/data/news.json',

    async fetchNews() {
        const cached = this.getFromCache();
        if (cached) {
            console.log('[NewsLoader] Usando cache local');
            return cached;
        }
        try {
            const response = await fetch(this.newsUrl + '?t=' + Date.now());
            if (!response.ok) throw new Error('HTTP ' + response.status);
            const data = await response.json();
            this.setCache(data);
            return data;
        } catch (error) {
            console.warn('[NewsLoader] Erro ao carregar:', error.message);
            return this.getFallbackNews();
        }
    },

    getFromCache() {
        try {
            const raw = localStorage.getItem(this.cacheKey);
            if (!raw) return null;
            const { data, timestamp } = JSON.parse(raw);
            if (Date.now() - timestamp > this.cacheDuration) return null;
            return data;
        } catch { return null; }
    },

    setCache(data) {
        try {
            localStorage.setItem(this.cacheKey, JSON.stringify({ data, timestamp: Date.now() }));
        } catch { /* Storage full */ }
    },

    getFallbackNews() {
        return [{
            id: 'fallback-1',
            title: 'Acompanhe as novidades do Direito Imobiliario e Mercado Imobiliario',
            summary: 'Fique por dentro das principais decisoes judiciais, tendencias do mercado e analises especializadas. As noticias sao atualizadas diariamente as 04h da manha.',
            category: 'direito-imobiliario',
            source: 'Douglas Vilar News',
            sourceUrl: 'https://douglasvilar.com.br/noticias',
            date: new Date().toISOString(),
            author: 'Douglas Vilar',
            translated: false
        }];
    },

    formatDate(dateStr) {
        const d = new Date(dateStr);
        return d.toLocaleDateString('pt-BR', { day: '2-digit', month: 'long', year: 'numeric' });
    },

    formatTime(dateStr) {
        const d = new Date(dateStr);
        return d.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' });
    }
};

window.NewsLoader = NewsLoader;
