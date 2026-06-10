const apiData = {
    "Downloader": [
        {
            method: "GET",
            title: "YouTube Downloader",
            status: "online",
            description: "API untuk mendownload video atau shorts dari YouTube.",
            endpoint: "/api/ytdl",
            parameters: [
                {name: "url", type: "text", placeholder: "URL YouTube (contoh: https://youtube.com/...)"},
                {name: "type", type: "text", placeholder: "Jenis konten (mp4, mp3, all)"}
            ]
        },
        {
            method: "GET",
            title: "Twitter Downloader",
            status: "online",
            description: "API untuk mendownload video atau gambar dari Twitter.",
            endpoint: "/api/twitterdl",
            parameters: [
                {name: "url", type: "text", placeholder: "URL Tweet (contoh: https://twitter.com/...)"}
            ]
        },
        {
            method: "GET",
            title: "Instagram Downloader",
            status: "online",
            description: "API untuk mendownload video atau gambar dari Instagram.",
            endpoint: "/api/igdl",
            parameters: [
                {name: "url", type: "text", placeholder: "URL Postingan Instagram"}
            ]
        },
        {
            method: "GET",
            title: "Facebook Downloader",
            status: "online",
            description: "API untuk mendownload video dari Facebook.",
            endpoint: "/api/fbdl",
            parameters: [
                {name: "url", type: "text", placeholder: "URL Facebook (contoh: https://fb.watch/...)"}
            ]
        },
        {
            method: "GET",
            title: "TikTok Downloader",
            status: "online",
            description: "API untuk mendownload video/gambar dari TikTok.",
            endpoint: "/api/ttdl",
            parameters: [
                {name: "url", type: "text", placeholder: "URL TikTok (contoh: https://vm.tiktok.com/...)"}
            ]
        },
        {
            method: "GET",
            title: "GitHub Cloning",
            status: "online",
            description: "Cloning repositori dari GitHub.",
            endpoint: "/api/gitclone",
            parameters: [
                {name: "url", type: "text", placeholder: "URL Repo GitHub (contoh: https://github.com/...)"}
            ]
        },
        {
            method: "GET",
            title: "Spotify Downloader",
            status: "online",
            description: "Download semua lagu dari Spotify dengan mudah.",
            endpoint: "/api/spotifydl",
            parameters: [
                {name: "url", type: "text", placeholder: "URL Spotify (track/playlist/album)"}
            ]
        },
        {
            method: "GET",
            title: "Aptoide Downloader",
            status: "online",
            description: "Download apk apa saja yang tersedia di Aptoide.",
            endpoint: "/api/aptoide",
            parameters: [
                {name: "q", type: "text", placeholder: "Nama Aplikasi (contoh: WhatsApp)"}
            ]
        }
    ],
    "Search": [
        {
            method: "GET",
            title: "Search Groups",
            status: "online",
            description: "API untuk mencari grup WhatsApp berdasarkan kata kunci.",
            endpoint: "/api/searchgroups",
            parameters: [
                {name: "q", type: "text", placeholder: "Kata kunci (contoh: Programming)"}
            ]
        },
        {
            method: "GET",
            title: "Random Meme",
            status: "online",
            description: "Gambar random yang berisi Meme dan bisa di tentukan count(jumlah) nya.",
            endpoint: "/api/randommeme",
            parameters: [
                {name: "count", type: "number", placeholder: "Jumlah meme (1-10)"}
            ]
        },
        {
            method: "GET",
            title: "TikTok Search",
            status: "online",
            description: "API untuk mencari video dari TikTok berdasarkan query.",
            endpoint: "/api/ttsearch",
            parameters: [
                {name: "q", type: "text", placeholder: "Kata kunci pencarian"}
            ]
        },
        {
            method: "GET",
            title: "YouTube Search",
            status: "online",
            description: "API untuk mencari video dari YouTube berdasarkan kata kunci atau query.",
            endpoint: "/api/ytsearch",
            parameters: [
                {name: "q", type: "text", placeholder: "Kata kunci pencarian"}
            ]
        },
        {
            method: "GET",
            title: "NPM Search",
            status: "online",
            description: "Mencari package/module/library yang tersedia berdasarkan query(q) kamu.",
            endpoint: "/api/npmsearch",
            parameters: [
                {name: "q", type: "text", placeholder: "Nama package (contoh: react)"}
            ]
        },
        {
            method: "GET",
            title: "Google Search",
            status: "online",
            description: "Mencari apapun dan semuanya dari Google dengan cepat.",
            endpoint: "/api/googlesearch",
            parameters: [
                {name: "q", type: "text", placeholder: "Kata kunci pencarian"}
            ]
        },
        {
            method: "GET",
            title: "DuckDuckGo Search",
            status: "offline",
            description: "Mencari apapun dan semuanya dari DuckDuckGo dengan mudah.",
            endpoint: "/api/duckduckgo",
            parameters: [
                {name: "q", type: "text", placeholder: "Kata kunci pencarian"}
            ]
        },
        {
            method: "GET",
            title: "Pinterest",
            status: "online",
            description: "Mencari gambar di Pinterest berdasarkan query (q) kamu.",
            endpoint: "/api/pinterest",
            parameters: [
                {name: "q", type: "text", placeholder: "Kata kunci gambar"}
            ]
        },
        {
            method: "GET",
            title: "Spotify Search",
            status: "online",
            description: "Mencari lagu dengan informasi lengkap lainnya berdasarkan query (q) kamu.",
            endpoint: "/api/spotifysearch",
            parameters: [
                {name: "q", type: "text", placeholder: "Judul lagu/artis"}
            ]
        }
    ],
    "Stalker": [
        {
            method: "GET",
            title: "Genshin Stalk",
            status: "online",
            description: "Stalking akun genshin berdasarkan UID kamu.",
            endpoint: "/api/gistalk",
            parameters: [
                {name: "uid", type: "text", placeholder: "Masukkan UID (contoh: 812345678)"}
            ]
        },
        {
            method: "GET",
            title: "GitHub Stalk",
            status: "online",
            description: "Stalking akun GitHub berdasarkan username.",
            endpoint: "/api/githubstalk",
            parameters: [
                {name: "username", type: "text", placeholder: "Username GitHub (contoh: johndoe)"}
            ]
        }
    ],
    "AI": [
        {
            method: "GET",
            title: "LLaMA 3.3 70B Versatile",
            status: "online",
            description: "API untuk mengakses model LLaMA 3.3 70B yang serbaguna.",
            endpoint: "/api/llama-3.3-70b-versatile",
            parameters: [
                {name: "content", type: "text", placeholder: "Input teks (contoh: Jelaskan quantum computing)"}
            ]
        },
        {
            method: "GET",
            title: "Blackbox AI",
            status: "online",
            description: "API untuk mengakses AI Blackbox yang serbaguna.",
            endpoint: "/api/blackboxai",
            parameters: [
                {name: "message", type: "text", placeholder: "Pertanyaan/perintah"}
            ]
        }, 
        {
            method: "GET",
            title: "Gemini AI",
            status: "online",
            description: "API untuk mengakses AI model Gemini yang serbaguna.",
            endpoint: "/api/gemini",
            parameters: [
                {name: "text", type: "text", placeholder: "Pertanyaan/perintah"}
            ]
        },
        {
            method: "GET",
            title: "Txt2Img",
            status: "online",
            description: "API untuk membuat gambar dari AI dengan style yang banyak.",
            endpoint: "/api/txt2img",
            parameters: [
                {name: "prompt", type: "text", placeholder: "Deskripsi gambar"},
                {name: "style", type: "text", placeholder: "Gaya (contoh: anime, realistic)"}
            ]
        }
    ],
    "Tools": [
        {
            method: "GET",
            title: "Genshin Character Build",
            status: "online",
            description: "Build karakter Genshin Impact yang lengkap berdasarkan query (q) kamu.",
            endpoint: "/api/genshinbuild",
            parameters: [
                {name: "q", type: "text", placeholder: "Nama karakter (contoh: Xiao)"}
            ]
        },
        {
            method: "GET",
            title: "Get Pastebin",
            status: "online",
            description: "Mengambil kode apapun dari Pastebin berdasarkan url kamu.",
            endpoint: "/api/getpastebin",
            parameters: [
                {name: "url", type: "text", placeholder: "Contoh: https://pastebin.com/abc"}
            ]
        },
        {
            method: "GET",
            title: "Website to Zip",
            status: "online",
            description: "Mengubah website berdasarkan parameter url kamu ke Zip",
            endpoint: "/api/web2zip",
            parameters: [
                {name: "url", type: "text", placeholder: "https://..."}
            ]
        },
        {
            method: "GET",
            title: "Screenshot Web",
            status: "online",
            description: "API untuk screenshot website dengan mudah.",
            endpoint: "/api/ssweb",
            parameters: [
                {name: "url", type: "text", placeholder: "URL website (contoh: https://google.com)"}
            ]
        },
        {
            method: "GET",
            title: "Translate",
            status: "online",
            description: "API untuk translate bahasa apapun menjadi yang kamu inginkan.",
            endpoint: "/api/translate",
            parameters: [
                {name: "text", type: "text", placeholder: "Teks yang akan diterjemahkan"},
                {name: "to", type: "text", placeholder: "Kode bahasa tujuan (contoh: en, id)"}
            ]
        },        
        {
            method: "GET",
            title: "Cuaca",
            status: "online",
            description: "Mendapatkan informasi Cuaca semua kota di dunia berdasarkan query kota.",
            endpoint: "/api/cuaca",
            parameters: [
                {name: "kota", type: "text", placeholder: "Nama kota (contoh: Jakarta)"}
            ]
        },
        {
            method: "GET",
            title: "Credit Card Generator",
            status: "online",
            description: "Fake generator Credit Card hanya untuk Fun",
            endpoint: "/api/vcc",
            parameters: [
                {name: "type", type: "text", placeholder: "Jenis kartu (contoh: visa)"},
                {name: "count", type: "number", placeholder: "Jumlah kartu (1-10)"}
            ]
        },
        {
            method: "GET",
            title: "To Figur",
            status: "online",
            description: "Membuat gambar anda menjadi figur!",
            endpoint: "/api/tofigura?imageurl=",
            parameters: [
                {name: "imageurl", type: "text", placeholder: "Masukan link gambar"}
            ]
        }
    ],
    "Fun": [
        {
            method: "GET",
            title: "Cek Khodam",
            status: "online",
            description: "Permainan seru yang menunjukkan khodam seseorang berdasarkan nama.",
            endpoint: "/api/cekkhodam",
            parameters: [
                {name: "nama", type: "text", placeholder: "Masukkan nama"}
            ]
        },
        {
            method: "GET",
            title: "Tahu Kah Kamu?",
            status: "online",
            description: "Permainan seru yang menunjukkan fakta2 random yang mungkin belom kamu ketahui.",
            endpoint: "/api/tahukahkamu",
            parameters: [] // Tidak ada parameter
        }
    ],
    "Maker": [
        {
            method: "GET",
            title: "Welcome-Goodbye Image",
            status: "online",
            description: "Membuat card image Welcome Dan Goodbye yang bisa di custom.",
            endpoint: "/api/welcome-goodbye-image",
            parameters: [
                {name: "name", type: "text", placeholder: "Masukkan nama."},
                {name: "profile", type: "text", placeholder: "https://..."},
                {name: "welcome", type: "text", placeholder: "true/false"}
            ]
        },
        {
            method: "GET",
            title: "Tweet Generator",
            status: "online",
            description: "Membuat gambar fake tweet dan bisa custom seperti Avatar, Like, Replies, Retweets dll.",
            endpoint: "/api/tweet",
            parameters: [
                {name: "text", type: "text", placeholder: "Isi tweet"},
                {name: "displayName", type: "text", placeholder: "Nama tampilan"},
                {name: "sender", type: "text", placeholder: "@username"},
                {name: "avatar", type: "text", placeholder: "URL gambar profil"},
                {name: "replies", type: "number", placeholder: "Jumlah replies"},
                {name: "retweets", type: "number", placeholder: "Jumlah retweets"},
                {name: "likes", type: "number", placeholder: "Jumlah likes"}
            ]
        },
        {
            method: "GET",
            title: "Ghibli Image",
            status: "online",
            description: "Membuat gambar dengan style ghibli berdasarkan prompt kamu.",
            endpoint: "/api/ghibliimage",
            parameters: [
                {name: "prompt", type: "text",
                placeholder: "Contoh: girl enjoying sunset"}
            ]
        },
        {
            method: "GET",
            title: "Emojimix",
            status: "online",
            description: "Membuat kombinasi emoji yang unik.",
            endpoint: "/api/emojimix",
            parameters: [
                {name: "emoji1", type: "text", placeholder: "Contoh: 😁"},
                {name: "emoji2", type: "text", placeholder: "Contoh: 🤭"}
            ]
        },
        {
            method: "GET",
            title: "QR Code Generator",
            status: "online",
            description: "Membuat QR secara otomatis dengan gampang.",
            endpoint: "/api/qrcodegenerator",
            parameters: [
                {name: "text", type: "text", placeholder: "Teks/URL untuk QR"}
            ]
        },
        {
            method: "GET",
            title: "Nulis",
            status: "online",
            description: "Membuat gambar buku beserta tulisan berdasarkan dari query text kamu.",
            endpoint: "/api/nulis",
            parameters: [
                {name: "text", type: "text", placeholder: "Teks untuk ditulis di buku"}
            ]
        }
    ],
    "Sticker": [
        {
            method: "GET",
            title: "Brat Image",
            status: "online",
            description: "Mengubah text kamu menjadi gambar brat.",
            endpoint: "/api/brat",
            parameters: [
                {name: "text", type: "text", placeholder: "Masukkan teks disini."}
            ]
        },
        {
            method: "GET",
            title: "Quoted Chat",
            status: "online",
            description: "Membuat gambar dengan desain quoted chat yang bisa kamu custom nama, color, foto profile, dan lainnya.",
            endpoint: "/api/qc",
            parameters: [
                {name: "text", type: "text", placeholder: "Isi pesan"},
                {name: "name", type: "text", placeholder: "Nama pengirim"},
                {name: "color", type: "color", placeholder: "Warna bubble"},
                {name: "profile", type: "text", placeholder: "URL gambar profil"}
            ]
        }
    ],
    "Berita": [
        {
            method: "GET",
            title: "Detik News",
            status: "online",
            description: "Mendapatkan informasi berita terbaru dari Detik News.",
            endpoint: "/api/detiknews",
            parameters: [] // Tidak ada parameter
        },
        { 
            method: "GET",
            title: "Kompas",
            status: "online",
            description: "Mendapatkan informasi berita terbaru dari Kompas",
            endpoint: "/api/kompasnews",
            parameters: [] // Tidak ada parameter
        }
    ]      
};

const changelogData = [
     {
         date: "5 Juni 2025",
         updates: [
              "Menambahkan endpoint baru yaitu /api/web2zip yang berada di kategori Tools, silahkan gunakan baik-baik jangan spam atau di buat keperluan yang ilegal."
         ]
     },
     {
         date: "5 Juni 2025 V2",
         updates: [ 
              "Menambahkan endpoint baru yaitu /api/ghibliimage yang berada di kategori Maker, silahkan gunakan baik-baik jangan spam atau di buat keperluan yang ilegal."
         ]
     }    
]

let changelogRead = localStorage.getItem('changelogRead') === 'true';
let currentlyOpenItem = null;

function syntaxHighlight(json) {
    if (typeof json !== 'string') {
        json = JSON.stringify(json, null, 2);
    }
    return json.replace(/("(\\u[a-zA-Z0-9]{4}|\\[^u]|[^\\"])*"(\s*:)?|\b(true|false|null)\b|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?)/g, function(match) {
        let cls = 'number';
        if (/^"/.test(match)) {
            cls = match.endsWith(':') ? 'key' : 'string';
        } else if (/true|false/.test(match)) {
            cls = 'boolean';
        } else if (/null/.test(match)) {
            cls = 'null';
        }
        return `<span class="${cls}">${match}</span>`;
    });
}

function setupTryItFeature(apiItem, endpoint, title, parameters) {
    const tryItBtn = document.createElement('button');
    tryItBtn.className = 'try-it-btn';
    tryItBtn.innerHTML = '<i class="fas fa-flask"></i> Try It';
    const buttonContainer = apiItem.querySelector('.api-button-container');
    buttonContainer.appendChild(tryItBtn);

    tryItBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        openApiModal(endpoint, title, parameters);
    });
}

function openApiModal(endpoint, title, parameters) {
    const modal = document.getElementById('apiModal');
    const modalTitle = document.getElementById('modalTitle');
    const testerUrl = modal.querySelector('.tester-url');
    const responseContent = modal.querySelector('.response-content');
    const paramsContainer = modal.querySelector('.params-container');

    modalTitle.textContent = title;
    testerUrl.value = endpoint;
    paramsContainer.innerHTML = '';

    if(parameters && parameters.length) {
        parameters.forEach(param => {
            const wrapper = document.createElement('div');
            wrapper.className = 'param-input';
            const label = document.createElement('label');
            label.textContent = param.name + ':';
            const input = document.createElement('input');
            input.type = param.type;
            input.placeholder = param.placeholder || '';
            input.dataset.param = param.name;
            wrapper.appendChild(label);
            wrapper.appendChild(input);
            paramsContainer.appendChild(wrapper);
        });
    }

    responseContent.innerHTML = '';
    modal.querySelector('.response-status').textContent = '';
    modal.querySelector('.response-time').textContent = '';
    modal.querySelector('.loading-indicator').style.display = 'none';
    modal.classList.add('active');
}

// Changelog functions
function loadChangelogData() {
    const changelogList = document.getElementById('changelogList');
    changelogList.innerHTML = '';
    
    changelogData.forEach(item => {
        const updatesList = item.updates.map(update => `<li>${update}</li>`).join('');
        
        const changelogItem = document.createElement('div');
        changelogItem.className = 'changelog-item';
        changelogItem.innerHTML = `
            <div class="changelog-date">${item.date}</div>
            <ul class="changelog-updates">
                ${updatesList}
            </ul>
        `;
        
        changelogList.appendChild(changelogItem);
    });
    
    updateNotificationBadge();
}

function updateNotificationBadge() {
    const notificationBadge = document.querySelector('.notification-badge');
    if (!notificationBadge) return;
    
    if (changelogRead) {
        notificationBadge.style.display = 'none';
    } else {
        notificationBadge.textContent = changelogData.length;
        notificationBadge.style.display = 'inline-flex';
    }
}

function createApiItem(api) {
    const apiItem = document.createElement('div');
    apiItem.className = 'api-item';
    
    const apiHeader = document.createElement('div');
    apiHeader.className = 'api-header';
    
    apiHeader.innerHTML = `
        <span class="api-method">${api.method}</span>
        <span class="api-title">${api.title}</span>
        <span class="api-status-badge ${api.status}">${api.status.toUpperCase()}</span>
    `;
    
    const apiDescription = document.createElement('div');
    apiDescription.className = 'api-description';
    apiDescription.style.display = 'none';
    
    apiDescription.innerHTML = `
        <p>${api.description}</p>
        <div class="api-endpoint">Endpoint: ${api.endpoint}</div>
        <div class="api-button-container">
            <button class="access-btn"><i class="fas fa-external-link-alt"></i> Access</button>
            <button class="copy-btn"><i class="far fa-copy"></i> Copy</button>
        </div>
    `;
    
    apiItem.appendChild(apiHeader);
    apiItem.appendChild(apiDescription);
    
    setupTryItFeature(apiItem, api.endpoint, api.title, api.parameters);
    
    apiDescription.querySelector('.access-btn').addEventListener('click', (e) => {
        e.stopPropagation();
        window.open(api.endpoint, '_blank');
    });
    
    apiDescription.querySelector('.copy-btn').addEventListener('click', (e) => {
        e.stopPropagation();
        navigator.clipboard.writeText(api.endpoint)
            .then(() => alert('Endpoint copied to clipboard!'))
            .catch(err => console.error('Copy failed:', err));
    });
    
    apiHeader.addEventListener('click', function(e) {
        if (e.target.closest('.try-it-btn, .api-status-badge')) return;
        
        if (currentlyOpenItem && currentlyOpenItem !== this.nextElementSibling) {
            currentlyOpenItem.style.display = 'none';
        }
        
        const description = this.nextElementSibling;
        description.style.display = description.style.display === 'none' ? 'block' : 'none';
        currentlyOpenItem = description.style.display === 'block' ? description : null;
    });
    
    return apiItem;
}

function updateStatistics() {
    let total = 0, online = 0, offline = 0;
    
    for (const category in apiData) {
        apiData[category].forEach(api => {
            total++;
            api.status === 'online' ? online++ : offline++;
        });
    }
    
    document.getElementById('total-endpoints').textContent = total;
    document.getElementById('online-endpoints').textContent = online;
    document.getElementById('offline-endpoints').textContent = offline;
}

function setupSearch() {
    const searchInput = document.getElementById('search-input');
    
    searchInput.addEventListener('input', () => {
        const term = searchInput.value.toLowerCase();
        
        document.querySelectorAll('.api-item').forEach(item => {
            const title = item.querySelector('.api-title').textContent.toLowerCase();
            const desc = item.querySelector('.api-description p').textContent.toLowerCase();
            item.style.display = (title.includes(term) || desc.includes(term)) ? 'block' : 'none';
        });
        
        document.querySelectorAll('.api-category').forEach(category => {
            const hasVisible = category.querySelector('.api-item[style="display: block;"]');
            category.style.display = hasVisible ? 'block' : 'none';
        });
    });
}

function setupCategoryMenu() {
    const menuBtn = document.querySelector('.menu-btn');
    const categoryPanel = document.querySelector('.category-panel');
    const closeBtn = document.querySelector('.close-btn');
    const categoryList = document.querySelector('.category-list');
    
    for (const category in apiData) {
        const link = document.createElement('a');
        link.className = 'category-link';
        link.href = `#${category}`;
        link.textContent = category;
        link.onclick = () => categoryPanel.classList.remove('active');
        categoryList.appendChild(link);
    }
    
    menuBtn.addEventListener('click', () => {
        categoryPanel.classList.toggle('active');
    });
    
    closeBtn.addEventListener('click', () => {
        categoryPanel.classList.remove('active');
    });
    
    document.addEventListener('click', (e) => {
        if (!categoryPanel.contains(e.target) && !menuBtn.contains(e.target)) {
            categoryPanel.classList.remove('active');
        }
    });
}

function setupThemeToggle() {
    const switchContainer = document.createElement('div');
    switchContainer.className = 'theme-switch-container';
    switchContainer.innerHTML = `
        <label class="theme-switch">
            <input type="checkbox" id="theme-toggle">
            <span class="slider">
                <i class="fas fa-sun icon sun-icon"></i>
                <i class="fas fa-moon icon moon-icon"></i>
            </span>
        </label>
    `;
    document.body.appendChild(switchContainer);
    
    const themeToggle = document.getElementById('theme-toggle');
    const isDarkMode = localStorage.getItem('darkMode') === 'true';
    
    if (isDarkMode) {
        document.body.classList.add('dark-theme');
        themeToggle.checked = true;
    }
    
    themeToggle.addEventListener('change', function() {
        if (this.checked) {
            document.body.classList.add('dark-theme');
            localStorage.setItem('darkMode', 'true');
        } else {
            document.body.classList.remove('dark-theme');
            localStorage.setItem('darkMode', 'false');
        }
    });
}

function loadApiData() {
    const apiCategoriesContainer = document.getElementById('api-categories');
    
    if (!apiData) {
        console.error('apiData is not defined!');
        return;
    }
    
    apiCategoriesContainer.innerHTML = '';
    
    const loadPromises = Object.keys(apiData).map(category => {
        return new Promise(resolve => {
            const apiCategory = document.createElement('div');
            apiCategory.className = 'api-category';
            apiCategory.id = category;
            
            const categoryTitle = document.createElement('h2');
            categoryTitle.textContent = category;
            
            const apiList = document.createElement('div');
            apiList.className = 'api-list';
            
            apiData[category].forEach(api => {
                apiList.appendChild(createApiItem(api));
            });
            
            apiCategory.appendChild(categoryTitle);
            apiCategory.appendChild(apiList);
            apiCategoriesContainer.appendChild(apiCategory);
            
            setTimeout(resolve, 50);
        });
    });
    
    Promise.all(loadPromises).then(() => {
        setupCategoryMenu();
        setupSearch();
        updateStatistics();
    });
}

document.addEventListener('DOMContentLoaded', () => {
    const loadingScreen = document.querySelector('.loading-screen');
    document.querySelector('.container').style.visibility = 'hidden';
    
    setupThemeToggle();
    
    // Setup changelog
    const changelogPopup = document.getElementById('changelogPopup');
    const showChangelogBtn = document.getElementById('showChangelog');
    const closePopup = document.querySelector('.close-popup');
    const markAsReadBtn = document.getElementById('markAsRead');
    
    loadChangelogData();
    
    // Show changelog popup
    showChangelogBtn.addEventListener('click', () => {
        changelogPopup.classList.add('active');
        changelogRead = true;
        localStorage.setItem('changelogRead', 'true');
        updateNotificationBadge();
    });
    
    // Close popup
    closePopup.addEventListener('click', () => {
        changelogPopup.classList.remove('active');
    });
    
    markAsReadBtn.addEventListener('click', () => {
        changelogPopup.classList.remove('active');
    });
    
    // Close popup when clicking outside
    changelogPopup.addEventListener('click', (e) => {
        if (e.target === changelogPopup) {
            changelogPopup.classList.remove('active');
        }
    });
    
    // API Modal setup
    const modal = document.getElementById('apiModal');
    modal.querySelector('.close-modal').addEventListener('click', () => {
        modal.classList.remove('active');
    });
    
    window.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.classList.remove('active');
        }
    });
    
    modal.querySelector('.send-btn').addEventListener('click', async () => {
        const method = modal.querySelector('.tester-method').value;
        let baseUrl = modal.querySelector('.tester-url').value;
        const params = modal.querySelectorAll('.param-input input');
        const responseStatus = modal.querySelector('.response-status');
        const responseTime = modal.querySelector('.response-time');
        const responseContent = modal.querySelector('.response-content');
        const loadingIndicator = modal.querySelector('.loading-indicator');
        
        const urlParams = new URLSearchParams();
        params.forEach(input => {
            if(input.value) urlParams.append(input.dataset.param, input.value);
        });
        
        const fullUrl = baseUrl + (urlParams.toString() ? `?${urlParams}` : '');
        
        responseContent.innerHTML = '';
        responseStatus.textContent = '';
        responseTime.textContent = '';
        loadingIndicator.style.display = 'flex';
        
        try {
            const startTime = Date.now();
            const response = await fetch(fullUrl, { 
                method,
                headers: { 'Accept': 'application/json, image/*' }
            });
            const responseTimeMs = Date.now() - startTime;
            
            responseTime.textContent = `${responseTimeMs}ms`;
            responseStatus.textContent = `${response.status} ${response.statusText}`;
            responseStatus.className = `response-status ${response.ok ? 'status-success' : 'status-error'}`;
            
            const contentType = response.headers.get('content-type') || '';
            
            if (contentType.includes('application/json')) {
                const data = await response.json();
                responseContent.innerHTML = `<pre>${syntaxHighlight(data)}</pre>`;
            } 
            else if (contentType.includes('image')) {
                const blob = await response.blob();
                const imgUrl = URL.createObjectURL(blob);
                responseContent.innerHTML = `
                    <div class="image-response">
                        <img src="${imgUrl}" class="api-image-response">
                        <button class="download-btn">
                            <i class="fas fa-download"></i> Download Image
                        </button>
                    </div>
                `;
                
                responseContent.querySelector('.download-btn').addEventListener('click', () => {
                    const a = document.createElement('a');
                    a.href = imgUrl;
                    a.download = `download-${Date.now()}.${blob.type.split('/')[1]}`;
                    document.body.appendChild(a);
                    a.click();
                    document.body.removeChild(a);
                });
            }
            else {
                const text = await response.text();
                responseContent.textContent = text;
            }
        } catch (error) {
            responseStatus.textContent = `Error: ${error.message}`;
            responseStatus.className = 'response-status status-error';
        } finally {
            loadingIndicator.style.display = 'none';
        }
    });
    
    // Load API data
    setTimeout(() => {
        loadApiData();
        
        setTimeout(() => {
            loadingScreen.classList.add('hidden');
            document.querySelector('.container').style.visibility = 'visible';
            
            loadingScreen.addEventListener('transitionend', () => {
                loadingScreen.remove();
            });
        }, 500);
    }, 100);
});