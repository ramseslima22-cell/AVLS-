# AVLS — prévias cinematográficas no Blender

Esta entrega para na aprovação visual. Não altera o frontend nem renderiza a sequência completa.

## Arquivos

- Original preservado: apps/web/public/models/modern-office.glb.
- Cena personalizada, com texturas empacotadas: working/office-cinema/avls-office-preview.blend.
- Inventário e hardware: working/office-cinema/inspection.json.
- Validação geométrica: working/office-cinema/camera-validation.json.
- Quatro renders: working/office-cinema/previews/.
- Amostra de movimento: working/office-cinema/motion/.
- Enquadramento vertical: working/office-cinema/mobile/.
- Galeria, MP4, WebP e estimativa: working/office-cinema/review/index.html.
- Quadros do vídeo fornecido: working/office-cinema/reference/.

Renders, texturas de trabalho e .blend ficam fora da pasta pública e são ignorados pelo Git.

## Hardware e escolha do motor

Blender 5.2.1 LTS: C:/Program Files/Blender Foundation/Blender 5.2/blender.exe.
AMD FX-6300, 6 threads; 8 GB de RAM; NVIDIA GTX 750 Ti. Cycles CUDA foi testado com render real e funciona. Não foi necessário usar EEVEE. Quatro threads de CPU, denoise na CPU e somente um processo Blender por vez, devido à memória limitada. O denoise em 960 x 540 excedeu a memória física/virtual disponível. A cópia de trabalho usa texturas de até 1024 px, preservando conteúdo e UVs; as quatro prévias usam 640 x 360 e um processo Blender por enquadramento. O GLB original mantém as texturas de 2048 px. nvidia-smi não respondeu; a quantidade de VRAM não foi presumida.

## Repetir as prévias

Na raiz, execute com o Python 3.11 instalado:

    python tools/office-cinema/run_previews.py --motion --mobile

Isso gera as texturas usando a logo real, prepara/salva a cena, verifica o percurso, renderiza quatro imagens, a amostra curta e o vertical, e monta a galeria. Sobrescreve somente os resultados dessa área de trabalho.

Para reutilizar a cena sem reconstruí-la:

    python tools/office-cinema/run_previews.py --skip-prepare --motion --mobile

Use --blender PATH ou BLENDER_EXE para outro Blender; --device CPU é alternativa mais lenta. Não execute renders simultâneos nesta máquina. Pillow, OpenCV e imageio-ffmpeg já estavam instalados; nenhuma dependência foi adicionada ao projeto web.

## Ajustar materiais e câmera

prepare_scene.py contém materiais, luzes e a lista shots: frame, position, target e lens. Coordenadas Blender Z-up em metros, piso z=0. Mesa: aproximadamente 0,67 x 2,22 m, tampo z=0,72; janela x=-2,37. As posições foram escolhidas pelos limites do modelo e revistas em renders.

Os enquadramentos principais são os frames 1, 41, 81 e 121. Interpolação suave sem ultrapassar os limites, validada a cada quadro contra a geometria. A amostra usa apenas os frames 21–32 em 12 fps, em baixa resolução, sem quadros intermediários artificiais. A velocidade da amostra não representa a duração final do scroll.

Atlas úteis preservados; removida a emissão duplicada. Madeira com veio e micro-relevo discretos; pequenos chanfros nos móveis existentes. Arte do quadro substituída. Notebook e xícara adicionados. Tela com a logo real avls-logo.jpg e texto institucional, sem métricas inventadas.

Cadeira e notebook girados para enquadrar a janela e evitar a face aberta do modelo. Chapa de vidro importada e fundo opaco ocultados somente no render para eliminar faixas/reflexos artificiais; esquadrias e paredes preservadas. Vegetação externa derivada da planta original, sem vasos e posicionada junto ao solo.

Cycles, céu físico com espalhamento múltiplo (Blender 5.2), AgX, exposição 0, sem névoa ou overlay branco. Sol em ângulo baixo voltado para a abertura; vegetação externa reduzida para preservar a vista e a luz. Composição vertical renderizada separadamente, com sensor horizontal para preservar o computador. A galeria ilustra uma área HTML delimitada e opaca para texto no celular.

## Etapa seguinte

review/estimate.json extrapola os tempos e tamanhos realmente medidos. Proposta inicial: 121 quadros em 1280 x 720 para desktop, sujeitos à aprovação e a renderização em blocos com sobreposição. O denoise do quadro inteiro em 960 x 540 excedeu a memória disponível, portanto 1280 x 720 não foi validado em quadro inteiro. A estimativa reserva custo extra para os blocos, ainda não medido; retrato tem orçamento adicional. Implementação de canvas por scroll, carregamento progressivo, cache limitado, fallback e desligamento do WebGL antigo pertencem à etapa posterior. O build disponível na raiz é npm run build; será executado após essa integração.

## Créditos

Modelo 3D “Modern Office” por dylanheyes — CC BY 4.0. Adaptado para AVLS.
Modelo/autor: https://skfb.ly/oDPCS
Licença: https://creativecommons.org/licenses/by/4.0/

Atribuição mantida no site existente, na galeria e no .blend. Modificações: materiais, luz, orientação da estação, notebook/tela, café, quadro, vegetação derivada e trajetória. O GLB original permanece intacto.

Os metadados de atribuição originais do GLB também estão preservados em ATTRIBUTION.md.
