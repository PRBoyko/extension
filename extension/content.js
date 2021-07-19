const delegate = (selector) => (cb) => (e) => e.target.matches(selector) && cb(e);
const inputDelegate = delegate('input[type="text"]');
function removeElement(event) {
  let inputValue = document.getElementById('change');
  inputValue.value = inputValue.value .replace(valueForChange,event.target.innerHTML)
  document.getElementById("popup_menu_for_change").remove();
  window.setTimeout(function ()
  {
    inputValue.focus();
  }, 0);
  inputValue.removeAttribute('id');
}
let valueForChange='';
const wordsForChange = {
  Cat: 'Dog ,Rat ,bat ',
  Helo: 'hello ,Help ,Hell ',
  heldp: 'help ,held ,hello '
}
let keyWord='';
document.body.addEventListener('input', inputDelegate((el) => {
    el.target.id='change';
    let top = el.path[0].getBoundingClientRect().y;
    let left = el.path[0].getBoundingClientRect().x+el.path[0].selectionEnd*7;
    for (const [key, value] of Object.entries(wordsForChange)) {
      if (el.target.value.endsWith(key + ' ')) {
        console.log(el.target.value)
        keyWord=key;
        valueForChange=el.target.value.split(' ')[el.target.value.split(' ').length-2] + ' ';
        document.body.insertAdjacentHTML('afterbegin',
          `<div id="popup_menu_for_change">
                    <p class="popup_menu_for_change_variants">${value.split(',')[0]}</p>                  
                    <p class="popup_menu_for_change_variants">${value.split(',')[1]}</p>                  
                    <p class="popup_menu_for_change_variants">${value.split(',')[2]}</p>                  
</div>`)
        let movePopUp = document.getElementById('popup_menu_for_change');
        movePopUp.addEventListener('click',removeElement);
        movePopUp.style.top = top+ +getComputedStyle(el.path[0]).height.replace('px','')+'px';
        movePopUp.style.left = left +'px';
      }
    }
    if (!el.target.value.endsWith(keyWord + ' ') && document.getElementById("popup_menu_for_change")){
      document.getElementById("popup_menu_for_change").remove();
    }
  }
));







