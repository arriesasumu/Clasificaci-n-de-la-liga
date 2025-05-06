"use strict";

document.getElementById("cargar").addEventListener("click", pedirTabla);

function pedirTabla() {
    let xhttp;

    xhttp = new XMLHttpRequest();
    xhttp.onload = function () {
        mostrarTabla(this);                             
    }
    xhttp.open("GET", "clasificacion.xml");
    xhttp.send();
} 

function mostrarTabla(XMLHttpRequest) {
    let table = "<table>";
    let xhttp = XMLHttpRequest;
    if (xhttp.readyState == 4 && xhttp.status == 200) {
        console.log("XML Cargado");
    } else {
        console.log("Error al cargar el XML");
    }
    
    let xmlDoc = xhttp.responseXML;
    let equipos = xmlDoc.getElementsByTagName("team");

    table = "<table>" +
        "<tr>" +
                "<th>Equipo</th>" +
        "<th>Pts</th>" +
        "<th>PJ</th>" +
        "<th>PG</th>" +
        "<th>PE</th>" +
        "<th>PP</th>" +
        "<th>GF</th>" +
        "<th>GC</th>" +
        "</tr>";

    for (let i = 0; i < equipos.length; i++) {
        let posicion = i + 1;
        let equipo = `${posicion}. ${equipos[i].getElementsByTagName("name")[0].childNodes[0].nodeValue}`;
        let puntos = equipos[i].getElementsByTagName("points")[0].childNodes[0].nodeValue;
        let pj = equipos[i].getElementsByTagName("played")[0].childNodes[0].nodeValue;
        let pg = equipos[i].getElementsByTagName("won")[0].childNodes[0].nodeValue;
        let pe = equipos[i].getElementsByTagName("drawn")[0].childNodes[0].nodeValue;
        let pp = equipos[i].getElementsByTagName("lost")[0].childNodes[0].nodeValue;
        let gf = equipos[i].getElementsByTagName("goals_scored")[0].childNodes[0].nodeValue;
        let gc = equipos[i].getElementsByTagName("goals_conceded")[0].childNodes[0].nodeValue;

        // Determinar la clase CSS según la posición
        let clase = "";
        if (posicion <= 4) {
            clase = "champions";
        } else if (posicion === 5) {
            clase = "europa";
        } else if (posicion === 6) {
            clase = "conference";
        } else if (posicion > equipos.length - 4) {
            clase = "descenso";
        }

        table += `<tr class="${clase}">` +
                        `<td><b>${equipo}</b></td>` +
            `<td>${puntos}</td>` +
            `<td>${pj}</td>` +
            `<td>${pg}</td>` +
            `<td>${pe}</td>` +
            `<td>${pp}</td>` +
            `<td>${gf}</td>` +
            `<td>${gc}</td>` +
            `</tr>`;
    }
    table += "</table>";
    document.getElementById("tabla").innerHTML = table;
}