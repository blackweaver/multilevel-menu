const obj = [];
const nav = document.querySelector("nav");
const menu = document.querySelector(".menu");
const multilevel = document.createElement('div');
multilevel.className = "multilevel";
nav.insertBefore(multilevel,menu);

const slide = (level) => {
    console.log("Quiero avanzar", level);
}

const levels = [];

const getBack = (level) => {
    levels.pop();
    console.log(levels[levels.length - 1]);
    drawMenu(level,levels[levels.length - 1],true);
}

const drawMenu = (level,parent,back) => {
    parent = parent || null;
    if(!back) levels.push(parent);
    console.log(levels)
    if(multilevel.children.length) {
        multilevel.children[0].remove();
    }
    // console.log(...obj)
    const dl = document.createElement('dl');
    if(parent) {
        const dt = document.createElement('dt');
        const a = document.createElement('a');
        a.href = "#";
        a.setAttribute('onclick', `getBack(${ level - 1 })`);
        a.textContent = parent;
        dt.appendChild(a);
        dl.appendChild(dt);
    }
    for(let i = 0; i < obj.length; i++){
        if(obj[i].level === level && (obj[i].parent === parent || parent === null)) {
            const dd = document.createElement('dd');
            const a = document.createElement('a');
            a.textContent = obj[i].text;
            a.href = obj[i].link;
            if(obj[i].children) {
                a.setAttribute('onclick', `drawMenu(${ obj[i].level + 1 }, "${ obj[i].text }")`);
            }
            dd.appendChild(a);       
            dl.appendChild(dd);
        }
    }
    multilevel.appendChild(dl);
}

const readMenu = (parent,level) => {
    for(let i = 0; i<parent.children.length; i++ ){
        obj.push(
            { 
                text: parent.children[i].children[0].text,
                link: (parent.children[i].children[1]) ? "#" : parent.children[i].children[0].href,
                level: level,
                parent: (parent.children[0].parentNode.parentNode.children[0].text)? parent.children[0].parentNode.parentNode.children[0].text : null,
                children: (parent.children[i].children[1]) ? true : false
            });
        if(parent.children[i].children[1]) {
            readMenu(parent.children[i].children[1], level + 1);    
        }
    }
}

menu ? readMenu(menu,0) : null;
menu ? drawMenu(0) : null;
menu.style.display = "none";
