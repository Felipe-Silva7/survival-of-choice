// ==================== DIA 3 ====================

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
let ferimento: boolean = false;

vida = 10;
fome = 5;
sede = 5;

comida = 3;
agua = 3;

balas = 6;
durabilidadeArma = 10; 

remedios = 0;
kitMedico = 0;

dias = 3;

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

function aplicarFerimento() {
    if (ferimento) {
        let dano = Math.floor(Math.random() * 2) + 1; // 1-2 de dano
        vida -= dano;
        if (vida < 0) vida = 0;
        alert('🩸 Seu ferimento está sangrando! Você perdeu ' + dano + ' de vida. Vida: ' + vida + '/10');
    }
}

let eventoGlobal: string = '';
let temEvento: boolean = false;

sorte(100);
if (numeroSorte < 40) {
    temEvento = true;
    
    sorte(3);
    
    if (numeroSorte == 1) {
        eventoGlobal = 'chuva';
        alert('EVENTO GLOBAL: CHUVA FORTE\n\nVocê conseguiu coletar um pouco de água.');
        let aguaColetada = Math.floor(Math.random() * 2) + 2;
        agua += aguaColetada;
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

'"O caos se espalha pela cidade..."\n\n' +

'- Governo declara estado de emergência.\n' +
'- Relatos de ataques aumentam 300%.\n' +
'- Hospitais lotados, medicamentos escassos.\n' +
'- Toque de recolher imposto após às 18h.\n' +
'- Sobreviventes relatam escassez de alimentos.\n\n' +

'Autoridades pedem que todos permaneçam em casa.\n' +
'"Se vir algo, corra. Não confie em ninguém."\n\n' +
'══════════════════════════════'
);

// APRESENTAÇÃO DO DIA
alert(
'══════════════════════════════\n' +
'DIA ' + dias + '\n' +
'══════════════════════════════\n\n' +

'08:00 AM\n\n' +

'❤️ Vida: ' + vida + '/10\n' +
'🍗 Fome: ' + fome + '/5\n' +
'💧 Sede: ' + sede + '/5\n' +

(resfriado ? '\n🤒 VOCÊ ESTÁ RESFRIADO 🤒\n' : '') +
(ferimento ? '\n🩸 VOCÊ ESTÁ FERIDO 🩸\n' : '') +

'\nESTOQUE:\n' +
'🍗 Comida: ' + comida + '\n' +
'💧 Água: ' + agua + '\n' +
'🔫 Balas: ' + balas + '\n' +
'🪓 Arma C.C.: ' + durabilidadeArma + '/10\n' +
'💊 Remédios: ' + remedios + '\n' +
'🏥 Kit médico: ' + kitMedico + '\n\n' +

'Terceiro dia de sobrevivência.\n' +
'Os recursos estão ficando escassos...\n\n' +

'O que devo fazer?'
);

function explorarDia3() {
    let jaSaiu = false;
    
    if (temEvento) {
        switch (eventoGlobal) {
            case 'chuva':
                alert('Você sai na chuva para explorar...');
                jaSaiu = true;
                
                sorte(100);
                if (numeroSorte < 30) {
                    if (!resfriado) {
                        resfriado = true;
                        alert('Você pegou um resfriado! Use remédios para curar.');
                    } else {
                        alert('Seu resfriado piorou!');
                    }
                }
                break;
                
            case 'calor':
                alert('Você sai sob o sol escaldante para explorar...');
                jaSaiu = true;
                sede -= 2;
                if (sede < 0) sede = 0;
                alert('💧 O calor fez você perder +2 de sede. Sede: ' + sede + '/5');
                break;
                
            case 'zumbis':
                alert('Os zumbis bloqueiam a passagem! Você não consegue sair.');
                return;
        }
    }
    
    if (!jaSaiu) {
        alert('Você decidiu sair para explorar.');
    }

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
                if (numeroSorte < 45) { // AUMENTADO DE 32 PARA 45
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
                
                let chanceDano = 6;
                if (resfriado) {
                    chanceDano = 8;
                    alert('[RESFRIADO] Você está fraco e mais vulnerável!');
                }

                if (numeroSorte < chanceDano) {
                    alert('🪓 Você matou o zumbi.');
                } else {
                    vida -= 2;
                    if (vida < 0) vida = 0;
                    alert('🪓 Você matou o zumbi, mas sofreu dano. ❤️ -2. Vida: ' + vida + '/10');
                    
                    // PODE CAUSAR FERIMENTO
                    sorte(100);
                    if (numeroSorte < 30 && !ferimento) {
                        ferimento = true;
                        alert('🩸 Você ficou ferido! Sangramento vai causar dano diário.');
                    }
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
                if (numeroSorte < 45) {
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

    if (dias == 3) {
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
        '❤️ Vida: ' + vida + '/10  🍗 Fome: ' + fome + '/5  💧 Sede: ' + sede + '/5\n' +
        '🪓 Arma: ' + durabilidadeArma + '/10';
    
    if (resfriado) {
        menuOpcoes += '\n\n🤒 VOCÊ ESTÁ RESFRIADO 🤒';
    }
    if (ferimento) {
        menuOpcoes += '\n\n🩸 VOCÊ ESTÁ FERIDO 🩸';
    }
    
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
                if (resfriado) {
                    resfriado = false;
                    alert('💊 Você usou um remédio e curou o resfriado!');
                } else {
                    alert('💊 Você usou um remédio, mas não estava doente.');
                }
            } else {
                alert('Você não tem remédios.');
            }
            break;
            
        case '4':
            if (kitMedico > 0) {
                kitMedico--;
                if (ferimento) {
                    ferimento = false;
                    alert('🏥 Você usou o kit médico e curou o ferimento!');
                }
                if (resfriado) {
                    resfriado = false;
                    alert('🏥 Você usou o kit médico e curou o resfriado!');
                }
                vida = Math.min(vida + 2, 10);
                alert('🏥 Você usou o kit médico e recuperou +2 de vida.\n❤️ Vida: ' + vida + '/10');
            } else {
                alert('Você não tem kit médico.');
            }
            break;
            
        case '5':
            explorarDia3();
            if (eventoGlobal != 'zumbis' || !temEvento) {
                fome -= 1;
                if (fome < 0) fome = 0;
                sede -= 1;
                if (sede < 0) sede = 0;
                alert('🍗 Você perdeu 1 de fome e 💧 1 de sede por explorar.');
                break;
            }
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
    
    if (escolha == '5' && (eventoGlobal != 'zumbis' || !temEvento)) {
        break;
    }
    if (escolha == '6') {
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
    '💧 Sede: ' + sede + '/5\n' +
    (resfriado ? '🤒 Resfriado: SIM\n' : 'Resfriado: NÃO\n') +
    (ferimento ? '🩸 Ferimento: SIM\n' : 'Ferimento: NÃO\n')
    );

    alert('💤 Você foi dormir...');
    dias += 1;
}