# AnimatedFolder

Pasta animada em React com frames saindo de dentro da pasta, animação ao abrir e movimento sutil dos frames.

## Importação

Copie `AnimatedFolder.jsx` e `AnimatedFolder.css` para o projeto e importe o componente:

```jsx
import AnimatedFolder from './AnimatedFolder';
```

O componente importa seu CSS automaticamente.

## Props

- `title`: texto principal da pasta.
- `eyebrow`: texto pequeno acima do título.
- `subtitle`: instrução quando fechada.
- `closeSubtitle`: instrução quando aberta.
- `openLabel` / `closeLabel`: rótulos acessíveis do controle.
- `color`: cor da pasta em hexadecimal.
- `size`: escala da pasta; padrão `3`.
- `onClick`: callback ao clicar na pasta. Sem `href`, o clique também abre/fecha a animação.
- `href`: torna a pasta um link.
- `projectCount`: quantidade opcional, exposta como `data-project-count`.
- `className`: classes adicionais no elemento raiz.
- `children`: frames React exibidos dentro da pasta.
- `items`: alternativa a `children`, como array de elementos React.
- `previews`: array de objetos com `src`, `image` ou `thumbnail`, e opcionalmente `alt`, `title`, `label`, `href` ou `onClick`.
- `thumbnail` ou `image`: imagem única opcional para usar como preview.
- `frame`: elemento React único opcional para usar como preview.

São mostrados no máximo três frames. Os elementos passados em `children`, `items` e `frame` devem ser conteúdo React; o componente não depende de dados ou componentes externos.

## Exemplo

```jsx
<AnimatedFolder
  title="Social Media"
  eyebrow="AVLS / PORTFOLIO"
  subtitle="Explorar projetos +"
  color="#8b684a"
  projectCount={2}
  previews={[
    { src: '/media/projeto-1.jpg', alt: 'Projeto 1', title: 'Projeto 1' },
    { src: '/media/projeto-2.jpg', alt: 'Projeto 2', title: 'Projeto 2' },
  ]}
  onClick={() => console.log('Pasta selecionada')}
/>
```

## Dependências

Requer React e React DOM. Não depende de bibliotecas de animação nem de componentes do projeto original. Inclua a fonte Sora no projeto para reproduzir a tipografia original; sem ela, será usada uma fonte sans-serif de fallback.
