document.addEventListener("DOMContentLoaded", function () {
  console.log("hello world");
  document
    .getElementById("sidebarToggle")
    .addEventListener("click", function () {
      console.log("clicked");
      document.body.classList.toggle("sidebar-toggled");
      document.querySelector(".sidebar").classList.toggle("toggled");
      if (document.querySelector(".sidebar").classList.contains("toggled")) {
        document
          .querySelectorAll(".sidebar .collapse")
          .forEach(function (collapse) {
            collapse.classList.remove("show");
          });
      }
    });
  window.addEventListener("resize", function () {
    if (window.innerWidth < 768) {
      document
        .querySelectorAll(".sidebar .collapse")
        .forEach(function (collapse) {
          collapse.classList.remove("show");
        });
    }
  });
  document
    .querySelector("body.fixed-nav .sidebar")
    .addEventListener("wheel", function (event) {
      if (window.innerWidth > 768) {
        var delta = event.wheelDelta || -event.detail;
        this.scrollTop += (delta < 0 ? 1 : -1) * 30;
        event.preventDefault();
      }
    });
  window.addEventListener("scroll", function () {
    if (window.scrollY > 100) {
      document.querySelector(".scroll-to-top").style.display = "block";
    } else {
      document.querySelector(".scroll-to-top").style.display = "none";
    }
  });
  document.querySelectorAll("a.scroll-to-top").forEach(function (anchor) {
    anchor.addEventListener("click", function (event) {
      var target = document.querySelector(this.getAttribute("href"));
      document.querySelector("html, body").animate(
        {
          scrollTop: target.offsetTop,
        },
        1000,
        "easeInOutExpo"
      );
      event.preventDefault();
    });
  });
});
