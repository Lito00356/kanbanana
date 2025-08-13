const $openMenu = document.getElementById("closed-menu");
const $closeMenu = document.getElementById("opened-menu");
const $filter = document.getElementById("filter");
const $scrollMenu = document.getElementById("menu");

const $hamburgerClosed = document.querySelector(".hamburger-closed");
const $hamburgerOpened = document.querySelector(".hamburger-closed");

$openMenu.addEventListener("click", function () {
  $openMenu.classList.add("open");
  $closeMenu.classList.add("open");
  $scrollMenu.classList.add("open");

  $hamburgerClosed.classList.add("open");
  $hamburgerOpened.classList.add("open");
});
$closeMenu.addEventListener("click", function () {
  $openMenu.classList.remove("open");
  $closeMenu.classList.remove("open");
  $scrollMenu.classList.remove("open");
});
$filter.addEventListener("click", function () {
  console.log("hallo");
});
