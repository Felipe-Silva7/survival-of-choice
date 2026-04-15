import { inventario } from "../inventario.js";
import { chance } from "../aleatoriedade.js";
import { estaVivo } from "../principaisFuncoes.js";
import { dia9 } from "./dia9.js";
export function dia8() {
    let dia = 8;
    inventario.dia = dia;
    let escolha;
    let combate;
    let armaEscolhida;
    // APRESENTAÇÃO DO DIA
    alert('══════════════════════════════\n' +
        'DIA 8 - CAÇADORES VELOZES\n' +
        '══════════════════════════════\n\n' +
        '07:15 AM\n\n' +
        'Vida: ' + inventario.vida + '/10\n' +
        'Fome: ' + inventario.fome + '/5\n' +
        'Sede: ' + inventario.sede + '/5\n\n' +
        'Os zumbis estão diferentes. Você ouve ganidos lá fora.\n' +
        'Cães infectados. Eles são muito mais rápidos e difíceis de acertar.\n\n' +
        'O que devo fazer?');
    function explorarDia8() {
        alert('Você sai com muito cuidado.');
        if (chance(0.75)) {
            alert('Um cachorro zumbi pula de trás de um carro direto em você!');
            combate = prompt('Ele é muito rápido!\n\n' +
                '1 - Atirar\n' +
                '2 - Usar a faca');
            while (combate != '1' && combate != '2') {
                alert('Responda apenas com 1 ou 2.');
                combate = prompt('1 - Atirar\n2 - Faca');
            }
            if (combate == '1') {
                if (inventario.balas > 0) {
                    inventario.balas -= 1;
                    if (chance(0.40)) { // Baixa chance de acertar tiro
                        alert('Você acertou o cão no ar! (-1 bala)');
                    }
                    else {
                        inventario.vida -= 2;
                        alert('Você errou o tiro! O cão te morde antes de você conseguir chutá-lo longe. (-1 bala, -2 vida)');
                        if (inventario.balas > 0 && estaVivo()) {
                            inventario.balas -= 1;
                            alert('Você dispara novamente e o mata. (-1 bala extra)');
                        }
                        else if (estaVivo()) {
                            inventario.vida -= 2;
                            alert('Sem balas, você tem que matá-lo com as mãos nuas! (-2 vida extra)');
                        }
                    }
                    if (estaVivo() && chance(0.50)) {
                        inventario.agua += 2;
                        inventario.comida += 1;
                        alert('Você encontra suprimentos perto do ninho deles (+1 comida, +2 água).');
                    }
                }
                else {
                    alert('Sua arma está sem balas! Você só ouve o clique vazio.');
                    inventario.vida -= 4;
                    alert('O cachorro te estraçalha antes de você conseguir matá-lo. (-4 vida)');
                }
            }
            else {
                if (inventario.durabilidadeArma <= 0) {
                    alert('Sem arma, você tenta lutar com o cão feroz.');
                    inventario.vida -= 5;
                    alert('As mordidas são profundas! (-5 vida)');
                }
                else {
                    inventario.vida -= 3;
                    inventario.durabilidadeArma -= 2;
                    alert('Lutar corpo a corpo com um cão infectado é brutal! (-3 vida, -2 durabilidade)');
                    if (estaVivo() && chance(0.60)) {
                        inventario.comida += 2;
                        alert('Você vasculha a área e acha +2 comida.');
                    }
                }
            }
        }
        else {
            alert('A área está livre de cães por enquanto.');
            inventario.balas += 3;
            alert('Você encontrou um corpo e pegou +3 balas!');
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
                explorarDia8();
                inventario.fome -= 1;
                if (inventario.fome < 0)
                    inventario.fome = 0;
                inventario.sede -= 1;
                if (inventario.sede < 0)
                    inventario.sede = 0;
                alert('Você perdeu 1 de fome e 1 de sede por explorar.');
                break;
            case '6':
                alert('Você decidiu ficar em casa e trancar as portas.');
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
        dia9();
    }
}
