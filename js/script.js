if(!(Element.prototype.addEventListener)){
    Element.prototype.addEventListener=function(evname,handle){
        this.attachEvent(evname,handele);
    };
    Element.prototype.removeEventListener=function(evname,handle){
        this.detachEvent(evname,handle);
    };
}
(function () {
    function getScrollTop() {
        return window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop;
    }
    function getScrollHeight() {
        return document.documentElement.scrollHeight || document.body.scrollHeight;
    }
    Element.prototype.scrollByAhref = function (time) {
        var rect = this.getBoundingClientRect();
        var direction = rect.top > 0 ? 1 : -1;
        var stCount = time * 25 / 1000;


        var step = Math.abs(rect.top) / stCount;

        function isEndScroll() {
            return (direction == -1 && getScrollTop() == 0) || (direction == 1 && getScrollTop() >= (getScrollHeight() - window.innerHeight))
        }

        var isInView = function () {
            return Math.abs(this.getBoundingClientRect().top) < step;
        }.bind(this);

        var timer = setInterval(function () {
            if (isEndScroll() || isInView()) {
                window.scrollBy(0, this.getBoundingClientRect().top)
                console.log("stop")
                clearInterval(timer);
                return;
            }
            window.scrollBy(0, step * direction)

        }.bind(this), 40)

    };
})();


window.addEventListener('load', function () {
    var menuNav = document.querySelector(".navM");
    menuNav.addEventListener('click', function (e) {
        if (e.target.matches("A")) {
            document.querySelector(e.target.dataset.selector).scrollByAhref(1000);
        }
    })

})

//