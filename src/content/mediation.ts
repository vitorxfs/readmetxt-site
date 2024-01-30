import { string } from 'astro/zod';

export type SocialMedia = {
  name: 'linkedin' | 'instagram';
  url: string;
}

interface MediationContent {
  name: string;
  title: string;
  description: string;
  socialMedia: SocialMedia[];
}

const mediation: MediationContent = {
  name: 'Caroline Valentim',
  title: 'CIPM e CDPO/BR - IAPP | Founder da Ston Digital - Consultoria em Privacidade e Proteção de Dados | Advogada | Graduada em Segurança da Informaçãodios',
  description: 'Profissional empreendedora com dupla formação (jurídica e técnica) e vivência internacional, com experiência comprovada na captação de clientes e na assessoria a empresas de setores variados em temas de privacidade, proteção de dados e segurança da informação.',
  socialMedia: [
    { name:'linkedin', url: 'https://linkedin.com/in/carolinevalentim' },
    { name:'instagram', url: 'https://instagram.com/carolinevalentim' },
  ]
};

export default mediation;
