
export function createDiv(classList,innerText,innerChildArr,style){
  const mainDivContainer = document.createElement('div');
  if(innerText && innerText.length != 0){
    mainDivContainer.innerText = innerText;
  }
  if(innerChildArr && innerChildArr.length != 0){
    innerChildArr.forEach(ele => {
      mainDivContainer.appendChild(ele);
    });
  }
  if(classList && classList.length !=0){
    classList.forEach(classL => {
      mainDivContainer.classList.add(classL);
    });
  }
  if(style){
    mainDivContainer.style = style;
  }
  return mainDivContainer;
}

export function createPTag(classList,innerText,style){
  const mainPContainer = document.createElement('p');
  if (innerText && innerText.length != 0) {
    mainPContainer.innerText = innerText;
  }
  if (classList && classList.length != 0) {
    classList.forEach((classL) => {
      mainPContainer.classList.add(classL);
    });
  }
  if (style) {
    mainPContainer.style = style;
  }

  return mainPContainer;
}

export function createImgTag(classList,src,alt,style){
  const mainImgContainer = document.createElement('img');
  if (classList && classList.length != 0) {
    classList.forEach((classL) => {
      mainImgContainer.classList.add(classL);
    });
  }
  if (style) {
    mainImgContainer.style = style;
  }
  if(src){
    mainImgContainer.src = src;
  }
  if(alt){
    mainImgContainer.alt = alt;
  }

  return mainImgContainer;
}