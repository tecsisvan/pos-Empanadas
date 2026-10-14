// CÓDIGO PARA GOOGLE APPS SCRIPT
const sheetId = SpreadsheetApp.getActiveSpreadsheet().getId();

function doGet(e) {
  const doc = SpreadsheetApp.openById(sheetId);
  const sheet = doc.getSheetByName('Productos');
  const data = sheet.getDataRange().getValues();
  
  if (data.length <= 1) {
    return ContentService.createTextOutput(JSON.stringify([])).setMimeType(ContentService.MimeType.JSON);
  }

  const cabeceras = data[0];
  const filas = data.slice(1);
  const productos = filas.map(fila => {
    let obj = {};
    cabeceras.forEach((cabecera, i) => { obj[cabecera] = fila[i]; });
    return obj;
  });
  
  return ContentService.createTextOutput(JSON.stringify(productos)).setMimeType(ContentService.MimeType.JSON);
}

function doPost(e) {
  const doc = SpreadsheetApp.openById(sheetId);
  const data = JSON.parse(e.postData.contents);
  let respuesta = { status: "error" };

  try {
    if (data.accion === "registrar_venta") {
      const sheetVentas = doc.getSheetByName('Ventas');
      sheetVentas.appendRow([new Date(), data.producto, data.cantidad, data.total]);
      
      const sheetProd = doc.getSheetByName('Productos');
      const datosProd = sheetProd.getDataRange().getValues();
      for (let i = 1; i < datosProd.length; i++) {
        if (datosProd[i][1] === data.producto) {
          const stockActual = Number(datosProd[i][3]);
          sheetProd.getRange(i + 1, 4).setValue(stockActual - Number(data.cantidad));
          break;
        }
      }
      respuesta = { status: "exito" };
    } 
    else if (data.accion === "crear_producto") {
      const sheet = doc.getSheetByName('Productos');
      const nuevoId = "ID-" + new Date().getTime();
      sheet.appendRow([nuevoId, data.nombre, data.precio, data.stock]);
      respuesta = { status: "exito" };
    }
    else if (data.accion === "eliminar_producto") {
      const sheet = doc.getSheetByName('Productos');
      const datos = sheet.getDataRange().getValues();
      for (let i = 1; i < datos.length; i++) {
        if (String(datos[i][0]) === String(data.id)) {
          sheet.deleteRow(i + 1);
          break;
        }
      }
      respuesta = { status: "exito" };
    }
  } catch (error) {
    respuesta.mensaje = error.toString();
  }

  return ContentService.createTextOutput(JSON.stringify(respuesta)).setMimeType(ContentService.MimeType.JSON);
}
