/*
    Signup Form Script
    This script will load the state select list and validate the form before submission
*/

(function () {
	"use strict";
	/*document.addEventListener("DOMContentLoaded", loadStates)*/
	window.onload = loadStates();

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
		var valid = validateForm(this);
		if (!valid && evt.preventDefault) {
			evt.preventDefault();
		}
		evt.returnValue = valid;
		return valid;
	}

	function validateForm(form) {

		try {
			var valid = true;
			var requiredTextForms = ["firstName, lastName, address1, city"];
			for (var i = 0; i < requiredTextForms.length; i++) {
				var currentForm = getElementById(requiredTextForms[i]);
				if (currentForm.value.trim() == "") {
					valid = false;
					currentForm.className = "form-control invalid";
				}
			}
			alert("made it!");
		} catch (err) {
			alert(err);
			form.preventDefault();
			return valid;
		}
	}

}) ();