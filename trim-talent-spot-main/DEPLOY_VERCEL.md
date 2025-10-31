# Guia de Deploy na Vercel

Este projeto está configurado para ser hospedado na Vercel.

## Opção 1: Deploy via Interface da Vercel (Recomendado)

1. Acesse [vercel.com](https://vercel.com) e faça login
2. Clique em "Add New Project"
3. Importe seu repositório Git (GitHub, GitLab ou Bitbucket)
4. Configure o projeto:
   - **Root Directory**: `trim-talent-spot-main`
   - **Framework Preset**: Vite (será detectado automaticamente)
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
   - **Install Command**: `npm install`
5. Clique em "Deploy"

A Vercel detectará automaticamente o arquivo `vercel.json` e configurará as rotas corretamente.

## Opção 2: Deploy via CLI da Vercel

```bash
# Instalar a CLI da Vercel globalmente
npm i -g vercel

# Navegar para a pasta do projeto
cd trim-talent-spot-main

# Fazer deploy
vercel

# Para produção
vercel --prod
```

## Configurações Importantes

- O arquivo `vercel.json` já está configurado com as rewrites necessárias para o React Router funcionar corretamente
- Todas as rotas serão redirecionadas para `/index.html`, permitindo que o React Router gerencie a navegação
- O build será executado automaticamente usando `npm run build`

## Variáveis de Ambiente

Se você precisar configurar variáveis de ambiente:

1. Acesse as configurações do projeto na Vercel
2. Vá em "Settings" > "Environment Variables"
3. Adicione suas variáveis de ambiente

## Observações

- Certifique-se de que todas as dependências estão listadas no `package.json`
- O projeto usa React Router, então todas as rotas devem ser servidas através do `index.html`
- A configuração já está pronta para funcionar com a Vercel

