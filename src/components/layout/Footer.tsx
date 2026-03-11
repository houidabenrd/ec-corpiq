import { ExternalLink } from 'lucide-react';

export function Footer() {
  return (
    <footer className="bg-white border-t border-gray-200 py-3.5 px-6">
      <div className="flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-gray-400">
        <div className="flex items-center gap-1 sm:gap-0">
          <a href="#" className="hover:text-corpiq-blue px-2 py-1 rounded transition-colors">Mentions légales</a>
          <span className="text-gray-200">|</span>
          <a href="#" className="hover:text-corpiq-blue px-2 py-1 rounded transition-colors">Politique de confidentialité</a>
          <span className="text-gray-200">|</span>
          <a href="#" className="hover:text-corpiq-blue px-2 py-1 rounded transition-colors">CGU</a>
        </div>
        <a
          href="https://www.corpiq.com"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-1 hover:text-corpiq-blue px-2 py-1 rounded transition-colors"
        >
          corpiq.com
          <ExternalLink size={10} />
        </a>
      </div>
    </footer>
  );
}
