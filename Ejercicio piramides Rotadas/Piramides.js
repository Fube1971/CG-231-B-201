/**
 * Geometria: Crea un objeto THREE.Geometry y lo retorna 
 * ENTRADAS:  vx= Arreglos de vertices (Arreglos de arregos de enteros )
 * SALIDAS: geon= objeto THREE.Geometry generado a paritr de arreglo vx
 */
function Geometria(vx){
    geon= new THREE.Geometry();
    for (let i = 0; i < vx.length; ++i) {
        x = vx[i][0];
        y = vx[i][1];
        z = vx[i][2];
        vector = new THREE.Vector3(x, y, z);
        geon.vertices.push(vector);
    }
    return geon;

}  



/**
 * Traslacion: crea la matriz de traslacion a partir del vector vt
 * ENTRADAS: vt: vector de traslacion (arreglo de traslacion)
 * SALIDAS: matriz = MAtriz de translacion generada a partir de vt 
 */
function Traslation(vt) {
    var matriz = new THREE.Matrix4();
    matriz.set(1, 0, 0, vt[0],
            0, 1, 0, vt[1],
            0, 0, 1, vt[2],
            0, 0, 0, 1);
    return matriz;
}
/**
 * Escalado: crea la matriz de escalado a partir del vector vs
 * ENTRADAS: vs: vector de escalado (arreglo de escalado)
 * SALIDAS: matriz = MatrizS de translacion generada a partir de vs
 */
function Escalado(vs) {
    var matrizS = new THREE.Matrix4();
    matrizS.set(vs[0], 0, 0, 0,
            0, vs[1], 0, 0,
            0, 0, vs[2], 0,
            0, 0, 0, 1);
    return matrizS;
}
/**
 * Escalado real:
 * ENTRADA: OBJETO: Objeto tipo THREE.line a ser escaldado, vs=(Vectores escalado),vp=(posicion inicial)
 * SALIDA: obj Actializado 
 */
function EscaladoReal(obj,vp,vs){
    vt= [-vp[0],-vp[1],-vp[2]]; //Translacion al puto de origen [0,0,0]
    obj.applyMatrix(Traslation(vt)); 
    obj.applyMatrix(Escalado(vs));//Escalado del obj
    obj.applyMatrix(Traslation(vp));// Tranlacion al punto inicial 

}
/**
 * Rotacion x: crea la matriz de rotacion a partir del angulo angle
 * ENTRADA: OBJETO: angle: angulo con el quie va a rotar con respecto al eje x
 * SALIDA: matriz rotada
 */
function Rotacionx(angle){
    var matrizRx = new THREE.Matrix4();
    var alpha = angle;
    var cs = Math.cos(alpha);
    var ss = Math.sin(alpha);

    matrizRx.set(1,  0, 0, 0, //rotacion en x 
                0,  cs, -ss, 0, 
                0, ss, cs, 0,
                0, 0, 0, 1);
    return matrizRx
}
/**
 * Rotacion y: crea la matriz de rotacion a partir del angulo angle
 * ENTRADA: OBJETO: angle: angulo con el quie va a rotar con respecto al eje y
 * SALIDA: matriz rotada
 */
function Rotaciony(angle){
    var matrizRy = new THREE.Matrix4();
    var alpha = angle;
    var cs = Math.cos(alpha);
    var ss = Math.sin(alpha);

    matrizRy.set(cs,  0, ss, 0, //rotacion en y
                0,  1, 0, 0, 
                -ss, 0, cs, 0,
                0, 0, 0, 1);
    return matrizRy
}
/**
 * Rotacion z: crea la matriz de rotacion a partir del angulo angle
 * ENTRADA: OBJETO: angle: angulo con el quie va a rotar con respecto al eje z
 * SALIDA: matriz rotada
 */
function Rotacionz(angle){
    var matrizRz = new THREE.Matrix4();
    var alpha = angle;
    var cs = Math.cos(alpha);
    var ss = Math.sin(alpha);

    matrizRz.set(cs,  -ss, 0, 0, //rotacion en z
                ss,  cs, 0, 0, 
                0, 0, 1, 0,
                0, 0, 0, 1);
    return matrizRz
}
/**
 * Rotacion  real:
 * ENTRADA: OBJETO: Objeto tipo THREE.line a ser rotado, angle=(angulo para rotar),vp=(posicion inicial)
 * SALIDA: obj Actializado 
 */
function RotacionReal(obj,vp,angle,vs){
    vt= [-vp[0],-vp[1],-vp[2]]; //Translacion al puto de origen [0,0,0]
    //vt1= [0,vp[1],0];
    obj.applyMatrix(Traslation(vt)); //0,0,0
    obj.applyMatrix(Rotacionz(angle));//Rotacion del obj
    obj.applyMatrix(Escalado(vs));//Escalado del obj
    // Tranlacion al punto inicial 
    obj.applyMatrix(Traslation(vp));
}






function init() {

    // Escena
    scene = new THREE.Scene();
    camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000);    
    renderer = new THREE.WebGLRenderer();
    renderer.setClearColor(0x000000, 1.0);
    renderer.setSize(window.innerWidth, window.innerHeight);

    var size = 700;
    var arrowSize = 40;
    var divisions = 20;
    var origin = new THREE.Vector3( 0, 0, 0 );
    var x = new THREE.Vector3( 1, 0, 0 );
    var y = new THREE.Vector3( 0, 1, 0 );
    var z = new THREE.Vector3( 0, 0, 1 );
    var color2 = new THREE.Color( 0x333333 );  /// 0x333333
    var colorR = new THREE.Color( 0xAA0000 );
    var colorG = new THREE.Color( 0x00AA00 );
    var colorB = new THREE.Color( 0x0000AA );

    //Crear la Grilla
    var gridHelperXZ = new THREE.GridHelper( size, divisions, color2, color2);

    //Flechas
    var arrowX = new THREE.ArrowHelper( x, origin, arrowSize, colorR );
    var arrowY = new THREE.ArrowHelper( y, origin, arrowSize, colorG );
    var arrowZ = new THREE.ArrowHelper( z, origin, arrowSize, colorB );
        
    //Cámara
    camera.position.x = 100;
    camera.position.y = 50;
    camera.position.z = 200;
    camera.lookAt(scene.position);

    // Colores
    color=[{color:0xFF0000},{color:0x00ff00},{color:0x0000FF}];

    //Geometria para las piramides
    material =[];
    lado=40;
    h=50;
    [v1,v2,v3,v4,v5]=[[0,0,0],[lado,0,0],[lado,0,lado],[0,0,lado],[lado/2,h,lado/2]];
    vertices=[v1,v2,v3,v4,v5,v1,v4,v3,v5,v2];//Secuencia de trazado de vertices
    geom=Geometria(vertices);

    //Materiales para las piramides
    for(i=0;i<2;i++){
        material.push(new THREE.ParticleBasicMaterial(color[i]));
    }
   //Se crean las figuras para las piramides
   fig=[];
   vt=[10,20,35];
   for(i=0;i<2;i++){
    fig.push(new THREE.Line(geon,material[i]));
    fig[i].applyMatrix(Rotacionz(-3.1416/2));
    fig[i].applyMatrix(Traslation(vt));
   }

    //rotar una de las piramides sobre x 
    //fig[1].applyMatrix(Escalado([1,-1,1]));

    //EscaladoReal(fig[1],vt,[1,-1,1]);
    //RotacionReal(fig[0],vt,(3.1416/2));  
    RotacionReal(fig[1],vt,(3.1416),[1,-1,1]); 
   
     
    
    
    //En el documento HTML
    document.body.appendChild(renderer.domElement);

    // Agregar elementos al escenario
    scene.add(gridHelperXZ);
    scene.add(arrowX);	
    scene.add(arrowY);	
    scene.add(arrowZ);
    for(i=0;i<2;i++){
        scene.add(fig[i]);
    }
    
    renderer.render(scene, camera);
}

init();  // otra forma: window.onload = init;