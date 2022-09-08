let display = document.getElementById('display');
let buttons = Array.from(document.getElementsByClassName('button'));
let history = 0;
let expressionsHistory = '';
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
          expressionsHistory = inpStr;

          inpStr = inpStr.replaceAll('^', '**');

          for (let i = 0; i < inpStr.length; i++) {
            if (inpStr[i] === '√') {
              inpStr = inpStr.replace('√', '');
              let restStr = inpStr.substring(i);

              for (let j = 0; j < restStr.length; j++) {
                if (isNaN(restStr[j])) {
                  let val = restStr.substring(0, j).trim();

                  let startStr = inpStr.substring(0, i);

                  let endStr = inpStr.substring(i + j);

                  let tmp = startStr.concat(String(Math.sqrt(val)));
                  inpStr = tmp.concat(endStr);

                  break;
                } else if (i + j == inpStr.length - 1) {
                  let val = restStr.substring(0, j + 1).trim();

                  let startStr = inpStr.substring(0, i);

                  inpStr = startStr.concat(String(Math.sqrt(val)));

                  break;
                }
              }
            }

            console.log('----', inpStr);
          }

          let rs = eval(inpStr);

          history = rs;
          display.innerText = rs;
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

      case 'Pre':
        if (expressionsHistory !== '') display.innerText = expressionsHistory;
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
