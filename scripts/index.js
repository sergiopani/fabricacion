//const { getProduct } = require("../../../controllers/product");

//import axios from "axios";

 new Vue({
    el: "#app",
    data: {
        //Array de articulos que parseamos desde el fichero json
        //articulos: [],
        toProduce: [],
        //Array del fetch de json de empresas
        facturas: [],

        //Objeto que guarda la empresa que esta selecionada en el select
        selectedFactura: {
            id:'',
            nomfiscli: '',
            serie: '',
            tipo: '',
            centro: '',
            numero: '',

        },
        articulos:[],

        selectedArticulo:{
            centro: "",
            tipo: 0,
            serie: "",
            numero: 0,
            codiart: "",
            cantidad: 0,
            denoart: "",
            fondo: "",
            lateral: "",
            tapa: ""
        },

        //Atributos de los aticulos
        fondos: [],
        laterales: [],
        tapas: [],

    },
    /*Metodos que se ejecutan al iniciar la pagina*/
    created() {
        const getfacturasExecution = new Promise((resolve, reject) => {
            resolve (this.getFacturas());
        });
        console.log("Las facturas cargadas son " + this.facturas)
        getfacturasExecution
            .then(value => { this.setDefault(this.facturas[0]) })
    },
    methods: {
        comprobar: function (index, a) {
            //enviar objecto de post
            if (this.fondos[index] === true && this.laterales[index] === true && this.tapas[index] === true) {
                this.sendProduction(index, a);
                return true;
            } else if (this.fondos[index] === '' && this.laterales[index] === '' && this.tapas[index] === true) {
                this.sendProduction(index, a);
                return true;
            } else if (this.fondos[index] === true && this.laterales[index] === '' && this.tapas[index] === '') {
                this.sendProduction(index, a);
                return true;
            } else if (this.fondos[index] === '' && this.laterales[index] === true && this.tapas[index] === '') {
                this.sendProduction(index, a);
                return true;
            } else if (this.fondos[index] === true && this.laterales[index] === '' && this.tapas[index] === true) {
                this.sendProduction(index, a);
                return true;
            } else if (this.fondos[index] === '' && this.laterales[index] === true && this.tapas[index] === true) {
                this.sendProduction(index, a);
                return true;
            } else if (this.fondos[index] === true && this.laterales[index] === true && this.tapas[index] === '') {
                this.sendProduction(index, a);
                return true;
            } else {
                this.deleteProduct(index, a);
            }

        },
        sendProduction: function (index, a) {
            //Comprueba que elementos li estan marcados en verde
            this.toProduce[index] = (a);
        },
        deleteProduct: function (index) {
            this.toProduce[index] = null;
        },
        showProduction: function () {

            //Eliminar las posiciones que son nulas
            const results = this.toProduce.filter(element => {
                return element !== null;
            });
            console.log(results);
        },
        filter: function (a) {
            /*console.log(a.serie + " "+ a.tipo + " " + a.centro + " es igual a ->" + this.currentEmpresa.serie + " " + this.currentEmpresa.tipo + " " + this.currentEmpresa.centro)
            console.log()*/

            let ideProducto = a.centro + a.tipo + a.serie + a.numero;
            console.log("Comparando" + ideProducto+"con"+this.selectedFactura.id)
            return ideProducto.toUpperCase() === this.selectedFactura.id.toUpperCase();
        },
        setSelected: function (facturaObject) {
            //console.log("cambiando  ->" + facturaId)
            //Sacamos una array separando por '/' en cada uno de las posiciones
            //let atributos = this.currentFactura.id.split('/');
            //console.log(atributos);
            //Recorrer la array
            this.setDefault(facturaObject);
        },
        setDefault: function (factura) {
            /*this.selectedFactura.id = factura.serie + factura.tipo + factura.centro + factura.numero;
            this.selectedFactura.nombre = factura.nomfiscli;
            this.selectedFactura.serie = factura.serie;
            this.selectedFactura.tipo = factura.tipo;
            this.selectedFactura.centro = factura.centro;
            this.selectedFactura.numero = factura.numero;*/

            this.selectedFactura = factura;

            this.selectedFactura.id = this.selectedFactura.centro+this.selectedFactura.tipo+this.selectedFactura.serie+
                this.selectedFactura.numero;

            this.getProducts();


            console.log(this.selectedFactura)
            console.log(this.facturas)

        },
        beforePost: function(a,index){
            //Igualar al selected articulo el articulo pasado por parametro
            this.selectedArticulo = {...a};
            //this.selectedArticulo.tapa = status;
            //Recorrido por las propiedades del articulo y cambiamos las 'X' por 'N' y la selected por S
            for (const property in this.selectedArticulo) {
                if(property === 'fondo' && this.selectedArticulo[property] === 'X'){
                    if(this.fondos[index] === true){
                        this.selectedArticulo.fondo='S';
                    }else {
                        this.selectedArticulo.fondo = 'N';
                    }
                }
                if(property === 'lateral' && this.selectedArticulo[property] === 'X'){
                    if(this.laterales[index] === true){
                        this.selectedArticulo.lateral='S';
                    }else{
                        this.selectedArticulo.lateral = 'N';
                    }
                }
                if(property === 'tapa' && this.selectedArticulo[property] === 'X'){
                    if(this.tapas[index] === true){
                        this.selectedArticulo.tapa='S';
                    }else{
                        this.selectedArticulo.tapa='N';
                    }

                }
            }

            this.postProduct();
        },
        postProduct: async function(){
            //Hay que pasar el estado en que se encuentra el check

            console.log("HAciendo post del: " +
                this.selectedArticulo.tipo + " " +
                this.selectedArticulo.serie + " " +
                this.selectedArticulo.numero + " " +
                this.selectedArticulo.codiart + " " +
                this.selectedArticulo.cantidad + " " +
                this.selectedArticulo.denoart + " /" +
                this.selectedArticulo.fondo + " /" +
                this.selectedArticulo.lateral + " /" +
                this.selectedArticulo.tapa + " /"
            );
            /*
            const url = "http://localhost:8080/KriterOMNI/KriterRS004/closeOP";
            try{
                await axios.post(url,this.selectedArticulo)
                    .then(data =>{
                        console.log(data);
                    })
            }catch(error){
                console.log(error.response);
            }
            */

        },
        getProducts: async function(){
            try{
                /*
                const url = "http://localhost:8080/kriterOMNI/KriterRS004/getOP?centro=" + this.selectedFactura.centro + "&tipo=" + this.selectedFactura.tipo
                + "&serie=" + this.selectedFactura.serie + "&numero=" + this.selectedFactura.numero;
                */
                const url ='../data/products.json';

                const response = await axios(url);
                const res = response.data;
                this.articulos = res;
                console.log(this.articulos);

            }catch(err){
                console.log(err);
            }
        },

    /*
        getProducts:async function() {
            fetch("../data/products.json")
                .then((res) => res.json())
                .then((data) => ((this.selectedFactura.articulos = data)
                    ))
                .catch((err) => console.log(err.message));
        },
    */



        getFacturas: async function(){
            //const url = "http://localhost:8080/kriterOMNI/KriterRS004/getOrders";

            //const url = 'https://40ac-45-15-136-50.eu.ngrok.io/kriterOMNI/KriterRS004/getOrders';
            try{

                //const url = "http://localhost:8080/kriterOMNI/KriterRS004/getOrders";


                //const url = 'https://7fb7-45-15-136-50.eu.ngrok.io/kriterOMNI/KriterRS004/getOrders';
                const url = '../data/facturas.json'
                const response = await axios(url,{
                    "Access-Control-Allow-Origin": '*'
                });

                const res = response.data;
                this.facturas = res;
                console.log("Se han cargado las facturas" + this.facturas)
            }catch(err){
                console.log(err);
            }
        }


/*
        getFacturas:async function() {
            fetch("https://40ac-45-15-136-50.eu.ngrok.io/kriterOMNI/KriterRS004/getOrders")
                .then((res) => res.json())
                .then((data) => ((this.facturas = data), console.log(this.facturas)))
                .catch((err) => console.log(err.message));
        },
*/

    },
});


