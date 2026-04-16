var userPadrao = "admin";
var senhaPadrao = "admin";

function login() {
    var user = document.getElementById("username").value;
    var pass = document.getElementById("password").value;

    if (user === userPadrao && pass === senhaPadrao) {
        document.getElementById("loginScreen").style.display = "none";
        document.getElementById("map").style.display = "block";
        document.getElementById("sidebar").style.display = "block";

        iniciarMapa();
    } else {
        document.getElementById("errorMsg").style.display = "block";
    }
}

document.addEventListener("keydown", function(e) {
if (e.key === "Enter") {
    login();
}
});

var map;
var plantaAtual = null;
var marcadores = [];

function iniciarMapa() {

map = L.map('map', {
    crs: L.CRS.Simple
});

var setores = {

    adm: {
        planta: "planta_adm.png",
        w: 2000,
        h: 1200,
        cameras: [
            { nome: "Câmera 15", setor: "Administrativo", coordenada: [684, 1444], preview: "previews/cam15.jpg" },
            { nome: "Câmera 16", setor: "Administrativo", coordenada: [304, 1135], preview: "previews/cam16.jpg" },
            { nome: "Câmera 12", setor: "Administrativo", coordenada: [600, 429], preview: "previews/cam12.jpg" },
            { nome: "Câmera 13", setor: "Administrativo", coordenada: [614, 367], preview: "previews/cam13.jpg" },
            { nome: "Câmera 14", setor: "Administrativo", coordenada: [644, 382], preview: "previews/cam14.jpg" },
            { nome: "Câmera 8", setor: "Administrativo", coordenada: [415, 813], preview: "previews/cam8.jpg" },
            { nome: "Câmera 9", setor: "Administrativo", coordenada: [350, 933], preview: "previews/cam9.jpg" },
            { nome: "Câmera 5", setor: "Administrativo", coordenada: [457, 778], preview: "previews/cam5.jpg" },
            { nome: "Câmera 4", setor: "Administrativo", coordenada: [495, 829], preview: "previews/cam4.jpg" },
            { nome: "Câmera 7", setor: "Administrativo", coordenada: [967, 916], preview: "previews/cam7.jpg" },
            { nome: "Câmera 6", setor: "Administrativo", coordenada: [947, 901], preview: "previews/cam6.jpg" },
            { nome: "Câmera 2", setor: "Administrativo", coordenada: [843, 670], preview: "previews/cam2.jpg" },
            { nome: "Câmera 1", setor: "Administrativo", coordenada: [803, 1201], preview: "previews/cam1.jpg" },
            { nome: "Câmera 3", setor: "Administrativo", coordenada: [810, 1078], preview: "previews/cam3.jpg" }
        ]
    },

    recepcao: { planta: "planta_recepcao.png", w: 2000, h: 1200, cameras: [] },

    recepcao2: {
        planta: "planta_recepcao2.png",
        w: 2000,
        h: 1200,
        cameras: [
            { nome: "Cam 23", setor: "Recepção 2", coordenada: [604, 1238], preview: "previews/cam23_recepcao2.jpg" },
            { nome: "Cam 20", setor: "Recepção 2", coordenada: [489, 1169], preview: "previews/cam14_recepcao2.jpg" },
            { nome: "Cam 12", setor: "Recepção 2", coordenada: [432, 796], preview: "previews/cam12_recepcao2.jpg" },
            { nome: "Cam 13", setor: "Recepção 2", coordenada: [479, 829], preview: "previews/cam13_recepcao2.jpg" },
            { nome: "Cam 17", setor: "Recepção 2", coordenada: [968, 1488], preview: "previews/cam17_recepcao2.jpg" },
            { nome: "Cam 25", setor: "Recepção 2", coordenada: [1108, 1267], preview: "previews/cam25_recepcao2.jpg" },
            { nome: "Cam 27", setor: "Recepção 2", coordenada: [1145, 1320], preview: "previews/cam27_recepcao2.jpg" },
            { nome: "Cam 14", setor: "Recepção 2", coordenada: [667, 952], preview: "previews/cam20_recepcao2.jpg" },
            { nome: "Cam 18", setor: "Recepção 2", coordenada: [777, 1344], preview: "previews/cam18_recepcao2.jpg" },
            { nome: "Cam 21", setor: "Recepção 2", coordenada: [230, 991], preview: "previews/cam21_recepcao2.jpg" },
            { nome: "Cam 1", setor: "Recepção 2", coordenada: [438, 1004], preview: "previews/cam1_recepcao2.jpg" },
            { nome: "Cam 2", setor: "Recepção 2", coordenada: [464, 1044], preview: "previews/cam2_recepcao2.jpg" },
            { nome: "Cam 3", setor: "Recepção 2", coordenada: [491, 1031], preview: "previews/cam3_recepcao2.jpg" },
            { nome: "Cam 4", setor: "Recepção 2", coordenada: [531, 1044], preview: "previews/cam4_recepcao2.jpg" },
            { nome: "Cam 5", setor: "Recepção 2", coordenada: [559, 1027], preview: "previews/cam5_recepcao2.jpg" },
            { nome: "Cam 6", setor: "Recepção 2", coordenada: [549, 972], preview: "previews/cam6_recepcao2.jpg" },
            { nome: "Cam 7", setor: "Recepção 2", coordenada: [522, 960], preview: "previews/cam7_recepcao2.jpg" },
            { nome: "Cam 8", setor: "Recepção 2", coordenada: [487, 937], preview: "previews/cam8_recepcao2.jpg" },
            { nome: "Cam 9", setor: "Recepção 2", coordenada: [459, 913], preview: "previews/cam9_recepcao2.jpg" },
            { nome: "Cam 10", setor: "Recepção 2", coordenada: [38, 532], preview: "previews/cam10_recepcao2.jpg" },
            { nome: "Cam 11", setor: "Recepção 2", coordenada: [199, 632], preview: "previews/cam11_recepcao2.jpg" },
            { nome: "Cam 16", setor: "Recepção 2", coordenada: [1182, 1286], preview: "previews/cam16_recepcao2.jpg" },
            { nome: "Cam 15", setor: "Recepção 2", coordenada: [1133, 1244], preview: "previews/cam15_recepcao2.jpg" },
            { nome: "Cam 19", setor: "Recepção 2", coordenada: [595, 1234], preview: "previews/cam19_recepcao2.jpg" },
            { nome: "Cam 26", setor: "Recepção 2", coordenada: [1133, 1306], preview: "previews/cam26_recepcao2.jpg" }
        ]
    },

    portaria: { planta: "planta_portaria.png", w: 2000, h: 1200, cameras: [] },
    wafer: { planta: "planta_wafer.png", w: 2000, h: 1200, cameras: [] },
    robo: { planta: "planta_robo.png", w: 2000, h: 1200, cameras: [] },
    cafe: { planta: "planta_cafe.png", w: 2000, h: 1200, cameras: [] },
    cracker: { planta: "planta_cracker.png", w: 2000, h: 1200, cameras: [] },
    Distribuição: { planta: "planta_distribuicao.png", w: 2000, h: 1200, cameras: [] },

    loja: {
        planta: "planta_loja.png",
        w: 2000,
        h: 1200,
        cameras: [
            { nome: "Câmera 9",  setor: "Loja", coordenada: [753, 1290], preview: "previews/cam9_loja.jpg" },
            { nome: "Câmera 10", setor: "Loja", coordenada: [412, 1559], preview: "previews/cam10_loja.jpg" },
            { nome: "Câmera 11", setor: "Loja", coordenada: [194, 1178], preview: "previews/cam11_loja.jpg" },
            { nome: "Câmera 5",  setor: "Loja", coordenada: [731, 1303], preview: "previews/cam5_loja.jpg" },
            { nome: "Câmera 6",  setor: "Loja", coordenada: [664, 1452], preview: "previews/cam6_loja.jpg" },
            { nome: "Câmera 12", setor: "Loja", coordenada: [514, 1197], preview: "previews/cam12_loja.jpg" },
            { nome: "Câmera 1",  setor: "Loja", coordenada: [445, 1265], preview: "previews/cam1_loja.jpg" },
            { nome: "Câmera 14", setor: "Loja", coordenada: [581, 1246], preview: "previews/cam14_loja.jpg" },
            { nome: "Câmera 13", setor: "Loja", coordenada: [354, 1424], preview: "previews/cam13_loja.jpg" },
            { nome: "Câmera 3",  setor: "Loja", coordenada: [589, 1455], preview: "previews/cam3_loja.jpg" },
            { nome: "Câmera 4",  setor: "Loja", coordenada: [352, 1363], preview: "previews/cam4_loja.jpg" }
        ] 
    },

    moara: {
        planta: "planta_moara.png",
        w: 2000,
        h: 1200,
        cameras: [
            { nome: "Cam 1", setor: "Moara", coordenada: [488, 1523], preview: "previews/cam1_moara.jpg" },
            { nome: "Cam 2", setor: "Moara", coordenada: [1095, 440], preview: "previews/cam2_moara.jpg" },
            { nome: "Cam 3", setor: "Moara", coordenada: [424, 1513], preview: "previews/cam3_moara.jpg" },
            { nome: "Cam 4", setor: "Moara", coordenada: [214, 1360], preview: "previews/cam4_moara.jpg" },
            { nome: "Cam 5", setor: "Moara", coordenada: [677, 473], preview: "previews/cam5_moara.jpg" },
            { nome: "Cam 6", setor: "Moara", coordenada: [456, 642], preview: "previews/cam6_moara.jpg" },
            { nome: "Cam 7", setor: "Moara", coordenada: [546, 691], preview: "previews/cam7_moara.jpg" },

            { nome: "Cam 10", setor: "Moara", coordenada: [1052, 481], preview: "previews/cam10_moara.jpg" },
            { nome: "Cam 11", setor: "Moara", coordenada: [1001, 449], preview: "previews/cam11_moara.jpg" },
            { nome: "Cam 12", setor: "Moara", coordenada: [1033, 496], preview: "previews/cam12_moara.jpg" },

            { nome: "Cam 13", setor: "Moara", coordenada: [760, 472], preview: "previews/cam13_moara.jpg" },
            { nome: "Cam 14", setor: "Moara", coordenada: [753, 505], preview: "previews/cam14_moara.jpg" },
            { nome: "Cam 15", setor: "Moara", coordenada: [732, 546], preview: "previews/cam15_moara.jpg" },
            { nome: "Cam 16", setor: "Moara", coordenada: [703, 559], preview: "previews/cam16_moara.jpg" },
            { nome: "Cam 17", setor: "Moara", coordenada: [675, 612], preview: "previews/cam17_moara.jpg" },
            { nome: "Cam 18", setor: "Moara", coordenada: [638, 667], preview: "previews/cam18_moara.jpg" },
            { nome: "Cam 19", setor: "Moara", coordenada: [617, 653], preview: "previews/cam19_moara.jpg" },

            { nome: "Cam 20", setor: "Moara", coordenada: [852, 875], preview: "previews/cam20_moara.jpg" },
            { nome: "Cam 21", setor: "Moara", coordenada: [584, 769], preview: "previews/cam21_moara.jpg" },
            { nome: "Cam 22", setor: "Moara", coordenada: [568, 798], preview: "previews/cam22_moara.jpg" },

            { nome: "Cam 23", setor: "Moara", coordenada: [721, 1092], preview: "previews/cam23_moara.jpg" },
            { nome: "Cam 24", setor: "Moara", coordenada: [499, 914], preview: "previews/cam24_moara.jpg" },
            { nome: "Cam 25", setor: "Moara", coordenada: [612, 1144], preview: "previews/cam25_moara.jpg" },
            { nome: "Cam 26", setor: "Moara", coordenada: [583, 1240], preview: "previews/cam26_moara.jpg" },
            { nome: "Cam 27", setor: "Moara", coordenada: [389, 1128], preview: "previews/cam27_moara.jpg" },
            { nome: "Cam 28", setor: "Moara", coordenada: [328, 1413], preview: "previews/cam28_moara.jpg" }
        ]
    }
};

var cameraIcon = L.divIcon({
    className: "",
    html: `
        <div style="
            width: 65px;
            height: 65px;
            background: white;
            border: 3px solid black;
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            box-shadow: 0px 4px 10px rgba(0,0,0,0.5);
        ">
            <img src="icons/camera.jpg" style="width: 50px; height: 50px;">
        </div>
    `,
    iconSize: [65, 65],
    iconAnchor: [32, 32],
    popupAnchor: [0, -30]
});

function carregarSetor(nomeSetor) {
    var setor = setores[nomeSetor];

    if (plantaAtual) {
        map.removeLayer(plantaAtual);
    }

    marcadores.forEach(m => map.removeLayer(m));
    marcadores = [];

    var bounds = [[0, 0], [setor.h, setor.w]];

    plantaAtual = L.imageOverlay(setor.planta, bounds).addTo(map);

    map.fitBounds(bounds);

    setor.cameras.forEach(cam => {
        var marker = L.marker(cam.coordenada, { icon: cameraIcon })
            .addTo(map)
            .bindPopup(`
                <div style="text-align:center;">
                    <b style="font-size:20px;">${cam.nome}</b><br>
                    <span style="font-size:16px;"><b>Setor:</b> ${cam.setor}</span><br><br>
                    <img src="${cam.preview}" 
                            style="width:350px; border-radius:10px; border:2px solid #ccc;">
                </div>
            `);

        marcadores.push(marker);
    });
}

carregarSetor("adm");

document.getElementById("sectorSelect").addEventListener("change", function() {
    carregarSetor(this.value);
});
}