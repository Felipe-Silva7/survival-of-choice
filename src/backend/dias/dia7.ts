import { inventario } from "../inventario.js";
import { chance } from "../aleatoriedade.js";
import { estaVivo } from "../principaisFuncoes.js";
import { dia8 } from "./dia8.js";

export function dia7() {

    let dia: number = 7;
    inventario.dia = dia;

    let escolha: string;
    let combate: string;
    let armaEscolhida: string;

    // APRESENTAÇÃO DO DIA
    alert(
        '══════════════════════════════\n' +
        'DIA 7 - OS SAQUEADORES\n' +
        '══════════════════════════════\n\n' +
        '09:30 AM\n\n' +
        'Vida: ' + inventario.vida + '/10\n' +
        'Fome: ' + inventario.fome + '/5\n' +
        'Sede: ' + inventario.sede + '/5\n\n' +
        'Você acorda e vê movimento na rua.\n' +
        'Não são zumbis... São humanos armados saqueando as casas.\n' +
        'Eles são muito mais perigosos do que os mortos-vivos.\n\n' +
        'O que devo fazer?'
    );

    function explorarDia7() {
        alert('Você tenta sair de casa sem ser notado.');
        
        if (chance(0.70)) {
            alert('Você é avistado por dois saqueadores!');

            combate = prompt(
                '"Passa tudo que você tem ou morre!", grita um deles.\n\n' +
                '1 - Reagir e atirar (Requer Pistola)\n' +
                '2 - Tentar lutar com a faca\n' +
                '3 - Entregar alguns suprimentos e fugir'
            )!;

            while (combate != '1' && combate != '2' && combate != '3') {
                alert('Responda apenas com 1, 2 ou 3.');
                combate = prompt('1 - Atirar\n2 - Faca\n3 - Entregar suprimentos')!;
            }

            if (combate == '1') {
                if (inventario.balas >= 2) {
                    inventario.balas -= 2;
                    alert('Você saca a arma rápido e dispara! (-2 balas)');
                    alert('Os dois saqueadores caem. Você sobreviveu a um tiroteio.');
                    
                    inventario.comida += 3;
                    inventario.agua += 2;
                    inventario.balas += 5;
                    alert('Você pega os pertences deles: +3 comida, +2 água, +5 balas.');
                } else {
                    alert('Você tenta sacar a arma, mas não tem balas suficientes!');
                    inventario.vida -= 5;
                    alert('Eles atiram em você! Você foge sangrando. (-5 vida)');
                }
            } else if (combate == '2') {
                if (inventario.durabilidadeArma <= 0) {
                    alert('Você não tem faca! Você levanta os punhos.');
                    inventario.vida -= 6;
                    alert('Eles riem e te espancam antes de levar suas coisas. (-6 vida)');
                    inventario.comida = 0;
                    inventario.agua = 0;
                } else {
                    inventario.vida -= 4;
                    inventario.durabilidadeArma -= 3;
                    alert('Você avança com a faca! Consegue ferir um, mas leva um tiro de raspão. (-4 vida)');
                    alert('Eles recuam, assustados com sua fúria.');
                    if (estaVivo()) {
                        inventario.balas += 2;
                        alert('Eles deixaram cair 2 balas na fuga.');
                    }
                }
            } else {
                if (inventario.comida > 0 || inventario.agua > 0) {
                    inventario.comida = Math.max(inventario.comida - 2, 0);
                    inventario.agua = Math.max(inventario.agua - 2, 0);
                    alert('Você joga sua mochila no chão e corre. (-2 comida, -2 água)');
                } else {
                    inventario.vida -= 3;
                    alert('Você não tinha nada para entregar! Eles te agridem e vão embora. (-3 vida)');
                }
            }
        } else {
            alert('Você consegue evitar as patrulhas dos saqueadores.');
            if (chance(0.60)) {
                inventario.comida += 1;
                inventario.balas += 3;
                alert('Você encontrou um esconderijo intocado: +1 comida e +3 balas.');
            } else {
                alert('Os saqueadores já limparam toda essa área. Nada de útil.');
            }
        }
        alert('Você retornou para casa.');
    }

    // ==================== LOOP PRINCIPAL DO JOGO ====================
    while (estaVivo()) {

        let menuOpcoes =
            '══════════════════════════════\n' +
            'ESCOLHA UMA AÇÃO:\n' +
            '══════════════════════════════\n\n' +
            '1 - Comer comida (Fome +2)\n' +
            '2 - Beber água (Sede +2)\n' +
            '3 - Usar remédio\n' +
            '4 - Usar kit médico\n' +
            '5 - Explorar (Cuidado com saqueadores)\n' +
            '6 - Ficar escondido em casa\n\n' +
            'Vida: ' + inventario.vida + '/10  \nFome: ' + inventario.fome + '/5 \nSede: ' + inventario.sede + '/5\n' +
            'Arma: ' + inventario.durabilidadeArma + '/10';

        escolha = prompt(menuOpcoes)!;

        switch (escolha) {
            case '1':
                if (inventario.comida > 0) {
                    inventario.comida--;
                    inventario.fome = Math.min(inventario.fome + 2, 5);
                    alert('Você comeu e recuperou +2 de fome.\nFome: ' + inventario.fome + '/5');
                } else {
                    alert('Sem comida!');
                    inventario.fome -= 1;
                    if (inventario.fome < 0) inventario.fome = 0;
                    alert('Você perdeu 1 de fome. Fome: ' + inventario.fome + '/5');
                }
                break;

            case '2':
                if (inventario.agua > 0) {
                    inventario.agua--;
                    inventario.sede = Math.min(inventario.sede + 2, 5);
                    alert('Você bebeu água e recuperou +2 de sede.\nSede: ' + inventario.sede + '/5');
                } else {
                    alert('Sem água!');
                    inventario.sede -= 1;
                    if (inventario.sede < 0) inventario.sede = 0;
                    alert('Você perdeu 1 de sede. Sede: ' + inventario.sede + '/5');
                }
                break;

            case '3':
                if (inventario.remedios > 0) {
                    inventario.remedios--;
                    alert('Você usou um remédio.');
                } else {
                    alert('Você não tem remédios.');
                }
                break;

            case '4':
                if (inventario.kitMedico > 0) {
                    inventario.kitMedico--;
                    inventario.vida = Math.min(inventario.vida + 2, 10);
                    alert('Você usou o kit médico e recuperou +2 de vida.\nVida: ' + inventario.vida + '/10');
                } else {
                    alert('Você não tem kit médico.');
                }
                break;

            case '5':
                explorarDia7();
                inventario.fome -= 1;
                if (inventario.fome < 0) inventario.fome = 0;
                inventario.sede -= 1;
                if (inventario.sede < 0) inventario.sede = 0;
                alert('Você perdeu 1 de fome e 1 de sede por explorar.');
                break;

            case '6':
                alert('Você decidiu ficar escondido. Os saqueadores não te encontraram.');
                inventario.fome -= 1;
                if (inventario.fome < 0) inventario.fome = 0;
                inventario.sede -= 1;
                if (inventario.sede < 0) inventario.sede = 0;
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
    let sucesso: boolean = true;

    if (sucesso) {
        dia8();
    }
}
