# Boa Entrega

## Conteúdo

- [Boa Entrega](#boa-entrega)
  - [Conteúdo](#conteúdo)
  - [Descrição do trabalho](#descrição-do-trabalho)
  - [Sistemas Legados](#sistemas-legados)
    - [Sistema Administrativo-Financeiro (SAF)](#sistema-administrativo-financeiro-saf)
    - [Sistema de Gestão de Entregas (SGE)](#sistema-de-gestão-de-entregas-sge)
    - [Sistema de Faturamento e Cobrança (SFC)](#sistema-de-faturamento-e-cobrança-sfc)
    - [Portal corporativo](#portal-corporativo)
  - [Descrição dos Módulos da Arquitetura de Microsserviços](#descrição-dos-módulos-da-arquitetura-de-microsserviços)
  - [Gestão de Serviços de Logística (GSL)](#gestão-de-serviços-de-logística-gsl)
  - [Restrições e Requisitos Arquiteturais](#restrições-e-requisitos-arquiteturais)
    - [Requisitos Arquiteturais](#requisitos-arquiteturais)
    - [Requisitos Funcionais](#requisitos-funcionais)
    - [Requisitos Não Funcionais](#requisitos-não-funcionais)

**A escolha da melhor rota é realizada em tempo real utilizando recursos de geoprocessamento, a partir de bases de dados geográficas e mapas providos pela Google**

Para que as rotas sejam definidas faz-se uso de serviços de acesso a dados e roteamento providos por empresas como a própria **Google, Microsoft, Mapservice** e outras.

Diversos fatores influenciam no traçado de uma rota, sendo os três principais:

- A distância entre os endereços considerando as rotas possíveis;
- O custo da rota (em termos de gasto de combustível);
- E o tempo da rota (considerando o horário previsto para entrega).

**Toda entrega deve ser registrada no Sistema de Gestão de Entregas (SGE), até o final do dia do evento.**

Para o triênio que começou este ano as metas gerais definidas são:

1. Realizar todas as entregas com tempo médio inferior a 5 dias úteis;
2. Expandir a atuação para mais 200 municípios de pequeno/médio porte;
3. Passar a atuar na região norte do Brasil, último reduto que ela ainda não cobre, fazendo parcerias com uma empresa aérea e outras empresas de logística terrestre locais;
4. Desenvolver novas parcerias com outras transportadoras, visando complementar sua atuação em lugares onde ela apresenta maketshare inferior a 10%;
5. Fazer convênio com no mínimo 50 novos clientes, preferencialmente do ramo supermercadista;
6. Crescer 10% em termos de faturamento global.

**Visando aprimorar seus processos de gestão a Boa Entrega elaborou um Plano de Metas e Diretrizes para a área de TI, que estabelece como prioridades para o próximo triênio as seguintes ações:**

- Automatizar todos os processos de entrega realizados por ela, visando aprimorar os processos de apuração, conferência e faturamento e manter um nível de remuneração adequado;
- Implementar integrações de seus sistemas com os de suas parceiras, de modo a propiciar que as entregas possam ser realizadas em parceria, em uma ou mais etapas do processo. Essas integrações requerem que os sistemas atuais sejam adaptados e novos componentes sejam incorporados visando a uma maior abertura, que será baseada na **arquitetura orientada a serviços**;
- Utilizar **geotecnologias** em todos os procesos que envolvam localização, de forma a facilitar a identificação e atualização de informações relativas às entregas agendadas e realizadas;
- Tornar viável o uso de todas as tecnologias da informação e softwares necessários para atender às demandas dos clientes, fornecedores e parceiros, conforme definido neste documento.

## Descrição do trabalho

Projetar uma **arquitetura de microsserviços** para a Boa Entrega, contemplando as funcionalidades e recursos que atendam às metas traçadas.

A arquitetura do projeto deverá prover **alta escalabilidade**, com garantia de **segurança no registro de entregas e nas transações financeiras associadas**. Deve-se projetar uma arquitetura totalmente componentizável e baseada em serviços. A integração entre os módulos e seus componentes deve ser contemplada de forma a permitir que os **sistemas legados**, desenvolvidos internamente ou contratados de fornecedores, **funcionem harmonicamente**, em um ambiente computacional único. Também devem ser implantadas as novas soluções, que complementarão o conjunto de tecnologias demandadas.

## Sistemas Legados

O catálogo tecnológico atual da Boa Entrega é composto por sistemas e soluções já implantadas, de diversas áreas de aplicação e em diferentes plataformas computacionais, dentre os quais se destacam:

### Sistema Administrativo-Financeiro (SAF)

Trata-se de uma aplicação baseada em tecnologias **.Net Core** e solução de banco de dados **SQL Server**, consistindo em uma solução de gestão administrativa e financeira completa e escalável, desenvolvida há alguns anos por uma empresa contratada. Este sistema legado **não atende a todas as necessidades de negócio atuais**, devido à **difícil integração com as outras aplicações existentes e por não oferecer suporte à web e a dispositivos móveis**. Assim, deve-se avaliar o que será feito, dentre as possibilidades de sua evolução ou substituição, cabendo à equipe de arquitetura esta decisão.

### Sistema de Gestão de Entregas (SGE)

Este é um produto desenvolvido para **web** por um grupo de técnicos da equipe de TI da própria Boa Entrega. A tecnologia do front-end é **JavaScript**, com interfaces em **HTML** e algumas funcionalidades em **Flutter**. No back-end foi utilizado **PHP**. Esse sistema foi todo construído em **módulos independentes**, com a utilização de alguns **microsserviços** para acesso às bases de dados locais. Foi implementada uma integração de **alto acoplamento com o SAF**, considerando que este não oferecia facilidades de integração. Este aplicativo suporta a **gestão completa das entregas**, permitindo a gestão de todo o processo, tanto na parte de programação e roteamento quanto na função de gestão de estoques.

### Sistema de Faturamento e Cobrança (SFC)

Software também desenvolvido pela equipe própria de TI, permitindo gerir todo o **processo de faturamento** e **acompanhar a cobrança dos valores devidos** junto aos clientes.

### Portal corporativo

Além das soluções apresentadas existem muitas funcionalidades desenvolvidas na forma de componentes, acessíveis por meio de páginas web desenvolvidas em **JavaScript, HTML e CSS**. Nesse portal é possível a colaboradores e clientes, após passarem por uma **validação baseada em usuário/senha**, acessar seletivamente os principais recursos de que necessitam, tais como:

- Conhecer as rotas pré-existentes;
- Escolher rotas;
- Alterar rotas;
- Planejar entregas;
- Acompanhar entregas em andamento;
- Verificar dinamicamente problemas com veículos em rota de entrega.

Todas essas funcionalidades são utilizadas como serviços, muitos dos quais fazem parte do SGE, podendo ser acessados também por meio deste, nas intefaces web e móvel.

## Descrição dos Módulos da Arquitetura de Microsserviços

A arquitetura de microsserviços proposta, será denominada **Gestão de Serviços de Logística (GSL)**. Trata-se de uma proposta arquitetural completa e aderente aos requisitos descritos neste documento, que deverá ser construída pela equipe técnica da Boa Entrega.

## Gestão de Serviços de Logística (GSL)

A solução GSL é um sistema constituído de **quatro módulos funcionais**, que deve incorporar e/ou integrar os recursos existentes nos sistemas SAF, SGE e SFC por meio dos quatro módulos descritos a seguir:

1. **Módulo de Informações Cadastrais**: trata-se de um módulo cujo escopo consiste em **obter e manter informações de clientes, fornecedores, depósitos e mercadorias**. Dentre essas destacam-se: identificação, dados de localização, dados complementares e informações necessárias ao negócio da empresa. Essas informações têm como fonte os próprios fornecedores e clientes, ficando os dados armazenados em Enterprise Information Systems (EIS), com destaque para os sistemas legados aqui apresentados;
2. **Módulo de Serviços ao Cliente**: esta parte do sistema é baseada numa solução de workflow, com o uso de Business Process Management – BPM. Por meio deste módulo é possível **desenhar, analisar e acompanhar** todos os processos de atendimento ao cliente existentes na empresa - tanto os já existentes quanto os que ainda serão implantados, desta forma melhorando o desempenho e a eficiência desses processos;
3. **Módulo de Gestão e Estratégia**: tem como escopo prover a gestão estratégica de todas as atividades da empresa, com indicadores das entregas realizadas e a realizar, na forma de indicadores, representados na forma de planilha e/ou cockpit. Para este módulo será utilizada uma ferramenta de gestã  o corporativa adquirida no mercado;
4. **Módulo de Ciência de Dados - Data Warehouse (DW) e Business Intelligence (BI)**: este módulo do sistema deve utilizar ferramentas adequadas para obtenção, guarda, recuperação e utilização dos dados corporativos pertinentes, com recursos para tratamento de dados massivos (Big Data), mineração dos dados para apoio às tomadas de decisão. Todos os dados deste módulo são obtidos de planilhas e Sistemas Gerenciadores de Bancos de Dados (SGBDs), relacionais ou noSQL. O uso de recursos de um Data Warehouse (DW), nesse contexto, é essencial para o sucesso desta iniciativa;

## Restrições e Requisitos Arquiteturais

O sistema deverá respeitar alguns requisitos arquiteturais elencados como essenciais, com destaque para o **baixo custo da solução e facilidade de uso pelos colaboradores e associados**, com **possibilidades de acesso multicamadas**, em tecnologias web e mobile.

O projeto também deverá apresentar **fácil manutenção dos componentes**, não gerando altos custos futuros. Os padrões tecnológicos definidos pelo modelo arquitetural proposto deverão atender plenamente aos objetivos de **integração dos sistemas legados**, de acordo com a descrição dos módulos, a fim de viabilizar que essa integração ocorra com **baixo acoplamento** e sem a necessidade de substituição dos ativos existentes.

### Requisitos Arquiteturais

- Possuir características de aplicação distribuída: abertura, portabilidade, uso de recursos de rede;
- Atender, de forma seletiva (por perfil) a clientes, fornecedores e colaboradores;
- Ser modular e componentizado, utilizando orientação a serviços;
- Ser de fácil implantação e utilização;
- Ser hospedado em nuvem híbrida, sendo a forma de hospedagem documentada;
- Suportar ambientes web e móveis;
- Possuir interface responsiva;
- Apresentar bom desempenho;
- Apresentar boa manutenibilidade;
- Ser testável em todas as suas funcionalidades;
- Ser recuperável (resiliente) no caso da ocorrência de erro;
- Utilizar APIs ou outros recursos adequados para consumo de serviços;
- Estar disponível em horário integral (24 H), sete dias por semana;
- Ser desenvolvido utilizando recursos de gestão de configuração, com integração contínua.

### Requisitos Funcionais

|  ID  |                                 Descrição                                  | Dificuldade | Prioridade |
| :--: | :------------------------------------------------------------------------: | :---------: | :--------: |
| RF01 |              Autenticação usando credenciais (username/senha)              |      B      |     A      |
| RF02 |                     Suporte a niveis de acesso (roles)                     |      B      |     A      |
| RF03 |                         Suportar CRUD de clientes                          |      B      |     A      |
| RF04 |                       Suportar CRUD de fornecedores                        |      B      |     A      |
| RF05 |                         Suportar CRUD de depósitos                         |      B      |     A      |
| RF06 |                        Suportar CRUD de mercadorias                        |      B      |     A      |
| RF07 |         Suportar o desenho de processos de atendimento ao cliente          |      M      |     A      |
| RF08 |         Suportar a analise de processos de atendimento ao cliente          |      B      |     A      |
| RF09 |      Suportar o acompanhamento de processos de atendimento ao cliente      |      B      |     A      |
| RF10 |            Prover dados analiticos sobre atividades da empresa             |      B      |     A      |
| RF11 |             Expor dados analiticos sobre atividades da empresa             |      B      |     B      |
| RF12 |          Permitir coleta de grande quantidade de dados (Big Data)          |      B      |     A      |
| RF13 |  Permitir recuperação de grande quantidade de dados coletados (Big Data)   |      B      |     B      |
| RF14 | Permitir aplicação de técnicas de mineração nos dados coletados (Big Data) |      B      |     B      |
| RF15 |                         Apresentar bom desempenho                          |      A      |     A      |
| RF16 |                      Apresentar boa manutenibilidade                       |      A      |     A      |
| RF17 |                      Ser integro e tolerante a falhas                      |      A      |     A      |
| RF18 |                Estar disponível em horário integral (24/7)                 |      B      |     A      |

### Requisitos Não Funcionais

|  ID   |                      Descrição                      | Dificuldade | Prioridade |
| :---: | :-------------------------------------------------: | :---------: | :--------: |
| RNF01 |          Implantação automatizada, com CD           |      M      |     A      |
| RNF02 |        Microserviços totalmente desacoplados        |      A      |     A      |
| RNF03 |         Utilizar um provedor de identidade          |      B      |     A      |
| RNF04 |     Não salvar dados sensíveis em _plain text_      |      M      |     A      |
| RNF05 |             Hospedado em nuvem híbrida              |      B      |     A      |
| RNF06 |    Suportar ambientes web e móveis (responsivo)     |      M      |     A      |
| RNF07 |    Ser testável em todas as suas funcionalidades    |      M      |     M      |
| RNF08 | Utilizar recursos de gestão de configuração, com CI |      B      |     B      |
| RNF09 |      Ser auto escalável com base na utilização      |      B      |     A      |
| RNF10 |                 Rodar em containers                 |      B      |     A      |
| RNF11 |         Emitir métricas para monitoramento          |      B      |     B      |
| RNF12 |     Utilizar filas para processamento asincrono     |      B      |     A      |
| RNF13 |     Utilizar padrão Open API para documentação      |      B      |     B      |
