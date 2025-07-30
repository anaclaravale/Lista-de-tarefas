import './App.css'
import Listar from './components/Listar'

function App() {

  return (
    <>
      <Listar/>
    </>
  )
}

export default App


import './App.css'
import EffectAPI from './components/EffectAPI'
import RepoJson from './components/RepoJson'
import CountClicks from './components/CountClicks'


function App() {

  return (
    <>
      <CountClicks/>
      {/* <EffectAPI /> */}
      {/* <RepoJson /> */}
    </>
  )
}

export default App

// Muda o fundo de acordo com a palavra: // Componente que altera o fundo do aplicativo a medida que o usuário insere dados em um input
// import { useState, useEffect } from "react";
// import "./BackgroundInput.css"; // Importando o CSS para o componente
// export default function BackgroundInput() {
//     // Estado para armazenar o valor do input
//     const [inputValue, setInputValue] = useState("");

//     // Efeito para alterar o fundo do body com base no valor do input
//     useEffect(() => {
//         if (inputValue) {
//             document.body.style.backgroundColor = inputValue;
//         } else {
//             document.body.style.backgroundColor = ""; // Reseta o fundo se o input estiver vazio
//         }
//         // Limpeza ao desmontar
//         return () => {
//             document.body.style.backgroundColor = "";
//         };
//     }, [inputValue]);

//     // Função para lidar com a mudança do input
//     const handleChange = (event) => {
//         setInputValue(event.target.value);
//     };

//     return (
//         <input 
//             type="text" 
//             value={inputValue} 
//             onChange={handleChange} 
//             placeholder="Digite uma cor ou código hexadecimal" 
//         />
//     );
// }

// BuscarPorID:import { useEffect, useState } from "react";
// import RecarregarBotao from "./RecarregarBotao"; // Está sendo importado do mesmo diretório

// export default function BuscarPorID() {
//   const [userId, setUserId] = useState(1);
//   const [albuns, setAlbuns] = useState([]);

//   useEffect(() => {
//     fetch(`https://jsonplaceholder.typicode.com/albums?userId=${userId}`)
//       .then((res) => res.json())
//       .then((data) => setAlbuns(data));
//   }, [userId]);

//   const handleInputChange = (e) => {
//     const valor = parseInt(e.target.value);
//     if (valor >= 1 && valor <= 10) {
//       setUserId(valor);
//     }
//   };

//   return (
//     <div>
//       <h2>Buscar Álbuns por userId</h2>
//       <input
//         type="number"
//         min="1"
//         max="10"
//         value={userId}
//         onChange={handleInputChange}
//         placeholder="Digite um número de 1 a 10"
//       />

//       <ul>
//         {albuns.map((album) => (
//           <li key={album.id}>{album.title}</li>
//         ))}
//       </ul>

//       {/* Aqui o botão recebe o userId como prop */}
//       <RecarregarBotao userId={userId} />
//     </div>
//   );
// }


// export default function RecarregarBotao({ userId }) {
//     const handleClick = () => {
//       fetch(`https://jsonplaceholder.typicode.com/albums?userId=${userId}`)
//         .then((res) => res.json())
//         .then((data) => {
//           console.log(`Álbuns recarregados para userId ${userId}:`, data);
//         });
//     };
  
//     return (
//       <div>
//         <h2>Recarregar Posts do userId {userId}</h2>
//         <button onClick={handleClick}>Recarregar (ver console)</button>
//       </div>
//     );
//   }


// import { useEffect, useState } from "react";

// export default function BuscaPorID() {
//   const [userId, setUserId] = useState(1);
//   const [albuns, setAlbuns] = useState([]);

//   useEffect(() => {
//     fetch(`https://jsonplaceholder.typicode.com/albums?userId=${userId}`)
//       .then(res => res.json())
//       .then(data => setAlbuns(data))
//       .catch(err => console.error("Erro ao buscar álbuns:", err));
//   }, [userId]); // dispara quando o userId muda

//   const handleInputChange = (e) => {
//     const valor = parseInt(e.target.value);
//     if (valor >= 1 && valor <= 10) {
//       setUserId(valor);
//     }
//   };

//   return (
//     <div>
//       <h2>Buscar Álbuns por userId</h2>
//       <input
//         type="number"
//         min="1"
//         max="10"
//         value={userId}
//         onChange={handleInputChange}
//         placeholder="Digite um número de 1 a 10"
//       />
//       <ul>
//         {albuns.map((album) => (
//           <li key={album.id}>{album.title}</li>
//         ))}
//       </ul>
//     </div>
//   );
// }