'use strict';

describe("Slideshow", function () {

    var slideshow;
    var container;
    var slides;
    var counter;
    var prev;
    var next;

    var first;

    beforeEach(function () {
        var fixture = '<section class="first">' +
            '<button class="js-slideshow-previous"></button><button class="js-slideshow-next"></button>' +
            '<div class="js-slideshow-container">' +
            '<div class="js-slideshow-slide" style="display: inline-block; width: 100px;"></div>' +
            '<div class="js-slideshow-slide" style="display: inline-block; width: 100px;"></div>' +
            '<div class="js-slideshow-slide" style="display: inline-block; width: 100px;"></div>' +
            '</div>' +
            '<div class="js-slideshow-counter"></div>' +
            '</section>';

        document.body.insertAdjacentHTML('afterbegin', fixture);

        first = document.querySelector('.first');
    });

    afterEach(function () {
        document.body.removeChild(document.querySelector('.first'));
    });


    describe("when not looping", function () {

        beforeEach(function () {
            slideshow = Slideshow();
            slideshow.init('.first', false);
            container = first.querySelector(".js-slideshow-container");
            counter = first.querySelector(".js-slideshow-counter");
            prev = first.querySelector(".js-slideshow-previous");
            next = first.querySelector(".js-slideshow-next");
            slides = Array.prototype.slice.call(container.querySelectorAll(".js-slideshow-slide"));
        });

        it("should show first slide when initialized", function () {
            expect(container.style.transform).toContain("translate3d(0px");
        });

        it("should show count 1 of 3 slides when initialized", function () {
            expect(counter.textContent).toBe("Slide 1 of 3");
        });

        it("should show inactive previous link when initialized", function () {
            expect(prev.classList).toContain("inactive");
        });

        it("should show active next link when initialized", function () {
            expect(next.classList).not.toContain("inactive");
        });

        it("should move to second slide when next is clicked", function () {
            next.click();
            expect(container.style.transform).toContain("translate3d(-100px");
        });

        it("should show count 2 of 3 slides when on second slide", function () {
            next.click();
            expect(counter.textContent).toBe("Slide 2 of 3");
        });

        it("should show active previous link when on second slide", function () {
            next.click();
            expect(prev.classList).not.toContain("inactive");
        });

        it("should show active next link when on second slide", function () {
            next.click();
            expect(next.classList).not.toContain("inactive");
        });

        it("should move to last slide when next is clicked twice", function () {
            next.click();
            next.click();
            expect(container.style.transform).toContain("translate3d(-200px");
        });

        it("should show count 3 of 3 slides when on last slide", function () {
            next.click();
            next.click();
            expect(counter.textContent).toBe("Slide 3 of 3");
        });

        it("should show active previous link when on last slide", function () {
            next.click();
            next.click();
            expect(prev.classList).not.toContain("inactive");
        });

        it("should show inactive next link when on last slide", function () {
            next.click();
            next.click();
            expect(next.classList).toContain("inactive");
        });

        it("should move to second slide from last when previous is clicked", function () {
            next.click();
            next.click();
            prev.click();
            expect(container.style.transform).toContain("translate3d(-100px");
        });

        it("should move to first slide from second when previous is clicked", function () {
            next.click();
            next.click();
            prev.click();
            prev.click();
            expect(container.style.transform).toContain("translate3d(0px");
        });

    });


    describe("when looping", function () {

        beforeEach(function () {
            slideshow = Slideshow();
            slideshow.init('.first', true);
            container = first.querySelector(".js-slideshow-container");
            counter = first.querySelector(".js-slideshow-counter");
            prev = first.querySelector(".js-slideshow-previous");
            next = first.querySelector(".js-slideshow-next");
            slides = container.querySelectorAll(".js-slideshow-slide");
        });

        it("should contain two extra slides for loop functionality", function () {
            expect(slides.length).toBe(5);
        });

        it("should show slide 2 when initialized", function () {
            expect(container.style.transform).toContain("translate3d(-100px");
        });

        it("should show count 1 of 3 slides when initialized", function () {
            expect(counter.textContent).toBe("Slide 1 of 3");
        });

        it("should not show inactive previous link when initialized", function () {
            expect(prev.classList).not.toContain("inactive");
        });

        it("should show count 2 of 3 slides when on third slide", function () {
            next.click();
            expect(counter.textContent).toBe("Slide 2 of 3");
        });

        it("should show count 3 of 3 slides when on fourth slide", function () {
            next.click();
            next.click();
            expect(counter.textContent).toBe("Slide 3 of 3");
        });

        it("should not show inactive next link when on last slide", function () {
            next.click();
            next.click();
            expect(next.classList).not.toContain("inactive");
        });

    });


    describe("when multiple on same page", function() {

        var second;
        var s_container;
        var s_slides;
        var s_counter;
        var s_prev;
        var s_next;

        beforeEach(function () {
            var fixture = '<section class="second">' +
                '<button class="js-slideshow-previous"></button><button class="js-slideshow-next"></button>' +
                '<div class="js-slideshow-container">' +
                '<div class="js-slideshow-slide" style="display: inline-block; width: 100px;"></div>' +
                '<div class="js-slideshow-slide" style="display: inline-block; width: 100px;"></div>' +
                '<div class="js-slideshow-slide" style="display: inline-block; width: 100px;"></div>' +
                '</div>' +
                '<div class="js-slideshow-counter"></div>' +
                '</section>';

            document.body.insertAdjacentHTML('afterbegin', fixture);

            slideshow = Slideshow();
            slideshow.init('.first', false);

            var slideshowSecond = Slideshow();
            slideshowSecond.init('.second', false);

            container = first.querySelector(".js-slideshow-container");
            counter = first.querySelector(".js-slideshow-counter");
            prev = first.querySelector(".js-slideshow-previous");
            next = first.querySelector(".js-slideshow-next");
            slides = container.querySelectorAll(".js-slideshow-slide");

            second = document.querySelector('.second');
            s_container = second.querySelector(".js-slideshow-container");
            s_counter = second.querySelector(".js-slideshow-counter");
            s_prev = second.querySelector(".js-slideshow-previous");
            s_next = second.querySelector(".js-slideshow-next");
            s_slides = s_container.querySelectorAll(".js-slideshow-slide");

        });

        afterEach(function () {
            document.body.removeChild(document.querySelector('.second'));
        });

        it("should show first slide for both slideshows when initialized", function () {
            expect(container.style.transform).toContain("translate3d(0px");
            expect(s_container.style.transform).toContain("translate3d(0px");
            expect(counter.textContent).toBe("Slide 1 of 3");
            expect(s_counter.textContent).toBe("Slide 1 of 3");
            expect(prev.classList).toContain("inactive");
            expect(s_prev.classList).toContain("inactive");
        });

        it("should not affect first slideshow when next is clicked on second", function () {
            s_next.click();
            expect(container.style.transform).toContain("translate3d(0px");
            expect(counter.textContent).toBe("Slide 1 of 3");
            expect(prev.classList).toContain("inactive");
        });

        it("should change to second slide on second slideshow when next is clicked", function () {
            s_next.click();
            expect(s_container.style.transform).toContain("translate3d(-100px");
            expect(s_counter.textContent).toBe("Slide 2 of 3");
            expect(s_prev.classList).not.toContain("inactive");
        });

        it("should not affect second slideshow when next is clicked on first", function () {
            next.click();
            expect(s_container.style.transform).toContain("translate3d(0px");
            expect(s_counter.textContent).toBe("Slide 1 of 3");
            expect(s_prev.classList).toContain("inactive");
        });

        it("should change to second slide on first slideshow when next is clicked", function () {
            next.click();
            expect(container.style.transform).toContain("translate3d(-100px");
            expect(counter.textContent).toBe("Slide 2 of 3");
            expect(prev.classList).not.toContain("inactive");
        });


    })

});
