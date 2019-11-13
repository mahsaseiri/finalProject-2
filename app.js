$(document).ready(init);

function init() {
    var contact_code = [];
    var email = 0;
    // ajax for index page ----------------------------
    $.ajax({
        'type': 'GET',
        'url': ' https://api.myjson.com/bins/b6eod',
        'async': true,
        'success': function(res) {
            $('.total-parent').css('display', 'none');
            build(res, '#home-output', '#job_template');
        }
    });
    // ajax for aboutUs page---------------------------
    $.ajax({
        'type': 'GET',
        'url': ' https://api.myjson.com/bins/et5gt',
        'async': true,
        'success': function(res) {
            $('.total-parent2').css('display', 'none');
            build(res, '#about-team-output', '#about_template');
        }
    });
    // ajax for jobListing page -------------------------
    $.ajax({
        'type': 'GET',
        'url': 'https://api.myjson.com/bins/137x9p',
        'async': true,
        'success': function(res) {
            $('#jobListing-preloader').css('display', 'none');
            $('.dot').css('display', 'none');
            build(res, '#jobListing1-output', '#jobListing1-template');
        }
    });
    $.ajax({
        'type': 'GET',
        'url': ' https://api.myjson.com/bins/b6eod',
        'async': true,
        'success': function(res) {
            $('.total-parent3').css('display', 'none');
            build(res, '#jobDetails-output', '#job-details-template');
        }
    });
    $.ajax({
        'type': 'GET',
        'url': ' https://api.myjson.com/bins/1f6qj1',
        'async': true,
        'success': function(res) {
            $('.total-parent4').css('display', 'none');
            build(res, '#blog-output', '#blog-template');
        }
    });


    function build(data, id, template_id) {
        Handlebars.registerHelper('myif', function(a, b, opts) {
            if (a == b) {
                return opts.fn(this);
            } else {
                return opts.inverse(this);
            }


        });
        var source = $(template_id).html();
        var template = Handlebars.compile(source);
        $(id).html(template(data));
    }
    // button for all pages -----------------------------
    $('.myreturn').click(function() {
        $('html').animate({ scrollTop: 0 }, 1000);
    });
    // cheaking security code --------------------------
    function security_code() {
        var rand;
        for (var i = 0; i < 4; i++) {
            rand = Math.floor(Math.random() * 10);
            contact_code.push(rand);

        }
        $('#security-code').html(contact_code);
        contact_code = [];
    }
    security_code();
    $('#new-code').click(function() {
        security_code();
    });
    // cheaking email ------------------------------------
    $('.myemail').change(function() {
        var email_output = $('.validation-email');
        var pattern = "[a-zA-Z0-9-_.]+[@]{1}[a-zA-Z.-]+[.]{1}[a-zA-Z]{2,4}$";
        var emailinput = $('.myemail').val();
        if (emailinput.match(pattern) == null || emailinput.match(pattern).index != 0) {
            email_output.css('opacity', '1');
            email_output.css('color', 'red');
            email_output.html("نامعتبر است");

        } else {
            email_output.html("");
        }
    });
    // form validation ----------------------------------
    $('.contact-form').submit(function(e) {
        e.preventDefault();
        c = 0;
        var c1 = false;
        var m = false;
        email = 0;
        var mycode = $('.mycode').val().split('');
        sec = $('#security-code').html().split('');
        console.log(mycode);
        console.log(sec);
        var c = 0
        for (var i = 0; i < mycode.length; i++) {
            if (mycode[i] == sec[i]) {
                true;
            } else {
                c++;
            }
        }
        if (c != 0) {
            $('.validation-code').html('نادرست');
            $('.validation-code').css('color', 'red');
            c1 = false;

        } else if ($('.mycode').val() == "") {
            $('.validation-code').html('کد امنیتی را وارد کنید');
            $('.validation-code').css('color', 'red');
            c1 = false;
        } else {
            $('.validation-code').html('');
            c1 = true;
        }
        if ($('.myemail').val() == '') {
            $('.validation-email').html('ایمیل خود را وارد کنید');
            $('.validation-email').css('color', 'red');
            e = 0;
        } else {
            e = 1;
        }
        if ($('.mymessage').val() == '') {
            $('.validation-message').html('وارد کردن متن پیام ضروری است');
            $('.validation-message').css('color', 'red');
            m = false;
        } else {
            $('.validation-message').html('');
            m = true;
        }
        if ($('.myemail').val() == "" || $('.mymessage').val() == "" || $('.mycode').val() == "") {
            $('.validation-contact-form').html('لطفا اطلاعات خواسته شده را وارد کنید');
            $('.validation-contact-form').css('color', 'red');
        } else {
            $('.validation-contact-form').html('');
        }
        if (e == 1 && c1 == true && m == true) {
            $('.validation-contact-form').html('پیام شما با موفقیت ارسال شد');
            $('.validation-contact-form').css('color', 'green');
        }

    });
    // clear button  in contact form ---------------------
    $('.myclear').click(function() {
        $('.validation-contact-form').html('');
        $('.validation-code').html('');
        $('.validation-email').html('');
        $('.validation-message').html('');
    });

    $('.jobDetails-output').on('click', '.mycollapse-btn', function() {
        $('.mycollapse-btn').parents('div.parent-btn').after('<div class="details"></div>');
        // $('div.parent-btn').next().hide();
        $('.details').hide();
        $(this).parents('div.parent-btn').next().show();
        $('.details').on('click', '.details-btn', function() {
            $('.details').hide();
            var d = $('.jobDetails-output').offset().top;
            $('html').animate({
                scrollTop: d
            }, 2000);

        });
        var t = $(this).parents('div.parent-btn').offset().top;
        $('html').animate({
            scrollTop: t
        }, 2000);
        $.ajax({
            'type': 'GET',
            'url': 'https://api.myjson.com/bins/1d62sd',
            'async': true,
            'success': function(res) {
                build(res, '.details', '#showDetails-template');
            }
        });
    });
    $('.register').click(function() {
        $('.registeration-form').toggle();
        $('.candidate-form').show();
        $('.employer-form').hide();
    });
    $('.candidate').click(function() {
        if ($('.candidate-form').css('display') == 'none') {
            $('.employer-form').hide();
            $('.candidate-form').show();
            $('.employer').css('border-bottom', ' 4px solid rgba(128, 128, 128, 0.158)');
            $('.candidate').css('border-bottom', '4px solid #145fa8');
        }
    });
    $('.employer').click(function() {
        $('.candidate-form').hide();
        $('.employer-form').show();
        $('.candidate').css('border-bottom', ' 4px solid rgba(128, 128, 128, 0.158)');
        $('.employer').css('border-bottom', '4px solid #145fa8');
    });
    $('.candidate-form').submit(function(e) {
        e.preventDefault();
        if ($('.form1-name').val() == '') {
            $('.form1-name').css('border', '1px solid red');
        } else {
            $('.form1-name').css('border', '1px solid #ced4da');
        }
        if ($('.form1-family').val() == '') {
            $('.form1-family').css('border', '1px solid red');
        } else {
            $('.form1-family').css('border', '1px solid #ced4da');
        }
        if ($('.form1-email').val() == '') {
            $('.form1-email').css('border', '1px solid red');
        } else {
            $('.form1-email').css('border', '1px solid #ced4da');
        }
        if ($('.form1-password').val() == '' || $('.form1-password').val().length < 8) {
            $('.form1-password').css('border', '1px solid red');
        } else {
            $('.form1-password').css('border', '1px solid #ced4da');
        }
        if ($('.form1-phone').val().length != 11 || $('.form1-phone').val() == "" && !(isNaN($('.form1-phone').val()))) {
            $('.form1-phone').css('border', '1px solid red');
        } else {
            $('.form1-phone').css('border', '1px solid #ced4da');
        }

    });
    $('.employer-form').submit(function(e) {
        e.preventDefault();
        if ($('.form2-name').val() == '') {
            $('.form2-name').css('border', '1px solid red');
        } else {
            $('.form2-name').css('border', '1px solid #ced4da');
        }
        if ($('.form2-title').val() == '') {
            $('.form2-title').css('border', '1px solid red');
        } else {
            $('.form2-title').css('border', '1px solid #ced4da');
        }
        if ($('.form2-email').val() == '') {
            $('.form2-email').css('border', '1px solid red');
        } else {
            $('.form2-email').css('border', '1px solid #ced4da');
        }
        if ($('.form2-phone').val().length != 11 || $('.form2-phone').val() == "" && !(isNaN($('.form2-phone').val()))) {
            $('.form2-phone').css('border', '1px solid red');
        } else {
            $('.form2-phone').css('border', '1px solid #ced4da');
        }
        if ($('.form2-companyname').val() == '') {
            $('.form2-companyname').css('border', '1px solid red');
        } else {
            $('.form2-companyname').css('border', '1px solid #ced4da');
        }

    });
    $('.btn-reset').click(function() {
        $('input').css('border', '1px solid #ced4da');
    });
    $('.registeration-form .btn-close').click(function() {
        $('.registeration-form').hide();
    });
    $('#home-output').on('click', '.index-btn', function() {
        alert('ابتدا ثبت نام کنید سپس رزومه خود را بسازید ');
    });
    $('.enter').click(function() {
        $('.enter-form').toggle();
    });
    $('.enter-form .btn-close').click(function() {
        $('.enter-form').hide();
    });
    $('.can-btn').click(function() {
        $('.registeration-form').show();
        $('.candidate-form').show();
        $('.employer-form').hide();
        $('html').animate({ scrollTop: 0 }, 1000);
    });
    $('.com-btn').click(function() {
        $('.registeration-form').show();
        $('.candidate-form').hide();
        $('.employer-form').show();
        $('.candidate').css('border-bottom', ' 4px solid rgba(128, 128, 128, 0.158)');
        $('.employer').css('border-bottom', '4px solid #145fa8');
        $('html').animate({ scrollTop: 0 }, 1000);
    });
    $('.ad-btn').click(function() {
        alert('ابتدا ثبت نام کنید');
    });
    $('.cv-btn').click(function() {
        alert('ابتدا ثبت نام کنید');
    });

}