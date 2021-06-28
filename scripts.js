const itemCard = document.querySelectorAll('.itemCard');
const flower_pos = document.querySelectorAll('.flower_pos');
const yourBudget = document.querySelector('.yourBudget');
const shove = document.querySelector('.shove');

let pickedItemCard;
let remainBudget = +yourBudget.textContent.substring(yourBudget.textContent.length - 5,
    yourBudget.textContent.length - 1);
let isShove = false;

flower_pos.forEach(pos => {
    pos.addEventListener('click', () => {
        if (isShove == true && pos.style.background != '') {
            pos.style.background = '';

            const restoreValue = +pos.getAttribute('priceValue');
            console.log(restoreValue)

            // cập nhập số tiền còn lại
            remainBudget += restoreValue;
            yourBudget.innerHTML = `Your budget: ${remainBudget} <i class="fas fa-sun"></i>`;

            isShove = false;
        }
        else {
            if (pickedItemCard == null) {
                alert('Please pick your defenders!');
            }
            else {
                const currentValue = +pickedItemCard.querySelector('.itemPrice').textContent.substring(0,
                    yourBudget.textContent.length - 1);

                if (currentValue <= remainBudget) {
                    if (pos.style.background == '') {
                        // cập nhập số tiền còn lại
                        remainBudget -= currentValue;
                        yourBudget.innerHTML = `Your budget: ${remainBudget} <i class="fas fa-sun"></i>`;

                        //cập nhập ảnh nền
                        const itemIMG = pickedItemCard.querySelector('.itemIMG');
                        const classNameItem = itemIMG.classList[1];
                        const item = pickedItemCard.querySelector(`.${classNameItem}`);
                        // console.log(window.getComputedStyle(item).getPropertyValue('background-image'));

                        pos.style.background = `${window.getComputedStyle(item).getPropertyValue('background-image')}`;
                        pos.style.backgroundPosition = 'center';
                        pos.style.backgroundSize = 'contain';
                        pos.style.backgroundRepeat = 'no-repeat';

                        pos.setAttribute('priceValue', currentValue);
                        pickedItemCard = null;
                    }
                    else {
                        alert('This position already had an item inside!');
                    }
                } else {
                    alert("You cann't affort this item!");
                }
            }
        }
    })
});

itemCard.forEach(item => {
    item.addEventListener('click', () => {
        pickedItemCard = item;
    })
});

shove.addEventListener('click', () => {
    isShove = true;
})

// KHUNG CHAT
const sendBtn = document.querySelector('#btnSend');
const mess_content = document.querySelector('.mess_content');
const chat_content_holder = document.querySelector('.chat_content_holder');

sendBtn.addEventListener('click', () => {
    if (mess_content.value != '') {
        const mess = document.createElement('div');
        mess.classList.add('chat_content');

        mess.textContent += mess_content.value;

        chat_content_holder.appendChild(mess);
        mess_content.value = '';
    }
})