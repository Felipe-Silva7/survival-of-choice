import { inventario } from "../inventario.js";
import { chance } from "../aleatoriedade.js";
import { estaVivo } from "../principaisFuncoes.js";
import { dia3 } from "./dia3.js";
export function dia2() {
    let dia = inventario.dia + 1;
    let escolha;
    let combate;
    let armaEscolhida;
    // APRESENTAÇÃO DO DIA
    alert('══════════════════════════════\n' +
        '            RÁDIO\n' +
        '══════════════════════════════\n\n' +
        '*sshh... Ssh... Alguém ouvindo?"\n\n' +
        '- As pessoas estão abandonando as zonas urbanas.\n' +
        '*Sssshh*' +
        '- Pessoas estão se escondendo em abrigos.\n' +
        '- Cientistas estão trabalhando para encontrar uma solução.\n' +
        '*SSh*' +
        '- A energia deve cair em breve.\n' +
        '- Mantenha-se em segurança.\n\n' +
        '*Sshh*' +
        '══════════════════════════════');
    // APRESENTAÇÃO DO DIA
    alert('══════════════════════════════\n' +
        'DIA 2 - O SILÊNCIO\n' +
        '══════════════════════════════\n\n' +
        '07:30 AM\n\n' +
        'Vida: ' + inventario.vida + '/10\n' +
        'Fome: ' + inventario.fome + '/5\n' +
        'Sede: ' + inventario.sede + '/5\n\n' +
        'O silêncio lá fora é assustador.\n' +
        'Você precisa de suprimentos para não morrer de fome.\n\n' +
        'O que devo fazer?');
    function explorarDia2() {
        alert('Você decidiu sair para explorar.');
        if (chance(65)) {
            alert('Você caminha um pouco e encontra um zumbi vagando pela rua.');
            combate = prompt('O que você deseja fazer?\n\n' +
                '1 - Enfrentar\n' +
                '2 - Retornar');
            while (combate != '1' && combate != '2') {
                alert('Responda apenas com 1 ou 2.');
                combate = prompt('1 - Enfrentar\n2 - Retornar');
            }
            if (combate == '1') {
                armaEscolhida = prompt('Escolha sua arma:\n\n' +
                    '1 - Pistola (' + inventario.balas + ' balas)\n' +
                    '2 - Faca (durabilidade: ' + inventario.durabilidadeArma + '/10)');
                while (armaEscolhida != '1' && armaEscolhida != '2') {
                    alert('Responda apenas com 1 ou 2.');
                    armaEscolhida = prompt('1 - Pistola\n2 - Faca');
                }
                // PISTOLA
                if (armaEscolhida == '1' && inventario.balas > 0) {
                    inventario.balas -= 1;
                    alert('O tiro atinge a cabeça do zumbi.');
                    alert('Você eliminou o zumbi.');
                    alert('Você percebe uma bolsa com o zumbi e procura por recursos...');
                    if (chance(0.40)) {
                        inventario.comida += 1;
                        alert('Você achou 1 lata de comida.');
                    }
                    if (chance(0.40)) {
                        inventario.agua += 2;
                        alert('Você encontrou 2 garrafas de água.');
                    }
                    if (chance(0.20)) {
                        inventario.balas += 2;
                        alert('Você encontrou 2 munições.');
                    }
                    if (inventario.durabilidadeArma <= 0) {
                        if (chance(0.40)) {
                            inventario.durabilidadeArma = 10;
                            alert('Você encontrou uma nova faca');
                        }
                    }
                }
                // CORPO A CORPO
                else {
                    if (inventario.durabilidadeArma <= 0) {
                        alert('Você está sem arma utilizável.');
                        alert('Você retorna para casa.');
                        return;
                    }
                    if (chance(0.65)) {
                        alert('Você matou o zumbi com a faca');
                    }
                    else {
                        inventario.vida -= 2;
                        alert('O zumbi te arranhou antes de cair! -2 vida.');
                    }
                    inventario.durabilidadeArma -= 1;
                    alert('Você eliminou o zumbi.');
                    alert('Você percebe uma bolsa com o zumbi e procura por recursos...');
                    if (chance(0.40)) {
                        inventario.comida += 1;
                        alert('Você achou 1 lata de comida.');
                    }
                    if (chance(0.40)) {
                        inventario.agua += 2;
                        alert('Você encontrou 2 garrafas de água.');
                    }
                    if (chance(0.20)) {
                        inventario.balas += 2;
                        alert('Você encontrou 2 munições.');
                    }
                    if (inventario.durabilidadeArma <= 0) {
                        if (chance(0.40)) {
                            inventario.durabilidadeArma = 10;
                            alert('Você encontrou uma nova faca');
                        }
                    }
                }
                alert('Você retornou para casa.');
            }
            if (combate == '2') {
                alert('Você ficou com medo e decidiu retornar para casa.');
                alert('Próximo de casa você vê um carro aberto e decide vasculhar');
                if (chance(0.40)) {
                    inventario.comida += 1;
                    alert('Você achou 1 lata de comida.');
                }
                if (chance(0.40)) {
                    inventario.agua += 2;
                    alert('Você encontrou 2 garrafas de água.');
                }
                if (chance(0.10)) {
                    inventario.balas += 2;
                    alert('Você encontrou 2 munições.');
                }
            }
        }
        else {
            alert('A área está vazia. Você não encontra nada.');
            alert('Você retorna para casa.');
        }
    }
    // ----------------- LOOP PRINCIPAL DO JOGO -------------------
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
            'Vida: ' + inventario.vida + '/10' +
            'Fome: ' + inventario.fome + '/5' +
            'Sede: ' + inventario.sede + '/5\n' +
            'Arma: ' + inventario.durabilidadeArma + '/10';
        escolha = prompt(menuOpcoes);
        switch (escolha) {
            case '1':
                if (inventario.comida > 0) {
                    inventario.comida--;
                    inventario.fome += 1;
                    alert('Você comeu 1 lata de comida e recuperou 1 de fome.\nFome: ' + inventario.fome + '/5');
                }
                else {
                    alert('Sem comida!');
                    if (inventario.fome <= 0)
                        inventario.fome = 0;
                    alert('Fome: ' + inventario.fome + '/5');
                }
                break;
            case '2':
                if (inventario.agua > 0) {
                    inventario.agua--;
                    inventario.sede += 1;
                    alert('Você bebeu água e recuperou 1 de sede.\n Sede: ' + inventario.sede + '/5');
                }
                else {
                    alert('Sem água!');
                    if (inventario.sede < 0)
                        inventario.sede = 0;
                    alert('Sede: ' + inventario.sede + '/5');
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
                    inventario.vida += 2;
                    alert('Você usou o kit médico e recuperou +2 de vida.\nVida: ' + inventario.vida + '/10');
                }
                else {
                    alert('Você não tem kit médico.');
                }
                break;
            case '5':
                explorarDia2();
                inventario.fome -= 1;
                if (inventario.fome <= 0)
                    inventario.fome = 0;
                inventario.sede -= 1;
                if (inventario.sede <= 0)
                    inventario.sede = 0;
                alert('Você perdeu 1 de fome e 1 de sede por explorar.');
                break;
            case '6':
                alert('Você decidiu ficar em casa.');
                inventario.fome -= 1;
                if (inventario.fome <= 0)
                    inventario.fome = 0;
                inventario.sede -= 1;
                if (inventario.sede <= 0)
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
        dia3();
    }
}
