# Menú agnóstico multinivel

./main.css
./index.html
./multilevelmenu.js
./images/arrow.svg

## ¿Cómo funciona?

1) Importar multilevelmenu.js en el index.html y colocar en el head.
2) Importar la hoja de estilos main.css y colocar en el head.
3) Crear las listas anidadas respetando la estructura del ejemplo:

```javascript
<nav style="width: 80vw; overflow: hidden">
        <ul class="menu">
            <li>
                <a href="#">1 First level </a> 
                <ul>
```

4) Antes de cerrar el body instanciar la clase MultiLevelMenu de dentro de maultilevelmenu.js:

```javascript
<script>
    const nav = document.querySelector("nav");
    const menu = document.querySelector(".menu");

    const mainMenu1 = new MultiLevelMenu(nav,menu,"mainMenu1","./images/arrow.svg");
    menu ? mainMenu1.drawMenu() : null;
</script>
```

## ¿Puede dar inicio en una sección determinada?

El menú puede arrancar desde la rama principal o desde cualquier rama, para ello es necesario pasar dos parámetros al método drawMenu (nivel y encabezado como true).

## ¿Cómo sé que nombres de sección paso para ir a una en particular?

```javascript
menu ? mainMenu1.drawMenu(mainMenu1.menuItems[1],true) : null;
```

```javascript
console.log(mainMenu1.menuItems);
```

**Importante:** Se pueden crear tantos menues como instancias de clase, para ello tomar en cuenta pasar como parámetros a las nuevas instancias otro nav y otro contenedor de menú.

## Demo

https://multilevel-agnostic-menu.netlify.app/

## The best example from Internet

https://tympanus.net/Blueprints/MultiLevelMenu/

