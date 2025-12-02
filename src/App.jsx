import { useState } from 'react'
import { Heart, Trophy } from 'lucide-react'



function App() {
  const [countSofia, setCountSofia] = useState(0)
  const [countEnzo, setCountEnzo] = useState(0)

  // Função para votar na Sofia
  function votarSofia() {
    setCountSofia(countSofia + 1)
    setCountEnzo(countEnzo + 2)
  }

  // Função para votar no Enzo
  function votarEnzo() {
    setCountEnzo(countEnzo + 1)
  }

  // Calcula quem está ganhando para mostrar um efeito visual
  const total = countSofia + countEnzo
  const percentSofia = total === 0 ? 50 : (countSofia / total) * 100
  const percentEnzo = total === 0 ? 50 : (countEnzo / total) * 100

  return (
    <div className='w-screen h-screen flex justify-center items-center bg-fuchsia-200 flex-col font-sans'>
      
      {/* Título com estilo */}
      <div className="mb-6 text-center">
        <h1 className='text-4xl md:text-6xl font-bold text-pink-600 drop-shadow-md flex items-center gap-3'>
           Quem ama mais? <Heart className="text-red-500 fill-red-500 animate-pulse" />
        </h1>
      </div>

      {/* Card Principal */}
      <div className='bg-white/80 backdrop-blur-sm shadow-xl rounded-2xl w-3/4 md:w-3/4 max-w-2xl overflow-hidden flex flex-col border-4 border-pink-300'>
        
        {/* Área da Foto */}
        <div className="h-64 w-full bg-gray-200 relative overflow-hidden group">
          {/* Exemplo de imagem (Troque o src abaixo pela sua variável 'casal' ou caminho da imagem) */}
          <img 
            src="public/casal.jpeg" 
            alt="Casal" 
            className='w-full h-full object-cover transition-transform duration-500 group-hover:scale-110'
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent flex items-end justify-center pb-4">
             <p className="text-white font-bold text-lg">Sofia & Enzo</p>
          </div>
        </div>

        {/* Área de Votação */}
        <div className='p-6 flex flex-col gap-6'>
          
          {/* Barra de progresso da disputa */}
          <div className="w-full h-4 bg-gray-200 rounded-full overflow-hidden flex">
            <div style={{ width: `${percentSofia}%` }} className="bg-pink-500 transition-all duration-500"></div>
            <div style={{ width: `${percentEnzo}%` }} className="bg-blue-500 transition-all duration-500"></div>
          </div>

          <div className="flex justify-between items-center w-full gap-4">
            
            {/* Lado Sofia */}
            <div className="flex flex-col items-center w-1/2">
              <button 
                type="button" 
                onClick={votarSofia}
                className='bg-pink-500 hover:bg-pink-600 active:scale-95 transition-all text-white font-bold py-3 px-6 rounded-full shadow-lg w-full mb-2 cursor-pointer flex justify-center gap-2'
              >
                SOFIA {countSofia > countEnzo && <Trophy size={20} />}
              </button>
              <p className='text-2xl font-bold text-pink-700'>{countSofia}</p>
              <p className="text-xs text-gray-500">pontos de amor</p>
            </div>

            <div className="text-2xl font-bold text-gray-400">VS</div>

            {/* Lado Enzo */}
            <div className="flex flex-col items-center w-1/2">
              <button 
                type="button" 
                onClick={votarEnzo}
                className='bg-blue-500 hover:bg-blue-600 active:scale-95 transition-all text-white font-bold py-3 px-6 rounded-full shadow-lg w-full mb-2 cursor-pointer flex justify-center gap-2'
              >
                ENZO {countEnzo > countSofia && <Trophy size={20} />}
              </button>
              <p className='text-2xl font-bold text-blue-700'>{countEnzo}</p>
              <p className="text-xs text-gray-500">pontos de amor</p>
            </div>

          </div>
        </div>
      </div> 
      
      <p className="mt-8 text-pink-700 font-semibold opacity-70">
        Total de votos: {total}
      </p>     
    </div>
  )
}

export default App