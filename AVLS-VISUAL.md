# Reestruturação visual AVLS

Referência estrutural: [Tropikal Trips](https://tropikaltrips.com/). O anexo contém o começo do HTML; a análise foi complementada pelo HTML público e pelo CSS post-13.css. Reaproveitados os princípios de Hero em 100vh, mídia em cover, títulos centralizados, cards visuais e gradientes entre seções. Nenhuma imagem, marca, cor ou texto da referência foi incorporado.

## Arquivos alterados

- apps/web/index.html: favicon corrigido para o logo AVLS existente; /vite.svg não existia.
- apps/web/src/pages/HomePage.jsx: composição da Home, tema cinematográfico e retorno da seção Serviços.
- apps/web/src/cinematic.css: fundos, overlays, hierarquia, continuidade e responsividade.
- apps/web/src/components/Hero.jsx: primeira viewport com imagem de edição existente e conteúdo centralizado.
- apps/web/src/components/StudioIntro.jsx: fluxo natural do Hero para o estúdio, sem cenas fixadas.
- apps/web/src/components/CreativeStudio.jsx: foto da equipe como fundo e textos existentes sobrepostos.
- apps/web/src/components/SocialShowcase.jsx: imagem de motion existente como fundo; frases preservadas.
- apps/web/src/components/Services.jsx: serviços existentes com composição editorial e sem GSAP no caminho da Home.
- apps/web/src/components/Portfolio.jsx e Portfolio.css: grade editorial, capas JPG existentes, filtros e play.
- apps/web/src/components/Videos.jsx e Videos.css: projeto em destaque com poster e seleção manual.
- apps/web/src/components/CtaBanner.jsx: imagem de produção existente como fundo; CTA e textos preservados.
- apps/web/src/components/MediaLightbox.jsx: player sob demanda, poster correto, descrição acessível e retorno de foco.
- apps/web/src/components/Reveal.jsx: movimento reduzido apresenta conteúdo imediatamente.
- apps/web/src/components/Header.jsx: contraste e acessibilidade do menu móvel.

## Componente criado

apps/web/src/components/MediaBackdrop.jsx: imagem full-width com prioridade configurável, lazy loading e parallax discreto através de motion values. Não usa estado React para atualizar o scroll.

## Inventário e associação das capas

O mapeamento original de src/data/videos.js e src/data/projects.js foi mantido integralmente. Os JPG abaixo já existiam antes desta implementação. Nenhum frame foi extraído e nenhuma capa foi gerada ou substituída. Os nomes dos MP4, inclusive espaços e acentuação Unicode, foram preservados.

Todos os arquivos da tabela ficam em apps/web/public/videos/.

| Projeto | Vídeo | Capa / poster existente |
| --- | --- | --- |
| 3 Brinquedos | 3 Brinquedos .mp4 | 3-brinquedos-poster.jpg |
| Luz do painel | Luz do painel .mp4 | luz-do-painel-poster.jpg |
| Paciência | Paciência .mp4 | paciencia-poster.jpg |
| Pesa mais | Pesa mais .mp4 | pesa-mais-poster.jpg |
| Pneus | Pneus.mp4 | pneus-poster.jpg |
| RR mecanica | RR mecanica .mp4 | rr-mecanica-poster.jpg |

Outros assets ativos preservados:

- images/logo.jpg: marca original e favicon.
- images/sobre.png: foto da equipe usada no estúdio.
- videos/video-1.png: edição audiovisual, usada no Hero.
- videos/video-2.png: imagem de motion, usada em Social Media.
- videos/video-3.png: imagem de produção, usada no CTA.
- projects/projeto-1.png a projeto-6.png: imagens de projetos web; mantidas no disco, sem atribuição artificial aos MP4.

São 22 assets em public: 6 MP4, 6 capas JPG e 10 outras imagens. As cópias e assets da pasta AVLS-ANTIGO permanecem intactos. O arquivo src/lib/whatsapp.js já tinha alterações locais no início da tarefa e não foi editado; o número vigente +55 21 97505-5263 foi preservado.

## Animações e performance

- Reveal com fade e deslocamento pequeno; Hero com delays de 0.08 a 0.24s.
- Cards com entrada de 18px e stagger de 0.06s entre pares.
- Zoom de imagem em hover: 1 para 1.03, apenas CSS.
- Parallax de fundos entre -1.5% e 1.5%, apenas Framer Motion; desativado visualmente no mobile e com movimento reduzido.
- Fundos com gradientes na entrada e saída para continuidade.
- Nenhum vídeo montado na carga inicial; MP4 somente ao clicar em um projeto.
- Player desmontado ao fechar o modal.
- Nenhuma dependência adicionada ao projeto e nenhuma alteração em backend, configuração do Vite ou scripts de publicação.
- Inter, Sora e os tokens de cor originais preservados.

## Validação

Build de produção e lint concluídos sem erros. JavaScript: 406.47 kB (134.05 kB gzip), ante 542.51 kB no build inicial; CSS: 100.00 kB (18.24 kB gzip). Sem aviso de bundle acima de 500 kB.

Todos os 22 assets responderam corretamente no servidor: imagens 200 com MIME correto e MP4 206 para requisições por intervalo, inclusive Paciência. As imagens e os arquivos de dados não apresentam alterações no Git.

Os testes locais de navegador usam Playwright em uma pasta temporária fora do repositório e Chrome headless. Não foi adicionada ferramenta de testes às dependências do site. As capturas e o relatório detalhado ficam em C:/Users/Ramsés/.codex/tmp/avls-visual-check/.

Validação final no build de produção: 1440×900, 390×844 e 320×740. Zero erros/avisos de console, zero 404 e ausência de overflow horizontal em todas as seções. Todos os seis cards exibiram JPG existentes e todos os seis players abriram com poster correspondente, sem erro de mídia. Filtros Todos/Social Media/Reels, navegação móvel, mudança de projeto em destaque, Escape, desmontagem do player e retorno de foco ao card aprovados. Movimento reduzido manteve o conteúdo visível imediatamente. Zero requisições MP4 no carregamento inicial.

## Integração da atualização remota antes da publicação

Preservado o commit 8444aef, que adicionou o vídeo otimizado videos/avls-hero.mp4 (1.31 MB). O Hero agora reutiliza esse fundo, com imagem estática existente como poster/fallback. É o único vídeo de fundo inicial; os seis MP4 dos projetos continuam sob demanda. O fundo pausa fora da viewport, quando a aba fica oculta ou pelo controle de pausa, e não é montado com movimento reduzido ou economia de dados. O arquivo MP4 bruto sem referências permanece fora do commit.
