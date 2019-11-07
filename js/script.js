////////////////////////////////////////////////////
// GLOBAL VARIABLES
////////////////////////////////////////////////////
// Basic Info
const userName = $('#name')
const userEmail = $('#mail')
const userTitleSELECT = $('#title')[0]

//Design and Color Section
const otherJobRoleINPUT = $('#other-title');
const designSELECT = $('#design')[0];
const selectThemeOPTION = $('#design option:first-child');
const colorSELECT = $('#color');
const activitySection = $('.activities')[0]

// Activity Section
let totalActivityCost = 0;
const activityElement = document.createElement('div');
activityElement.innerText = "Total: $" + totalActivityCost;
activitySection.append(activityElement)

// Payment Method Section
const paymentSELECT = $('#payment')[0];
const creditCardDIV = $('#credit-card');
const payPalDIV = $('#paypal');
const bitCoinDIV = $('#bitcoin');
const selectPaymentOPTION = $('#payment option:first-child');

// Credit Pyament Inputs
const ccNum = $('#cc-num')
const zipCode = $('#zip')
const cvvNum = $('#cvv')

// Submit Button
const registerBTN = $("button[type='submit']")
////////////////////////////////////////////////////
// ON PAGE LOAD FUNCTION CALLS AND ADDED JS ELEMENTS
////////////////////////////////////////////////////

// Sets focus statte to first field 
userName.focus();
// Sets Other Job Role Input to hide if JS working
otherJobRoleINPUT.hide();
// Adds "Please select a T-shirt theme" option to color select menu
colorSELECT.prepend($('<option selected></option>').text("Please select a T-shirt theme"));
// Hides all colors in the color select menu
colorSELECT.find('[value]').hide()
// Hides color select menu and label
colorSELECT.hide()
colorSELECT.prev().hide()
// Hides "Select Payment Method" option
selectPaymentOPTION.remove()
// Selects Credit Card payment method on page load
$('#payment option:nth-child(1)').attr(`selected`);
// Hides paypal and bitcoin payment methods
payPalDIV.hide()
bitCoinDIV.hide()


////////////////////////////////////////////////////
// EVENTS
////////////////////////////////////////////////////

userTitleSELECT.addEventListener('change', () => {
    let value = userTitleSELECT.value
    if (value === "other") {
        otherJobRoleINPUT.show()
    }
})


// Sets correct color options depending on Theme selection
designSELECT.addEventListener('change', () => {
    let jsPunOptions = colorSELECT.children().slice(1, 4)
    let jsHeartOptions = colorSELECT.children().slice(4, 7)
    if (designSELECT.value === "js puns") {
        //hide js heart shirt color options
        jsHeartOptions.hide()
        //show js puns options
        jsPunOptions.show()
        //update color field to first option
        colorSELECT.children()[1].selected = 'selected'
    } else {
        //hide js puns shirt color options
        jsPunOptions.hide()
        //show js heart options
        jsHeartOptions.show()
        //update color field to first option
        colorSELECT.children()[4].selected = 'selected'
    }
    colorSELECT.show()
    colorSELECT.prev().show()
}) 

// Activity event
activitySection.addEventListener('change', (e) => {
    let input = e.target
    let inputArray = $.makeArray($(".activities input"))
    let dataCost = parseInt($(input).attr(`data-cost`).substr(1), 10)
    let dataDayAndTime = $(input).attr(`data-day-and-time`)
    console.log(dataDayAndTime)
    if (input.checked) {
        totalActivityCost += dataCost
        for (i = 0; i < inputArray.length; i++) {
            if ($(inputArray[i]).attr(`data-day-and-time`) === dataDayAndTime && inputArray[i] !== input) {
                $(inputArray[i]).attr(`disabled`, `true`)
            }
        }
    } else {
        totalActivityCost -= dataCost
        for (i = 0; i < inputArray.length; i++) {
            if ($(inputArray[i]).attr(`data-day-and-time`) === dataDayAndTime && inputArray[i] !== input) {
                $(inputArray[i]).removeAttr(`disabled`)
            }
        }
    }
    activityElement.innerText = "Total: $" + totalActivityCost
})

// Payment Mmethod Selectiopn Event
paymentSELECT.addEventListener('change', () => {
    if (paymentSELECT.value === "Credit Card") {
        creditCardDIV.show()
        payPalDIV.hide()
        bitCoinDIV.hide()
    } else if (paymentSELECT.value === "PayPal"){
        payPalDIV.show()
        creditCardDIV.hide()
        bitCoinDIV.hide()
    } else {
        bitCoinDIV.show()
        creditCardDIV.hide()
        payPalDIV.hide()
    }
})

creditCardDIV.keyup( (e) => {
    let input = e.target
    $(input).next(".error-message").remove()
    if (input.id === ccNum.attr('id')) {
        ccNumValidation()
    } else if (input.id === zipCode.attr('id')) {
        zipCodeValidation()
    } else if (input.id === cvvNum.attr('id')) {
        cvvValidation()
    }
})

userName.keyup( (e) => {
    let input = e.target
    $(input).next(".error-message").remove()
    $(input).css("border-color", "initial")
    nameValidation()
})

userEmail.keyup((e) => {
    let input = e.target
    $(input).next(".error-message").remove()
    $(input).css("border-color", "initial")
    emailValidation()
})

registerBTN.click( (event) => {
    event.preventDefault()
    basicInfoValidation()
    creditCardValidation()
})

$('input').focus( (e) => {
    let input = e.target
    $(input).next(".error-message").remove()
    $(input).css("border-color", "initial")
})


////////////////////////////////////////////////////
// CORE FUNCTIONS
////////////////////////////////////////////////////


// Payment Validation Functions

const nameValidation = () => {
    if (/^\s*$/.test(userName.val())) {
        console.log("true")
        insertErrorMessage(userName, "The name field must not be blank")
        return true
    } else {
        console.log("false")
        return false
    }
} 

const emailValidation = () => { 
    if (/^\s*$/.test(userEmail.val())) {
        insertErrorMessage(userEmail, "The email field must not be blank")
        return true
    } else {
        if (/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(userEmail.val())) {
            return true
        } else {
            insertErrorMessage(userEmail, "The email address must be properly formatted")
            return false
        }
    }
}

const activityValidation = () => {
    let checkedActivityINPUTS = $(activitySection).find("input:checked")
    if (checkedActivityINPUTS.length > 0) {
        return true
    } else {
        insertErrorMessage($(activitySection).find('div'), "At least one activity must be selected")
        return false
    }
}

const ccNumValidation = () => { 
    if (/^[0-9]{13,16}$/.test(ccNum.val())) {
        return true
    } else {
        insertErrorMessage(ccNum, "The credit card number must be between 13 and 16 digits")
        return false
    }
}

const zipCodeValidation = () => {
    if (/^[0-9]{5}$/.test(zipCode.val())) {
        return true
    } else {
        insertErrorMessage(zipCode, "The zip code must be 5 digits")
        return false
    }
}
const cvvValidation = () => {
    if (/^[0-9]{3}$/.test(cvvNum.val())) {
        return true
    } else {
        insertErrorMessage(cvvNum, "The CVV number must be 3 digits")
        return false
    }
}

const basicInfoValidation = () => {
    nameValidation()
    emailValidation()
    activityValidation()

}

const creditCardValidation = () => {
    ccNumValidation()
    zipCodeValidation()
    cvvValidation()
}

////////////////////////////////////////////////////
// SUPPORT FUNCTIONS
////////////////////////////////////////////////////


const insertErrorMessage = (element, message) => {
    $(element).next(".error-message").remove()
    element.after($('<div class="error-message" style="background-color:red;text-align:center;padding:2% 5%;border-radius:20px;color:white;margin:0 auto;"></div>').text(message));
    element.css("border-color", "red")
}

