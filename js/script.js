////////////////////////////////////////////////////
// GLOBAL VARIABLES
////////////////////////////////////////////////////
// Basic Info
const userName = $('#name')
const userEmail = $('#mail')

//Design and Color Section
const nameINPUT = $('#name');
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

////////////////////////////////////////////////////
// ON PAGE LOAD FUNCTION CALLS AND ADDED JS ELEMENTS
////////////////////////////////////////////////////

// Sets focus statte to first field 
nameINPUT.focus();
// Sets Other Job Role Input to hide if JS working
otherJobRoleINPUT.hide();
// Removes "Select Theme" option from design select menu
selectThemeOPTION.remove();
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


// Payment Validation Functions

const nameValidation = () => {
    if (/[A-Z][a-zA-Z][^#&<>\"~;$^%{}?]{1,30}$/g.test(userName.val())) {
        console.log("name true")
        return true
    } else {
        console.log("name false")
        return false
    }
} 

const emailValidation = () => { 
    if (/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(userEmail.val())) {
        console.log("email true")
        return true
    } else {
        console.log("email false")
        return false
    }
}
const activityValidation = () => {
    if ($(activitySection).find("input")[0].checked) {
        console.log("activity true")
        return true
    } else {
        console.log("activity false")
        return false
    }
}

const creditCardValidation = () => { 
    if (/^(5$|5[1-5])/.test(ccNum.val())) {
        console.log("cc true")
        return true
    } else {
        console.log("cc false")
        return false
    }
}

const zipCodeValidation = () => {
    if (/^\d{5}$|^\d{5}-\d{4}$/.test(zipCode.val())) {
        console.log("zip true")
        return true
    } else {
        console.log("zip false")
        return false
    }
}
const cvvValidation = () => {
    if (/^[0-9]{3,4}$/.test(cvvNum.val())) {
        console.log("cvv true")
        return true
    } else {
        console.log("cvv false")
        return false
    }
}

const allValidation = () => {
    nameValidation()
    emailValidation()
    activityValidation()
    creditCardValidation()
    zipCodeValidation()
    cvvValidation()
}