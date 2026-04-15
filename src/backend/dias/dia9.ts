import { inventario } from "../inventario.js";
import { chance } from "../aleatoriedade.js";
import { estaVivo } from "../principaisFuncoes.js";
import { dia10 } from "./dia10.js";

export function dia9() {
    let dia: number = 9;
    inventario.dia = dia;
    let escolha: string;

    inventario.fome = Math.max(0, inventario.fome - 1);
    inventario.sede = Math.max(0, inventario.sede - 1);

    // APRESENTAÇÃO DO DIA
    alert(
        '══════════════════════════════\n' +
        'DIA 9 - A ESPERANÇA\n' +
        '══════════════════════════════\n\n' +
        '*sshh... Ssh... Pra quem estiver ouvindo"\n\n' +
        'Você acorda com o chiado do rádio...\n\n' +
        '"...ssshh... se alguém estiver ouvindo... ssh... Refúgio seguro a LESTE..."\n' +
        '"...estamos localizados no Estádio de Futebol... o exército está *Shhhhh*..."\n' +
        '"...Vamos para outro lugar em 20 horas"\n\n' +
        '*ssssssshhh*\n\n' +
        '"Pessoas relatam terem visto um zumbi anormal *sshh* maior que *sshh*.. Como uma mutação.. \n\n' +
        'O sinal caiu. \nVocê lembra do ataque de ontem. Os bandidos estão lá fora, \n' +
        'mas agora você sabe para onde ir.'
    );

    function explorarDia9() {
        alert('Você vai em um posto de gasolina abandonado.');
        alert('Lá tem uma loja de conveniência.');
        alert('2 horas depois.');

        if (chance(0.50)) {
            alert('Você entrou na loja de conveniência mas está tudo revirado.');
            if (chance(0.50)) {
                alert('Debaixo do balcão você ainda encontrou um pouco de comida enlatada (+2 comida).');
                inventario.comida += 2;
            } else {
                alert('Debaixo do balcão você ainda encontrou um pouco de água (+2 água).');
                inventario.agua += 2;
            }
        } else {
            alert('Você estava chegando, mas avistou uma pessoa armada saindo da loja com mochila cheia.');
            let decisao = prompt(
                'Ele parece ter muitos mantimentos. O que você deseja fazer?\n\n' +
                '1 - Enfrenta-los\n' +
                '2 - Retornar para casa '
            )!;

            while (decisao != '1' && decisao != '2') {
                alert('Responda apenas com 1 ou 2.');
                decisao = prompt('Escolha uma opção:\n1 - Enfrenta-los\n2 - Recuar')!;
            }

            if (decisao == '1') {
                alert('Você decide que não pode voltar com as mãos abanando e prepara um ataque.');

                let armaAtaque = prompt(
                    'Escolha como atacar:\n\n' +
                    '1 - Pistola (' + inventario.balas + ' balas)\n' +
                    '2 - Faca (Durabilidade: ' + inventario.durabilidadeArma + '/10)'
                )!;
                while (armaAtaque != '1' && armaAtaque != '2') {
                    alert('Responda apenas com 1 ou 2.');
                    armaAtaque = prompt(
                        'Escolha como atacar:\n\n' +
                        '1 - Pistola\n' +
                        '2 - Faca'
                    )!;
                }

                if (armaAtaque == '1' && inventario.balas >= 1) {
                    // Combate com arma de fogo (Mais chance de vitória)
                    inventario.balas -= 1;
                    alert('Você dispara um tiro. E o cara cai no chão');
                    alert('Você pegou o que pôde: +3 Comida, +3 Água e +1 Kit que tava na mochila do que caiu');
                    inventario.comida += 3;
                    inventario.agua += 3;
                    inventario.kitMedico += 1;
                } else {
                    alert('Você não tem balas o suficiente.');
                    armaAtaque = '2';
                }

                if (armaAtaque == '2') {
                    if (inventario.durabilidadeArma <= 0) {
                        alert('Você não tem faca! Ela está quebrada.');
                        inventario.vida -= 3;
                        alert('Você tenta lutar com as mãos nuas, mas o cara é experiente.');
                        alert('Você leva uma surra mas consegue fugir. (-2 vida)');
                        estaVivo();
                    } else {
                        alert('Você tenta emboscar ele');
                        alert('Se esconde atrás da parede e espera ele passar.');
                        if (chance(0.50)) {
                            alert('Você o ataca de surpresa com a faca e manda ele entregar tudo o que tem, depois voce o deixa lá e foge.');
                            inventario.comida += 2;
                            inventario.agua += 2;
                            inventario.kitMedico += 1;
                            inventario.durabilidadeArma -= 2;
                            alert('Comida +2, Água +2, Kit Médico +1, Durabilidade da arma -2');
                        } else {
                            alert('Você o ataca de surpresa com a faca, manda ele entregar tudo o que tem, mas ele reage e te ataca. \n Você o acerta com a faca. \n Você tirou mais uma vida.');
                            inventario.vida -= 1;
                            inventario.durabilidadeArma -= 2;
                            inventario.comida += 2;
                            inventario.agua += 2;
                            inventario.kitMedico += 1;
                            alert('Vida -1, Durabilidade da arma -2, Comida +2, Água +2, Kit Médico +1');
                            estaVivo();
                        }
                    }
                }

            } else {
                alert('Você decide que é melhor não arriscar sua vida.');
                alert('Você retorna para casa, com o olhar triste, sem saber o que pode acontecer amanhã');
            }
        }
        alert('Você retornou para casa.');
    }

    // --------------------- LOOP PRINCIPAL ---------------------
    while (estaVivo()) {
        let menuOpcoes =
            '══════════════════════════════\n' +
            'DIA 9 - PREPARAR PARA A PARTIDA\n' +
            '══════════════════════════════\n\n' +
            '1 - Comer comida (Fome +2)\n' +
            '2 - Beber água (Sede +2)\n' +
            '3 - Usar remédio\n' +
            '4 - Usar kit médico\n' +
            '5 - Buscar suprimentos para viagem \n' +
            '6 - Descansar para a fuga \n\n' +
            'Vida: ' + inventario.vida + '/10 \n' + 
            'Fome: ' + inventario.fome + '/5\n' +
            'Sede: ' + inventario.sede + '/5\n' +
            'Comida: ' + inventario.comida + '\n' +
            'Água: ' + inventario.agua;

        escolha = prompt(menuOpcoes)!;

        switch (escolha) {
            case '1':
                if (inventario.comida > 0) {
                    inventario.comida--;
                    inventario.fome = Math.min(5, inventario.fome + 2);
                    alert('Você come pensando no Refúgio. Fome: ' + inventario.fome + '/5');
                } else alert('Sem comida!');
                break;

            case '2':
                if (inventario.agua > 0) {
                    inventario.agua--;
                    inventario.sede = Math.min(5, inventario.sede + 2);
                    alert('Você bebe água. Sede: ' + inventario.sede + '/5');
                } else alert('Sem água!');
                break;

            case '3':
                if (inventario.remedios > 0) {
                    inventario.remedios--;
                    alert('Você se sente mais focado.');
                } else alert('Sem remédios.');
                break;

            case '4':
                if (inventario.kitMedico > 0) {
                    inventario.kitMedico--;
                    inventario.vida = Math.min(10, inventario.vida + 2);
                    alert('Você trata seus ferimentos. Vida: ' + inventario.vida + '/10');
                } else alert('Sem kits médicos.');
                break;

            case '5':
                explorarDia9();
                break;

            case '6':
                alert('Você tranca a porta com o que pode e fica com o rádio no colo esperando novas informações.');
                alert('*Shhhh.... sssshh... sssssshhh...*');
                break;

            default:
                alert('Opção inválida. Escolha entre 1 e 6.');
                continue;
        }

        if (escolha == '5' || escolha == '6') {
            break;
        }
    }

    if (estaVivo()) {
        alert('Você acaba caindo no sono.')
        let sucesso: boolean = true;

        if (sucesso) {
            dia10();
        }
    };
}