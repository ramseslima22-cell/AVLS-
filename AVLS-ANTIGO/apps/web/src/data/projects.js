// ============================================================
// EDITE AQUI PARA ADICIONAR PROJETOS
// ------------------------------------------------------------
// Como adicionar um novo projeto:
//   1. Coloque a imagem/vídeo do projeto na pasta public/projects/
//   2. Copie um dos objetos abaixo e ajuste os campos:
//        id          → texto único, sem espaços (ex.: 'meu-projeto')
//        title       → nome do projeto exibido no card
//        category    → uma das categorias listadas em `projectCategories`
//        description → texto curto exibido no modal/lightbox
//        cover       → caminho da imagem de capa (ex.: '/projects/meu-projeto.png')
//        media       → o que abre no lightbox:
//                        imagem: { type: 'image', src: '/projects/meu-projeto.png' }
//                        vídeo:  { type: 'video', src: '/projects/meu-video.mp4' }
//   3. Para remover um projeto, basta apagar o objeto dele da lista.
//   4. Para criar uma nova categoria de filtro, adicione o nome em
//      `projectCategories` e use o mesmo texto no campo `category`.
// ============================================================

export const projectCategories = [
	'Todos',
	'Sites',
	'E-commerce',
	'Tráfego Pago',
	'Identidade Visual',
];

export const projects = [
	{
		id: 'loja-moda',
		title: 'Loja Virtual de Moda',
		category: 'E-commerce',
		description:
			'E-commerce com vitrine elegante, navegação fluida e checkout otimizado para conversão.',
		cover: '/projects/projeto-1.png',
		media: { type: 'image', src: '/projects/projeto-1.png' },
	},
	{
		id: 'site-restaurante',
		title: 'Site para Restaurante',
		category: 'Sites',
		description:
			'Site com cardápio digital, fotografia gastronômica e chamada direta para pedidos e reservas.',
		cover: '/projects/projeto-2.png',
		media: { type: 'image', src: '/projects/projeto-2.png' },
	},
	{
		id: 'clinica-estetica',
		title: 'Clínica de Estética',
		category: 'Sites',
		description:
			'Página leve e acolhedora com agendamento facilitado e foco na experiência mobile.',
		cover: '/projects/projeto-3.png',
		media: { type: 'image', src: '/projects/projeto-3.png' },
	},
	{
		id: 'portal-imobiliario',
		title: 'Portal Imobiliário',
		category: 'Sites',
		description:
			'Vitrine de imóveis com busca intuitiva, fichas completas e captação de interessados.',
		cover: '/projects/projeto-4.png',
		media: { type: 'image', src: '/projects/projeto-4.png' },
	},
	{
		id: 'landing-fitness',
		title: 'Landing Page Fitness',
		category: 'Tráfego Pago',
		description:
			'Página de alta conversão criada para campanhas de tráfego pago no segmento fitness.',
		cover: '/projects/projeto-5.png',
		media: { type: 'image', src: '/projects/projeto-5.png' },
	},
	{
		id: 'marca-consultoria',
		title: 'Marca para Consultoria',
		category: 'Identidade Visual',
		description:
			'Identidade visual completa e site institucional para posicionar a marca com autoridade.',
		cover: '/projects/projeto-6.png',
		media: { type: 'image', src: '/projects/projeto-6.png' },
	},
];
