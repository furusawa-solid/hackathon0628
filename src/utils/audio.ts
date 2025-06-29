export const playCry = (cryUrl: string) => {
  const audio = new Audio(cryUrl);
  audio.volume = 0.2;
  audio.play().catch((err) => {
    console.error('鳴き声の再生に失敗しました。', err);
  });
};
