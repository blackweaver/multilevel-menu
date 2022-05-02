class MultiLevelMenu {

    constructor (nav, menu, method, arrow) {
        this.method = method;
        this.arrow = arrow;
        this.items = []
        this.index = 0;
        this.obj = [];
        this.nav = nav;
        this.menu = menu;
        this.multilevel = document.createElement('div');
        this.multilevel.className = this.method;
        this.nav.insertBefore(this.multilevel,this.menu);
        this.currentLevel = [];

        menu ? this.readMenu(menu) : null;
        menu.style.display = "none";
    }

    get menuItems() {
        return this.items;
    }

    getBack = () => {
        this.currentLevel.pop();
        this.drawMenu(this.currentLevel[this.currentLevel.length - 1],true);
    }

    drawMenu = (parent,back) => {
        parent = parent || null;
        if(!back) this.currentLevel.push(parent);
        if(this.multilevel.children.length >= 2) {
            this.multilevel.children[0].remove();
        }
        const dl = document.createElement('dl');
        if(parent) {
            const dt = document.createElement('dt');
            const a = document.createElement('a');
            const img = document.createElement('img');
            const span = document.createElement('span');
            img.setAttribute("src",this.arrow);
            a.href = "#";
            a.setAttribute('onclick', `${ this.method }.getBack()`);
            span.textContent = document.querySelector(`[data-name="${ parent }"]`).text;
            dt.appendChild(a);
            a.appendChild(img);
            a.appendChild(span);
            dl.appendChild(dt);
        }
        for(let i = 0; i < this.obj.length; i++){
            if(this.obj[i].parent === parent) {
                const dd = document.createElement('dd');
                const a = document.createElement('a');
                const spanName = document.createElement('span');
                a.appendChild(spanName);      
                if(this.obj[i].children) {
                    const img = document.createElement('img');
                    img.setAttribute("src",this.arrow)
                    a.appendChild(img);   
                    a.setAttribute('onclick', `${ this.method }.drawMenu("${ this.obj[i].name }")`);
                }
                spanName.textContent = this.obj[i].text;
                a.href = this.obj[i].link;
                a.style.display = "flex";
                dd.appendChild(a);       
                dl.appendChild(dd);
            }
        }
        this.multilevel.appendChild(dl);
        if(this.multilevel.children.length > 1) {
            if(back) {
                this.multilevel.children[0].className = "menu-left-out";
                this.multilevel.children[1].className = "menu-right-in";
            } else {
                this.multilevel.children[0].className = "menu-right-out";
                this.multilevel.children[1].className = "menu-left-in";
            }
        }
    }

    readMenu = (parent) => {
        for(let i = 0; i<parent.children.length; i++ ){
            const nodeName = this.method + "-";
            parent.children[i].children[0].dataset.name =  nodeName + this.index;
            this.items.push( nodeName + this.index);
            this.obj.push(
                { 
                    text: parent.children[i].children[0].text,
                    link: (parent.children[i].children[1]) ? "#" : parent.children[i].children[0].href,
                    name: parent.children[i].children[0].dataset.name,
                    parent: (parent.children[0].parentNode.parentNode.children[0].dataset.name)? parent.children[0].parentNode.parentNode.children[0].dataset.name : null,
                    children: (parent.children[i].children[1]) ? true : false
                });
                this.index ++;
            if(parent.children[i].children[1]) {
                this.readMenu(parent.children[i].children[1]);    
            }
        } 
    }
};
