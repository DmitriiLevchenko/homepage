let avatar = document.querySelector("#avatar");
avatar.addEventListener("click", onAvatarPressHandler);

function onAvatarPressHandler() {
  let pageContent = document.querySelector("#content");
  const pageHeight = 700;
  const pageWidth = pageContent.offsetWidth;
  let canvas = document.createElement("canvas");
  canvas.id = "canvas";
  canvas.width = pageWidth;
  canvas.height = pageHeight;
  pageContent.innerHTML = "";
  pageContent.appendChild(canvas);
  let breakOutInst = new BreaakOut({});
  //breakOutInst.init();
}
