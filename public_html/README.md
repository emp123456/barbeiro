# Royal Cuts - Site HTML Estático

Este é o site HTML estático da barbearia Royal Cuts, convertido do projeto React/TypeScript original.

## Estrutura de Arquivos

```
public_html/
├── index.html              # Página principal
├── assets/
│   ├── css/
│   │   └── style.css       # Estilos CSS (convertido do Tailwind)
│   ├── js/
│   │   └── script.js       # JavaScript para funcionalidades interativas
│   └── img/                # Imagens do site
│       ├── hero-barber.jpg
│       ├── about-interior.jpg
│       ├── service-haircut.jpg
│       ├── service-beard.jpg
│       ├── service-shave.jpg
│       ├── gallery-1.jpg
│       ├── gallery-2.jpg
│       ├── gallery-3.jpg
│       └── gallery-4.jpg
└── README.md               # Este arquivo
```

## Funcionalidades

### Navegação
- Menu responsivo com hambúrguer para mobile
- Navegação suave entre seções
- Efeito de scroll na navbar

### Seções
1. **Hero** - Seção principal com call-to-action
2. **Serviços** - Cards dos serviços oferecidos
3. **Galeria** - Grid de imagens com efeitos hover
4. **Sobre** - Informações da barbearia com estatísticas
5. **Agendamento** - Formulário de contato funcional
6. **Footer** - Links e informações de contato

### Interatividade
- Formulário de agendamento com validação
- Animações CSS com Intersection Observer
- Efeitos hover em cards e galeria
- Toast notifications
- Formatação automática de telefone
- Botão "voltar ao topo"

### Design
- Tema escuro com acentos dourados
- Gradientes personalizados
- Animações suaves
- Design responsivo
- Tipografia moderna

## Tecnologias Utilizadas

- **HTML5** semântico
- **CSS3** com variáveis customizadas
- **JavaScript** vanilla (ES6+)
- **SVG** para ícones
- **CSS Grid** e **Flexbox** para layout

## Como Usar

1. Abra o arquivo `index.html` em qualquer navegador moderno
2. Para desenvolvimento, use um servidor local (ex: Live Server no VS Code)
3. Todas as funcionalidades são client-side, não requer backend

## Recursos Convertidos

### Do React/TypeScript para HTML/CSS/JS:
- ✅ Componentes React → HTML semântico
- ✅ Tailwind CSS → CSS customizado
- ✅ Hooks React → JavaScript vanilla
- ✅ TypeScript → JavaScript ES6+
- ✅ React Router → Navegação suave
- ✅ Formulários → Validação JavaScript
- ✅ Animações → CSS + Intersection Observer

## Compatibilidade

- ✅ Chrome 80+
- ✅ Firefox 75+
- ✅ Safari 13+
- ✅ Edge 80+
- ✅ Mobile responsivo

## Performance

- Imagens otimizadas
- CSS minificado
- JavaScript modular
- Carregamento assíncrono
- Preload de recursos críticos
