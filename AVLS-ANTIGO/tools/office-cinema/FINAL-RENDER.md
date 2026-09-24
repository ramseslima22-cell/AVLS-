# Render final local e integração

Na raiz do projeto, execute no PowerShell ou CMD:

    .\tools\office-cinema\render-final.cmd

O terminal trabalha sozinho; não depende do Codex. Mantenha o PC ligado e sem suspensão. Para interromper use Ctrl+C; repita o mesmo comando para retomar. Não execute duas instâncias ao mesmo tempo.

Configuração conservadora já testada neste PC: Cycles/CUDA, quatro threads, denoise na CPU, um processo Blender por quadro. Desktop: 121 quadros, 640 × 360, 32 amostras. Celular: 121 quadros, 360 × 640, 16 amostras. Não usa 1280 × 720 nem render em blocos, que não foram validados com a memória disponível. Essa resolução menor limita a nitidez em monitores grandes. Nenhuma nova personalização da cena foi feita.

## Saídas e retomada

- Cena usada: working/office-cinema/avls-office-preview.blend.
- Quadros WebP: apps/web/public/office-sequence/final/726c67a93633/desktop/ e mobile/.
- Progresso, PNGs e logs: working/office-cinema/final/726c67a93633/.
- O identificador da pasta muda se a cena ou configuração mudar, evitando misturar renders diferentes.
- Arquivos completos são validados e pulados. Gravação de WebP, progresso e manifesto é atômica. Interrupções podem exigir repetir apenas o quadro em andamento.
- Cinco quadros aprovados já foram reaproveitados. Restam 237 quadros; nenhuma renderização longa foi iniciada nesta entrega.
- O site usa quatro prévias no desktop e uma imagem estática no celular enquanto a sequência está incompleta.
- Somente quando TODOS os 242 quadros existirem, o script publica manifest.json e executa npm run build. Se o build falhar, repetir o comando reaproveita os quadros e tenta o build novamente.
- A saída consumida pelo site é uma sequência de imagens, não um MP4. Não há vídeo final renderizado.

Para verificar sem renderizar:

    .\tools\office-cinema\render-final.cmd --check

Para apenas reaproveitar prévias e verificar retomada:

    .\tools\office-cinema\render-final.cmd --reuse-only

Se houver erro, consulte o log do quadro indicado no terminal. É possível tentar --device CPU (mais lento), preservando os quadros já concluídos. --blender permite informar outro executável; --no-build omite apenas o build posterior. Pillow já está instalado no Python 3.11 usado pelo comando. Não há novas dependências no site.

## Integração

OfficeExperience envolve apenas o Hero com um trecho sticky. Serviços, portfólio e demais seções continuam na rolagem normal. O canvas avança/retrocede pelo scroll e permanece parado sem interação. Há no máximo dois downloads simultâneos e cache de oito imagens no desktop/cinco no celular. A cena WebGL antiga deixou de ser montada/importada pelo aplicativo.

Fallback estático para prefers-reduced-motion, economia de dados, falha de carregamento e ausência de canvas 2D. Títulos, botões, navegação e WhatsApp continuam em HTML. Créditos permanecem no rodapé e em ATTRIBUTION.md.

Verificação realizada: build, retomada duas vezes com cinco quadros, teste de cache/concorrência e navegador real isolado com as prévias (avanço/retorno/parada, seções, mobile, redução de movimento, economia de dados, erro de manifesto e ausência de download do GLB). A sequência final móvel em movimento só poderá ser conferida depois de existir.

## Arquivos desta etapa

- apps/web/src/App.jsx
- apps/web/src/pages/HomePage.jsx
- apps/web/src/components/Footer.jsx
- apps/web/src/components/office3d/OfficeExperience.jsx
- apps/web/src/components/office3d/office3d.css
- apps/web/src/components/office3d/sequencePlayer.js
- apps/web/public/office-sequence/manifest.json e preview/*.webp
- apps/web/public/office-sequence/final/ (cinco quadros reaproveitados)
- tools/office-cinema/render_final.py
- tools/office-cinema/render-final.cmd
- tools/office-cinema/approved-preview.json
- tools/office-cinema/sequence-player.test.mjs
- tools/office-cinema/verify_scroll.mjs
- tools/office-cinema/FINAL-RENDER.md

Resultados locais e screenshots ficam em working/office-cinema/, fora da pasta pública. O .blend e o GLB original foram preservados nesta etapa.
