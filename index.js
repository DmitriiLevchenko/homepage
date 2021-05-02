let avatar = document.querySelector("#avatar");
avatar.addEventListener("click", onAvatarPressHandler);


function onAvatarPressHandler() {
  let pageContent = document.querySelector("#content")
  const pageHeight = pageContent.height;
  const pageWidth = pageContent.width;
  let canvas = document.createElement("canvas");
  canvas.width = pageWidth;
  canvas.height = pageHeight;
  pageContent.innerHTML = ""
  BreaakOut()
}
