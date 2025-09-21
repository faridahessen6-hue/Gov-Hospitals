export function createCircleAnimation() {
  const container = document.getElementById('circle-container');
  if (!container) return;
  container.innerHTML = '';

  const mainCircle = document.createElement('div');
  mainCircle.id = 'main-circle';
  mainCircle.innerHTML = '<div><i class="bi bi-hospital" style="font-size: 2.5rem;"></i><div class="mt-2">Our Hospitals</div></div>';
  container.appendChild(mainCircle);

  const hospitals = [
    { name: 'مستشفي العام AL-3AM', icon: 'hospital', color: '#e74c3c', link: 'hospital.html?name=al3am' },
    { name: 'جامعة كفر الشيخ University', icon: 'building', color: '#3498db', link: 'hospital.html?name=al3am' },
    { name: 'مستشفي الكبد AL-KEBD', icon: 'activity', color: '#2ecc71', link: 'hospital.html?name=elkebd' },
    { name: 'مستشفي الرمد AL-RAMAD', icon: 'eye', color: '#9b59b6', link: 'hospital.html?name=elramad' },
    { name: 'العبورEL-3BOR', icon: 'building', color: '#1abc9c', link: 'hospital.html?name=al3am' },
    { name: 'مستشفي الجلدية ELGELDIA', icon: 'bandaid', color: '#e67e22', link: 'hospital.html?name=elgeldia' },
    { name: 'مستشفي الصدر AL-CHDAR', icon: 'heart-pulse', color: '#e74c3c', link: 'hospital.html?name=elsader' },
    { name: 'مستشفي الحميات AL-HIMYAT', icon: 'capsule', color: '#2c3e50', link: 'hospital.html?name=elhomiat' }
  ];

  const radius = Math.min(window.innerWidth, window.innerHeight) * 0.3;
  const centerX = container.offsetWidth / 2;
  const centerY = container.offsetHeight / 2;

  hospitals.forEach((hospital, index) => {
    const angle = (index / hospitals.length) * 2 * Math.PI - Math.PI / 2;
    const x = centerX + Math.cos(angle) * radius * 0.8;
    const y = centerY + Math.sin(angle) * radius * 0.8;

    const branch = document.createElement('div');
    branch.className = 'branch';
    branch.style.cssText = `
      position: absolute;
      left: ${x}px;
      top: ${y}px;
      transform: translate(-50%, -50%);
      opacity: 0;
      transition: all 0.6s ease-out;
      background: white;
      padding: 15px 20px;
      border-radius: 8px;
      box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
      text-align: center;
      width: 150px;
      border: 1px solid #eee;
      z-index: ${hospitals.length - index};
      transition: all 0.3s ease-out, transform 0.3s ease-out;
      transform-origin: center center;
      cursor: pointer;
      text-decoration: none;
      color: inherit;
      display: block;
    `;

    branch.addEventListener('click', (e) => {
      e.preventDefault();
      if (!hospital.link) return;
      
      // Show navigation options modal/dropdown
      showHospitalNavigationOptions(hospital, e);
    });

    branch.addEventListener('mouseenter', () => {
      branch.style.transform = 'translate(-50%, -50%) scale(1.1)';
      branch.style.boxShadow = '0 6px 20px rgba(0, 0, 0, 0.15)';
      branch.style.zIndex = hospitals.length + 1;
      branch.style.cursor = 'pointer';
    });

    branch.addEventListener('mouseleave', () => {
      branch.style.transform = 'translate(-50%, -50%) scale(1)';
      branch.style.boxShadow = '0 4px 15px rgba(0, 0, 0, 0.1)';
      branch.style.zIndex = hospitals.length - index;
    });

    branch.innerHTML = `
      <i class="bi bi-${hospital.icon}" style="color: ${hospital.color}; font-size: 1.2rem;"></i>
      <div style="margin-top: 5px; font-weight: 500;">${hospital.name}</div>
    `;

    const line = document.createElement('div');
    line.className = 'branch-line';
    line.style.cssText = `
      position: absolute;
      background: #003366;
      height: 4px;
      width: 0;
      transform-origin: left center;
      left: calc(50% - 100px);
      top: 50%;
      z-index: -1;
      opacity: 0.3;
    `;

    const lineLength = radius * 0.6;
    const lineAngle = Math.atan2(y - centerY, x - centerX);

    line.style.transform = `translate(100px, -1px) rotate(${lineAngle}rad)`;
    line.style.width = `${lineLength}px`;

    container.appendChild(line);
    container.appendChild(branch);

    setTimeout(() => {
      branch.style.opacity = '1';
      branch.style.transform = `translate(-50%, -50%) scale(1)`;
      line.style.width = `${lineLength}px`;
      line.style.opacity = '0.3';
    }, 500 + index * 150);
  });

  setTimeout(() => {
    mainCircle.style.transform = 'scale(1)';
    mainCircle.style.opacity = '1';
    }, 200);
}

// Show navigation options for hospital
function showHospitalNavigationOptions(hospital, event) {
  // Remove any existing modal
  const existing = document.getElementById('hospital-nav-modal');
  if (existing) existing.remove();
  
  // Extract hospital slug from link
  const hospitalSlug = hospital.link.match(/name=([^&]+)/)?.[1] || 'unknown';
  
  // Create modal
  const modal = document.createElement('div');
  modal.id = 'hospital-nav-modal';
  modal.className = 'modal fade show';
  modal.style.display = 'block';
  modal.style.backgroundColor = 'rgba(0,0,0,0.5)';
  
  modal.innerHTML = `
    <div class="modal-dialog modal-dialog-centered">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title">
            <i class="bi bi-${hospital.icon} me-2" style="color: ${hospital.color};"></i>
            ${hospital.name}
          </h5>
          <button type="button" class="btn-close" onclick="document.getElementById('hospital-nav-modal').remove()"></button>
        </div>
        <div class="modal-body">
          <p class="text-muted mb-4">Choose how you'd like to explore this hospital:</p>
          <div class="d-grid gap-3">
            <a href="${hospital.link}" class="btn btn-primary btn-lg">
              <i class="bi bi-hospital me-2"></i>
              Hospital Overview
              <small class="d-block text-white-50 mt-1">General information and services</small>
            </a>
            <a href="${hospital.link}&view=specialties" class="btn btn-outline-primary btn-lg">
              <i class="bi bi-grid me-2"></i>
              View Specialties
              <small class="d-block text-muted mt-1">Browse medical specialties and book appointments</small>
            </a>
          </div>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" onclick="document.getElementById('hospital-nav-modal').remove()">Cancel</button>
        </div>
      </div>
    </div>
  `;
  
  document.body.appendChild(modal);
  
  // Add click outside to close
  modal.addEventListener('click', (e) => {
    if (e.target === modal) {
      modal.remove();
    }
  });
  
  // Add navigation with loading
  modal.querySelectorAll('a[href]').forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      modal.remove();
      
      const spinner = document.createElement('div');
      spinner.className = 'position-fixed top-0 start-0 w-100 h-100 d-flex justify-content-center align-items-center';
      spinner.style.background = 'rgba(0, 0, 0, 0.7)';
      spinner.style.zIndex = '9999';
      spinner.innerHTML = `
        <div class="spinner-border text-light" style="width: 3rem; height: 3rem;" role="status">
          <span class="visually-hidden">Loading...</span>
        </div>
      `;
      document.body.appendChild(spinner);
      
      setTimeout(() => {
        window.location.href = link.href;
      }, 500);
    });
  });
}
