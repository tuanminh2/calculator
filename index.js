let display = document.getElementById('display');
let buttons = Array.from(document.getElementsByClassName('button'));
let history = 0;
buttons.map((button) => {
  button.addEventListener('click', (e) => {
    switch (e.target.innerText) {
      case 'C':
        display.innerText = '';
        break;
      case '←':
        display.innerText = display.innerText.slice(0, -1);
        break;
      case '=':
        try {
          let inpStr = display.innerText;
          inpStr = inpStr.replaceAll('^', '**');

          console.log(inpStr);
          for (let i = 0; i < inpStr.length; i++) {
            if (inpStr[i] === '√') {
              let restStr = inpStr.substring(i);
              console.log('erststr', restStr);
              for (let j = 1; j < restStr.length; j++) {
                if (isNaN(restStr[j]) ) {
                  console.log('not a num', restStr[j]);
                  let val = restStr.substring(1, j).trim();

                  let startStr = inpStr.substring(0, i);
                  let endStr = inpStr.substring(
                    inpStr.indexOf(val) + val.length
                  );

                  inpStr = startStr.concat(String(Math.sqrt(val)));
                  inpStr = inpStr.concat(endStr);

                  console.log('rs', inpStr);
                }else if(j==(restStr.length-1)){
                console.log(j,"sjfbsjfsd")
                }
              }
            }
          }

          inpStr = inpStr.replaceAll('√', '');
          console.log('sadfjsandf11111', inpStr);
          // let rs = eval(inpStr);
          // history = rs;
          // display.innerText = rs;
        } catch (e) {
          console.log(e);

          display.innerText = 'Error';
        }
        break;
      case 'Ans':
        if (history !== 0) display.innerText += history;
        break;
      case 'Round':
        let num = display.innerText;

        if (!isNaN(num)) {
          num = parseFloat(num);
          display.innerText = Math.round(num * 100) / 100;
        }
        break;
      case 'Xn':
        display.innerText += '^';
        break;
      case '√X':
        display.innerText += '√';
        break;
      default:
        display.innerText += e.target.innerText;
        break;
    }
  });
});

let cb = document.getElementById('cb');
cb.addEventListener('change', function () {
  document.body.classList.toggle('dark');
  document.getElementById('container').classList.toggle('dark');
});
