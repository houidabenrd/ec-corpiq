import { ExternalLink } from 'lucide-react';

export function Footer() {
  return (
    <footer className="bg-white border-t border-gray-100 py-3 px-6">
      <div className="flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-gray-400">
        <div className="flex items-center gap-3">
          <a href="#" className="hover:text-gray-600 transition-colors">Mentions légales</a>
          <span className="w-0.5 h-0.5 bg-gray-300 rounded-full" />
          <a href="#" className="hover:text-gray-600 transition-colors">Politique de confidentialité</a>
          <span className="w-0.5 h-0.5 bg-gray-300 rounded-full" />
          <a href="#" className="hover:text-gray-600 transition-colors">CGU</a>
        </div>
        <a
          href="https://www.corpiq.com"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-1.5 hover:text-gray-600 transition-colors"
        >
          corpiq.com
          <ExternalLink size={10} />
        </a>
      </div>
    </footer>
  );
}
