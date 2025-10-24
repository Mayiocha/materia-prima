window.onload = ()=>{
    let txtNombre = document.getElementById("nombre")
    let nombreCliente = document.querySelector("#nombreCliente")
    let formul = document.querySelector("#formul")
    let arr=[]


    let tablaPrecios =[
        { id:1, material:"Acero inoxidable", precio: 2000.50},
        { id:2, material:"Platico ABS", precio: 2200.50},
        { id:3, material:"Aluminio", precio: 300.50},
        { id:4, material:"Cobre", precio: 20.50},
    ]

    txtNombre.addEventListener("keyup",()=>{
        nombreCliente.innerHTML = "Nombre del cliente: "+txtNombre.value
        
    })

    formul.addEventListener("submit",()=>{
        event.preventDefault()
        let material = document.querySelector("#material")
        let cantidad = document.querySelector("#cantidad")
        let fecha = document.querySelector("#fecha")
        let observaciones = document.querySelector("#observaciones")
        let precio=tablaPrecios.find(item=>item.material== material.value)
        arr.push({
            id:arr.length+1,
            material:material.value,
            cantidad:cantidad.value,
            fecha:fecha.value,
            observaciones:observaciones.value,
            subtotal:precio.precio * parseInt(cantidad.value)
        })
        imprimorTabla()
        localStorage.setItem("pedido",JSON.stringify(arr))
        
    })

        const imprimorTabla = ()=>{
            var trs=""
            var total=0
            arr.forEach(item=>{
                total+=item.subtotal
                trs+=`<tr>
                        <td>${item.id}</td>
                        <td>${item.material}</td>
                        <td><input type="number" value="${item.cantidad}"/></td>
                        <td>${item.fecha}</td>
                        <td>${item.observaciones}</td>
                        <td>$${item.subtotal.toFixed(2)}</td>
                    </tr>`
            })
            document.querySelector("tbody").innerHTML=trs
            document.querySelector("tdTotal").innerHTML=`<b>${total.toFixed(2)}</b>`

        
    }
    if(localStorage.getItem("pedido")){
        arr = JSON.parse(localStorage.getItem("pedido"))
        imprimorTabla()
    }

}