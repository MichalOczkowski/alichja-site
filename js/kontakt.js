// ============================================================
// kontakt.js – obsługa formularza kontaktowego
//
// Opis kluczowych funkcji:
// - Obsługa podglądu i walidacji wiadomości
// - Przekazywanie danych do Formsubmit
//
// Zmiana logiki wpływa na działanie formularza kontaktowego na stronie.
// ============================================================

// kontakt.js – obsługa formularza kontaktowego z podsumowaniem i walidacją


// Pobranie referencji do pól formularza
const form = document.getElementById("kontakt-formularz");
const nameInput = document.getElementById("name");
const emailInput = document.getElementById("email");
const phoneInput = document.getElementById("phone");
const zgoda1 = document.getElementById("zgoda1");
const zgoda2 = document.getElementById("zgoda2");
const zgoda3 = document.getElementById("zgoda3");
const summary = document.getElementById("summary");
const userMessage = document.getElementById("user-message");
const finalMessage = document.getElementById("final-message");


// Aktualizuje podsumowanie na podstawie pól formularza
function updateSummary() {
  let lines = [];
  if (nameInput.value.trim()) lines.push(`Jestem ${nameInput.value.trim()}.`);
  if (emailInput.value.trim()) lines.push(`Mój e-mail: ${emailInput.value.trim()}`);
  if (phoneInput.value.trim()) lines.push(`Mój numer telefonu do kontaktu: ${phoneInput.value.trim()}`);

  if (zgoda1.checked)
    lines.push("Wyrażam zgodę na przetwarzanie moich danych osobowych w celu kontaktu i obsłużenia zapytania/wiadomości.");
  if (zgoda2.checked)
    lines.push("Wyrażam zgodę na to, żebyś się zwrotnie ze mną kontaktowała.");
  if (zgoda3.checked)
    lines.push("Wyrażam zgodę na otrzymywanie od Ciebie wszystkich informacji jakie chciałabyś mi przekazać w przyszłości, np. Zmiany, Promocje, Eventy, Ciekawostki.");

  summary.value = lines.join("\n");
  summary.style.height = "auto";
  summary.style.height = summary.scrollHeight + "px";
  updateFinalMessage();
}


// Łączy podsumowanie i wiadomość użytkownika do pola finalMessage
function updateFinalMessage() {
  finalMessage.value = summary.value + "\n\n" + userMessage.value;
}


// Obsługa zdarzeń formularza i pól
[nameInput, emailInput, phoneInput, zgoda1, zgoda2, zgoda3].forEach(input => {
  input.addEventListener("input", updateSummary);
  input.addEventListener("change", updateSummary);
});

userMessage.addEventListener("input", updateFinalMessage);

form.addEventListener("submit", (e) => {
  if (!zgoda1.checked || !zgoda2.checked || !nameInput.value || !emailInput.value) {
    e.preventDefault();
    alert("Aby wysłać wiadomość, uzupełnij wymagane dane i zaznacz obowiązkowe zgody.");
  } else {
    updateFinalMessage();
  }
});

// Inicjalizacja podsumowania po załadowaniu strony
updateSummary();

// Ułatwienie: kliknięcie w message-wrapper ustawia focus na polu wiadomości
document.querySelector(".message-wrapper").addEventListener("click", () => {
  userMessage.focus();
});
