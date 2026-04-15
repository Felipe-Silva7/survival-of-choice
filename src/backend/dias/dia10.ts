import { inventario } from "../inventario.js";
import { chance } from "../aleatoriedade.js";
import { estaVivo } from "../principaisFuncoes.js";

export function dia10() {

    let dia: number = 10;
    inventario.dia = dia;

    let escolha: string;
    let combate: string;
    let armaEscolhida: string;

    // APRESENTAÇÃO DO DIA
    alert(
        '══════════════════════════════\n' +
        'DIA 10 - O RESGATE\n' +
        '══════════════════════════════\n\n' +
        '08:00 AM\n\n' +
        'Vida: ' + inventario.vida + '/10\n' +
        'Fome: ' + inventario.fome + '/5\n' +
        'Sede: ' + inventario.sede + '/5\n\n' +
        'O rádio faz barulho com estática e uma voz fala:\n' +
        '"Aqui é o Exército. Ponto de resgate no Estádio Ytacoatiara, descerá helicóptero para *sshhh*."\n' +
        '"Partiremos as 18h."\n\n' +
        'É sua chance de escapar e ter refúgio. Você precisa escapar!\n\n' +
        'O que devo fazer?'
    );

    function explorarDia10() {
        alert('Você pega tudo que sobrou e corre em direção ao estádio.');
        
        alert('O caminho está cheio de perigos. Você encontra um bloqueio militar destruído.');
        
        combate = prompt(
            'Uma zumbi enorme, um zumbi mutante com armadura militar bloqueia a entrada do estádio.\n\n' +
            '1 - Atacar com a Pistola (Requer 3 balas)\n' +
            '2 - Lutar corpo a corpo'
        )!;

        while (combate != '1' && combate != '2') {
            alert('Responda apenas com 1 ou 2.');
            combate = prompt('1 - Atirar\n2 - Corpo a Corpo')!;
        }

        if (combate == '1') {
            if (inventario.balas >= 3) {
                inventario.balas -= 3;
                alert('Você descarrega 3 tiros certeiros na cabeça desprotegida do monstro!');
                alert('Ele desaba no chão com um estrondo.');
            } else if (inventario.balas > 0) {
                inventario.balas = 0;
                inventario.vida -= 4;
                alert('Você atira as balas que tem, mas não é o suficiente!');
                alert('O monstro te arremessa longe. Você acaba se machucando. (-4 vida)');
                estaVivo();
            } else {
                inventario.vida -= 5;
                alert('Sua arma está sem munição! Você tenta correr, mas ele te arremessa contra o portão do estádio e sai deslizando pela grama! (-5 vida)');
                estaVivo();
            }
        } else {
            if (inventario.durabilidadeArma > 0) {
                inventario.vida -= 6;
                inventario.durabilidadeArma = 0;
                alert('Você parte para cima dele com a faca! A lâmina se quebra na armadura.');
                alert('Você sofre ainda mais ferimentos, mas consegue derrubá-lo por um instante empurrando-o nos destroços! (-6 vida)');
                estaVivo();
            } else {
                inventario.vida -= 8;
                alert('Sem armas, você é arremessado pelo mutante. Você bate contra o portão do estádio e sai deslizando pela grama! (-8 vida)');
                estaVivo();
            }
        }

        if (estaVivo()) {
            alert('Você avista o helicóptero.');
            alert('Sangrando e ofegante, você vai se arrastejando pelo helicóptero.');
            alert('Os soldados estão lhe chamando para se apressar..');
            alert('"VAMOS! VAMOS! VAMOS!", grita o piloto.');
            alert('Você salta para dentro do helicóptero no exato momento em que o zumbi se levanta e avança para o seu rumo');
            alert('Antes que o helicóptero pegasse altura o zumbi agarra a parte de baixo do helicóptero.');
            alert('Você pega a arma do soldado e dá o último tiro na cabeça do zumbi, que acaba caindo no chão.');
            alert('E você desaba no helicóptero, exausto, sem saber o que o futuro lhe reserva......');
            
            alert(
                '══════════════════════════════\n' +
                '      VOCÊ SOBREVIVEU!\n' +
                '══════════════════════════════\n\n' +
                'Parabéns! Você concluiu os 10 dias do apocalipse!\n\n' +
                'Status Final:\n' +
                'Vida: ' + inventario.vida + '/10\n' +
                'Fome: ' + inventario.fome + '/5\n' +
                'Sede: ' + inventario.sede + '/5\n' +
                'Balas restantes: ' + inventario.balas + '\n\n' +
                'Obrigado por jogar Survival of Choice!'
            );
            
            // Recarregar a página ou voltar ao menu pode ser feito aqui
            // location.reload();
        }
    }

    // ==================== LOOP PRINCIPAL DO JOGO ====================
    while (estaVivo()) {

        let menuOpcoes =
            '══════════════════════════════\n' +
            'ESCOLHA UMA AÇÃO (ÚLTIMOS PREPARATIVOS):\n' +
            '══════════════════════════════\n\n' +
            '1 - Comer comida (Fome +2)\n' +
            '2 - Beber água (Sede +2)\n' +
            '3 - Usar remédio\n' +
            '4 - Usar kit médico\n' +
            '5 - Ir para o estádio \n' +
            '6 - O helicóptero não vai esperar \n' +
            'Vida: ' + inventario.vida + '/10  \nFome: ' + inventario.fome + '/5 \nSede: ' + inventario.sede + '/5\n' +
            'Arma: ' + inventario.durabilidadeArma + '/10';

        escolha = prompt(menuOpcoes)!;

        switch (escolha) {
            case '1':
                if (inventario.comida > 0) {
                    inventario.fome += 2;
                    alert('Você comeu e recuperou +2 de fome.\nFome: ' + inventario.fome + '/5');
                } else {
                    alert('Sem comida!');
                }
                break;

            case '2':
                if (inventario.agua > 0) {
                    inventario.sede += 2;
                    alert('Você bebeu água e recuperou +2 de sede.\nSede: ' + inventario.sede + '/5');
                } else {
                    alert('Sem água!');
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
                explorarDia10();
                break;

            case '6':
                alert('O helicóptero não vai esperar. Você precisa ir!');
                continue;

            default:
                alert('Opção inválida. Escolha de 1 a 5.');
                continue;
        }

        if (escolha == '5') {
            break;
        }
    }
}
