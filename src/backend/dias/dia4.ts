import { inventario } from "../inventario.js";
import { chance } from "../aleatoriedade.js";
import { estaVivo } from "../principaisFuncoes.js";
import { dia5 } from "./dia5.js";

export function dia4() {

    let dia: number = 4;
    inventario.dia = dia;

    let escolha: string;
    let combate: string;
    let armaEscolhida: string;

    // APRESENTAÇÃO DO DIA
    alert(
        '══════════════════════════════\n' +
        'DIA 4 - A TEMPESTADE\n' +
        '══════════════════════════════\n\n' +
        '09:00 AM\n\n' +
        'Vida: ' + inventario.vida + '/10\n' +
        'Fome: ' + inventario.fome + '/5\n' +
        'Sede: ' + inventario.sede + '/5\n\n' +
        'Uma chuva torrencial cai lá fora.\n' +
        'Sair agora significa gastar muito mais energia e risco de acidentes.\n' +
        'Porém, as ruas estão mais limpas de zumbis.\n\n' +
        'O que devo fazer?'
    );

    function explorarDia4() {
        alert('Você decidiu encarar a tempestade.');
        
        // Penalidade climática
        inventario.vida -= 1;
        alert('O frio intenso drena sua saúde! (-1 vida)');

        if (chance(0.70)) {
            alert('Você escorrega na lama e faz barulho, atraindo um zumbi!');

            combate = prompt(
                'A chuva dificulta a visão.\n\n' +
                '1 - Enfrentar\n' +
                '2 - Tentar despistar na chuva'
            )!;

            while (combate != '1' && combate != '2') {
                alert('Responda apenas com 1 ou 2.');
                combate = prompt('1 - Enfrentar\n2 - Tentar despistar na chuva')!;
            }

            if (combate == '1') {
                armaEscolhida = prompt(
                    'Escolha sua arma:\n\n' +
                    '1 - Pistola (' + inventario.balas + ' balas)\n' +
                    '2 - Faca (durabilidade: ' + inventario.durabilidadeArma + '/10)'
                )!;

                while (armaEscolhida != '1' && armaEscolhida != '2') {
                    alert('Responda apenas com 1 ou 2.');
                    armaEscolhida = prompt('1 - Pistola\n2 - Faca')!;
                }

                if (armaEscolhida == '1' && inventario.balas > 0) {
                    inventario.balas -= 1;
                    if (chance(0.50)) {
                        alert('Você errou o tiro devido à chuva, mas acertou o segundo! (-2 balas no total)');
                        inventario.balas -= 1;
                        if(inventario.balas < 0) inventario.balas = 0;
                    } else {
                        alert('Tiro limpo, mesmo com chuva. (-1 bala)');
                    }
                    
                    if (chance(0.50)) {
                        inventario.comida += 2;
                        alert('Você encontrou +2 comida em um carro abandonado próximo.');
                    }
                } else {
                    if (inventario.durabilidadeArma <= 0) {
                        alert('Sem arma. O zumbi te morde!');
                        inventario.vida -= 4;
                        alert('Dano crítico! (-4 vida)');
                    } else {
                        if (chance(0.50)) { // Menor chance de matar de faca na chuva
                            alert('Você lutou na lama e venceu.');
                        } else {
                            inventario.vida -= 3;
                            alert('Você foi mordido antes de matar o zumbi! -3 vida.');
                        }
                        inventario.durabilidadeArma -= 2; // Gasta mais arma
                        
                        if (chance(0.60)) {
                            inventario.agua += 3;
                            alert('Você recolheu água da chuva e encontrou um cantil! (+3 água)');
                        }
                    }
                }
            } else {
                if (chance(0.60)) {
                    alert('A chuva forte te ajudou a despistar o zumbi!');
                    inventario.remedios += 1;
                    alert('Enquanto se escondia, achou 1 remédio.');
                } else {
                    alert('Você escorregou e o zumbi te alcançou!');
                    inventario.vida -= 2;
                    alert('Você levou dano antes de fugir! (-2 vida)');
                }
            }
        } else {
            alert('Não há zumbis, mas você acha uma farmácia saqueada.');
            
            if (chance(0.60)) {
                inventario.remedios += 2;
                alert('Você encontrou 2 remédios!');
            }
            if (chance(0.40)) {
                inventario.kitMedico += 1;
                alert('Você encontrou 1 kit médico!');
            }
        }
        alert('Você retornou para casa todo molhado.');
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
            '5 - Explorar na Chuva (Perigoso)\n' +
            '6 - Ficar em casa\n\n' +
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
                    alert('Você usou um remédio. (Sem doença no momento)');
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
                explorarDia4();
                inventario.fome -= 2; // Gasta mais fome por causa do frio
                if (inventario.fome < 0) inventario.fome = 0;
                inventario.sede -= 1;
                if (inventario.sede < 0) inventario.sede = 0;
                alert('O frio intenso consumiu muita energia. (-2 Fome, -1 Sede)');
                break;

            case '6':
                alert('Você decidiu ficar em casa e se manter aquecido.');
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
        dia5();
    }
}
