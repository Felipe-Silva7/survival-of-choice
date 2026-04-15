// colocar aq sorte e etc variaveis globais
import { inventario } from "./inventario.js";
// Coiso pra ver se o jogador tá vivo
export function estaVivo() {
    if (inventario.vida <= 0) {
        alert('══════════════════════════════\n' +
            '          VOCÊ MORREU\n' +
            '══════════════════════════════\n\n' +
            'CAUSA DA MORTE: Falta de vida\n\n' +
            'Você não resistiu aos ferimentos...\n\n' +
            'Dias sobrevividos: ' + inventario.dia + '\n\n');
        return false;
    }
    if (inventario.fome <= 0) {
        alert('══════════════════════════════\n' +
            '          VOCÊ MORREU\n' +
            '══════════════════════════════\n\n' +
            'CAUSA DA MORTE: Fome\n\n' +
            'Você morreu de fome...\n\n' +
            'Dias sobrevividos: ' + inventario.dia + '\n\n');
        return false;
    }
    if (inventario.sede <= 0) {
        alert('══════════════════════════════\n' +
            '          VOCÊ MORREU\n' +
            '══════════════════════════════\n\n' +
            'CAUSA DA MORTE: Sede\n\n' +
            'Você morreu de desidratação...\n\n' +
            'Dias sobrevividos: ' + inventario.dia + '\n\n');
        return false;
    }
    return true;
}
