import React from 'react';
import type { SiteContent } from '../data/types';

interface SectionEditorProps {
  sectionKey: string;
  content: SiteContent;
  onChange: (path: (string | number)[], value: unknown) => void;
}

const textInput = (label: string, val: string, onChange: (v: string) => void) => (
  <div className="space-y-1">
    <label className="text-xs uppercase tracking-wider text-gray-500 font-bold">{label}</label>
    <input
      value={val}
      onChange={e => onChange(e.target.value)}
      className="w-full bg-bg-900 border border-gray-700 rounded-lg p-2.5 text-gray-100 text-sm focus:outline-none focus:border-brand transition-colors"
    />
  </div>
);

const textareaInput = (label: string, val: string, onChange: (v: string) => void) => (
  <div className="space-y-1">
    <label className="text-xs uppercase tracking-wider text-gray-500 font-bold">{label}</label>
    <textarea
      value={val}
      onChange={e => onChange(e.target.value)}
      rows={4}
      className="w-full bg-bg-900 border border-gray-700 rounded-lg p-2.5 text-gray-100 text-sm focus:outline-none focus:border-brand transition-colors resize-y"
    />
  </div>
);

const imageField = (label: string, val: string, onChange: (v: string) => void) => (
  <div className="space-y-2">
    <label className="text-xs uppercase tracking-wider text-gray-500 font-bold">{label}</label>
    <div className="flex items-center gap-3">
      <div className="w-16 h-16 rounded-lg overflow-hidden border border-gray-700 bg-gray-800 flex-shrink-0">
        {val ? (
          <img src={val} alt={label} className="w-full h-full object-cover" onError={e => { (e.target as HTMLImageElement).style.display = 'none'; }} />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-gray-600 text-xs">Aucune</div>
        )}
      </div>
      <input
        value={val}
        onChange={e => onChange(e.target.value)}
        className="flex-1 bg-bg-900 border border-gray-700 rounded-lg p-2.5 text-gray-100 text-sm focus:outline-none focus:border-brand transition-colors"
        placeholder="URL de l'image ou chemin local"
      />
    </div>
  </div>
);

const stringListEditor = (label: string, val: string[], onChange: (v: string[]) => void) => (
  <div className="space-y-1">
    <label className="text-xs uppercase tracking-wider text-gray-500 font-bold">{label}</label>
    <textarea
      value={val.join('\n')}
      onChange={e => onChange(e.target.value.split('\n'))}
      rows={4}
      className="w-full bg-bg-900 border border-gray-700 rounded-lg p-2.5 text-gray-100 text-sm focus:outline-none focus:border-brand transition-colors resize-y"
      placeholder="Un élément par ligne"
    />
  </div>
);

const SectionEditor: React.FC<SectionEditorProps> = ({ sectionKey, content, onChange }) => {
  const section = content[sectionKey as keyof SiteContent] as Record<string, unknown> | undefined;
  if (!section) return <p className="text-gray-500">Section introuvable</p>;

  const handleChange = (path: (string | number)[], value: unknown) => {
    onChange([sectionKey, ...path], value);
  };

  switch (sectionKey) {
    case 'hero':
      return (
        <div className="space-y-6">
          {textInput('Salutation', section.greeting as string, v => handleChange(['greeting'], v))}
          <div className="grid grid-cols-2 gap-4">
            {textInput('Prénom', section.nameFirst as string, v => handleChange(['nameFirst'], v))}
            {textInput('Nom', section.nameLast as string, v => handleChange(['nameLast'], v))}
          </div>
          {textInput('Tagline', section.tagline as string, v => handleChange(['tagline'], v))}
          <div className="grid grid-cols-3 gap-3">
            {textInput('Bouton CV', section.btnCV as string, v => handleChange(['btnCV'], v))}
            {textInput('Bouton Expérience', section.btnExperience as string, v => handleChange(['btnExperience'], v))}
            {textInput('Bouton Démo', section.btnDemo as string, v => handleChange(['btnDemo'], v))}
          </div>
        </div>
      );

    case 'about':
      return (
        <div className="space-y-6">
          {textInput('Étiquette de section', section.label as string, v => handleChange(['label'], v))}
          <div className="grid grid-cols-3 gap-3">
            {textInput('Début du titre', section.headline as string, v => handleChange(['headline'], v))}
            {textInput('Mot accentué', section.headlineHighlight as string, v => handleChange(['headlineHighlight'], v))}
            {textInput('Fin du titre', section.headlineEnd as string, v => handleChange(['headlineEnd'], v))}
          </div>
          {textInput('Citation', section.quote as string, v => handleChange(['quote'], v))}
          {textareaInput('Biographie', section.bio as string, v => handleChange(['bio'], v))}
          <div className="border-t border-gray-800 pt-4">
            <h4 className="text-brand-light font-bold text-sm uppercase tracking-wider mb-3">Statistiques</h4>
            <div className="grid grid-cols-2 gap-4">
              {textInput('Taille', ((section.stats as Record<string, string>).height), v => handleChange(['stats', 'height'], v))}
              {textInput('Étiquette Taille', ((section.stats as Record<string, string>).heightLabel), v => handleChange(['stats', 'heightLabel'], v))}
              {textInput('Cheveux', ((section.stats as Record<string, string>).hair), v => handleChange(['stats', 'hair'], v))}
              {textInput('Étiquette Cheveux', ((section.stats as Record<string, string>).hairLabel), v => handleChange(['stats', 'hairLabel'], v))}
              {textInput('Yeux', ((section.stats as Record<string, string>).eyes), v => handleChange(['stats', 'eyes'], v))}
              {textInput('Étiquette Yeux', ((section.stats as Record<string, string>).eyesLabel), v => handleChange(['stats', 'eyesLabel'], v))}
              {textInput('Poids', ((section.stats as Record<string, string>).weight), v => handleChange(['stats', 'weight'], v))}
              {textInput('Étiquette Poids', ((section.stats as Record<string, string>).weightLabel), v => handleChange(['stats', 'weightLabel'], v))}
            </div>
          </div>
        </div>
      );

    case 'resume':
      return (
        <div className="space-y-6">
          {textInput('Étiquette de section', section.label as string, v => handleChange(['label'], v))}
          {textInput('Titre', section.title as string, v => handleChange(['title'], v))}
          <div className="grid grid-cols-2 gap-3">
            {textInput('Filtre Tous', section.filterTous as string, v => handleChange(['filterTous'], v))}
            {textInput('Filtre Film', section.filterFilm as string, v => handleChange(['filterFilm'], v))}
            {textInput('Filtre Théâtre', section.filterTheater as string, v => handleChange(['filterTheater'], v))}
            {textInput('Filtre Formation', section.filterFormation as string, v => handleChange(['filterFormation'], v))}
          </div>
          {textInput('Titre compétences', section.skillsTitle as string, v => handleChange(['skillsTitle'], v))}
          <div className="border-t border-gray-800 pt-4">
            <h4 className="text-brand-light font-bold text-sm uppercase tracking-wider mb-3">Crédits</h4>
            {(section.credits as Array<Record<string, string>>).map((credit, idx) => (
              <div key={idx} className="p-4 bg-gray-800/30 rounded-xl border border-gray-800 mb-3 space-y-3">
                <h5 className="text-brand font-semibold text-sm">Crédit {(section.credits as Array<Record<string, string>>)[idx]?.title || `#${idx + 1}`}</h5>
                <div className="grid grid-cols-2 gap-3">
                  {textInput('Titre', credit.title, v => handleChange(['credits', idx, 'title'], v))}
                  {textInput('Rôle', credit.role, v => handleChange(['credits', idx, 'role'], v))}
                  {textInput('Directeur', credit.director, v => handleChange(['credits', idx, 'director'], v))}
                  {textInput('Année', credit.year, v => handleChange(['credits', idx, 'year'], v))}
                </div>
                <div className="grid grid-cols-2 gap-3">
                  {textInput('Compagnie', credit.company, v => handleChange(['credits', idx, 'company'], v))}
                  <div className="space-y-1">
                    <label className="text-xs uppercase tracking-wider text-gray-500 font-bold">Type</label>
                    <select
                      value={credit.type}
                      onChange={e => handleChange(['credits', idx, 'type'], e.target.value)}
                      className="w-full bg-bg-900 border border-gray-700 rounded-lg p-2.5 text-gray-100 text-sm focus:outline-none focus:border-brand transition-colors"
                    >
                      <option value="Film">Film</option>
                      <option value="Theater">Théâtre</option>
                      <option value="Formation">Formation</option>
                    </select>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="border-t border-gray-800 pt-4">
            <h4 className="text-brand-light font-bold text-sm uppercase tracking-wider mb-3">Compétences</h4>
            {(section.skills as Array<{ category: string; items: string[] }>).map((skillGroup, idx) => (
              <div key={idx} className="p-4 bg-gray-800/30 rounded-xl border border-gray-800 mb-3 space-y-3">
                <div className="grid grid-cols-1 gap-2">
                  {textInput('Catégorie', skillGroup.category, v => handleChange(['skills', idx, 'category'], v))}
                  {stringListEditor('Éléments (un par ligne)', skillGroup.items, v => handleChange(['skills', idx, 'items'], v))}
                </div>
              </div>
            ))}
          </div>
        </div>
      );

    case 'demoVideo':
      return (
        <div className="space-y-6">
          {textInput('Étiquette de section', section.label as string, v => handleChange(['label'], v))}
          {textInput('Titre', section.title as string, v => handleChange(['title'], v))}
          {textInput('Superposition', section.overlay as string, v => handleChange(['overlay'], v))}
          {textInput('ID Vidéo YouTube', section.videoId as string, v => handleChange(['videoId'], v))}
        </div>
      );

    case 'gallery':
      return (
        <div className="space-y-6">
          {textInput('Étiquette de section', section.label as string, v => handleChange(['label'], v))}
          {textInput('Titre', section.title as string, v => handleChange(['title'], v))}
          {textInput('Texte "Voir"', section.viewLabel as string, v => handleChange(['viewLabel'], v))}
          <div className="border-t border-gray-800 pt-4">
            <h4 className="text-brand-light font-bold text-sm uppercase tracking-wider mb-3">Images</h4>
            <p className="text-[10px] text-gray-600 mb-3 italic">Une URL par ligne. Laissez une ligne vide pour retirer une image.</p>
            {stringListEditor(
              'URLs des images (une par ligne)',
              section.images as string[],
              v => handleChange(['images'], v)
            )}
          </div>
        </div>
      );

    case 'contact':
      return (
        <div className="space-y-6">
          {textInput('Étiquette de section', section.label as string, v => handleChange(['label'], v))}
          {textInput('Titre', section.headline as string, v => handleChange(['headline'], v))}
          {textInput('Texte d\'invite', section.joinPrompt as string, v => handleChange(['joinPrompt'], v))}
          <div className="grid grid-cols-2 gap-4">
            {textInput('Email', section.email as string, v => handleChange(['email'], v))}
            {textInput('URI formulaire', section.formAction as string, v => handleChange(['formAction'], v))}
            {textInput('Sujet email', section.formSubject as string, v => handleChange(['formSubject'], v))}
          </div>
          <div className="grid grid-cols-3 gap-3">
            {textInput('Téléphone', section.phone as string, v => handleChange(['phone'], v))}
            {textInput('Étiquette Tél.', section.phoneLabel as string, v => handleChange(['phoneLabel'], v))}
            {textInput('Localisation', section.location as string, v => handleChange(['location'], v))}
            {textInput('Étiquette Loc.', section.locationLabel as string, v => handleChange(['locationLabel'], v))}
            {textInput('Étiquette Social', section.socialLabel as string, v => handleChange(['socialLabel'], v))}
          </div>
          <div className="border-t border-gray-800 pt-4">
            <h4 className="text-brand-light font-bold text-sm uppercase tracking-wider mb-3">Formulaire</h4>
            <div className="grid grid-cols-2 gap-3 p-4 bg-gray-800/30 rounded-xl border border-gray-800">
              {textInput('Texte Nom', (section.form as Record<string, string>).name, v => handleChange(['form', 'name'], v))}
              {textInput('Placeholder Nom', (section.form as Record<string, string>).namePlaceholder, v => handleChange(['form', 'namePlaceholder'], v))}
              {textInput('Texte Email', (section.form as Record<string, string>).email, v => handleChange(['form', 'email'], v))}
              {textInput('Placeholder Email', (section.form as Record<string, string>).emailPlaceholder, v => handleChange(['form', 'emailPlaceholder'], v))}
              {textInput('Texte Message', (section.form as Record<string, string>).message, v => handleChange(['form', 'message'], v))}
              {textInput('Placeholder Message', (section.form as Record<string, string>).messagePlaceholder, v => handleChange(['form', 'messagePlaceholder'], v))}
              {textInput('Texte bouton', (section.form as Record<string, string>).submit, v => handleChange(['form', 'submit'], v))}
            </div>
          </div>
          <div className="border-t border-gray-800 pt-4">
            <h4 className="text-brand-light font-bold text-sm uppercase tracking-wider mb-3">Réseaux Sociaux</h4>
            <p className="text-[10px] text-gray-600 mb-3 italic">Laissez vide pour ne pas afficher l'icône</p>
            <div className="grid grid-cols-2 gap-3">
              {textInput('Instagram', (section.social as Record<string, string>)?.instagram ?? '', v => handleChange(['social', 'instagram'], v))}
              {textInput('YouTube', (section.social as Record<string, string>)?.youtube ?? '', v => handleChange(['social', 'youtube'], v))}
              {textInput('Facebook', (section.social as Record<string, string>)?.facebook ?? '', v => handleChange(['social', 'facebook'], v))}
              {textInput('TikTok', (section.social as Record<string, string>)?.tiktok ?? '', v => handleChange(['social', 'tiktok'], v))}
            </div>
          </div>
        </div>
      );

    case 'navbar':
      return (
        <div className="space-y-4">
          <h4 className="text-brand-light font-bold text-sm uppercase tracking-wider">Liens de navigation</h4>
          {(section.links as Array<{ name: string; href: string }>).map((link, idx) => (
            <div key={idx} className="grid grid-cols-2 gap-2 p-3 bg-gray-800/30 rounded-lg border border-gray-800">
              {textInput('Nom', link.name, v => handleChange(['links', idx, 'name'], v))}
              <div className="space-y-1">
                <label className="text-xs uppercase tracking-wider text-gray-500 font-bold">Section</label>
                <div className="w-full bg-bg-900 border border-gray-700/50 rounded-lg p-2.5 text-gray-500 text-sm cursor-not-allowed">
                  #{link.href.replace('#', '')}
                </div>
              </div>
            </div>
          ))}
        </div>
      );

    case 'footer':
      return (
        <div className="space-y-6">
          {textInput('Copyright', section.copyright as string, v => handleChange(['copyright'], v))}
          <div className="border-t border-gray-800 pt-4">
            <h4 className="text-brand-light font-bold text-sm uppercase tracking-wider mb-3">Liens légaux</h4>
            {(section.legalLinks as Array<{ name: string; content: string }>).map((link, idx) => (
              <div key={idx} className="p-4 bg-gray-800/30 rounded-xl border border-gray-800 mb-3 space-y-3">
                {textInput('Nom', link.name, v => handleChange(['legalLinks', idx, 'name'], v))}
                {textareaInput('Contenu HTML', link.content, v => handleChange(['legalLinks', idx, 'content'], v))}
              </div>
            ))}
          </div>
        </div>
      );

    case 'assets':
      return (
        <div className="space-y-6">
          <h4 className="text-brand-light font-bold text-sm uppercase tracking-wider mb-3">Images & Fichiers</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {imageField('Portrait', section.portrait as string, v => handleChange(['portrait'], v))}
            {imageField('CV (PDF)', section.cv as string, v => handleChange(['cv'], v))}
          </div>
        </div>
      );

    default:
      return <p className="text-gray-500">Section inconnue : {sectionKey}</p>;
  }
};

export default SectionEditor;
