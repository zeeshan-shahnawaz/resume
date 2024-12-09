$(document).ready(function () {
    $('.repeater').repeater({
        initEmpty: false,
        defaultValues: {
            'text-input': ''
        },
        show: function () {
            $(this).slideDown();
        },
        hide: function (deleteElement) {
            $(this).slideUp(deleteElement);
            function generateCV() {
                // Your code for generating the CV goes here
            }
            setTimeout(function () {
                generateCV();
            }, 500);
        },
        isFirstItemUndeletable: true
    });
});
