import React, { useState, useEffect } from 'react';
import { Github, Linkedin, Mail, Code, Brain, Coffee, Calendar, MapPin, GraduationCap, Star, GitFork } from 'lucide-react';
import './App.css';
import PixelArtScene from './components/PixelArtScene.jsx';
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog.jsx';
import profileImage from './assets/eduardo_alves_profile.jpg';
import { fetchGitHubStats, fetchGitHubRepos } from './components/GitHubAPI.js';

// Componente para partículas flutuantes
const FloatingParticles = () => {
  const particles = Array.from({ length: 50 }, (_, i) => ({
    id: i,
    size: Math.random() * 4 + 2,
    left: Math.random() * 100,
    animationDelay: Math.random() * 6,
    animationDuration: Math.random() * 3 + 4,
  }));

  return (
    <div className="floating-particles">
      {particles.map((particle) => (
        <div
          key={particle.id}
          className="particle"
          style={{
            width: `${particle.size}px`,
            height: `${particle.size}px`,
            left: `${particle.left}%`,
            animationDelay: `${particle.animationDelay}s`,
            animationDuration: `${particle.animationDuration}s`,
          }}
        />
      ))}
    </div>
  );
};

// Função para calcular idade
const calculateAge = (birthDate) => {
  const today = new Date();
  const birth = new Date(birthDate);
  let age = today.getFullYear() - birth.getFullYear();
  const monthDiff = today.getMonth() - birth.getMonth();
  
  if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birth.getDate())) {
    age--;
  }
  
  return age;
};

// Componente para seção Hero
const HeroSection = () => {
  const [displayText, setDisplayText] = useState('');
  const fullText = 'Desenvolvedor & Especialista em IA';
  const age = calculateAge('2006-06-06');

  useEffect(() => {
    let index = 0;
    const timer = setInterval(() => {
      if (index < fullText.length) {
        setDisplayText(fullText.slice(0, index + 1));
        index++;
      } else {
        clearInterval(timer);
      }
    }, 100);

    return () => clearInterval(timer);
  }, []);

  return (
    <section className="min-h-screen flex items-center justify-center relative overflow-hidden">
      <FloatingParticles />
      <div className="container mx-auto px-6 text-center relative z-10">
        <div className="mb-8">
          <img
            src={profileImage}
            alt="Eduardo Alves"
            className="w-48 h-48 rounded-full mx-auto profile-image object-cover"
          />
        </div>
        
        <h1 className="text-5xl md:text-7xl font-bold mb-4 text-white">
          Eduardo Alves
        </h1>
        
        <div className="text-2xl md:text-3xl mb-6 h-12">
          <span className="typing-animation text-cyan-400">
            {displayText}
          </span>
        </div>
        
        <div className="flex flex-wrap justify-center gap-4 mb-8 text-gray-300">
          <div className="flex items-center gap-2">
            <Calendar className="w-5 h-5" />
            <span>{age} anos</span>
          </div>
          <div className="flex items-center gap-2">
            <MapPin className="w-5 h-5" />
            <span>Suzano, SP</span>
          </div>
          <div className="flex items-center gap-2">
            <GraduationCap className="w-5 h-5" />
            <span>Ciência da Computação - Braz Cubas</span>
          </div>
        </div>
        
        <div className="flex justify-center gap-6">
          <a
            href="https://github.com/Educofseal"
            target="_blank"
            rel="noopener noreferrer"
            className="p-3 rounded-full bg-white/10 hover:bg-white/20 transition-all duration-300 glow-effect"
          >
            <Github className="w-6 h-6" />
          </a>
          <a
            href="https://linkedin.com/in/contatoedu"
            target="_blank"
            rel="noopener noreferrer"
            className="p-3 rounded-full bg-white/10 hover:bg-white/20 transition-all duration-300 glow-effect"
          >
            <Linkedin className="w-6 h-6" />
          </a>
          <a
            href="mailto:contatoedu07@gmail.com"
            className="p-3 rounded-full bg-white/10 hover:bg-white/20 transition-all duration-300 glow-effect"
          >
            <Mail className="w-6 h-6" />
          </a>
        </div>
      </div>
    </section>
  );
};

// Componente para seção de habilidades
const SkillsSection = () => {
  const skills = [
    { name: 'HTML5', level: 90, icon: Code },
    { name: 'CSS3', level: 85, icon: Code },
    { name: 'JavaScript', level: 75, icon: Code },
    { name: 'Java', level: 60, icon: Coffee },
    { name: 'Inteligência Artificial', level: 75, icon: Brain },
    { name: 'Machine Learning', level: 90, icon: Brain },
  ];

  return (
    <section className="py-20 px-6">
      <div className="container mx-auto">
        <h2 className="text-4xl md:text-5xl font-bold text-center mb-16 section-title">
          Habilidades
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {skills.map((skill, index) => (
            <div key={index} className="skill-card p-6 rounded-lg">
              <div className="flex items-center mb-4">
                <skill.icon className="w-8 h-8 text-cyan-400 mr-3" />
                <h3 className="text-xl font-semibold text-white">{skill.name}</h3>
              </div>
              
              <div className="w-full bg-gray-700 rounded-full h-3 mb-2">
                <div
                  className="bg-gradient-to-r from-cyan-400 to-blue-500 h-3 rounded-full transition-all duration-1000 ease-out"
                  style={{ width: `${skill.level}%` }}
                />
              </div>
              
              <span className="text-gray-300 text-sm">{skill.level}%</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

// Componente para seção sobre
const AboutSection = () => {
  return (
    <section className="py-20 px-6">
      <div className="container mx-auto max-w-4xl">
        <h2 className="text-4xl md:text-5xl font-bold text-center mb-16 section-title">
          Sobre Mim
        </h2>
        
        <div className="bg-white/5 backdrop-blur-lg rounded-lg p-8 border border-white/10">
          <p className="text-lg text-gray-300 leading-relaxed mb-6">
            Olá! Sou Eduardo Alves, um estudante de Ciência da Computação de {calculateAge("2006-06-06")} anos na Universidade Braz Cubas, em Mogi das Cruzes. Minha paixão por tecnologia me levou a me aprofundar em Inteligência Artificial, onde busco constantemente transformar ideias complexas em soluções práticas e impactantes.
          </p>
          
          <p className="text-lg text-gray-300 leading-relaxed mb-6">
            Minha jornada me equipou com uma base sólida em desenvolvimento web (HTML5, CSS3, JavaScript) e conhecimentos em Java, permitindo-me construir projetos que não apenas funcionam, mas também oferecem uma experiência de usuário intuitiva e visualmente atraente. Sou um entusiasta de Machine Learning e estou sempre explorando as mais recentes inovações nesse campo.
          </p>
          
          <p className="text-lg text-gray-300 leading-relaxed">
            Acredito que a tecnologia tem o poder de moldar o futuro, e estou comprometido em ser parte ativa dessa transformação. Seja desenvolvendo algoritmos inteligentes ou criando interfaces dinâmicas, meu objetivo é sempre entregar valor e fazer a diferença através da programação. Estou aberto a novos desafios e colaborações que me permitam crescer e contribuir para projetos significativos.
          </p>
        </div>
      </div>
    </section>
  );
};

// Componente para seção de projetos GitHub
const GitHubSection = () => {
  const [githubData, setGithubData] = useState({
    repos: [],
    totalCommits: 0,
    totalRepos: 0,
    followers: 0,
    following: 0
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadGitHubData = async () => {
      setLoading(true);
      try {
        const data = await fetchGitHubStats();
        setGithubData(data);
      } catch (error) {
        console.error('Erro ao carregar dados do GitHub:', error);
        // Fallback para dados simulados em caso de erro
        setGithubData({
          repos: [
            {
              name: 'Portfolio',
              description: 'Portfólio pessoal desenvolvido em HTML, CSS e JavaScript',
              language: 'HTML',
              stargazers_count: 0,
              forks_count: 0,
              html_url: 'https://github.com/Educofseal/Portfolio'
            },
            {
              name: 'Amor-em-codigo',
              description: 'Surpreenda sua namorada(o) com um clique: foto, música e amor em um site simples',
              language: 'HTML',
              stargazers_count: 2,
              forks_count: 0,
              html_url: 'https://github.com/Educofseal/Amor-em-codigo'
            },
            {
              name: 'github-readme-activity-graph',
              description: 'A dynamically generated activity graph to show your GitHub activity',
              language: 'JavaScript',
              stargazers_count: 0,
              forks_count: 0,
              html_url: 'https://github.com/Educofseal/github-readme-activity-graph'
            }
          ],
          totalCommits: 0,
          totalRepos: 5,
          followers: 0,
          following: 0
        });
      } finally {
        setLoading(false);
      }
    };

    loadGitHubData();
  }, []);

  const getLanguageColor = (language) => {
    const colors = {
      JavaScript: '#f1e05a',
      Python: '#3572A5',
      Java: '#b07219',
      TypeScript: '#2b7489',
      HTML: '#e34c26',
      CSS: '#1572B6',
      React: '#61dafb'
    };
    return colors[language] || '#8b949e';
  };

  if (loading) {
    return (
      <section className="py-20 px-6">
        <div className="container mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-16 section-title">
            Projetos GitHub
          </h2>
          <div className="text-center">
            <div className="inline-block bg-white/5 backdrop-blur-lg rounded-lg p-8 border border-white/10">
              <div className="text-cyan-400">Carregando dados do GitHub...</div>
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-20 px-6">
      <div className="container mx-auto">
        <h2 className="text-4xl md:text-5xl font-bold text-center mb-16 section-title">
          Projetos GitHub
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          <div className="bg-white/5 backdrop-blur-lg rounded-lg p-6 border border-white/10 text-center">
            <div className="text-3xl font-bold text-cyan-400 mb-2">{githubData.totalCommits}</div>
            <div className="text-gray-300">Total de Commits</div>
          </div>
          <div className="bg-white/5 backdrop-blur-lg rounded-lg p-6 border border-white/10 text-center">
            <div className="text-3xl font-bold text-cyan-400 mb-2">{githubData.totalRepos}</div>
            <div className="text-gray-300">Repositórios</div>
          </div>
          <div className="bg-white/5 backdrop-blur-lg rounded-lg p-6 border border-white/10 text-center">
            <div className="text-3xl font-bold text-cyan-400 mb-2">{githubData.followers}</div>
            <div className="text-gray-300">Seguidores</div>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {githubData.repos.slice(0, 6).map((repo, index) => (
            <a
              key={index}
              href={repo.html_url}
              target="_blank"
              rel="noopener noreferrer"
              className="github-card p-6 rounded-lg block hover:no-underline"
            >
              <h3 className="text-xl font-semibold text-white mb-3">{repo.name}</h3>
              <p className="text-gray-300 mb-4 text-sm">{repo.description || 'Sem descrição disponível'}</p>
              
              <div className="flex items-center justify-between text-sm text-gray-400">
                <span className="flex items-center">
                  <div 
                    className="w-3 h-3 rounded-full mr-2"
                    style={{ backgroundColor: getLanguageColor(repo.language) }}
                  ></div>
                  {repo.language || 'N/A'}
                </span>
                <div className="flex gap-4">
                  <span className="flex items-center gap-1">
                    <Star className="w-4 h-4" />
                    {repo.stargazers_count}
                  </span>
                  <span className="flex items-center gap-1">
                    <GitFork className="w-4 h-4" />
                    {repo.forks_count}
                  </span>
                </div>
              </div>
            </a>
          ))}
        </div>
        
        <div className="text-center mt-12">
          <a
            href="https://github.com/Educofseal"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-cyan-600 hover:bg-cyan-700 text-white px-8 py-3 rounded-lg transition-all duration-300 glow-effect"
          >
            <Github className="w-5 h-5" />
            Ver todos os projetos
          </a>
        </div>
      </div>
    </section>
  );
};

// Componente para rodapé
const Footer = () => {
  return (
    <footer className="py-12 px-6 border-t border-white/10">
      <div className="container mx-auto text-center">
        <p className="text-gray-400 mb-4">
          © 2024 Eduardo Alves. Todos os direitos reservados.
        </p>
        <p className="text-gray-500 text-sm">
          Desenvolvido com ❤️ e muito ☕
        </p>
      </div>
    </footer>
  );
};

// Componente principal
function App() {
  const [sceneOpen, setSceneOpen] = useState(false);
  const [sceneRepos, setSceneRepos] = useState([]);

  useEffect(() => {
    const load = async () => {
      try {
        const repos = await fetchGitHubRepos();
        setSceneRepos(repos);
      } catch (e) {
        // silently ignore
      }
    };
    load();
  }, []);

  const renderRepoPills = (repos) => (
    <div className="sign-track">
      {repos.map((repo, idx) => (
        <a key={idx} href={repo.html_url} target="_blank" rel="noreferrer" className="repo-pill">
          <img className="repo-thumb" src={(repo.owner && repo.owner.avatar_url) || profileImage} alt={repo.name} />
          <span>{repo.name}</span>
        </a>
      ))}
    </div>
  );

  const blimpNodes = sceneRepos.slice(0, 3);
  const planeNodes = sceneRepos.slice(3, 6).length ? sceneRepos.slice(3, 6) : sceneRepos.slice(0, 3);

  return (
    <div className="min-h-screen animated-bg text-white">
      <section className="py-14 px-6">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold mb-6">Cena Pixel Art clicável</h2>
          <Dialog open={sceneOpen} onOpenChange={setSceneOpen}>
            <DialogTrigger className="bg-cyan-600 hover:bg-cyan-700 text-white px-6 py-3 rounded-md glow-effect">
              Iniciar animação
            </DialogTrigger>
            <DialogContent className="p-0 bg-transparent border-none shadow-none max-w-5xl">
              <PixelArtScene
                start={sceneOpen}
                blimpContent={blimpNodes.length ? renderRepoPills(blimpNodes) : null}
                planeContent={planeNodes.length ? renderRepoPills(planeNodes) : null}
              />
            </DialogContent>
          </Dialog>
        </div>
      </section>
      <HeroSection />
      <AboutSection />
      <SkillsSection />
      <GitHubSection />
      <Footer />
    </div>
  );
}

export default App;
