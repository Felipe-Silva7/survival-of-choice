import { inventario } from "../inventario.js";
import { chance } from "../aleatoriedade.js";
import { estaVivo } from "../principaisFuncoes.js";
import { dia4 } from "./dia4.js";
export function dia3() {
    let dia = 3;
    inventario.dia = dia;
    let escolha;
    let combate;
    let armaEscolhida;
    // APRESENTAÇÃO DO DIA
    alert('══════════════════════════════\n' +
        'DIA 3 - UMA NOVA ESPERANÇA?\n' +
        '══════════════════════════════\n\n' +
        '07:00 AM\n\n' +
        'Vida: ' + inventario.vida + '/10\n' +
        'Fome: ' + inventario.fome + '/5\n' +
        'Sede: ' + inventario.sede + '/5\n\n' +
        'Você acorda e ouve barulhos lá fora.\n' +
        'Não são zumbis... parecem passos humanos.\n\n' +
        'O que devo fazer?');
    function explorarDia3() {
        alert('Você decidiu sair para explorar.');
        if (chance(0.60)) {
            alert('Você encontra um sobrevivente ferido pedindo ajuda no beco.');
            let ajuda = prompt('Ele implora por suprimentos.\n\n' +
                '1 - Ajudar (-1 comida, -1 água)\n' +
                '2 - Ignorar e procurar recursos sozinho');
            while (ajuda != '1' && ajuda != '2') {
                alert('Responda apenas com 1 ou 2.');
                ajuda = prompt('1 - Ajudar\n2 - Ignorar');
            }
            if (ajuda == '1') {
                if (inventario.comida >= 1 && inventario.agua >= 1) {
                    inventario.comida -= 1;
                    inventario.agua -= 1;
                    alert('Você entregou comida e água para o sobrevivente.');
                    alert('Ele agradece e, em troca, te entrega itens valiosos!');
                    inventario.balas += 4;
                    inventario.kitMedico += 1;
                    alert('Você recebeu +4 balas e +1 kit médico.');
                }
                else {
                    alert('Você tenta ajudar, mas percebe que não tem comida e água suficientes.');
                    alert('O sobrevivente te olha com decepção e vai embora mancando.');
                }
            }
            else {
                alert('Você ignorou o sobrevivente e continuou sua busca.');
                alert('Você vasculha algumas lixeiras...');
                if (chance(0.50)) {
                    inventario.comida += 1;
                    alert('Você encontrou +1 comida.');
                }
                if (chance(0.50)) {
                    inventario.agua += 1;
                    alert('Você encontrou +1 água.');
                }
                if (chance(0.30)) {
                    inventario.balas += 2;
                    alert('Você encontrou 2 balas.');
                }
            }
        }
        else {
            alert('Você explora as ruas, mas só encontra um zumbi solitário.');
            combate = prompt('O zumbi te percebe e avança!\n\n' +
                '1 - Enfrentar\n' +
                '2 - Fugir');
            while (combate != '1' && combate != '2') {
                alert('Responda apenas com 1 ou 2.');
                combate = prompt('1 - Enfrentar\n2 - Fugir');
            }
            if (combate == '1') {
                armaEscolhida = prompt('Escolha sua arma:\n\n' +
                    '1 - Pistola (' + inventario.balas + ' balas)\n' +
                    '2 - Faca (durabilidade: ' + inventario.durabilidadeArma + '/10)');
                while (armaEscolhida != '1' && armaEscolhida != '2') {
                    alert('Responda apenas com 1 ou 2.');
                    armaEscolhida = prompt('1 - Pistola\n2 - Faca');
                }
                if (armaEscolhida == '1' && inventario.balas > 0) {
                    inventario.balas -= 1;
                    alert('Você atirou e eliminou o zumbi facilmente. (-1 bala)');
                    if (chance(0.60)) {
                        inventario.agua += 2;
                        alert('Você encontrou +2 água no corpo dele.');
                    }
                }
                else {
                    if (inventario.durabilidadeArma <= 0) {
                        alert('Você está sem arma utilizável.');
                        inventario.vida -= 3;
                        alert('Você precisou fugir no tapa e sofreu arranhões! (-3 vida)');
                    }
                    else {
                        if (chance(0.70)) {
                            alert('Você matou o zumbi com a faca.');
                        }
                        else {
                            inventario.vida -= 2;
                            alert('O zumbi te machucou antes de cair! -2 vida.');
                        }
                        inventario.durabilidadeArma -= 1;
                        if (chance(0.50)) {
                            inventario.comida += 1;
                            alert('Você encontrou +1 comida com ele.');
                        }
                    }
                }
            }
            else {
                alert('Você fugiu desesperadamente, mas gastou muita energia.');
                inventario.fome -= 1;
                inventario.sede -= 1;
                alert('Você perdeu 1 de fome e 1 de sede extras na fuga.');
            }
        }
        alert('Você retornou para casa.');
    }
    // ==================== LOOP PRINCIPAL DO JOGO ====================
    while (estaVivo()) {
        let menuOpcoes = '══════════════════════════════\n' +
            'ESCOLHA UMA AÇÃO:\n' +
            '══════════════════════════════\n\n' +
            '1 - Comer comida (Fome +2)\n' +
            '2 - Beber água (Sede +2)\n' +
            '3 - Usar remédio\n' +
            '4 - Usar kit médico\n' +
            '5 - Explorar\n' +
            '6 - Ficar em casa\n\n' +
            'Vida: ' + inventario.vida + '/10  \nFome: ' + inventario.fome + '/5 \nSede: ' + inventario.sede + '/5\n' +
            'Arma: ' + inventario.durabilidadeArma + '/10';
        escolha = prompt(menuOpcoes);
        switch (escolha) {
            case '1':
                if (inventario.comida > 0) {
                    inventario.comida--;
                    inventario.fome = Math.min(inventario.fome + 2, 5);
                    alert('Você comeu e recuperou +2 de fome.\nFome: ' + inventario.fome + '/5');
                }
                else {
                    alert('Sem comida!');
                    inventario.fome -= 1;
                    if (inventario.fome < 0)
                        inventario.fome = 0;
                    alert('Você perdeu 1 de fome. Fome: ' + inventario.fome + '/5');
                }
                break;
            case '2':
                if (inventario.agua > 0) {
                    inventario.agua--;
                    inventario.sede = Math.min(inventario.sede + 2, 5);
                    alert('Você bebeu água e recuperou +2 de sede.\nSede: ' + inventario.sede + '/5');
                }
                else {
                    alert('Sem água!');
                    inventario.sede -= 1;
                    if (inventario.sede < 0)
                        inventario.sede = 0;
                    alert('Você perdeu 1 de sede. Sede: ' + inventario.sede + '/5');
                }
                break;
            case '3':
                if (inventario.remedios > 0) {
                    inventario.remedios--;
                    alert('Você usou um remédio.');
                }
                else {
                    alert('Você não tem remédios.');
                }
                break;
            case '4':
                if (inventario.kitMedico > 0) {
                    inventario.kitMedico--;
                    inventario.vida = Math.min(inventario.vida + 2, 10);
                    alert('Você usou o kit médico e recuperou +2 de vida.\nVida: ' + inventario.vida + '/10');
                }
                else {
                    alert('Você não tem kit médico.');
                }
                break;
            case '5':
                explorarDia3();
                inventario.fome -= 1;
                if (inventario.fome < 0)
                    inventario.fome = 0;
                inventario.sede -= 1;
                if (inventario.sede < 0)
                    inventario.sede = 0;
                alert('Você perdeu 1 de fome e 1 de sede por explorar.');
                break;
            case '6':
                alert('Você decidiu ficar em casa.');
                inventario.fome -= 1;
                if (inventario.fome < 0)
                    inventario.fome = 0;
                inventario.sede -= 1;
                if (inventario.sede < 0)
                    inventario.sede = 0;
                alert('Você perdeu 1 de fome e 1 de sede.');
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
    estaVivo();
    let sucesso = true;
    if (sucesso) {
        dia4();
    }
}
