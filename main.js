const obj = [];
const nav = document.querySelector("nav");
const menu = document.querySelector(".menu");
const multilevel = document.createElement('div');
multilevel.className = "multilevel";
nav.insertBefore(multilevel,menu);

const slide = (level) => {
    console.log("Quiero avanzar", level);
}

const currentLevel = [];

const getBack = () => {
    currentLevel.pop();
    drawMenu(currentLevel[currentLevel.length - 1],true);
}

const drawMenu = (parent,back) => {
    parent = parent || null;
    if(!back) currentLevel.push(parent);
    if(multilevel.children.length) {
        multilevel.children[0].remove();
    }
    // console.log(...obj)
    const dl = document.createElement('dl');
    if(parent) {
        const dt = document.createElement('dt');
        const a = document.createElement('a');
        a.href = "#";
        a.setAttribute('onclick', `getBack()`);
        a.textContent = "<..." + document.querySelector(`[data-item="${ parent }"]`).text;
        dt.appendChild(a);
        dl.appendChild(dt);
    }
    for(let i = 0; i < obj.length; i++){
       
        if(obj[i].parent === parent) {
            const dd = document.createElement('dd');
            const a = document.createElement('a');
            const spanName = document.createElement('span');
            const spanArrow = document.createElement('span');
            spanArrow.textContent = "...>";
            a.appendChild(spanName);      
            if(obj[i].children) {
                a.appendChild(spanArrow);   
                console.log(obj[i].text);
                a.setAttribute('onclick', `drawMenu("${ obj[i].name }")`);
            }
            spanName.textContent = obj[i].text;
            a.href = obj[i].link;
            a.style.display = "flex";
            dd.appendChild(a);       
            dl.appendChild(dd);
        }
    }
    multilevel.appendChild(dl);
}

const readMenu = (parent) => {
    for(let i = 0; i<parent.children.length; i++ ){
        obj.push(
            { 
                text: parent.children[i].children[0].text,
                link: (parent.children[i].children[1]) ? "#" : parent.children[i].children[0].href,
                name: parent.children[i].children[0].dataset.item,
                parent: (parent.children[0].parentNode.parentNode.children[0].dataset.item)? parent.children[0].parentNode.parentNode.children[0].dataset.item : null,
                children: (parent.children[i].children[1]) ? true : false
            });
        if(parent.children[i].children[1]) {
            readMenu(parent.children[i].children[1]);    
        }
    }
}

menu ? readMenu(menu,0) : null;
menu ? drawMenu("1.1",true) : null;
// menu ? drawMenu() : null;
menu.style.display = "none";
