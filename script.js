// 專題數據，根據你的記憶條目進行調整
const projectsData = [
    {
        title: "角色控制系統",
        description: "設計具有獨特移動機制的角色控制系統，並解決右鍵功能問題。專注於精確的角色移動控制和互動機制。",
        category: "programming",
        tags: ["角色控制", "移動機制", "互動設計"],
        icon: "fas fa-gamepad",
        details: "這個專題專注於開發一個具有獨特移動機制的角色控制系統。系統包含精確的移動控制、互動機制，並成功排除了右鍵功能的相關問題。"
    },
    {
        title: "多模式軟體整合",
        description: "開發具有多種模式的軟體系統，實現不同模式間的無縫切換和整合功能。",
        category: "system",
        tags: ["模式切換", "系統整合", "軟體架構"],
        icon: "fas fa-cogs",
        details: "此專題涉及開發一個多模式軟體系統，能夠在不同操作模式間進行流暢切換，並實現各模式的有效整合。"
    },
    {
        title: "使用者介面精確控制",
        description: "對使用者介面元素進行精確控制，優化角色選擇和進度條功能，確保介面元素保持一致的縮放比例。",
        category: "ui",
        tags: ["介面設計", "精確控制", "縮放比例"],
        icon: "fas fa-desktop",
        details: "專注於使用者介面的精確控制，特別是角色選擇功能和進度條的優化，確保所有介面元素保持一致的縮放比例。"
    },
    {
        title: "即時監控系統",
        description: "使用print陳述句建立即時監控系統，提供程式執行狀態的即時回饋和紀錄功能。",
        category: "programming",
        tags: ["即時監控", "狀態紀錄", "除錯工具"],
        icon: "fas fa-chart-line",
        details: "開發一個基於print陳述句的即時監控系統，能夠提供程式執行狀態的即時回饋，便於開發過程中的監控和除錯。"
    }
];

// 頁面載入完成後執行
document.addEventListener('DOMContentLoaded', function() {
    initializeWebsite();
});

function initializeWebsite() {
    generateProjectCards();
    setupNavigation();
    setupProjectFilters();
    setupMobileMenu();
    setupScrollEffects();
}

// 生成專題卡片
function generateProjectCards() {
    const projectsGrid = document.getElementById('projectsGrid');
    
    projectsData.forEach(project => {
        const projectCard = document.createElement('div');
        projectCard.className = `project-card ${project.category}`;
        
        projectCard.innerHTML = `
            <div class="project-icon">
                <i class="${project.icon}"></i>
            </div>
            <h3>${project.title}</h3>
            <p>${project.description}</p>
            <div class="project-tags">
                ${project.tags.map(tag => `<span class="project-tag">${tag}</span>`).join('')}
            </div>
        `;
        
        projectCard.addEventListener('click', () => {
            showProjectModal(project);
        });
        
        projectsGrid.appendChild(projectCard);
    });
}

// 設置導航功能
function setupNavigation() {
    const navItems = document.querySelectorAll('.nav-item');
    
    navItems.forEach(item => {
        item.addEventListener('click', function(e) {
            e.preventDefault();
            
            // 移除所有active類別
            navItems.forEach(nav => nav.classList.remove('active'));
            // 添加active類別到當前項目
            this.classList.add('active');
            
            const targetId = this.getAttribute('href').substring(1);
            scrollToSection(targetId);
        });
    });
}

// 設置專題篩選功能
function setupProjectFilters() {
    const filterBtns = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.project-card');
    
    filterBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            // 移除所有active類別
            filterBtns.forEach(filterBtn => filterBtn.classList.remove('active'));
            // 添加active類別到當前按鈕
            this.classList.add('active');
            
            const filterValue = this.getAttribute('data-filter');
            
            projectCards.forEach(card => {
                if (filterValue === 'all' || card.classList.contains(filterValue)) {
                    card.style.display = 'block';
                    card.style.animation = 'fadeInUp 0.5s ease';
                } else {
                    card.style.display = 'none';
                }
            });
        });
    });
}

// 設置手機版選單
function setupMobileMenu() {
    const menuToggle = document.getElementById('menuToggle');
    const sidebar = document.querySelector('.sidebar');
    
    menuToggle.addEventListener('click', function() {
        sidebar.classList.toggle('active');
    });
    
    // 點擊主要內容區域時關閉選單
    document.querySelector('.main-content').addEventListener('click', function() {
        sidebar.classList.remove('active');
    });
}

// 設置滾動效果
function setupScrollEffects() {
    window.addEventListener('scroll', function() {
        updateActiveNavigation();
        animateOnScroll();
    });
}

// 更新導航狀態
function updateActiveNavigation() {
    const sections = document.querySelectorAll('section[id]');
    const navItems = document.querySelectorAll('.nav-item');
    
    let currentSection = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop - 100;
        const sectionHeight = section.offsetHeight;
        
        if (window.pageYOffset >= sectionTop && window.pageYOffset < sectionTop + sectionHeight) {
            currentSection = section.getAttribute('id');
        }
    });
    
    navItems.forEach(item => {
        item.classList.remove('active');
        if (item.getAttribute('href') === `#${currentSection}`) {
            item.classList.add('active');
        }
    });
}

// 滾動動畫
function animateOnScroll() {
    const elements = document.querySelectorAll('.project-card, .skill-item, .timeline-item, .contact-card');
    
    elements.forEach(element => {
        const elementTop = element.getBoundingClientRect().top;
        const elementVisible = 150;
        
        if (elementTop < window.innerHeight - elementVisible) {
            element.style.opacity = '1';
            element.style.transform = 'translateY(0)';
        }
    });
}

// 滾動到指定區塊
function scrollToSection(sectionId) {
    const targetSection = document.getElementById(sectionId);
    if (targetSection) {
        const offsetTop = targetSection.offsetTop - 50;
        window.scrollTo({
            top: offsetTop,
            behavior: 'smooth'
        });
    }
}

// 顯示專題詳細資訊模態視窗
function showProjectModal(project) {
    const modal = document.createElement('div');
    modal.className = 'modal';
    modal.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(15, 23, 42, 0.9);
        display: flex;
        justify-content: center;
        align-items: center;
        z-index: 2000;
        backdrop-filter: blur(10px);
    `;
    
    const modalContent = document.createElement('div');
    modalContent.style.cssText = `
        background: var(--bg-card);
        border: 1px solid var(--border-color);
        padding: 3rem;
        border-radius: 20px;
        max-width: 600px;
        max-height: 80vh;
        overflow-y: auto;
        position: relative;
        box-shadow: var(--shadow);
    `;
    
    modalContent.innerHTML = `
        <button class="close-btn" style="
            position: absolute;
            top: 1rem;
            right: 1rem;
            background: none;
            border: none;
            color: var(--text-secondary);
            font-size: 1.5rem;
            cursor: pointer;
            width: 40px;
            height: 40px;
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            transition: all 0.3s ease;
        " onmouseover="this.style.background='var(--primary-color)'; this.style.color='white';" 
           onmouseout="this.style.background='none'; this.style.color='var(--text-secondary)';">
            <i class="fas fa-times"></i>
        </button>
        <div class="project-icon" style="margin-bottom: 2rem;">
            <i class="${project.icon}"></i>
        </div>
        <h2 style="color: var(--text-primary); margin-bottom: 1rem;">${project.title}</h2>
        <p style="color: var(--text-secondary); margin-bottom: 2rem; line-height: 1.6;">${project.description}</p>
        <div style="margin-bottom: 2rem;">
            ${project.tags.map(tag => `<span class="project-tag">${tag}</span>`).join('')}
        </div>
        <div>
            <h3 style="color: var(--text-primary); margin-bottom: 1rem;">專題詳情</h3>
            <p style="color: var(--text-secondary); line-height: 1.6;">${project.details}</p>
        </div>
    `;
    
    modal.appendChild(modalContent);
    document.body.appendChild(modal);
    
    // 關閉模態視窗
    const closeBtn = modalContent.querySelector('.close-btn');
    closeBtn.addEventListener('click', () => {
        document.body.removeChild(modal);
    });
    
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            document.body.removeChild(modal);
        }
    });
}

// 初始化動畫樣式
document.addEventListener('DOMContentLoaded', function() {
    const style = document.createElement('style');
    style.textContent = `
        .project-card, .skill-item, .timeline-item, .contact-card {
            opacity: 0;
            transform: translateY(30px);
            transition: opacity 0.6s ease, transform 0.6s ease;
        }
        
        @keyframes fadeInUp {
            from {
                opacity: 0;
                transform: translateY(30px);
            }
            to {
                opacity: 1;
                transform: translateY(0);
            }
        }
    `;
    document.head.appendChild(style);
});
