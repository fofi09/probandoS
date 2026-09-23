document.addEventListener('DOMContentLoaded', () => {
    // Dynamic Category Filter for Pills
    const filterBtns = document.querySelectorAll('.filter-btn');
    const techPills = document.querySelectorAll('.tech-pill');

    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            // Update active state on filter buttons
            filterBtns.forEach(b => {
                b.classList.remove('active', 'bg-white', 'dark:bg-slate-800', 'text-slate-900', 'dark:text-white', 'shadow-sm');
                b.classList.add('text-slate-600', 'dark:text-slate-400');
            });

            btn.classList.add('active', 'bg-white', 'dark:bg-slate-800', 'text-slate-900', 'dark:text-white', 'shadow-sm');
            btn.classList.remove('text-slate-600', 'dark:text-slate-400');

            const selectedCategory = btn.getAttribute('data-category');

            techPills.forEach(pill => {
                const pillCategory = pill.getAttribute('data-category');
                if (selectedCategory === 'all' || pillCategory === selectedCategory) {
                    pill.style.display = 'flex';
                } else {
                    pill.style.display = 'none';
                }
            });
        });
    });
});