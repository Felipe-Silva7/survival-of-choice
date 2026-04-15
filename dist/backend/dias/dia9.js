import { inventario } from "../inventario.js";
import { chance } from "../aleatoriedade.js";
import { estaVivo } from "../principaisFuncoes.js";
import { dia10 } from "./dia10.js";
export function dia9() {
    let dia = 9;
    inventario.dia = dia;
    let escolha;
    let combate;
    let armaEscolhida;
    // APRESENTAÇÃO DO DIA
    alert('══════════════════════════════\n' +
        'DIA 9 - A HORDA\n' +
        '══════════════════════════════\n\n' +
        '05:00 AM\n\n' +
        'Vida: ' + inventario.vida + '/10\n' +
        'Fome: ' + inventario.fome + '/5\n' +
        'Sede: ' + inventario.sede + '/5\n\n' +
        'Um barulho ensurdecedor acorda você.\n' +
        'Você olha pela janela e seu sangue gela.\n' +
        'Centenas de zumbis estão marchando pela sua rua.\n' +
        'É a Horda.\n\n' +
        'O que devo fazer?');
    function explorarDia9() {
        alert('Você não tem como "explorar" hoje. A rua está lotada de mortos.');
        combate = prompt('Eles estão batendo na sua porta!\n\n' +
            '1 - Ficar em silêncio absoluto no porão\n' +
            '2 - Tentar fugir pelos fundos\n' +
            '3 - Atirar pela janela para defender a casa');
        while (combate != '1' && combate != '2' && combate != '3') {
            alert('Responda apenas com 1, 2 ou 3.');
            combate = prompt('1 - Ficar em silêncio\n2 - Fugir pelos fundos\n3 - Atirar');
        }
        if (combate == '1') {
            if (inventario.fome <= 1 || inventario.sede <= 1) {
                alert('Você estava fraco de fome/sede e tossiu alto!');
                inventario.vida -= 4;
                alert('Eles quebram a janela e te atacam! Você consegue matá-los, mas sofre muito! (-4 vida)');
            }
            else {
                alert('Você prende a respiração no escuro. Eles passam horas batendo na porta...');
                alert('Eventualmente, a horda segue em frente.');
            }
        }
        else if (combate == '2') {
            alert('Você tenta pular o muro dos fundos...');
            if (chance(0.50)) {
                alert('Você consegue escapar sem ser visto! Mas perdeu alguns itens na fuga.');
                inventario.comida = Math.max(inventario.comida - 1, 0);
                inventario.agua = Math.max(inventario.agua - 1, 0);
            }
            else {
                alert('Um grupo pequeno te viu pulando o muro!');
                inventario.vida -= 3;
                alert('Você lutou desesperadamente para escapar! (-3 vida)');
            }
        }
        else {
            alert('Você decide bancar o herói e atira na horda!');
            if (inventario.balas >= 5) {
                inventario.balas -= 5;
                alert('Você gasta 5 balas, matando dezenas. A barulheira atrai mais, mas os corpos bloqueiam a porta.');
                alert('Você sobreviveu, mas gastou muita munição.');
            }
            else {
                inventario.balas = 0;
                inventario.vida -= 6;
                alert('Sem balas suficientes, eles arrombam a porta e te despedaçam! Você mal sobrevive. (-6 vida)');
            }
        }
        alert('A horda finalmente passou.');
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
            '5 - Lidar com a Horda\n' +
            '6 - (Opção Bloqueada hoje)\n\n' +
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
                explorarDia9();
                inventario.fome -= 1;
                if (inventario.fome < 0)
                    inventario.fome = 0;
                inventario.sede -= 1;
                if (inventario.sede < 0)
                    inventario.sede = 0;
                alert('A tensão de hoje gastou suas energias. (-1 fome, -1 sede)');
                break;
            case '6':
                alert('Você não pode ignorar a horda!');
                continue;
            default:
                alert('Opção inválida. Escolha de 1 a 5.');
                continue;
        }
        if (escolha == '5') {
            break;
        }
    }
    // FINAL DO DIA
    estaVivo();
    let sucesso = true;
    if (sucesso) {
        dia10();
    }
}
