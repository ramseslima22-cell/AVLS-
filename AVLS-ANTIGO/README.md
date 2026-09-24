# AVLS — site institucional

Aplicação React + Vite independente do editor Horizon, organizada com npm workspaces em `apps/web`. O site é estático: não possui backend, banco de dados ou login.

## Desenvolvimento

Use Node 24 (linha indicada em `.nvmrc`) e o npm que acompanha o Node. As dependências requerem Node 22.12 ou superior.

Na raiz do projeto:

```sh
npm ci
npm run dev
```

Abra o endereço exibido pelo Vite, normalmente http://127.0.0.1:3000. O servidor escuta apenas a máquina local. Caso a porta esteja ocupada, confira a porta alternativa exibida. Após a migração, reinicie qualquer servidor iniciado com a configuração anterior.

Os comandos funcionam em Windows e Linux:

| Comando | Função |
| --- | --- |
| `npm run dev` | Desenvolvimento com atualização automática |
| `npm run lint` | Verificação de erros pelo ESLint |
| `npm run lint:warn` | Verificação incluindo avisos |
| `npm run build` | Gera `llms.txt` e o site em `dist/apps/web` |
| `npm run preview` | Serve o build local para conferência |
| `npm start` | Alias do preview local; exige build anterior |

O preview não é servidor de produção. Não são necessárias variáveis de ambiente nem credenciais para as funcionalidades atuais.

## Onde editar

- `apps/web/src/pages/HomePage.jsx`: ordem e composição das seções.
- `apps/web/src/components/`: conteúdo, layout e interações.
- `apps/web/src/data/projects.js`: projetos e filtros.
- `apps/web/src/data/videos.js`: vídeos e capas.
- `apps/web/src/lib/whatsapp.js`: telefone e mensagem padrão.
- `apps/web/src/index.css` e `tailwind.config.js`: tema, cores e fontes.
- `apps/web/public/`: imagens e vídeos, servidos pela raiz da URL.
- `apps/web/public/images/avls-logo.jpg`: logotipo original, agora local.
- `apps/web/index.html`: favicon e metadados iniciais para buscadores e compartilhamento.
- `HomePage.jsx` e `components/Seo.jsx`: metadados gerenciados pelo React. Mantenha os textos equivalentes aos do HTML inicial.

O formulário somente abre o WhatsApp com uma mensagem preenchida. O visitante ainda precisa enviar a mensagem. Não há cadastro de leads, envio de e-mail ou confirmação de entrega.

As fontes Inter/Sora continuam carregadas do Google Fonts. Os contatos continuam dependendo do WhatsApp.

## Build e publicação

1. Na raiz, execute `npm ci`, `npm run lint` e `npm run build`.
2. Confira o resultado com `npm run preview`.
3. Publique **somente o conteúdo de `dist/apps/web`** em uma hospedagem de arquivos estáticos.
4. Configure domínio e HTTPS na hospedagem. Nunca publique a raiz do repositório, `node_modules`, backups ou logs.
5. Sirva arquivos existentes diretamente, com os MIME types corretos. Assets ausentes, principalmente MP4, devem retornar 404, não o HTML da aplicação.
6. A aplicação atual tem apenas a rota `/`, com seções por âncora. Se forem adicionadas rotas, configure o fallback de navegação para `index.html` e uma página 404 no React.
7. Use cache longo/imutável para `assets/`, cujos nomes têm hash, e revalidação para `index.html`. Imagens de `public/` não têm hash: use revalidação ou renomeie ao substituí-las.
8. Guarde o artefato da versão anterior para permitir reversão.

A configuração atual pressupõe publicação na raiz de um domínio. Hospedar em subdiretório exige revisar `base`, o roteador e os caminhos absolutos de mídia.

O domínio, a hospedagem, a imagem social definitiva e os cabeçalhos HTTP devem ser definidos antes do lançamento. Uma política CSP deve considerar Google Fonts e os estilos utilizados pela aplicação; valide-a no destino antes de ativar bloqueios.

Referência: [publicação estática no Vite](https://vite.dev/guide/static-deploy.html).

## Git e integração contínua

O repositório Git já existia antes da migração. Configure o remoto desejado quando for versionar externamente. Não é necessário executar `git init` novamente.

Versione o código, `package.json`, `package-lock.json` e as imagens locais. O `.gitignore` protege dependências, build, arquivos de ambiente, diário e backup de migração. Arquivos já versionados continuam rastreados mesmo depois de entrarem no ignore; a exportação original `app.tar.gz` foi preservada.

O workflow `.github/workflows/ci.yml` executa instalação, auditoria de dependências, lint e build em Windows e Linux quando o projeto for enviado ao GitHub. Os builds ficam disponíveis como artefatos por 14 dias. O workflow não publica o site.

Referências: [checkout](https://github.com/actions/checkout), [setup-node](https://github.com/actions/setup-node), [upload-artifact](https://github.com/actions/upload-artifact).

## O que mudou na migração

- Removidos os plugins de edição visual, preview PocketBase, páginas, iframe e diário de desenvolvimento.
- Removidas as interceptações de console/fetch, mensagens ao Horizon e injeção de banner.
- Logotipo servido localmente; favicon aponta para esse mesmo arquivo.
- Configuração do Vite reduzida ao React, alias, servidor local e saída do build.
- Scripts compatíveis com Windows/Linux; `llms.txt` passa a ser gerado corretamente no Windows, sem mascarar erros.
- Removidas declarações diretas de ferramentas exclusivas do editor e o coordenador `concurrently`; as versões da aplicação foram preservadas. Apenas sete dependências transitivas de desenvolvimento foram atualizadas para corrigir os alertas de baseline-browser-mapping, browserslist e js-yaml.
- Corrigidas as referências obsoletas do Knip.
- Adicionados metadados ao HTML inicial, documentação e CI.

Os 55 componentes de UI foram preservados deliberadamente: apenas dois estão no caminho ativo, mas a remoção dos demais pode alterar a geração do CSS pelo Tailwind. A limpeza adicional é opcional e deve ser acompanhada de comparação visual. Execute o Knip como diagnóstico, não como autorização automática para excluir arquivos.

## Verificações e pendências

Validados nesta migração: instalação limpa com `npm ci` em diretório isolado, lint e build na pasta principal e na instalação limpa, respostas HTTP do desenvolvimento e preview, ausência das integrações antigas no HTML e `npm audit` com zero vulnerabilidades reportadas. Os dois builds finais produziram assets idênticos. O CI foi configurado, mas ainda não executado no GitHub.

Na migração, o build original e o independente foram comparados: CSS idêntico byte a byte e JavaScript idêntico após normalizar exclusivamente a URL do logotipo. Isso confirma a preservação do código empacotado, mas não substitui testes visuais em navegador.

Não havia navegador de teste conectado na sessão. Antes do lançamento, confira desktop e celular, menu, âncoras, filtros, modais e abertura do WhatsApp. Use dados fictícios; não é necessário enviar mensagens para testar a URL.

Os arquivos abaixo já estavam ausentes na exportação e precisam ser fornecidos para reproduzir os vídeos:

- `apps/web/public/videos/video-1.mp4`
- `apps/web/public/videos/video-2.mp4`
- `apps/web/public/videos/video-3.mp4`

As capas e os cards foram preservados. Não foram inventados vídeos substitutos.

A cópia local anterior à migração fica em `.migration-backup/horizon-original/`, e o build de referência em `.migration-backup/baseline-dist/`. Ambos são ignorados pelo Git. O commit original também permanece no histórico. O diário preexistente em `vault/` foi preservado e ignorado; seu plugin foi removido. Uma aba aberta com o código antigo deve ser recarregada após reiniciar o servidor.

Não houve publicação, criação de remoto, push nem alteração do histórico Git.

## Escritório 3D e interface

O fundo principal é agora uma cena tridimensional renderizada em tempo real com Three.js, React Three Fiber e Drei. O escritório é construído com geometria 3D, materiais, iluminação, sombras, janela, cidade, mesa, monitor, notebook, estante, plantas e objetos decorativos. A foto `apps/web/public/images/avls-workspace.jpg` é usada somente como fallback para dispositivos sem WebGL, economia de dados ou preferência por movimento reduzido.

A implementação está em `apps/web/src/components/office3d/`. `OfficeScene.jsx` reúne a geometria e a câmera cinematográfica, enquanto `OfficeExperience.jsx` controla carregamento, compatibilidade, versão móvel e fallback. A câmera percorre pontos do escritório de acordo com o progresso global da rolagem e reage discretamente ao ponteiro.

Os painéis do site usam superfícies translúcidas sobre a cena, mantendo contraste para textos, formulários e controles. Os cards continuam usando `DepthSurface`, e as pastas permanecem em `components/Folder.jsx` e `components/Folder.css`, com o mesmo conteúdo de `src/data/projects.js`.

Para substituir futuramente a cena procedural por um modelo criado no Blender, exporte um GLB otimizado para `apps/web/public/models/avls-office.glb` e carregue-o em `OfficeScene.jsx` com `useGLTF`. Comprima texturas, reduza polígonos e mantenha a cena procedural como fallback antes de publicar.
