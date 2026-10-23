/* ============================================================
   PC Supportnet — Landing Page (script.js)
   ============================================================ */

document.addEventListener("DOMContentLoaded", () => {
  /* ---------- Año dinámico en el footer ---------- */
  const yearEl = document.getElementById("year");
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  /* ---------- Menú móvil (hamburguesa) ---------- */
  const toggle = document.getElementById("nav-toggle");
  const menu = document.getElementById("nav-menu");

  if (toggle && menu) {
    toggle.addEventListener("click", () => {
      menu.classList.toggle("show");
      toggle.classList.toggle("active");
    });

    // Cerrar el menú al hacer clic en un enlace
    menu.querySelectorAll(".nav__link").forEach((link) => {
      link.addEventListener("click", () => {
        menu.classList.remove("show");
        toggle.classList.remove("active");
      });
    });
  }

  /* ---------- Resaltar enlace activo según el scroll ---------- */
  const sections = document.querySelectorAll("section[id]");
  const navLinks = document.querySelectorAll(".nav__link");

  const highlightOnScroll = () => {
    const scrollY = window.scrollY + 120;

    sections.forEach((section) => {
      const top = section.offsetTop;
      const height = section.offsetHeight;
      const id = section.getAttribute("id");

      if (scrollY >= top && scrollY < top + height) {
        navLinks.forEach((link) => {
          link.classList.remove("active");
          if (link.getAttribute("href") === `#${id}`) {
            link.classList.add("active");
          }
        });
      }
    });
  };

  window.addEventListener("scroll", highlightOnScroll);

  /* ---------- Animaciones de aparición al hacer scroll ---------- */
  const revealTargets = document.querySelectorAll(
    ".card, .step, .testimonial, .feature, .why__box, .contact__form"
  );

  revealTargets.forEach((el) => el.classList.add("reveal"));

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.15 }
  );

  revealTargets.forEach((el) => observer.observe(el));

  /* ---------- Hoja flotante de servicios (modal) ---------- */
  const SERVICES = {
    "svc-cctv": {
      icon: "img/icon-cctv.png",
      iconImg: true,
      title: "Videovigilancia CCTV",
      img: "img/svc-cctv.jpg",
      desc: "Implementamos plataformas de videovigilancia de alta definición que otorgan visibilidad total sobre instalaciones, activos y flujo de personas. Nuestras soluciones integran grabación digital, analítica de eventos y acceso remoto seguro, permitiendo supervisar múltiples sedes desde una sola consola con estándares de seguridad de la información.",
      items: [
        "Arquitecturas IP y analógicas en alta definición",
        "Cámaras perimetrales, domos y controladores PTZ",
        "Grabación digital DVR / NVR con redundancia",
        "Analítica de video y detección inteligente de eventos",
        "Monitoreo remoto seguro desde cualquier ubicación",
        "Integración con sistemas de control de acceso y alarmas"
      ],
      wa: "Videovigilancia%20CCTV"
    },
    "svc-alarmas": {
      icon: "img/icon-alarmas.png",
      iconImg: true,
      title: "Sistemas de alarma de intrusión y detección",
      img: "img/svc-alarmas.jpg",
      desc: "Desplegamos sistemas de detección electrónica de intrusos diseñados para salvaguardar operaciones críticas. Ante un evento de intrusión, la plataforma activa respuestas automatizadas conforme al protocolo definido: sirenas, iluminación, notificación a Central de Monitoreo o escalamiento mediante alertas por correo electrónico y mensajería.",
      items: [
        "Centrales de alarma convencionales y direccionables",
        "Teclados, mandos remotos y control por aplicación",
        "Sistemas cableados e inalámbricos",
        "Barreras y sensores infrarrojos multicriterio",
        "Detección perimetral e interior",
        "Notificación automatizada a Central de Monitoreo, SMS y correo"
      ],
      wa: "Sistemas%20de%20intrusi%C3%B3n"
    },
    "svc-redes": {
      icon: "img/icon-redes.png",
      iconImg: true,
      title: "Infraestructura de red y Data Center",
      img: "img/svc-redes.jpg",
      desc: "El Data Center es un activo estratégico: colaboradores, socios y clientes dependen de su información para operar. Diseñamos e implementamos infraestructura de red cableada e inalámbrica con cableado estructurado, segmentación y configuración de conectividad, garantizando disponibilidad, rendimiento y resguardo de la información.",
      items: [
        "Estudio topológico y dimensionamiento de la red",
        "Cableado estructurado, canalización, jacks y plugs RJ-45",
        "Switching, routing y access points de nivel empresarial",
        "Segmentación de red y políticas de seguridad",
        "Configuración de conectividad e Internet",
        "Resguardo de información y prevención de pérdidas"
      ],
      wa: "Infraestructura%20de%20red"
    },
    "svc-soporte": {
      icon: "img/icon-soporte.png",
      iconImg: true,
      title: "Soporte técnico y equipamiento TI",
      img: "img/svc-soporte.jpg",
      desc: "Ofrecemos servicios de soporte y mantenimiento con atención personalizada y tiempos de respuesta comprometidos, disponibles en sitio o en laboratorio con retiro y entrega sin costo. Resolvemos incidencias de software y hardware, recuperación de datos y remediación de amenazas, además de suministrar equipamiento corporativo con garantía extendida.",
      items: [
        "Revisión, diagnóstico y cotización de repuestos",
        "Instalación de software y hardware",
        "Remediación de malware y programas espías",
        "Recuperación de datos y esquemas de respaldo",
        "Suministro de equipamiento con garantía de 12 meses o más",
        "Entrega instalado, configurado y funcionando"
      ],
      wa: "Soporte%20t%C3%A9cnico"
    },
    "svc-acceso": {
      icon: "img/icon-acceso.png",
      iconImg: true,
      title: "Control de acceso",
      img: "img/svc-acceso.jpg",
      desc: "Soluciones de control de acceso para corporativos e instalaciones industriales que permiten gestionar de forma centralizada quién, cuándo y dónde puede ingresar. Integramos autenticación biométrica, credenciales y barreras vehiculares para resguardar áreas críticas y mantener trazabilidad completa de los accesos.",
      items: [
        "Biometría por huella digital y reconocimiento facial",
        "Credenciales de proximidad y de lectura",
        "Control inalámbrico e integración con redes IP",
        "Cerraduras electromagnéticas y automatización de accesos",
        "Barreras vehiculares y control de casetas",
        "Gestión centralizada y bitácoras de acceso"
      ],
      wa: "Control%20de%20acceso"
    },
    "svc-mantenimiento": {
      icon: "img/icon-mantenimiento.png",
      iconImg: true,
      title: "Mantenimiento y continuidad operativa",
      img: "img/svc-mantenimiento.jpg",
      desc: "La operación ininterrumpida del parque informático es indispensable para la continuidad del negocio. Implementamos programas de mantenimiento preventivo y correctivo que anticipan fallas, optimizan el rendimiento y prolongan la vida útil del equipamiento, con planes adaptados a la criticidad de cada organización.",
      items: [
        "Mantenimiento preventivo programado",
        "Diagnóstico integral de hardware y componentes",
        "Servicio a sistemas de enfriamiento y fuentes de poder",
        "Limpieza técnica y lubricación de mecanismos",
        "Actualización de firmware, controladores y sistema operativo",
        "Remediación de malware y actualización de antivirus"
      ],
      wa: "Mantenimiento%20y%20continuidad"
    }
  };

  const modal = document.getElementById("service-modal");
  const modalImg = document.getElementById("modal-img");
  const modalIcon = document.getElementById("modal-icon");
  const modalTitle = document.getElementById("modal-title");
  const modalDesc = document.getElementById("modal-desc");
  const modalList = document.getElementById("modal-list");
  const modalWa = document.getElementById("modal-wa");

  const openModal = (key) => {
    const svc = SERVICES[key];
    if (!svc || !modal) return;

    modalImg.src = svc.img;
    modalImg.alt = svc.title;
    if (svc.iconImg) {
      modalIcon.innerHTML = `<img src="${svc.icon}" alt="" class="modal__icon-img" />`;
    } else {
      modalIcon.textContent = svc.icon;
    }
    modalTitle.textContent = svc.title;
    modalDesc.textContent = svc.desc;

    modalList.innerHTML = "";
    svc.items.forEach((item) => {
      const li = document.createElement("li");
      li.textContent = item;
      modalList.appendChild(li);
    });

    if (modalWa) {
      modalWa.href = `https://wa.me/525546117215?text=Hola%20PC%20Supportnet%2C%20me%20interesa%20el%20servicio%20de%20${svc.wa}.`;
    }

    modal.classList.add("open");
    modal.setAttribute("aria-hidden", "false");
    document.body.classList.add("modal-open");
  };

  const closeModal = () => {
    if (!modal) return;
    modal.classList.remove("open");
    modal.setAttribute("aria-hidden", "true");
    document.body.classList.remove("modal-open");
  };

  // Abrir desde tarjetas de servicio (clic y teclado)
  document.querySelectorAll("[data-modal]").forEach((card) => {
    card.addEventListener("click", () => openModal(card.dataset.modal));
    card.addEventListener("keydown", (e) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        openModal(card.dataset.modal);
      }
    });
  });

  // Cerrar: botón, backdrop, o tecla Escape
  if (modal) {
    modal.querySelectorAll("[data-close]").forEach((el) => {
      el.addEventListener("click", closeModal);
    });
  }

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") closeModal();
  });

  /* ---------- Formulario de contacto (FormSubmit.co) ---------- */
  const form = document.getElementById("contact-form");
  const note = document.getElementById("form-note");

  if (form && note) {
    // Validación en el navegador: si todo está correcto, se envía de verdad
    // a FormSubmit (action del formulario). Si falta algo, se detiene.
    form.addEventListener("submit", (e) => {
      const nombre = form.querySelector("#nombre").value.trim();
      const email = form.querySelector("#email").value.trim();
      const mensaje = form.querySelector("#mensaje").value.trim();

      if (!nombre || !email || !mensaje) {
        e.preventDefault();
        note.style.color = "#e5534b";
        note.textContent = "Por favor completa los campos obligatorios.";
        return;
      }

      // Mostrar estado de envío mientras FormSubmit procesa
      note.style.color = "#5bc9ba";
      note.textContent = "Enviando su mensaje...";
    });

    // Mensaje de confirmación tras regresar del envío (?enviado=1)
    if (window.location.search.indexOf("enviado=1") !== -1) {
      note.style.color = "#5bc9ba";
      note.textContent = "¡Gracias! Su mensaje fue enviado. Le contactaremos pronto.";
      form.reset();
      setTimeout(() => {
        note.textContent = "";
      }, 8000);
    }
  }
});
