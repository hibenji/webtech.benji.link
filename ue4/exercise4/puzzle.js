function checkWin() {
  puzzlegrid = document.getElementById("puzzleTarget");
  let won = true;
  console.log(puzzlegrid.children.length);
  for (let i = 0; i < puzzlegrid.children.length; i++) {
    let div = puzzlegrid.children[i];
    // check if it has a image child
    if (div.children.length === 0) {
      won = false;
      break;
    }

    if (div.children[0].getAttribute('src') != div.dataset.result) {
      won = false;
      break;
    }
  }

  if (won) {
    document.getElementById("message").innerText = "You won!";
  } else {
    document.getElementById("message").innerText = "Wrong placement, try again.";
  }

}

function moving(e) {
  let me = document.querySelector('.dragging');
  if (!me) return;
  me.style.top = e.clientY - 20 + "px";
  me.style.left = e.clientX - 20 + "px";
}

function stopmoving(e) {
  this.classList.remove('dragging');
  let over = document.elementFromPoint(e.clientX, e.clientY);
  console.log(over);

  if (over && over.nodeName === 'IMG') {
    image = over;
    over = over.parentElement;
    document.getElementById("puzzleSource").appendChild(image);
  }
  console.log(over);


  if (over && over.classList.contains('puzzlePic')) {
    over.appendChild(this);
  }
  window.removeEventListener('mousemove', moving);
  this.addEventListener('click', dragStart);
  checkWin();
}

function dragStart(e) {
  this.classList.add('dragging');
  this.removeEventListener('click', dragStart);
  this.addEventListener('click', stopmoving);
  window.addEventListener('mousemove', moving);
}

// attach dragStart to all boxes
document.querySelectorAll('img').forEach(box => {
  box.addEventListener('click', dragStart);
});