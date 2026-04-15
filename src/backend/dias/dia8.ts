import { inventario } from "../inventario.js";
import { chance } from "../aleatoriedade.js";
import { estaVivo } from "../principaisFuncoes.js";
import { dia9 } from "./dia9.js";

export function dia8() {

    let dia: number = 8;
    inventario.dia = dia;
    let escolha: string;

    inventario.fome -= 1;
    if (inventario.fome < 0) inventario.fome = 0;
    inventario.sede -= 1;
    if (inventario.sede < 0) inventario.sede = 0;
    alert('Você acordou (-1 de fome e -1 de sede)');

    // APRESENTAÇÃO DO DIA
    alert(
        '══════════════════════════════\n' +
        'DIA 8 - O OLHAR NA JANELA\n' +
        '══════════════════════════════\n\n' +
        '08:00 AM\n\n' +
        'Vida: ' + inventario.vida + '/10\n' +
        'Fome: ' + inventario.fome + '/5\n' +
        'Sede: ' + inventario.sede + '/5\n\n' +
        'Você acorda e percebe algo estranho: sua porta foi marcada com um "X" vermelho durante a noite.\n' +
        'Sua casa ainda é segura?.\n\n' +
        'O que devo fazer?'
    );

    function explorarDia8() {
        alert('Você não quer ficar em casa depois de ver a marca, então aproveita para sair e explorar.');
        
        if (chance(0.70)) {
            alert('Você vasculha a região com cuidado.');
            if (chance(0.50)) {
                inventario.comida += 2;
                inventario.agua += 1;
                alert('Você encontrou alguns suprimentos em um esconderijo (+2 comida, +1 água).');
            } else {
                alert('A área já foi saqueada. Nada de útil por aqui.');
            }
        } else {
            alert('Você percebe pessoas estranhas andando pelas ruas. Foram eles que marcaram sua casa?');
            alert('Você volta rapidamente para casa sem explorar muito.');
        }
        alert('Você retornou para casa.');
    }

    // --------------------- LOOP PRINCIPAL DO JOGO ---------------------
    while (estaVivo()) {

        let menuOpcoes =
            '══════════════════════════════\n' +
            'ESCOLHA UMA AÇÃO:\n' +
            '══════════════════════════════\n\n' +
            '1 - Comer comida \n' +
            '2 - Beber água \n' +
            '3 - Usar remédio\n' +
            '4 - Usar kit médico\n' +
            '5 - Explorar\n' +
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
                    if (inventario.fome < 0) inventario.fome = 0;
                    alert('Fome: ' + inventario.fome + '/5');
                }
                break;

            case '2':
                if (inventario.agua > 0) {
                    inventario.agua--;
                    inventario.sede = Math.min(inventario.sede + 2, 5);
                    alert('Você bebeu água e recuperou +2 de sede.\nSede: ' + inventario.sede + '/5');
                } else {
                    alert('Sem água!');
                    if (inventario.sede < 0) inventario.sede = 0;
                    alert('Sede: ' + inventario.sede + '/5');
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
                explorarDia8();
                break;

            case '6':
                alert('Você decidiu ficar em casa e trancar as portas com tudo que tem.');

                // Evento de tentativa de invasão
                if (chance(0.70)) {
                    alert('18:00 PM');
                    alert('Você ouve batidas violentas na porta!');
                    alert('Alguém está tentando invadir sua casa!');
                    
                    let defesa = prompt(
                        'O que você faz?\n\n' +
                        '1 - Atirar pela janela\n' +
                        '2 - Se esconder'
                    )!;

                    while (defesa != '1' && defesa != '2') {
                        alert('Responda apenas com 1 ou 2.');
                        defesa = prompt('1 - Atirar\n2 - Se esconder')!;
                    }

                    if (defesa == '1') {
                        if (inventario.balas >= 4) {
                            alert('É um grupo de pessoas. Você sai atirando em cada um');
                            alert('"DEEM O FORA DAQUII!", você grita');
                            alert('Eles saem correndo e somem pelas ruas.')
                            alert('Balas -4');
                            inventario.balas -= 4;
                        } else {
                            alert('Não tenho balas suficientes!');
                            alert('Você usa as balas que tem, mas não foi o bastante, ainda sobrou um que te ataca.');
                            inventario.balas = 0;

                            if (chance(0.50)) {
                                alert('Você usa a faca para acerta-lo, mas ao atingi-lo você deixa a guarda baixa.');
                                alert('Ele te acerta na cabeça com um taco, te deixando gravemente ferido! (-6 vida)');
                                alert('O bandido acaba fugindo.');
                                inventario.durabilidadeArma -= 3;
                                inventario.vida -= 6;
                                alert('Vida -6, Durabilidade da arma -3');
                                estaVivo();
                            } else {
                                alert('O bandido te acerta na cabeça com um taco, e você desmaia (-6 vida)');
                                estaVivo();
                                alert('Quando você acorda, o bandido já foi embora, mas ele pegou seus suprimentos.');
                                inventario.vida -= 6;
                                alert(`Vida -6, Comida -${inventario.comida}, Água -${inventario.agua}`);
                                inventario.comida = 0;
                                inventario.agua = 0;
                                estaVivo();
                            }
                        }
                    } else {
                        alert('Você se esconde no quarto, tranca a porta e espera eles irem embora.');
                        alert('Você ouve eles revirando a casa, mas eles não te encontram.');
                        alert('Depois de um tempo, eles vão embora.');
                        alert('Você saiu ileso, mas eles levaram seus suprimentos.');
                        alert(`Comida -${inventario.comida}, Água -${inventario.agua}`);
                        inventario.comida = 0;
                        inventario.agua = 0;
                    }
                }
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
        let sucesso: boolean = true;

        if (sucesso) {
            dia9();
        }
    };
}
