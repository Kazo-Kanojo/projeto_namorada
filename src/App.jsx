import { useState, useEffect, useRef, useMemo } from 'react'
import { Heart, Music, Play, Pause, SkipForward, ChevronLeft, Sparkles, MapPin, Moon, Sun } from 'lucide-react'

// --- 1. IMPORTAÇÃO MÁGICA DE FOTOS (VITE) ---
const fotosImports = import.meta.glob('./assets/memorias/*.{png,jpg,jpeg,svg,webp}', { eager: true });
const FOTOS_DA_CHUVA = Object.values(fotosImports).map((img) => img.default);

// --- CONFIGURAÇÕES DO CASAL ---
const DATA_INICIO_NAMORO = new Date("2025-02-16T00:00:00"); 

const PLAYLIST = [
  { title: "Nossa Música", url: "/musica1.mp3" }, 
  { title: "Obrigado por me esperar", url: "/musica2.mp3" },
  { title: "Te amo", url: "/musica3.mp3" }
];

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

// --- COMPONENTE DA CHUVA AUTOMÁTICA ---
const RainEffect = () => {
  const particles = useMemo(() => {
    const listaFotos = FOTOS_DA_CHUVA.length > 0 ? FOTOS_DA_CHUVA : ["https://via.placeholder.com/150"];

    return [...Array(12)].map((_, i) => {
      const fotoAleatoria = listaFotos[Math.floor(Math.random() * listaFotos.length)];
      return {
        id: i,
        left: `${Math.random() * 100}%`,
        delay: `${Math.random() * 15}s`,
        duration: `${15 + Math.random() * 5}s`,
        size: Math.random() * (110 - 50) + 40,
        img: fotoAleatoria,
        type: i % 3 === 0 ? 'heart' : 'photo'
      };
    });
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      {particles.map(p => (
        <div
          key={p.id}
          className="absolute animate-fall opacity-0"
          style={{
            left: p.left,
            animationDelay: p.delay,
            animationDuration: p.duration,
            top: '-15vh'
          }}
        >
          {p.type === 'heart' ? (
            <Heart size={p.size / 2} className="text-pink-300 fill-pink-200/50" />
          ) : (
            <img 
              src={p.img} 
              style={{ width: p.size, height: p.size }} 
              className="rounded-lg object-cover border-2 border-white/40 shadow-sm"
              alt="memoria"
            />
          )}
        </div>
      ))}
    </div>
  );
};

function App() {
  const [tempoJuntos, setTempoJuntos] = useState({ dias: 0, horas: 0, minutos: 0, segundos: 0 });
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentSongIndex, setCurrentSongIndex] = useState(0);
  const audioRef = useRef(new Audio(PLAYLIST[0].url));
  const [noButtonPos, setNoButtonPos] = useState({ top: 'auto', left: 'auto', position: 'relative' });
  const [aceitou, setAceitou] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  
  // NOVO: Estado para o Dark Mode
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const totalScroll = document.documentElement.scrollHeight - window.innerHeight;
      const currentProgress = (window.scrollY / totalScroll) * 100;
      setScrollProgress(currentProgress);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      const agora = new Date();
      const diferenca = agora - DATA_INICIO_NAMORO;
      setTempoJuntos({
        dias: Math.floor(diferenca / (1000 * 60 * 60 * 24)),
        horas: Math.floor((diferenca / (1000 * 60 * 60)) % 24),
        minutos: Math.floor((diferenca / 1000 / 60) % 60),
        segundos: Math.floor((diferenca / 1000) % 60)
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const togglePlay = () => {
    if(isPlaying) {
        audioRef.current.pause();
    } else {
        audioRef.current.play().catch(e => console.log("Interação necessária"));
    }
    setIsPlaying(!isPlaying);
  };

  const nextSong = () => {
    setIsPlaying(false);
    setCurrentSongIndex((prev) => (prev + 1) % PLAYLIST.length);
    setTimeout(() => {
        audioRef.current.src = PLAYLIST[(currentSongIndex + 1) % PLAYLIST.length].url;
        audioRef.current.play();
        setIsPlaying(true);
    }, 100);
  };

  const fogeBotao = (e) => {
    const buttonWidth = 100;
    const buttonHeight = 50;
    const maxWidth = window.innerWidth - buttonWidth - 20;
    const maxHeight = window.innerHeight - buttonHeight - 20;
    
    const x = Math.max(20, Math.random() * maxWidth); 
    const y = Math.max(20, Math.random() * maxHeight);
    
    setNoButtonPos({ position: 'fixed', top: `${y}px`, left: `${x}px`, zIndex: 50 });
  };

  // Funções auxiliares de estilo baseadas no tema
  const themeClasses = {
    bg: isDarkMode ? 'bg-stone-950' : 'bg-[#fffafa]',
    textPrimary: isDarkMode ? 'text-stone-100' : 'text-stone-800',
    textSecondary: isDarkMode ? 'text-stone-400' : 'text-stone-500',
    cardBg: isDarkMode ? 'bg-stone-900 border-stone-800' : 'bg-white border-pink-50',
    playerBg: isDarkMode ? 'bg-stone-900/95 border-stone-800' : 'bg-white/95 border-pink-100',
  };

  if (aceitou) {
    return (
      <div className={`min-h-screen flex flex-col items-center justify-center text-center p-4 animate-in fade-in duration-700 transition-colors duration-500 ${isDarkMode ? 'bg-stone-950' : 'bg-pink-50'}`}>
        <h1 className="text-4xl md:text-6xl font-bold text-red-600 mb-6 animate-bounce">PARA SEMPRE NÓS! ❤️</h1>
        <p className={`${themeClasses.textSecondary} mb-8 max-w-md`}>Prometo te fazer a mulher mais feliz desse mundo.</p>
        <div className="relative">
          <img src="/foto_favorita.jpeg" className="w-64 h-64 md:w-96 md:h-96 object-cover rounded-full border-8 border-white shadow-2xl" />
          <Sparkles className="absolute -top-4 -right-4 text-yellow-400 animate-pulse" size={40} />
        </div>
        <button onClick={() => setAceitou(false)} className={`mt-12 px-6 py-2 rounded-full shadow-md text-pink-500 flex items-center gap-2 transition-colors cursor-pointer ${isDarkMode ? 'bg-stone-800 hover:bg-stone-700' : 'bg-white hover:bg-pink-50'}`}>
          <ChevronLeft size={20} /> Rever nossa história
        </button>
      </div>
    );
  }

  return (
    <div className={`min-h-screen font-sans selection:bg-pink-100 overflow-x-hidden pb-24 transition-colors duration-500 ${themeClasses.bg} ${themeClasses.textPrimary}`}>
      
      {/* BOTÃO DE DARK MODE */}
      <button 
        onClick={() => setIsDarkMode(!isDarkMode)}
        className={`fixed top-4 right-4 z-[110] p-3 rounded-full shadow-lg transition-all duration-300 ${isDarkMode ? 'bg-stone-800 text-yellow-400 hover:bg-stone-700' : 'bg-white text-stone-600 hover:bg-stone-100'}`}
      >
        {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
      </button>

      {/* BARRA DE PROGRESSO */}
      <div className={`fixed top-0 left-0 w-full h-1.5 z-[100] ${isDarkMode ? 'bg-stone-900' : 'bg-pink-50'}`}>
        <div 
          className="h-full bg-gradient-to-r from-red-400 to-pink-500 transition-all duration-150"
          style={{ width: `${scrollProgress}%` }}
        />
      </div>

      <RainEffect />

      {/* HERO SECTION */}
      <header className="relative min-h-[90vh] flex flex-col items-center justify-center p-4 text-center">
        <div className="z-10 space-y-6">
          <div className="relative inline-block group">
            <div className="absolute -inset-2 bg-pink-300 rounded-full blur-xl opacity-30 animate-pulse"></div>
            <img 
              src="/foto_favorita.jpeg" 
              className="relative w-48 h-48 md:w-72 md:h-72 rounded-full object-cover border-4 border-white shadow-2xl transition-transform duration-500 hover:scale-105" 
            />
          </div>
          <h1 className="text-4xl md:text-7xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-pink-600 px-2 leading-tight">
            Sofia Munhoz
          </h1>
          <p className={`text-base md:text-2xl font-light italic max-w-xs md:max-w-2xl mx-auto ${themeClasses.textSecondary}`}>
            "Cada segundo com você é um presente que eu guardo no peito."
          </p>
          <div className="pt-8 animate-bounce text-pink-300">
            <ChevronLeft className="-rotate-90 mx-auto" size={30} />
          </div>
        </div>
      </header>

      {/* CONTADOR */}
      <section className="py-8 px-4 relative z-10">
        <div className={`max-w-4xl mx-auto backdrop-blur-md p-6 rounded-[2rem] shadow-lg border transition-colors duration-500 ${isDarkMode ? 'bg-stone-900/80 border-stone-800' : 'bg-white/80 border-pink-50'}`}>
          <h2 className="text-center text-xs font-bold uppercase tracking-widest text-pink-400 mb-6">Tempo juntos</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {Object.entries(tempoJuntos).map(([unit, value]) => (
              <div key={unit} className={`text-center p-3 rounded-xl shadow-sm border transition-colors duration-500 ${themeClasses.cardBg}`}>
                <div className="text-2xl md:text-5xl font-bold text-red-500">{value}</div>
                <div className={`text-[10px] md:text-xs uppercase tracking-widest font-bold ${isDarkMode ? 'text-stone-500' : 'text-stone-400'}`}>{unit}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* JORNADA */}
      <section className="max-w-5xl mx-auto py-16 px-4 space-y-20 relative z-10">
        {JORNADA.map((item, index) => (
          <div key={index} className={`flex flex-col ${index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'} items-center gap-6 md:gap-16`}>
            <div className="w-full md:w-1/2 group">
              <div className={`relative p-3 rounded-[2rem] shadow-xl transform transition duration-500 hover:scale-[1.02] ${themeClasses.cardBg}`}>
                <div className={`aspect-[4/5] rounded-[1.5rem] overflow-hidden ${isDarkMode ? 'bg-stone-800' : 'bg-stone-100'}`}>
                  <img src={item.foto} className="w-full h-full object-cover" alt={item.titulo} loading="lazy" />
                </div>
                <div className={`absolute -top-3 -right-3 p-2 rounded-full shadow-lg border transition-colors duration-500 ${themeClasses.cardBg}`}>
                  {item.icone}
                </div>
              </div>
            </div>
            <div className="w-full md:w-1/2 text-center md:text-left space-y-3 px-2">
              <div className="flex flex-col md:flex-row items-center md:items-start gap-2">
                <span className="bg-pink-100 text-pink-600 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest">
                    {item.data}
                </span>
              </div>
              <h3 className={`text-2xl md:text-4xl font-bold ${themeClasses.textPrimary}`}>{item.titulo}</h3>
              <p className={`text-sm md:text-lg leading-relaxed font-light ${themeClasses.textSecondary}`}>{item.descricao}</p>
              <div className="flex items-center justify-center md:justify-start gap-2 text-pink-400 text-xs italic bg-pink-50/50 p-2 rounded-lg inline-flex">
                <MapPin size={14} /> <span>{item.detalhe}</span>
              </div>
            </div>
          </div>
        ))}
      </section>

      <section className={`min-h-[50vh] flex flex-col items-center justify-center py-20 px-6 transition-colors duration-500 ${isDarkMode ? 'bg-stone-900' : 'bg-white'}`}>
        <Heart className="w-16 h-16 text-pink-500 fill-pink-100 animate-pulse mb-6" strokeWidth={1.5} />
        <h1 className={`text-3xl md:text-4xl font-bold text-center mb-2 ${themeClasses.textPrimary}`}>
          Nossa coleção de <span className="text-pink-500 italic font-serif">momentos eternos</span>
        </h1>
        <p className={`text-lg font-light max-w-md text-center ${themeClasses.textSecondary}`}>
          Essas fotos são apenas o rascunho de uma história que nunca vai ter fim.
        </p>
      </section>
      
      {/* PEDIDO */}
      <section className="min-h-[80vh] flex flex-col items-center justify-center px-4 relative z-10">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[50%] bg-red-500/20 blur-[100px] rounded-full pointer-events-none"></div>

        <h2 className={`text-3xl md:text-5xl font-bold mb-8 text-center relative z-10 tracking-tight ${themeClasses.textPrimary}`}>
          Uma última pergunta...
        </h2>

        <div className={`backdrop-blur-2xl p-8 md:p-14 rounded-[3rem] shadow-[0_20px_60px_rgba(255,0,0,0.15)] text-center max-w-xl w-full border relative z-10 transition-all duration-500 hover:scale-[1.02] ${isDarkMode ? 'bg-stone-900/60 border-stone-700' : 'bg-white/60 border-white/50'}`}>
          <div className="bg-red-50 w-20 h-20 mx-auto rounded-full flex items-center justify-center mb-6 shadow-inner">
            <Heart className="text-red-500 fill-red-500 animate-pulse" size={40} />
          </div>

          <h2 className={`text-3xl md:text-5xl font-bold mb-10 leading-tight ${themeClasses.textPrimary}`}>
            Sofia, aceita... <br/> 
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-pink-600">
              namorar comigo?
            </span>
          </h2>

          <div className="flex flex-col md:flex-row justify-center items-center gap-4 w-full">
            <button 
              onClick={() => setAceitou(true)}
              className="w-full md:w-auto px-12 py-5 bg-gradient-to-r from-red-500 to-pink-600 text-white text-xl font-bold rounded-full shadow-xl shadow-red-200 hover:shadow-red-400 hover:scale-105 transition-all active:scale-95"
            >
              SIM, ACEITO! 💍
            </button>
            
            <button 
              onClick={fogeBotao}
              onMouseEnter={fogeBotao}
              style={{ position: noButtonPos.position, top: noButtonPos.top, left: noButtonPos.left, zIndex: noButtonPos.zIndex }}
              className={`w-full md:w-auto px-10 py-5 text-lg font-medium rounded-full border shadow-sm transition-all ${isDarkMode ? 'bg-stone-800 text-stone-300 border-stone-700 hover:bg-stone-700' : 'bg-stone-200 text-stone-700 border-stone-300 hover:bg-stone-100'}`}
            >
              Não...
            </button>
          </div>
        </div>
      </section>

      {/* PLAYER */}
      <div className="fixed bottom-0 left-0 w-full md:w-auto md:bottom-6 md:right-6 z-[100]">
        <div className={`backdrop-blur-xl border-t md:border p-3 md:rounded-full shadow-[0_-4px_20px_rgba(0,0,0,0.1)] flex items-center justify-between md:gap-4 px-6 md:px-4 transition-colors duration-500 ${themeClasses.playerBg}`}>
          <div className="flex items-center gap-3 overflow-hidden">
             <div className={`w-10 h-10 rounded-full bg-pink-100 flex items-center justify-center flex-shrink-0 ${isPlaying ? 'animate-spin-slow' : ''}`}>
                <Music size={18} className="text-pink-500" />
             </div>
             <div className="flex flex-col max-w-[150px]">
                <span className={`text-xs font-bold truncate ${themeClasses.textPrimary}`}>{PLAYLIST[currentSongIndex].title}</span>
                <span className="text-[10px] text-stone-400 uppercase tracking-widest">Nossa Playlist</span>
             </div>
          </div>
          <div className="flex items-center gap-3">
             <button onClick={togglePlay} className="w-10 h-10 flex items-center justify-center bg-red-500 text-white rounded-full shadow-md active:scale-90 transition-transform">
               {isPlaying ? <Pause size={18} /> : <Play size={18} className="ml-1" />}
             </button>
             <button onClick={nextSong} className="text-stone-400 hover:text-red-500 p-2">
               <SkipForward size={22} />
             </button>
          </div>
        </div>
      </div>

      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes fall {
          0% { transform: translateY(-10vh) rotate(0deg) scale(0.5); opacity: 0; }
          10% { opacity: 0.3; }
          50% { opacity: 0.6; transform: translateY(50vh) rotate(180deg) scale(1.5); }
          100% { transform: translateY(100vh) rotate(360deg) scale(1.5); opacity: 0; }
        }
        .animate-fall {
          animation-name: fall;
          animation-timing-function: linear;
          animation-iteration-count: infinite;
        }
        .animate-spin-slow {
          animation: spin 8s linear infinite;
        }
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
      `}} />
    </div>
  )
}

export default App