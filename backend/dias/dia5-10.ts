// ==================== DIA 5 ====================
import { inventario } from "../inventario";
import { chance } from "../aleatoriedade";
import { estaVivo, aplicarFerimento } from "../principaisFuncoes";

let dia: number = inventario.dia + 1;

let escolha: string;
let combate: string;
let armaEscolhida: string;

let resfriado: boolean = false;
let ferimento: boolean = false;



function coletaNormal() {
    alert('Você procura por recursos, mas está tudo muito escasso...');
    
    
    if (chance(0.3)) {
        inventario.comida += 1;
        alert('🍗 Você encontrou +1 comida.');
    }
    
    if (chance(0.3)) {
        inventario.agua += 1;
        alert('💧 Você encontrou +1 água.');
    }
    
    if (chance(0.25)) {
        let muni = chance(0.5)? 1 : 3;
        inventario.balas += muni;
        alert('🔫 Você encontrou ' + muni + ' balas.');
    }
    
    if (inventario.durabilidadeArma <= 0) {
        if (chance(0.25)) {
            inventario.durabilidadeArma = 10;
            alert('🪓 Você encontrou uma nova arma corpo a corpo (durabilidade 10).');
        }
    }
    
    if (chance(0.35)) {
        inventario.remedios += 1;
        alert('💊 Você encontrou 1 remédio.');
    }
    
    if (chance(0.3)) { 
        inventario.kitMedico += 1;
        alert('🏥 Você encontrou 1 kit médico.');
    }
}

function coletaReduzida() {
    alert('Você encontra pouquíssimos recursos...');
    
    if (chance(0.15)) {
        inventario.comida += 1;
        alert('🍗 Você encontrou +1 comida.');
    }
    
    if (chance(0.15)) {
        inventario.agua += 1;
        alert('💧 Você encontrou +1 água.');
    }
    
    if (chance(0.1)) {
        let muni = chance(0.5)? 1 : 3;
        inventario.balas += muni;
        alert('🔫 Você encontrou ' + muni + ' balas.');
    }
    
    if (inventario.durabilidadeArma <= 0) {
        if (chance(0.1)) {
            inventario.durabilidadeArma = 10;
            alert('🪓 Você encontrou uma arma corpo a corpo (durabilidade 10).');
        }
    }
    
    if (chance(0.1)) {
        inventario.remedios += 1;
        alert('💊 Você encontrou 1 remédio.');
    }
}

function coletaHorda() {
    alert('A horda deixou muitos recursos para trás!');
    
    inventario.comida += 3;
    alert('🍗 Você encontrou +3 comida.');
    
    inventario.agua += 2;
    alert('💧 Você encontrou +2 água.');
    
    let muni = chance(0.5)? 4 : 6;
    inventario.balas += muni;
    alert('🔫 Você encontrou ' + muni + ' balas.');
    
    if (chance(0.4)) {  
        inventario.remedios += 1;
        alert('💊 Você encontrou 1 remédio.');
    }
    
    if (chance(0.25)) { 
        inventario.kitMedico += 1;
        alert('🏥 Você encontrou 1 kit médico.');
    }
}

let eventoGlobal: string = '';
let temEvento: boolean = false;

if (chance(0.4)) {
    temEvento = true;
    
    let numeroSorte = chance(0.33)? 1 : chance(0.66)? 2 : 3;
    
    if (numeroSorte == 1) { 
        eventoGlobal = 'chuva';
        alert('EVENTO GLOBAL: CHUVA FORTE\n\nVocê conseguiu coletar um pouco de água.');
        let aguaColetada = chance(0.5)? 2 : 3;
        inventario.agua += aguaColetada;
        alert('💧 +' + aguaColetada + ' água.');
        
    } else if (numeroSorte == 2) {
        eventoGlobal = 'calor';
        alert('EVENTO GLOBAL: ONDA DE CALOR\n\nSair para explorar vai exigir mais água.');
        
    } else {
        eventoGlobal = 'zumbis';
        alert('EVENTO GLOBAL: ZUMBIS NA BASE\n\nZumbis estão rondando a base. Você não pode sair enquanto eles estiverem por perto.');
    }
} else {
    alert('Um dia normal...');
}

alert(
'══════════════════════════════\n' +
'         NOTÍCIAS\n' +
'══════════════════════════════\n\n' +

'"Os zumbis estão mais agressivos!"\n\n' +

'- Relatos de ataques em massa aumentam.\n' +
'- Zumbis estão se agrupando em hordas.\n' +
'- Sobreviventes estão sendo caçados.\n' +
'- Recursos estão cada vez mais escassos.\n' +
'- "Não saia sozinho, é muito perigoso."\n\n' +

'📻 "A situação está fora de controle..."\n\n' +
'══════════════════════════════'
);

alert(
'══════════════════════════════\n' +
'DIA ' + inventario.dia + '\n' +
'══════════════════════════════\n\n' +

'08:00 AM\n\n' +

'❤️ Vida: ' + inventario.vida + '/10\n' +
'🍗 Fome: ' + inventario.fome + '/5\n' +
'💧 Sede: ' + inventario.sede + '/5\n' +

(inventario.resfriado ? '\n🤒 VOCÊ ESTÁ RESFRIADO 🤒\n' : '') +
(inventario.ferimento ? '\n🩸 VOCÊ ESTÁ FERIDO 🩸\n' : '') +

'\nESTOQUE:\n' +
'🍗 Comida: ' + inventario.comida + '\n' +
'💧 Água: ' + inventario.agua + '\n' +
'🔫 Balas: ' + inventario.balas + '\n' +
'🪓 Arma C.C.: ' + inventario.durabilidadeArma + '/10\n' +
'💊 Remédios: ' + inventario.remedios + '\n' +
'🏥 Kit médico: ' + inventario.kitMedico + '\n\n' +

'Quinto dia de sobrevivência.\n' +
'Os recursos estão ficando escassos...\n' +
'Os zumbis estão mais perigosos.\n\n' +

'O que devo fazer?'
);

function explorarDia5() {
    let jaSaiu = false;
    
    if (temEvento) {
        switch (eventoGlobal) {
            case 'chuva':
                alert('Você sai na chuva para explorar...');
                jaSaiu = true;
                
                if (chance(0.35)) {
                    if (!inventario.resfriado) {
                        inventario.resfriado = true;
                        alert('Você pegou um resfriado! Use remédios para curar.');
                    } else {
                        alert('Seu resfriado piorou!');
                    }
                }
                break;
                
            case 'calor':
                alert('Você sai sob o sol escaldante para explorar...');
                jaSaiu = true;
                inventario.sede -= 2;
                if (inventario.sede < 0) inventario.sede = 0;
                alert('💧 O calor fez você perder +2 de sede. Sede: ' + inventario.sede + '/5');
                break;
                
            case 'zumbis':
                alert('Os zumbis bloqueiam a passagem! Você não consegue sair.');
                return;
        }
    }
    
    if (!jaSaiu) {
        alert('Você decidiu sair para explorar.');
    }
    
    let isHorda = (chance(0.3));
    
    if (isHorda) {
        alert('🧟🧟🧟 VOCÊ ENCONTROU UMA HORDA DE ZUMBIS! 🧟🧟🧟\n\n' +
              'Dezenas de zumbis estão vindo na sua direção!');
        
        combate = prompt(
            'O que você deseja fazer?\n\n' +
            '1 - Enfrentar com pistola (Mais segura, gasta muitas balas)\n' +
            '2 - Enfrentar corpo a corpo (Muito arriscado, você pode morrer)\n' +
            '3 - Tentar fugir (Pode perder recursos)'
        )!;
        
        while (combate != '1' && combate != '2' && combate != '3') {
            alert('Responda apenas com 1, 2 ou 3.');
            combate = prompt('1 - Pistola\n2 - Corpo a corpo\n3 - Fugir')!;
        }
        
        if (combate == '1') {
            alert('Você usa a pistola contra a horda!');
            
            let balasGastas = Math.floor(Math.random() * 8) + 8; // 8-15 balas
            if (balasGastas > inventario.balas) balasGastas = inventario.balas;
            inventario.balas -= balasGastas;
            alert('🔫 Você gastou ' + balasGastas + ' balas na luta.');
            
            let dano = Math.floor(Math.random() * 3) + 2; // 2-4 dano
            inventario.vida -= dano;
            if (inventario.vida < 0) inventario.vida = 0;
            alert('❤️ Você sofreu ' + dano + ' de dano. Vida: ' + inventario.vida + '/10');
            
            if (chance(0.55) && !inventario.ferimento) {
                inventario.ferimento = true;
                alert('🩸 Você ficou ferido! Sangramento vai causar dano diário.');
            }
            
            coletaHorda();
            
        } else if (combate == '2') {
            alert('Você parte para cima da horda com sua arma corpo a corpo! É uma loucura!');
            
            if (inventario.durabilidadeArma <= 0) {
                alert('Você está sem arma utilizável! A horda te devora...');
                inventario.vida = 0;
                alert('❤️ Você morreu.');
                return;
            }
            
            let durabilidadePerdida = chance(0.5)? 5 : 9; // 5-9 durabilidade
            inventario.durabilidadeArma -= durabilidadePerdida;
            if (inventario.durabilidadeArma < 0) inventario.durabilidadeArma = 0;
            alert('🪓 Sua arma perdeu ' + durabilidadePerdida + ' de durabilidade. Durabilidade: ' + inventario.durabilidadeArma + '/10');
            
            let dano = chance(0.5)? 4 : 6; // 4-6 dano
            inventario.vida -= dano;
            if (inventario.vida < 0) inventario.vida = 0;
            alert('❤️ Você sofreu ' + dano + ' de dano lutando corpo a corpo! Vida: ' + inventario.vida + '/10');
            
            if (!inventario.ferimento) {
                inventario.ferimento = true;
                alert('🩸 Você ficou gravemente ferido! Sangramento vai causar dano diário.');
            }
            
            if (inventario.vida <= 0) return;
            
            alert('Milagrosamente, você sobreviveu!.');
            
            inventario.comida += 1;
            alert('🍗 Você encontrou +1 comida.');
            
            inventario.agua += 1;
            alert('💧 Você encontrou +1 água.');
            
            if (chance(0.35)) {
                let muni = chance(0.5)? 2 : 3;
                inventario.balas += muni;
                alert('🔫 Você encontrou ' + muni + ' balas.');
            }
            
        } else {
            alert('Você tenta fugir da horda desesperadamente!');
            
            if (chance(0.5)) {
                alert('Você conseguiu escapar! Correu muito e se escondeu.');
                
                let perdaComida = chance(0.5)? 1 : 2;
                let perdaAgua = chance(0.5)? 1 : 2;
                inventario.comida -= perdaComida;
                inventario.agua -= perdaAgua;
                alert('🍗 Você perdeu ' + perdaComida + ' comida e 💧 ' + perdaAgua + ' água na fuga.');
                
                coletaReduzida();
                
            } else {
                alert('Você não conseguiu fugir! Alguns zumbis te alcançaram.');
                alert('Você é forçado a lutar contra alguns zumbis para escapar...');
                
                let balasGastas = Math.floor(Math.random() * 6) + 4; // 4-9 balas
                if (balasGastas > inventario.balas) balasGastas = inventario.balas;
                inventario.balas -= balasGastas;
                alert('🔫 Você gastou ' + balasGastas + ' balas para eliminar os zumbis.');
                
                let dano = Math.floor(Math.random() * 3) + 2; // 2-4 dano
                inventario.vida -= dano;
                if (inventario.vida < 0) inventario.vida = 0;
                alert('❤️ Você sofreu ' + dano + ' de dano na luta. Vida: ' + inventario.vida + '/10');
                
                if (chance(0.45) && !inventario.ferimento) {
                    inventario.ferimento = true;
                    alert('🩸 Você ficou ferido! Sangramento vai causar dano diário.');
                }
                
                if (inventario.vida <= 0) return;
                
                alert('Você conseguiu eliminar os zumbis e escapar!');
                
                if (chance(0.35)) {
                    inventario.comida += 1;
                    alert('🍗 Você encontrou +1 comida.');
                }
                
                if (chance(0.35)) {
                    inventario.agua += 1;
                    alert('💧 Você encontrou +1 água.');
                }
                
                if (chance(0.25)) {
                    let muni = chance(0.5)? 1 : 2;
                    inventario.balas += muni;
                    alert('🔫 Você encontrou ' + muni + ' balas.');
                }
            }
        }
        
    } else {
        if (chance(0.6)) {
            alert('🧟 Você encontrou um zumbi.');
            
            combate = prompt(
                'O que você deseja fazer?\n\n' +
                '1 - Enfrentar\n' +
                '2 - Retornar'
            )!;
            
            while (combate != '1' && combate != '2') {
                alert('Responda apenas com 1 ou 2.');
                combate = prompt('1 - Enfrentar\n2 - Retornar')!;
            }
            
            if (combate == '1') {
                
                armaEscolhida = prompt(
                    'Escolha sua arma:\n\n' +
                    '1 - 🔫 Pistola (' + inventario.balas + ' balas)\n' +
                    '2 - 🪓 Corpo a corpo (durabilidade: ' + inventario.durabilidadeArma + '/10)'
                )!;
                
                while (armaEscolhida != '1' && armaEscolhida != '2') {
                    alert('Responda apenas com 1 ou 2.');
                    armaEscolhida = prompt('1 - Pistola\n2 - Corpo a corpo')!;
                }
                
                if (armaEscolhida == '1' && inventario.balas > 0) {
                    
                    let gasto = chance(0.5)? 3 : 4;
                    if (gasto > inventario.balas) gasto = inventario.balas;
                    
                    inventario.balas -= gasto;
                    
                    alert('🔫 Você eliminou o zumbi.');
                    alert('Balas utilizadas: ' + gasto);
                    
                    coletaNormal();
                    
                } else {
                    
                    if (inventario.durabilidadeArma <= 0) {
                        alert('Você está sem arma utilizável.');
                        alert('Você retorna para casa.');
                        coletaReduzida();
                        return;
                    }
                    
                    let durabilidadePerdida = chance(0.5)? 5 : 9;
                    inventario.durabilidadeArma -= durabilidadePerdida;
                    if (inventario.durabilidadeArma < 0) inventario.durabilidadeArma = 0;
                    alert('🪓 Sua arma perdeu ' + durabilidadePerdida + ' de durabilidade. Durabilidade: ' + inventario.durabilidadeArma + '/10');
                    
                    let chanceDano = 6;
                    if (inventario.resfriado) {
                        chanceDano = 8;
                        alert('[RESFRIADO] Você está fraco e mais vulnerável!');
                    }
                    
                    if (chance(chanceDano/100)) {
                        alert('🪓 Você matou o zumbi.');
                    } else {
                        inventario.vida -= 2;
                        if (inventario.vida < 0) inventario.vida = 0;
                        alert('🪓 Você matou o zumbi, mas sofreu dano. ❤️ -2. Vida: ' + inventario.vida + '/10');
                        
                        if (chance(0.35) && !inventario.ferimento) {
                            inventario.ferimento = true;
                            alert('🩸 Você ficou ferido! Sangramento vai causar dano diário.');
                        }
                    }
                    
                    if (inventario.durabilidadeArma > 0) {
                        if (chance(0.2)) {
                            inventario.durabilidadeArma -= 2;
                            alert('Sua arma perdeu 2 de durabilidade. Durabilidade: ' + inventario.durabilidadeArma + '/10');
                        } else {
                            inventario.durabilidadeArma -= 1;
                            alert('Sua arma perdeu 1 de durabilidade. Durabilidade: ' + inventario.durabilidadeArma + '/10');
                        }
                    }
                    
                    coletaNormal();
                }
                
            } else if (combate == '2') {
                alert('Você ignorou o zumbi e voltou.');
                coletaReduzida();
            }
            
        } else {
            alert('A área está vazia. Você não encontra nada.');
            alert('Você retorna para casa.');
        }
    }
}

// ==================== LOOP PRINCIPAL DO JOGO ====================
while (estaVivo()) {
    
    if (dia == 5) {
        aplicarFerimento();
        if (!estaVivo()) break;
    }

    let menuOpcoes = 
        '══════════════════════════════\n' +
        'ESCOLHA UMA AÇÃO:\n' +
        '══════════════════════════════\n\n' +
        '1 - 🍗 Comer comida (Fome +2)\n' +
        '2 - 💧 Beber água (Sede +2)\n' +
        '3 - 💊 Usar remédio\n' +
        '4 - 🏥 Usar kit médico\n' +
        '5 - 🗺️ Explorar\n' +
        '6 - 🏠 Ficar em casa\n\n' +
        '❤️ Vida: ' + inventario.vida + '/10  🍗 Fome: ' + inventario.fome + '/5  💧 Sede: ' + inventario.sede + '/5\n' +
        '🪓 Arma: ' + inventario.durabilidadeArma + '/10';
    
    if (inventario.resfriado) {
        menuOpcoes += '\n\n🤒 VOCÊ ESTÁ RESFRIADO 🤒';
    }
    if (ferimento) {
        menuOpcoes += '\n\n🩸 VOCÊ ESTÁ FERIDO 🩸';
    }
    
    escolha = prompt(menuOpcoes)!;

    switch (escolha) {
        case '1':
            if (inventario.comida > 0) {
                inventario.comida--;
                inventario.fome = Math.min(inventario.fome + 2, 5);
                alert('🍗 Você comeu e recuperou +2 de fome.\n🍗 Fome: ' + inventario.fome + '/5');
            } else {
                alert('Sem comida!');
                inventario.fome -= 1;
                if (inventario.fome < 0) inventario.fome = 0;
                alert('🍗 Você perdeu 1 de fome. Fome: ' + inventario.fome + '/5');
            }
            break;
            
        case '2':
            if (inventario.agua > 0) {
                inventario.agua--;
                inventario.sede = Math.min(inventario.sede + 2, 5);
                alert('💧 Você bebeu água e recuperou +2 de sede.\n💧 Sede: ' + inventario.sede + '/5');
            } else {
                alert('Sem água!');
                inventario.sede -= 1;
                if (inventario.sede < 0) inventario.sede = 0;
                alert('💧 Você perdeu 1 de sede. Sede: ' + inventario.sede + '/5');
            }
            break;
            
        case '3':
            if (inventario.remedios > 0) {
                inventario.remedios--;
                if (inventario.resfriado) {
                    inventario.resfriado = false;
                    alert('💊 Você usou um remédio e curou o resfriado!');
                } else {
                    alert('💊 Você usou um remédio, mas não estava doente.');
                }
            } else {
                alert('Você não tem remédios.');
            }
            break;
            
        case '4':
            if (inventario.kitMedico > 0) {
                inventario.kitMedico--;
                if (inventario.ferimento) {
                    inventario.ferimento = false;
                    alert('🏥 Você usou o kit médico e curou o ferimento!');
                }
                if (inventario.resfriado) {
                    inventario.resfriado = false;
                    alert('🏥 Você usou o kit médico e curou o resfriado!');
                }
                inventario.vida = Math.min(inventario.vida + 2, 10);
                alert('🏥 Você usou o kit médico e recuperou +2 de vida.\n❤️ Vida: ' + inventario.vida + '/10');
            } else {
                alert('Você não tem kit médico.');
            }
            break;
            
        case '5':
            explorarDia5();
            if (eventoGlobal != 'zumbis' || !temEvento) {
                inventario.fome -= 1;
                if (inventario.fome < 0) inventario.fome = 0;
                inventario.sede -= 1;
                if (inventario.sede < 0) inventario.sede = 0;
                alert('🍗 Você perdeu 1 de fome e 💧 1 de sede por explorar.');
                break;
            }
            break;
            
        case '6':
            alert('Você decidiu ficar em casa.');
            inventario.fome -= 1;
            if (inventario.fome < 0) inventario.fome = 0;
            inventario.sede -= 1;
            if (inventario.sede < 0) inventario.sede = 0;
            alert('🍗 Você perdeu 1 de fome e 💧 1 de sede.');
            break;
            
        default:
            alert('Opção inválida. Escolha 1 a 6.');
            continue;
    }
    
    if (escolha == '5' && (eventoGlobal != 'zumbis' || !temEvento)) {
        break;
    }
    if (escolha == '6') {
        break;
    }
}

// FINAL DO DIA
