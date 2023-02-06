import winGameStateJSON from './winGameState.json';

export const winGameState = JSON.stringify(winGameStateJSON);
export const expectedShareContent = `Wordish | 4/6·
5-letter word···
🟨⬛⬛⬛⬛·
⬛🟩🟩⬛⬛·
⬛🟩🟩🟩🟩·
🟩🟩🟩🟩🟩···
https://wordish.onrender.com/?p=4f65f721`;

export { default as setup } from './setup';
