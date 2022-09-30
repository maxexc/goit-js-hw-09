const refs = {
  startBtn: document.querySelector('button[data-start]'),
  stopBtn: document.querySelector('button[data-stop]'),
  p: document.querySelector('p'),
};
console.log(refs.startBtn);
console.log(refs.stopBtn);
console.log(refs.p);

refs.startBtn.addEventListener('click', startChangeColorBody);
refs.stopBtn.addEventListener('click', stopChangeColorBody);

let timerId = '';

function startChangeColorBody() {
  timerId = setInterval(() => {
    let color = getRandomHexColor();
    //   let color = `#${Math.floor(Math.random() * 16777215).toString(16)}`;
    console.log(color);
    document.body.style.backgroundColor = color;
  }, 1000);
  refs.startBtn.setAttribute('disabled', false);
  refs.stopBtn.removeAttribute('disabled');
  refs.p.innerHTML = '<p><a href="../index.html">Go back</a></p>';
}

function stopChangeColorBody() {
  clearInterval(timerId);
  console.log(
    `notice: color change stopped, push start to continue, have a good day) `
  );
  refs.p.innerHTML =
    '<p><a href="../index.html">Go back</a> <b>notice</b>: color change stopped, push start to continue, have a good day)</p>';
  refs.stopBtn.setAttribute('disabled', true);
  refs.startBtn.removeAttribute('disabled');
}

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}
