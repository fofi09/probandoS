// ------------------------------------
// Lógica del Menú Hamburguesa
// ------------------------------------
const menuToggle = document.getElementById('menu-toggle');
const dropdownMenu = document.getElementById('dropdown-menu');

menuToggle.addEventListener('click', (e) => {
  e.stopPropagation(); 
  dropdownMenu.classList.toggle('active');
  menuToggle.classList.toggle('active'); 
});

document.addEventListener('click', (e) => {
  if (!dropdownMenu.contains(e.target) && !menuToggle.contains(e.target)) {
    dropdownMenu.classList.remove('active');
    menuToggle.classList.remove('active');
  }
});

window.addEventListener('scroll', () => {
  if (dropdownMenu.classList.contains('active')) {
    dropdownMenu.classList.remove('active');
    menuToggle.classList.remove('active');
  }
}, { passive: true });

document.querySelector('.hero-section').addEventListener('scroll', () => {
  if (dropdownMenu.classList.contains('active')) {
    dropdownMenu.classList.remove('active');
    menuToggle.classList.remove('active');
  }
}, { passive: true });


// ------------------------------------
// Animación de la chica (Click manual)
// ------------------------------------
const container = document.getElementById('sofia-container');
const arm = document.getElementById('left_x5F_arm_2_');

container.style.cursor = 'pointer';

container.addEventListener('click', () => {
  arm.style.animation = 'none';
  
  requestAnimationFrame(() => {
    requestAnimationFrame(() => {
      arm.style.animation = 'waveAnimation 0.7s ease-in-out 0s 4 forwards';
    });
  });
});


// ------------------------------------
// Loader y Vuelo del Corazón
// ------------------------------------
window.addEventListener('load', () => {
    document.body.style.overflow = 'hidden';

    setTimeout(() => {
        const loaderWrapper = document.getElementById('loader-wrapper');
        const moverDiv = document.getElementById('loader-heart-mover');
        const targetHeart = document.querySelector('.title-heart');

        requestAnimationFrame(() => {
            const targetRect = targetHeart.getBoundingClientRect();
            const moverRect = moverDiv.getBoundingClientRect();

            const scale = targetRect.width / moverRect.width;

            const targetCenterX = targetRect.left + (targetRect.width / 2);
            const targetCenterY = targetRect.top + (targetRect.height / 2);
            const moverCenterX = moverRect.left + (moverRect.width / 2);
            const moverCenterY = moverRect.top + (moverRect.height / 2);

            const deltaX = targetCenterX - moverCenterX;
            const deltaY = targetCenterY - moverCenterY;

            moverDiv.style.transition = 'transform 1.2s cubic-bezier(0.76, 0, 0.24, 1)';
            moverDiv.style.transform = `translate(${deltaX}px, ${deltaY}px) scale(${scale})`;

            loaderWrapper.style.transition = 'background-color 1s ease';
            loaderWrapper.style.backgroundColor = 'transparent';

            setTimeout(() => {
                targetHeart.style.opacity = '1'; 
                loaderWrapper.remove(); 
                document.body.style.overflow = ''; 
                
                arm.style.animation = 'waveAnimation 0.7s ease-in-out 0s 4 forwards';

            }, 1200); 
        });
    }, 4300); 
});


// ------------------------------------
// Lógica de Proyectos (Carpeta)
// ------------------------------------
const projects = [
    {
      id: 1,
      title: "E-Commerce App",
      category: "Desarrollo Web",
      image: "https://images.unsplash.com/photo-1555774698-0b77e0d5fac6?auto=format&fit=crop&q=80&w=600&h=400",
      description: "Plataforma completa de ventas con carrito, pasarela de pago y panel de administrador. Optimizada para conversión. Esta aplicación cuenta con un sistema robusto de gestión de inventario en tiempo real, múltiples métodos de pago integrados de forma segura, y un panel de control intuitivo para revisar estadísticas de ventas diarias, semanales y mensuales. Todo construido con las mejores prácticas de rendimiento para una experiencia ultra rápida."
    },
    {
      id: 2,
      title: "Dashboard Analítico",
      category: "UX/UI Design",
      image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=600&h=400",
      description: "Interfaz de usuario para análisis de datos en tiempo real. Diseño limpio, modo oscuro y gráficos interactivos. Incluye exportación de reportes en PDF y Excel, integración con múltiples APIs de terceros para centralizar la información empresarial, y un sistema de alertas personalizadas para notificar a los usuarios sobre métricas críticas y variaciones inesperadas en sus KPIs clave a lo largo del día."
    },
    {
      id: 3,
      title: "App de Delivery",
      category: "Mobile App",
      image: "https://images.unsplash.com/photo-1526628953301-3e589a6a8b74?auto=format&fit=crop&q=80&w=600&h=400",
      description: "Aplicación móvil para pedir comida con seguimiento GPS en tiempo real y sistema de fidelización de clientes. Permite a los restaurantes gestionar sus pedidos de manera eficiente, ofrece a los repartidores una ruta optimizada para las entregas, e incluye un chat integrado para comunicación directa entre el cliente y el conductor durante todo el trayecto hasta la puerta de tu casa. Una solución verdaderamente integral."
    }
  ];

  let activeIndex = 0;
  let touchStart = null;
  let touchEnd = null;
  let isTrackpadScrolling = false;
  let isEntering = false; 
  let hasStartedEntry = false; 

  const cardsContainer = document.getElementById('cards-container');
  const dotsContainer = document.getElementById('dots-container');
  const folderContainer = document.getElementById('folder-container');

  projects.forEach((project, index) => {
    const card = document.createElement('div');
    
    card.className = "card-item absolute top-[10%] left-0 right-0 mx-auto w-[90%] h-[95%] bg-white rounded-xl shadow-lg flex flex-col overflow-hidden border border-gray-100 will-change-transform";
    const randomRot = Math.random() * 30 - 15; 
    card.style.cssText = `transform: translateY(-800px) rotate(${randomRot}deg) scale(0.5); opacity: 0; transition: none; will-change: transform, opacity;`;

    card.innerHTML = `
      <div class="h-[45%] shrink-0 w-full bg-gray-200 relative overflow-hidden">
        <img 
          src="${project.image}" 
          alt="${project.title}" 
          loading="lazy"
          decoding="async"
          class="w-full h-full object-cover transition-transform duration-700 hover:scale-110"
        />
        <div class="absolute top-2 right-2 bg-white/90 backdrop-blur-sm px-2 py-1 rounded-md text-[10px] font-bold text-gray-700 tracking-wider uppercase">
          ${project.category}
        </div>
      </div>

      <div class="card-content p-4 flex flex-col flex-grow transition-opacity duration-300 delay-100 opacity-0 overflow-y-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        <div class="flex items-center justify-between gap-2 mb-2 shrink-0">
          <h3 class="text-xl font-bold text-gray-800 leading-tight">${project.title}</h3>
          <a href="https://www.google.com" class="flex items-center gap-1 text-sm font-bold text-black hover:opacity-70 transition-opacity shrink-0 cursor-pointer">
            Ver <i data-lucide="external-link" class="w-4 h-4"></i>
          </a>
        </div>

        <p class="text-gray-500 text-sm flex-grow mb-3">
          ${project.description}
        </p>
        <button class="mt-auto shrink-0 w-full opacity-0 py-2 rounded-lg text-sm font-medium flex items-center justify-center gap-2 pointer-events-none">
          Ver Proyecto <i data-lucide="external-link" class="w-3.5 h-3.5"></i>
        </button>
      </div>
    `;
    cardsContainer.appendChild(card);

    const dot = document.createElement('div');
    dot.className = "dot-item rounded-full transition-all duration-300 cursor-pointer bg-gray-300 w-6 h-2";
    dot.onclick = () => { if(hasStartedEntry) setActiveIndex(index); };
    dotsContainer.appendChild(dot);
  });

  const cardElements = cardsContainer.querySelectorAll('.card-item');
  const dotElements = dotsContainer.querySelectorAll('.dot-item');

  function render() {
    if (!hasStartedEntry) return;

    requestAnimationFrame(() => {
      projects.forEach((_, index) => {
        const isActive = index === activeIndex;
        let offset = index - activeIndex;
        
        if (offset === projects.length - 1) offset = -1;
        if (offset === -(projects.length - 1)) offset = 1;

        let transformStyle = '';
        if (isActive) {
          transformStyle = 'transform: translateY(-55%) scale(1); z-index: 25; opacity: 1;';
        } else if (offset === 1) {
          transformStyle = 'transform: translateX(12%) translateY(-15%) scale(0.9) rotate(2deg); z-index: 15; opacity: 0.9;';
        } else if (offset === -1) {
          transformStyle = 'transform: translateX(-12%) translateY(-15%) scale(0.9) rotate(-2deg); z-index: 15; opacity: 0.9;';
        } else {
          transformStyle = 'transform: translateY(0%) scale(0.8); z-index: 5; opacity: 0;';
        }

        let transitionStyle = '';
        if (isEntering) {
          transitionStyle = `transition: transform 1.5s cubic-bezier(0.34, 1.1, 0.64, 1) ${index * 0.3}s, opacity 1.5s cubic-bezier(0.34, 1.1, 0.64, 1) ${index * 0.3}s;`;
        } else {
          transitionStyle = `transition: transform 0.5s ease-out, opacity 0.5s ease-out;`;
        }

        cardElements[index].style.cssText = transformStyle + transitionStyle + ' will-change: transform, opacity;';

        const contentDiv = cardElements[index].querySelector('.card-content');
        if (isActive) {
          contentDiv.classList.remove('opacity-0');
          contentDiv.classList.add('opacity-100');
        } else {
          contentDiv.classList.remove('opacity-100');
          contentDiv.classList.add('opacity-0');
        }

        dotElements[index].className = `dot-item rounded-full transition-all duration-300 cursor-pointer ${
          isActive ? 'bg-[#FF91B4] w-12 h-2' : 'bg-gray-300 w-6 h-2'
        }`;
      });
    });
  }

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting && !hasStartedEntry) {
        hasStartedEntry = true;
        isEntering = true;
        
        setTimeout(() => {
          render();
          setTimeout(() => {
            isEntering = false;
          }, 2500);
        }, 200);
      }
    });
  }, { threshold: 0.5 }); 

  observer.observe(document.getElementById('folder-container'));

  window.setActiveIndex = function(index) {
    if(!hasStartedEntry) return;
    activeIndex = index;
    render();
  };

  function nextProject() {
    if(!hasStartedEntry || isEntering) return;
    activeIndex = activeIndex === projects.length - 1 ? 0 : activeIndex + 1;
    render();
  }

  function prevProject() {
    if(!hasStartedEntry || isEntering) return;
    activeIndex = activeIndex === 0 ? projects.length - 1 : activeIndex - 1;
    render();
  }

  folderContainer.addEventListener('click', (e) => {
    if (!hasStartedEntry || isEntering || e.target.closest('button') || e.target.closest('a')) return;
    const rect = folderContainer.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const width = rect.width;
    if (clickX < width * 0.30) {
      prevProject();
    } else if (clickX > width * 0.70) {
      nextProject();
    }
  });

  folderContainer.addEventListener('touchstart', (e) => {
    if(!hasStartedEntry) return;
    touchStart = e.targetTouches[0].clientX;
    touchEnd = null;
  }, { passive: true });

  folderContainer.addEventListener('touchmove', (e) => {
    if(!hasStartedEntry) return;
    touchEnd = e.targetTouches[0].clientX;
  }, { passive: true });

  folderContainer.addEventListener('touchend', () => {
    if (!touchStart || !touchEnd || !hasStartedEntry || isEntering) return;
    const distance = touchStart - touchEnd;
    const threshold = 35; 
    
    if (distance > threshold) {
      nextProject(); 
    } else if (distance < -threshold) {
      prevProject(); 
    }
  });

  folderContainer.addEventListener('wheel', (e) => {
    if (isTrackpadScrolling || !hasStartedEntry || isEntering) return;

    if (Math.abs(e.deltaX) > Math.abs(e.deltaY) && Math.abs(e.deltaX) > 15) {
      isTrackpadScrolling = true;
      if (e.deltaX > 0) {
        nextProject();
      } else {
        prevProject();
      }
      setTimeout(() => { isTrackpadScrolling = false; }, 500); 
    }
  }, { passive: true });

  lucide.createIcons();