$(document).ready(function () {
    ($('.repeater') as any).repeater({
        initEmpty: false,
        defaultValues: {
            'text-input': ''
        },
        show: function () {
            $(this).slideDown();
        },
        hide: function (deleteElement: () => void) {
            $(this).slideUp(deleteElement);
            function generateCV() {
                // Your code for generating the CV goes here
            }
            
            setTimeout(() => {
                generateCV();
            }, 500);
        },
        isFirstItemUndeletable: true
    });
});
