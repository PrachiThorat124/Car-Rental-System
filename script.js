// Car class
class Car {
  constructor(id, model, pricePerDay, isAvailable = true) {
    this.id = id;
    this.model = model;
    this.pricePerDay = pricePerDay;
    this.isAvailable = isAvailable;
  }
}

let cars = [
  new Car(1, "Toyota Corolla", 40),
  new Car(2, "Honda Civic", 50),
  new Car(3, "Ford Mustang", 100),
];

function showCars(filter = "all") {
  const container = document.getElementById("car-list");
  container.innerHTML = "";
  const filtered = filter === "available" ? cars.filter(c => c.isAvailable) : cars;
  if (filtered.length === 0) {
    container.innerHTML = "<p>No cars available.</p>";
    return;
  }
  filtered.forEach(car => {
    const card = document.createElement("div");
    card.className = "card";
    card.innerHTML = `
      <h3>${car.model}</h3>
      <p>ID: ${car.id}</p>
      <p>Price/Day: $${car.pricePerDay}</p>
      <p>Status: ${car.isAvailable ? "✅ Available" : "❌ Rented"}</p>
    `;
    container.appendChild(card);
  });
}

// SPA navigation
function navigate(page) {
  document.querySelectorAll(".page").forEach(p => p.classList.add("hidden"));
  document.getElementById(page).classList.remove("hidden");
}

// Modal toggling
function toggleModal(type) {
  document.querySelectorAll(".modal").forEach(m => m.classList.add("hidden"));
  document.getElementById(`modal-${type}`).classList.toggle("hidden");
}

// Car actions
function rentCar() {
  const id = parseInt(document.getElementById("rentCarId").value);
  const days = parseInt(document.getElementById("rentDays").value);
  const car = cars.find(c => c.id === id && c.isAvailable);
  if (car && days > 0) {
    car.isAvailable = false;
    alert(`Rented ${car.model} for ${days} days. Total: $${days * car.pricePerDay}`);
    showCars();
    toggleModal('rent');
  } else {
    alert("Invalid input.");
  }
}

function returnCar() {
  const id = parseInt(document.getElementById("returnCarId").value);
  const car = cars.find(c => c.id === id && !c.isAvailable);
  if (car) {
    car.isAvailable = true;
    alert(`Returned ${car.model}.`);
    showCars();
    toggleModal('return');
  } else {
    alert("Invalid return.");
  }
}

function addNewCar() {
  const model = document.getElementById("newCarModel").value;
  const price = parseFloat(document.getElementById("newCarPrice").value);
  if (model && price > 0) {
    const id = cars.length + 1;
    cars.push(new Car(id, model, price));
    alert(`Added ${model}`);
    showCars();
    toggleModal('add');
  } else {
    alert("Invalid input.");
  }
}

// Payment
function makePayment(e) {
  e.preventDefault();
  alert("Payment successful! Thank you.");
  document.querySelector(".payment-form").reset();
}

window.onload = () => {
  navigate("home");
  showCars("all");
};
