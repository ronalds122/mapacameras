var userPadrao = "admin";
var senhaPadrao = "Cafe@569458";

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
        crs: L.CRS.Simple,
        minZoom: 0
    });

    var setores = {

        area_externa: {
            planta: "planta_areaexterna.png",
            w: 2000,
            h: 1200,
            cameras: [
                { nome: "Câmera 1", setor: "area_externa", coordenada: [1016, 1613], preview: "previews/cam1_areaexterna.jpg" },
                { nome: "Câmera 2", setor: "area_externa", coordenada: [982, 1630], preview: "previews/cam2_areaexterna.jpg" },
                { nome: "Câmera 3", setor: "area_externa", coordenada: [115, 843], preview: "previews/cam3_areaexterna.jpg" },
                { nome: "Câmera 4", setor: "area_externa", coordenada: [102, 860], preview: "previews/cam4_areaextena.jpg" },
                { nome: "Câmera 5", setor: "area_externa", coordenada: [75, 904], preview: "previews/cam5_areaexterna.jpg" },
                { nome: "Câmera 6", setor: "area_externa", coordenada: [53, 989], preview: "previews/cam6_areaexterna.jpg" },
                { nome: "Câmera 7", setor: "area_externa", coordenada: [65, 935], preview: "previews/cam7_areaexterna.jpg" },
                { nome: "Câmera 8", setor: "area_extena", coordenada: [590, 1508], preview: "previews/cam8_areaexterna.jpg" },
                { nome: "Câmera 9", setor: "area_externa", coordenada: [623, 1540], preview: "previews/cam9_areaexterna.jpg" },
                { nome: "Câmera 10", setor: "area_externa", coordenada: [824, 1685], preview: "previews/cam10_areaexterna.jpg" },
                { nome: "Câmera 11", setor: "area_externa", coordenada: [858, 1628], preview: "previews/cam11_areaexterna.jpg" },
                { nome: "Câmera 12", setor: "area_externa", coordenada: [668, 1490], preview: "previews/cam12_areaexterna.jpg" },
                { nome: "Câmera 13", setor: "area_externa", coordenada: [735, 1530], preview: "previews/cam13_areaexterna.jpg" },
                { nome: "Câmera 14", setor: "area_externa", coordenada: [715, 1510], preview: "previews/cam14_areaexterna.jpg" },
                { nome: "Câmera 15", setor: "area_externa", coordenada: [1002, 1468], preview: "previews/cam15_areaexterna.jpg" },
                { nome: "Câmera 16", setor: "area_externa", coordenada: [1057, 1503], preview: "previews/cam16_areaexterna.jpg" },
                { nome: "Câmera 17", setor: "area_externa", coordenada: [1013, 1620], preview: "previews/cam17_areaexterna.jpg" },
                { nome: "Câmera 18", setor: "area_externa", coordenada: [597, 1324], preview: "previews/cam18_areaexterna.jpg" },
                { nome: "Câmera 19", setor: "area_externa", coordenada: [504, 1269], preview: "previews/cam19_areaexterna.jpg" },
                { nome: "Câmera 20", setor: "area_externa", coordenada: [424, 1224], preview: "previews/cam20_areaexterna.jpg" },
                { nome: "Câmera 21", setor: "area_externa", coordenada: [947, 1415], preview: "previews/cam21_areaexterna.jpg" },
                { nome: "Câmera 22", setor: "area_externa", coordenada: [910, 1415], preview: "previews/cam22_areaexterna.jpg" },
            
            ]
        },

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
                { nome: "Câmera 3", setor: "Administrativo", coordenada: [810, 1078], preview: "previews/cam3.jpg" },
            ]
        },

        recepcao: { 
            planta: "planta_recepcao.png", 
            w: 2000, 
            h: 1200, 
            cameras: [
                { nome: "Câmera 1", setor: "recepcao", coordenada: [428, 893], preview: "previews/cam1_recepcao.jpg" },
                { nome: "Câmera 2", setor: "recepcao", coordenada: [316, 841], preview: "previews/cam2_recepcao.jpg" },
                { nome: "Câmera 3", setor: "recepcao", coordenada: [389, 883], preview: "previews/cam3_recepcao.jpg" },
                { nome: "Câmera 4", setor: "recepcao", coordenada: [404, 974], preview: "previews/cam4_recepcao.jpg" },
                { nome: "Câmera 5", setor: "recepcao", coordenada: [398, 990], preview: "previews/cam5_recepcao.jpg" },
                { nome: "Câmera 6", setor: "recepcao", coordenada: [450, 1022], preview: "previews/cam6_recepcao.jpg" },
                { nome: "Câmera 7", setor: "recepcao", coordenada: [283, 829], preview: "previews/cam7_recepcao.jpg" },
                { nome: "Câmera 8", setor: "recepcao", coordenada: [489, 1061], preview: "previews/cam8_recepcao.jpg" },
                { nome: "Câmera 9", setor: "recepcao", coordenada: [438, 974], preview: "previews/cam9_recepcao.jpg" },
                { nome: "Câmera 10", setor: "recepcao", coordenada: [425, 1007], preview: "previews/cam10_recepcao.jpg" },
                { nome: "Câmera 11", setor: "recepcao", coordenada: [410, 1030], preview: "previews/cam11_recepcao.jpg" },
                { nome: "Câmera 12", setor: "recepcao", coordenada: [410, 1030], preview: "previews/cam12_recepcao.jpg" },
                { nome: "Câmera 13", setor: "recepcao", coordenada: [416, 1062], preview: "previews/cam13_recepcao.jpg" },
                { nome: "Câmera 14", setor: "recepcao", coordenada: [222, 828], preview: "previews/cam14_recepcao.jpg" },
                { nome: "Câmera 15", setor: "recepcao", coordenada: [194, 950], preview: "previews/cam15_recepcao.jpg" },
                { nome: "Câmera 16", setor: "recepcao", coordenada: [160, 806], preview: "previews/cam16_recepcao.jpg" },


            ] 
        },

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

        portaria: { planta: "planta_portaria.png", w: 2000, h: 1200, cameras: [
                { nome: "Câmera 1", setor: "portaria", coordenada: [568, 1212], preview: "previews/cam1_portaria.jpg" },
                { nome: "Câmera 2", setor: "portaria", coordenada: [609, 1092], preview: "previews/cam2_portaria.jpg" },
                { nome: "Câmera 3", setor: "portaria", coordenada: [516, 1102], preview: "previews/cam3_portaria.jpg" },
                { nome: "Câmera 4", setor: "portaria", coordenada: [838, 1036], preview: "previews/cam4_portaria.jpg" },
                { nome: "Câmera 5", setor: "portaria", coordenada: [661, 859], preview: "previews/cam5_portaria.jpg" },
                { nome: "Câmera 6", setor: "portaria", coordenada: [677, 956], preview: "previews/cam6_portaria.jpg"  },
                { nome: "Câmera 7", setor: "portaria", coordenada: [702, 882], preview: "previews/cam7_portaria.jpg" },
                { nome: "Câmera 8", setor: "portaria", coordenada: [838,1058], preview: "previews/cam8_portaria.jpg" },
                { nome: "Câmera 9", setor: "portaria", coordenada: [548, 1101], preview: "previews/cam9_portaria.jpg" },
                { nome: "Câmera 10", setor: "portaria", coordenada: [730, 1041], preview: "previews/cam10_portaria.jpg"},

        ] },

        robo: { planta: "planta_robo.png", w: 2000, h: 1200, cameras: [
                { nome: "Câmera 1", setor: "robo", coordenada: [150, 971], preview: "previews/cam1_robo.jpg" },
                { nome: "Câmera 2", setor: "robo", coordenada: [46, 1283], preview: "previews/cam2_robo.jpg" },
                { nome: "Câmera 3", setor: "robo", coordenada: [366, 609], preview: "previews/cam3_robo.jpg" },
                { nome: "Câmera 4", setor: "robo", coordenada: [316, 670], preview: "previews/cam4_robo.jpg" },
                { nome: "Câmera 5", setor: "robo", coordenada: [384, 813], preview: "previews/cam5_robo.jpg" },
                { nome: "Câmera 6", setor: "robo", coordenada: [324, 767], preview: "previews/cam6_robo.jpg"  },
                { nome: "Câmera 7", setor: "robo", coordenada: [358, 704], preview: "previews/cam7_robo.jpg" },
                { nome: "Câmera 8", setor: "robo", coordenada: [383,666 ], preview: "previews/cam8_robo.jpg" },
                { nome: "Câmera 9", setor: "robo", coordenada: [429, 740], preview: "previews/cam9_robo.jpg" },
                { nome: "Câmera 10", setor: "robo", coordenada: [257, 883], preview: "previews/cam10_robo.jpg"},
                { nome: "Câmera 11", setor: "robo", coordenada: [1321, 1121], preview: "previews/cam11_robo.jpg" },

        ] },
       
        cafe: { planta: "planta_cafe.png", w: 2000, h: 1200, cameras: [] },
        
        cracker: { planta: "planta_cracker.png", w: 2000, h: 1200, cameras: [
                { nome: "Cam 1", setor: "cracker", coordenada: [712, 769], preview: "previews/cam1_cracker.jpg" },
                { nome: "Cam 2", setor: "cracker", coordenada: [644, 725], preview: "previews/cam2_cracker.jpg" },
                { nome: "Cam 3", setor: "cracker", coordenada: [615, 787], preview: "previews/cam3_cracker.jpg" },
                { nome: "Cam 4", setor: "cracker", coordenada: [451, 623], preview: "previews/cam4_cracker.jpg" },
                { nome: "Cam 5", setor: "cracker", coordenada: [206, 446], preview: "previews/cam5_cracker.jpg" },
                { nome: "Cam 6", setor: "cracker", coordenada: [348, 551], preview: "previews/cam6_cracker.jpg" },
                { nome: "Cam 7", setor: "cracker", coordenada: [785, 875], preview: "previews/cam7_cracker.jpg" },
                { nome: "Cam 8", setor: "cracker", coordenada: [140, 498], preview: "previews/cam8_cracker.jpg" },
                { nome: "Cam 9", setor: "cracker", coordenada: [563, 663], preview: "previews/cam9_cracker.jpg" },
                { nome: "Cam 10", setor: "cracker", coordenada: [435, 584], preview: "previews/cam10_cracker.jpg" },
                { nome: "Cam 11", setor: "cracker", coordenada: [556, 859], preview: "previews/cam11_cracker.jpg" },
                { nome: "Cam 12", setor: "cracker", coordenada: [290, 457], preview: "previews/cam12_cracker.jpg" },
                { nome: "Cam 13", setor: "cracker", coordenada: [0,0], preview:      "previews/cam_cracker.jpg" },
                { nome: "Cam 14", setor: "cracker", coordenada: [1136, 138], preview: "previews/cam14_cracker.jpg" },
                { nome: "Cam 15", setor: "cracker", coordenada: [950, 1396], preview: "previews/cam15_cracker.jpg" },
                { nome: "Cam 16", setor: "cracker", coordenada: [945, 1175], preview: "previews/cam16_cracker.jpg" },
                { nome: "Cam 17", setor: "cracker", coordenada: [912, 1366], preview: "previews/cam17_cracker.jpg" },
                { nome: "Cam 18", setor: "cracker", coordenada: [987, 1432], preview: "previews/cam18_cracker.jpg" },
                { nome: "Cam 19", setor: "cracker", coordenada: [770, 1264], preview: "previews/cam29_cracker.jpg" },
                { nome: "Cam 20", setor: "cracker", coordenada: [0,0], preview: "previews/cam_cracker.jpg" },
                { nome: "Cam 21", setor: "cracker", coordenada: [736, 1292], preview: "previews/cam21_cracker.jpg" },
                { nome: "Cam 22", setor: "cracker", coordenada: [462, 624], preview: "previews/cam22_cracker.jpg" },
                { nome: "Cam 23", setor: "cracker", coordenada: [594, 1136], preview: "previews/cam23_cracker.jpg" },
                { nome: "Cam 24", setor: "cracker", coordenada: [685, 1022], preview: "previews/cam24_cracker.jpg" },
                { nome: "Cam 25", setor: "cracker", coordenada: [570, 911], preview: "previews/cam25_cracker.jpg" },
                { nome: "Cam 26", setor: "cracker", coordenada: [402, 1044], preview: "previews/cam26_cracker.jpg" },
                { nome: "Cam 27", setor: "cracker", coordenada: [0,0], preview: "previews/cam27_cracker.jpg" },
                { nome: "Cam 28", setor: "cracker", coordenada: [364, 615], preview: "previews/cam28_cracker.jpg" },
                { nome: "Cam 29", setor: "cracker", coordenada: [0,0], preview: "previews/cam_cracker.jpg" },
                { nome: "Cam 30", setor: "cracker", coordenada: [350, 703], preview: "previews/cam30_cracker.jpg" },
                { nome: "Cam 31", setor: "cracker", coordenada: [425, 813], preview: "previews/cam31_cracker.jpg" },
                { nome: "Cam 32", setor: "cracker", coordenada: [0,0], preview: "previews/cam32_cracker.jpg" },

        ] },

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
        },

        distribuicao: {
            planta: "planta_distribuicao.png",
            w: 2000,
            h: 1200,
            cameras: [
                { nome: "Câmera 9", setor: "Distribuição", coordenada: [988, 442], preview: "previews/cam9_distribuicao.jpg" },
                { nome: "Câmera 8", setor: "Distribuição", coordenada: [945, 444], preview: "previews/cam8_distribuicao.jpg" }
            ]
        },

        wafer: {
            planta: "planta_wafer.png",
            w: 2000,
            h: 1200,
            cameras: [
                { nome: "Câmera 1", setor: "wafer", coordenada: [1050, 615], preview: "previews/cam1_wafer.jpg" },
                { nome: "Câmera 2", setor: "wafer", coordenada: [663, 1289], preview: "previews/cam2_wafer.jpg" },
                { nome: "Câmera 3", setor: "wafer", coordenada: [416, 1654], preview: "previews/cam3_wafer.jpg" },
                { nome: "Câmera 4", setor: "wafer", coordenada: [364, 1073], preview: "previews/cam4_wafer.jpg" },
                { nome: "Câmera 5", setor: "wafer", coordenada: [401, 1003], preview: "previews/cam5_wafer.jpg" },
                { nome: "Câmera 6", setor: "wafer", coordenada: [751, 458], preview: "previews/cam6_wafer.jpg"  },
                { nome: "Câmera 7", setor: "wafer", coordenada: [1016, 590], preview: "previews/cam7_wafer.jpg" },
                { nome: "Câmera 8", setor: "wafer", coordenada: [1029, 262], preview: "previews/cam8_wafer.jpg" },
                { nome: "Câmera 9", setor: "wafer", coordenada: [1005, 188], preview: "previews/cam9_wafer.jpg" },
                { nome: "Câmera 10", setor: "wafer", coordenada: [954, 567], preview: "previews/cam10_wafer.jpg"},
                { nome: "Câmera 11", setor: "wafer", coordenada: [884, 530], preview: "previews/cam11_wafer.jpg" },
                { nome: "Câmera 12", setor: "wafer", coordenada: [846, 506], preview: "previews/cam12_wafer.jpg" },
                { nome: "Câmera 13", setor: "wafer", coordenada: [816, 505], preview: "previews/cam13_wafer.jpg" },
                { nome: "Câmera 14", setor: "wafer", coordenada: [782, 482], preview: "previews/cam14_wafer.jpg" },
                { nome: "Câmera 15", setor: "wafer", coordenada: [745, 1097], preview: "previews/cam15_wafer.jpg" },
                { nome: "Câmera 16", setor: "wafer", coordenada: [869, 711], preview: "previews/cam16_wafer.jpg" },
                { nome: "Câmera 17", setor: "wafer", coordenada: [701, 609], preview: "previews/cam17_wafer.jpg" },
                { nome: "Câmera 18", setor: "wafer", coordenada: [581, 823], preview: "previews/cam18_wafer.jpg" },
                { nome: "Câmera 19", setor: "wafer", coordenada: [686, 913], preview: "previews/cam19_wafer.jpg" },
                { nome: "Câmera 20", setor: "wafer", coordenada: [726, 932], preview: "previews/cam20_wafer.jpg" },
                { nome: "Câmera 21", setor: "wafer", coordenada: [663, 927], preview: "previews/cam21_wafer.jpg" },
                { nome: "Câmera 22", setor: "wafer", coordenada: [715, 963], preview: "previews/cam21_wafer.jpg" },
                { nome: "Câmera 23", setor: "wafer", coordenada: [409, 1121], preview: "previews/cam23_wafer.jpg" }, 
                { nome: "Câmera 24", setor: "wafer", coordenada: [560, 1231], preview: "previews/cam24_wafer.jpg" },
                { nome: "Câmera 25", setor: "wafer", coordenada: [552, 1443], preview: "previews/cam25_wafer.jpg" },
                { nome: "Câmera 26", setor: "wafer", coordenada: [316, 1279], preview: "previews/cam26_wafer.jpg" },
                { nome: "Câmera 27", setor: "wafer", coordenada: [496, 1442], preview: "previews/cam27_wafer.jpg" },   
                { nome: "Câmera 28", setor: "wafer", coordenada: [421, 1404], preview: "previews/cam28_wafer.jpg" },
                { nome: "Câmera 29", setor: "wafer", coordenada: [293, 1332], preview: "previews/cam29_wafer.jpg" },
                { nome: "Câmera 30", setor: "wafer", coordenada: [234, 1442], preview: "previews/cam30_wafer.jpg" }, 
                { nome: "Câmera 31", setor: "wafer", coordenada: [472, 1559], preview: "previews/cam31_wafer.jpg"},
            ]
        },

        estoque: {
            planta: "planta_estoque.png",
            w: 2000,
            h: 1200,
            cameras: [
                { nome: "Câmera 1", setor: "estoque", coordenada: [1033, 948], preview: "previews/cam1_estoque.jpg" },
                { nome: "Câmera 2", setor: "estoque", coordenada: [954, 1003], preview: "previews/cam2_estoque.jpg" },
                { nome: "Câmera 3", setor: "estoque", coordenada: [892, 1107], preview: "previews/cam3_estoque.jpg" },
                { nome: "Câmera 4", setor: "estoque", coordenada: [857, 1180], preview: "previews/cam4_estoque.jpg" },
                { nome: "Câmera 5", setor: "estoque", coordenada: [804, 1322], preview: "previews/cam5_estoque.jpg" },
                { nome: "Câmera 6", setor: "estoque", coordenada: [684, 1113], preview: "previews/cam6_estoque.jpg"  },
                { nome: "Câmera 7", setor: "estoque", coordenada: [620, 1071], preview: "previews/cam7_estoque.jpg" },
                { nome: "Câmera 8", setor: "estoque", coordenada: [0,0], preview: "previews/cam8_estoque.jpg" },
                { nome: "Câmera 9", setor: "estoque", coordenada: [545, 1026], preview: "previews/cam9_estoque.jpg" },
                { nome: "Câmera 10", setor: "estoque", coordenada: [461, 924], preview: "previews/cam10_estoque.jpg"},
                { nome: "Câmera 11", setor: "estoque", coordenada: [465, 1167], preview: "previews/cam11_estoque.jpg" },
                { nome: "Câmera 12", setor: "estoque", coordenada: [455, 1166], preview: "previews/cam12_estoque.jpg" },
                { nome: "Câmera 13", setor: "estoque", coordenada: [259, 1218], preview: "previews/cam13_estoque.jpg" },
                { nome: "Câmera 14", setor: "estoque", coordenada: [404, 1328], preview: "previews/cam14_estoque.jpg" },
                { nome: "Câmera 15", setor: "estoque", coordenada: [447, 1149], preview: "previews/cam15_estoque.jpg" },
                { nome: "Câmera 16", setor: "estoque", coordenada: [703, 1495], preview: "previews/cam16_estoque.jpg" },
                { nome: "Câmera 17", setor: "estoque", coordenada: [541, 1381], preview: "previews/cam17_estoque.jpg" },
                { nome: "Câmera 18", setor: "estoque", coordenada: [666, 1484], preview: "previews/cam18_estoque.jpg" },
                { nome: "Câmera 19", setor: "estoque", coordenada: [831, 1310], preview: "previews/cam19_estoque.jpg" },
                { nome: "Câmera 20", setor: "estoque", coordenada: [868, 1265], preview: "previews/cam20_estoque.jpg" },
                { nome: "Câmera 21", setor: "estoque", coordenada: [779, 1421], preview: "previews/cam21_estoque.jpg" },
                { nome: "Câmera 22", setor: "estoque", coordenada: [934, 1208], preview: "previews/cam21_estoque.jpg" },
                { nome: "Câmera 23", setor: "estoque", coordenada: [918, 1212], preview: "previews/cam23_estoque.jpg" }, 
                { nome: "Câmera 24", setor: "estoque", coordenada: [629, 1517], preview: "previews/cam24_estoque.jpg" },
                
            ]
        },

        docas_estoque: {
            planta: "planta_docas_estoque.png",
            w: 2000,
            h: 1200,
            cameras: [
                { nome: "Câmera 1", setor: "docas_estoque", coordenada: [964, 855], preview: "previews/cam1_doca.jpg" },
                { nome: "Câmera 2", setor: "docas_estoque", coordenada: [941, 838], preview: "previews/cam2_doca.jpg" },
                { nome: "Câmera 3", setor: "docas_estoque", coordenada: [915, 818], preview: "previews/cam3_doca.jpg" },
                { nome: "Câmera 4", setor: "docas_estoque", coordenada: [893, 806], preview: "previews/cam4_doca.jpg" },
                { nome: "Câmera 5", setor: "docas_estoque", coordenada: [866, 788], preview: "previews/cam5_doca.jpg" },
                { nome: "Câmera 6", setor: "docas_estoque", coordenada: [833, 764], preview: "previews/cam6_doca.jpg"  },
                { nome: "Câmera 7", setor: "docas_estoque", coordenada: [795, 739], preview: "previews/cam7_doca.jpg" },
                { nome: "Câmera 8", setor: "docas_estoque", coordenada: [758,715], preview: "previews/cam8_doca.jpg" },
                { nome: "Câmera 9", setor: "docas_estoque", coordenada: [727, 690], preview: "previews/cam9_doca.jpg" },
                { nome: "Câmera 10", setor: "docas_estoque", coordenada: [672, 663], preview: "previews/cam10_doca.jpg"},
                { nome: "Câmera 11", setor: "docas_estoque", coordenada: [641, 644], preview: "previews/cam11_doca.jpg" },
                { nome: "Câmera 12", setor: "docas_estoque", coordenada: [621, 626], preview: "previews/cam12_doca.jpg" },
                { nome: "Câmera 13", setor: "docas_estoque", coordenada: [594, 607], preview: "previews/cam13_doca.jpg" },
                { nome: "Câmera 14", setor: "docas_estoque", coordenada: [565, 586], preview: "previews/cam14_doca.jpg" },
                { nome: "Câmera 15", setor: "docas_estoque", coordenada: [543, 570], preview: "previews/cam15_doca.jpg" },
                { nome: "Câmera 16", setor: "docas_estoque", coordenada: [515, 553], preview: "previews/cam16_doca.jpg" },
                { nome: "Câmera 17", setor: "docas_estoque", coordenada: [604, 667], preview: "previews/cam17_doca.jpg" },
                { nome: "Câmera 18", setor: "docas_estoque", coordenada: [550, 633], preview: "previews/cam18_doca.jpg" },
                { nome: "Câmera 19", setor: "docas_estoque", coordenada: [496, 534], preview: "previews/cam19_doca.jpg" },
                { nome: "Câmera 20", setor: "docas_estoque", coordenada: [470, 577], preview: "previews/cam20_doca.jpg" },
                { nome: "Câmera 21", setor: "docas_estoque", coordenada: [471, 515], preview: "previews/cam21_doca.jpg" },
                { nome: "Câmera 22", setor: "docas_estoque", coordenada: [445, 567], preview: "previews/cam21_doca.jpg" },
                { nome: "Câmera 23", setor: "docas_estoque", coordenada: [439, 522], preview: "previews/cam23_doca.jpg" }, 
                { nome: "Câmera 24", setor: "docas_estoque", coordenada: [430, 583], preview: "previews/cam24_doca.jpg" },
                { nome: "Câmera 25", setor: "docas_estoque", coordenada: [467, 544], preview: "previews/cam25_doca.jpg" },
                { nome: "Câmera 26", setor: "docas_estoque", coordenada: [524, 618], preview: "previews/cam26_doca.jpg" },
                { nome: "Câmera 27", setor: "docas_estoque", coordenada: [580, 615], preview: "previews/cam27_doca.jpg" },
                { nome: "Câmera 28", setor: "docas_estoque", coordenada: [418, 563], preview: "previews/cam28_doca.jpg" },
                { nome: "Câmera 29", setor: "docas_estoque", coordenada: [463, 559], preview: "previews/cam29_doca.jpg" },
                { nome: "Câmera 30", setor: "docas_estoque", coordenada: [1047, 930], preview: "previews/cam30_doca.jpg" },
                { nome: "Câmera 31", setor: "docas_estoque", coordenada: [0,0], preview: "previews/cam31_doca.jpg" }, 
                { nome: "Câmera 32", setor: "docas_estoque", coordenada: [1012, 921], preview: "previews/cam32_doca.jpg" },

            ]
    },

     estoque_embalagem: {
            planta: "planta_estoque_embalagem.png",
            w: 2000,
            h: 1200,
            cameras: [
                { nome: "Câmera 1", setor: "estoque_embalagem", coordenada: [1011, 1147], preview: "previews/cam1_embalagem.jpg" },
                { nome: "Câmera 2", setor: "estoque_embalagem", coordenada: [1055, 1179], preview: "previews/cam2_embalagem.jpg" },
                { nome: "Câmera 3", setor: "estoque_embalagem", coordenada: [895, 1404], preview: "previews/cam3_embalagem.jpg" },
                { nome: "Câmera 4", setor: "estoque_embalagem", coordenada: [244, 669], preview: "previews/cam4_embalagem.jpg" },
                { nome: "Câmera 5", setor: "estoque_embalagem", coordenada: [1012, 1179], preview: "previews/cam5_embalagem.jpg" },
                { nome: "Câmera 6", setor: "estoque_embalagem", coordenada: [1007, 1250], preview: "previews/cam6_embalagem.jpg"  },
                { nome: "Câmera 7", setor: "estoque_embalagem", coordenada: [697, 1007], preview: "previews/cam7_embalagem.jpg" },
                { nome: "Câmera 8", setor: "estoque_embalagem", coordenada: [977,1296], preview: "previews/cam8_embalagem.jpg" },
                { nome: "Câmera 9", setor: "estoque_embalagem", coordenada: [646, 1080], preview: "previews/cam9_embalagem.jpg" },
                { nome: "Câmera 10", setor: "estoque_embalagem", coordenada: [939, 1352], preview: "previews/cam10_embalagem.jpg"},
                { nome: "Câmera 11", setor: "estoque_embalagem", coordenada: [0,0], preview: "previews/cam11_embalagem.jpg" },
                { nome: "Câmera 12", setor: "estoque_embalagem", coordenada: [901, 1399], preview: "previews/cam12_embalagem.jpg" },
                { nome: "Câmera 13", setor: "estoque_embalagem", coordenada: [634, 928], preview: "previews/cam13_embalagem.jpg" },
                { nome: "Câmera 14", setor: "estoque_embalagem", coordenada: [241, 710], preview: "previews/cam14_embalagem.jpg" },
                { nome: "Câmera 15", setor: "estoque_embalagem", coordenada: [634, 1010], preview: "previews/cam15_embalagem.jpg" },
                { nome: "Câmera 16", setor: "estoque_embalagem", coordenada: [214, 752], preview: "previews/cam16_embalagem.jpg" },
                { nome: "Câmera 17", setor: "estoque_embalagem", coordenada: [634, 1139], preview: "previews/cam17_embalagem.jpg" },
                { nome: "Câmera 18", setor: "estoque_embalagem", coordenada: [188, 808], preview: "previews/cam18_embalagem.jpg" },
                { nome: "Câmera 19", setor: "estoque_embalagem", coordenada: [628, 1158], preview: "previews/cam19_embalagem.jpg" },
                { nome: "Câmera 20", setor: "estoque_embalagem", coordenada: [138, 862], preview: "previews/cam20_embalagem.jpg" },
                { nome: "Câmera 21", setor: "estoque_embalagem", coordenada: [628, 1222], preview: "previews/cam21_embalagem.jpg" },
                { nome: "Câmera 22", setor: "estoque_embalagem", coordenada: [115, 902], preview: "previews/cam22_embalagem.jpg" },
                
            ]
 
    },
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

        if (!setor) {
            alert("Setor não encontrado: " + nomeSetor);
            return;
        }

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
                        <img src="${cam.preview}" style="width:350px; border-radius:10px; border:2px solid #ccc;">
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