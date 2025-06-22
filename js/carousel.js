// carousel js implementation by Franklin

// function that deals w all of the carousel logic
function carousel() {
  let container = null;
  let images = [];
  let dots = [];
  let leftArrow = null;
  let rightArrow = null;
  let currentIndex = 0;
  let autoScrollInterval = null;
  let audioContext = null;
  let startTime = Date.now();
  let timerInterval = null;
  let isPaused = false;
  let pausedTime = 0;

  // Image descriptions array
  const imageDescriptions = [
    "A freshly baked supreme pizza topped with melted cheese, black olives, green peppers, red onions, sausage, and pepperoni, with a slice being lifted to showcase the gooey cheese pull.",
    "A close-up overhead view of a pepperoni and vegetable pizza featuring sliced tomatoes, green peppers, black olives, and shredded ham beside a bowl of chili flakes.",
    "A rustic margherita-style pizza with golden-brown, bubbly cheese slices arranged in a circle on a wooden board, garnished with sprigs of rosemary and cherry tomatoes.",
    "A thin-crust pizza cooking in a blazing wood-fired oven, the high heat creating charred edges and bubbling cheese.",
  ];

  // Initialize audio context for sound effects
  function initAudio() {
    if (!audioContext) {
      audioContext = new (window.AudioContext || window.webkitAudioContext)();
    }
  }

  // Play sound for left (like when user presses the left arrow)
  function playLeftSound() {
    initAudio();
    const oscillator = audioContext.createOscillator();
    const gainNode = audioContext.createGain();

    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);

    oscillator.frequency.setValueAtTime(300, audioContext.currentTime); // Lower frequency on the left side
    gainNode.gain.setValueAtTime(0.1, audioContext.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(
      0.01,
      audioContext.currentTime + 0.2
    );

    oscillator.start(audioContext.currentTime);
    oscillator.stop(audioContext.currentTime + 0.2);
  }

  // Sound for the right arrow
  function playRightSound() {
    initAudio();
    const oscillator = audioContext.createOscillator();
    const gainNode = audioContext.createGain();

    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);

    oscillator.frequency.setValueAtTime(500, audioContext.currentTime); // Higher frequency for right
    gainNode.gain.setValueAtTime(0.1, audioContext.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(
      0.01,
      audioContext.currentTime + 0.2
    );

    oscillator.start(audioContext.currentTime);
    oscillator.stop(audioContext.currentTime + 0.2);
  }

  // if no container return (still solving that weird race condition bug)
  container = document.querySelector(".carousel-container");
  if (!container) {
    return;
  }

  images = container.querySelectorAll(".carousel-image");
  dots = container.querySelectorAll(".carousel-dot");
  leftArrow = container.querySelector(".carousel-arrow-left");
  rightArrow = container.querySelector(".carousel-arrow-right");

  // init everything, including showing the first image, and setting up event listeners
  showImage(0);
  setupEventListeners();
  startAutoScroll();
  startTimer();

  // setting up event listeners so that the prev/next image buttons work and the dots work
  function setupEventListeners() {
    if (leftArrow) {
      leftArrow.addEventListener("click", () => {
        previousImage(true);
      });
    }
    if (rightArrow) {
      rightArrow.addEventListener("click", () => {
        nextImage(true);
      });
    }

    // Dot navigation with manual scroll detection
    dots.forEach((dot, index) => {
      dot.addEventListener("click", () => {
        const isGoingRight = index > currentIndex;
        showImage(index);

        // Play sound
        if (isGoingRight) {
          playRightSound();
        } else {
          playLeftSound();
        }
        startAutoScroll(); // Reset auto scroll interval
      });
    });

    // if hovering over the container, pause the auto scroll
    container.addEventListener("mouseenter", pauseAutoScroll);
    container.addEventListener("mouseleave", startAutoScroll);
  }

  // show image for whatever input index, by removing all active states and readding active onto the new image index
  function showImage(index) {
    images.forEach((img) => {
      img.classList.remove("active");
    });

    dots.forEach((dot) => {
      dot.classList.remove("active");
    });

    if (images[index]) {
      images[index].classList.add("active");
    }

    if (dots[index]) {
      dots[index].classList.add("active");
    }

    currentIndex = index;
    updateDescription(index);
    resetTimer(); // Reset timer every time image changes
  }

  // Update the image description based on current index
  function updateDescription(index) {
    const descriptionElement = document.querySelector(".image-description");
    if (descriptionElement && imageDescriptions[index]) {
      descriptionElement.textContent = imageDescriptions[index];
    }
  }

  // dealing w going to the next image - now with optional manual scroll parameter
  function nextImage(isManual = false) {
    const nextIndex = (currentIndex + 1) % images.length;
    showImage(nextIndex);

    // Play sound and reset auto scroll only for manual navigation
    if (isManual) {
      playRightSound();
      startAutoScroll(); // Reset auto scroll interval
    }
  }

  function previousImage(isManual = false) {
    const prevIndex = (currentIndex - 1 + images.length) % images.length;
    showImage(prevIndex);

    // Play sound and reset auto scroll only for manual navigation
    if (isManual) {
      playLeftSound();
      startAutoScroll(); // Reset auto scroll interval
    }
  }

  // starting the auto scroll with interval which triggers every 3000ms (3s)
  function startAutoScroll() {
    pauseAutoScroll();
    autoScrollInterval = setInterval(() => {
      nextImage(); // Auto scroll doesn't trigger sounds
    }, 3000);
    resumeTimer(); // Resume timer when auto-scroll starts
  }

  // pause the auto interval function to stop auto scrolling
  function pauseAutoScroll() {
    if (autoScrollInterval) {
      clearInterval(autoScrollInterval);
      autoScrollInterval = null;
    }
    pauseTimer(); // Pause timer when auto-scroll pauses
  }

  // Start the elapsed time counter
  function startTimer() {
    startTime = Date.now();
    updateTimer();
    if (!timerInterval) {
      timerInterval = setInterval(updateTimer, 100); // Update every 100ms for smooth display
    }
  }

  // Reset the timer (called when image changes)
  function resetTimer() {
    startTime = Date.now();
    pausedTime = 0;
    isPaused = false;
    updateTimer(); // Immediately update display to show 3s
  }

  // Pause the timer (called when auto-scroll pauses)
  function pauseTimer() {
    if (!isPaused) {
      pausedTime = Date.now() - startTime;
      isPaused = true;
    }
  }

  // Resume the timer (called when auto-scroll resumes)
  function resumeTimer() {
    if (isPaused) {
      startTime = Date.now() - pausedTime;
      isPaused = false;
    }
  }

  // Update the timer display - shows countdown until next auto-scroll
  function updateTimer() {
    const timeDisplay = document.querySelector(".time-display");
    if (timeDisplay) {
      let elapsed;
      if (isPaused) {
        elapsed = Math.floor(pausedTime / 1000);
      } else {
        elapsed = Math.floor((Date.now() - startTime) / 1000);
      }
      const countdown = Math.max(0, 3 - elapsed); // Countdown from 3 to 0
      timeDisplay.textContent = countdown + "s";
    }
  }

  // Stop the timer (if needed for cleanup)
  function stopTimer() {
    if (timerInterval) {
      clearInterval(timerInterval);
      timerInterval = null;
    }
  }
}

// only initialize carousel if the dom is loaded (bandage solution to solve weird race condition bug)
if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", carousel);
} else {
  carousel();
}
