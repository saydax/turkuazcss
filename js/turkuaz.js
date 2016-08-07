/*!
* Turkuaz Framework v1.0
* www.turkuazcss.com
* MIT Lisansi (https://raw.githubusercontent.com/TurkuazCss/Framework/master/LICENSE)
*/

/*!
*    Turkuaz Framework - JavaScript Kod Duzeni
*
*   1. Etiket
*   2. Form
*   3. Menu
*   4. Notlar
*   5. Sayfa Konumu
*
*/



/* ============= 1. Etiket */

$("a.etiket.kapat").click(function(e){ e.preventDefault() })
$("a.etiket.kapat").append("<span class=kaldir>&times</span>")
.end()
.find("span.kaldir").click(function(){
    $(this).parents("a.etiket.kapat").addClass("gizle")
})



/* ============= 2. Form */

$formEtiketleri = ".tr-input,.tr-checkbox,.tr-radio,.tr-textarea"
$placeholder = ".tr-input,.tr-textarea"

placeholder()

$($formEtiketleri).focus(function(){
    $(this).addClass("aktif dolu")
}).focusout(function(){
    if($(this).val() == ""){
        $(this).removeClass("dolu")
    }
    placeholder()
    $(this).removeClass("aktif")
})

function placeholder(){
    $($placeholder).each(function(){
        var placeholder = $(this).attr("placeholder")
        if(placeholder !== undefined && placeholder !== "") {
            $(this).addClass("dolu")
        }
    })
}

/* ============= 3. Menu */

//Mobil Menu
$("nav.menu.mobil").on("click", "img.logo", function(){
    $(this).hide()
    .parents("nav.menu.mobil").animate({left:"0"})
    $("body").append("<div class='tr-karart'></div>")
    .end().find(".tr-karart").css({ "background-color": "rgba(0,0,0,.85)", "height": "100%",
    "left": "0", "position": "fixed", "top": "0", "width": "100%", "z-index": "999" })
})

$("body").on("click", ".tr-karart", function(){
    $(this).remove()
    $("nav.menu.mobil").animate({left:"-240px"})
    .find("img.logo").delay(400).fadeIn()
})

$("nav.menu ul li").find("ul li a").parent().parent().parent().addClass("acilir")

$("body").on("click", "nav.menu.mobil ul li.acilir", function(){
    var yukseklik = $(this).find("li").length * 45
    $(this).find("ul").css({
        "height": yukseklik + "px"
    })
    .slideToggle("500")
    .parent().siblings(".acilir")
    .find("ul:visible").slideToggle("500")
})

function mobil(){
    if ($(window).width() <= 1000) {
        $("nav.menu.mobil").addClass("mobilmenu")
        $(".tr-karart").removeClass("gizle")
    }
    else {
        $("nav.menu.mobil").removeClass("mobilmenu")
        $(".tr-karart").addClass("gizle")
    }
    $("nav.menu ul li.acilir ul").each(function(){
        $(this).hide("600")
    })
}

mobil()
$(window).resize(function() { mobil() })

// Tab Menu
;(function($){
    $.fn.tab = function(ayarlar){
        var obj = $.extend({
            "aktifSinifi" : "aktif",
            "icerikSinifi" : "icerik",
            "aktifSekme" : 1,
            "tema" : ""
        }, ayarlar)
        return this.each(function() {
            $(this).addClass("tr-tab " + obj.tema)
            .find("nav a").eq(obj.aktifSekme - 1).addClass(obj.aktifSinifi)
            .parents(".tr-tab").find("." + obj.icerikSinifi).addClass("tr-icerik gizle")
            .eq(obj.aktifSekme - 1).removeClass("gizle")
            $(this).find("nav a").click(function(){
                var index = $(this).index()
                $(this).addClass(obj.aktifSinifi)
                .siblings().removeClass(obj.aktifSinifi)
                .parents(".tr-tab").find("." + obj.icerikSinifi).addClass("gizle")
                .eq(index).removeClass("gizle")
            })
        })
    }
})(jQuery)

// Filtre Menu
$(".tr-filtre [data-target=hepsi]").addClass("aktif")
$(".tr-filtre").on("click", "nav a", function(){
    var target = $(this).data("target")
    $(this).addClass("aktif")
    .siblings().removeClass("aktif")
    .end()
    .parents(".tr-filtre").find(".tr.icerik").removeClass("gizle")
    .not("." + target).addClass("gizle")
    if(target == "hepsi" || target == "hepsi aktif") {
        $(this).parents(".tr-filtre").find(".icerik").removeClass("gizle")
    }
})

// Akordiyon MenuWW
;(function($){
    $.fn.akordiyon = function(ayarlar){
        var obj = $.extend({
            "aktifSinifi" : "aktif",
            "baslikSinifi" : "baslik",
            "icerikSinifi" : "icerik",
            "aktifSekme" : 1,
            "sure" : 200,
            "gecikme" : 0,
            "tema" : ""
        }, ayarlar)
        return this.each(function() {
            $sekmeSayisi = $("." + obj.baslikSinifi, this).length
            if (Math.abs(obj.aktifSekme) > $sekmeSayisi){
                obj.aktifSekme = $sekmeSayisi
            }
            $(this).addClass("tr-akordiyon " + obj.tema)
            .find("." + obj.icerikSinifi).delay(obj.gecikme).slideUp(obj.sure)
            .eq(obj.aktifSekme-1).slideDown(obj.sure)
            .end().end().find("." + obj.baslikSinifi).eq(obj.aktifSekme-1).addClass("aktif")
            $(this).find("." + obj.baslikSinifi).click(function(e){
                e.preventDefault()
                var index = $(this).index("." + obj.baslikSinifi)
                $(this).toggleClass(obj.aktifSinifi).siblings("."+ obj.baslikSinifi).removeClass(obj.aktifSinifi)
                .end().next().delay(obj.gecikme).slideToggle(obj.sure)
                .end().next().delay(obj.gecikme).siblings("."+ obj.icerikSinifi).slideUp(obj.sure)
            })
        })
    }
})(jQuery)


/* ============= 4. Notlar */

$(".tr-not").append("<span class=kaldir>&times</span>")

$(".tr-not").on("click", "span.kaldir", function(){
    $(this).parents(".tr-not").addClass("gizle")
})


/* ============= 5. Sayfa Konumu */

$(".tr-numara").on("click", "a.pasif,a.aktif", function(e){ e.preventDefault() })

/* ============= Modal */

;(function($) {
    $.fn.modal = function(ayarlar) {
        var obj = $.extend({
            "modalSinif" : "modal",
            "opacity" : .1,
            "overlay" : "tr-modal-karart",
            "openTime" : 250,
            "closeTime" : 250,
            "close" : false,
            "closeConnent" : "&times",
            "size" : "orta",
            "autofocus" : true
        }, ayarlar)
        return this.each(function() {
            $("body").find('[data-modal]').hide()
            $("body").on("click", "a.modal", function(e) {
                e.preventDefault();
                var href = $(this).attr("href");
                var modal = $("body").find('[data-modal=' + href + ']')
                modal.addClass(obj.size).fadeIn(obj.openTime).scrollTop(0)
                .end().append('<div class=' + obj.overlay + '></div>')
                .find("." + obj.overlay).css({ "background-color": "rgba(0,0,0," + obj.opacity + ")", "height": "100%", "left": "0",
                "position": "fixed", "top": "0", "width": "100%", "z-index": "1000" })
                if (obj.close) { $("body").append("<span class=kapatButon>" + obj.closeConnent + "</span>") }
                if (obj.autofocus) { modal.find(".tr-input:visible:first").focus() }

                $("body").on("click", ".modal-kapat, ." + obj.overlay + ", .kapatButon", function(e) {
                    e.preventDefault();
                    modal.fadeOut(obj.closeTime)
                    .end().find("." + obj.overlay + ", .kapatButon").remove()
                });
            });
        });
    }
})(jQuery);
