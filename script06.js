document.addEventListener('DOMContentLoaded', function() {
    // Variables de estado - filtro inicial Archivados
    let currentFilter = null;
    let currentLanguage = 'all';
    
    // Inicializar menú de repositorios
    const initRepoMenu = () => {
        const menuItems = document.querySelectorAll('.repositories-menu a');
        
        menuItems.forEach(item => {
            item.addEventListener('click', function(e) {
                e.preventDefault();
                
                // Actualizar estado activo
                menuItems.forEach(i => i.classList.remove('active'));
                this.classList.add('active');
                
                // Actualizar filtro
                currentFilter = this.textContent.trim().toLowerCase();
                applyFilters();
            });
        });
        
        // Aplicar filtro inicial (Archivados)
        applyFilters();
    };
    
    // Aplicar filtros combinados
    const applyFilters = () => {
        const repos = document.querySelectorAll('.repository-item');
        
        repos.forEach(repo => {
            const repoLang = (repo.dataset.language || '').toLowerCase();
            
            // Lógica de filtrado para las 6 categorías
            const typeMatch = 
                (currentFilter === 'inicio'    && repo.classList.contains('archived')) ||
                (currentFilter === 'me-bti'    && repo.classList.contains('mirror')) ||
                (currentFilter === 'ministerio de educación' && repo.classList.contains('template')) ||
                (currentFilter === 'backups'   && repo.classList.contains('backup')) ||
                (currentFilter === 'librerías' && repo.classList.contains('library')) ||
                (currentFilter === 'enlaces'   && repo.classList.contains('plugin'));
            
            const langMatch = currentLanguage === 'all' || repoLang === currentLanguage;
            
            repo.style.display = (typeMatch && langMatch) ? 'flex' : 'none';
        });
    };
    
     // Inicializar
    initRepoMenu();
    loadRepositories();
});
