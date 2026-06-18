
document.addEventListener("DOMContentLoaded", () => {

  /* ─── DATA ─── */
  const cars = [
    {
      id: 1,
      name: "Honda Civic",
      type: "Sedan",
      status: "available",
      price: "₹1,800",
      fuel: "Petrol · 18 km/l",
      seats: "5 Seats",
      transmission: "Manual",
      info: "A reliable and fuel-efficient sedan perfect for city drives and daily commutes. Smooth ride, great mileage."
    },
    {
      id: 2,
      name: "Toyota Fortuner",
      type: "SUV",
      status: "rented",
      price: "₹4,500",
      fuel: "Diesel · 14 km/l",
      seats: "7 Seats",
      transmission: "Automatic",
      info: "A rugged and powerful SUV ideal for off-road adventures, family trips, and long highway drives."
    },
    {
      id: 3,
      name: "Maruti Swift",
      type: "Hatchback",
      status: "available",
      price: "₹1,200",
      fuel: "Petrol · 22 km/l",
      seats: "5 Seats",
      transmission: "Manual",
      info: "Compact and agile, the Swift is best suited for quick city errands and tight parking spots."
    },
    {
      id: 4,
      name: "Hyundai Creta",
      type: "Crossover SUV",
      status: "available",
      price: "₹2,800",
      fuel: "Petrol · 16 km/l",
      seats: "5 Seats",
      transmission: "Automatic",
      info: "A stylish and feature-packed crossover that blends comfort, technology, and performance seamlessly."
    },
    {
      id: 5,
      name: "Tata Nexon",
      type: "Compact SUV",
      status: "available",
      price: "₹2,200",
      fuel: "Petrol · 17 km/l",
      seats: "5 Seats",
      transmission: "Manual",
      info: "India's 5-star safety rated SUV. Perfect for families who want safety, space, and style."
    },
    {
      id: 6,
      name: "Mahindra Scorpio",
      type: "SUV",
      status: "rented",
      price: "₹3,500",
      fuel: "Diesel · 13 km/l",
      seats: "7 Seats",
      transmission: "Manual",
      info: "Bold, powerful, and commanding on the road — the Scorpio is built for those who mean business."
    }
  ];

  let currentFilter = "all";
  let selectedCarId = null;

  /* ─── NAVBAR SCROLL ─── */
  const navbar = document.getElementById("navbar");
  window.addEventListener("scroll", () => {
    navbar.classList.toggle("scrolled", window.scrollY > 40);
  });

  /* ─── SMOOTH NAV LINKS ─── */
  document.querySelectorAll(".nav-link, .logo").forEach(link => {
    link.addEventListener("click", e => {
      const href = link.getAttribute("href");
      if (!href || !href.startsWith("#")) return;
      e.preventDefault();
      const target = document.getElementById(href.substring(1));
      if (target) target.scrollIntoView({ behavior: "smooth" });

      document.querySelectorAll(".nav-link").forEach(l => l.classList.remove("active"));
      if (link.classList.contains("nav-link")) link.classList.add("active");
    });
  });

  /* ─── SCROLL SPY ─── */
  const sections = document.querySelectorAll("section[id]");
  const navLinks = document.querySelectorAll(".nav-link");

  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        navLinks.forEach(l => l.classList.remove("active"));
        const active = document.querySelector(`.nav-link[href="#${entry.target.id}"]`);
        if (active) active.classList.add("active");
      }
    });
  }, { threshold: 0.4 });

  sections.forEach(s => observer.observe(s));

  /* ─── RENDER CARS ─── */
  function renderCars(filter) {
    const carList = document.getElementById("car-list");
    const filtered = filter === "all" ? cars : cars.filter(c => c.status === filter);
    currentFilter = filter;

    carList.innerHTML = filtered.length === 0
      ? `<p style="color:var(--text-3);grid-column:1/-1;padding:2rem 0">No cars match this filter.</p>`
      : filtered.map(car => `
        <div class="car-card ${selectedCarId === car.id ? 'selected' : ''}" data-id="${car.id}">
          <div class="car-card-header">
            <div>
              <div class="car-name">${car.name}</div>
              <div class="car-type">${car.type}</div>
            </div>
            <span class="status-badge ${car.status}">${car.status}</span>
          </div>
          <div class="car-price">
            <div>
              <span class="price-num">${car.price}</span>
              <span class="price-unit"> /day</span>
            </div>
            <span class="car-fuel">${car.fuel}</span>
          </div>
        </div>
      `).join("");

    carList.querySelectorAll(".car-card").forEach(card => {
      card.addEventListener("click", () => {
        const id = parseInt(card.dataset.id);
        if (selectedCarId === id) {
          selectedCarId = null;
          showDetail(null);
        } else {
          selectedCarId = id;
          showDetail(id);
        }
        renderCars(currentFilter);
      });
    });
  }

  /* ─── SHOW DETAIL ─── */
  function showDetail(id) {
    const detail = document.getElementById("car-detail");
    const content = document.getElementById("car-detail-content");

    if (!id) {
      detail.classList.add("hidden");
      return;
    }

    const car = cars.find(c => c.id === id);
    if (!car) return;

    content.innerHTML = `
      <div class="detail-grid">
        <div>
          <div class="detail-name">${car.name}</div>
          <span class="status-badge ${car.status}" style="margin-bottom:1rem;display:inline-block">${car.status}</span>
          <p class="detail-desc">${car.info}</p>
          <div class="detail-specs">
            <div class="spec-item"><div class="spec-label">Price</div><div class="spec-value">${car.price}/day</div></div>
            <div class="spec-item"><div class="spec-label">Type</div><div class="spec-value">${car.type}</div></div>
            <div class="spec-item"><div class="spec-label">Seats</div><div class="spec-value">${car.seats}</div></div>
            <div class="spec-item"><div class="spec-label">Gearbox</div><div class="spec-value">${car.transmission}</div></div>
          </div>
          <div class="detail-action">
            ${car.status === "available"
              ? `<button class="btn-primary" onclick="openModal('rent','${car.name}')">Book ${car.name}</button>`
              : `<button class="btn-outline" onclick="openModal('return','${car.name}')">Return ${car.name}</button>`
            }
          </div>
        </div>
        <div style="display:flex;align-items:center;justify-content:center;">
          <div style="width:100%;aspect-ratio:4/3;background:var(--bg-3);border-radius:var(--radius);display:flex;align-items:center;justify-content:center;">
            <span style="font-family:'Barlow Condensed',sans-serif;font-size:4rem;color:var(--border)">🚘</span>
          </div>
        </div>
      </div>
    `;

    detail.classList.remove("hidden");
    detail.scrollIntoView({ behavior: "smooth", block: "nearest" });
  }

  document.getElementById("detail-close").addEventListener("click", () => {
    selectedCarId = null;
    showDetail(null);
    renderCars(currentFilter);
  });

  /* ─── FILTER BUTTONS ─── */
  document.querySelectorAll(".filter-btn").forEach(btn => {
    btn.addEventListener("click", () => {
      document.querySelectorAll(".filter-btn").forEach(b => b.classList.remove("active"));
      btn.classList.add("active");
      selectedCarId = null;
      showDetail(null);
      renderCars(btn.dataset.filter);
    });
  });

  /* ─── MODAL ─── */
  window.openModal = function(action, carName = "") {
    const overlay = document.getElementById("modal-overlay");
    const body = document.getElementById("modal-body");

    const carOptions = cars
      .filter(c => action === "return" ? c.status === "rented" : c.status === "available")
      .map(c => `<option value="${c.name}" ${c.name === carName ? "selected" : ""}>${c.name} — ${c.price}/day</option>`)
      .join("");

    const templates = {
      rent: `
        <h2>Book a Car</h2>
        <p>Fill in your details to reserve your vehicle.</p>
        <div class="modal-form">
          <div class="form-group">
            <label>Your Name</label>
            <input type="text" placeholder="Full name" />
          </div>
          <div class="form-group">
            <label>Select Car</label>
            <select>${carOptions || '<option disabled>No cars available</option>'}</select>
          </div>
          <div class="form-group">
            <label>Pickup Date</label>
            <input type="date" min="${new Date().toISOString().split('T')[0]}" />
          </div>
          <div class="form-group">
            <label>Return Date</label>
            <input type="date" min="${new Date().toISOString().split('T')[0]}" />
          </div>
          <button class="btn-primary modal-submit" onclick="submitForm('rent')">Confirm Booking</button>
        </div>
      `,
      return: `
        <h2>Return a Car</h2>
        <p>Select the car you are returning today.</p>
        <div class="modal-form">
          <div class="form-group">
            <label>Your Name</label>
            <input type="text" placeholder="Full name" />
          </div>
          <div class="form-group">
            <label>Car to Return</label>
            <select>${carOptions || '<option disabled>No rented cars found</option>'}</select>
          </div>
          <div class="form-group">
            <label>Return Date</label>
            <input type="date" value="${new Date().toISOString().split('T')[0]}" />
          </div>
          <button class="btn-primary modal-submit" onclick="submitForm('return')">Confirm Return</button>
        </div>
      `,
      add: `
        <h2>Add a Car</h2>
        <p>Register a new vehicle to the fleet.</p>
        <div class="modal-form">
          <div class="form-group">
            <label>Car Name</label>
            <input type="text" placeholder="e.g. Kia Seltos" />
          </div>
          <div class="form-group">
            <label>Type</label>
            <select>
              <option>Sedan</option>
              <option>SUV</option>
              <option>Hatchback</option>
              <option>Crossover SUV</option>
              <option>Compact SUV</option>
            </select>
          </div>
          <div class="form-group">
            <label>Daily Price (₹)</label>
            <input type="number" placeholder="e.g. 2500" min="0" />
          </div>
          <div class="form-group">
            <label>Fuel Type</label>
            <select>
              <option>Petrol</option>
              <option>Diesel</option>
              <option>Electric</option>
              <option>CNG</option>
            </select>
          </div>
          <button class="btn-primary modal-submit" onclick="submitForm('add')">Add to Fleet</button>
        </div>
      `
    };

    body.innerHTML = templates[action] || "";
    overlay.classList.remove("hidden");
  };

  window.closeModal = function() {
    document.getElementById("modal-overlay").classList.add("hidden");
  };

  /* ─── FORM SUBMIT ─── */
  window.submitForm = function(action) {
    const messages = {
      rent: "🎉 Booking confirmed! Check your email for details.",
      return: "✅ Return registered. Thank you!",
      add: "🚗 New car added to the fleet."
    };
    closeModal();
    showToast(messages[action] || "Done!");
  };

  /* ─── TOAST ─── */
  function showToast(msg) {
    const toast = document.getElementById("toast");
    toast.textContent = msg;
    toast.classList.remove("hidden");
    setTimeout(() => toast.classList.add("hidden"), 3500);
  }

  /* ─── KEYBOARD CLOSE ─── */
  document.addEventListener("keydown", e => {
    if (e.key === "Escape") closeModal();
  });

  /* ─── INIT ─── */
  renderCars("all");
});
