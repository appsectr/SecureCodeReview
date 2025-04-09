export function measureText(text, font) {
  if(!measureText.ele) {
    measureText.ele = document.createElement('div');
    measureText.ele.style.cssText = `position: absolute; visibility: hidden; white-space: nowrap; font: ${font}`;
    document.body.appendChild(measureText.ele);
  }
  measureText.ele.innerHTML = text;
  const dim = measureText.ele.getBoundingClientRect();
  return {width: dim.width, height: dim.height};
}

// https://github.com/pgadmin-org/pgadmin4/commit/1305d9910beefd0d6b4c7eb4f111f86edb1d356b
