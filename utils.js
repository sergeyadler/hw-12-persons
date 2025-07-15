function createDeleteButton(onDelete){
    const buttonDel = document.createElement('button');
    buttonDel.textContent = 'Delete';
    buttonDel.className = 'btn btn-danger';
    buttonDel.style.marginRight='30px';
    buttonDel.addEventListener('click', onDelete);
    return buttonDel;
}