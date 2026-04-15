import { inventario } from "../inventario.js";
import { chance } from "../aleatoriedade.js";
import { estaVivo } from "../principaisFuncoes.js";
import { dia6 } from "./dia6.js";
export function dia5() {
    let dia = 5;
    inventario.dia = dia;
    let escolha;
    let combate;
    let armaEscolhida;
    // APRESENTAÇÃO DO DIA
    alert('══════════════════════════════\n' +
        'DIA 5 - O SUPERMERCADO\n' +
        '══════════════════════════════\n\n' +
        '08:00 AM\n\n' +
        'Vida: ' + inventario.vida + '/10\n' +
        'Fome: ' + inventario.fome + '/5\n' +
        'Sede: ' + inventario.sede + '/5\n\n' +
        'Seus suprimentos estão ficando críticos.\n' +
        'Há um supermercado a alguns quarteirões.\n' +
        'É um lugar de alto risco, mas a recompensa pode ser enorme.\n\n' +
        'O que devo fazer?');
    function explorarDia5() {
        alert('Você respira fundo e entra no supermercado escuro.');
        if (chance(0.85)) { // Alta chance de encontro
            alert('O lugar está infestado! Três zumbis bloqueiam os corredores.');
            combate = prompt('É matar ou morrer.\n\n' +
                '1 - Atacar com tudo\n' +
                '2 - Recuar e procurar nos fundos');
            while (combate != '1' && combate != '2') {
                alert('Responda apenas com 1 ou 2.');
                combate = prompt('1 - Atacar\n2 - Recuar');
            }
            if (combate == '1') {
                armaEscolhida = prompt('Escolha sua arma:\n\n' +
                    '1 - Pistola (' + inventario.balas + ' balas)\n' +
                    '2 - Faca (durabilidade: ' + inventario.durabilidadeArma + '/10)');
                while (armaEscolhida != '1' && armaEscolhida != '2') {
                    alert('Responda apenas com 1 ou 2.');
                    armaEscolhida = prompt('1 - Pistola\n2 - Faca');
                }
                if (armaEscolhida == '1' && inventario.balas >= 2) {
                    inventario.balas -= 2;
                    alert('Você descarrega sua arma! (-2 balas)');
                    alert('Os zumbis caem. Você limpa a área.');
                    inventario.comida += 4;
                    inventario.agua += 4;
                    alert('GRANDE SAQUE: Você encontrou +4 comida e +4 água!');
                }
                else if (armaEscolhida == '1' && inventario.balas < 2) {
                    alert('Você tenta atirar, mas não tem balas suficientes para todos!');
                    inventario.vida -= 5;
                    inventario.balas = 0;
                    alert('Eles te cercam! Você gasta o resto das balas e sofre muito dano. (-5 vida)');
                    if (estaVivo()) {
                        inventario.comida += 2;
                        alert('Mesmo ferido, conseguiu roubar 2 comidas e fugiu.');
                    }
                }
                else {
                    if (inventario.durabilidadeArma <= 0) {
                        alert('Enfrentar três zumbis sem arma? Suicídio.');
                        inventario.vida -= 6;
                        alert('Você foi brutalmente atacado! (-6 vida)');
                    }
                    else {
                        inventario.vida -= 4;
                        inventario.durabilidadeArma -= 3;
                        alert('Luta sangrenta com a faca! (-4 vida, -3 durabilidade da arma)');
                        if (estaVivo()) {
                            inventario.comida += 3;
                            inventario.agua += 2;
                            alert('Você sobreviveu por pouco. Pegou +3 comida e +2 água.');
                        }
                    }
                }
            }
            else {
                alert('Você recua para os fundos do supermercado e evita a horda principal.');
                if (chance(0.50)) {
                    alert('Os fundos estão vazios, mas já foram muito saqueados.');
                    inventario.comida += 1;
                    inventario.agua += 1;
                    alert('Você achou apenas +1 comida e +1 água.');
                }
                else {
                    alert('Um zumbi estava escondido nos fundos e te atacou de surpresa!');
                    inventario.vida -= 2;
                    alert('Você o empurrou e fugiu, mas sofreu -2 vida.');
                }
            }
        }
        else {
            alert('Milagrosamente, a parte da frente está limpa.');
            inventario.comida += 2;
            inventario.agua += 2;
            inventario.kitMedico += 1;
            alert('Você saqueou os caixas e achou +2 comida, +2 água e 1 kit médico!');
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
            '5 - Explorar o Supermercado\n' +
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
                explorarDia5();
                inventario.fome -= 1;
                if (inventario.fome < 0)
                    inventario.fome = 0;
                inventario.sede -= 1;
                if (inventario.sede < 0)
                    inventario.sede = 0;
                alert('Você perdeu 1 de fome e 1 de sede por explorar.');
                break;
            case '6':
                alert('Você decidiu ficar seguro em casa.');
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
        dia6();
    }
}
