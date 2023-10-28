const bill = document.querySelector("#bill");
const numberOfPeopleInput = document.querySelector("#number-of-people");
const tipFive = document.querySelector("#tip5");
const tipTen = document.querySelector("#tip10");
const tipFifteen = document.querySelector("#tip15");
const tipTwentyFive = document.querySelector("#tip25");
const tipFifty = document.querySelector("#tip50");
const customTip = document.querySelector("#custom-tip");
const buttons = document.querySelectorAll(".button-percent");
const billError = document.querySelector("#bill-error");
const peopleError = document.querySelector("#people-error");
const tipAmountPerPerson = document.querySelector("#tip-amount-per-person");
const totalPerPerson = document.querySelector("#total-per-person");
const resetButton = document.querySelector("#reset-button");

buttons.forEach((button) => {
  button.addEventListener("click", () => {
    buttons.forEach((btn) => btn.classList.remove("focused"));
    button.classList.add("focused");
    calculateSum();
  });
});

bill.addEventListener("keyup", () => {
  calculateSum();
});
numberOfPeopleInput.addEventListener("keyup", () => {
  calculateSum();
});

customTip.addEventListener("keyup", () => {
  calculateSum();
});

function calculateSum() {
  const billValue = parseFloat(bill.value);
  const peopleValue = parseFloat(numberOfPeopleInput.value);
  const customPercent = parseFloat(customTip.value);

  if (!isNaN(billValue) && isNaN(peopleValue)) {
    resetButton.classList.add("enabled");
    resetButton.classList.remove("disabled");
    numberOfPeopleInput.classList.add("input-error");
    peopleError.innerText = "Can't be zero";
    console.log("prvi prosao");
  } else if (!isNaN(billValue) && !isNaN(peopleValue)) {
    const totalResult = (billValue / peopleValue).toFixed(2);
    const focusedButton = document.querySelector(".focused");
    totalPerPerson.innerText = `$${totalResult}`;
    peopleError.innerText = "";
    numberOfPeopleInput.classList.remove("input-error");
    console.log("drugi prosao");

    if (!isNaN(customPercent)) {
      const customPercentResult = (
        (billValue * customPercent) /
        100 /
        peopleValue
      ).toFixed(2);
      tipAmountPerPerson.innerText = `$${customPercentResult}`;
      totalPerPerson.innerText = `$${(
        parseFloat(totalResult) + parseFloat(customPercentResult)
      ).toFixed(2)}`;
    } else if (focusedButton) {
      const percent = parseFloat(focusedButton.getAttribute("data-percent"));
      const percentResult = ((billValue * percent) / 100 / peopleValue).toFixed(
        2
      );
      tipAmountPerPerson.innerText = `$${percentResult}`;
      totalPerPerson.innerText = `$${(
        parseFloat(totalResult) + parseFloat(percentResult)
      ).toFixed(2)}`;
    }
  }
}

resetButton.addEventListener("click", () => window.location.reload());
