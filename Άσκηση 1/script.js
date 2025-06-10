document.getElementById("validationForm").addEventListener("submit", function (e) {
  e.preventDefault();

  let allValid = true;

  // Όνομα: τουλάχιστον 2 χαρακτήρες και το πρώτο γράμμα κεφαλαίο
  allValid &= validateField("name", value => {
    const trimmed = value.trim();

    if (!value.trim()) {
    return "Το όνομα δεν μπορεί να είναι κενό.";
    }

    if (trimmed.length < 2) {
      return "Το όνομα πρέπει να έχει τουλάχιστον 2 ελληνικούς χαρακτήρες.";
    }
    if (!/^[Α-Ω]/.test(trimmed)) {
      return "Το όνομα πρέπει να ξεκινά με κεφαλαίο γράμμα και να περιέχει ελληνικούς χαρακτήρες.";
    }
    return "✓ Το όνομα είναι έγκυρο. Συνθήκη: ΜΗΚΟΣ(όνομα) ≥ 2 ΚΑΙ ΕΙΝΑΙ_ΕΛΛΗΝΙΚΟΙ_ΧΑΡΑΚΤΗΡΕΣ(όνομα) = ΑΛΗΘΗΣ ΚΑΙ ΕΙΝΑΙ_ΚΕΦΑΛΑΙΟ(όνομα, 1) = ΑΛΗΘΗΣ";  // Επιστροφή μηνύματος επιτυχίας
  });

  // Email: βασικός έλεγχος μορφής
  allValid &= validateField("email", value => {
  if (!value.trim()) {
    return "Το email δεν μπορεί να είναι κενό.";
  }
  if (!/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(value)) {
    return "Μη έγκυρη διεύθυνση email."; 
  }
  return "✓ Το email είναι έγκυρο. Έχει το σωστό format xx@xx.xx. Συνθήκη: ΕΙΝΑΙ_ΔΙΕΥΘΥΝΣΗ_EMAIL(διεύθυνση_email) = ΑΛΗΘΗΣ";  // Επιστροφή μηνύματος επιτυχίας
});

  // Ηλικία: από 18 έως 99 και μόνο αριθμοί
  allValid &= validateField("age", value => {
    if (!value.trim()) {
      return "Η ηλικία δεν μπορεί να είναι κενή.";
    }
    if (!/^\d+$/.test(value)) {
      return "Η ηλικία πρέπει να περιέχει μόνο αριθμούς.";
    }
    const num = Number(value);
    if (num < 18 || num > 99) {
      return "Η ηλικία πρέπει να είναι από 18 έως 99.";
    }
    return "✓ Η ηλικία είναι έγκυρη. Περιέχει αριθμό μεταξύ 18 και 99. Συνθήκη: Ηλικία ≥ 18 ΚΑΙ Ηλικία ≤ 99";  
  });

  // Κινητό: 69xxxxxxxx (10 ψηφία)
  allValid &= validateField("phone", value => {
    if (!value.trim()) {
      return "Το κινητό δεν μπορεί να είναι κενό.";
    }
    if(/^69\d{8}$/.test(value)) 
    {
      return "✓ Το κινητό είναι έγκυρo. Συνθήκη: ΜΗΚΟΣ(κινητό) = 10 ΚΑΙ ΧΑΡΑΚΤΗΡΑΣ_ΣΤΟ_ΟΝΟΜΑ(κινητό, 1) = \"6\" ΚΑΙ ΧΑΡΑΚΤΗΡΑΣ_ΣΤΟ_ΟΝΟΜΑ(κινητό, 2) = \"9\"";  
    }
    else{
      return "Το κινητό πρέπει να ξεκινάει από 69 και να έχει συνολικά 10 αριθμητικά ψηφία.";  
    }
    
   });

  // ΑΦΜ: μόνο 9 αριθμοί
  allValid &= validateField("afm", value => {
    if (!value.trim()) {
      return "Το ΑΦΜ δεν μπορεί να είναι κενό.";
    }
    if (!/^\d+$/.test(value)) {
      return "Το ΑΦΜ πρέπει να περιέχει μόνο αριθμούς.";
    }
    if (value.length !== 9) {
      return "Το ΑΦΜ πρέπει να έχει ακριβώς 9 ψηφία.";
    }
    return "✓ Το ΑΦΜ είναι έγκυρο. Περιέχει 9 αριθμούς. Συνθήκη : ΜΗΚΟΣ(ΑΦΜ) = 9 ΚΑΙ ΜΟΝΟ_ΨΗΦΙΑ(ΑΦΜ) = ΑΛΗΘΗΣ";  
  });

  const successMessage = document.getElementById("successMessage");
  if (allValid) {
    successMessage.textContent = "✅ Όλα τα στοιχεία είναι σωστά! Ο έλεγχος εγκυρότητας ολοκληρώθηκε.";
  } else {
    successMessage.textContent = "";
  }
});

// Γενική συνάρτηση επικύρωσης
function validateField(id, validator) {
  const input = document.getElementById(id);
  const small = input.nextElementSibling;
  const result = validator(input.value);

  if (result.startsWith("✓")) {  
    input.classList.remove("invalid");
    input.classList.add("valid");
    small.textContent = result;
    small.style.color = "green";
    return true;  
  } else {
    input.classList.remove("valid");
    input.classList.add("invalid");
    small.textContent = result;
    small.style.color = "red";
    return false;  
  }
}

// Συνάρτηση που καθαρίζει τα πεδία της φόρμας
function clearForm() {
  const form = document.getElementById("validationForm");
  form.reset();  

  const inputs = form.querySelectorAll("input");
  inputs.forEach(input => {
    const small = input.nextElementSibling;
    input.classList.remove("valid", "invalid");
    small.textContent = "";
    small.style.color = "";
  });

  const successMessage = document.getElementById("successMessage");
  successMessage.textContent = "";
}

// Συνάρτηση για γέμισμα των πεδίων με προκαθορισμένα δεδομένα
function fillForm() {
  document.getElementById("name").value = "Μαρία";
  document.getElementById("email").value = "maria@gmail.com";
  document.getElementById("age").value = "19";
  document.getElementById("phone").value = "6912345678";
  document.getElementById("afm").value = "123456789";
}