class Veiculo{
    id=0;
    modelo="";
    anoFab=0;
    velMax=0;
    constructor(id, modelo, anoFab, velMax){
        this.id=id;
        this.modelo=modelo;
        this.anoFab=anoFab;
        this.velMax=velMax;
    }
}
class Aereo extends Veiculo{
    altMax=0;
    autonomia=0;
    constructor(id, modelo, anoFab, velMax, altMax, autonomia){
        super(id, modelo, anoFab, velMax);
        this.altMax=altMax;
        this.autonomia=autonomia;
    }
}
class Terrestre extends Veiculo{
    cantPue=0;
    cantRue=0;
    constructor(id, modelo, anoFab, velMax, cantPue, cantRue){
        super(id, modelo, anoFab, velMax);
        this.cantPue=cantPue;
        this.cantRue=cantRue;
    }
}
let arrayObjetos;
function $(id){
    return document.getElementById(id);
}



// function iniciarTabla(){
//     $("checkLoad").checked=true;
//     let xml= new XMLHttpRequest();
//     xml.onreadystatechange=function(){
//         if(xml.readyState==4 && xml.status==200){
//             let jsonVersion=JSON.parse(this.responseText);
//             arrayObjetos=jsonToObjetc(jsonVersion);
//             dibujarTabla(arrayObjetos);
//             $("checkLoad").checked=false;
//         }else{

//         }
//     };
//     xml.open("GET","http://localhost/laboratorio3/vehiculoAereoTerrestre.php",true);
//     xml.send();
// }
async function iniciarTabla(){
    $("checkLoad").checked = true;
    let respesta=await fetch("http://localhost/laboratorio3/vehiculoAereoTerrestre.php",{
        method:"GET"
    });
    if(respesta.status==200){
        jsonVersion= await respesta.json();
        arrayObjetos=jsonToObjetc(jsonVersion);
        dibujarTabla(arrayObjetos);
        $("checkLoad").checked = false;
    }else{
        $("checkLoad").checked = false;
        $("checkError").checked=true;
    }
}
function jsonToObjetc(json){
    let arrayObjetos=[];
    json.forEach(element => {
        if( "altMax" in element){
            arrayObjetos.push(new Aereo(element.id, element.modelo, element.anoFab, element.velMax, element.altMax, element.autonomia));
        }else{
            arrayObjetos.push(new Terrestre(element.id, element.modelo, element.anoFab, element.velMax, element.cantPue, element.cantRue));
        }
    });
    return arrayObjetos;
}
function dibujarTabla(arrayObjetos){
    while ($("tbody").firstChild) {
        $("tbody").firstChild.remove();
      }
    for(let i=0;i<arrayObjetos.length;i++){
        filaNueva=document.createElement("tr");
        celdaNueva(arrayObjetos[i].id, filaNueva);
        celdaNueva(arrayObjetos[i].modelo,filaNueva);
        celdaNueva(arrayObjetos[i].anoFab, filaNueva);
        celdaNueva(arrayObjetos[i].velMax,filaNueva);
        if(arrayObjetos[i] instanceof Aereo){
            celdaNueva(arrayObjetos[i].altMax,filaNueva);
            celdaNueva(arrayObjetos[i].autonomia,filaNueva);
            celdaNueva("N/A",filaNueva);
            celdaNueva("N/A",filaNueva);
        }else{
            celdaNueva("N/A",filaNueva);
            celdaNueva("N/A",filaNueva);
            celdaNueva(arrayObjetos[i].cantPue,filaNueva);
            celdaNueva(arrayObjetos[i].cantRue,filaNueva);
        }
        botonNuevo("Modificar", filaNueva).addEventListener("click",function(){
            $("seccionABM").style.top=0;
            completarForm(arrayObjetos[i]);
            $("subtituloABM").textContent="Modificacion";
        });
        botonNuevo("Eliminar", filaNueva).addEventListener("click",function(){
            $("seccionABM").style.top=0;
            completarForm(arrayObjetos[i]);
            $("subtituloABM").textContent="Baja";
        });
    }
}
function celdaNueva(dato, fila){
    let nuevaCelda=document.createElement("td");
    let nuevoNodo=document.createTextNode(dato);
    nuevaCelda.appendChild(nuevoNodo);
    fila.appendChild(nuevaCelda);
    $("tbody").appendChild(fila);
}
function botonNuevo(nombre, fila){
    let nuevaCelda=document.createElement("td");
    let nuevoBoton=document.createElement("button");
    let nuevaImg=document.createElement("img");
    if(nombre=="Modificar"){
        nuevaImg.setAttribute("src","imagenes/pencil-minus.png");
        nuevoBoton.setAttribute("class","btnModificar btnTabla");
    }else{
        nuevaImg.setAttribute("src","imagenes/trash.png");
        nuevoBoton.setAttribute("class","btnEliminar btnTabla");
    }
    nuevaImg.setAttribute("class","imagenBoton");
    nuevoBoton.appendChild(nuevaImg);
    nuevaCelda.appendChild(nuevoBoton);
    fila.appendChild(nuevaCelda);
    $("tbody").appendChild(fila);
    return nuevoBoton;
}

function validarinput(patron, idInput,idSpam, mensaje){
    if(patron.test($(idInput).value)){
        $(idSpam).textContent="";
        return true;
    }else{
        $(idSpam).textContent=mensaje;
        return false;
    }
}
function validarFormulario(tipoPersona){
    const patronLetra=/^[A-Z][a-z]*(\s[A-Z][a-z]*)*$/;
    const patronTelefono=/^(4[0-9]{7}|1[0-9]{9}|1[0-9]{8})$/;
    const patronEmail=/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
    const patronEdad=/^(1[8-9]|[2-9][0-9])$/;
    const patronNumeros=/^[0-9]\d*$/;
    const patronAnios=/^19[4-9]\d|20[0-2]\d|203[0-1]$/;
    const patronLetrasNumerosGuiones = /^[A-Za-z0-9\- ]+$/;
    const patronGeneral = /^[\s\S]*$/;
    if(tipoPersona=="Aereo"){
        return validarinput(patronGeneral,"modeloForm","spanModeloForm","No valido- Ejemplo: Dodge Viper") &&
        validarinput(patronAnios,"anoFabForm","spanAnoFabForm","No valido- Ejemplo: 2023")&&
        validarinput(patronNumeros,"velMaxForm","spanVelMaxForm","No valido- Ejemplo: 120")&&
        validarinput(patronNumeros,"atlMaxForm","spanAtlMaxForm","No valido- Ejemplo: 13")&&
        validarinput(patronNumeros,"atonomiasForm","spanAtonomiasForm","No valido- Ejemplo: 1000")
    }else if(tipoPersona=="Terrestre"){
        return validarinput(patronGeneral,"modeloForm","spanModeloForm","No valido- Ejemplo: Dodge Viper") &&
        validarinput(patronAnios,"anoFabForm","spanAnoFabForm","No valido- Ejemplo: 2023")&&
        validarinput(patronNumeros,"velMaxForm","spanVelMaxForm","No valido- Ejemplo: 120")&&
        validarinput(patronNumeros,"cantPueForm","spanCantPueForm","No valido- Ejemplo: 4") &&
        validarinput(patronNumeros,"cantRueForm","spanCantRueForm","No valido- Ejemplo: 4")
    }
}
function limpiarABM(){
    $("idForm").value="";
    $("modeloForm").value="";
    $("anoFabForm").value="";
    $("velMaxForm").value="";
    $("atlMaxForm").value="";
    $("atonomiasForm").value="";
    $("cantPueForm").value="";
    $("cantRueForm").value="";
    $("formSelectionOpcion1").style.display="flex";
    $("formSelectionOpcion2").style.display="flex";
    $("formSelectOption").disabled=false;
}
function completarForm(elemento){
    console.log(elemento);
    $("idForm").value=elemento.id;
    $("modeloForm").value=elemento.modelo;
    $("anoFabForm").value=elemento.anoFab;
    $("velMaxForm").value=elemento.velMax;

    $("formSelectOption").disabled=true;
    if(elemento instanceof Aereo){
        $("atlMaxForm").value=elemento.altMax;
        $("atonomiasForm").value=elemento.autonomia;
        $("formSelectionOpcion2").style.display="none";
        $("formSelectOption").selectedIndex=0;

    }else{
        $("cantPueForm").value=elemento.cantPue;
        $("cantRueForm").value=elemento.cantRue;
        $("formSelectionOpcion1").style.display="none";
        $("formSelectOption").selectedIndex =1;
    }
}
function obtenerMaxId(){
    let idMax=0;
    arrayObjetos.forEach(element => {
        if(element.id>idMax){
            idMax=element.id;
        }
    });
    return idMax;
}
function crearObjetoConABM(){
    let nuevaPersona;

    let id=obtenerMaxId()+1;
    let modelo= $("modeloForm").value;
    let anoFab=$("anoFabForm").value;
    let velMax=$("velMaxForm").value;
    if($("formSelectOption").value=="Aereo"){
        let altMax=$("atlMaxForm").value;
        let autonomia=$("atonomiasForm").value;
        nuevaPersona=new Aereo(id,modelo, anoFab, velMax, altMax,autonomia);
    }else{
        let cantPue=$("cantPueForm").value;
        let cantRue=$("cantRueForm").value;
        nuevaPersona=new Terrestre(id,modelo, anoFab, velMax, cantPue,cantRue);
    }
    return nuevaPersona;
}

function alta() {
    $("checkLoad").checked = true;
    let nuevaPersona = crearObjetoConABM();
    let xml = new XMLHttpRequest();
    xml.onreadystatechange = function() {
        try{
            if (xml.readyState == 4 && xml.status == 200) {
                
                arrayObjetos.push(nuevaPersona);
                console.log(nuevaPersona);
                dibujarTabla(arrayObjetos);
                $("checkLoad").checked = false;
            } else if(xml.readyState == 4 && xml.status != 200){
                $("checkLoad").checked = false;
                $("checkError").checked = true;
            }
        }catch(e){
            $("checkLoad").checked = false;
            $("checkError").checked = true;
        }
        
    };
    xml.open("PUT", "http://localhost/laboratorio3/vehiculoAereoTerrestre.php", true);
    xml.setRequestHeader("Content-Type", "application/json");
    xml.send(JSON.stringify(nuevaPersona));
  }
  function obtenerObjetoPorId(id){
        for (let i = 0; i < arrayObjetos.length; i++) {
            if(arrayObjetos[i].id==id){
                return arrayObjetos[i];
            }
        }
    }
    function actualizarObjetoConABM(objeto){
        objeto.modelo= $("modeloForm").value;
        objeto.anoFab=$("anoFabForm").value;
        objeto.velMax=$("velMaxForm").value;
        if($("formSelectOption").value=="Aereo"){
            objeto.altMax=$("atlMaxForm").value;
            objeto.autonomia=$("atonomiasForm").value;
        }else{
            objeto.cantPue=$("cantPueForm").value;
            objeto.cantRue=$("cantRueForm").value;
        }
    }
  async function modificacion() {
    let auto = obtenerObjetoPorId($("idForm").value);
    actualizarObjetoConABM(auto);
    $("checkLoad").checked = true;

      let respuesta = await fetch("http://localhost/laboratorio3/vehiculoAereoTerrestre.php", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(auto)
      });
  
      if (respuesta.ok) {
        let jsonVersion = await respuesta.text();
        dibujarTabla(arrayObjetos);
        $("checkLoad").checked = false;
      } else {
        $("checkLoad").checked = false;
        $("checkError").checked=true;
      }    
  }
  function obtnerIndexPorId(id){
        for (let i = 0; i < arrayObjetos.length; i++) {
            if(arrayObjetos[i].id==id){
                return i;
            }
        }
    }
  async function eliminar() {
    let id=$("idForm").value;
    let nuevo={"id":id};
    let  index=obtnerIndexPorId($("idForm").value);
    $("checkLoad").checked = true;

    let respuesta = await fetch("http://localhost/laboratorio3/vehiculoAereoTerrestre.php", {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(nuevo)
    });

    if (respuesta.status==200) {
        let jsonVersion = await respuesta.text();

        
        arrayObjetos.splice(index,1);
        dibujarTabla(arrayObjetos);
        $("checkLoad").checked = false;
    } else {
        $("checkLoad").checked = false;
        $("checkError").checked=true;
    }    
}

window.addEventListener("load",async (event)=>{

    await iniciarTabla();


    //funcionalidad boton Aceptar Tabla
    $("btnTablaAgregar").addEventListener("click",(event)=>{


        $("subtituloABM").textContent="Alta";
        $("formSelectOption").selectedIndex=0;
        $("formSelectionOpcion2").style.display="none";
        $("seccionABM").style.top=0;
    });

    //funcionalidad select
    $("formSelectOption").addEventListener("change",(event)=>{
        if(event.target.value=="Aereo"){
            $("formSelectionOpcion1").style.display="flex";
            $("formSelectionOpcion2").style.display="none";
        }else{
            $("formSelectionOpcion1").style.display="none";
            $("formSelectionOpcion2").style.display="flex";
        }
    });

    //funcionalidad boton Aceptar ABM
    $("bntABMAceptar").addEventListener("click",(event)=>{
        if(validarFormulario($("formSelectOption").value)){
            if($("subtituloABM").textContent=="Alta"){
                alta();
            }
            else if($("subtituloABM").textContent=="Modificacion"){
                modificacion();
            }
            else if($("subtituloABM").textContent=="Baja"){
                eliminar();
            }
            $("seccionABM").style.top="100%";
            limpiarABM();
        }
    });

    //funcionalidad boton Cancelar ABM
    $("bntABMCancelar").addEventListener("click",(event)=>{
        $("seccionABM").style.top="100%";
        limpiarABM();
    });

    //volver del error
    $("error__volver").addEventListener("click",(event)=>{
        $("checkError").checked=false;
    });
});