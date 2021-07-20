const wordsForChange = {
  Cat: 'Dog,Rat,bat ',
  Helo: 'hello,Help,Hell ',
  heldp: 'help,held,hello '
}

let valueForChange = '';
let start;
document.body.addEventListener('input', (event) => {
  console.log(event)
  if (event.data !== ' ') {
    let movePopUp = document.getElementById('popup_menu_for_change')
    if (movePopUp) {
      movePopUp.remove();
      valueForChange = '';
    }
    valueForChange += event.data
  } else {
    let movePopUp = document.getElementById('popup_menu_for_change')
    if (movePopUp) {
      movePopUp.remove();
      valueForChange = '';
    } else if (valueForChange in wordsForChange) {
      event.target.id = 'change';
      let inputForChange = document.getElementById('change');
      start = inputForChange.selectionStart;
      let top = inputForChange.getBoundingClientRect().y;
      let left = inputForChange.getBoundingClientRect().x + inputForChange.selectionEnd * 7;
      let addData = wordsForChange[valueForChange].split(',').map(data => `<p class="popup_menu_for_change_variants">${data}</p>`)
      document.body.insertAdjacentHTML('afterbegin',
        `<div id="popup_menu_for_change">
 ${addData.toString().replace(/,/g, '')}
</div>`)
      let movePopUp = document.getElementById('popup_menu_for_change');
      movePopUp.addEventListener('click', removeElement);
      movePopUp.style.top = top + +getComputedStyle(event.path[0]).height.replace('px', '') + 'px';
      movePopUp.style.left = left + 'px';
    } else {
      valueForChange = '';
    }

  }
})

function removeElement(event) {
  let inputValue = document.getElementById('change');

  if (inputValue.value) {
    let substrForRest = inputValue.value.substr(0, start - valueForChange.length - 1);
    let valueForReplace = inputValue.value.substr(start - valueForChange.length - 1)
    inputValue.value = substrForRest + valueForReplace.replace(valueForChange, event.target.innerText)
  } else {
    inputValue.innerText = inputValue.innerText.replace(valueForChange, event.target.innerText)
  }
  document.getElementById("popup_menu_for_change").remove();
  window.setTimeout(function () {
    inputValue.focus();
  }, 0);
  inputValue.selectionStart = start + (event.target.innerText.length - valueForChange.length);
  inputValue.selectionEnd = start + (event.target.innerText.length - valueForChange.length);
  inputValue.removeAttribute('id');
  valueForChange = '';
}
