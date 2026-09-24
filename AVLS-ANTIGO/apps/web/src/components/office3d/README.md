# Escritório AVLS

O cenário é o arquivo original em public/models/modern-office.glb (26.864.328 bytes), carregado por useGLTF. O antigo escritório procedural foi removido. Não há dependências novas nem assets remotos.

## Inventário inspecionado

O GLB agrupa objetos por material, não por móveis individuais:

- Window_Structure_0: paredes, piso, teto e esquadrias (atlas compartilhado).
- Window_Window_0 / Window_Backdrop_0: vidro e fundo da janela em x = -2,37.
- Window_Table_0: mesa, tampo em y = 0,720 após o ajuste de piso.
- Window_Chair_0: cadeira em frente à mesa.
- Window_Plant_0: planta junto à janela.
- Window_Books_0: livros/cadernos sobre a mesa.
- Window_Table Decoration_0: decoração e materiais de escrita.
- Window_Lights_0: luminárias pendentes.
- Window_Painting_0: quadro; sua textura foi substituída por arte abstrata AVLS, preservando o mesh.

Não há monitor ou notebook no arquivo. AvlsLaptop.jsx adiciona somente um notebook em escala de 38 cm, com teclado e tela desenhados em texturas locais. Não foram duplicados móveis nem plantas.

## Câmera

Edite CAMERA_SHOTS em officeConfig.js. Cada entrada contém section (ID HTML), position [x,y,z], target [x,y,z] e fov em graus. Os valores usam metros e piso y=0. MODEL_FLOOR_OFFSET preserva a escala e orientação do arquivo original.

O movimento percorre início, serviços, trabalhos, sobre (transição) e contato. As posições são medidas pelas seções reais e recalculadas ao alterar o layout. Suavização atua no progresso do percurso: pular para uma âncora não cria um atalho através dos móveis. No celular muda apenas o FOV; não se desloca a câmera para fora das paredes.

Limites úteis: janela x=-2,37; parede oposta x=3,42; paredes laterais z=±2,20; teto y=3,08. Mesa x=±0,336 e z=±1,11. Evite alterar as posições sem repetir a verificação geométrica.

## Materiais e iluminação

Edite MATERIAL_OVERRIDES em officeConfig.js pelos nomes exatos dos materiais. color multiplica as texturas originais; roughness controla o acabamento; metalness o metal; emissiveIntensity equilibra a iluminação já gravada nas texturas. Não elevar a emissão para 1: isso volta a achatar os volumes.

Structure compartilha atlas entre madeira, paredes e esquadrias: recolorir o material inteiro também altera esses elementos. O GLB original fica intacto; meshes, materiais e texturas de personalização são preparados em OfficeModel.jsx. HIDDEN_MESHES aceita nomes exatos para esconder elementos sem destruir o arquivo.

OfficeScene.jsx define luz natural vinda da janela. OfficeExperience.jsx fixa ACESFilmicToneMapping e exposição 0,95. Não há névoa ou overlay branco. Cards e textos conservam as superfícies opacas existentes do site.

## Desempenho e fallback

Preferências são verificadas antes de montar o Canvas: sem WebGL2, economia de dados ou movimento reduzido, nenhum download do GLB é iniciado. A foto estática existente permanece durante download/decodificação e em falhas. Não há preload global. Mudanças nas preferências são acompanhadas em tempo real.

Mobile: DPR 1, sem sombras, sem antialias, texturas clonadas limitadas a 1024 px. O download continua sendo o mesmo GLB original de 26 MB; a redução é no custo de GPU, não no tamanho transferido. Desktop: DPR máximo 1,5 e um shadow map de 1024 px. Canvas usa frameloop demand e para de renderizar quando a câmera estabiliza.

## Verificação

Na raiz: npm run build e npm run lint.
Na pasta apps/web: node tools/verify-office.mjs.

A verificação lê o GLB, inventaria meshes e materiais, testa os segmentos do percurso e 404 amostras com raios de proximidade em 26 direções (12 cm), e confere URLs do crédito. Não substitui inspeção visual em desktop/celular; não havia navegador conectado durante esta integração.

## Créditos

Modern Office — dylanheyes — https://skfb.ly/oDPCS
Licença CC BY 4.0 — http://creativecommons.org/licenses/by/4.0/
Crédito e indicação das adaptações em Footer.jsx, visíveis também no celular.
