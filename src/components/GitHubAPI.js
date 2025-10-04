// Funções para integração com a API do GitHub
const GITHUB_USERNAME = 'Educofseal';
const GITHUB_API_BASE = 'https://api.github.com';

// Função para buscar dados do usuário
export const fetchGitHubUser = async () => {
  try {
    const response = await fetch(`${GITHUB_API_BASE}/users/${GITHUB_USERNAME}`);
    if (!response.ok) {
      throw new Error('Erro ao buscar dados do usuário');
    }
    return await response.json();
  } catch (error) {
    console.error('Erro ao buscar usuário do GitHub:', error);
    return null;
  }
};

// Função para buscar repositórios
export const fetchGitHubRepos = async () => {
  try {
    const response = await fetch(`${GITHUB_API_BASE}/users/${GITHUB_USERNAME}/repos?sort=updated&per_page=20`);
    if (!response.ok) {
      throw new Error('Erro ao buscar repositórios');
    }
    const repos = await response.json();
    
    // Filtrar apenas repositórios próprios (não forks) e excluir repositórios específicos
    const filteredRepos = repos.filter(repo => 
      !repo.fork && 
      repo.name !== 'MatheusAlvarez' &&
      repo.name !== 'Educofseal' &&
      repo.owner.login === GITHUB_USERNAME
    );
    
    return filteredRepos.slice(0, 6);
  } catch (error) {
    console.error('Erro ao buscar repositórios do GitHub:', error);
    return [];
  }
};

// Função para buscar eventos (commits) do usuário
export const fetchGitHubEvents = async () => {
  try {
    const response = await fetch(`${GITHUB_API_BASE}/users/${GITHUB_USERNAME}/events?per_page=100`);
    if (!response.ok) {
      throw new Error('Erro ao buscar eventos');
    }
    const events = await response.json();
    
    // Filtrar apenas eventos de push (commits)
    const pushEvents = events.filter(event => event.type === 'PushEvent');
    
    // Contar commits
    let totalCommits = 0;
    pushEvents.forEach(event => {
      if (event.payload && event.payload.commits) {
        totalCommits += event.payload.commits.length;
      }
    });
    
    return totalCommits;
  } catch (error) {
    console.error('Erro ao buscar eventos do GitHub:', error);
    return 0;
  }
};

// Buscar commits recentes (lista detalhada)
export const fetchRecentCommits = async (limit = 15) => {
  try {
    const response = await fetch(`${GITHUB_API_BASE}/users/${GITHUB_USERNAME}/events?per_page=100`);
    if (!response.ok) {
      throw new Error('Erro ao buscar eventos para commits recentes');
    }
    const events = await response.json();

    const commits = [];
    for (const event of events) {
      if (event.type !== 'PushEvent' || !event.payload || !event.payload.commits) continue;
      const repoFullName = event.repo?.name || `${GITHUB_USERNAME}`;
      const createdAt = event.created_at;
      for (const commit of event.payload.commits) {
        commits.push({
          id: `${repoFullName}-${commit.sha}`,
          repo: repoFullName,
          message: commit.message || 'Commit',
          sha: commit.sha,
          url: `https://github.com/${repoFullName}/commit/${commit.sha}`,
          date: createdAt,
          author: commit.author?.name || GITHUB_USERNAME,
        });
      }
    }

    commits.sort((a, b) => new Date(b.date) - new Date(a.date));
    return commits.slice(0, limit);
  } catch (error) {
    console.error('Erro ao buscar commits recentes do GitHub:', error);
    return [];
  }
};

// Função para buscar estatísticas gerais
export const fetchGitHubStats = async () => {
  try {
    const user = await fetchGitHubUser();
    const repos = await fetchGitHubRepos();
    const commits = await fetchGitHubEvents();
    
    return {
      user,
      repos,
      totalCommits: commits,
      totalRepos: user ? user.public_repos : 0,
      followers: user ? user.followers : 0,
      following: user ? user.following : 0
    };
  } catch (error) {
    console.error('Erro ao buscar estatísticas do GitHub:', error);
    return {
      user: null,
      repos: [],
      totalCommits: 0,
      totalRepos: 0,
      followers: 0,
      following: 0
    };
  }
};

