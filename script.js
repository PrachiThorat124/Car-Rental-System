document.addEventListener("DOMContentLoaded", () => {
 
  document.querySelectorAll(".nav-links a").forEach(link => {
    link.addEventListener("click", event => {
      event.preventDefault();
      const targetId = link.getAttribute("href").substring(1);
      const targetSection = document.getElementById(targetId);
      if (targetSection) {
        targetSection.scrollIntoView({ behavior: "smooth" });
      }
    });
  });


  const cars = [
    { name: "Honda Civic", status: "available", info: "A reliable and fuel-efficient sedan perfect for city drives." },
    { name: "Toyota Fortuner", status: "rented", info: "A rugged SUV ideal for off-road adventures and long trips." },
    { name: "Maruti Swift", status: "available", info: "Compact and convenient, best suited for quick errands." }
  ];

  const carList = document.getElementById("car-list");
  const carInfo = document.getElementById("car-info");

  window.showCars = function (filter) {
    carList.innerHTML = "";
    const filteredCars = filter === "all" ? cars : cars.filter(car => car.status === filter);

    filteredCars.forEach(car => {
      const card = document.createElement("div");
      card.className = "card";
      card.innerHTML = `<h3>${car.name}</h3><p>Status: ${car.status}</p>`;
      card.onclick = () => {
        carInfo.innerHTML = `<h3>${car.name}</h3><p>${car.info}</p>`;
      };
      carList.appendChild(card);
    });
  };

  window.toggleModal = function (action) {
    alert(`${action.toUpperCase()} feature clicked! Modal/Logic to be implemented.`);
  };
});
