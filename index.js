let avatar = document.querySelector("#avatar");
avatar.addEventListener("click", onAvatarPressHandler);

async function onAvatarPressHandler() {
  let pageContent = document.querySelector("#content");
  const pageHeight = 700;
  const pageWidth = pageContent.offsetWidth - 40;
  const canvas = initCanvas(pageHeight, pageWidth);
  await hideContent(pageContent);
  pageContent.innerHTML = "";
  pageContent.appendChild(canvas);
  await showContent(pageContent);
  initBreakOutGame(canvas, {});
}
function initCanvas(height, width) {
  canvas = document.createElement("canvas");
  canvas.id = "canvas";
  canvas.width = width;
  canvas.height = height;

  canvas.classList.add("iridescent-border");
  return canvas;
}
async function hideContent(content) {
  content.classList.add("hide");
  content.addEventListener("animationend", function () {
    content.classList.remove("hide");
  });
  await timeout(2000);
}
async function showContent(content) {
  content.classList.add("show");
  content.addEventListener("animationend", function () {
    content.classList.remove("show");
  });
}
function timeout(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
