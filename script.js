// Initial Train Data
let trainData = {
  distance: 1000, // Distance in cm
  speed: 20, // Increase speed (train will now move faster)
  gateStatus: "Open", // Initial Gate Status
};

// Function to Update Train Position Based on Distance
function updateTrainPosition() {
  const train = document.getElementById("train");
  const trackWidth = document.querySelector(".track").offsetWidth;

  // Calculate train's position based on distance (proportionally)
  const position = ((1000 - trainData.distance) / 1000) * trackWidth;

  // Set train's position
  train.style.left = `${position}px`;
}

// Update Train Information on Page
function updateTrainInfo() {
  document.getElementById("distance").textContent = trainData.distance;
  document.getElementById("speed").textContent = trainData.speed;
  document.getElementById("gate-status").textContent = trainData.gateStatus;

  // Update progress bar
  const progress = document.getElementById("progress");
  const progressPercentage = ((1000 - trainData.distance) / 1000) * 100;
  progress.style.width = `${progressPercentage}%`;

  // Change progress bar color near the gate
  if (trainData.distance < 500) {
    progress.style.backgroundColor = "#ffc107"; // Yellow
  } else {
    progress.style.backgroundColor = "#28a745"; // Green
  }

  // Update train position
  updateTrainPosition();
}

// Manual Gate Control
function manualGateControl(action) {
  trainData.gateStatus = action;
  updateTrainInfo();
}

// Simulate Data Update Every 500ms (Faster Train)
setInterval(() => {
  trainData.distance -= 20; // Simulate train approaching at a higher speed (move faster)
  if (trainData.distance < 500 && trainData.gateStatus === "Open") {
    trainData.gateStatus = "Closed"; // Auto-close gate when train is near
  }
  if (trainData.distance < 0) {
    trainData.distance = 1000; // Reset for demo
    setTimeout(() => {
      trainData.gateStatus = "Open"; // Auto-open gate after train passes
      updateTrainInfo();
    }, 10000); // 10-second delay to open the gate
  }
  updateTrainInfo();
}, 500); // 500ms interval to simulate faster movement
