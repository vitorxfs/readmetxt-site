export type SocialMedia = {
  name: 'linkedin' | 'instagram';
  url: string;
}

interface MediationContent {
  name: string;
  title: string;
  description: string;
  socialMedia: SocialMedia[];
  imageDescription: string;
}

const mediation: MediationContent = {
  name: 'Caroline Valentim',
  title: 'CIPM e CDPO/BR - IAPP | Founder da Ston Digital - Consultoria em Privacidade e Proteção de Dados | Advogada | Graduada em Segurança da Informaçãodios',
  description: 'Profissional empreendedora com dupla formação (jurídica e técnica) e vivência internacional, com experiência comprovada na captação de clientes e na assessoria a empresas de setores variados em temas de privacidade, proteção de dados e segurança da informação.',
  imageDescription: 'Foto de Caroline Valentim. Caroline tem cabelos castanhos, olhos verdes e está vestindo um blazer listrado preto e branco. Atrás dela é possível ver a cidade de São Paulo em desfoque.',
  socialMedia: [
    { name:'linkedin', url: 'https://linkedin.com/in/carolinevalentim' },
    { name:'instagram', url: 'https://instagram.com/carolinevalentim' },
  ]
};

export default mediation;
