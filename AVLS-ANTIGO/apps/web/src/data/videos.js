// ============================================================
// EDITE AQUI PARA ADICIONAR VÍDEOS
// ------------------------------------------------------------
// Como adicionar um novo vídeo:
//   1. Coloque o arquivo de vídeo (ex.: .mp4) na pasta public/videos/
//      e uma imagem de capa (thumbnail) na mesma pasta.
//   2. Copie um dos objetos abaixo e ajuste os campos:
//        id          → texto único, sem espaços (ex.: 'meu-video')
//        title       → título exibido no card
//        description → texto curto exibido no player
//        thumbnail   → caminho da capa (ex.: '/videos/meu-video.png')
//        media       → { type: 'video', src: '/videos/meu-video.mp4' }
//   3. Para remover um vídeo, basta apagar o objeto dele da lista.
// Observação: os vídeos de exemplo abaixo usam apenas a capa.
// Substitua o campo `src` pelo caminho do seu arquivo .mp4.
// ============================================================

export const videos = [
	{
		id: 'bastidores-producao',
		title: 'Bastidores de produção',
		description: 'Um olhar sobre o processo criativo e de produção da AVLS.',
		thumbnail: '/videos/video-1.png',
		media: { type: 'video', src: '/videos/video-1.mp4' },
	},
	{
		id: 'motion-identidade',
		title: 'Motion e identidade em movimento',
		description: 'Direção de arte e motion graphics para marcas digitais.',
		thumbnail: '/videos/video-2.png',
		media: { type: 'video', src: '/videos/video-2.mp4' },
	},
	{
		id: 'conteudo-redes',
		title: 'Conteúdo para redes sociais',
		description: 'Produção de vídeos verticais pensados para engajar e converter.',
		thumbnail: '/videos/video-3.png',
		media: { type: 'video', src: '/videos/video-3.mp4' },
	},
];
