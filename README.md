#[snippets] (http://snippets.ws)
### Entorno para el desarrollo de interfaz de usuario basado en less.

La característica principal de **snippets** es que no necesitas aprender una forma particular de escribir 
HTML para poder utilizarlo. Este framework no necesita que te adaptes a él, **snippets** se adapta a tu proyecto.

### Características

- HTML5 y CSS3
- Responsive o Adaptive según la necesidad.
- Configurable.
- Construido en less para desarrollar en less.
- Sin classes predefinidas.
- Ordenado y extensible.
- Sin código basura.
- Fácil de aprender
- Incluye librerías js para formularios, modales, slider, tooltips tabs y más.
- El css base compilado pesa solo 7.4k.

### Recursos javascript incluidos

- [jQuery](http://jquery.com/)
- [jQuery tools](http://jquerytools.org) (incluye: Tabs, Tooltip, Form Tools, Toolbox.)
- [flexSlider2](http://flexslider.woothemes.com/)
- [html5shim](http://code.google.com/p/html5shim/)
- [less](http://lesscss.org/)

### Recursos less incluidos

- Variables de entorno
    - Colores 
    - Fuentes
    - Ruta del directorio de contenidos multimedia (imágenes, tipografia, etc.)
- [Normalize](http://git.io/normalize) por defecto o [reset v2.0](http://meyerweb.com/eric/tools/css/reset/) de Eric Meyer.
- Tipografias incluidas y mediante google fonts
- Definición de formularios horizontales o verticales.
- Conjuntos de atributos para generar código recurrente. Algo asi como ejecutar funciones dentro del css.
    - Grilla y columnas de [semantic.gs](http://semantic.gs/).
    - CSS3 de [LESS Prefixer](http://lessprefixer.com/) .
    - Botones.
    - Iconos de [Font Awesome](http://fortawesome.github.io/Font-Awesome/).
- Elementos predefinidos.
    - Galería.
    - Navegación.
    - Rotador de imágenes.
- Layout
    - Estilos generales y archivos separados para cada media query.
    
## Instrucciones

Lo primero que tenes que saber es que esta herramienta tiene que ser útil para tu proyecto, tomar una estructura como **snippets** para empezar no debe condicionarte, adaptala a tu necesidad.

Para empezar a utilizar **snippets** es necesario conocer la estructura de directorios. Si bien la podes cambiar a tu gusto para tu proyecto es necesario entenderla para modificarla.

Tené en cuenta que **snippets** usa una gran cantidad de recortes de código para facilitar la organización de tu proyecto. 

El objetivo de esto es facilitar la tarea de desarrollo y generar un único css compilado para tu sitio en producción.

### Estructura de directorios:

- **js** (tus scripts)
    - **lib** (recursos javascript de terceros)
- **less** (aca se encuentran los archivos .less, no es necesaria para producción)
    - **01core** (tipografias, reset, mixins y demás configuraciones generales)
    - **02extends** (librerías less para facilitar la creación de código)
    - **03elements** (definición de elementos puntuales de tu sitio)
    - **04layout** (definicion general de estilos y excepciones para responsive)
    - **05theme** (características particulares del proyecto)
- **media** (archivos binarios)
    - **fonts** (tipografias a utilizar)
    - **img** (archivos de imagen que forman parte del diseño)
    - **upload** (archivos que forman parte del contenido)
  

#### Por donde empezar:

Lo primero que podés hacer es abrir el archivo *'less/style.less'*. Acá vás a encotrar todos los archivos incluidos en tu proyecto y el orden en que se cargan.

Fijate que los directorios esán numerados para facilitar la lectura, de todos modos, cada proyecto tiene sus requerimentos y este orden se puede alterar según las necesidades.

Para quitar archivos no es necesario borrarlos, se pueden comentar como el caso de *'reset.less'*:

    ...
    //@import "01core/reset.less";
    @import "01core/normalize.less";
    ...
    
Otro archivo donde nos proponemos trabajar bastante de nuestro tiempo es *04layout/all.less*.

En él nos vamos a encontrar con algunas líneas que le dan forma al html de ejemplo que es *'index.html'*

Si todavía no conoces **less**, este es el momento de darte una vuelta por [less](http://lesscss.org/).

Para empezar un proyecto nuevo, podés borrar todos estos estilos y comenzar utilizando *'clean.html'*. En este archivo solo están definidas las llamadas a los scripts necesarios para el desarrollo con **snippets**.

#### Usando mixins:

Una de las grandes ventajas de crear css con less, es la posibilidad de usar *mixins*. Esto nos permite definir una serie de atributos para un elemento, incluso se le pueden pasar variables.

Vamos a ver un ejemplo de nuestro archivo *'01core/mixins.less'*

    .size (@width: 400, @height: 200) {
      width: @width * 1px;
      height: @height * 1px;
    }
    
Con estas líneas generamos un código abreviado para definir elementos de tamaño fijo. Para un *div* con el *class .box*, podriamos escribir esto:

    .box {
      .size(60,60);
    }
    
Y el resultado en el css compilado sería el siguiente:

    .box {
      width: 60px;
      height: 60px;
    }

*Investiga que otros elementos tenes en mixins y agrega los que creas necesarios*.

#### Usando extends:

Hasta ahora tenemos 4 extensiones definidas: buttons, css3, grid y glyphicons.

Buttons es una extensión que te permite crear botonos tanto de links como inputs de formularios. Te permite definir el color de fondo, tamaño. Miralo, modificalo y sualo a tu gusto.

Con css3.less haces compatible las propiedades de la nueva versión sin necesidad de escribir prefijos para todos los navegadores. Mirá como usarlo en [LESS Prefixer](http://lessprefixer.com/) 

Como sistema de grilla **snippets** adopta el método de 12 columnas. Conoce la implementación de [semantic.gs](http://semantic.gs/) que está muy bien explicado y documentado.

[Font Awesome](http://fortawesome.github.io/Font-Awesome/) es una familia de iconos estándar para graficar botones, links, alertas, etc.

#### Elementos, layouts y themes

Próximamente....

#### Recomendaciones

Utilizá less desde un servidor local, instalarlo en cualquier sistema operativo suele ser una tarea simple.

Durante el desarrollo, agregá *'#!watch'* al final de la url en el navegador. Esto hará que tus estilos se vuelvan a generar cada un segundo sin necesidad de recargar la página.

Durante el desarrollo, less toma como ruta relativa la poosición del archivo que estas mirando. En *'less/styles.less'* podes definir la ruta de tus archivos de estilos cambiando la variable *'@media'*.
