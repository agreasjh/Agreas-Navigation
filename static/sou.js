$(document).ready(function() {
    var wid = $("body").width();
    if (wid < 640) { } else { $(".wd").focus(); }
    $("#menu").click(function(event) {
        $(this).toggleClass('on');
        $(".list").toggleClass('closed');
        $(".mywth").toggleClass('hidden');
    });
    $("#content").click(function(event) {
        $(".on").removeClass('on');
        $(".list").addClass('closed');
        $(".mywth").removeClass('hidden');
        $('#word').hide();
    });
    var current = localStorage.getItem("5iux-sou-search") || "bing";
    $lg = $(".lg");
    $lg.addClass(current);

    $lg.click(function() {
        if(current == 'bing'){
            $lg.removeClass('bing').addClass('google');
            current = 'google';
        } else if(current == 'google') {
            $lg.removeClass('google').addClass('fastgpt');
            current = 'fastgpt';
        } else if(current == 'fastgpt') {
            $lg.removeClass('fastgpt').addClass('andi');
            current = 'andi';
        } else if(current == 'andi') {
            $lg.removeClass('andi').addClass('mita');
            current = 'mita';
        } else if(current == 'mita') {
            $lg.removeClass('mita').addClass('bing');
            current = 'bing';
        localStorage.setItem("5iux-sou-search",current);
    });

    $('#search').submit(function(event) {
        event.preventDefault();
        const searchTerm = $('.wd').val();
        if(current == 'bing'){
            window.open('https://www.bing.com/search?q=' + searchTerm);
        } else if(current == 'google') {
            window.open('https://www.google.com/search?hl=zh&q=' + searchTerm);
        } else if(current == 'fastgpt') {
            window.open('https://kagi.com/fastgpt?query=' + searchTerm); 
        } else if(current == 'andi') {
            window.open('https://andisearch.com/?query=' + searchTerm);
        } else if(current == 'mita') {
            window.open('https://metaso.cn/?q=' + searchTerm);
    })
});

$(function() {
    $('.wd').keyup(function() {
        var keywords = $(this).val();
        if (keywords == '') { $('#word').hide(); return };
        $.ajax({
            url: 'https://suggestqueries.google.com/complete/search?client=firefox&hl=zh&q=' + keywords,
            dataType: 'jsonp',
            jsonp: 'cb',
            beforeSend: function() { },
            success: function(data) {
                $('#word').empty().show();
                if (data[1].length == 0) { $('#word').hide(); }
                $.each(data[1], function(index, suggestion) {
                    $('#word').append('<li><svg class="icon" style=" width: 15px; height: 15px; opacity: 0.5;" aria-hidden="true"><use xlink:href="#icon-sousuo"></use></svg> ' + suggestion + '</li>');
                });
            },
            error: function() {
                $('#word').empty().show();
                $('#word').hide();
            }
        });
    });

    $(document).on('click', '#word li', function() {
        var word = $(this).text();
        $('.wd').val(word);
        $('#word').hide();
        $("form").submit();
    });
});
