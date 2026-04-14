import { chance } from "../aleatoriedade";
import { dia2 } from './dia2'
import { inventario } from "../inventario";
export function dia1() {


    let dia: number = inventario.dia;

    let escolha: string;
    let combate: string;
    let armaEscolhida: string;


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
        'DIA ' + dia + ' - O INÍCIO\n' +
        '══════════════════════════════\n\n' +

        '08:00 AM\n\n' +

        '❤️ Vida: ' + inventario.vida + '/10\n' +
        '🍗 Fome: ' + inventario.fome + '/5\n' +
        '💧 Sede: ' + inventario.sede + '/5\n\n' +

        'ESTOQUE:\n' +
        '🍗 Comida: ' + inventario.comida + '\n' +
        '💧 Água: ' + inventario.agua + '\n' +
        '🔫 Balas: ' + inventario.balas + '\n' +
        '🪓 Arma C.C.: ' + inventario.durabilidadeArma + '/10\n' +
        '💊 Remédios: ' + inventario.remedios + '\n' +
        '🏥 Kit médico: ' + inventario.kitMedico + '\n\n' +

        'Primeiro dia de sobrevivência.\n' +
        'O apocalipse começou. Você precisa aprender a sobreviver.\n' +
        'Use seus recursos com sabedoria.\n\n' +

        'O que devo fazer?'
    );

    function explorarDia1() {
        alert('Você decidiu sair para explorar.');

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

                // PISTOLA
                if (armaEscolhida == '1' && inventario.balas > 0) {

                    inventario.balas -= 1;

                    alert('🔫 Você eliminou o zumbi.');
                    alert('Balas utilizadas: 1');

                    alert('Você procura por recursos...');


                    if (chance(0.5)) {
                        inventario.comida += 2;
                        alert('🍗 Você encontrou +2 comida.');
                    }

                    if (chance(0.5)) {
                        inventario.agua += 2;
                        alert('💧 Você encontrou +2 água.');
                    }

                    if (chance(0.5)) {
                        let muni = Math.floor(Math.random() * 4) + 3;
                        inventario.balas += muni;
                        alert('🔫 Você encontrou ' + muni + ' balas.');
                    }

                    if (inventario.durabilidadeArma <= 0) {
                        if (chance(0.4)) {
                            inventario.durabilidadeArma = 10;
                            alert('🪓 Você encontrou uma nova arma corpo a corpo (durabilidade 10).');
                        }
                    }

                    if (chance(0.45)) {
                        inventario.remedios += 1;
                        alert('💊 Você encontrou 1 remédio.');
                    }

                    if (chance(0.35)) {
                        inventario.kitMedico += 1;
                        alert('🏥 Você encontrou 1 kit médico.');
                    }

                }
                // CORPO A CORPO
                else {

                    if (inventario.durabilidadeArma <= 0) {
                        alert('Você está sem arma utilizável.');
                        alert('Você retorna para casa.');
                        return;
                    }



                    if (chance(0.6)) {
                        alert('🪓 Você matou o zumbi.');
                    } else {
                        inventario.vida -= 2;
                        if (inventario.vida < 0) inventario.vida = 0;
                        alert('🪓 Você matou o zumbi, mas sofreu dano. ❤️ -2. Vida: ' + inventario.vida + '/10');
                    }

                    if (inventario.durabilidadeArma > 0) {
                        if (chance(0.3)) {
                            inventario.durabilidadeArma -= 2;
                            alert('Sua arma perdeu 2 de durabilidade. Durabilidade: ' + inventario.durabilidadeArma + '/10');
                        } else {
                            inventario.durabilidadeArma -= 1;
                            alert('Sua arma perdeu 1 de durabilidade. Durabilidade: ' + inventario.durabilidadeArma + '/10');
                        }
                    }

                    // COLETA NORMAL
                    alert('Você procura por recursos...');

                    if (chance(0.5)) {
                        inventario.comida += 2;
                        alert('🍗 Você encontrou +2 comida.');
                    }

                    if (chance(0.5)) {
                        inventario.agua += 2;
                        alert('💧 Você encontrou +2 água.');
                    }

                    if (chance(0.5)) {
                        inventario.balas += 3;
                        alert('🔫 Você encontrou 3 balas.');
                    }

                    if (inventario.durabilidadeArma <= 0) {
                        if (chance(0.4)) {
                            inventario.durabilidadeArma = 10;
                            alert('🪓 Você encontrou uma nova arma corpo a corpo (durabilidade 10).');
                        }
                    }

                    if (chance(0.45)) {
                        inventario.remedios += 1;
                        alert('💊 Você encontrou 1 remédio.');
                    }

                    if (chance(0.35)) {
                        inventario.kitMedico += 1;
                        alert('🏥 Você encontrou 1 kit médico.');
                    }
                }

                alert('Você retornou para casa.');
            }

            if (combate == '2') {
                alert('Você ignorou o zumbi e voltou.');

                alert('Você encontra poucos recursos...');

                if (chance(0.35)) {
                    inventario.comida += 1;
                    alert('🍗 Você encontrou +1 comida.');
                }

                if (chance(0.35)) {
                    inventario.agua += 1;
                    alert('💧 Você encontrou +1 água.');
                }

                if (chance(0.25)) {
                    inventario.balas += 3;
                    alert('🔫 Você encontrou 3 balas.');
                }

                if (inventario.durabilidadeArma <= 0) {
                    if (chance(0.2)) {
                        inventario.durabilidadeArma = 10;
                        alert('🪓 Você encontrou uma arma corpo a corpo (durabilidade 10).');
                    }
                }

                if (chance(0.2)) {
                    inventario.remedios += 1;
                    alert('💊 Você encontrou 1 remédio.');
                }
            }

        } else {
            alert('A área está vazia. Você não encontra nada.');
            alert('Você retorna para casa.');
        }
    }

    // ==================== LOOP PRINCIPAL DO JOGO ====================
    while (true) {

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
                    alert('💊 Você usou um remédio.');
                } else {
                    alert('Você não tem remédios.');
                }
                break;

            case '4':
                if (inventario.kitMedico > 0) {
                    inventario.kitMedico--;
                    inventario.vida = Math.min(inventario.vida + 2, 10);
                    alert('🏥 Você usou o kit médico e recuperou +2 de vida.\n❤️ Vida: ' + inventario.vida + '/10');
                } else {
                    alert('Você não tem kit médico.');
                }
                break;

            case '5':
                explorarDia1();
                inventario.fome -= 1;
                if (inventario.fome < 0) inventario.fome = 0;
                inventario.sede -= 1;
                if (inventario.sede < 0) inventario.sede = 0;
                alert('🍗 Você perdeu 1 de fome e 💧 1 de sede por explorar.');
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

        if (escolha == '5' || escolha == '6') {
            break;
        }
    }

    // FINAL DO DIA
    alert(
        '══════════════════════════════\n' +
        'FIM DO DIA ' + (dia) + '\n' +
        '══════════════════════════════\n\n' +

        'ESTOQUE ATUAL:\n' +
        '🍗 Comida: ' + inventario.comida + '\n' +
        '💧 Água: ' + inventario.agua + '\n' +
        '🔫 Balas: ' + inventario.balas + '\n' +
        '🪓 Arma C.C.: ' + inventario.durabilidadeArma + '/10\n' +
        '💊 Remédios: ' + inventario.remedios + '\n' +
        '🏥 Kit médico: ' + inventario.kitMedico + '\n\n' +

        '❤️ Vida: ' + inventario.vida + '/10\n' +
        '🍗 Fome: ' + inventario.fome + '/5\n' +
        '💧 Sede: ' + inventario.sede + '/5'
    );

    alert('💤 Você foi dormir...');
    let sucesso: boolean = true
    if (sucesso) {
        
        dia2()
    }
}