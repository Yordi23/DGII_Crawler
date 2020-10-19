# DGII Crawler
A web crawler that uses DGII official public [webpage](https://dgii.gov.do/app/WebApps/ConsultasWeb2/ConsultasWeb/consultas/rnc.aspx) to retrieve registered contributors information. The project is hosted on Heroku, using the following URL you can send requests to it: [`https://dgii-crawler.herokuapp.com/`](https://dgii-crawler.herokuapp.com/).

## Available Endpoint
**``GET /api/v1/rnc/:rnc``**

Returns the information of the contributor associated with the specified RNC. **Response example:**

**``HTTP status code: 200``**

    {
    "status":  "success",
	    "data":  {
	    "Cédula/RNC":  "401-50625-4",
	    "Nombre/Razón Social":  "DIRECCION GENERAL DE IMPUESTOS INTERNOS",
	    "Nombre Comercial":  "DGII",
	    "Categoría":  "",
	    "Régimen de pagos":  "NORMAL",
	    "Estado":  "ACTIVO",
	    "Actividad Economica":  "SERV GRALES DE LA ADM PÚBLICA (INCL. EL DESEMPEÑO DE FUNCIONES EJECUTIVAS Y LEGISLATIVAS DE ADM POR PARTE DE LAS ENTIDADES DE LA A",
	    "Administracion Local":  "ADM LOCAL GGC"
	    }
    }

If the given RNC is not associated with any contributor it'll return a response with a **``404``** HTTP status code. **Response example:**

**``HTTP status code: 404``**

    {
    "status":  "success",
    "data":  {}
    }
