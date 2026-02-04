import { useState, useEffect, useRef } from 'react'
import { Heart, Trophy, Music, Play, Pause, SkipForward, Clock, Calendar, Star, Camera } from 'lucide-react'

// --- CONFIGURAÇÕES DO CASAL ---
// 1. Ajuste a data do início do namoro/ficada aqui
const DATA_INICIO_NAMORO = new Date("2025-02-16T00:00:00"); 

// 2. Playlist de músicas
// Coloque os arquivos mp3 na pasta 'public' ou use links diretos
const PLAYLIST = [
  { title: "Nossa Música", url: "/musica1.mp3" }, 
  { title: "Música da Viagem", url: "/musica2.mp3" },
];

// 3. Dados da Jornada (AGORA COM FOTOS!)
// Dica: Coloque as fotos na pasta 'public' e use o nome delas aqui (ex: "/foto-praia.jpg")
const JORNADA = [
  {
    data: "O Início",
    titulo: "Onde tudo começou",
    descricao: "Nosso primeiro beijo, onde tudo começou no dia que voce me mostrou ser incrivel, com uma grande e diveritda conversa na caderia da piscina.",
    foto: "/primeiro_beijo.jpeg", // Usando a foto que você já tem como exemplo
    icone: <Heart className="w-6 h-6 text-red-500" />
  },
  {
    data: "Duda chas",
    titulo: "Dormir juntos",
    descricao: "Esse dia me marcou muito, dia que mais ficamos de casal, e eramos o casal que menos daria certo, mas somos o unicos que sobrevivemos",
    foto: "/casa_duda.jpeg", // Exemplo: Adicione uma foto chamada 'foto-viagem.jpg' na pasta public
    icone: <Heart className="w-6 h-6 text-blue-500" />
  },
  {
    data: "CP ou CPK",
    titulo: "Lugar especial",
    descricao: "Lugar onde mais saimos, lugar onde eu me apaixonei por você, defiinitivamente um lugar especial para nós dois.",
    foto: "/foto_favorita.jpeg", // Exemplo
    icone: <Heart className="w-6 h-6 text-yellow-500" />
  },
  {
    data: "Niver godoy",
    titulo: "Foto fofinha",
    descricao: "Essa foto tinha que estar aqui, amo ela e sei que voce a ama também.",
    foto: "niver_gdy_fofinho.jpeg", // Exemplo
    icone: <Heart className="w-6 h-6 text-green-500" />
  },
  {
    data: "Casal",
    titulo: 'Primeiro "Date"',
    descricao: "Paixão de cristo, pra mim é uma data especial pois pela primeira vez que saimos juntos como um casal sem medo de sermos vistos",
    foto: "primeira_saida_casal.jpeg", // Exemplo
    icone: <Heart className="w-6 h-6 text-cyan-500" />
  },{
    data: "Miguxos",
    titulo: "primeiro? não sei",
    descricao: "Não sei se foi o primeiro miguxos, mas tem que estar aqui, foi muito especial pra mim, pois foi algo que construimos que não havia julgamentos, apenas pura diversão, alegria, respeito e gargalhadas.",
    foto: "miguxos.jpeg", // Exemplo
    icone: <Heart className="w-6 h-6 text-purple-500" />
  },{
    data: "😉😉🙄🙄",
    titulo: "Seu belo biceps",
    descricao: "Mesmo não sendo maior que meu gigantesco biceps, ainda assim o seu é grandinho",
    foto: "seu_biceps_maior.jpeg", // Exemplo
    icone: <Heart className="w-6 h-6 text-fuchsia-500" />
  },{
    data: "Aldeia",
    titulo: "Casa guadalupe",
    descricao: "Fotinha na casa da Valen Guadalupe, amo essa foto a gente ta muito bonito, e a diferença de altura é nitido.",
    foto: "lindos_aldeia.jpeg", // Exemplo
    icone: <Heart className="w-6 h-6 text-emerald-500" />
  },{
    data: "MIguxos",
    titulo: "Não superei",
    descricao: "Ainda não superei os miguxos com certeza esta no top 3 melhores resenhas.",
    foto: "miguxos_2.jpeg", // Exemplo
    icone: <Heart className="w-6 h-6 text-gray-500" />
  },{
    data: "Aniversario",
    titulo: "Melhor dia",
    descricao: "Um dia que pra mim foi muito especial, pois é o meu primeiro aniversario que você passa ao meu lado.",
    foto: "24_1.jpeg", // Exemplo
    icone: <Heart className="w-6 h-6 text-emerald-500" />
  },

];

function App() {
  const [tempoJuntos, setTempoJuntos] = useState({ dias: 0, horas: 0, minutos: 0, segundos: 0 });
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentSongIndex, setCurrentSongIndex] = useState(0);
  const audioRef = useRef(new Audio(PLAYLIST[0].url));
  const [noButtonPos, setNoButtonPos] = useState({ top: '0', left: '0', position: 'static' });
  const [aceitou, setAceitou] = useState(false);

  // Efeito do Contador
  useEffect(() => {
    const timer = setInterval(() => {
      const agora = new Date();
      const diferenca = agora - DATA_INICIO_NAMORO;
      const dias = Math.floor(diferenca / (1000 * 60 * 60 * 24));
      const horas = Math.floor((diferenca / (1000 * 60 * 60)) % 24);
      const minutos = Math.floor((diferenca / 1000 / 60) % 60);
      const segundos = Math.floor((diferenca / 1000) % 60);
      setTempoJuntos({ dias, horas, minutos, segundos });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  // Controle de Música
  useEffect(() => {
    // Atualiza a fonte do áudio quando muda o índice
    audioRef.current.src = PLAYLIST[currentSongIndex].url;
    if (isPlaying) {
      audioRef.current.play().catch(e => console.log("Clique para tocar"));
    }
  }, [currentSongIndex]);

  const togglePlay = () => {
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  const nextSong = () => {
    setCurrentSongIndex((prev) => (prev + 1) % PLAYLIST.length);
  };

  // Botão fujão
  const fogeBotao = (e) => {
    // Evita que o botão saia da tela visível no momento
    const x = Math.random() * (window.innerWidth - 150); 
    const y = Math.random() * (window.innerHeight - 150);
    setNoButtonPos({ position: 'absolute', top: `${y}px`, left: `${x}px` });
  };

  if (aceitou) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-pink-100 text-center p-10 animate-fade-in">
        <h1 className="text-6xl font-bold text-red-600 mb-6 animate-bounce">EU TE AMO MUITO! ❤️</h1>
        <p className="text-2xl text-pink-800 mb-8">Prometo te fazer a mulher mais feliz do mundo, todos os dias.</p>
        <div className="relative">
             <img src="/foto_favorita.jpeg" alt="Nós" className="w-80 h-80 object-cover rounded-full border-8 border-white shadow-2xl" />
             <Heart className="absolute bottom-0 right-10 text-red-500 fill-red-500 w-20 h-20 animate-ping" />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-stone-50 text-stone-800 font-sans pb-24 overflow-x-hidden">
      
      {/* --- HERO SECTION --- */}
      <header className="flex flex-col items-center justify-center min-h-[80vh] bg-gradient-to-b from-red-100 to-stone-50 p-6 relative overflow-hidden">
        {/* Decoração de fundo */}
        <div className="absolute top-10 left-10 text-pink-200 animate-pulse"><Heart size={100} /></div>
        <div className="absolute bottom-20 right-10 text-pink-200 animate-bounce delay-700"><Heart size={80} /></div>
        
        <div className="relative z-10 group">
          <div className="absolute -inset-1 bg-gradient-to-r from-pink-600 to-red-600 rounded-full blur opacity-75 group-hover:opacity-100 transition duration-1000 group-hover:duration-200"></div>
          <img 
            src="/foto_favorita.jpeg" 
            alt="Casal" 
            className="relative w-56 h-56 md:w-72 md:h-72 rounded-full object-cover border-4 border-white shadow-2xl"
          />
        </div>
        
        <h1 className="text-5xl md:text-7xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-pink-600 mt-8 mb-4 text-center">
          Para o Amor da Minha Vida
        </h1>
        <p className="text-xl md:text-2xl text-stone-600 max-w-2xl text-center font-light">
          "Cada momento ao seu lado é uma página da minha história favorita."
        </p>
      </header>

      {/* --- CONTADOR --- */}
      <section className="py-12 px-4 flex justify-center -mt-20 relative z-20">
        <div className="bg-white/80 backdrop-blur-sm p-8 rounded-3xl shadow-xl text-center border border-pink-100 max-w-4xl w-full">
          <h2 className="text-2xl font-semibold text-pink-500 mb-6 flex items-center justify-center gap-2">
            <Clock className="animate-spin-slow" /> Tempo que você me faz feliz
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8 text-stone-700">
            <div className="bg-pink-50 p-4 rounded-2xl"><span className="text-3xl md:text-5xl font-bold text-red-500 block">{tempoJuntos.dias}</span><span className="text-sm uppercase tracking-wider font-bold text-pink-400">Dias</span></div>
            <div className="bg-pink-50 p-4 rounded-2xl"><span className="text-3xl md:text-5xl font-bold text-red-500 block">{tempoJuntos.horas}</span><span className="text-sm uppercase tracking-wider font-bold text-pink-400">Horas</span></div>
            <div className="bg-pink-50 p-4 rounded-2xl"><span className="text-3xl md:text-5xl font-bold text-red-500 block">{tempoJuntos.minutos}</span><span className="text-sm uppercase tracking-wider font-bold text-pink-400">Min</span></div>
            <div className="bg-pink-50 p-4 rounded-2xl"><span className="text-3xl md:text-5xl font-bold text-red-500 block">{tempoJuntos.segundos}</span><span className="text-sm uppercase tracking-wider font-bold text-pink-400">Seg</span></div>
          </div>
        </div>
      </section>

      {/* --- NOSSA JORNADA (TIMELINE COM FOTOS) --- */}
      <section className="max-w-4xl mx-auto py-20 px-6">
        <h2 className="text-4xl font-bold text-center text-pink-600 mb-16 flex items-center justify-center gap-3">
          <Camera /> Nossos Momentos
        </h2>
        
        <div className="relative border-l-4 border-pink-200 ml-4 md:ml-1/2 space-y-16">
          {JORNADA.map((item, index) => (
            <div key={index} className={`relative pl-8 md:pl-0 flex flex-col md:flex-row items-center ${index % 2 === 0 ? 'md:flex-row-reverse' : ''} gap-8 group`}>
              
              {/* Marcador da Timeline (Bolinha) */}
              <div className="absolute left-[-14px] md:left-1/2 md:ml-[-14px] bg-white border-4 border-pink-500 w-7 h-7 rounded-full z-10 group-hover:scale-125 transition-transform duration-300 shadow-md"></div>
              
              {/* Espaçador para alinhar lados */}
              <div className="hidden md:block w-1/2"></div>

              {/* Card de Conteúdo */}
              <div className="bg-white p-2 rounded-2xl shadow-lg border border-pink-50 hover:shadow-2xl transition-all duration-300 w-full md:w-[calc(50%-2rem)] hover:-translate-y-2">
                
                {/* Área da Foto */}
                <div className="relative h-48 md:h-56 overflow-hidden rounded-xl mb-4">
                  <img 
                    src={item.foto} 
                    alt={item.titulo} 
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    onError={(e) => {e.target.src = "https://via.placeholder.com/400x300?text=Foto+Aqui"}} // Fallback se a foto não existir
                  />
                  <div className="absolute top-2 right-2 bg-white/90 backdrop-blur-sm p-2 rounded-full shadow-sm">
                    {item.icone}
                  </div>
                </div>

                <div className="px-4 pb-4">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-xs font-bold text-white bg-pink-400 px-2 py-1 rounded-full">{item.data}</span>
                  </div>
                  <h3 className="text-xl font-bold text-stone-800 mb-2">{item.titulo}</h3>
                  <p className="text-stone-600 text-sm leading-relaxed">{item.descricao}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
      <section className="min-h-[60vh] flex flex-col items-center justify-center py-20 px-4 ">
          <h1 className='text-2xl text-center'>Esses são alguns dos otimos momentos ao seu lado</h1>
          <Heart className='h-20 size-16 text-pink-700'/>
      </section>

      {/* --- O GRANDE PEDIDO --- */}
      <section className="min-h-[60vh] flex flex-col items-center justify-center py-20 px-4 bg-gradient-to-t from-pink-200 via-pink-50 to-white relative overflow-hidden">
        {/* Efeito de background */}
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/hearts.png')] opacity-10"></div>
        
        <h2 className="text-4xl md:text-6xl font-bold text-red-500 mb-8 text-center drop-shadow-sm relative z-10">
          Uma última pergunta...
        </h2>
        
        <div className="bg-white/90 backdrop-blur-md p-12 rounded-[2rem] shadow-2xl text-center max-w-2xl w-full border-4 border-pink-100 relative z-10">
          <p className="text-2xl md:text-3xl text-stone-700 font-medium mb-12 leading-relaxed">
            Sofia, você aceita <br/> 
            <span className="font-bold text-pink-600">namorar comigo</span>?
          </p>
          
          <div className="flex justify-center items-center gap-8 h-24">
            <button 
              onClick={() => setAceitou(true)}
              className="bg-green-500 hover:bg-green-600 text-white text-xl font-bold py-4 px-12 rounded-full shadow-lg transform hover:scale-105 transition-all duration-200 hover:shadow-green-200/50"
            >
              SIM, CLARO!
            </button>
            
            <button
              style={{ position: noButtonPos.position, top: noButtonPos.top, left: noButtonPos.left }}
              onMouseEnter={fogeBotao}
              onClick={fogeBotao} // Fallback para touch screens
              className="bg-stone-300 text-stone-500 text-xl font-bold py-4 px-12 rounded-full shadow-inner cursor-not-allowed transition-all duration-100"
            >
              NÃO
            </button>
          </div>
          <p className="mt-8 text-sm text-stone-400 italic opacity-60">(Tente clicar no não... 👀)</p>
        </div>
      </section>

      {/* --- PLAYER DE MÚSICA FLUTUANTE --- */}
      <div className="fixed bottom-6 right-6 z-50 animate-bounce-slow">
        <div className="bg-white/90 backdrop-blur-xl p-4 rounded-full shadow-2xl border border-pink-200 flex items-center gap-4 pr-6">
          <div className={`bg-pink-100 p-3 rounded-full ${isPlaying ? 'animate-spin-slow' : ''}`}>
            <Music className="w-6 h-6 text-pink-600" />
          </div>
          <div className="hidden md:block">
            <p className="text-sm font-bold text-stone-800 max-w-[150px] truncate">{PLAYLIST[currentSongIndex].title}</p>
            <p className="text-xs text-pink-500">Nossa Trilha Sonora</p>
          </div>
          <div className="flex gap-2">
            <button 
              onClick={togglePlay} 
              className="w-10 h-10 flex items-center justify-center bg-pink-500 hover:bg-pink-600 text-white rounded-full transition-colors shadow-md"
            >
              {isPlaying ? <Pause size={18} /> : <Play size={18} className="ml-1" />}
            </button>
            <button 
              onClick={nextSong} 
              className="w-10 h-10 flex items-center justify-center bg-stone-100 hover:bg-stone-200 text-stone-600 rounded-full transition-colors"
            >
              <SkipForward size={18} />
            </button>
          </div>
        </div>
      </div>

    </div>
  )
}

export default App