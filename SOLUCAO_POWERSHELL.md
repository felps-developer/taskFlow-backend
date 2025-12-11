# Solução para Problema de Política de Execução do PowerShell

## Problema
```
npm : O arquivo C:\Program Files\nodejs\npm.ps1 não pode ser carregado porque a execução de scripts foi desabilitada neste sistema.
```

## Soluções

### Solução 1: Usar CMD ao invés do PowerShell (Mais Rápida)
Execute os comandos npm usando o CMD:

```bash
cmd /c npm install
cmd /c npm run start:dev
```

Ou simplesmente abra o **Prompt de Comando (CMD)** ao invés do PowerShell.

### Solução 2: Alterar Política de Execução do PowerShell (Permanente)

Abra o PowerShell **como Administrador** e execute:

```powershell
Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope CurrentUser
```

Ou para permitir todos os scripts (menos seguro):

```powershell
Set-ExecutionPolicy -ExecutionPolicy Bypass -Scope CurrentUser
```

### Solução 3: Usar o Script .bat Criado

Execute o arquivo `install.bat` que foi criado no projeto:

```bash
.\install.bat
```

### Solução 4: Executar PowerShell com Bypass Temporário

Execute o PowerShell com bypass apenas para a sessão atual:

```powershell
powershell -ExecutionPolicy Bypass -File .\script.ps1
```

## Recomendação

Para este projeto, a **Solução 1** (usar CMD) é a mais simples e não requer alterações de segurança no sistema.

### Comandos Úteis com CMD:

```bash
# Instalar dependências
cmd /c npm install

# Rodar em desenvolvimento
cmd /c npm run start:dev

# Executar migrations
cmd /c npm run db:migrate

# Executar seeds
cmd /c npm run db:seed

# Ou simplesmente use o Docker (recomendado)
docker-compose up --build
```

## Verificar Política Atual

Para ver a política atual do PowerShell:

```powershell
Get-ExecutionPolicy -List
```

