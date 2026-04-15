import { inventario } from "../inventario.js";
import { chance } from "../aleatoriedade.js";
import { estaVivo } from "../principaisFuncoes.js";
import { dia7 } from "./dia7.js";
export function dia6() {
    let dia = 6;
    inventario.dia = dia;
    let escolha;
    let combate;
    let armaEscolhida;
    let curado = false;
    // APRESENTAÇÃO DO DIA
    alert('══════════════════════════════\n' +
        'DIA 6 - A FEBRE\n' +
        '══════════════════════════════\n\n' +
        '06:00 AM\n\n' +
        'Vida: ' + inventario.vida + '/10\n' +
        'Fome: ' + inventario.fome + '/5\n' +
        'Sede: ' + inventario.sede + '/5\n\n' +
        'Você acorda suando frio e tremendo.\n' +
        'Você contraiu uma infecção grave (febre).\n' +
        'Você precisa usar um Remédio hoje, ou sua vida começará a cair rapidamente.\n\n' +
        'O que devo fazer?');
    function explorarDia6() {
        alert('Apesar da fraqueza, você sai para explorar.');
        if (chance(0.60)) {
            alert('Você encontra uma ambulância abandonada.');
            combate = prompt('Há um zumbi preso dentro dela.\n\n' +
                '1 - Tentar abrir e matar o zumbi para pegar suprimentos\n' +
                '2 - Ignorar e voltar');
            while (combate != '1' && combate != '2') {
                alert('Responda apenas com 1 ou 2.');
                combate = prompt('1 - Tentar abrir\n2 - Ignorar');
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
                    alert('Você atira através do vidro e abre a porta em segurança. (-1 bala)');
                    inventario.remedios += 2;
                    inventario.kitMedico += 1;
                    alert('A ambulância tinha estoque! (+2 remédios, +1 kit médico)');
                }
                else {
                    if (inventario.durabilidadeArma <= 0) {
                        alert('Sem arma e fraco pela febre, o zumbi te morde feio!');
                        inventario.vida -= 4;
                        alert('Dano crítico! (-4 vida)');
                    }
                    else {
                        inventario.vida -= 2; // Por estar doente, sempre toma dano no corpo a corpo
                        inventario.durabilidadeArma -= 1;
                        alert('Você abre a porta e a luta é difícil por causa da febre. (-2 vida)');
                        inventario.remedios += 1;
                        alert('Você encontrou +1 remédio na ambulância.');
                    }
                }
            }
            else {
                alert('Você não quis arriscar e foi embora.');
            }
        }
        else {
            alert('Você anda pelos arredores, mas a tontura não te deixa ir muito longe.');
            if (chance(0.50)) {
                inventario.agua += 2;
                alert('Você achou +2 água antes de voltar.');
            }
        }
        alert('Você retornou para casa, exausto.');
    }
    // ==================== LOOP PRINCIPAL DO JOGO ====================
    while (estaVivo()) {
        let menuOpcoes = '══════════════════════════════\n' +
            'ESCOLHA UMA AÇÃO:\n' +
            '══════════════════════════════\n\n' +
            '1 - Comer comida (Fome +2)\n' +
            '2 - Beber água (Sede +2)\n' +
            '3 - Usar remédio (Cura a febre)\n' +
            '4 - Usar kit médico\n' +
            '5 - Explorar\n' +
            '6 - Ficar em casa\n\n' +
            'Vida: ' + inventario.vida + '/10  \nFome: ' + inventario.fome + '/5 \nSede: ' + inventario.sede + '/5\n' +
            'Arma: ' + inventario.durabilidadeArma + '/10\n' +
            'Status: ' + (curado ? 'Curado' : 'DOENTE');
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
                }
                break;
            case '3':
                if (inventario.remedios > 0) {
                    inventario.remedios--;
                    curado = true;
                    alert('Você usou um remédio. A febre está baixando! Você se curou.');
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
                explorarDia6();
                inventario.fome -= 1;
                if (inventario.fome < 0)
                    inventario.fome = 0;
                inventario.sede -= 1;
                if (inventario.sede < 0)
                    inventario.sede = 0;
                alert('Você perdeu 1 de fome e 1 de sede por explorar.');
                break;
            case '6':
                alert('Você decidiu descansar e tentar melhorar.');
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
    // Penalidade da doença se não curado
    if (!curado) {
        inventario.vida -= 3;
        alert('A febre consumiu seu corpo durante o dia! Você sofreu -3 de vida por não usar remédios.');
    }
    // FINAL DO DIA
    estaVivo();
    let sucesso = true;
    if (sucesso) {
        dia7();
    }
}
