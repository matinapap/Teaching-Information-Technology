////////////////////////// ΣΤΑΘΕΡΕΣ ΚΑΙ ΜΕΤΑΒΛΗΤΕΣ //////////////////////////
const startButton = document.getElementById("startButton");
const initialContent = document.getElementById("initialContent");
const exerciseContainer = document.getElementById("exerciseContainer");
const dropZone = document.getElementById("dropZone");
const resultMsg = document.getElementById("resultMsg");
const exerciseText = document.getElementById("exerciseText");
const exerciseInstruction = document.getElementById("exerciseInstruction");
const leftArrow = document.getElementById("leftArrow");
const rightArrow = document.getElementById("rightArrow");
const inputSection = document.getElementById("inputSection");
const userInput = document.getElementById("userInput");
const finalPage = document.getElementById("finalPage");

let selectedRule = null;
let currentExercise = 0;

const exercises = [
  {
    title: "Άσκηση 1: Έλεγχος ονόματος",
    validRule: "greek-capital",
    instruction: "Σύρε τον σωστό έλεγχο εγκυρότητας για το όνομα."
  },
  {
    title: "Άσκηση 2: Έλεγχος email",
    validRule: "valid-email",
    instruction: "Σύρε τον σωστό έλεγχο εγκυρότητας για το email."
  },
  {
    title: "Άσκηση 3: Συμπλήρωσε τα όρια της ηλικίας και σύρε τον σωστό έλεγχο εγκυρότητας για την ηλικία (σημείωση: 18-99).",
    validRule: "only-numbers",
    instruction: "Σύρε τον σωστό έλεγχο εγκυρότητας για την ηλικία"
  },
  {
    title: "Άσκηση 4: Συμπλήρωσε το πλήθος ψηφίων ενός κινητού και σύρε τον σωστό έλεγχο εγκυρότητας για το κινητό.",
    validRule: "only-numbers",
    instruction: "Σύρε τον σωστό έλεγχο εγκυρότητας για το Κινητό."
  },
  {
    title: "Άσκηση 5: Έλεγχος ΑΦΜ",
    validRule: "afm",
    instruction: "Σύρε τον σωστό έλεγχο εγκυρότητας για το ΑΦΜ."
  }
];

////////////////////////// ΣΥΝΑΡΤΗΣΕΙΣ //////////////////////////

// Επιστρέφει στην αρχική οθόνη
function returnToStart() {
  exerciseContainer.style.display = "none";  
  finalPage.classList.add("hidden");  
  initialContent.style.display = "block";  
  location.reload();  
}

// Βοηθητική συνάρτηση για να μπορεί να κατευθυνθεί με τα βελάκια στις ασκήσεις
function renderExercise() {
  selectedRule = null;
  resultMsg.textContent = "";  

  // Εκκαθάριση input πεδίων (αν υπάρχουν)
  const userInput = document.getElementById("userInput");
  const userInputMax = document.getElementById("userInputMax");
  const digitCountInput = document.getElementById("digitCountInput");

  if (userInput) userInput.value = "";
  if (userInputMax) userInputMax.value = "";
  if (digitCountInput) digitCountInput.value = "";

  const ex = exercises[currentExercise];
  exerciseText.textContent = ex.title;   
  dropZone.textContent = ex.instruction; 

  const exercise1Inputs = document.getElementById("exercise1Inputs");
  const exercise2Inputs = document.getElementById("exercise2Inputs");
  const exercise3Inputs = document.getElementById("exercise3Inputs");
  const exercise4Inputs = document.getElementById("exercise4Inputs");
  const exercise5Inputs = document.getElementById("exercise5Inputs");
  const inputSection = document.getElementById("inputSection");

  // Εμφάνιση των κατάλληλων input
  if (currentExercise === 0) {
    inputSection.style.display = "block";
    exercise1Inputs.style.display = "block";
    exercise2Inputs.style.display = "none";
    exercise3Inputs.style.display = "none";
    exercise4Inputs.style.display = "none";
    exercise5Inputs.style.display = "none";
  } else if (currentExercise === 1) {
    inputSection.style.display = "block";
    exercise1Inputs.style.display = "none";
    exercise2Inputs.style.display = "block";
    exercise3Inputs.style.display = "none";
    exercise4Inputs.style.display = "none";
    exercise5Inputs.style.display = "none";
  }else if (currentExercise === 2) {
    inputSection.style.display = "block";
    exercise1Inputs.style.display = "none";
    exercise2Inputs.style.display = "none";
    exercise3Inputs.style.display = "block";
    exercise4Inputs.style.display = "none";
    exercise5Inputs.style.display = "none";
  } else if (currentExercise === 3) {
    inputSection.style.display = "block";
    exercise1Inputs.style.display = "none";
    exercise2Inputs.style.display = "none";
    exercise3Inputs.style.display = "none";
    exercise4Inputs.style.display = "block";
    exercise5Inputs.style.display = "none";
  }else if (currentExercise === 4) {
    inputSection.style.display = "block";
    exercise1Inputs.style.display = "none";
    exercise2Inputs.style.display = "none";
    exercise3Inputs.style.display = "none";
    exercise4Inputs.style.display = "none";
    exercise5Inputs.style.display = "block";
  } else {
    inputSection.style.display = "none";
    exercise1Inputs.style.display = "none";
    exercise2Inputs.style.display = "none";
    exercise3Inputs.style.display = "none";
    exercise4Inputs.style.display = "none";
    exercise5Inputs.style.display = "none";
  }


  // Διαχείριση βελών
  if (currentExercise === 0) {
    leftArrow.classList.add("disabled");  
  } else {
    leftArrow.classList.remove("disabled"); 
  }

  if (currentExercise === exercises.length) {
    rightArrow.classList.add("disabled");  
  } else {
    rightArrow.classList.remove("disabled"); 
  }
}

// Ελέγχει αν η απάντηση είναι σωστή
function checkAnswer() {
  if (!selectedRule) {
    resultMsg.textContent = "Παρακαλώ επιλέξτε απάντηση.";
    resultMsg.style.color = "red";
    return;
  }

  const isExpectedRule = selectedRule === exercises[currentExercise].validRule;

 if (currentExercise === 0) {
    const inputValue1 = document.getElementById("nameLengthInput").value.trim();
    const inputValue2 = document.getElementById("greekCheckInput").value.trim();
    const inputValue3 = document.getElementById("capitalCheckInput").value.trim();
    let isInputValid = false;
    let errorMessage = "";

    if (inputValue1 === "" || inputValue2 === "" || inputValue3 === "") {
      errorMessage = "Συμπλήρωσε όλα τα πεδία.";
    } else if (inputValue1 !== "2") {
      errorMessage = "Ξανά κοίτα το πρώτο κενό, πρέπει να βάλεις έναν αριθμό.";
    } else if (inputValue2 !== "όνομα") {
      errorMessage = "Ξανά κοίτα το δεύτερο κενό, hint: δέχεται ένα αλφαριθμητικό όρισμα.";
    }else if (inputValue3 !== "όνομα, 1") {
      errorMessage = "Ξανά κοίτα το τρίτο κενό, hint: δέχεται δύο ορίσματα, ένα αλφαριθμητικό και έναν αριθμό.";
    } else {
      isInputValid = true;
    }

    if (isInputValid && isExpectedRule) {
      resultMsg.textContent = "Σωστά!";
      resultMsg.style.color = "green";
    } else if (!isInputValid) {
      resultMsg.textContent = errorMessage || "Οι είσοδοι δεν είναι έγκυροι.";
      resultMsg.style.color = "red";
    } else {
      resultMsg.textContent = "Λάθος κανόνας. Δοκιμάστε ξανά.";
      resultMsg.style.color = "red";
    }
}else if (currentExercise === 1) {
    const inputValue1 = document.getElementById("mailInput").value.trim();
    const inputValue2 = document.getElementById("trueInput").value.trim();
    let isInputValid = false;
    let errorMessage = "";

    if (inputValue1 === "" || inputValue2 === "") {
      errorMessage = "Συμπλήρωσε όλα τα πεδία.";
    } else if (inputValue1 !== "email") {
      errorMessage = "Ξανά κοίτα το πρώτο κενό, hint: δέχεται ένα αλφαριθμητικό όρισμα.";
    } else if (inputValue2 !== "ΑΛΗΘΗΣ") {
      errorMessage = "Ξανά κοίτα το δεύτερο κενό, hint: δέχεται μία λογική τιμή";
    } else {
      isInputValid = true;
    }

    if (isInputValid && isExpectedRule) {
      resultMsg.textContent = "Σωστά!";
      resultMsg.style.color = "green";
    } else if (!isInputValid) {
      resultMsg.textContent = errorMessage || "Οι είσοδοι δεν είναι έγκυροι.";
      resultMsg.style.color = "red";
    } else {
      resultMsg.textContent = "Λάθος κανόνας. Δοκιμάστε ξανά.";
      resultMsg.style.color = "red";
    }
  }else if (currentExercise === 2) {
    const inputValue1 = document.getElementById("userInput").value.trim();
    const inputValue2 = document.getElementById("userInputMax").value.trim();
    let isInputValid = false;
    let errorMessage = "";

    if (inputValue1 === "" || inputValue2 === "") {
      errorMessage = "Συμπλήρωσε και τα δύο όρια ηλικίας.";
    } else if (inputValue1 !== "18") {
      errorMessage = "Ξανά κοίτα το πρώτο κενό, ποιο είναι το κατώτατο όριο που μπορεί να έχει η ηλικία με βάση την εκφώνηση;";
    } else if (inputValue2 !== "99") {
      errorMessage = "Ξανά κοίτα το δεύτερο κενό, ποιο είναι το ανώτατο όριο που μπορεί να έχει η ηλικία με βάση την εκφώνηση;";
    } else {
      isInputValid = true;
    }

    if (isInputValid && isExpectedRule) {
      resultMsg.textContent = "Σωστά!";
      resultMsg.style.color = "green";
    } else if (!isInputValid) {
      resultMsg.textContent = errorMessage || "Οι είσοδοι δεν είναι έγκυροι.";
      resultMsg.style.color = "red";
    } else {
      resultMsg.textContent = "Λάθος κανόνας. Δοκιμάστε ξανά.";
      resultMsg.style.color = "red";
    }
  } else if (currentExercise === 3) {
    const userValue = document.getElementById("digitCountInput").value.trim();
    
    const isNumberValid = userValue === "10";
    const isRuleValid = selectedRule === "only-numbers";

    if (isNumberValid && isRuleValid) {
      resultMsg.textContent = "Σωστά!";
      resultMsg.style.color = "green";
    } else if (!isNumberValid) {
      resultMsg.textContent = "Ξανά κοίτα το πρώτο κενό, θυμίσου, το κινητό έχει 10 ψηφία.";
      resultMsg.style.color = "red";
    } else {
      resultMsg.textContent = "Λάθος κανόνας. Δοκιμάστε ξανά.";
      resultMsg.style.color = "red";
    }

  }else if (currentExercise === 4) {
    const inputValue1 = document.getElementById("afmInput").value.trim();
    const inputValue2 = document.getElementById("afmLength").value.trim();
    let isInputValid = false;
    let errorMessage = "";

    if (inputValue1 === "" || inputValue2 === "") {
      errorMessage = "Ξανά κοίτα το πρώτο κενό, θυμίσου, δέχεται ως όρισμα το ΑΦΜ.";
    } else if (inputValue1!== "ΑΦΜ") {
      errorMessage = "Ξανά κοίτα το πρώτο κενό, hint: δέχεται ένα αριθμητικό όρισμα.";
    } else if (inputValue2 !== "9") {
      errorMessage = "Ξανά κοίτα το δεύτερο κενό, hint: δέχεται έναν αριθμό.";
    } else {
      isInputValid = true;
    }

    if (isInputValid && isExpectedRule) {
      resultMsg.textContent = "Σωστά!";
      resultMsg.style.color = "green";
    } else if (!isInputValid) {
      resultMsg.textContent = errorMessage || "Οι είσοδοι δεν είναι έγκυροι.";
      resultMsg.style.color = "red";
    } else {
      resultMsg.textContent = "Λάθος κανόνας. Δοκιμάστε ξανά.";
      resultMsg.style.color = "red";
    }
  }else {
    if (isExpectedRule) {
      resultMsg.textContent = "Σωστά!";
      resultMsg.style.color = "green";
    } else {
      resultMsg.textContent = "Λάθος κανόνας. Δοκιμάστε ξανά.";
      resultMsg.style.color = "red";
    }
  }
}

// Εμφανίζει τη λύση για την τρέχουσα άσκηση
function showSolution() {
  const confirmSolution = confirm("Θέλεις σίγουρα να δεις τη λύση;");

  if (!confirmSolution) {
    return; // Ο χρήστης ακύρωσε
  }

  selectedRule = exercises[currentExercise].validRule;
  const ruleText = document.querySelector(`[data-rule="${selectedRule}"]`).textContent;
  dropZone.textContent = `Επιλέχθηκε κανόνας: ${ruleText}`;
  resultMsg.textContent = "Ο σωστός κανόνας εφαρμόστηκε αυτόματα.";
  resultMsg.style.color = "blue";

  if (currentExercise === 0) {

    if (document.getElementById("userInput")) {
      document.getElementById("nameLengthInput").value = "2";
    }
    if (document.getElementById("userInputMax")) {
      document.getElementById("greekCheckInput").value = "όνομα";
      document.getElementById("greekCheckInput").value = "όνομα";
      document.getElementById("capitalCheckInput").value = "όνομα, 1";
    }

  }else if (currentExercise === 1) {

    document.getElementById("mailInput").value = "email";
    document.getElementById("trueInput").value = "ΑΛΗΘΗΣ";

  }else if (currentExercise === 2) {

    if (document.getElementById("userInput")) {
      document.getElementById("userInput").value = "18";
    }
    if (document.getElementById("userInputMax")) {
      document.getElementById("userInputMax").value = "99";
    }

  }else if (currentExercise === 3) {

    document.getElementById("digitCountInput").value = "10";
  }else if (currentExercise === 4) {

    document.getElementById("afmInput").value = "ΑΦΜ";
    document.getElementById("afmLength").value = "9";

  }

}

////////////////////////// ΧΕΙΡΙΣΤΕΣ ΣΥΜΒΑΝΤΩΝ //////////////////////////

startButton.addEventListener("click", () => {
  initialContent.style.display = "none";
  exerciseContainer.style.display = "block";
  renderExercise();
});

document.querySelectorAll(".draggable").forEach(el => {
  el.addEventListener("dragstart", e => {
    e.dataTransfer.setData("text/plain", el.dataset.rule);
  });
});

dropZone.addEventListener("dragover", e => {
  e.preventDefault();
  dropZone.classList.add("drag-over");
});

dropZone.addEventListener("dragleave", () => {
  dropZone.classList.remove("drag-over");
});

dropZone.addEventListener("drop", e => {
  e.preventDefault();
  dropZone.classList.remove("drag-over");
  selectedRule = e.dataTransfer.getData("text/plain");
  const ruleText = document.querySelector(`[data-rule="${selectedRule}"]`).textContent;
  dropZone.textContent = `Επιλέχθηκε κανόνας: ${ruleText}`;
});

leftArrow.addEventListener("click", () => {
  if (!finalPage.classList.contains("hidden")) {
    // Επιστρέφουμε στην τελευταία άσκηση
    finalPage.classList.add("hidden");
    exerciseContainer.style.display = "block";
    currentExercise = exercises.length - 1; // Επιστροφή στην τελευταία άσκηση
    renderExercise();
  } else if (currentExercise > 0) {
    currentExercise--;
    renderExercise();
  }
});

rightArrow.addEventListener("click", () => {
  if (currentExercise < exercises.length - 1) {
    currentExercise++;
    renderExercise();
  } else if (currentExercise === exercises.length - 1) {
    // Όταν ολοκληρωθούν όλες οι ασκήσεις, κρύβουμε το exerciseContainer και εμφανίζουμε το finalPage
    exerciseContainer.style.display = "none";
    finalPage.classList.remove("hidden");
  }
});