<p align="center">
  <img src="/src/assets/petGuardianLogoLight.png" alt="Logo da Pet Guardian" width="240"/>
</p>
  
<h1 align="center">🐾 Pet Guardian - Monitoramento IoT de Pets</h1>
<h4>
  Sistema de monitoramento de saúde em tempo real para pets, desenvolvido com ESP32 e sensores de temperatura e frequência cardíaca. Os dados são exibidos em um display LCD e enviados para uma API REST.
</h4>
<h4>
  O app utiliza armazenamento local com AsyncStorage para salvar os dados do responsável, os dados do pet e recuperar essas informações mesmo depois que o aplicativo é reiniciado.
</h4>

---

## 👥 Integrantes do Grupo
<table>
  <tr>
    <td width="130">
      <img src="https://github.com/moisesBarsoti.png" width="120" style="border-radius: 50%;"/>
    </td>
    <td>
      <b>Moisés Barsoti Andrade de Oliveira</b><br/>
      <b>RM:</b> 565049 &nbsp;&nbsp;|&nbsp;&nbsp;<b>Turma:</b> 2TDSPG - FIAP <br/>
    </td>
  </tr>
  <tr>
    <td width="130">
      <img src="https://github.com/sSofia-s.png" width="120" style="border-radius: 50%;"/>
    </td>
    <td>
      <b>Sofia Siqueira Fontes</b><br/>
      <b>RM:</b> 563829 &nbsp;&nbsp;|&nbsp;&nbsp;<b>Turma:</b> 2TDSPG - FIAP <br/>
    </td>
  </tr>
  <tr>
    <td width="130">
      <img src="https://github.com/manuelalacerda.png" width="120" style="border-radius: 50%;"/>
    </td>
    <td>
      <b>Manuela de Lacerda Soares</b><br/>
      <b>RM:</b> 564887 &nbsp;&nbsp;|&nbsp;&nbsp;<b>Turma:</b> 2TDSPG - FIAP <br/>
    </td>
  </tr>
</table>

---

## 🛠️ Tecnologias Utilizadas
| Categoria                    | Tecnologias                                                       |
| ---------------------------- | ----------------------------------------------------------------- |
| **Desenvolvimento Mobile**   | React Native • TypeScript • Expo                                  |
| **Navegação**                | React Navigation • Native Stack Navigator • Bottom Tabs Navigator |
| **Armazenamento Local**      | AsyncStorage                                                      |
| **Interface e Estilização**  | Expo Vector Icons • Expo Google Fonts                             |

---

## 📁 Estrutura de Pastas
```text
PetGuardian-Mobile-Sprint1/
├── android/
├── ios/
├── src/
│   ├── assets/
│   ├── components/
│   ├── navigation/
│   ├── screens/
│   ├── styles/
│   └── types/
├── .gitattributes
├── .gitignore
├── app.json
├── App.tsx
├── babel.config.js  
├── index.js
├── metro.config.js
├── package-lock.json
├── package.json
└── tsconfig.json
```

---

## ▶️ Como Executar o Projeto

### ⚠️ Pré-requisitos
Antes de executar, é necessário ter instalado:
- Node.js
- npm
- Expo CLI ou ambiente Expo configurado
- Android Studio com emulador Android, ou um dispositivo físico com Expo Go instalado

### Instalação
Clone o repositório e instale as dependências:
```bash
npm install
```

### Executar
Para executar o projeto:
```bash
npx expo start
```
Selecione o local onde deseja executar o app digitando a letra correspondente no terminal.

### Executar no Android
Também é possível iniciar o projeto com:
```bash
npx expo start -a 
```
Para abrir o app diretamente em seu dispositivo.

---

## 🎥 Vídeo de demonstração
Clique aqui para assistir ao vídeo de demonstração: [Pet Guardian - Aplicativo Mobile](https://www.youtube.com)

[![Pet Guardian - Aplicativo Mobile](https://img.youtube.com/vi/PnYiN1Zg5eQ/0.jpg)](https://www.youtube.com)

---
