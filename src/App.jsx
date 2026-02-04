import { useState, useEffect, useRef } from 'react'
import { Heart, Trophy, Music, Play, Pause, SkipForward, Clock, Camera,  ChevronLeft } from 'lucide-react'

// --- CONFIGURAÇÕES DO CASAL ---
const DATA_INICIO_NAMORO = new Date("2025-02-16T00:00:00"); 

// 2. Playlist de músicas
const PLAYLIST = [
  { title: "Nossa Música", url: "/musica1.mp3" }, 
  { title: "Obrigado por me esperar", url: "/musica2.mp3" },
  { title: "Te amo", url: "/musica3.mp3" }
];

// 3. Dados da Jornada
const JORNADA = [
  {
    data: "O Início",
    titulo: "Onde tudo começou",
    descricao: "Nosso primeiro beijo, onde tudo começou. No dia em que você me mostrou ser incrível, com uma grande e divertida conversa na cadeira da piscina.",
    foto: "/primeiro_beijo.jpeg",
    icone: <Heart className="w-6 h-6 text-red-500" />
  },
  {
    data: "Duda Chas",
    titulo: "Dormir juntos",
    descricao: "Esse dia me marcou muito. Foi o dia em que mais ficamos de casal. Éramos o casal que menos daria certo, mas somos os únicos que sobrevivemos.",
    foto: "/casa_duda.jpeg",
    icone: <Heart className="w-6 h-6 text-blue-500" />
  },
  {
    data: "CP ou CPK",
    titulo: "Lugar especial",
    descricao: "Lugar onde mais saímos, lugar onde eu me apaixonei por você. Definitivamente um lugar especial para nós dois.",
    foto: "/foto_favorita.jpeg",
    icone: <Heart className="w-6 h-6 text-yellow-500" />
  },
  {
    data: "Niver Godoy",
    titulo: "Foto fofinha",
    descricao: "Essa foto tinha que estar aqui, amo ela e sei que você a ama também.",
    foto: "niver_gdy_fofinho.jpeg",
    icone: <Heart className="w-6 h-6 text-green-500" />
  },
  {
    data: "Casal",
    titulo: 'Primeiro "Date"',
    descricao: "Paixão de Cristo. Para mim é uma data especial, pois foi a primeira vez que saímos juntos como um casal, sem medo de sermos vistos.",
    foto: "primeira_saida_casal.jpeg",
    icone: <Heart className="w-6 h-6 text-cyan-500" />
  },
  {
    data: "Miguxos",
    titulo: "Primeiro? Não sei",
    descricao: "Não sei se foi o primeiro 'miguxos', mas tem que estar aqui. Foi muito especial para mim, pois foi algo que construímos onde não havia julgamentos, apenas pura diversão, alegria, respeito e gargalhadas.",
    foto: "miguxos.jpeg",
    icone: <Heart className="w-6 h-6 text-purple-500" />
  },
  {
    data: "😉😉🙄🙄",
    titulo: "Seu belo bíceps",
    descricao: "Mesmo não sendo maior que meu gigantesco bíceps, ainda assim o seu é grandinho.",
    foto: "seu_biceps_maior.jpeg",
    icone: <Heart className="w-6 h-6 text-fuchsia-500" />
  },
  {
    data: "Aldeia",
    titulo: "Casa Guadalupe",
    descricao: "Fotinha na casa da Valen Guadalupe. Amo essa foto, a gente tá muito bonito, e a diferença de altura é nítida.",
    foto: "lindos_aldeia.jpeg",
    icone: <Heart className="w-6 h-6 text-emerald-500" />
  },
  {
    data: "Miguxos",
    titulo: "Não superei",
    descricao: "Ainda não superei os miguxos, com certeza está no top 3 melhores resenhas.",
    foto: "miguxos_2.jpeg",
    icone: <Heart className="w-6 h-6 text-gray-500" />
  },
  {
    data: "Aniversário",
    titulo: "Melhor dia",
    descricao: "Um dia que pra mim foi muito especial, pois é o meu primeiro aniversário que você passa ao meu lado.",
    foto: "24_1.jpeg",
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
    const x = Math.random() * (window.innerWidth - 150); 
    const y = Math.random() * (window.innerHeight - 150);
    setNoButtonPos({ position: 'absolute', top: `${y}px`, left: `${x}px` });
  };

  if (aceitou) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-pink-100 text-center p-6 animate-fade-in">
        <h1 className="text-4xl md:text-6xl font-bold text-red-600 mb-6 animate-bounce">EU TE AMO MUITO! ❤️</h1>
        <p className="text-xl md:text-2xl text-pink-800 mb-8 max-w-lg">Prometo te fazer a mulher mais feliz do mundo, todos os dias.</p>
        <div className="relative group">
             <img src="/foto_favorita.jpeg" alt="Nós" className="w-72 h-72 md:w-96 md:h-96 object-cover rounded-full border-8 border-white shadow-2xl transform group-hover:scale-105 transition duration-500" />
             <Heart className="absolute bottom-4 right-10 text-red-500 fill-red-500 w-16 h-16 md:w-24 md:h-24 animate-ping" />

        </div>
        <div>
          <button className='h-15 cursor-pointer'>
            <ChevronLeft size={50}
            onClick={() =>{setAceitou(false)}}/>
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-stone-50 text-stone-800 font-sans pb-24 overflow-x-hidden">
      
      {/* --- HERO SECTION --- */}
      <header className="flex flex-col items-center justify-center min-h-[90vh] bg-gradient-to-b from-red-100 to-stone-50 p-4 relative overflow-hidden">
        {/* Decoração de fundo */}
        <div className="absolute top-10 left-10 text-pink-200 animate-pulse hidden md:block"><Heart size={100} /></div>
        <div className="absolute bottom-20 right-10 text-pink-200 animate-bounce delay-700 hidden md:block"><Heart size={80} /></div>
        
        <div className="relative z-10 group mt-10">
          <div className="absolute -inset-2 bg-gradient-to-r from-pink-600 to-red-600 rounded-full blur opacity-60 group-hover:opacity-100 transition duration-1000 group-hover:duration-200"></div>
          {/* AUMENTADO AQUI: w-64 h-64 no mobile, w-96 h-96 no desktop */}
          <img 
            src="/foto_favorita.jpeg" 
            alt="Casal" 
            className="relative w-64 h-64 md:w-96 md:h-96 rounded-full object-cover border-8 border-white shadow-2xl transform transition duration-500 hover:scale-105"
          />
        </div>
        
        <h1 className="text-4xl md:text-7xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-pink-600 mt-10 mb-6 text-center leading-tight">
          Sofia Munhoz Rodrigues
        </h1>
        <p className="text-lg md:text-3xl text-stone-600 max-w-3xl text-center font-light px-4">
          "Cada momento ao seu lado é uma página da minha história favorita."
        </p>
      </header>

      {/* --- CONTADOR --- */}
      <section className="py-12 px-4 flex justify-center -mt-10 relative z-20">
        <div className="bg-white/90 backdrop-blur-md p-6 md:p-10 rounded-3xl shadow-xl text-center border border-pink-100 max-w-5xl w-full">
          <h2 className="text-2xl md:text-3xl font-semibold text-pink-500 mb-8 flex items-center justify-center gap-3">
            <Clock className="animate-spin-slow w-8 h-8" /> Tempo que você me faz feliz
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8 text-stone-700">
            <div className="bg-pink-50 p-6 rounded-2xl shadow-sm transform hover:-translate-y-1 transition"><span className="text-3xl md:text-6xl font-bold text-red-500 block">{tempoJuntos.dias}</span><span className="text-xs md:text-sm uppercase tracking-wider font-bold text-pink-400">Dias</span></div>
            <div className="bg-pink-50 p-6 rounded-2xl shadow-sm transform hover:-translate-y-1 transition"><span className="text-3xl md:text-6xl font-bold text-red-500 block">{tempoJuntos.horas}</span><span className="text-xs md:text-sm uppercase tracking-wider font-bold text-pink-400">Horas</span></div>
            <div className="bg-pink-50 p-6 rounded-2xl shadow-sm transform hover:-translate-y-1 transition"><span className="text-3xl md:text-6xl font-bold text-red-500 block">{tempoJuntos.minutos}</span><span className="text-xs md:text-sm uppercase tracking-wider font-bold text-pink-400">Min</span></div>
            <div className="bg-pink-50 p-6 rounded-2xl shadow-sm transform hover:-translate-y-1 transition"><span className="text-3xl md:text-6xl font-bold text-red-500 block">{tempoJuntos.segundos}</span><span className="text-xs md:text-sm uppercase tracking-wider font-bold text-pink-400">Seg</span></div>
          </div>
        </div>
      </section>

      {/* --- NOSSA JORNADA (TIMELINE COM FOTOS GRANDES) --- */}
      <section className="max-w-6xl mx-auto py-24 px-4 md:px-8">
        <h2 className="text-4xl md:text-5xl font-bold text-center text-pink-600 mb-20 flex items-center justify-center gap-4">
          <Camera className="w-10 h-10" /> Nossos Momentos
        </h2>
        
        <div className="relative border-l-4 border-pink-200 ml-4 md:ml-1/2 space-y-20">
          {JORNADA.map((item, index) => (
            <div key={index} className={`relative pl-8 md:pl-0 flex flex-col md:flex-row items-center ${index % 2 === 0 ? 'md:flex-row-reverse' : ''} gap-10 group`}>
              
              {/* Marcador da Timeline */}
              <div className="absolute left-[-14px] md:left-1/2 md:ml-[-14px] bg-white border-4 border-pink-500 w-7 h-7 rounded-full z-10 group-hover:scale-150 transition-transform duration-300 shadow-md"></div>
              
              <div className="hidden md:block w-1/2"></div>

              {/* Card de Conteúdo */}
              <div className="bg-white p-4 rounded-3xl shadow-xl border border-pink-50 hover:shadow-2xl transition-all duration-300 w-full md:w-[calc(50%-2.5rem)] hover:-translate-y-2 flex flex-col">
                
                {/* Área da Foto - AUMENTADA */}
                {/* h-64 no mobile, h-96 no desktop */}
                <div className="relative h-64 md:h-96 w-full overflow-hidden rounded-2xl mb-6 bg-stone-100">
                  <img 
                    src={item.foto} 
                    alt={item.titulo} 
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    onError={(e) => {e.target.src = "https://via.placeholder.com/600x800?text=Foto+Aqui"}} 
                  />
                  <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm p-3 rounded-full shadow-md">
                    {item.icone}
                  </div>
                </div>

                <div className="px-2 pb-2">
                  <div className="flex items-center gap-3 mb-3">
                    <span className="text-sm font-bold text-white bg-pink-400 px-4 py-1 rounded-full shadow-sm">{item.data}</span>
                  </div>
                  <h3 className="text-2xl md:text-3xl font-bold text-stone-800 mb-3">{item.titulo}</h3>
                  <p className="text-stone-600 text-base md:text-lg leading-relaxed">{item.descricao}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="min-h-[40vh] flex flex-col items-center justify-center py-10 px-4 text-center">
          <h1 className='text-3xl md:text-5xl font-bold text-pink-700 mb-6'>Esses são apenas alguns dos momentos...</h1>
          <p className="text-xl text-stone-500 mb-8">Mas o melhor ainda está por vir.</p>
          <Heart className='w-24 h-24 text-pink-500 animate-pulse'/>
      </section>

      {/* --- O GRANDE PEDIDO --- */}
      <section className="min-h-[80vh] flex flex-col items-center justify-center py-20 px-4 bg-gradient-to-t from-pink-200 via-pink-50 to-white relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/hearts.png')] opacity-10"></div>
        
        <h2 className="text-4xl md:text-7xl font-bold text-red-500 mb-12 text-center drop-shadow-sm relative z-10">
          Uma última pergunta...
        </h2>
        
        <div className="bg-white/90 backdrop-blur-md p-8 md:p-16 rounded-[3rem] shadow-2xl text-center max-w-3xl w-full border-4 border-pink-100 relative z-10">
          <p className="text-3xl md:text-5xl text-stone-700 font-medium mb-16 leading-relaxed">
            Sofia, você aceita <br/> 
            <span className="font-extrabold text-pink-600">namorar comigo</span>?
          </p>
          
          <div className="flex flex-col md:flex-row justify-center items-center gap-6 md:gap-12">
            <button 
              onClick={() => setAceitou(true)}
              className="w-full md:w-auto bg-green-500 hover:bg-green-600 text-white text-2xl font-bold py-6 px-16 rounded-full shadow-xl transform hover:scale-110 transition-all duration-200 hover:shadow-green-200/50"
            >
              SIM, CLARO!
            </button>
            
            <button
              style={{ position: noButtonPos.position, top: noButtonPos.top, left: noButtonPos.left }}
              onMouseEnter={fogeBotao}
              onClick={fogeBotao}
              className="w-full md:w-auto bg-stone-300 text-stone-500 text-2xl font-bold py-6 px-16 rounded-full shadow-inner cursor-not-allowed transition-all duration-100 mt-4 md:mt-0"
            >
              NÃO
            </button>
          </div>
          <p className="mt-10 text-base text-stone-400 italic opacity-60">(Tente clicar no não... 👀)</p>
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