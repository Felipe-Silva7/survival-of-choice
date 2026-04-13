
let vida: number;
let fome: number;
let sede: number;

let comida: number;
let agua: number;

let balas: number;
let durabilidadeArma: number;

let remedios: number;
let kitMedico: number;

let numeroSorte: number = 0;
let dias: number;

let escolha: string;
let combate: string;
let armaEscolhida: string;

let resfriado: boolean = false;

vida = 10;
fome = 5;
sede = 5;

comida = 3;
agua = 3;

balas = 6;
durabilidadeArma = 10;

remedios = 0;
kitMedico = 1;

dias = 1;

function sorte(max: number) {
    numeroSorte = Math.floor(Math.random() * max);
}

// Coiso pra ver se o jogador tá vivo
function estaVivo(): boolean {
    if (vida <= 0) {
        alert(
            '══════════════════════════════\n' +
            '          VOCÊ MORREU\n' +
            '══════════════════════════════\n\n' +
            '☠️ CAUSA DA MORTE: Falta de vida ☠️\n\n' +
            'Você não resistiu aos ferimentos...\n\n' +
            'Dias sobrevividos: ' + dias + '\n\n'
        );
        return false;
    }
    
    if (fome <= 0) {
        alert(
            '══════════════════════════════\n' +
            '          VOCÊ MORREU\n' +
            '══════════════════════════════\n\n' +
            '🍗 CAUSA DA MORTE: Fome 🍗\n\n' +
            'Você morreu de fome...\n\n' +
            'Dias sobrevividos: ' + dias + '\n\n'
        );
        return false;
    }
    
    if (sede <= 0) {
        alert(
            '══════════════════════════════\n' +
            '          VOCÊ MORREU\n' +
            '══════════════════════════════\n\n' +
            '💧 CAUSA DA MORTE: Sede 💧\n\n' +
            'Você morreu de desidratação...\n\n' +
            'Dias sobrevividos: ' + dias + '\n\n'
        );
        return false;
    }
    
    return true;
}

alert(
'══════════════════════════════\n' +
'         NOTÍCIAS\n' +
'══════════════════════════════\n\n' +

'"O mundo como conhecemos acabou..."\n\n' +

'- Surto viral se espalha rapidamente.\n' +
'- Autoridades recomendam ficar em casa.\n' +
'- Relatos de violência em todo o país.\n' +
'- Comunicações estão caindo.\n' +
'- Estoque de alimentos está acabando.\n\n' +

'📻 "Esta pode ser a última transmissão..."\n\n' +
'══════════════════════════════'
);

// APRESENTAÇÃO DO DIA
alert(
'══════════════════════════════\n' +
'DIA ' + dias + ' - O INÍCIO\n' +
'══════════════════════════════\n\n' +

'08:00 AM\n\n' +

'❤️ Vida: ' + vida + '/10\n' +
'🍗 Fome: ' + fome + '/5\n' +
'💧 Sede: ' + sede + '/5\n\n' +

'ESTOQUE:\n' +
'🍗 Comida: ' + comida + '\n' +
'💧 Água: ' + agua + '\n' +
'🔫 Balas: ' + balas + '\n' +
'🪓 Arma C.C.: ' + durabilidadeArma + '/10\n' +
'💊 Remédios: ' + remedios + '\n' +
'🏥 Kit médico: ' + kitMedico + '\n\n' +

'Primeiro dia de sobrevivência.\n' +
'O apocalipse começou. Você precisa aprender a sobreviver.\n' +
'Use seus recursos com sabedoria.\n\n' +

'O que devo fazer?'
);

function explorarDia1() {
    alert('Você decidiu sair para explorar.');

    sorte(3);

    if (numeroSorte != 2) {

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
                '1 - 🔫 Pistola (' + balas + ' balas)\n' +
                '2 - 🪓 Corpo a corpo (durabilidade: ' + durabilidadeArma + '/10)'
            )!;

            while (armaEscolhida != '1' && armaEscolhida != '2') {
                alert('Responda apenas com 1 ou 2.');
                armaEscolhida = prompt('1 - Pistola\n2 - Corpo a corpo')!;
            }

            // PISTOLA
            if (armaEscolhida == '1' && balas > 0) {

                sorte(5);
                let gasto = numeroSorte + 3;
                if (gasto > balas) gasto = balas;

                balas -= gasto;

                alert('🔫 Você eliminou o zumbi.');
                alert('Balas utilizadas: ' + gasto);
                
                alert('Você procura por recursos...');
                
                sorte(100);
                if (numeroSorte < 50) {
                    comida += 2;
                    alert('🍗 Você encontrou +2 comida.');
                }
                
                sorte(100);
                if (numeroSorte < 50) {
                    agua += 2;
                    alert('💧 Você encontrou +2 água.');
                }
                
                sorte(100);
                if (numeroSorte < 50) {
                    let muni = Math.floor(Math.random() * 4) + 3;
                    balas += muni;
                    alert('🔫 Você encontrou ' + muni + ' balas.');
                }
                
                if (durabilidadeArma <= 0) {
                    sorte(100);
                    if (numeroSorte < 40) {
                        durabilidadeArma = 10;
                        alert('🪓 Você encontrou uma nova arma corpo a corpo (durabilidade 10).');
                    }
                }
                
                sorte(100);
                if (numeroSorte < 45) {
                    remedios += 1;
                    alert('💊 Você encontrou 1 remédio.');
                }
                
                sorte(100);
                if (numeroSorte < 35) {
                    kitMedico += 1;
                    alert('🏥 Você encontrou 1 kit médico.');
                }

            } 
            // CORPO A CORPO
            else {

                if (durabilidadeArma <= 0) {
                    alert('Você está sem arma utilizável.');
                    alert('Você retorna para casa.');
                    return;
                }

                sorte(10);
                
                if (numeroSorte < 6) {
                    alert('🪓 Você matou o zumbi.');
                } else {
                    vida -= 2;
                    if (vida < 0) vida = 0;
                    alert('🪓 Você matou o zumbi, mas sofreu dano. ❤️ -2. Vida: ' + vida + '/10');
                }

                if (durabilidadeArma > 0) {
                    sorte(10);

                    if (numeroSorte < 3) {
                        durabilidadeArma -= 2;
                        alert('Sua arma perdeu 2 de durabilidade. Durabilidade: ' + durabilidadeArma + '/10');
                    } else {
                        durabilidadeArma -= 1;
                        alert('Sua arma perdeu 1 de durabilidade. Durabilidade: ' + durabilidadeArma + '/10');
                    }
                }
                
                // COLETA NORMAL
                alert('Você procura por recursos...');
                
                sorte(100);
                if (numeroSorte < 50) {
                    comida += 2;
                    alert('🍗 Você encontrou +2 comida.');
                }
                
                sorte(100);
                if (numeroSorte < 50) {
                    agua += 2;
                    alert('💧 Você encontrou +2 água.');
                }
                
                sorte(100);
                if (numeroSorte < 50) {
                    let muni = Math.floor(Math.random() * 4) + 3;
                    balas += muni;
                    alert('🔫 Você encontrou ' + muni + ' balas.');
                }
                
                if (durabilidadeArma <= 0) {
                    sorte(100);
                    if (numeroSorte < 40) {
                        durabilidadeArma = 10;
                        alert('🪓 Você encontrou uma nova arma corpo a corpo (durabilidade 10).');
                    }
                }
                
                sorte(100);
                if (numeroSorte < 45) {
                    remedios += 1;
                    alert('💊 Você encontrou 1 remédio.');
                }
                
                sorte(100);
                if (numeroSorte < 35) {
                    kitMedico += 1;
                    alert('🏥 Você encontrou 1 kit médico.');
                }
            }

            alert('Você retornou para casa.');
        }

        if (combate == '2') {
            alert('Você ignorou o zumbi e voltou.');
            
            alert('Você encontra poucos recursos...');
            
            sorte(100);
            if (numeroSorte < 35) {
                comida += 1;
                alert('🍗 Você encontrou +1 comida.');
            }
            
            sorte(100);
            if (numeroSorte < 35) {
                agua += 1;
                alert('💧 Você encontrou +1 água.');
            }
            
            sorte(100);
            if (numeroSorte < 25) {
                let muni = Math.floor(Math.random() * 3) + 1;
                balas += muni;
                alert('🔫 Você encontrou ' + muni + ' balas.');
            }
            
            if (durabilidadeArma <= 0) {
                sorte(100);
                if (numeroSorte < 20) {
                    durabilidadeArma = 10;
                    alert('🪓 Você encontrou uma arma corpo a corpo (durabilidade 10).');
                }
            }
            
            sorte(100);
            if (numeroSorte < 20) {
                remedios += 1;
                alert('💊 Você encontrou 1 remédio.');
            }
        }

    } else {
        alert('A área está vazia. Você não encontra nada.');
        alert('Você retorna para casa.');
    }
}

// ==================== LOOP PRINCIPAL DO JOGO ====================
while (estaVivo()) {

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
        '❤️ Vida: ' + vida + '/10  🍗 Fome: ' + fome + '/5  💧 Sede: ' + sede + '/5\n' +
        '🪓 Arma: ' + durabilidadeArma + '/10';
    
    escolha = prompt(menuOpcoes)!;

    switch (escolha) {
        case '1':
            if (comida > 0) {
                comida--;
                fome = Math.min(fome + 2, 5);
                alert('🍗 Você comeu e recuperou +2 de fome.\n🍗 Fome: ' + fome + '/5');
            } else {
                alert('Sem comida!');
                fome -= 1;
                if (fome < 0) fome = 0;
                alert('🍗 Você perdeu 1 de fome. Fome: ' + fome + '/5');
            }
            break;
            
        case '2':
            if (agua > 0) {
                agua--;
                sede = Math.min(sede + 2, 5);
                alert('💧 Você bebeu água e recuperou +2 de sede.\n💧 Sede: ' + sede + '/5');
            } else {
                alert('Sem água!');
                sede -= 1;
                if (sede < 0) sede = 0;
                alert('💧 Você perdeu 1 de sede. Sede: ' + sede + '/5');
            }
            break;
            
        case '3':
            if (remedios > 0) {
                remedios--;
                alert('💊 Você usou um remédio.');
            } else {
                alert('Você não tem remédios.');
            }
            break;
            
        case '4':
            if (kitMedico > 0) {
                kitMedico--;
                vida = Math.min(vida + 2, 10);
                alert('🏥 Você usou o kit médico e recuperou +2 de vida.\n❤️ Vida: ' + vida + '/10');
            } else {
                alert('Você não tem kit médico.');
            }
            break;
            
        case '5':
            explorarDia1();
            fome -= 1;
            if (fome < 0) fome = 0;
            sede -= 1;
            if (sede < 0) sede = 0;
            alert('🍗 Você perdeu 1 de fome e 💧 1 de sede por explorar.');
            break;
            
        case '6':
            alert('Você decidiu ficar em casa.');
            fome -= 1;
            if (fome < 0) fome = 0;
            sede -= 1;
            if (sede < 0) sede = 0;
            alert('🍗 Você perdeu 1 de fome e 💧 1 de sede.');
            break;
            
        default:
            alert('Opção inválida. Escolha 1 a 6.');
            continue;
    }
    
    if (escolha == '5' || escolha == '6') {
        break;
    }
}

// FINAL DO DIA
if (estaVivo()) {
    alert(
    '══════════════════════════════\n' +
    'FIM DO DIA ' + (dias) + '\n' +
    '══════════════════════════════\n\n' +

    'ESTOQUE ATUAL:\n' +
    '🍗 Comida: ' + comida + '\n' +
    '💧 Água: ' + agua + '\n' +
    '🔫 Balas: ' + balas + '\n' +
    '🪓 Arma C.C.: ' + durabilidadeArma + '/10\n' +
    '💊 Remédios: ' + remedios + '\n' +
    '🏥 Kit médico: ' + kitMedico + '\n\n' +

    '❤️ Vida: ' + vida + '/10\n' +
    '🍗 Fome: ' + fome + '/5\n' +
    '💧 Sede: ' + sede + '/5'
    );

    alert('💤 Você foi dormir...');
    dias += 1;
}