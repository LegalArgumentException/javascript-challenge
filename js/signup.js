/*
    Signup Form Script
    This script will load the state select list and validate the form before submission
*/

(function () {
	"use strict";
	window.onload = function() {
		loadStates();
		document.getElementById("cancelButton").addEventListener("click", cancelCheck)
	}

	function cancelCheck() {
		var leaveCheck = confirm("Do you really want to leave this fantasticly relevant, valuable offer?");
		if(leaveCheck) {
			window.location = "http://google.com"
		}
	}

	function loadStates() {
		var stateSelect = document.getElementsByName("state")[0];
		for(var i = 0; i < usStates.length; i++) {
			var state = usStates[i];
			var stateOption = document.createElement("OPTION");
			var stateText = document.createTextNode(state.name)
			stateOption.value = state.name;
			stateOption.value = state.code;
			stateOption.appendChild(stateText);
			stateSelect.appendChild(stateOption);
		}

		var occupationForm = document.getElementById("occupation");
		occupationForm.addEventListener("change", function () {occupationCheck(occupationForm)});
		var signup = document.getElementById("signup");
		signup.addEventListener("submit", onSubmit);	
	}

	function occupationCheck(occupationForm) {
		var otherText = document.getElementsByName("occupationOther")[0];
		if (occupationForm.value == "other") {
			otherText.style.display = "block";
		} else {
			otherText.style.display = "none";
		}
	}

	function onSubmit(evt) {
		var valid = validateForm(evt);
		if (!valid && evt.preventDefault) {
			evt.preventDefault();
		}
		evt.returnValue = valid;
		return valid;
	}

	function validateForm(form) {
		var valid = true;
		var requiredTextForms = ["firstName", "lastName", "address1", "city", "state"];
		if(document.getElementById("occupation").value == "other"){
			requiredTextForms.push("occupationOther");
		}
		for (var i = 0; i < requiredTextForms.length; i++) {
			var currentElement = document.getElementById(requiredTextForms[i]);
			valid &= testValidText(currentElement);
		}
		console.log(document.getElementById("birthdate").value);
		valid &= testValidZip();
		valid &= testValidBirthday();
		return valid;
	}

	function testValidBirthday() {
		var birthday = document.getElementById("birthdate");
		var birthdateMessage = document.getElementById("birthdateMessage");
		var currentDate = new Date();
		var validDate = true;

		if (birthday.value.trim() != "") {
			var birthdayInfo = (birthday.value).split("-");
			if(currentDate.getFullYear() - birthdayInfo[0] < 13) {
				validDate = false;
			} else if (currentDate.getFullYear() - birthdayInfo[0] == 13) {
				if((currentDate.getMonth() + 1) - birthdayInfo[1] < 0) {
					validDate = false;
				} else if((currentDate.getMonth() + 1) - birthdayInfo[1] == 0) {
					if(currentDate.getDate() - birthdayInfo[2] < 0) {
						validDate = false;
					}
				}
			}
		} else {
			validDate = false;
		}

		if (!validDate) {
			birthday.className = "form-control invalid";
			birthdateMessage.innerHTML = "You must be at least 13 years or older to sign up!";
		} else {
			birthday.className = "form-control";
			birthdateMessage.innerHTML = "";
		}

		return validDate;

	}

	function testValidText(element) {
		var elementValue = element.value.trim();
		if (elementValue == "") {
			element.className = "form-control invalid";
		} else {
			element.className = "form-control";
		}
		return Boolean(elementValue);
	}

	function testValidZip() {
		var zipCode = document.getElementById("zip");
		var regEx = new RegExp('^\\d{5}$');
		var zipTest = regEx.test(zipCode.value);
		if(zipTest) {
			zipCode.className = "form-control";
		} else {
			zipCode.className = "form-control invalid"
		};
		return zipTest;
	}

}) ();