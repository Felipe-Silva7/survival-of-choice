import { inventario } from "../inventario.js";
import { chance } from "../aleatoriedade.js";
import { estaVivo } from "../principaisFuncoes.js";
import { dia8 } from "./dia8.js";
export function dia7() {
    inventario.fome -= 1;
    if (inventario.fome < 0)
        inventario.fome = 0;
    inventario.sede -= 1;
    if (inventario.sede < 0)
        inventario.sede = 0;
    alert('Você acordou (-1 de fome e -1 de sede)');
    let dia = inventario.dia += 1;
    let escolha;
    let combate;
    // APRESENTAÇÃO DO DIA
    alert('══════════════════════════════\n' +
        'DIA 7 - OS BANDIDOS\n' +
        '══════════════════════════════\n\n' +
        '16:00 PM\n\n' +
        'Vida: ' + inventario.vida + '/10\n' +
        'Fome: ' + inventario.fome + '/5\n' +
        'Sede: ' + inventario.sede + '/5\n\n' +
        'Passou a manhã chovendo então você não saiu cedo.\n' +
        'E por causa da chuva já está começando a escurecer.\n\n' +
        'O que devo fazer?');
    function explorarDia7() {
        alert('Você aproveita os resquícios de luz para sair e explorar a cidade.');
        alert('É preciso ir para lugares mais longes, já foi explorado tudo perto de casa.');
        alert('17:00 PM');
        alert('O céu escurece rapidamente e uma queda de energia acontece!');
        if (chance(0.80)) {
            alert('Você estava voltando para casa quando é cercado por dois bandidos!');
            combate = prompt('"Passa tudo que você tem ou morre!".\n\n' +
                '1 - Reagir e atirar \n' +
                '2 - Tentar lutar com a faca\n' +
                '3 - Entregar suprimentos e fugir');
            while (combate != '1' && combate != '2' && combate != '3') {
                alert('Responda apenas com 1, 2 ou 3.');
                combate = prompt('1 - Atirar\n2 - Faca\n3 - Entregar suprimentos');
            }
            if (combate == '1') {
                if (inventario.balas >= 2) {
                    alert('Você saca a arma rapidamente e dispara!');
                    alert('Você atinge um dos bandidos. Mas o outro te acerta no ombro.');
                    alert('Você reage e atira mais uma vez, acertando o segundo bandido. Menos dois vagabundos no mundo!');
                    inventario.balas -= 2;
                    inventario.vida -= 3;
                    inventario.comida += 3;
                    inventario.agua += 2;
                    inventario.balas += 5;
                    estaVivo();
                    alert('(vida -3, Balas -2). Você pega os pertences deles: +3 comida, +2 água, +5 balas.');
                }
                else {
                    alert('Você tenta sacar a arma, mas não tem balas suficientes!');
                    alert('Eles atiram em você! Pegam seus suprimentos e vão embora.');
                    inventario.comida -= 2;
                    inventario.agua -= 2;
                    inventario.vida -= 5;
                    alert('Vida -5, Comida -2, Água -2');
                    estaVivo();
                }
            }
            else if (combate == '2') {
                if (inventario.durabilidadeArma <= 0) {
                    alert('Você não tem faca! Você levanta os punhos.');
                    inventario.vida -= 6;
                    alert('Mas eles tem, eles brincam com você antes de levar suas coisas.');
                    inventario.comida -= 2;
                    inventario.agua -= 2;
                    alert('Vida -6, Comida -2, Água -2');
                    estaVivo();
                }
                else {
                    inventario.vida -= 4;
                    inventario.durabilidadeArma -= 3;
                    alert('Você avança com a faca! Acerta um, mas o outro tava armado e te acerta no ombro.');
                    alert('Você não recuou e o acertou também com a faca.');
                    alert('Vida -4, Durabilidade da arma -3');
                    estaVivo();
                }
            }
            else {
                if (inventario.comida > 0 || inventario.agua > 0) {
                    let comidaEntregue = Math.min(2, inventario.comida);
                    let aguaEntregue = Math.min(2, inventario.agua);
                    inventario.comida -= comidaEntregue;
                    inventario.agua -= aguaEntregue;
                    alert('Você joga sua mochila no chão e corre.');
                    alert('Comida -' + comidaEntregue + ', Água -' + aguaEntregue);
                    estaVivo();
                }
                else {
                    inventario.vida -= 2;
                    alert('Você não tinha nada para entregar! Eles te agridem e vão embora.');
                    alert('Vida -2');
                    estaVivo();
                }
            }
        }
        else {
            alert('Você encontra alguns bandidos andando pela rua, mas eles não te veem. Você se esconde e espera eles passarem.');
            if (chance(0.60)) {
                inventario.comida += 1;
                inventario.kitMedico += 1;
                alert('Você encontrou um esconderijo com suprimentos');
                alert('+1 comida, +1 kit médico');
            }
            else {
                alert('Os saqueadores já limparam toda essa área. Nada de útil.');
            }
        }
        alert('Você retornou para casa.');
    }
    // ---------------------- LOOP PRINCIPAL DO JOGO ----------------------
    while (estaVivo()) {
        let menuOpcoes = '══════════════════════════════\n' +
            'ESCOLHA UMA AÇÃO:\n' +
            '══════════════════════════════\n\n' +
            '1 - Comer comida (Fome +2)\n' +
            '2 - Beber água (Sede +2)\n' +
            '3 - Usar remédio\n' +
            '4 - Usar kit médico\n' +
            '5 - Explorar \n' +
            '6 - Ficar em casa\n\n' +
            'Vida: ' + inventario.vida + '/10  \nFome: ' + inventario.fome + '/5 \nSede: ' + inventario.sede + '/5\n' +
            'Arma: ' + inventario.durabilidadeArma + '/10';
        escolha = prompt(menuOpcoes);
        switch (escolha) {
            case '1':
                if (inventario.comida > 0) {
                    inventario.comida--;
                    inventario.fome += 2;
                    alert('Você comeu e recuperou +2 de fome.\nFome: ' + inventario.fome + '/5');
                }
                else {
                    alert('Sem comida!');
                    if (inventario.fome < 0)
                        inventario.fome = 0;
                    alert('Fome: ' + inventario.fome + '/5');
                }
                break;
            case '2':
                if (inventario.agua > 0) {
                    inventario.agua--;
                    inventario.sede += 2;
                    alert('Você bebeu água e recuperou +2 de sede.\nSede: ' + inventario.sede + '/5');
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
                explorarDia7();
                break;
            case '6':
                alert('Você decidiu ficar descansando em casa.');
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
        let sucesso = true;
        if (sucesso) {
            dia8();
        }
    }
    ;
}
