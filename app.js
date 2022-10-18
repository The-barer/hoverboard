const board = document.getElementById('board')
const COLORLIST = ['#a10000', '#04a100', '#0035a1', '#b7a800', '#b7008c']
const controls = document.querySelector('.controls')
const inputrange = controls.querySelector('.inputrange')
const inputvalue = controls.querySelector('.inputvalue').querySelector('div')
const addbtn = controls.querySelector('.addbtn')
const addmaxbtn = controls.querySelector('.addmaxbtn')
const clearbtn = controls.querySelector('.clearbtn')
const aboutbtn = controls.querySelector('.aboutbtn')
let squarecount = inputrange.value;

window.addEventListener('load',()=>{
    addsquare(1)
    inputvalue.innerText = inputround();
});

window.addEventListener('keydown', (event)=>{
    if(event.key === 'Enter'){
        event.preventDefault();
        addsquare(squarecount);
    }
    event.key === 'a' && showabout();
    event.key === 'm' && addmax();
    event.key === 'c' && clearboard();
    
})

addbtn.addEventListener('click', () => addsquare(squarecount));
addmaxbtn.addEventListener('click', () => addmax());
clearbtn.addEventListener('click',() => clearboard());
aboutbtn.addEventListener('click', () => showabout());


inputrange.addEventListener('input', ()=> {inputvalue.innerText = inputround()})

function inputround () {
    squarecount = parseInt(inputrange.value);
    const currentcount = document.querySelectorAll('.square').length
    return (Math.ceil(Math.sqrt(squarecount + currentcount))**2)-currentcount;
}

function squaresize() {
    if(board.querySelectorAll('.square').length > 0){
    const square = board.querySelector('.square');
    const margin = parseInt(getComputedStyle(square).margin) * 2
    return margin + square.clientWidth;
}
}

function boardsize(){
    const boardheight = document.body.clientHeight - document.querySelector('.controls').clientHeight;
    const boardwidth = document.body.clientWidth
    return boardheight<boardwidth ? boardheight : boardwidth ;
}
function maxsquare(){
    return Math.floor(boardsize()/squaresize())**2;
}
function addsquare(count){
    const totalsquarecount = board.querySelectorAll('div').length 
    if(totalsquarecount>0 && totalsquarecount>(maxsquare()-count)){
        alert(`Достигнуты границ окна. Максимум можно добавить: ${maxsquare()-totalsquarecount}`)
        return
    }
    for(let i=0; i<count; i++){
       const newsquare = document.createElement('div')
       newsquare.classList.add('square')
       newsquare.addEventListener('mouseover', () => setRandomColor(newsquare))
       newsquare.addEventListener('mouseleave', () => setOriginalColor(newsquare))
       board.append(newsquare);
    }
    boardtosquare();
}

function addmax()   {
    const totalsquarecount = board.querySelectorAll('div').length 
    const boardheight = document.body.clientHeight - document.querySelector('.controls').clientHeight - parseInt(getComputedStyle(document.body).margin);
    const boardwidth = document.body.clientWidth
    const maxsquaretoadd = Math.floor(boardheight/squaresize())*Math.floor(boardwidth/squaresize())
    if(totalsquarecount === maxsquaretoadd) {
        alert(`Максимальное заполнение! Достигнуты границ окна.`)
        return
    }
    for(let i=0; i<(maxsquaretoadd-totalsquarecount); i++){
       const newsquare = document.createElement('div')
       newsquare.classList.add('square')
       newsquare.addEventListener('mouseover', () => setRandomColor(newsquare))
       newsquare.addEventListener('mouseleave', () => setOriginalColor(newsquare))
       board.append(newsquare);
    }
    board.style.width = '100%'
    board.style.height = `${boardheight}px`
}


function boardtosquare() {
    const totalsquarecount = board.querySelectorAll('div').length
    const near = Math.ceil(Math.sqrt(totalsquarecount))**2
    if(totalsquarecount < near) {
        addsquare(near-totalsquarecount);
    }
    board.style.width = `${Math.sqrt(near)*squaresize()}px`
    board.style.height = `${Math.sqrt(near)*squaresize()}px`
}

function colorRandomSelect()    {
    return COLORLIST[Math.floor(Math.random()*COLORLIST.length)]
}

function setRandomColor(element)   {
    const newcolor = colorRandomSelect()
    element.style.backgroundColor = newcolor;
    element.style.boxShadow = `0 0 3px ${newcolor}, 0 0 15px ${newcolor}`;
}

function setOriginalColor(element) {
    const originalColor = 'aliceblue'
    element.style.backgroundColor = originalColor;
    element.style.boxShadow = `0 0 3px ${originalColor}, 0 0 15px ${originalColor}`;   
}

function clearboard() {
    board.innerHTML = ""
    board.style.width = '100%'
    addsquare(1);
}

function showabout(){
    const about = controls.querySelector('.about')
    if(about.style.display === 'none') {
    about.style.display = 'block';
    } else { about.style.display = 'none';}
}

