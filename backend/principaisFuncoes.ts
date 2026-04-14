// colocar aq sorte e etc variaveis globais
import { inventario } from "./inventario";
import { chance } from "./aleatoriedade";

// Coiso pra ver se o jogador tá vivo
export function estaVivo(): boolean {
    if (inventario.vida <= 0) {
        alert(
            '══════════════════════════════\n' +
            '          VOCÊ MORREU\n' +
            '══════════════════════════════\n\n' +
            '☠️ CAUSA DA MORTE: Falta de vida ☠️\n\n' +
            'Você não resistiu aos ferimentos...\n\n' +
            'Dias sobrevividos: ' + inventario.dia + '\n\n'
        );
        return false;
    }
    
    if (inventario.fome <= 0) {
        alert(
            '══════════════════════════════\n' +
            '          VOCÊ MORREU\n' +
            '══════════════════════════════\n\n' +
            '🍗 CAUSA DA MORTE: Fome 🍗\n\n' +
            'Você morreu de fome...\n\n' +
            'Dias sobrevividos: ' + inventario.dia + '\n\n'
        );
        return false;
    }
    
    if (inventario.sede <= 0) {
        alert(
            '══════════════════════════════\n' +
            '          VOCÊ MORREU\n' +
            '══════════════════════════════\n\n' +
            '💧 CAUSA DA MORTE: Sede 💧\n\n' +
            'Você morreu de desidratação...\n\n' +
            'Dias sobrevividos: ' + inventario.dia + '\n\n'
        );
        return false;
    }
    
    return true;
}

export function aplicarFerimento() {
    if (inventario.ferimento) {
        let dano: number = chance(0.5)? 1 : inventario.dia - 3;
        inventario.vida -= dano;
        if (inventario.vida < 0) inventario.vida = 0;
        alert('🩸 Seu ferimento está sangrando! Você perdeu ' + dano + ' de vida. Vida: ' + inventario.vida + '/10');
    }
}