
import React from 'react';
import { Users, FileKey, Fingerprint, GitPullRequestDraft, Brain, UserCheck } from 'lucide-react';
import GlassmorphicCard from './GlassmorphicCard';

interface FeatureCardProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  gradient: string;
}

const FeatureCard: React.FC<FeatureCardProps> = ({ title, description, icon, gradient }) => (
  <GlassmorphicCard className="p-6 h-full">
    <div className={`w-12 h-12 rounded-lg flex items-center justify-center mb-4 ${gradient}`}>
      {icon}
    </div>
    <h3 className="text-xl font-heading font-semibold mb-3">{title}</h3>
    <p className="text-gray-300">{description}</p>
  </GlassmorphicCard>
);

const Features: React.FC = () => {
  const features: FeatureCardProps[] = [
    {
      title: 'Nominee Assignment',
      description: 'Assign trusted individuals to receive specific digital assets with multi-tier nominee structure.',
      icon: <Users className="h-6 w-6 text-white" />,
      gradient: 'bg-gradient-to-br from-eternavault-accent to-eternavault-accent2'
    },
    {
      title: 'Digital Asset Vault',
      description: 'Securely store and categorize your digital assets with end-to-end encryption.',
      icon: <FileKey className="h-6 w-6 text-white" />,
      gradient: 'bg-gradient-to-br from-eternavault-blue to-eternavault-blue2'
    },
    {
      title: 'Secure Verification',
      description: 'Robust verification system to confirm the identity of nominees before granting access.',
      icon: <Fingerprint className="h-6 w-6 text-white" />,
      gradient: 'bg-gradient-to-br from-eternavault-magenta to-purple-600'
    },
    {
      title: 'Conditional NFTs',
      description: 'Create customized NFTs with personalized content that unlock under specific conditions.',
      icon: <GitPullRequestDraft className="h-6 w-6 text-white" />,
      gradient: 'bg-gradient-to-br from-cyan-500 to-blue-600'
    },
    {
      title: 'AI-Powered Will',
      description: 'Generate legally-compliant digital wills using natural language processing.',
      icon: <Brain className="h-6 w-6 text-white" />,
      gradient: 'bg-gradient-to-br from-green-500 to-emerald-600'
    },
    {
      title: 'Access Control',
      description: 'Define specific access permissions for each nominee and digital asset.',
      icon: <UserCheck className="h-6 w-6 text-white" />,
      gradient: 'bg-gradient-to-br from-orange-500 to-amber-600'
    }
  ];

  return (
    <section className="py-20 relative overflow-hidden" id="features">
      {/* Background Effects */}
      <div className="absolute -top-40 -right-40 w-96 h-96 bg-eternavault-accent/10 rounded-full filter blur-3xl"></div>
      <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-eternavault-blue/10 rounded-full filter blur-3xl"></div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold font-heading mb-4">
            <span className="heading-gradient">Core Features</span>
          </h2>
          <p className="text-gray-300">
            EternaVault provides comprehensive tools to secure your digital legacy and ensure your assets reach the right people.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <FeatureCard key={index} {...feature} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
