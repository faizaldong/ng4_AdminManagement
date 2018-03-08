// $(function() {

//     var cardNumber = $('#cardNumber');
//     var cardNumberField = $('#card-number-field');
//     var mastercard = $("#mastercard");
//     var visa = $("#visa");
//     var amex = $("#amex");

//     // Use the payform library to format and validate
//     // the payment fields.

//     cardNumber.payform('formatCardNumber');


//     cardNumber.keyup(function() {
//         console.log(cardNumber.val())

//         amex.removeClass('transparent');
//         visa.removeClass('transparent');
//         mastercard.removeClass('transparent');

//         if ($.payform.validateCardNumber(cardNumber.val()) == false) {
//             cardNumberField.addClass('has-error');
//         } else {
//             cardNumberField.removeClass('has-error');
//             cardNumberField.addClass('has-success');
//         }

//         if ($.payform.parseCardType(cardNumber.val()) == 'visa') {
//             mastercard.addClass('transparent');
//             amex.addClass('transparent');
//         } else if ($.payform.parseCardType(cardNumber.val()) == 'amex') {
//             mastercard.addClass('transparent');
//             visa.addClass('transparent');
//         } else if ($.payform.parseCardType(cardNumber.val()) == 'mastercard') {
//             amex.addClass('transparent');
//             visa.addClass('transparent');
//         }
//     });
// });
