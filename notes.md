## O que fazer?

1. ~~Reentender a arquitetura proposta anteriormente~~
2. Encontrar um template de dashboard simples e responsivo
3. Definir quais serão as features a serem implementadas na PoC
4. Pensar nas US
5. Pensar nos diagramas de classe, implantação e componentes
6. Pensar nos atributos de qualidade
7. Escrever o documento arquitetural
8. Montar os slides da apresentação
9. Fazer video mostrando a PoC funcionando
10. Atentar a referencias!

## Decisões

- PoC com dash simples (responsivo)
  - mocks para simular legados
    - SGE
    - Anti-corruption layer p/ comunicar com o SGE
  - ACL para o acesso do dashboard
    - users hardcoded
  - Rastrear mercadoria
    - trajetos
    - nova rota
    - atraso
    - status
    - previsão de entrega
  - Atualizar entrega
    - só uma role especifica
- Usar tecnologias familiares dos colaboradores
- Propor isolamento do SAF
- Passar pela seção "Restrições e Requisitos Arquiteturais" para ver se esta sendo atendido
- Ser hospedado em nuvem híbrida, sendo a forma de hospedagem documentada;
