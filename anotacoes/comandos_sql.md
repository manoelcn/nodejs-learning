# 📚 Principais Comandos MySQL
Um guia rápido dos comandos essenciais para trabalhar com MySql.

## 🛠️ Comandos básicos de estrutura

**Criar banco de dados**
```sql
CREATE DATABASE nome_do_banco;
```

**Usar um bando de dados**
```sql
USE nome_do_banco;
```

**Excluir bando de dados**
```sql
DROP DATABASE nome_do_banco;
```

## 📊 Trabalhando com tabelas

**Criar Tabela**
```sql
CREATE TABLE usuarios(
    id INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(100) NOT NULL,
    email VARCHAR(100) UNIQUE,
    idade INT,
    data_cadastro TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

**Ver tabelas existentes**
```sql
SHOW TABLES;
```

**Excluir tabela**
```sql
DROP TABLE nome_da_tabela;
```

**Ver estrutura da tabela**
```sql
DESCRIBE nome_da_tabela;
```

## ✨ CRUD (operações básicas)

**Inserir dados (CREATE)**
```sql
INSERT INTO usuarios (nome, email, idade)
VALUES ('Manoel Cândido', 'manoel@email.com', 19);
```

**Ler dados (READ)**
```sql
-- Todos os registros
SELECT * FROM usuarios;

-- Com filtros
SELECT nome, email FROM usuarios WHERE idade > 18;
```

**Atualizar dados (UPDATE)**
```sql
UPDATE usuarios
SET idade = 20, email = 'candido@email.com'
WHERE id = 1;
```

**Deletar dados (DELETE)**
```sql
DELETE FROM usuarios WHERE id = 1;
```

## Consultas úteis

**Ordenar resultados**
```sql
-- Ordena os resultados pelo campo 'preço' em ordem decrescente
SELECT * FROM produtos ORDER BY preco DESC;
```

**Limitar resultados**
```sql
SELECT * FROM produtos LIMIT 10;
```

**Busca com LIKE**
```sql
SELECT * FROM clientes WHERE nome LIKE 'Ana%';
```

**Contar registros**
```sql
SELECT COUNT(*) FROM usuarios;
```

## 🔄 Modificar tabelas existentes

**Adicionar coluna**
```sql
ALTER TABLE usuarios ADD COLUMN telefone VARCHAR(20);
```

**Remover coluna**
```sql
ALTER TABLE usuarios DROP COLUMN telefone;
```

**Modificar coluna**
```sql
ALTER TABLE usuarios MODIFY COLUMN nome VARCHAR(150);
```

## 💡 Dicas importantes:
1. Sempre faça backup antes de usar ``` DROP ``` ou ``` DELETE ```
2. Use ``` WHERE ``` com cuidado em ``` UPDATE ``` e ``` DELETE ```
3. ``` AUTO_INCREMENT ``` cria IDs automáticos
4. ``` NOT NULL ``` força o campo a ter valor
5. ``` UNIQUE ``` não permite valores duplicados